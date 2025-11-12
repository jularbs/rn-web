"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IStation } from "@/types/station";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SelectedStationContextProps {
    selectedStation: IStation | null;
    setSelectedStation: (station: IStation | null) => void;  // New optional prop
}

interface SelectedStationWrapperProps {
    children: React.ReactNode;
    defaultStation?: IStation | null;  // New optional prop
}
const SelectedStationContext = createContext<SelectedStationContextProps>({
    selectedStation: null,
    setSelectedStation: () => { },
});

export function SelectedStationWrapper({ children, defaultStation }: SelectedStationWrapperProps) {
    const [selectedStation, setSelectedStation] = useState(defaultStation ?? null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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