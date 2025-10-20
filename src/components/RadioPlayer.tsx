import { PlayIcon, Share } from "lucide-react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

export function RadioPlayer({ }): React.JSX.Element {
    return (
        <div className="fixed bottom-0 left-0 h-radioplayer-height-md w-full z-50 flex items-center bg-radyonatin-yellow">
            <div className="h-full flex items-center justify-center text-white font-extrabold pl-5 pr-10 uppercase bg-radyonatin-blue rounded-r-full">
                Now Playing!
            </div>
            <div className="flex flex-1 gap-2 items-center px-3 text-radyonatin-blue">
                <div className="size-10 bg-gray-500 rounded-sm"></div>
                <p className="font-extrabold uppercase">Radyo Natin Nationwide</p>
                <div className="bg-radyonatin-blue h-3.5 w-px" />
                <div className="text-sm">7:00pm - 8:00pm</div>
            </div>
            <div className="flex bg-radyonatin-blue h-12 w-px" />
            <div className="flex gap-2 items-center px-5 text-radyonatin-blue">
                <Share className="size-5" />
                <p className="font-medium">Share</p>
            </div>
            <div className="flex bg-radyonatin-blue h-12 w-px" />
            <div className="px-5">
                {/* TODOS: Change slider color to match design */}
                <Slider defaultValue={[100]} max={100} step={1} className="w-36 mx-auto" />
            </div>
            <div className="flex bg-radyonatin-blue h-12 w-px" />
            <div className="px-5">
                <button className="text-radyonatin-blue px-5 py-2">
                    <PlayIcon size={20} />
                </button>
            </div>
            <div className="flex bg-radyonatin-blue h-12 w-px" />
            <div className="px-5">
                <Button className="bg-radyonatin-blue text-white rounded-lg font-bold uppercase text-sm px-5 py-2">
                    Choose your station
                </Button>
            </div>
        </div>
    )

}