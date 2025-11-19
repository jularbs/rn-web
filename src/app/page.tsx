import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import { PostsLandingPageComponent } from "@/components/PostsLandingPageComponent";
import { StationDetailsComponent } from "@/components/StationDetailsComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col xl:flex-row gap-5 p-5">
      <PostsLandingPageComponent />
      <div className="w-full xl:w-right-sidebar-width">
        <StationDetailsComponent />
        <LatestStoriesComponent />
        <div className="flex justify-center items-center mb-3">
          <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
            <Image src={`https://picsum.photos/600/400?random=${Math.floor(Math.random() * 10) + 1}`} alt="Sample"
              fill
              className="absolute inset-0 object-cover" />
          </div>
        </div>
        <div className="flex justify-center items-center mb-3">
          <div className="relative h-[250px] w-[300px] bg-gray-300 my-5">
            <Image src={`https://picsum.photos/600/400?random=${Math.floor(Math.random() * 10) + 1}`} alt="Sample"
              fill
              className="absolute inset-0 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
