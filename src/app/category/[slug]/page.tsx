import AdComponent from "@/components/AdComponent";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import { PostsLandingPageComponent } from "@/components/PostsLandingPageComponent";
import { StationDetailsComponent } from "@/components/StationDetailsComponent";

export default async function Category({
  params
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params; // Replace with dynamic slug if needed
  return (
    <div className="flex flex-col xl:flex-row gap-5 p-5">
      <PostsLandingPageComponent category={slug} />
      <div className="w-full xl:w-right-sidebar-width">
        <StationDetailsComponent />
        <LatestStoriesComponent />
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
  );
}
