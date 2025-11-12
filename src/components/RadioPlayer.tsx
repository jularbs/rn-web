"use client";
import { Share } from "lucide-react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { useSelectedStationContext } from "@/context/StationWrapper";
import Image from "next/image";
import { getImageSource } from "@/lib/utils";
import { FaPlay } from "react-icons/fa6";

export function RadioPlayer({ }): React.JSX.Element {
    const { selectedStation } = useSelectedStationContext();

    return (
        <div className="fixed md:bottom-0 bottom-mobile-bottom-nav-height left-0 h-radioplayer-height-md w-full z-30 flex items-center bg-radyonatin-yellow">
            <div className="hidden text-nowrap xl:flex h-full items-center justify-center text-white font-extrabold pl-5 pr-10 uppercase bg-radyonatin-blue rounded-r-full">
                Now Playing!
            </div>
            <div className="flex flex-1 gap-1 lg:gap-2 items-center px-1 lg:px-3 text-radyonatin-blue">
                <div className="relative size-10 shrink-0 rounded-sm">
                    {selectedStation?.logoImage && (
                        <Image
                            src={getImageSource(selectedStation.logoImage)}
                            alt={selectedStation.name}
                            width={300}
                            height={300}
                            className="absolute w-full h-full object-contain"
                            quality={100}
                            priority
                        />
                    )}

                </div>
                <div className="flex lg:gap-2 items-start lg:items-center flex-col lg:flex-row">
                    <p className="font-extrabold leading-4 line-clamp-2 uppercase text-sm lg:text-base">{selectedStation?.name} {selectedStation?.frequency}</p>
                    <div className="hidden lg:flex bg-radyonatin-blue h-3.5 w-px" />
                    <div className="text-xs leading-4 lg:text-sm text-nowrap">7:00pm - 8:00pm</div>
                </div>
            </div>
            <div className="hidden lg:flex bg-radyonatin-blue h-12 w-px" />
            <div className="flex items-center">
                <button className="text-radyonatin-blue px-2 lg:px-5 py-2">
                    <Share size={20} />
                </button>
                <p className="hidden lg:block font-medium pr-2 lg:pr-5">Share</p>
            </div>
            <div className="hidden lg:flex bg-radyonatin-blue h-12 w-px" />
            
            <div className="hidden lg:block px-5">
                {/* TODOS: Change slider color to match design */}
                <Slider defaultValue={[100]} max={100} step={1} className="w-36 mx-auto" />
            </div>
            <div className="hidden lg:flex bg-radyonatin-blue h-12 w-px" />
            <div className="px-0 lg:px-5">
                <button className="text-radyonatin-blue px-2 lg:px-5 py-2">
                    <FaPlay size={20} />
                </button>
            </div>
            <div className="hidden lg:flex bg-radyonatin-blue h-12 w-px" />
            <div className="px-2 lg:px-5">
                <Button
                    className="bg-radyonatin-blue text-white rounded-lg font-bold uppercase text-xs lg:text-sm px-3 py-2 lg:px-5">
                    Choose station
                </Button>
            </div>
        </div>
    )

}