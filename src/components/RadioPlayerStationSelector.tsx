"use client";
import { fetcher } from "@/actions/swr";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { useAudioPlayerContext } from "@/context/AudioPlayerWrapper";
import { useSelectedStationContext } from "@/context/StationWrapper";
import { IStation } from "@/types/station";
import { useState, useEffect, useCallback, useMemo } from "react";
import useSWR from "swr";
import { Input } from "./ui/input";
import { LoaderCircleIcon, SearchXIcon } from "lucide-react";
import { IoCloudOfflineOutline } from "react-icons/io5";

export default function RadioPlayerStationSelector({ open, onOpenChange }:
    { open: boolean, onOpenChange: React.Dispatch<React.SetStateAction<boolean>>, type?: string }) {

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    // Reset search when dialog closes
    useEffect(() => {
        if (!open) {
            setSearchQuery("");
            setDebouncedSearchQuery("");
        }
    }, [open]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 700);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data, isLoading, error } = useSWR(open ? {
        url: "v1/stations", params: {
            limit: 0,
            search: debouncedSearchQuery
        }
    } : null, fetcher, {
        revalidateOnFocus: false,
    });

    const stationList = useMemo(() => data?.data ?? [], [data]);

    const { setSelectedStation } = useSelectedStationContext();
    const { setAudioSource } = useAudioPlayerContext();

    const handleStationClick = useCallback((station: Partial<IStation>) => {
        setSelectedStation(station as IStation);
        setAudioSource(station.audioStreamURL ?? "");
        // if (station.audioStreamURL)
        //     setIsAudioPlaying(true);
        onOpenChange(false);


    }, [setSelectedStation, setAudioSource, onOpenChange]);

    const showError = useMemo(() => (
        <li className="mt-4 text-center text-lg text-red-600">
            <IoCloudOfflineOutline className="size-10 text-gray-400 mx-auto" />
            <p>Error loading stations. Please try again later.</p>
        </li>
    ), []);

    const showLoading = useMemo(() => (
        <li className="mt-4 text-center text-lg">
            <LoaderCircleIcon className="size-10 text-gray-400 animate-spin mx-auto" />
            <p>Loading stations...</p>
        </li>
    ), []);

    const showStationList = useMemo(() => {
        if (stationList.length === 0) {
            return (
                <li className="mt-4 text-center text-lg">
                    <SearchXIcon className="size-10 text-gray-400 mx-auto" />
                    <p>No stations found</p>
                </li>
            );
        }

        return stationList.map((station: Partial<IStation>) => (
            <li
                className="py-2 uppercase font-bold text-lg cursor-pointer hover:bg-gray-100"
                key={station._id}
                onClick={() => handleStationClick(station)}
            >
                {station.name}
            </li>
        ));
    }, [stationList, handleStationClick]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[95vh] overflow-y-auto top-10 translate-y-0">
                <DialogHeader>
                    <DialogTitle>Radyo Natin Stations</DialogTitle>
                </DialogHeader>
                <div>
                    <div>
                        <Input type="text" placeholder="Search stations..."
                            className="mb-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <ul>
                        {isLoading ? showLoading : error ? showError : showStationList}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    );
};