"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
export function RadioStationSelector() {
    const sampleData = [
        {
            name: "101.9 Radyo Natin Bontoc"
        },
        {
            name: "100.9 Radyo Natin Baguias"
        },
        {
            name: "107.1 Radyo Natin Tabuk"
        },
        {
            name: "103.4 Radyo Natin Candon"
        },
        {
            name: "101.9 Radyo Natin Boac"
        },
        {
            name: "96.1 Radyo Natin Calapan"
        },
        {
            name: "100.8 Radyo Natin Pinamalayan"
        },
        {
            name: "88.9 Radyo Natin Sta. Cruz"
        }, {
            name: "101.9 Radyo Natin Bontoc"
        },
        {
            name: "100.9 Radyo Natin Baguias"
        },
        {
            name: "107.1 Radyo Natin Tabuk"
        },
        {
            name: "103.4 Radyo Natin Candon"
        },
        {
            name: "101.9 Radyo Natin Boac"
        },
        {
            name: "96.1 Radyo Natin Calapan"
        },
        {
            name: "100.8 Radyo Natin Pinamalayan"
        },
        {
            name: "88.9 Radyo Natin Sta. Cruz"
        }
    ]
    const regions = ["luzon", "visayas", "mindanao"];

    const [selectedRegion, setSelectedRegion] = useState("luzon");
    const [selectedRadioStation, setSelectedRadioStation] = useState(sampleData[0].name);

    return (
        <div>
            <h4 className="uppercase text-radyonatin-blue text-xl font-extrabold">Radyo Natin Stations</h4>
            <div className="grid grid-cols-4">
                <div>
                    {regions.map((region, index) => (
                        <div className={cn("font-semibold pl-5 pr-2 py-3 leading-tight cursor-pointer",
                            selectedRegion === region ? "text-radyonatin-blue bg-greyspace" : "text-black bg-white"
                        )}
                            onClick={() => setSelectedRegion(region)}
                            key={index}>
                            <span className="uppercase">{region}</span>
                            <small className="block text-xs font-light">stations</small>
                        </div>
                    ))}
                </div>
                <div className="col-span-3 bg-greyspace h-96 overflow-y-scroll flex flex-col gap-4 py-4">
                    {sampleData.map((data, index) => (
                        <div key={index} className={cn("hover:underline cursor-pointer p-1 px-5",
                            selectedRadioStation === data.name ? "text-radyonatin-blue font-bold" : "text-black font-normal"
                        )} onClick={() => setSelectedRadioStation(data.name)}>{data.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}