
import JockListComponent from "@/components/JockListComponent";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import Image from "next/image";

export default function Jocks() {

    return (
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <div className="flex-1">
                <div className="flex flex-col gap-5">
                    <div className="relative aspect-video w-full bg-gray-200 rounded-md overflow-hidden flex justify-center items-center">
                        <Image src="/bg-blue-2.png" alt="Sample"
                            fill
                            className="absolute inset-0 object-cover" />
                        <Image
                            src="/logo-lg.png"
                            alt="Logo"
                            className="relative w-1/3 mx-auto"
                            width={250}
                            height={250}
                            quality={100}
                        />
                    </div>
                    <p className="text-3xl font-extrabold mt-5 mb-3 ml-5 text-grey-header">Your Friend, Your Radio</p>
                    <JockListComponent></JockListComponent>
                </div>
            </div>
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
