
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Jocks() {

    return (
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <div className="flex-1">
                <div className="flex flex-col gap-5">
                    <div className="relative aspect-video w-full bg-gray-200 rounded-xl overflow-hidden flex justify-center items-center">
                        <Image src="/bg-blue-2.png" alt="Sample"
                            fill
                            className="absolute inset-0 object-cover" />
                        <Image
                            src="/logo-lg.png"
                            alt="Logo"
                            className="relative w-3xs mx-auto"
                            width={250}
                            height={250}
                            quality={100}
                        />
                    </div>
                    <p className="text-3xl font-extrabold mt-5 mb-3 ml-5 text-grey-header">Your Friend, Your Radio</p>
                    {new Array(8).fill({}).map((_, index) => (
                        <div className="grid grid-cols-3 gap-5 mb-3 xl:px-5" key={index}>
                            <div className="relative aspect-4/5 w-full bg-gray-200 rounded-xl overflow-hidden">
                                <Image src={`https://picsum.photos/600/400?random=${index}`} alt="Sample" fill
                                    className="absolute inset-0 object-cover object-top" />
                            </div>
                            <div className="col-span-2 text-radyonatin-blue flex flex-col justify-center gap-1    ">
                                <h3 className="font-extrabold text-xl">Angelo Palmones</h3>
                                <p className="text-sm font-light">Show/s: Morning Vibes, Radyo Natin Nationwide</p>
                                <small className="text-xs font-semibold mb-2">Follow and Subscribe</small>
                                <div className="flex gap-3">
                                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                        <FaFacebookF className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                        <FaXTwitter className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:opacity-80 transition-opacity">
                                        <FaInstagram className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                        <FaTiktok className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                        <FaYoutube className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full xl:w-right-sidebar-width">
                <LatestStoriesComponent />
                <div className="sticky top-5">
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
        </div>
    );
}
