"use client";
import { Share } from "lucide-react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { useSelectedStationContext } from "@/context/StationWrapper";
import Image from "next/image";
import { convertTo12HourFormat, getImageSource } from "@/lib/utils";
import { FaPause, FaPlay, FaSpinner } from "react-icons/fa6";
import useSWR from "swr";
import { fetcher } from "@/actions/swr";
import { useAudioPlayerContext } from "@/context/AudioPlayerWrapper";
import { PiWarningCircleFill } from "react-icons/pi";
import RadioPlayerStationSelector from "./RadioPlayerStationSelector";
import { useState } from "react";
import SocialSharingButton from "./SocialSharingButton";
export function RadioPlayer({ }): React.JSX.Element {
    const { selectedStation } = useSelectedStationContext();
    const { isAudioLoading, audioError,
        setIsAudioPlaying, isAudioPlaying,
        audioVolume, setAudioVolume } = useAudioPlayerContext();
    const { data: programData } = useSWR(selectedStation ? { url: "v1/programs/schedule/now?station=" + selectedStation._id } : null, fetcher);
    const [isStationSelectorOpen, setIsStationSelectorOpen] = useState(false);

    return (
        <>
            <RadioPlayerStationSelector open={isStationSelectorOpen} onOpenChange={setIsStationSelectorOpen} />
            <div className="fixed md:bottom-0 bottom-mobile-bottom-nav-height left-0 h-radioplayer-height-md w-full z-30 flex items-center bg-radyonatin-yellow">
                <div className="hidden text-nowrap xl:flex h-full items-center justify-center text-white font-extrabold pl-5 pr-10 uppercase bg-radyonatin-blue rounded-r-full">
                    Now Playing!
                </div>
                <div className="flex flex-1 gap-1 lg:gap-2 items-center px-1 lg:px-3 text-radyonatin-blue">
                    {programData && programData.data.length > 0 && programData.data[0].image ? (
                        <div className="relative size-10 shrink-0 rounded-sm">
                            <Image
                                src={getImageSource(programData.data[0].image)}
                                alt={[programData.data[0].name, "image"].join(" ")}
                                width={100}
                                height={100}
                                className="absolute w-full h-full object-contain"
                                quality={80}
                                priority
                            />
                        </div>
                    ) : selectedStation && selectedStation.logoImage ? (
                        <div className="relative size-10 shrink-0 rounded-sm">
                            <Image
                                src={getImageSource(selectedStation.logoImage)}
                                alt={selectedStation.name}
                                width={100}
                                height={100}
                                className="absolute w-full h-full object-contain"
                                quality={80}
                                priority
                            />
                        </div>
                    ) : null}
                    <div className="flex lg:gap-2 items-start lg:items-center flex-col lg:flex-row">
                        <p className="font-extrabold leading-4 line-clamp-2 uppercase text-sm lg:text-base">
                            {programData && programData.data.length > 0 ? programData.data[0]?.name : selectedStation?.name}
                        </p>
                        {programData && programData.data.length > 0 && (<>
                            <div className="hidden lg:flex bg-radyonatin-blue h-3.5 w-px" />
                            <div className="text-xs leading-4 lg:text-sm text-nowrap">{convertTo12HourFormat(programData.data[0].startTime)} - {convertTo12HourFormat(programData.data[0].endTime)}</div>
                        </>)}

                    </div>
                </div>
                <div className="hidden lg:flex bg-radyonatin-blue h-12 w-px" />
                <SocialSharingButton className="" path="/">
                    <div className="flex items-center">
                        <div className="text-radyonatin-blue px-2 lg:px-5 py-2">
                            <Share size={20} />
                        </div>
                        <p className="hidden xl:block font-medium pr-2 lg:pr-5 -ml-2">Share</p>
                    </div>
                </SocialSharingButton>
                <div className="hidden lg:flex bg-radyonatin-blue h-12 w-px" />

                <div className="hidden lg:block px-5">
                    <Slider defaultValue={[audioVolume]}
                        onValueChange={(value) => {
                            setAudioVolume(value[0])
                        }}
                        max={1} step={.01} className="w-36 mx-auto" />
                </div>
                <div className="hidden lg:flex bg-radyonatin-blue h-12 w-px" />
                <div className="px-0 lg:px-5">
                    <button
                        onClick={() => {
                            if (!isAudioLoading && !audioError)
                                setIsAudioPlaying(!isAudioPlaying);
                        }}
                        className="text-radyonatin-blue px-2 lg:px-5 py-2">
                        {isAudioLoading ? <FaSpinner size={20} className="animate-spin" /> :
                            audioError ? <PiWarningCircleFill size={20} /> :
                                isAudioPlaying ? <FaPause size={20} /> : <FaPlay size={20} />
                        }
                    </button>
                </div>
                <div className="hidden lg:flex bg-radyonatin-blue h-12 w-px" />
                <div className="px-2 lg:px-5">
                    <Button
                        onClick={() => { setIsStationSelectorOpen(true) }}
                        className="bg-radyonatin-blue text-white rounded-md font-bold uppercase text-xs lg:text-sm px-3 py-2 lg:px-5">
                        Choose station
                    </Button>
                </div>
            </div>
        </>
    )

}