"use client";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AtSignIcon } from "lucide-react";
import { IoCall } from "react-icons/io5";
import { useSelectedStationContext } from "@/context/StationWrapper";
import { usePathname } from "next/navigation";

export function StationDetailsComponent(): React.ReactNode | null {
    const { selectedStation, isLoadingData } = useSelectedStationContext();
    const pathname = usePathname();
    const isStationPage = pathname?.startsWith("/station");
    if (!isStationPage && (!selectedStation || selectedStation.default)) return null;

    const showSkeleton = () => {
        return <>
            <div className="grid gap-3">
                <div>
                    <div className="w-full h-10 bg-accent animate-pulse rounded-sm" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-full">
                        <div className="h-4 w-full bg-accent animate-pulse rounded-sm mb-4" />
                        <div className="h-4 w-30 bg-accent animate-pulse rounded-sm" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-40 bg-accent animate-pulse rounded-sm" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-30 bg-accent animate-pulse rounded-sm" />
                </div>
            </div>
            <div className="h-[300px] w-full mt-7 bg-accent animate-pulse" />
            <hr className="border-t border-gray-300 my-5" />
        </>
    }

    if (isLoadingData) return showSkeleton();

    return (
        <>
            <div className="grid gap-3">
                <div>
                    <p className="text-2xl font-extrabold uppercase text-center text-radyonatin-blue">{selectedStation?.name || "Radyo Natin Station"}</p>
                </div>
                {selectedStation?.address && (
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <FaMapMarkerAlt size={20} />
                        </div>
                        <p className="font-bold">
                            {selectedStation?.address}
                        </p>
                    </div>
                )}
                {selectedStation?.email && (
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <AtSignIcon size={20} />
                        </div>
                        <p className="font-bold">
                            {selectedStation?.email}
                        </p>
                    </div>
                )}
                {selectedStation?.contactNumber && (
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <IoCall size={20} />
                        </div>
                        <p className="font-bold">
                            {selectedStation?.contactNumber}
                        </p>
                    </div>
                )}
            </div>
            {selectedStation?.mapEmbedCode &&
                <div
                    className="iframe-container h-[300px] w-full overflow-scroll mt-5"
                    dangerouslySetInnerHTML={{ __html: selectedStation?.mapEmbedCode as string }} />
            }
            <hr className="border-t border-gray-300 my-5" />


        </>
    )
}