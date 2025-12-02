"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IOptions } from "@/types/option";
import ViewPageComponent from "./ViewPageComponent";

function sanitizePreviewPage(page: unknown): IOptions | null {
    if (!page || typeof page !== "object") return null;
    const clone: Record<string, unknown> = { ...(page as Record<string, unknown>) };

    if (typeof clone.value !== "string") return null;
    // Basic required fields check
    if (typeof clone.key !== "string") return null;
    return clone as unknown as IOptions;
}

export default function PreviewPageClient({ slug }: { slug: string }) {
    const [pageData, setPageData] = useState<IOptions | null>(null);
    const [received, setReceived] = useState(false);
    const [requestAttempts, setRequestAttempts] = useState(0);
    const searchParams = useSearchParams();
    const nonce = searchParams.get("nonce") || "";

    useEffect(() => {
        // Notify opener we're ready to receive preview payload
        try {
            window.opener?.postMessage({ type: "RN_PREVIEW_READY", slug, nonce }, '*');
        } catch { }

        const handler = (e: MessageEvent) => {
            if (!e.data || typeof e.data !== "object") return;
            if (!("nonce" in e.data) || e.data.nonce !== nonce) return;
            if (e.data.type === "RN_PREVIEW_PAGE" && e.data.payload) {
                const sanitized = sanitizePreviewPage(e.data.payload);
                if (sanitized) {
                    setPageData(sanitized);
                    setReceived(true);
                    try { window.opener?.postMessage({ type: "RN_PREVIEW_RECEIVED", slug, nonce }, '*'); } catch { }
                }
            }
            if (e.data.type === "RN_PREVIEW_ABORT") {
                setReceived(true); // stop waiting UI
            }
        };
        window.addEventListener("message", handler);

        const pingInterval = window.setInterval(() => {
            if (received || pageData) {
                clearInterval(pingInterval);
                return;
            }
            setRequestAttempts(a => a + 1);
            if (requestAttempts >= 5) {
                clearInterval(pingInterval);
                return;
            }
            try { window.opener?.postMessage({ type: "RN_PREVIEW_REQUEST", slug, nonce }, '*'); } catch { }
        }, 2000);

        return () => {
            window.removeEventListener("message", handler);
            clearInterval(pingInterval);
        };
    }, [slug, received, pageData, requestAttempts, nonce]);

    if (!received || !pageData) {
        return (
            <main className="flex flex-col items-center justify-center py-20 md:py-40">
                <div className="animate-pulse text-neutral-400 mb-4">Waiting for preview data...</div>
                <div className="text-xs text-neutral-500">If this takes long, close and retry preview.</div>
            </main>
        );
    }

    return <ViewPageComponent pageData={pageData} />
}
