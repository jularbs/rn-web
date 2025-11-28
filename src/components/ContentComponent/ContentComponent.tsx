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

  // Detect which embeds exist to avoid loading unnecessary scripts
  const hasInstagram = useMemo(
    () => /<blockquote[^>]*class=\"[^\"]*instagram-media[^\"]*\"/i.test(content),
    [content]
  );
  const hasTwitter = useMemo(
    () => /<blockquote[^>]*class=\"[^\"]*twitter-tweet[^\"]*\"/i.test(content),
    [content]
  );
  const hasTikTok = useMemo(
    () => /<blockquote[^>]*class=\"[^\"]*tiktok-embed[^\"]*\"/i.test(content),
    [content]
  );
  const hasFacebookXFBML = useMemo(
    () => /<div[^>]*class=\"[^\"]*fb\-(post|video|comments)[^\"]*\"/i.test(content),
    [content]
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (typeof body !== "undefined") {
      timer = setTimeout(() => {
        if (hasTwitter) {
          try { window.twttr?.widgets.load(); } catch {}
        }
        if (hasInstagram) {
          try { window.instgrm?.Embeds.process(); } catch {}
        }

        // TikTok: ensure embeds initialize for any blockquotes without iframes
        if (hasTikTok) {
          try {
            const container = document.querySelector(`.${styles.container}`);
            const tiktokEmbeds = (container || document).querySelectorAll('blockquote.tiktok-embed');
            tiktokEmbeds.forEach((embed) => {
              if (!embed.querySelector('iframe')) {
                const existing = embed.querySelector('script[src*="tiktok.com/embed.js"]');
                if (!existing) {
                  const s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.tiktok.com/embed.js';
                  embed.appendChild(s);
                }
              }
            });
          } catch {}
        }
      }, 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [body, hasTwitter, hasInstagram, hasTikTok]);

  // Keep embeds eager and re-initialize efficiently if they get unloaded
  useEffect(() => {
    if (!hasTwitter && !hasInstagram && !hasTikTok) return;
    const container = document.querySelector(`.${styles.container}`);
    if (!container) return;

    const eagerize = (root: Element | Document) => {
      const frames = (root as Element).querySelectorAll?.('iframe') || [];
      frames.forEach((iframe) => {
        try {
          (iframe as HTMLIFrameElement).loading = 'eager';
        } catch {}
        iframe.removeAttribute('loading');
      });
    };

    // Initial and delayed passes to override lazy behavior
    eagerize(container);
    const t1 = setTimeout(() => eagerize(container), 800);
    const t2 = setTimeout(() => eagerize(container), 2500);

    // Debounced schedulers to batch reprocessing work
    const makeScheduler = (fn: () => void, delay = 120) => {
      let scheduled = false;
      return () => {
        if (scheduled) return;
        scheduled = true;
        setTimeout(() => {
          scheduled = false;
          fn();
        }, delay);
      };
    };

    const reprocessTwitter = () => {
      try { window.twttr?.widgets.load(); } catch {}
    };
    const reprocessTikTokImmediate = (scope?: Element | null) => {
      try {
        const root: Element | Document = scope || container;
        const blocks = (root as Element).querySelectorAll?.('blockquote.tiktok-embed') || [];
        blocks.forEach((embed) => {
          if (!embed.querySelector('iframe')) {
            const existing = embed.querySelector('script[src*="tiktok.com/embed.js"]');
            if (!existing) {
              const s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.tiktok.com/embed.js';
              embed.appendChild(s);
            }
          }
        });
      } catch {}
    };
    const reprocessInstagramImmediate = (scope?: Element | null) => {
      try {
        const root: Element | Document = scope || container;
        const blocks = (root as Element).querySelectorAll?.('blockquote.instagram-media') || [];
        if (blocks.length > 0) {
          blocks.forEach((embed) => {
            if (!embed.querySelector('iframe')) {
              const existing = embed.querySelector('script[src*="instagram.com/embed.js"]');
              if (!existing) {
                const s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.instagram.com/embed.js';
                embed.appendChild(s);
              }
            }
          });
          window.instgrm?.Embeds.process();
        }
      } catch {}
    };

    const scheduleTwitter = makeScheduler(reprocessTwitter);
    const scheduleTikTok = makeScheduler(() => reprocessTikTokImmediate());
    const scheduleInstagram = makeScheduler(() => reprocessInstagramImmediate());

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.target instanceof HTMLIFrameElement && m.attributeName === 'loading') {
          if (m.target.getAttribute('loading') === 'lazy') {
            try { m.target.loading = 'eager'; } catch {}
            m.target.removeAttribute('loading');
          }
        }
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            eagerize(node);
            // Schedule reprocessing when related nodes are added
            if (hasInstagram && (node.matches?.('blockquote.instagram-media, .instagram-media') || node.querySelector?.('blockquote.instagram-media'))) {
              scheduleInstagram();
            }
            if (hasTikTok && (node.matches?.('blockquote.tiktok-embed, .tiktok-embed') || node.querySelector?.('blockquote.tiktok-embed'))) {
              scheduleTikTok();
            }
            if (hasTwitter && node.querySelector?.('blockquote.twitter-tweet, .twitter-tweet')) {
              scheduleTwitter();
            }
          }
        });
        m.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.tagName === 'IFRAME') {
            // If a platform unloads the iframe, force re-init
            if (hasTwitter) scheduleTwitter();
            if (hasTikTok) scheduleTikTok();
            if (hasInstagram) scheduleInstagram();
          }
        });
      }
    });

    observer.observe(container, { childList: true, subtree: true, attributes: true, attributeFilter: ['loading'] });

    // Kick a debounced pass after initial eagerization
    if (hasTwitter) scheduleTwitter();
    if (hasTikTok) scheduleTikTok();
    if (hasInstagram) scheduleInstagram();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, [body, hasTwitter, hasInstagram, hasTikTok]);

  const showBody = () => {
    let paragraphCount = 0;
    return body
      .filter((item) => item.trim() !== "")
      .map((chunk, i) => {
        const isEmbed = /<blockquote[^>]*class=\"[^\"]*(instagram-media|twitter-tweet|tiktok-embed)[^\"]*\"|<iframe[^>]*src=\"[^\"]*(facebook\.com|youtube\.com)[^\"]*\"/i.test(
          chunk
        );

        if (isEmbed) {
          return (
            <div key={`embed-${i}`} dangerouslySetInnerHTML={{ __html: chunk }} />
          );
        }

        paragraphCount += 1;
        const showAd = paragraphCount % 5 === 0;

        if (showAd) {
          return (
            <Fragment key={`para-${i}`}>
              <div className="relative flex flex-grow flex-col justify-center bg-gray-100 mb-3">
                <div className="relative flex justify-center w-full min-h-[250px] min-[468px]:min-h-[60px] min-[732px]:min-h-[90px] basis-0 grow">
                  <span className="uppercase text-xs pt-1">Advertisement</span>
                </div>
              </div>
              <p dangerouslySetInnerHTML={{ __html: chunk }} />
            </Fragment>
          );
        }

        return <p key={`para-${i}`} dangerouslySetInnerHTML={{ __html: chunk }} />;
      });
  }
  
  return (
    <>
      {hasTikTok && (
        <Script src="https://www.tiktok.com/embed.js" async />
      )}
      {hasFacebookXFBML && (
        <Script src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2" async />
      )}
      {hasInstagram && (
        <Script src="https://www.instagram.com/embed.js" async />
      )}
      {hasTwitter && (
        <Script src="https://platform.twitter.com/widgets.js" async />
      )}
      <div className={`${className} ${styles.container}`}>
        {showBody()}
      </div>
    </>
  );
};

export default ContentComponent;
