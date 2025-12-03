"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Button } from "./ui/button";
import { useSearchContext } from "@/context/SearchWrapper";
import { useRouter } from 'next/navigation';
export function SearchComponent() {
    const { setSearchInput } = useSearchContext();
    const router = useRouter();

    const formSchema = z.object({
        searchQuery: z.string().min(1, { message: "Search query is required" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Handle password change logic here
        setSearchInput(data.searchQuery);

        //clear form input field
        form.reset();

        //redirect to /search page using router
        router.push("/search");
    }

    return (
        <>
            <div className="flex md:flex sticky top-0 z-30">
                <div className="flex w-full gap-5 bg-greyspace h-searchbar-container-height items-center">
                    <div className="px-5 flex-1 relative">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                <FormField
                                    control={form.control}
                                    name="searchQuery"
                                    render={({ field }) => (
                                        <FormItem className="m-0 w-full">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Search..."
                                                    className="bg-white shadow-none border-0 pr-8 w-full"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit"
                                    className="absolute right-5 top-1/2 -translate-y-1/2 p-0 cursor-pointer bg-white hover:bg-white">
                                    <Search className="w-4 h-4 text-black" />
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div className="hidden xl:block xl:w-right-sidebar-width" />
                </div>
            </div>
        </>
    );
}