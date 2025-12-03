'use client';

import { ShieldAlertIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex flex-col items-center justify-center py-20 md:py-40">
            <ShieldAlertIcon className="size-20 text-neutral-300" />
            <h2 className="text-center text-xl font-extrabold">{error.message || "Something went wrong!"}</h2>
            <button
                aria-label="Try again"
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400 cursor-pointer"
                onClick={() => {
                    reset();
                }}
            >
                Try again
            </button>
        </main>
    );
}