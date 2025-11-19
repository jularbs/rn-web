import { open_sans } from "@/app/fonts";
import ContentComponent from "@/components/ContentComponent/ContentComponent";
import FacebookShareComponent from "@/components/FacebookShareComponent";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import SocialSharingButton from "@/components/SocialSharingButton";
import TwitterShareComponent from "@/components/TwitterShareComponent";
import { cn, getImageSource } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { Metadata } from "next";

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
    const { slug } = await params
    const postData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/posts/${slug}`).then(res => res.json());

    const showTags = () => {
        return <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold mr-1">Tags: </span>
            {postData.tags.map((tag: Record<string, string>, index: number) => (
                <span key={index} className="text-xs border-1 rounded-xs border-neutral-600 px-2 py-1">{tag.name}</span>
            ))}
        </div>
    }

    return (<>
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <div className="flex-1">
                <div className={open_sans.className}>
                    <div className="relative aspect-3/2 w-full bg-gray-200 rounded-md overflow-hidden">
                        <Image src={getImageSource(postData.featuredImage)} alt="sample" fill
                            className="absolute inset-0 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-gradient-start opacity-80 mt-1/3" />
                    </div>
                    <small className="p-1 text-neutral-500">{postData.featuredImageCaption}</small>
                    <h2 className="text-3xl font-extrabold my-3">{postData.title}</h2>
                    <p className="text-sm">{format(postData.publishedAt, "PPP")}</p>
                </div>
                <ContentComponent content={postData.content} className={cn("mt-4 leading-loose font-semibold", open_sans.className)} />
                {showTags()}
                <div className="flex gap-2 mt-5 items-center font-semibold">
                    <span className="text-xs">Share</span>
                    <FacebookShareComponent />
                    <TwitterShareComponent />
                    <SocialSharingButton className="w-8 h-8 cursor-pointer" />
                </div>
            </div>
            <div className="w-full xl:w-right-sidebar-width">
                <LatestStoriesComponent />
                <div className="sticky top-5">
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                            <Image src={`https://picsum.photos/600/400?random=${Math.floor(Math.random() * 10) + 1}`} alt="Sample"
                                fill
                                className="absolute inset-0 object-cover" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                            <Image src={`https://picsum.photos/600/400?random=${Math.floor(Math.random() * 10) + 1}`} alt="Sample"
                                fill
                                className="absolute inset-0 object-cover" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>

    );
}
