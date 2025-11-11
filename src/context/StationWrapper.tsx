"use client";
import { createContext, useContext, useState } from "react";
import { IStation } from "@/types/station";

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