"use client";
import { useEffect, useState } from "react";
import { fetcher } from "@/actions/swr";
import { IPost } from "@/types/post";
import { getImageSource } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchContext } from "@/context/SearchWrapper";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ConstructionIcon, LoaderCircleIcon, SearchXIcon } from "lucide-react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from 'next/navigation';

export function SearchResultsComponent() {
    const { searchInput } = useSearchContext();
    const router = useRouter();
    const [limit,] = useState(10);

    const { ref, inView } = useInView({ threshold: .9 });
    const [isAllFetched, setIsAllFetched] = useState(false);

    const { data: posts, size, setSize, isLoading, error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = useSWRInfinite((index: number, previous: any) => {
        if (previous && previous.pagination && !previous.pagination.hasNext) {
            setIsAllFetched(true);
            return null; // No more data to fetch
        }
        return searchInput && {
            url: "v1/posts",
            params: {
                search: searchInput,
                page: index + 1,
                limit: limit,
            },
        }
    },
        fetcher,
        {
            errorRetryCount: 2,
            errorRetryInterval: 30000,
            revalidateAll: false,
            revalidateFirstPage: false
        }
    );

    const postData = posts ? posts.map((page) => page.data).flat() : [];

    const showResults = () => {
        if (error) return;

        if (!isLoadingMore && postData.length === 0) {
            return <div className="my-10">
                <SearchXIcon className="size-15 mx-auto text-gray-300 mb-2" />
                <p className="text-center text-sm font-semibold">No results found</p>
            </div>;
        }

        return postData.map((post: IPost) => (
            <Link href={`/post/${post.slug}`} key={post._id}>
                <div className={`group grid grid-cols-5 gap-2`}>
                    <div className="relative aspect-3/2 bg-gray-200 rounded-md overflow-hidden col-span-2 border border-black">
                        <Image src={getImageSource(post.featuredImage)} alt={post.title}
                            fill
                            className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-gradient-start opacity-80 mt-1/3" />
                    </div>
                    <div className="col-span-3">
                        <h4 className="text-sm font-extrabold leading-tight line-clamp-2 group-hover:underline mb-2">{post.title}</h4>
                        <p className="text-xs font-bold line-clamp-3 mb-2">{post.excerpt}</p>
                        <p className="text-2xs">{new Date(post.publishedAt as Date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}</p>
                    </div>
                </div>
            </Link>));
    }

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
                description: "There was a problem fetching search results. Please try again later.",
                duration: 5000,
                position: "top-center"
            });
        }
    }, [error])

    const showSkeletonLoadMore = () => {
        if (error) return null;
        return [...Array(limit)].map((_, index) => (
            <div className={`grid grid-cols-5 gap-2`} key={index}>
                <div className="col-span-2 aspect-3/2 bg-accent animate-pulse rounded-md" />
                <div className="col-span-3 py-1">
                    <div className="w-full h-4 bg-accent animate-pulse rounded-md mb-2"></div>
                    <div className="w-1/2 h-4 bg-accent animate-pulse rounded-md mb-4"></div>
                    <div className="w-full h-3 bg-accent animate-pulse rounded-md mb-2"></div>
                    <div className="w-full h-3 bg-accent animate-pulse rounded-md mb-2"></div>
                    <div className="w-2/3 h-3 bg-accent animate-pulse rounded-md mb-4"></div>
                    <div className="w-[150px] h-3 bg-accent animate-pulse rounded-md mb-2"></div>
                </div>
            </div>
        ))
    }

    return (
        <div>
            <div className="flex items-center justify-between gap-4 mb-3">
                <p className="font-semibold leading-tight">
                    Searching: <span className="font-normal">{searchInput}</span>
                </p>
                <Button size={"sm"} variant={"ghost"}
                    onClick={() => router.back()}
                >
                    <IoArrowBack />
                    Return
                </Button>

            </div>

            <div className="grid grid-cols-1 gap-4">
                {showResults()}
                {isLoadingMore && !isAllFetched && showSkeletonLoadMore()}
            </div>
            {!error &&
                postData.length > 0 &&
                <Button
                    ref={ref}
                    disabled={isAllFetched}
                    variant={"ghost"}
                    className="mt-5 w-full bg-transparenttext-lg font-semibold px-3 py-5 cursor-pointer">
                    {isAllFetched ? "All search results displayed" : "Load More results"}
                    {isLoadingMore && !isAllFetched && !error && <LoaderCircleIcon className="inline-block animate-spin" />}
                </Button>
            }
            {error && <div className="flex flex-col items-center justify-center gap-2">
                <ConstructionIcon className="w-20 h-20" />
                <h1 className="text-2xl font-extrabold">Oops!</h1>
                <p className="text-lg">Something went wrong! Please try again later</p>
            </div>}
        </div>
    );
}