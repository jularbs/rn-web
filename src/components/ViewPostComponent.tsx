"use client";
import { useState } from "react";
import { open_sans } from "@/app/fonts";
import ContentComponent from "@/components/ContentComponent/ContentComponent";
import FacebookShareComponent from "@/components/FacebookShareComponent";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import SocialSharingButton from "@/components/SocialSharingButton";
import TwitterShareComponent from "@/components/TwitterShareComponent";
import { cn, getImageSource } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { ArrowLeftIcon, Share2Icon, X } from "lucide-react";
import { IPost } from "@/types/post";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { StationDetailsComponent } from "./StationDetailsComponent";
import { Badge } from "./ui/badge";
import { IoPlay } from "react-icons/io5";
import ReactPlayer from "react-player";
import { Button } from "./ui/button";
import AdComponent from "./AdComponent";

export default function ViewPostComponent({ postData }: { postData: IPost }): React.JSX.Element {
    const router = useRouter();
    const { ref, inView } = useInView({ threshold: 1, initialInView: true });
    const [showVideo, setShowVideo] = useState(false);

    const showTags = () => {
        return <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold mr-1">Tags: </span>
            {postData.tags.map((tag: Record<string, string>, index: number) => (
                <span key={index} className="text-xs border-1 rounded-xs border-neutral-600 px-2 py-1">{tag.name}</span>
            ))}
        </div>
    }

    return <>
        <div className={cn("flex items-center gap-2 h-[60px] py-1 px-3 border-b-3 border-radyonatin-blue bg-white",
            "sticky top-logo-container-height",
            "md:p-1 md:gap-2 md:h-[80px] md:top-searchbar-container-height",
            "opacity-0 transition-opacity duration-200", !inView ? "opacity-100 z-10" : "opacity-0"
        )}>
            <div className="px-2 md:hidden"
                onClick={() => router.back()}>
                <ArrowLeftIcon className="size-6 md:size-8" />
            </div>
            <div className="relative aspect-3/2 h-full bg-gray-200 rounded-sm overflow-hidden shrink-0 hidden md:block">
                <Image src={getImageSource(postData.thumbnailImage)} alt="sample" fill
                    className="absolute inset-0 object-cover" />
            </div>
            <div className="line-clamp-2 font-extrabold grow-1 leading-tight text-sm md:text-base">{postData.title}</div>
            <SocialSharingButton className="cursor-pointer p-2">
                <Share2Icon className="size-6 mr-1 md:mr-3" />
            </SocialSharingButton>
        </div>
        <div className="flex flex-col xl:flex-row gap-5 p-5 -mt-[60px] md:-mt-[80px]">
            <div className="flex-1">
                <div className={open_sans.className}>
                    <div className="relative aspect-3/2 w-full bg-gray-200 rounded-md overflow-hidden" ref={ref}>
                        <Image src={getImageSource(postData.featuredImage)} alt="sample" fill
                            className="absolute inset-0 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-gradient-start opacity-80 mt-1/3" />
                        <div className="absolute top-0 right-0 text-white p-3">
                            {postData.isFeatured && <Badge className="px-3 font-bold bg-radyonatin-blue">Featured</Badge>}
                        </div>
                        {postData.type === "video article" && postData.videoSourceUrl && <div>
                            <div className="absolute inset-0 m-auto flex justify-center items-center">
                                <Button className="cursor-pointer bg-radyonatin-yellow/90 hover:bg-radyonatin-yellow text-black rounded-sm"
                                    onClick={() => { setShowVideo(true) }}>
                                    <IoPlay />
                                    <span className="text-xs font-bold">Play Video</span>
                                </Button>
                            </div>
                            {showVideo && <div className="absolute inset-0">
                                <ReactPlayer url={postData.videoSourceUrl} playing={showVideo} controls={true} width="100%" height="100%" />
                                <Button
                                    size={"sm"}
                                    variant={"secondary"}
                                    onClick={() => setShowVideo(false)}
                                    className="absolute cursor-pointer top-2 left-2 rounded-sm opacity-50 hover:bg-secondary hover:opacity-100 transition-opacity duration-300">
                                    <X />
                                    <span className="text-xs">Close</span>
                                </Button>
                            </div>}
                        </div>}
                    </div>
                    <small className="p-1 text-neutral-500">{postData.featuredImageCaption}</small>
                    <h1 className="text-3xl font-extrabold my-3">{postData.title}</h1>
                    {postData.publishedAt && <p className="text-sm">{format(postData.publishedAt, "PPP")}</p>}
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
                <StationDetailsComponent />
                <LatestStoriesComponent />
                <div className="sticky top-5">
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                            <AdComponent />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                            <AdComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}