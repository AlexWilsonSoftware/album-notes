"use client"

import Image from "next/image";
import {Card} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Textarea} from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import {useEffect, useRef, useState} from "react";
import debounce from "lodash.debounce";

type album = {
    title: string,
    image: string,
    notes: string,
    artist: string,
    id: number
}

export default function EditAlbum() {
    const params = useParams();
    const id = params.id;
    const [album, setAlbum] = useState<album | null>(null);
    const [loading, setLoading] = useState(true);
    const [newNotes, setNewNotes] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await fetch(`/api/album?id=${id}`);
                const data = await res.json();
                setAlbum(data);
            } catch (error) {
                console.error("Failed to fetch albums:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbum();
    }, [id]);

    const save = debounce(async (newValue: string) => {
        setIsSaving(true);
        setIsSaved(false);

        try {
            await fetch(`/api/album?id=${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({newNotes: newValue}),
            });

            setIsSaved(true);
        } catch (err) {
            console.error("Failed to save:", err);
        } finally {
            setIsSaving(false);

            if (saveTimeout.current) {
                clearTimeout(saveTimeout.current);
            }

            saveTimeout.current = setTimeout(() => {
                setIsSaved(false);
            }, 1500); // Reset saved message after 1.5s
        }
    }, 1000); // 1 second debounce

    // Watch for value changes and trigger the debounced save
    useEffect(() => {
        save(newNotes);
        return () => {
            save.cancel();
        };
    }, [newNotes]);

    if (loading || !album) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-zinc-600">Loading album...</p>
            </div>
        );
    }

    return (
        <ScrollArea className="h-screen py-4">
            <div className='flex justify-center'>
                <div className='p-6 flex flex-col w-1/3 gap-4'>
                    <Card className="w-full aspect-square overflow-hidden relative">
                        <Image
                            src={album.image}
                            alt="Album Art"
                            fill
                            className="object-cover"
                        />
                    </Card>
                    <span className='text-4xl font-medium text-zinc-950 dark:text-zinc-50'>
                            {album.title}
                        </span>
                    <span className='text-xl text-zinc-700 dark:text-zinc-400 italic mt-[-8px]'>
                            {album.artist}
                        </span>
                    <Textarea className='text-xl' defaultValue={album.notes} placeholder="Write your notes here..."
                              onChange={(event) => setNewNotes(event.target.value)}/>
                    <div className="text-sm text-muted-foreground mt-1 h-5">
                        {isSaving ? (
                            <span>Saving...</span>
                        ) : isSaved ? (
                            <span className="text-green-500">✓ Saved</span>
                        ) : null}
                    </div>
                </div>
            </div>
        </ScrollArea>

    )
}