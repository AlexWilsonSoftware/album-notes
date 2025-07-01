"use client"

import { AlbumCard } from "@/components/album-card";
import {useAuth} from "@clerk/nextjs";
import {useEffect, useState} from "react";

export default function Home() {
    const { userId, isSignedIn } = useAuth();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        if (!isSignedIn) return;

        fetch(`/api/albums?userId=${userId}`)
            .then((res) => res.json())
            .then(setAlbums)
            .catch(console.error);
    }, [isSignedIn, userId]);

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 p-4 w-full">
                {albums.map((album) => (
                    <AlbumCard title={""} image={""} notes={""} artist={""} key={album.id} {...album} />
                ))}
            </div>
        </div>
    );
}
