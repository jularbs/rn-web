import AdComponent from "@/components/AdComponent";
import ContactUsForm from "@/components/ContactUsForm";
import { LatestStoriesComponent } from "@/components/LatestStoriesComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Radyo Natin",
};

export default function ContactUs() {

    return (
        <div className="flex flex-col xl:flex-row gap-5 p-5">
            <ContactUsForm />
            <div className="w-full xl:w-right-sidebar-width">
                <LatestStoriesComponent />
                <div className="sticky top-5">
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
        </div>
    );
}
