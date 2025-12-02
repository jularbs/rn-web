"use client";
import { open_sans } from "@/app/fonts";
import ContentComponent from "@/components/ContentComponent/ContentComponent";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import { cn } from "@/lib/utils";
import { StationDetailsComponent } from "./StationDetailsComponent";
import { IOptions } from "@/types/option";

export default function ViewPageComponent({ pageData }: { pageData: IOptions }): React.JSX.Element {

    return <>

        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <div className="flex-1">
                <ContentComponent content={pageData.value} className={cn("leading-loose font-semibold", open_sans.className)} />
            </div>
            <div className="w-full xl:w-right-sidebar-width">
                <StationDetailsComponent />
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
    </>;
}