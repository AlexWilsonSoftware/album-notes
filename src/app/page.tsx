"use client"

import { AlbumCard } from "@/components/album-card";
import { PlusCard } from "@/components/plus-card"
import {useAuth} from "@clerk/nextjs";
import {useEffect, useState} from "react";

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

    const reloadAlbums = () => {
        if (!isSignedIn) return;
        fetch(`/api/albums?userId=${userId}`)
            .then((res) => res.json())
            .then(setAlbums)
            .catch(console.error);
    };

    useEffect(() => {
        reloadAlbums();
    }, [isSignedIn, userId]);

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 p-4 w-full">
                {albums.map((album: album) => (
                    <AlbumCard key={album.id} album={album} reloadAlbums={reloadAlbums} />
                ))}
                <PlusCard/>
            </div>
        </div>
    );
}
