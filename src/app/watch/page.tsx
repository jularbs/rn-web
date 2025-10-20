
import FacebookShareComponent from "@/components/FacebookShareComponent";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import SocialSharingButton from "@/components/SocialSharingButton";
import TwitterShareComponent from "@/components/TwitterShareComponent";
import Image from "next/image";
import ReactPlayer from 'react-player'

export default function watch() {

    return (
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <div className="flex-1">
                <h1 className="text-3xl font-extrabold mb-5 text-grey-header">WATCH LIVE!</h1>
                <div className="aspect-video w-full bg-gray-200 flex justify-center items-center">
                    <ReactPlayer src='https://www.youtube.com/watch?v=LXb3EKWsInQ' width={"100%"} height={"100%"} />
                </div>
                {/* TODOS: Set font to Karla */}
                <p className="text-2xl font-extrabold my-3">Radio Natin Nationwide</p>
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
    );
}
