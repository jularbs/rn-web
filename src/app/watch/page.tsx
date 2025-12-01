
import FacebookShareComponent from "@/components/FacebookShareComponent";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import SocialSharingButton from "@/components/SocialSharingButton";
import { StationDetailsComponent } from "@/components/StationDetailsComponent";
import TwitterShareComponent from "@/components/TwitterShareComponent";
import VideoLiveStreaming from "@/components/VideoLiveStreaming";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Watch Live | Radyo Natin",
};

export default function watch() {

    return (
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <div className="flex-1">
                <VideoLiveStreaming />
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
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
