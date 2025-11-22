import { getImageSource } from "@/lib/utils";
import { Metadata } from "next";
import ViewPostComponent from "@/components/ViewPostComponent";
import { ShieldAlertIcon } from "lucide-react";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const postData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/posts/${slug}`).then(res => res.json());

    // Prepare image URLs
    const featuredImageUrl = postData.featuredImage ? getImageSource(postData.featuredImage) : null;
    const ogImageUrl = postData.ogImage ? getImageSource(postData.ogImage) : featuredImageUrl;
    const twitterImageUrl = postData.twitterImage ? getImageSource(postData.twitterImage) : featuredImageUrl;

    // Build robots meta
    const robotsConfig = [];
    if (postData.robotsIndex !== false) robotsConfig.push('index');
    else robotsConfig.push('noindex');
    if (postData.robotsFollow !== false) robotsConfig.push('follow');
    else robotsConfig.push('nofollow');
    if (postData.robotsArchive === false) robotsConfig.push('noarchive');
    if (postData.robotsSnippet === false) robotsConfig.push('nosnippet');
    if (postData.robotsImageIndex === false) robotsConfig.push('noimageindex');

    return {
        title: postData.metaTitle || postData.title,
        description: postData.metaDescription || postData.excerpt || postData.title,
        keywords: postData.keywords,
        authors: postData.seoAuthor ? [{ name: postData.seoAuthor }] : undefined,
        publisher: postData.publisher,
        alternates: {
            canonical: postData.canonicalUrl || `${process.env.NEXT_PUBLIC_WEB_DOMAIN}/post/${postData.slug}`,
        },
        robots: {
            index: postData.robotsIndex !== false,
            follow: postData.robotsFollow !== false,
            googleBot: robotsConfig.join(', '),
        },
        openGraph: {
            title: postData.ogTitle || postData.metaTitle || postData.title,
            description: postData.ogDescription || postData.metaDescription || postData.excerpt || postData.title,
            url: postData.ogUrl || postData.canonicalUrl || `${process.env.NEXT_PUBLIC_WEB_DOMAIN}/post/${postData.slug}`,
            siteName: postData.ogSiteName || process.env.NEXT_PUBLIC_SITE_NAME,
            locale: postData.ogLocale || 'en_US',
            type: postData.ogType || 'article',
            publishedTime: postData.publishedAt,
            modifiedTime: postData.updatedAt,
            authors: postData.seoAuthor ? [postData.seoAuthor] : undefined,
            images: ogImageUrl ? [{
                url: ogImageUrl,
                alt: postData.ogImageAlt || postData.title,
            }] : undefined,
            videos: postData.type === 'video article' && postData.videoSourceUrl ? [{
                url: postData.videoSourceUrl,
                width: 1280,
                height: 720,
            }] : undefined,
        },
        twitter: {
            card: postData.twitterCard || 'summary_large_image',
            title: postData.twitterTitle || postData.metaTitle || postData.title,
            description: postData.twitterDescription || postData.metaDescription || postData.excerpt || postData.title,
            site: postData.twitterSite,
            creator: postData.twitterCreator,
            images: twitterImageUrl ? [{
                url: twitterImageUrl,
                alt: postData.twitterImageAlt || postData.title,
            }] : undefined,
        },
        other: {
            'article:published_time': postData.publishedAt,
            'article:modified_time': postData.updatedAt,
            'reading_time': postData.readingTime,
        },
    };
}

export default async function Post({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    try {
        const { slug } = await params
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/posts/${slug}`)

        if (!res.ok) {
            if (res.status === 404) {
                return <main className="flex flex-col items-center justify-center py-20 md:py-40">
                    <div className="font-extrabold text-[100px] md:text-[200px] leading-none text-neutral-300">404</div>
                    <h2 className="text-center text-xl font-extrabold uppercase">Post not found</h2>
                </main>
            }

            throw new Error("Something went wrong!");
        }

        const postData = await res.json();

        return <div></div>
        return <ViewPostComponent postData={postData} />

    } catch (error: unknown) {
        return <main className="flex flex-col items-center justify-center py-20 md:py-40">
            <ShieldAlertIcon className="size-20 text-neutral-300" />
            <h2 className="text-center text-xl font-extrabold">{(error as Error).message || "Something went wrong!"}</h2>
        </main>
    }



}
