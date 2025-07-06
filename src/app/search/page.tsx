"use client"

import { NewAlbumInput } from "@/components/new-album-input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {SignInButton, useAuth} from "@clerk/nextjs";

export default function Search() {
    const router = useRouter();
    const [search, setSearch] = useState("")
    const { userId } = useAuth();

    if (!userId) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-xl mb-4">You must be signed in to view this page.</p>
                <SignInButton mode="modal">
                    <Button className="cursor-pointer">Sign In</Button>
                </SignInButton>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center gap-4 md:w-1/3 pb-20">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-4xl font-semibold text-zinc-700 dark:text-zinc-300">Search your albums</p>
                    <p className="text-zinc-800 dark:text-zinc-400">Search by title, artist, or notes</p>
                </div>

                <div className="flex w-full gap-4 flex-col md:flex-row">
                    <NewAlbumInput className="border-b rounded-none w-full dark:text-zinc-500" placeholder="e.g. The Dark Side of the Moon"
                                   onChange={(event) => setSearch(event.target.value)}/>
                    <Button className="cursor-pointer" onClick={() => router.push("/?q=" + search)}>Go</Button>
                </div>

            </div>

        </div>
    )
}