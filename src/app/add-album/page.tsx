"use client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function AddAlbum() {

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [coverUrl, setCoverUrl] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/api/album-art?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(title)}`);
                const data = await res.json();
                if (res.status === 404) {
                    setCoverUrl("")
                } else {
                    setCoverUrl(data.url);
                }
            } catch (err) {
                console.error("Error fetching album cover:", err);
                setCoverUrl("");
            }
        })();
    }, [title, artist]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-8">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Add an Album</CardTitle>
                    <CardDescription>
                        Add a title and an artist, and we&#39;ll handle the cover
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="e.g. The Dark Side of the Moon"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="Artist">Artist</Label>
                                </div>
                                <Input
                                    id="artist"
                                    type="text"
                                    required
                                    placeholder="e.g. Pink Floyd"
                                    value={artist}
                                    onChange={(event) => setArtist(event.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                    <Button variant="outline" className="w-full">
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
            <div>
                {
                    coverUrl == "" ? <Card><CardDescription className="p-8">Start typing and we&#39;ll find the album cover</CardDescription></Card> :
                        <Card className="w-[300px] h-[300px] overflow-hidden relative">
                            <Image
                                src={coverUrl}
                                alt="Album Art"
                                fill
                                className="object-cover"
                            />
                        </Card>

                }
            </div>
        </div>
    )
}