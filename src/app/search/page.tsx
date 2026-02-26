
import AdComponent from "@/components/AdComponent";
import { SearchResultsComponent } from "@/components/SearchResultsComponent";
import { StationDetailsComponent } from "@/components/StationDetailsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search Results | Radyo Natin",
};

export default function search() {

    return (
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <div className="flex-1">
                <SearchResultsComponent />
            </div>
            <div className="w-full xl:w-right-sidebar-width">
                <StationDetailsComponent />
                <div className="sticky top-5">
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                            <AdComponent />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-3">
                        <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
                            <AdComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
