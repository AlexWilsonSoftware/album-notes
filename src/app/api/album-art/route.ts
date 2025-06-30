import { NextResponse } from 'next/server';
import albumArt from 'album-art';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const artist = searchParams.get('artist') || '';
    const album = searchParams.get('album') || '';

    try {
        const url = await albumArt(artist, { album });
        return NextResponse.json({ url });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: 'Album art not found' }, { status: 404 });
    }
}
