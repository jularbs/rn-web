import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/navigation/SideBar";
import { RadioPlayer } from "@/components/RadioPlayer";
import { karla } from "./fonts";
import { SelectedStationWrapper } from "@/context/StationWrapper";
import { AudioPlayerWrapper } from "@/context/AudioPlayerWrapper";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner"
import { SearchComponent } from "@/components/SearchComponent";

export const metadata: Metadata = {
  title: "Radyo Natin",
  description: "radyonatin.com is the online home of Radyo Natin Nationwide, a radio network of MBC Media Group, and the biggest radio network in the Philippines.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={karla.className}>
      <body className={`antialiased !pointer-events-auto min-h-screen pb-radioplayer-height-md`}>
        <Toaster richColors={true} />
        <Suspense>
          <AudioPlayerWrapper>
            <SelectedStationWrapper>
              <div className="flex flex-col md:flex-row max-w-container-width mx-auto">
                <Sidebar />
                <div className="flex-1">
                  <div className="hidden md:flex w-full bg-greyspace h-logo-container-height-md items-center justify-center">
                    <div className="relative h-[90px] w-full max-w-[728px] bg-gray-300">

                    </div>
                  </div>
                  <SearchComponent />
                  {children}
                  <RadioPlayer />
                </div>
              </div>
            </SelectedStationWrapper>
          </AudioPlayerWrapper>
        </Suspense>
      </body>
    </html>
  );
}
