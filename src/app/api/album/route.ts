import {NextResponse} from "next/server";
import {neon} from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    const album = await sql`SELECT * FROM album WHERE id = ${id}`;

    return NextResponse.json(album[0]);
}

export async function PATCH(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const body = await req.json();
    const notes = body.newNotes;
    const artist = body.newArtist;
    const title = body.newTitle;
    const userId = body.userId;
    const image = body.newImage;
    const currentTitle = body.currentTitle;

    if (!userId) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    if (!id) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    if (title != null) {
        const albums = await sql`SELECT * FROM album WHERE "userId" = ${userId}`;

        let exists = albums.map(album => album.title.toLowerCase() === title.toLowerCase()).some(value => value);

        if (currentTitle === title) {
            exists = false;
        }

        if (exists) {
            return NextResponse.json({ error: "This album title already exists" }, { status: 400 });
        }
    }

    if (title != null && title.length > 100) {
        return NextResponse.json({ error: "Title must be under 100 characters" }, { status: 400 });
    }

    if (artist != null && artist.length > 100) {
        return NextResponse.json({ error: "Artist must be under 100 characters" }, { status: 400 });
    }

    if (notes != null && notes.length > 10000) {
        return NextResponse.json({ error: "Notes must be under 100000 characters" }, { status: 400 });
    }

    if (notes != null) {
        await sql`UPDATE album SET notes = ${notes}, edited = ${new Date()} WHERE id = ${id}`;
    }

    if (artist != null) {
        await sql`UPDATE album SET artist = ${artist.trim()}, edited = ${new Date()} WHERE id = ${id}`;
    }

    if (title != null) {
        await sql`UPDATE album SET title = ${title.trim()}, edited = ${new Date()} WHERE id = ${id}`;
    }

    if (image != null) {
        await sql`UPDATE album SET image = ${image}, edited = ${new Date()} WHERE id = ${id}`;
    }

    return NextResponse.json({ status: 200 });
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    await sql`DELETE from album WHERE id = ${id}`;

    return new NextResponse();
}