"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ViewPostComponent from "@/components/ViewPostComponent";
import { IPost } from "@/types/post";

function sanitizePreviewPost(post: unknown): IPost | null {
    if (!post || typeof post !== "object") return null;
    const clone: Record<string, unknown> = { ...(post as Record<string, unknown>) };
    // Drop heavy / disallowed fields (already stripped client-side but defensive)
    const alwaysRemove = [
        "metaTitle", "metaDescription", "keywords", "canonicalUrl", "robotsIndex", "robotsFollow", "robotsArchive", "robotsSnippet", "robotsImageIndex",
        "ogTitle", "ogDescription", "ogUrl", "ogType", "ogSiteName", "ogLocale", "ogImage", "ogImageAlt", "twitterCard", "twitterTitle", "twitterDescription", "twitterSite", "twitterCreator", "twitterImage", "twitterImageAlt", "seoAuthor", "publisher", "focusKeyword", "readingTime", "ogImage", "twitterImage"
    ];
    for (const k of alwaysRemove) delete clone[k];

    // Only allow featuredImage if string (URL or data URL). Remove others.
    // Normalize featuredImage: if string -> convert to media object
    if (typeof clone.featuredImage === "string") {
        const str = clone.featuredImage as string;
        clone.featuredImage = { url: str };
    } else if (clone.featuredImage && typeof clone.featuredImage === 'object') {
        // keep as is
    } else {
        delete clone.featuredImage;
    }
    // Normalize thumbnailImage the same way as featuredImage
    if (typeof clone.thumbnailImage === "string") {
        const str = clone.thumbnailImage as string;
        clone.thumbnailImage = { url: str };
    } else if (clone.thumbnailImage && typeof clone.thumbnailImage === 'object') {
        // keep as is
    } else {
        delete clone.thumbnailImage;
    }
    if (typeof clone.content !== "string") return null;
    // Basic required fields check
    if (typeof clone.title !== "string" || typeof clone.slug !== "string") return null;
    return clone as unknown as IPost;
}

export default function PreviewClient({ slug }: { slug: string }) {
    const [postData, setPostData] = useState<IPost | null>(null);
    const [received, setReceived] = useState(false);
    const [requestAttempts, setRequestAttempts] = useState(0);
    const searchParams = useSearchParams();
    const nonce = searchParams.get("nonce") || "";

    useEffect(() => {
        const manageOrigin = process.env.NEXT_PUBLIC_MANAGE_DOMAIN || "*";
        // Notify opener we're ready to receive preview payload
        try {
            window.opener?.postMessage({ type: "RN_PREVIEW_READY", slug, nonce }, manageOrigin);
        } catch { }

        const handler = (e: MessageEvent) => {
            if (process.env.NEXT_PUBLIC_MANAGE_DOMAIN && e.origin !== process.env.NEXT_PUBLIC_MANAGE_DOMAIN) return;
            if (!e.data || typeof e.data !== "object") return;
            if (!("nonce" in e.data) || e.data.nonce !== nonce) return;
            if (e.data.type === "RN_PREVIEW_POST" && e.data.payload) {
                const sanitized = sanitizePreviewPost(e.data.payload);
                if (sanitized) {
                    setPostData(sanitized);
                    setReceived(true);
                    try { window.opener?.postMessage({ type: "RN_PREVIEW_RECEIVED", slug, nonce }, manageOrigin); } catch { }
                }
            }
            if (e.data.type === "RN_PREVIEW_ABORT") {
                setReceived(true); // stop waiting UI
            }
        };
        window.addEventListener("message", handler);

        const pingInterval = window.setInterval(() => {
            if (received || postData) {
                clearInterval(pingInterval);
                return;
            }
            setRequestAttempts(a => a + 1);
            if (requestAttempts >= 5) {
                clearInterval(pingInterval);
                return;
            }
            try { window.opener?.postMessage({ type: "RN_PREVIEW_REQUEST", slug, nonce }, manageOrigin); } catch { }
        }, 2000);

        return () => {
            window.removeEventListener("message", handler);
            clearInterval(pingInterval);
        };
    }, [slug, received, postData, requestAttempts, nonce]);

    if (!received || !postData) {
        return (
            <main className="flex flex-col items-center justify-center py-20 md:py-40">
                <div className="animate-pulse text-neutral-400 mb-4">Waiting for preview data...</div>
                <div className="text-xs text-neutral-500">If this takes long, close and retry preview.</div>
            </main>
        );
    }

    return <ViewPostComponent postData={postData} />
}
