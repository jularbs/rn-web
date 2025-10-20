"use client";
import { FacebookShareButton } from "react-share";
import { FaFacebook } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const FacebookShareComponent = ({ className }: { className?: string }) => {
    const pathname = usePathname();

    return (
        <FacebookShareButton url={`${process.env.NEXT_PUBLIC_DOMAIN}${pathname}`}>
            <div className={cn(
                className,
                "bg-fb-blue text-white flex gap-2 items-center rounded-sm p-2 cursor-pointer")}>
                <FaFacebook />
                {/* TODOS: Change to dynamic share count */}
                <span className="px-1 text-xs font-medium uppercase">Share on FB</span>
            </div>
        </FacebookShareButton>
    );
};

export default FacebookShareComponent;
