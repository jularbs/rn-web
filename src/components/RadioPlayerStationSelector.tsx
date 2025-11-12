"use client";
import { fetcher } from "@/actions/swr";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { useAudioPlayerContext } from "@/context/AudioPlayerWrapper";
import { useSelectedStationContext } from "@/context/StationWrapper";
import { IStation } from "@/types/station";
import useSWR from "swr";

export default function RadioPlayerStationSelector({ open, onOpenChange }:
    { open: boolean, onOpenChange: React.Dispatch<React.SetStateAction<boolean>>, type?: string }) {
    const { data: stationList } = useSWR(open ? { url: "v1/stations" } : null, fetcher);
    const { setSelectedStation } = useSelectedStationContext();
    const { setAudioSource } = useAudioPlayerContext();

    const showStationList = () => {
        return stationList && stationList.data && stationList.data.map((station: Partial<IStation>) => (
            <li
                className="py-2 uppercase font-bold text-lg cursor-pointer hover:bg-gray-100"
                key={station._id}
                onClick={() => {
                    setSelectedStation(station as IStation);
                    setAudioSource(station.audioStreamURL ?? "");
                    onOpenChange(false);
                }}
            >
                {station.name}
            </li>
        ));
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[95vh] overflow-y-auto top-10 translate-y-0">
                <DialogHeader>
                    <DialogTitle>Radyo Natin Stations</DialogTitle>
                </DialogHeader>
                <div>
                    {/* Station selection content goes here */}
                    <ul>
                        {showStationList()}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    );
};