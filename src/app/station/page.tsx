"use client";
import FacebookShareComponent from "@/components/FacebookShareComponent";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import AudioPlayer from "@/components/MediaComponents/AudioPlayer";
import { RadioStationSelector } from "@/components/RadioStationSelector";
import SocialSharingButton from "@/components/SocialSharingButton";
import TwitterShareComponent from "@/components/TwitterShareComponent";
import Image from "next/image";

export default function Station() {

    return (
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <div className="flex-1">
                <h1 className="font-extrabold text-radyonatin-blue text-3xl mb-10">ON AIR NOW: <span className="font-semibold text-2xl text-radyonatin-red italic">CHILLAX TIME WITH DJ ELAI & DJ FATIMA</span></h1>
                <Image src="/logo-lg.png" width={250} height={100} alt="Logo" quality={100} className="mx-auto mb-7" />
                <AudioPlayer src="https://dzrh-azura.mmg.com.ph/listen/dzrh_manila/radio.mp3" />
                {/* TODOS: Set font to Karla */}
                <h3 className="font-medium text-2xl text-radyonatin-red text-center my-5">101.9 Radio Natin Bontoc</h3>
                <div className="flex gap-2 my-10 items-center justify-center font-semibold">
                    <span className="text-xs">Share</span>
                    <FacebookShareComponent />
                    <TwitterShareComponent />
                    <SocialSharingButton className="w-8 h-8 cursor-pointer" />
                </div>
                {/* Station Selector */}
               <RadioStationSelector />
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
