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
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import {toast} from "sonner";
import { SignInButton } from "@clerk/nextjs";

export default function AddAlbum() {
    const router = useRouter();

    const { userId } = useAuth();

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [coverUrl, setCoverUrl] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false);

    async function submitAlbum() {
        setLoading(true);

        if (!title.trim() || !artist.trim()) {
            setErrorMessage("Both title and artist are required");
            setLoading(false);
            return;
        }

        if (title.length > 100) {
            setErrorMessage("Title must be under 100 characters");
            setLoading(false);
            return;
        }

        if (artist.length > 100) {
            setErrorMessage("Artist must be under 100 characters");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/albums', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, artist, coverUrl, userId }),
            });
            const data = await res.json()
            if (res.status === 400) {
                setLoading(false);
                setErrorMessage(data.error)
            }
            if (!res.ok) throw new Error('Failed to submit');
            setErrorMessage(null)
            setLoading(false);
            toast.success("Album successfully added")
            router.push("/")
            console.log('Album inserted:', data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        (async () => {
            setErrorMessage(null);
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
        <div className="flex flex-col items-center justify-center w-full h-full gap-8">
            <Card className="w-9/10 md:w-full lg:w-full max-w-sm">
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
                    {loading ? <Button className="w-full cursor-pointer" disabled>
                        <Loader2Icon className="animate-spin" />
                        Please wait
                    </Button> : <Button onClick={submitAlbum} className="w-full cursor-pointer">
                        Submit
                    </Button>}
                    <Button variant="outline" className="w-full cursor-pointer" onClick={() => router.back()}>
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
            {errorMessage !== null && <Alert variant="destructive" className="w-9/10 md:w-full lg:w-full max-w-sm">
                <AlertCircleIcon />
                <AlertTitle>Unable to add album</AlertTitle>
                <AlertDescription>
                    <p>{errorMessage}</p>
                </AlertDescription>
            </Alert>}
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