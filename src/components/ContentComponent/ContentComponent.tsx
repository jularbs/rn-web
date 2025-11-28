"use client";
import { useEffect, useMemo } from "react";
import styles from "./ContentComponent.module.css";
import Script from "next/script";
import { splitContentExcludingEmbeds } from "@/lib/utils";
import { Fragment } from "react";

declare global {
  interface Window {
    FB: unknown;
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
    tiktokEmbed?: unknown;
  }
}

const ContentComponent = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {

  const body = useMemo(() => splitContentExcludingEmbeds(content), [content]);

  const processEmbeds = useMemo(() => () => {
    // Process Twitter embeds
    if (window.twttr?.widgets) {
      try {
        window.twttr.widgets.load();
      } catch (error) {
        console.error('Twitter embed error:', error);
      }
    }

    // Process Instagram embeds - inject script for each blockquote
    const instagramEmbeds = document.querySelectorAll('blockquote.instagram-media');
    if (instagramEmbeds.length > 0) {
      try {
        instagramEmbeds.forEach((embed) => {
          if (!embed.querySelector('iframe')) {
            // Check if script already exists in this embed
            const existingScript = embed.querySelector('script[src*="instagram.com/embed.js"]');
            if (!existingScript) {
              const script = document.createElement('script');
              script.async = true;
              script.src = 'https://www.instagram.com/embed.js';
              embed.appendChild(script);
            }
          }
        });
      } catch (error) {
        console.error('Instagram embed error:', error);
      }
    }

    // Process TikTok embeds by reinitializing the script
    const tiktokEmbeds = document.querySelectorAll('blockquote.tiktok-embed');
    if (tiktokEmbeds.length > 0) {
      try {
        tiktokEmbeds.forEach((embed) => {
          if (!embed.querySelector('iframe')) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.tiktok.com/embed.js';
            embed.appendChild(script);
          }
        });
      } catch (error) {
        console.error('TikTok embed error:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Initial processing after short delay
    const timer = setTimeout(() => {
      processEmbeds();
    }, 500);

    return () => clearTimeout(timer);
  }, [body, processEmbeds]);

  // Retry processing embeds after a longer delay to catch late-loading scripts
  useEffect(() => {
    const retryTimer = setTimeout(() => {
      processEmbeds();
    }, 2000);

    return () => clearTimeout(retryTimer);
  }, [body, processEmbeds]);

  // Additional retry for very slow connections
  useEffect(() => {
    const finalRetryTimer = setTimeout(() => {
      processEmbeds();
    }, 5000);

    return () => clearTimeout(finalRetryTimer);
  }, [body, processEmbeds]);

  return (
    <>
      <Script 
        src="https://www.tiktok.com/embed.js" 
        strategy="lazyOnload"
        onLoad={() => processEmbeds()}
      />
      <Script 
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://www.instagram.com/embed.js" 
        strategy="lazyOnload"
        onLoad={() => processEmbeds()}
      />
      <Script 
        src="https://platform.twitter.com/widgets.js" 
        strategy="lazyOnload"
        onLoad={() => processEmbeds()}
      />
      <div
        className={`${className} ${styles.container}`}
      >
        {body.filter(item => item.trim() !== "")
          .map((paragraph, i) => {
            if (i % 5 === 0 && i !== 0) {
              return (
                <Fragment key={i}>
                  <div className="relative flex flex-grow flex-col justify-center bg-gray-100 mb-3">
                    {/* TODOS: Adjust ad size on breakpoints */}
                    <div className="relative flex justify-center w-full min-h-[250px] min-[468px]:min-h-[60px] min-[732px]:min-h-[90px] basis-0 grow">
                      <span className="uppercase text-xs pt-1">Advertisement</span>
                    </div>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: paragraph }} />
                </Fragment>
              );
            } else {
              return (
                <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              );
            }
          })}
      </div>
    </>
  );
};

export default ContentComponent;
