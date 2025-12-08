"use client";

import { useSelectedStationContext } from "@/context/StationWrapper";
import { AtSignIcon } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

//FORMS
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { LoaderCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { createMessage } from "@/actions/messages";
import { toast } from "sonner";
import useSWR from "swr";
import { fetcher } from "@/actions/swr";
import { cn } from "@/lib/utils";

export default function ContactUsForm() {
    const [loading, setLoading] = useState(false);
    const { selectedStation } = useSelectedStationContext();

    const { data, isLoading, error } = useSWR({ url: "v1/recepients" }, fetcher);

    const contactReasons = data?.data?.map((recepient: { reason: string, _id: string }) => { return { reason: recepient.reason, _id: recepient._id } }) || [];
    //FORMS
    const formSchema = z.object({
        stationId: z.string(),
        reason: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Please select a valid reason for contacting." }),
        fullName: z.string()
            .min(2, { message: "Name must be at least 2 characters." })
            .max(50, { message: "Name must be at most 50 characters." }),
        emailAddress: z.email("This is not a valid email."),
        contactNumber: z.string().min(7, { message: "Contact number must be at least 7 characters." }),
        message: z.string()
            .min(10, { message: "Message must be at least 10 characters." })
            .max(1000, { message: "Message must be at most 1000 characters." }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            stationId: selectedStation?._id || "",
            reason: "",
            fullName: "",
            emailAddress: "",
            contactNumber: "",
            message: ""
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        createMessage({ data }).then(res => {
            toast.success("Success!", {
                style: {
                    background: "rgb(56, 142, 60)",
                    color: "white",
                    border: "none"
                },
                description: res.message,
                duration: 5000,
                position: "top-center"
            })
            form.reset({
                stationId: selectedStation?._id || "",
                reason: "",
                fullName: "",
                emailAddress: "",
                contactNumber: "",
                message: ""
            });

        }).catch((error) => {
            console.error("Error creating message:", error);
            toast.error("Invalid Request!", {
                style: {
                    background: "rgba(220, 46, 46, 1)",
                    color: "white",
                    border: "none"
                },
                description: error.message,
                duration: 5000,
                position: "top-center"
            })
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        form.setValue("stationId", selectedStation?._id || "");
    }, [selectedStation?._id, form])

    useEffect(() => {
        if (error) {
            toast.error("Server Error", {
                style: {
                    background: "rgba(220, 46, 46, 1)",
                    color: "white",
                    border: "none"
                },
                description: error.message || "An error occurred while fetching contact reasons.",
                duration: 5000,
                position: "top-center"
            })
        }
    }, [error])

    return (
        <div className="grow">
            <div className="grid lg:grid-cols-2 rounded-md overflow-hidden border shadow-md">
                <div className="p-5 flex flex-col gap-5 bg-neutral-100">
                    <h1 className="text-xl text-center font-extrabold uppercase">{selectedStation?.name}</h1>
                    {selectedStation?.address && (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <p>
                                {selectedStation?.address}
                            </p>
                        </div>
                    )}
                    {selectedStation?.email && (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <AtSignIcon size={20} />
                            </div>
                            <p>
                                {selectedStation?.email}
                            </p>
                        </div>
                    )}
                    {selectedStation?.contactNumber && (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <IoCall size={20} />
                            </div>
                            <p>
                                {selectedStation?.contactNumber}
                            </p>
                        </div>
                    )}
                </div>
                <div>
                    {selectedStation?.mapEmbedCode &&
                        <div
                            className="iframe-container h-[300px] w-full overflow-scroll"
                            dangerouslySetInnerHTML={{ __html: selectedStation?.mapEmbedCode as string }} />
                    }
                </div>
            </div>
            {/* Contact Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 grid gap-5">
                    <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reason for Contacting
                                    <LoaderCircle className={cn(`size-3 inline-block animate-spin`, !isLoading && "hidden")} />
                                </FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-radyonatin-blue"
                                    >
                                        <option value="">Select a reason</option>
                                        {contactReasons.map((reason: { reason: string, _id: string }) => (
                                            <option key={reason._id} value={reason._id}>
                                                {reason.reason}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Additional form fields for fullName, email, contactNumber, message would go here */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        {...field}
                                        placeholder="Juan Dela Cruz"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="emailAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        {...field}
                                        placeholder="you@example.com"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Contact Number</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        {...field}
                                        placeholder="0917XXXXXXX"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="min-h-40 whitespace-pre-wrap"
                                        {...field}
                                        placeholder="Type your message here..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="px-4 py-2 bg-radyonatin-blue text-white rounded-md hover:bg-radyonatin-blue-dark transition"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin" />
                                Submitting...
                            </div>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )

}