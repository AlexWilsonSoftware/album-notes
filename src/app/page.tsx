"use client"

import { AlbumCard } from "@/components/album-card";
import { PlusCard } from "@/components/plus-card"
import {useAuth} from "@clerk/nextjs";
import {useEffect, useState} from "react";
import { motion } from "framer-motion"
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

type album = {
    title: string,
    image: string,
    notes: string,
    artist: string,
    id: number
}

export default function Home() {
    const { userId, isSignedIn } = useAuth();
    const [albums, setAlbums] = useState<album[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const search = searchParams.get('q');

    const reloadAlbums = async () => {
        if (!isSignedIn) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/albums?userId=${userId}&q=${search}`);
            const data = await res.json();
            console.log(data)
            setAlbums(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        reloadAlbums();
    }, [isSignedIn, userId, search]);

    if (loading) {
        return (
            <div className="flex flex-wrap justify-center md:justify-start gap-4 p-4 w-full">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-42 h-62 bg-muted rounded-md animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div>
            {search &&
                <p className="text-2xl md:text-4xl font-semibold text-zinc-700 dark:text-zinc-300 justify-self-center">Showing results for: &#34;<Link href={"/"} className="hover:line-through cursor-pointer italic">{search}</Link>&#34;</p>
            }
            <motion.div className="w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-wrap justify-center md:justify-start gap-4 p-4 w-full"
                >
                    {albums.map((album: album) => (
                        <AlbumCard key={album.id} album={album} reloadAlbums={reloadAlbums} />
                    ))}
                    <PlusCard/>
                </motion.div>
            </motion.div>
        </div>

    );
}
