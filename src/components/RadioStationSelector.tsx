"use client";
import { fetcher } from "@/actions/swr";
import { useAudioPlayerContext } from "@/context/AudioPlayerWrapper";
import { useSelectedStationContext } from "@/context/StationWrapper";
import { cn } from "@/lib/utils";
import { IStation } from "@/types/station";
import { LoaderCircleIcon, SearchXIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { Input } from "./ui/input";
import { IoCloudOfflineOutline } from "react-icons/io5";

export function RadioStationSelector() {
    const { setSelectedStation, selectedStation } = useSelectedStationContext();
    const { setAudioSource, setIsAudioPlaying } = useAudioPlayerContext();

    const regions = ["luzon", "visayas", "mindanao"];

    const [selectedRegion, setSelectedRegion] = useState("luzon");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 700);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data, isLoading, error } = useSWR({
        url: "v1/stations", params: {
            limit: 0,
            locationGroup: selectedRegion,
            search: debouncedSearchQuery
        }
    }, fetcher);

    const stationsData = useMemo(() => data ? data.data : [], [data]);

    const handleStationClick = useCallback((station: Partial<IStation>) => {
        setSelectedStation(station as IStation);
        setAudioSource(station.audioStreamURL ?? "");
        if (station.audioStreamURL)
            setIsAudioPlaying(true);
    }, [setSelectedStation, setAudioSource, setIsAudioPlaying]);

    const showLoading = useMemo(() => {
        return <div className="flex flex-col justify-center items-center my-4">
            <LoaderCircleIcon className="size-10 text-neutral-300 animate-spin" />
            <p>Loading stations...</p>
        </div>
    }, []);

    const showError = useMemo(() => {
        return <div className="flex flex-col justify-center items-center my-4">
            <IoCloudOfflineOutline className="size-20 text-neutral-300" />
            <p>An error occured</p>
        </div>
    }, []);

    const showData = useMemo(() => {
        if (stationsData.length === 0) {
            return <div className="flex flex-col justify-center items-center my-4">
                <SearchXIcon className="size-20 text-neutral-300" />
                <p className="text-lg font-bold">No stations available for this region</p>
            </div>
        }

        return stationsData.map((data: Partial<IStation>, index: number) => (
            <div key={index} className={cn("hover:underline cursor-pointer py-3 px-4",
                selectedStation?._id === data._id ? "text-radyonatin-blue font-bold" : "text-black font-normal"
            )} onClick={() => handleStationClick(data)}>
                {data.name}
            </div>
        ))
    }, [stationsData, handleStationClick, selectedStation]);

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
                <div className="col-span-3 bg-greyspace h-96 overflow-y-scroll flex flex-col">
                    <div className="p-3">
                        <Input type="text" placeholder="Search stations..."
                            className="bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    {isLoading ? showLoading : error ? showError : showData}
                </div>
            </div>
        </div>
    );
}