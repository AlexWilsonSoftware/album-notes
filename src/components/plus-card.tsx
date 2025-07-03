"use client"

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation"

export function PlusCard() {
    const router = useRouter();

    function handleNav() {
        router.push("/add-album")
    }

    return (
        <div
            style={{
                borderRadius: '12px',
            }}
            onClick={handleNav}
            className='flex w-42 flex-col items-center justify-center overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 hover:dark:bg-zinc-800 hover:bg-zinc-50 cursor-pointer'
        >
            <Plus/>
        </div>
    )
}