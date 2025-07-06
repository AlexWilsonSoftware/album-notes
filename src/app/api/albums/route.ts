import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.POSTGRES_URL!);

export async function POST(request: Request) {
    const { title, artist, coverUrl, userId } = await request.json();

    const albums = await sql`SELECT * FROM album WHERE "userId" = ${userId}`;

    const exists = albums.map(album => album.title.toLowerCase() === title.toLowerCase()).some(value => value);

    if (exists) {
        console.error("Album title already exists");
        return NextResponse.json({ error: "Album already exists in your notes" }, { status: 400 });
    }

    if (title.length > 100) {
        console.error("Album title too long");
        return NextResponse.json({ error: "Title must be under 100 characters" }, { status: 400 });
    }

    if (artist.length > 100) {
        console.error("Artist name too long");
        return NextResponse.json({ error: "Artist must be under 100 characters" }, { status: 400 });
    }

    try {
        const inserted = await sql`
      INSERT INTO album (title, artist, image, "userId", edited)
      VALUES (${title.trim()}, ${artist.trim()}, ${coverUrl}, ${userId}, ${new Date()})
      RETURNING *;
    `;
        return NextResponse.json(inserted[0]);
    } catch (error) {
        console.error("Insert album error:", error);
        return NextResponse.json({ error: "Failed to insert album" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const search = url.searchParams.get("q");

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (search === "null") {
        const albums = await sql`SELECT * FROM album WHERE "userId" = ${userId}`;

        return NextResponse.json(albums);
    } else {
        const albums = await sql`
            SELECT * FROM album
            WHERE "userId" = ${userId}
              AND (
                title ILIKE ${'%' + search + '%'}
                    OR artist ILIKE ${'%' + search + '%'}
                    OR notes ILIKE ${'%' + search + '%'}
                )
        `;

        return NextResponse.json(albums);
    }

}
