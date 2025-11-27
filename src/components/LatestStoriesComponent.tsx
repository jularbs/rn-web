"use client";
import { fetcher } from "@/actions/swr";
import { getImageSource } from "@/lib/utils";
import { IPost } from "@/types/post";
import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react";
import useSWR from "swr";

export function LatestStoriesComponent({ }) {

    // Get date 14 days ago in YYYY-MM-DD format
    const endDate = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() - 14);
        return date.toISOString().split('T')[0];
    }, []);

    const { data, isLoading, error } = useSWR({
        url: "v1/posts",
        params: {
            limit: 5,
            endDate: endDate
        }
    },
        fetcher);


    const stories = useMemo(() => data?.data ?? [], [data]);

    const showLoading = useMemo(() => {
        return (
            <div className="animate-pulse space-y-2">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="grid grid-cols-5 gap-2">
                        <div className="bg-gray-200 rounded-md col-span-2 h-20 border border-black" />
                        <div className="col-span-3 space-y-2">
                            <div className="bg-gray-200 rounded h-4 w-3/4" />
                            <div className="bg-gray-200 rounded h-3 w-full" />
                            <div className="bg-gray-200 rounded h-3 w-5/6" />
                            <div className="bg-gray-200 rounded h-3 w-1/4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }, []);

    const showError = useMemo(() => {
        return <div className="text-center text-red-600">Error loading stories</div>;
    }, []);

    const showStories = useMemo(() => {
        if (stories.length === 0) {
            return <div className="text-center">No stories available</div>;
        };

        return stories.map((post: IPost) => (
            <Link href={`/post/${post.slug}`} key={post._id}>
                <div className={`group grid grid-cols-5 gap-2`}>
                    <div className="relative aspect-3/2 bg-gray-200 rounded-md overflow-hidden col-span-2 border border-black">
                        <Image src={getImageSource(post.featuredImage)} alt={post.title}
                            fill
                            className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-gradient-start opacity-80 mt-1/3" />
                    </div>
                    <div className="col-span-3">
                        <h4 className="text-sm font-extrabold leading-tight line-clamp-2 group-hover:underline">{post.title}</h4>
                        <p className="text-xs font-bold line-clamp-2">{post.excerpt}</p>
                        <p className="text-2xs">{new Date(post.publishedAt as Date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}</p>
                    </div>
                </div>
            </Link>
        ));
    }, [stories]);

    return <>
        <h3 className={`text-2xl uppercase font-extrabold mb-3 text-radyonatin-blue`}>More Stories</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-3 mb-5">
            {isLoading ? showLoading : error ? showError : showStories}
        </div>
    </>
}