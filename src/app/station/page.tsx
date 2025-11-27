import { DetailedRadioPlayer } from "@/components/DetailedRadioPlayer";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Listen Live | Radyo Natin",
};

export default function Station() {

    return (
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <DetailedRadioPlayer />
            <div className="w-full xl:w-right-sidebar-width">
                <LatestStoriesComponent />
                <div className="sticky top-5">
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
