import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import { StationDetailsComponent } from "@/components/StationDetailsComponent";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col xl:flex-row gap-5 p-5">
      <div className="flex-1">
        <Link href="/post/sample-post" className="no-underline">
          <div className="">
            <div className="relative aspect-3/2 w-full bg-gray-200 rounded-md overflow-hidden">
              <Image src={`https://picsum.photos/600/400?random=10`} alt="Sample"
                fill
                className="absolute inset-0 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-gradient-start opacity-80 mt-1/3" />
            </div>
            <h2 className={`text-xl md:text-2xl lg:text-3xl leading-[1.1] font-extrabold mt-5 mb-3`}>An unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries</h2>
            <p className="text-sm font-medium">January 01, 2026</p>
          </div>
        </Link>
        <hr className="my-5 border-t border-gray-300" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {new Array(8).fill({}).map((_, index) => (
            <Link href="/post/sample-post" key={index}>
              <div className="group">
                <div className="aspect-3/2 w-full bg-gray-200 rounded-md relative overflow-hidden">
                  <Image src={`https://picsum.photos/600/400?random=${index}`} alt="Sample"
                    fill
                    className="absolute inset-0 object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-b to-blue-gradient-start from-transparent opacity-90 mt-1/5" />
                  <div className="absolute bottom-0 left-0 w-full text-white p-3">
                    <h2 className="font-bold mb-1 leading-tight line-clamp-2 group-hover:underline">It was popularised in the 1960s with the release of Letraset sheets only five centuries</h2>
                    <p className="text-xs line-clamp-2 leading-relaxed">
                      Lorem Ipsum has been the standard dummy teince the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five centuries, but ale leap into electronic typesetting, remaining essentially unchanged.
                      It was popularised in the 1960s with the release of Letraset sheets
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
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
