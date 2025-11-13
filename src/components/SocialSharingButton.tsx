"use client";
import { useEffect, useState } from "react";
import {
    FacebookIcon,
    FacebookMessengerIcon,
    ViberIcon,
    FacebookShareButton,
    FacebookMessengerShareButton,
    TwitterShareButton,
    ViberShareButton,
} from "react-share";
import { FaXTwitter } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isMobile } from "react-device-detect";
import { IoCopyOutline, IoClose } from "react-icons/io5";
import { MdMoreHoriz } from "react-icons/md";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const SocialSharingButton = ({ className, path, children }: { className: string, path?: string, children?: React.ReactNode }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [url, setUrl] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        setIsCopied(false);
        const params = searchParams.toString();
        const fullUrl = params ? `${process.env.NEXT_PUBLIC_DOMAIN}${path ?? pathname}?${params}` : `${process.env.NEXT_PUBLIC_DOMAIN}${path ?? pathname}`;
        setUrl(fullUrl);
    }, [pathname, searchParams, path]);

    return (
        <Drawer>
            <DrawerTrigger>
                {children ? children : <>
                    <div className={cn(className,
                        "bg-radyonatin-red rounded-full flex justify-center items-center"
                    )}>
                        <MdMoreHoriz className="text-white text-3xl" />
                    </div>
                </>
                }

            </DrawerTrigger>
            <DrawerContent className="max-w-4xl mx-auto">
                <DrawerClose>
                    <IoClose className="absolute top-2 right-2 text-2xl cursor-pointer" />
                </DrawerClose>
                <DrawerHeader>
                    <DrawerTitle className="text-center">
                        Share Post to Social Media
                    </DrawerTitle>
                </DrawerHeader>
                <div className="flex justify-between max-w-xs mx-auto my-3">
                    <div className="flex flex-col gap-1 mx-3 justify-center items-center">
                        <TwitterShareButton url={url}>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:bg-opacity-80 transition-colors">
                                <FaXTwitter className="w-4 h-4" />
                            </div>
                        </TwitterShareButton>
                        <div className="text-xs uppercase text-black">X</div>
                    </div>
                    <div className="flex flex-col gap-1 mx-3 justify-center items-center">
                        <FacebookShareButton url={url}>
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <div className="text-xs uppercase text-black">Facebook</div>
                    </div>
                    <div className="flex flex-col gap-1 mx-3 justify-center items-center">
                        {isMobile ? (
                            <div
                                onClick={() => {
                                    window.open(
                                        "fb-messenger://share?link=" +
                                        encodeURIComponent(url) +
                                        "&app_id=" +
                                        encodeURIComponent(
                                            process.env.REACT_APP_FACEBOOK_APP_ID!
                                        )
                                    );
                                }}
                            >
                                <FacebookMessengerIcon size={32} round={true} />
                            </div>
                        ) : (
                            <FacebookMessengerShareButton
                                url={url}
                                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                            >
                                <FacebookMessengerIcon size={32} round={true} />
                            </FacebookMessengerShareButton>
                        )}

                        <div className="text-xs uppercase text-black">Messenger</div>
                    </div>
                    <div className="flex flex-col gap-1 mx-3 justify-center items-center">
                        <ViberShareButton url={url}>
                            <ViberIcon size={32} round={true} />
                        </ViberShareButton>
                        <div className="text-xs uppercase text-black">Viber</div>
                    </div>
                </div>
                <DrawerFooter>
                    <Input type="text" value={url} placeholder="URL" readOnly />
                    <CopyToClipboard
                        text={url}
                        onCopy={() => {
                            setIsCopied(true);
                        }}
                    >
                        <Button>
                            <IoCopyOutline className="mr-2" />
                            {isCopied ? "Link Copied!" : "Copy URL to Clipboard"}
                        </Button>
                    </CopyToClipboard>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default SocialSharingButton;
