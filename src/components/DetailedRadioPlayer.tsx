"use client";

import { fetcher } from "@/actions/swr";
import { useSelectedStationContext } from "@/context/StationWrapper";
import { getImageSource } from "@/lib/utils";
import useSWR from "swr";
import { RadioStationSelector } from "./RadioStationSelector";
import AudioPlayer from "./MediaComponents/AudioPlayer";
import Image from "next/image";
import FacebookShareComponent from "./FacebookShareComponent";
import TwitterShareComponent from "./TwitterShareComponent";
import SocialSharingButton from "./SocialSharingButton";

export function DetailedRadioPlayer() {
    const { selectedStation } = useSelectedStationContext();

    const { data: programData } = useSWR(selectedStation ? { url: "v1/programs/schedule/now?station=" + selectedStation._id } : null, fetcher);

    return <div className="flex-1">
        <h1 className="flex items-center gap-3 mb-10">
            <span className="font-extrabold text-radyonatin-blue text-3xl">ON AIR NOW:</span>
            <span className="font-semibold text-2xl text-radyonatin-red italic">
                {programData && programData.data.length > 0 ? programData.data[0]?.name : selectedStation?.name}
            </span>
        </h1>
        {selectedStation?.logoImage &&
            <Image src={getImageSource(selectedStation?.logoImage)} width={250} height={100} alt="Logo" quality={100} className="mx-auto mb-7" />
        }
        <AudioPlayer />

        {selectedStation && <h3 className="font-medium text-2xl text-radyonatin-red text-center my-5">
            {selectedStation.frequency ? selectedStation.frequency + " " : ""}
            {selectedStation.name}</h3>}
        <div className="flex gap-2 my-10 items-center justify-center font-semibold">
            <span className="text-xs">Share</span>
            <FacebookShareComponent />
            <TwitterShareComponent />
            <SocialSharingButton className="w-8 h-8 cursor-pointer" />
        </div>
        {/* Station Selector */}
        <RadioStationSelector />
    </div>
}