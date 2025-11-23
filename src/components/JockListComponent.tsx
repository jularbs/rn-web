"use client";

import { fetcher } from "@/actions/swr";
import { useSelectedStationContext } from "@/context/StationWrapper";
import { getImageSource } from "@/lib/utils";
import { IJock } from "@/types/jock";
import { CircleQuestionMarkIcon, SearchXIcon, Undo2Icon } from "lucide-react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import useSWR from "swr";
import { Button } from "./ui/button";

export default function JockListComponent() {

    const { selectedStation, resetSelectedStationToDefault, isLoadingData } = useSelectedStationContext();
    const { data, isLoading, error } = useSWR(selectedStation ? {
        url: "v1/jocks", params: {
            limit: 0,
            station: selectedStation._id
        }
    } : null, fetcher); // TODO: Fetch jocks data from API

    const jockData: Partial<IJock>[] = data ? data.data : [];

    const skeleton = () => {
        return new Array(4).fill({}).map((_, index) => (
            <div className="grid grid-cols-3 gap-5 mb-3 xl:px-5" key={index}>
                <div className="aspect-4/5 w-full rounded-md bg-accent animate-pulse" />
                <div className="col-span-2 flex flex-col justify-center gap-1">
                    <div className="font-extrabold w-40 h-7 bg-accent animate-pulse rounded-sm mb-2" />

                    <div className="w-70 h-4 animate-pulse bg-accent rounded-sm mb-2" />
                    <div className="w-30 h-3 animate-pulse bg-accent rounded-sm mb- 2" />
                    <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-accent animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-accent animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-accent animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-accent animate-pulse" />
                    </div>
                </div>
            </div>
        ))
    }

    const showJocks = () => {
        if (jockData && jockData.length == 0) {
            return <div className="flex flex-col items-center py-10">
                <SearchXIcon className="size-20 text-neutral-300" />
                <p className="text-lg text-bold">No jocks Available for this station</p>
                <div className="mt-3">
                    <Button
                        onClick={() => {
                            resetSelectedStationToDefault();
                        }}
                        className="flex w-full bg-radyonatin-blue uppercase font-extrabold rounded-sm mb-2">
                        <Undo2Icon />
                        Return to Nationwide
                    </Button>
                </div>

            </div>
        }

        return jockData.map((item: Partial<IJock>, index: number) => (
            <div className="grid grid-cols-3 gap-5 mb-3 xl:px-5" key={index}>
                <div className="relative aspect-4/5 w-full bg-gray-200 rounded-md overflow-hidden">
                    <Image src={getImageSource(item.image)} alt={item.name || "Jock Image"} fill
                        className="absolute inset-0 object-cover object-top" />
                </div>
                <div className="col-span-2 text-radyonatin-blue flex flex-col justify-center gap-1    ">
                    <h3 className="font-extrabold text-xl">{item.name}</h3>
                    {item.programs && item.programs.length > 0 ? <p className="text-sm font-light">Show/s: {item.programs?.map(program => program.name).join(", ")}</p> : null}
                    <small className="text-xs font-semibold mb-2">Follow and Subscribe</small>
                    <div className="flex gap-3">
                        {item.socialLinks?.facebook && <a href={item.socialLinks.facebook} className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                            <FaFacebookF className="w-4 h-4" />
                        </a>}

                        {item.socialLinks?.twitter && <a href={item.socialLinks.twitter} className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                            <FaXTwitter className="w-4 h-4" />
                        </a>}

                        {item.socialLinks?.instagram && <a href={item.socialLinks.instagram} className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:opacity-80 transition-opacity">
                            <FaInstagram className="w-4 h-4" />
                        </a>}

                        {item.socialLinks?.tiktok && <a href={item.socialLinks.tiktok} className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                            <FaTiktok className="w-4 h-4" />
                        </a>}

                        {item.socialLinks?.youtube && <a href={item.socialLinks.youtube} className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                            <FaYoutube className="w-4 h-4" />
                        </a>}
                    </div>
                </div>
            </div>
        ))
    }

    const showError = () => {
        return <div className="flex flex-col justify-center items-center py-10">
            <CircleQuestionMarkIcon className="size-30 text-neutral-300" />
            <p className="text-2xl font-extrabold">Oh No!</p>
            <p className="font-bold text-lg">An error occurred while fetching jocks data.</p>
        </div>
    }

    return <div>
        {error ? showError() : isLoading || isLoadingData ? skeleton() : showJocks()}
    </div>;
}