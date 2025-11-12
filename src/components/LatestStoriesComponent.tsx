import Image from "next/image"
import Link from "next/link"

export function LatestStoriesComponent({ }) {
    return <>
        <h3 className={`text-2xl uppercase font-extrabold ml-5 mb-3 text-radyonatin-blue`}>Latest Stories</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-3 mb-5">
            {new Array(5).fill({}).map((_, index) => (
                <Link href="/post/sample-post" key={index}>
                    <div className={`group grid grid-cols-5 gap-2`}>
                        <div className="relative aspect-3/2 bg-gray-200 rounded-xl overflow-hidden col-span-2 border border-black">
                            <Image src={`https://picsum.photos/600/400?random=${index}`} alt="Sample"
                                fill
                                className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-gradient-start opacity-80 mt-1/3" />
                        </div>
                        <div className="col-span-3">
                            <h4 className="text-sm font-extrabold leading-tight line-clamp-2 group-hover:underline">established fact that a reader will be distracted by the readable content</h4>
                            <p className="text-xs font-bold line-clamp-2">established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using</p>
                            <p className="text-2xs">January 01, 2026</p>
                        </div>
                    </div>
                </Link>

            ))}
        </div>
    </>
}