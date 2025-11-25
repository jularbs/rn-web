"use client";
import { fetcher } from "@/actions/swr";
import { useAudioPlayerContext } from "@/context/AudioPlayerWrapper";
import { useSelectedStationContext } from "@/context/StationWrapper";
import { cn } from "@/lib/utils";
import { IStation } from "@/types/station";
import { SearchXIcon, ShieldAlertIcon } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
export function RadioStationSelector() {
    const { setSelectedStation, selectedStation } = useSelectedStationContext();
    const { setAudioSource } = useAudioPlayerContext();

    const regions = ["luzon", "visayas", "mindanao"];

    const [selectedRegion, setSelectedRegion] = useState("luzon");

    const { data, isLoading, error } = useSWR({
        url: "v1/stations", params: {
            limit: 0,
            locationGroup: selectedRegion
        }
    }, fetcher); // TODO: Fetch stations data from API
    const stationsData = data ? data.data : [];

    const showSkeleton = () => {
        return new Array(10).fill({}).map((_, index) => (
            <div key={index} className="w-60 h-6 shrink-0 mx-5 my-1 bg-neutral-300 rounded-sm animate-pulse"></div>
        ));
    }

    const showError = () => {
        return <div className="flex flex-col justify-center items-center my-4">
            <ShieldAlertIcon className="size-20 text-neutral-300" />
            <p className="text-lg font-bold">An error occured</p>
        </div>
    }

    const showData = () => {
        if (stationsData.length === 0) {
            return <div className="flex flex-col justify-center items-center my-4">
                <SearchXIcon className="size-20 text-neutral-300" />
                <p className="text-lg font-bold">No stations available for this region</p>
            </div>
        }

        return stationsData.map((data: Partial<IStation>, index: number) => (
            <div key={index} className={cn("hover:underline cursor-pointer p-1 px-5",
                selectedStation?._id === data._id ? "text-radyonatin-blue font-bold" : "text-black font-normal"
            )} onClick={() => {
                setSelectedStation(data as IStation);
                setAudioSource(data.audioStreamURL ?? "");
            }}>
                {data.name}
            </div>
        ))
    }

    return (
        <div>
            <h4 className="uppercase text-radyonatin-blue text-xl font-extrabold">Radyo Natin Stations</h4>
            <div className="grid grid-cols-4">
                <div>
                    {regions.map((region, index) => (
                        <div className={cn("font-semibold pl-5 pr-2 py-3 leading-tight cursor-pointer",
                            selectedRegion === region ? "text-radyonatin-blue bg-greyspace" : "text-black bg-white"
                        )}
                            onClick={() => setSelectedRegion(region)}
                            key={index}>
                            <span className="uppercase">{region}</span>
                            <small className="block text-xs font-light">stations</small>
                        </div>
                    ))}
                </div>
                <div className="col-span-3 bg-greyspace h-96 overflow-y-scroll flex flex-col gap-4 py-4">
                    {isLoading ? showSkeleton() : error ? showError() : showData()}
                </div>
            </div>
        </div>
    );
}