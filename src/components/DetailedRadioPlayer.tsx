"use client";

import { fetcher } from "@/actions/swr";
import { useSelectedStationContext } from "@/context/StationWrapper";
import { getImageSource } from "@/lib/utils";
import useSWR from "swr";
import { RadioStationSelector } from "./RadioStationSelector";
import Image from "next/image";
import FacebookShareComponent from "./FacebookShareComponent";
import TwitterShareComponent from "./TwitterShareComponent";
import SocialSharingButton from "./SocialSharingButton";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function DetailedRadioPlayer() {
    const { selectedStation } = useSelectedStationContext();

    const { data: programData } = useSWR(selectedStation ? { url: "v1/programs/schedule/now?station=" + selectedStation._id } : null, fetcher);

    return <div className="flex-1">
        <h1 className="flex items-center gap-1 lg:gap-3 mb-10 flex-col lg:flex-row">
            <span className="font-extrabold text-radyonatin-blue text-2xl lg:text-3xl">ON AIR NOW:</span>
            <span className="font-semibold text-lg lg:text-2xl text-radyonatin-red italic">
                {programData && programData.data.length > 0 ? programData.data[0]?.name : selectedStation?.name}
            </span>
        </h1>
        {selectedStation?.logoImage &&
            <Image src={getImageSource(selectedStation?.logoImage)} width={250} height={100} alt="Logo" quality={100} className="mx-auto mb-7" />
        }
        {selectedStation && <h3 className="font-bold text-2xl text-radyonatin-red text-center my-5">
            {selectedStation.frequency ? selectedStation.frequency + " " : ""}
            {selectedStation.name}</h3>}

        {selectedStation?.socialLinks && Object.values(selectedStation.socialLinks).some(link => link && link !== "") && (
            <div className="my-5 px-10">
                <ul className="flex justify-center gap-5">
                    {selectedStation?.socialLinks?.facebook &&
                        <li>
                            <a href={selectedStation.socialLinks.facebook}
                                target="_blank"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                        </li>
                    }
                    {selectedStation?.socialLinks?.twitter &&
                        <li>
                            <a href={selectedStation.socialLinks.twitter}
                                target="_blank"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                <FaXTwitter className="w-5 h-5" />
                            </a>
                        </li>
                    }
                    {selectedStation?.socialLinks?.instagram &&
                        <li>
                            <a href={selectedStation.socialLinks.instagram}
                                target="_blank"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                        </li>
                    }
                    {selectedStation?.socialLinks?.tiktok &&
                        <li>
                            <a href={selectedStation.socialLinks.tiktok}
                                target="_blank"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                <FaTiktok className="w-5 h-5" />
                            </a>
                        </li>
                    }
                    {selectedStation?.socialLinks?.youtube &&
                        <li>
                            <a href={selectedStation.socialLinks.youtube}
                                target="_blank"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </li>
                    }
                </ul>
            </div>
        )}
        <div className="flex gap-2 my-15 items-center justify-center font-semibold">
            <span className="text-xs">Share</span>
            <FacebookShareComponent />
            <TwitterShareComponent />
            <SocialSharingButton className="w-8 h-8 cursor-pointer" />
        </div>
        {/* Station Selector */}
        <RadioStationSelector />
    </div>
}