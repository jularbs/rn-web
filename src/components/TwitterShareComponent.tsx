"use client";
import { TwitterShareButton } from "react-share";
import { FaSquareXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TwitterShareComponent = ({ className }: { className?: string }) => {
    const pathname = usePathname();

    return (
        <TwitterShareButton url={`${process.env.NEXT_PUBLIC_DOMAIN}${pathname}`} className="">
            <div className={cn(className,
                "bg-black text-white flex gap-2 items-center rounded-sm p-2 cursor-pointer"
            )}>
                <FaSquareXTwitter />
                {/* TODOS: Change to dynamic share count */}
                <span className="px-1 text-xs font-medium uppercase">Share on X</span>
            </div>
        </TwitterShareButton>
    );
};

export default TwitterShareComponent;
