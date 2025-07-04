"use client"

import Image from "next/image";
import {Card} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Textarea} from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import {useEffect, useRef, useState} from "react";
import { DeleteIcon } from "@/components/delete-icon"
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation"
import { NewAlbumInput } from "@/components/new-album-input"
import { NewTitleInput } from "@/components/new-title-input";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

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
    const { userId } = useAuth();
    const [album, setAlbum] = useState<album | null>(null);
    const [loading, setLoading] = useState(true);
    const [newNotes, setNewNotes] = useState<string | undefined>();
    const [newArtist, setNewArtist] = useState<string | undefined>();
    const [newTitle, setNewTitle] = useState<string | undefined>();
    const [newImage, setNewImage] = useState<string | undefined>();
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();

    const routeHome = () => {
        router.push("/");
    };

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await fetch(`/api/album?id=${id}`);
                const data = await res.json();
                setAlbum(data);
                setNewNotes(data.notes);
                setNewArtist(data.artist);
                setNewTitle(data.title);
                setNewImage(data.image);
            } catch (error) {
                console.error("Failed to fetch albums:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbum();
    }, [id]);

    const saveNotes = debounce(async (patchNotes: string | undefined) => {
        setIsSaving(true);
        setIsSaved(false);

        try {
            const res = await fetch(`/api/album?id=${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({newNotes: patchNotes, userId: userId}),
            });

            const data = await res.json()

            if (!res.ok) {
                toast.error("Unable to update album", {description: data.error})
            }

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
    }, 500); // 0.5 second debounce

    const saveArtist = debounce(async (patchArtist: string | undefined) => {
        setIsSaving(true);
        setIsSaved(false);

        try {
            const res = await fetch(`/api/album?id=${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({newArtist: patchArtist, userId: userId}),
            });

            const data = await res.json()

            if (!res.ok) {
                toast.error("Unable to update album", {description: data.error})
            }

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
    }, 500)

    const saveTitle = debounce(async (patchTitle: string | undefined) => {
        setIsSaving(true);
        setIsSaved(false);

        try {
            const res = await fetch(`/api/album?id=${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({newTitle: patchTitle, userId: userId, currentTitle: album?.title}),
            });

            const data = await res.json()

            if (!res.ok) {
                toast.error("Unable to update album", {description: data.error})
            }

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
    }, 500)

    const saveImage = async (patchImage: string | undefined) => {
        try {
            await fetch(`/api/album?id=${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({newImage: patchImage, userId: userId}),
            });

        } catch (err) {
            console.error("Failed to save:", err);
        }
    }

    // Watch for value changes and trigger the debounced save
    useEffect(() => {
        if (album !== null && newTitle !== album.title) {
            saveTitle(newTitle);
        }
        if (album !== null && newArtist !== album.artist) {
            saveArtist(newArtist);
        }
        if (album !== null && newNotes !== album.notes) {
            saveNotes(newNotes);
        }
    }, [newTitle, newArtist, newNotes]);

    useEffect(() => {
        const checkImage = async () => {
            if (newTitle && newArtist) {
                const res = await fetch(`/api/album-art?artist=${encodeURIComponent(newArtist)}&album=${encodeURIComponent(newTitle)}`);
                const data = await res.json();
                console.log(data)
                if (res.status === 404) {
                    setNewImage("")
                } else {
                    setNewImage(data.url);
                }

                if (album !== null && newImage !== album.image) {
                    await saveImage(newImage);
                }
            }
        }

        checkImage()
    }, [newTitle, newArtist])

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
                <div className='p-6 flex flex-col w-9/10 md:w-1/3 lg:w-1/3 gap-4'>
                    <Card className="w-full aspect-square overflow-hidden relative">
                        <Image
                            src={newImage == null ? album.image : newImage}
                            alt="Album Art"
                            fill
                            className="object-cover"
                        />
                    </Card>
                    <div>
                        <DeleteIcon album={album} reloadAlbums={routeHome}/>
                    </div>
                    <NewTitleInput value={newTitle}
                                   onChange={(event) => setNewTitle(event.target.value)}/>
                    <NewAlbumInput value={newArtist}
                           onChange={(event) => setNewArtist(event.target.value)}/>
                    <Textarea className='text-xl' value={newNotes} placeholder="Write your notes here..."
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