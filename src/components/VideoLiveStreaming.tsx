"use client";

import { fetcher } from "@/actions/swr";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import useSWR from "swr";
import { CiStreamOff } from "react-icons/ci";
import { LoaderCircleIcon } from "lucide-react";
import { IoCloudOfflineOutline } from "react-icons/io5";

export default function VideoLiveStreaming() {

    const { data, isLoading, error } = useSWR({ url: "v1/stations/default" }, fetcher);
    const stationData = data?.data || null;
    const [streamURL, setStreamURL] = useState("");
    const [sourceError, setSourceError] = useState(false);

    useEffect(() => {
        if (stationData) {
            setStreamURL(stationData.videoStreamURL || "");
        }
    }, [stationData])

    const showLoading = () => {
        return <div>
            <LoaderCircleIcon className="size-10 text-gray-400 mx-auto animate-spin" />
            <p>Loading live stream source</p>
        </div>;
    }

    const showError = () => {
        return <div>
            <IoCloudOfflineOutline className="size-10 text-gray-400 mx-auto" />
            <p className="text-red-600">Error loading live stream. Please try again later.</p>
        </div>;
    }

    const showVideoStream = () => {
        if (streamURL)
            return <ReactPlayer
                url={streamURL}
                width="100%"
                height="100%"
                controls
                onError={() => setSourceError(true)}
            />

        return <div>
            <CiStreamOff className="text-6xl text-gray-400 mx-auto" />
            <p>No live streaming source available.</p>
        </div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-extrabold mb-5 text-grey-header">WATCH LIVE!</h1>
            <div className="aspect-video w-full bg-gray-200 flex justify-center items-center rounded-sm overflow-hidden">
                {isLoading ? showLoading() : error || sourceError ? showError() : showVideoStream()}
            </div>
            {isLoading ?
                <div className="w-75 h-8 bg-neutral-200 animate-pulse rounded-sm mt-3" /> :
                stationData && stationData.name && <p className="text-2xl font-extrabold my-3">{stationData.name}</p>}
        </div>
    )

}