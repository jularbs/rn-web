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

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (typeof body !== "undefined") {
      timer = setTimeout(() => {
        try {
          window.twttr?.widgets.load();
        } catch {}
        try {
          window.instgrm?.Embeds.process();
        } catch {}

        // TikTok: ensure embeds initialize for any blockquotes without iframes
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
      }, 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [body]);

  // Keep embeds eager and re-initialize if they get unloaded
  useEffect(() => {
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

    const reprocessTwitter = () => {
      try { window.twttr?.widgets.load(); } catch {}
    };
    const reprocessTikTok = (scope?: Element | null) => {
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
    const reprocessInstagram = (scope?: Element | null) => {
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
          // Also trigger global processing to initialize embeds present
          window.instgrm?.Embeds.process();
        }
      } catch {}
    };

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
            // Reprocess Instagram/TikTok if related nodes are added
            if (node.matches?.('blockquote.instagram-media, .instagram-media')) {
              reprocessInstagram(node);
            } else if (node.matches?.('blockquote.tiktok-embed, .tiktok-embed')) {
              reprocessTikTok(node);
            }
          }
        });
        m.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.tagName === 'IFRAME') {
            // If a platform unloads the iframe, force re-init
            reprocessTwitter();
            reprocessTikTok(node.parentElement);
            reprocessInstagram(node.parentElement);
          }
        });
      }
    });

    observer.observe(container, { childList: true, subtree: true, attributes: true, attributeFilter: ['loading'] });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, [body]);

  return (
    <>
      <Script src="https://www.tiktok.com/embed.js" async />
      <Script src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2" async />
      <Script src="https://www.instagram.com/embed.js" async />
      <Script src="https://platform.twitter.com/widgets.js" async />
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
