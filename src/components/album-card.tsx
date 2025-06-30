import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogTitle,
    MorphingDialogImage,
    MorphingDialogSubtitle,
    MorphingDialogClose,
    MorphingDialogDescription,
    MorphingDialogContainer,
} from '@/components/ui/morphing-dialog';
import { ScrollArea } from "@/components/ui/scroll-area"

export function AlbumCard(album: never) { //TODO make album type
    return (
        <MorphingDialog
            transition={{
                type: 'spring',
                bounce: 0.05,
                duration: 0.25,
            }}
        >
            <MorphingDialogTrigger
                style={{
                    borderRadius: '12px',
                }}
                className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
            >
                <MorphingDialogImage
                    src={album.image}
                    alt='Cover art'
                    className='h-48 w-full object-cover'
                />
                <div className='p-2 flex flex-col flex-start'>
                        <MorphingDialogTitle className='text-zinc-950 dark:text-zinc-50'>
                            {album.name}
                        </MorphingDialogTitle>
                        <MorphingDialogSubtitle className='text-sm text-zinc-700 dark:text-zinc-400 p-1'>
                            {album.artist}
                        </MorphingDialogSubtitle>
                </div>
            </MorphingDialogTrigger>
            <MorphingDialogContainer>
                <MorphingDialogContent
                    style={{
                        borderRadius: '24px',
                    }}
                    className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]'
                >
                    <MorphingDialogImage
                        src={album.image}
                        alt='Cover Art'
                        className='h-full w-full'
                    />
                    <ScrollArea className="max-h-100 h-100 rounded-md border p-4">
                        <div className='p-6 overflow-y-auto'>
                            <MorphingDialogTitle className='text-2xl text-zinc-950 dark:text-zinc-50'>
                                {album.name}
                            </MorphingDialogTitle>
                            <MorphingDialogSubtitle className='text-zinc-700 dark:text-zinc-400'>
                                {album.artist}
                            </MorphingDialogSubtitle>
                            <MorphingDialogDescription
                                disableLayoutAnimation
                                variants={{
                                    initial: {opacity: 0, scale: 0.8, y: 100},
                                    animate: {opacity: 1, scale: 1, y: 0},
                                    exit: {opacity: 0, scale: 0.8, y: 100},
                                }}
                            >
                                <p className='mt-2 text-zinc-500 dark:text-zinc-500'>
                                    {album.notes}
                                </p>
                            </MorphingDialogDescription>
                        </div>
                    </ScrollArea>
                    <MorphingDialogClose className='text-zinc-50'/>
                </MorphingDialogContent>
            </MorphingDialogContainer>
        </MorphingDialog>
    );
}
