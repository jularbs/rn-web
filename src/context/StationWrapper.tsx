"use client";
import { createContext, use, useContext, useEffect, useState } from "react";
import { IStation } from "@/types/station";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAudioPlayerContext } from "./AudioPlayerWrapper";

interface SelectedStationContextProps {
    selectedStation: IStation | null;
    setSelectedStation: (station: IStation | null) => void;  // New optional prop
}

interface SelectedStationWrapperProps {
    children: React.ReactNode;
}
const SelectedStationContext = createContext<SelectedStationContextProps>({
    selectedStation: null,
    setSelectedStation: () => { },
});

export function SelectedStationWrapper({ children }: SelectedStationWrapperProps) {
    const { setAudioSource } = useAudioPlayerContext();
    const [selectedStation, setSelectedStation] = useState<IStation | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // get initial selectedStation on mount
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        //get station based on station query params if existing
        if (params.get("station")) {
            const stationSlug = params.get("station");
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/stations/" + stationSlug).then(res => res.json())
                .then(data => {
                    console.log("provided slug station: ", data)
                    if (data.data) {
                        setSelectedStation(data.data)
                        if (data.data.audioStreamURL) {
                            setAudioSource(data.data.audioStreamURL)
                        }
                    }
                })
            console.log("Station slug from URL:", stationSlug);
        } else {
            // get default station if station query params is undefined
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/stations/default").then(res => res.json())
                .then(data => {
                    console.log("default station: ", data)
                    if (data.data) {
                        setSelectedStation(data.data)
                        if (data.data.audioStreamURL) {
                            setAudioSource(data.data.audioStreamURL)
                        }
                    }
                })
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
            }}
        >
            {children}
        </SelectedStationContext.Provider>
    );
}

export function useSelectedStationContext() {
    return useContext(SelectedStationContext);
}