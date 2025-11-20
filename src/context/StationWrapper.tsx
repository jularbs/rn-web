"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IStation } from "@/types/station";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAudioPlayerContext } from "./AudioPlayerWrapper";
import { toast } from "sonner";

interface SelectedStationContextProps {
    selectedStation: IStation | null;
    setSelectedStation: (station: IStation | null) => void;  // New optional prop
    isLoadingData?: boolean;
    setIsLoadingData?: (isLoading: boolean) => void;
    resetSelectedStationToDefault: () => void;
}

interface SelectedStationWrapperProps {
    children: React.ReactNode;
}

const SelectedStationContext = createContext<SelectedStationContextProps>({
    selectedStation: null,
    setSelectedStation: () => { },
    isLoadingData: false,
    setIsLoadingData: () => { },
    resetSelectedStationToDefault: () => { }
});

export function SelectedStationWrapper({ children }: SelectedStationWrapperProps) {
    const { setAudioSource } = useAudioPlayerContext();
    const [selectedStation, setSelectedStation] = useState<IStation | null>(null);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const resetSelectedStationToDefault = () => {
        setIsLoadingData(true);
        fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/stations/default").then(res => res.json())
            .then(data => {
                if (data.data) {
                    setSelectedStation(data.data)
                    if (data.data.audioStreamURL) {
                        setAudioSource(data.data.audioStreamURL)
                    }
                }
            }).catch(() => {
                toast.error("Error!", {
                    style: {
                        background: "rgba(220, 46, 46, 1)",
                        color: "white",
                        border: "none"
                    },
                    description: "There was a problem fetching station details. Please try again later.",
                    duration: 5000,
                    position: "top-center"
                });
            })
            .finally(() => {
                setIsLoadingData(false);
            });
    }

    // get initial selectedStation on mount
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        //get station based on station query params if existing
        if (params.get("station")) {
            setIsLoadingData(true);
            const stationSlug = params.get("station");
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/stations/" + stationSlug).then(res => res.json())
                .then(data => {
                    if (data.data) {
                        setSelectedStation(data.data)
                        if (data.data.audioStreamURL) {
                            setAudioSource(data.data.audioStreamURL)
                        }
                    }
                })
                .catch(() => {
                    toast.error("Error!", {
                        style: {
                            background: "rgba(220, 46, 46, 1)",
                            color: "white",
                            border: "none"
                        },
                        description: "There was a problem fetching station details. Please try again later.",
                        duration: 5000,
                        position: "top-center"
                    });
                })
                .finally(() => {
                    setIsLoadingData(false);
                });
        } else {
            // get default station if station query params is undefined
            resetSelectedStationToDefault();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update URL query params when selectedStation changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (!selectedStation?.default && selectedStation?.slug) {
            params.set("station", selectedStation.slug);
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        } else {
            params.delete("station");
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStation]);

    return (
        <SelectedStationContext.Provider
            value={{
                selectedStation,
                setSelectedStation,
                resetSelectedStationToDefault,
                isLoadingData,
                setIsLoadingData
            }}
        >
            {children}
        </SelectedStationContext.Provider>
    );
}

export function useSelectedStationContext() {
    return useContext(SelectedStationContext);
}