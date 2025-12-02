import { Metadata } from "next";
import { ShieldAlertIcon } from "lucide-react";
import PreviewPageClient from "@/components/PreviewPageClient";
import ViewPageComponent from "@/components/ViewPageComponent";

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<Record<string, string | undefined>>
}): Promise<Metadata> {
    const { slug } = await params;
    const sp = await searchParams;
    // In preview mode, skip metadata generation entirely
    if (sp?.preview === "1") {
        return {};
    }

    return {
        title: `${slug.split("-").join(" ").split("_").join(" ").replace(/\b\w/g, char => char.toUpperCase())}`,
    };
}

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<Record<string, string | undefined>>
}) {
    try {
        const { slug } = await params
        const sp = await searchParams;

        if (sp?.preview === "1") {
            return <PreviewPageClient slug={slug} />;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/options/${slug}`)

        if (!res.ok) {
            if (res.status === 404) {
                return <main className="flex flex-col items-center justify-center py-20 md:py-40">
                    <div className="font-extrabold text-[100px] md:text-[200px] leading-none text-neutral-300">404</div>
                    <h2 className="text-center text-xl font-extrabold uppercase">Page not found</h2>
                </main>
            }

            throw new Error("Something went wrong!");
        }

        const pageData = await res.json();

        return <ViewPageComponent pageData={pageData.data} />

    } catch (error: unknown) {
        return <main className="flex flex-col items-center justify-center py-20 md:py-40">
            <ShieldAlertIcon className="size-20 text-neutral-300" />
            <h2 className="text-center text-xl font-extrabold">{(error as Error).message || "Something went wrong!"}</h2>
        </main>
    }



}
