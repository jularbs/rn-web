import { open_sans } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { HouseIcon, LayoutGridIcon, MusicIcon, PlayIcon, TrendingUpIcon } from "lucide-react";

export function MobileBottomNav({ }): React.JSX.Element {
    return (
        <div className={cn(open_sans.className,
            "fixed bottom-0 left-0 h-mobile-bottom-nav-height w-full md:hidden z-50 flex items-center bg-greyspace border-t border-gray-300"
        )}>
            <div className="w-full flex justify-around">
                <div className="flex flex-col items-center gap-1">
                    <PlayIcon size={20} />
                    <span className="text-[10px] font-bold uppercase">Watch Live</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <TrendingUpIcon size={20} />
                    <span className="text-[10px] font-bold uppercase">Trending</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <HouseIcon size={20} />
                    <span className="text-[10px] font-bold uppercase">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <LayoutGridIcon size={20} />
                    <span className="text-[10px] font-bold uppercase">Categories</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <MusicIcon size={20} />
                    <span className="text-[10px] font-bold uppercase">Programs</span>
                </div>
            </div>
        </div>
    )

}