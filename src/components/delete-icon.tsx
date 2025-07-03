"use client"

import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import {Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

type album = {
    title: string,
    image: string,
    notes: string,
    artist: string,
    id: number,
}

type DeleteIconProps = {
    album: album,
    reloadAlbums: () => void;
}

export function DeleteIcon({ album, reloadAlbums }: DeleteIconProps) {
    async function deleteAlbum() {
        try {
            await fetch(`/api/album?id=${album.id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });

            toast.success("Album successfully deleted")
            reloadAlbums();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Unexpected error. Could not delete album")
            console.log('Error deleting album')
        }

    }

    return (
        <Dialog>
            <DialogTrigger>
                <Trash2 className="w-5 h-5 stroke-red-600 cursor-pointer"/>
            </DialogTrigger>
            <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
                <DialogHeader>
                    <DialogTitle className='text-zinc-900 dark:text-white'>
                        Are you sure you want to delete <i>{album.title}</i>?
                    </DialogTitle>
                    <DialogDescription className='text-zinc-600 dark:text-zinc-400'>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className='mt-6 flex justify-end space-y-4'>
                    <Button className='self-end bg-red-600 hover:bg-red-500 cursor-pointer' onClick={deleteAlbum}>
                        Delete
                    </Button>
                </div>
                <DialogClose className="text-white cursor-pointer"/>
            </DialogContent>
        </Dialog>
    );
}
