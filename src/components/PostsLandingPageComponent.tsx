"use client";

import { fetcher } from "@/actions/swr";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { IPost } from "@/types/post";
import { getImageSource } from "@/lib/utils";
import useSWRInfinite from "swr/infinite";
import { ConstructionIcon, LoaderCircleIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { format } from "date-fns";
import { toast } from "sonner";

export function PostsLandingPageComponent(): React.JSX.Element {

    const [limit,] = useState(5);
    const { ref, inView } = useInView({ threshold: .9 });
    const [isAllFetched, setIsAllFetched] = useState(false);

    const { data: posts, size, setSize, isLoading, error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = useSWRInfinite((index: number, previous: any) => {
        if (previous && previous.pagination && !previous.pagination.hasNext) {
            setIsAllFetched(true);
            return null; // No more data to fetch
        }
        return {
            url: "v1/posts",
            params: {
                page: index + 1,
                limit: limit,
            },
        }
    },
        fetcher,
        {
            revalidateAll: false,
            revalidateFirstPage: false
        }
    );

    const postsData = posts ? posts.map((page) => page.data).flat() : [];

    const isLoadingMore =
        isLoading || (size > 0 && posts && typeof posts[size - 1] === "undefined");

    useEffect(() => {
        if (error) {
            return;
        }
        if (inView) {
            if (!isLoadingMore)
                setSize(size + 1);
        }
    }, [inView, setSize, size, isLoadingMore, error]);

    useEffect(() => {
        if (error) {
            toast.error("Error!", {
                style: {
                    background: "rgba(220, 46, 46, 1)",
                    color: "white",
                    border: "none"
                },
                description: "There was a problem fetching posts. Please try again later.",
                duration: 5000,
                position: "top-center"
            });
        }
    }, [error])

    const showSkeletonLoadMore = () => {
        if (error) return null;
        return [...Array(5)].map((_, index) => (
            <div className="aspect-3/2 w-full rounded-md relative overflow-hidden first:lg:col-span-2" key={index}>
                <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            </div>
        ))
    }

    return <div className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {postsData.map((item: Partial<IPost>, index: number) => {
                if (index === 0) {
                    return <div key={index} className="lg:col-span-2">
                        <Link href={`/post/${item.slug}`} className="no-underline" aria-label={`Read more about ${item.title}`}>
                            <div className="group">
                                <div className="relative aspect-3/2 w-full bg-gray-200 rounded-md overflow-hidden">
                                    <Image src={getImageSource(item.thumbnailImage)} alt="Sample"
                                        fill
                                        className="absolute inset-0 object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-gradient-start opacity-80 mt-1/3" />
                                </div>
                                <h2 className={`text-xl md:text-2xl lg:text-3xl leading-[1.1] font-extrabold mt-5 mb-3`}>{item.title}</h2>
                                <p className="text-sm font-medium">{item.publishedAt ? format(new Date(item.publishedAt), "PP p") : "N/A"}</p>
                            </div>
                        </Link>
                        <hr className="my-5 border-t border-gray-300" />
                    </div>
                }

                return <Link href={`/post/${item.slug}`} key={index} aria-label={`Read more about ${item.title}`}>
                    <div className="group">
                        <div className="aspect-3/2 w-full bg-gray-200 rounded-md relative overflow-hidden">
                            <Image src={getImageSource(item.thumbnailImage)} alt="Sample"
                                fill
                                className="absolute inset-0 object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-b to-blue-gradient-start from-transparent opacity-90 mt-1/5" />
                            <div className="absolute bottom-0 left-0 w-full text-white p-3">
                                <h2 className="font-bold mb-1 leading-tight line-clamp-2 group-hover:underline">{item.title}</h2>
                                <p className="text-xs line-clamp-2 leading-relaxed">
                                    {item.excerpt}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            })}
            {isLoadingMore && !isAllFetched && showSkeletonLoadMore()}
        </div>
        {!error &&
            <Button
                aria-label="Load more posts"
                ref={ref}
                disabled={isAllFetched}
                className="mt-5 w-full border-2 border-radyonatin-blue bg-transparent text-radyonatin-blue rounded-md text-lg font-bold uppercase px-3 py-5 hover:bg-radyonatin-blue hover:text-white cursor-pointer">
                {isAllFetched ? "All posts displayed" : "Load More Posts"}
                {isLoadingMore && !isAllFetched && !error && <LoaderCircleIcon className="inline-block animate-spin" />}
            </Button>
        }
        {error && <div className="flex flex-col items-center justify-center gap-2">
        <ConstructionIcon className="w-20 h-20"/>
            <h1 className="text-2xl font-extrabold">Oops!</h1>
            <p className="text-lg">Something went wrong! Please try again later</p>
        </div>}
    </div>;
}