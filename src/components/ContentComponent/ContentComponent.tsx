"use client";
import { useEffect } from "react";
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

  const body = splitContentExcludingEmbeds(content);

  useEffect(() => {
    if (typeof body !== 'undefined') {
      window.twttr?.widgets.load();
      window.instgrm?.Embeds.process();
    }
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
        {body.filter(item => item !== "")
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
