//TODOS: Set logo to selected station and set query param to selected station
"use client";
import { open_sans } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { MenuIcon, Undo2Icon } from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaHome, FaInstagram, FaPlay, FaTiktok } from "react-icons/fa";
import { FaMusic, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { MdRadio } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelectedStationContext } from "@/context/StationWrapper";
import Link from "next/link";
import { LinkWithStationQuery } from "../LinkWithStationQuery";
import { Button } from "../ui/button";
import { ABOUT_US_SLUG, ADVERTISE_WITH_US_SLUG, PRIVACY_POLICY_SLUG, TERMS_OF_USE_SLUG } from "@/constants";

export function Sidebar({ }): React.JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { selectedStation, resetSelectedStationToDefault } = useSelectedStationContext();

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen])

    return (
        <div className={cn("sticky top-0 left-0 h-full w-full md:max-w-sidebar-width bg-greyspace z-40 md:z-20", // Adjust zIndex for mobile menu to avoid overlap with radio player
            open_sans.className
        )}>
            <div className="h-logo-container-height md:h-logo-container-height-md w-full text-white flex">
                <div className="relative w-full flex justify-between md:justify-center items-center bg-amber-200 px-5">
                    <Image
                        src="/bg-blue.png"
                        alt="Background Blue"
                        className="absolute h-full w-full object-cover object-top-left"
                        quality={100}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    ></Image>
                    <Link href="/"
                        aria-label="Go to homepage"
                        onClick={() => setIsMenuOpen(false)}>
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            className="relative h-logo-height md:h-logo-height-md w-auto"
                            width={100}
                            height={100}
                        />
                    </Link>
                    <div className="relative md:hidden">
                        <MenuIcon size={24} className="text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        />
                    </div>
                </div>
            </div>
            <div className={cn(
                "overflow-y-auto",
                isMenuOpen ? "h-[calc(100vh-var(--spacing-logo-container-height))]" : "h-0",
                "md:h-[calc(100vh-(var(--spacing-logo-container-height-md))-(var(--spacing-radioplayer-height-md)))]"
            )}> {/* Adjust height to account for header and radio player */}
                <div className="my-5 px-10">
                    <ul>
                        {selectedStation && !selectedStation.default && (
                            <li>
                                <Button
                                    aria-label="Return to Nationwide station"
                                    onClick={() => {
                                        resetSelectedStationToDefault();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex w-full bg-radyonatin-blue uppercase font-extrabold rounded-sm mb-2">
                                    <Undo2Icon />
                                    Return to Nationwide
                                </Button>
                            </li>
                        )}
                        <LinkWithStationQuery href="/" onClick={() => setIsMenuOpen(false)} aria-label="Go to homepage">
                            <li className="flex gap-2 items-center py-3 uppercase font-semibold text-grey-header">
                                <FaHome size={24} />
                                <span>Home</span>
                            </li>
                        </LinkWithStationQuery>
                        <LinkWithStationQuery href={"/station"}
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Go to Listen Live page"
                        >
                            <li className="flex gap-2 items-center py-3 uppercase font-semibold text-grey-header">
                                <MdRadio size={24} />
                                <span>Listen Live</span>
                            </li>
                        </LinkWithStationQuery>
                        <LinkWithStationQuery href="/watch" onClick={() => setIsMenuOpen(false)} aria-label="Go to Watch Live page">
                            <li className="flex gap-2 items-center py-3 uppercase font-semibold text-grey-header">
                                <FaPlay size={22} />
                                <span>Watch Live</span>
                            </li>
                        </LinkWithStationQuery>
                        <LinkWithStationQuery href="/jocks" onClick={() => setIsMenuOpen(false)} aria-label="Go to Programs page">
                            <li className="flex gap-2 items-center py-3 uppercase font-semibold text-grey-header">
                                <FaMusic size={22} />
                                <span>Programs</span>
                            </li>
                        </LinkWithStationQuery>
                    </ul>
                </div>
                <hr className="border-t border-gray-300 mx-10" />
                {selectedStation?.socialLinks && Object.values(selectedStation.socialLinks).some(link => link && link !== "") && (
                    <div className="my-5 px-10">
                        <h2 className="mb-3 font-bold uppercase">Connect With Us</h2>
                        <ul className="flex justify-center gap-5">
                            {selectedStation?.socialLinks?.facebook &&
                                <li>
                                    <a href={selectedStation.socialLinks.facebook}
                                        aria-label={"Visit our Facebook page"}
                                        target="_blank"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                        <FaFacebook className="w-5 h-5" />
                                    </a>
                                </li>
                            }
                            {selectedStation?.socialLinks?.twitter &&
                                <li>
                                    <a href={selectedStation.socialLinks.twitter}
                                        aria-label={"Visit our Twitter page"}
                                        target="_blank"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                        <FaXTwitter className="w-5 h-5" />
                                    </a>
                                </li>
                            }
                            {selectedStation?.socialLinks?.instagram &&
                                <li>
                                    <a href={selectedStation.socialLinks.instagram}
                                        aria-label={"Visit our Instagram page"}
                                        target="_blank"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                </li>
                            }
                            {selectedStation?.socialLinks?.tiktok &&
                                <li>
                                    <a href={selectedStation.socialLinks.tiktok}
                                        aria-label={"Visit our TikTok page"}
                                        target="_blank"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                        <FaTiktok className="w-5 h-5" />
                                    </a>
                                </li>
                            }
                            {selectedStation?.socialLinks?.youtube &&
                                <li>
                                    <a href={selectedStation.socialLinks.youtube}
                                        aria-label={"Visit our YouTube channel"}
                                        target="_blank"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-radyonatin-blue text-white hover:bg-opacity-80 transition-colors">
                                        <FaYoutube className="w-5 h-5" />
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>
                )}
                <div className="my-5 flex items-center justify-center">
                    <div className="relative h-[250px] w-[300px] bg-gray-300">
                    </div>
                </div>
                <hr className="border-t border-gray-300 mx-10" />
                <div className="my-5 px-10">
                    <ul>
                        <Link href={`/page/${ABOUT_US_SLUG}`}>
                            <li className="py-2 font-semibold" aria-label="Go to About Us page">About Us</li>
                        </Link>
                        <Link href={`/page/contact-us`}>
                            <li className="py-2 font-semibold" aria-label="Go to Contact Us page">Contact Us</li>
                        </Link>
                        <Link href={`/page/${PRIVACY_POLICY_SLUG}`}>
                            <li className="py-2 font-semibold" aria-label="Go to Privacy Policy page">Privacy Policy</li>
                        </Link>
                        <Link href={`/page/${TERMS_OF_USE_SLUG}`}>
                            <li className="py-2 font-semibold" aria-label="Go to Terms of Use page">Terms of Use</li>
                        </Link>
                        <Link href={`/page/${ADVERTISE_WITH_US_SLUG}`}>
                            <li className="py-2 font-semibold" aria-label="Go to Advertise With Us page">Advertise With Us</li>
                        </Link>
                    </ul>
                </div>
                <hr className="border-t border-gray-300 mx-10" />
                <div className="my-5 px-10">
                    <p className="text-xs text-gray-500">Copyright &copy; {new Date().getFullYear()} RADYO NATIN NATIONWIDE</p>
                </div>
            </div>
        </div >
    )

}