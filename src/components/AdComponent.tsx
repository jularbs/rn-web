'use client';
import Script from "next/script";
import { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import useMeasure from "react-use-measure";
import { v4 as uuidv4 } from "uuid";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        googletag: any;
    }
}

interface AdSize {
    width: number;
    path: string;
    size: [number, number];
    height: number;
    adUnit: string;
    name: string;
}
export default function AdComponent() {
    const [ref, bounds] = useMeasure();
    const [id, setId] = useState("");
    const [selectedAd, setSelectedAd] = useState<undefined | AdSize>(undefined);

    useLayoutEffect(() => {
        const adSizes: AdSize[] = [
            {
                width: 300,
                height: 250,
                adUnit: "",
                name: "MREC",
                path: "/421864608/RN_MobileWeb_Mrec",
                size: [300, 250],
            },
            {
                width: 300,
                height: 600,
                adUnit: "",
                name: "LARGESKYSCRAPER",
                path: "/421864608/RN_DesktopWeb_MRec_Halfpage_Home",
                size: [300, 600],
            },
            {
                width: 300,
                height: 50,
                adUnit: "",
                name: "MOBLEADERBOARD2",
                path: "/421864608/RN_MobileWeb_Banner_320x50",
                size: [300, 50],
            },
            {
                width: 320,
                height: 50,
                adUnit: "",
                name: "MOBLEADERBOARD",
                path: "/421864608/RN_MobileWeb_Banner_320x50",
                size: [320, 50],
            },
            {
                width: 728,
                height: 90,
                adUnit: "",
                name: "LEADERBOARD",
                path: "/421864608/RN_DesktopWeb_Banner_728x90_970x90",
                size: [728, 90],
            },
            {
                width: 970,
                height: 90,
                adUnit: "",
                name: "LARGELEADERBOARD",
                path: "/421864608/RN_DesktopWeb_Banner_728x90_970x90",
                size: [970, 90],
            },
        ];

        const adSizeSelector = () => {
            if (bounds.height > 0 && bounds.width > 0) {
                //Find valid ad sizes inside container
                const validSizes = adSizes.filter(
                    (adItem) =>
                        adItem.width <= Math.ceil(bounds.width) &&
                        adItem.height <= Math.ceil(bounds.height)
                );
                //Get biggest area in valid sizes
                const sortedByArea = validSizes.sort((current, next) => {
                    if (current.width * current.height > next.width * next.height)
                        return -1;
                    return 1;
                });
                if (sortedByArea.length > 0) {
                    return sortedByArea[0];
                } else {
                    return undefined;
                }
            }
        };

        const debounce = setTimeout(() => {
            setId(uuidv4());
            setSelectedAd(adSizeSelector());
        }, 500);

        return () => clearTimeout(debounce);
    }, [bounds]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (selectedAd === undefined) return;

        console.log("Initializing Ad Tag: ", selectedAd.path, "for id: ", id);

        // Ensure the global queue exists on the window so GPT will pick up commands
        // when its script loads. Assign back to window to preserve the queue.
        window.googletag = window.googletag || { cmd: [] };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const googletag = window.googletag as any;
        googletag.cmd = googletag.cmd || [];

        googletag.cmd.push(function () {
            try {
                googletag
                    .defineSlot(selectedAd.path, selectedAd.size, id)
                    .addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
            } catch (e) {
                console.log("Error defining ad slot: ", e);
            }
        });
        googletag.cmd.push(function () {
            try {
                googletag.display(id);
            } catch (e) {
                console.log("Error displaying ad: ", e);
            }
        });

        return () => {
            if (window.googletag && window.googletag.pubads) {
                window.googletag.cmd.push(() => {
                    try {
                        const pubads = window.googletag.pubads();
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const slots = (pubads.getSlots ? pubads.getSlots() : []).filter((s: any) => {
                            try { return s.getSlotElementId && s.getSlotElementId() === id; } catch { return false; }
                        });
                        if (window.googletag.destroySlots) {
                            window.googletag.destroySlots(slots);
                        }
                    } catch (e) {
                        console.log("Error cleaning up ad slots: ", e);
                    }
                });
            }
        };
    }, [selectedAd, id]);

    return <>
        <Script
            src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
            async={true}
            onLoad={() => {
                console.log("GTM loaded..");
            }}
        />
        <div ref={ref} className="absolute inset-0 w-full h-full">
            {selectedAd ? (
                <div className="relative top-0 w-full h-full grid place-items-center">
                    <div
                        className="flex justify-center items-center align-item"
                        style={{
                            width: `${selectedAd?.width}px`,
                            height: `${selectedAd?.height}px`,
                        }}
                        id={id}
                    />
                </div>
            ) : (
                // Ensure the wrapper is not considered empty by `.container div:empty`
                // so it remains measurable by `useMeasure`.
                <span aria-hidden="true" style={{display: 'block', width: 0, height: 0, overflow: 'hidden'}} dangerouslySetInnerHTML={{__html: '&#8203;'}} />
            )}
        </div>
    </>
}