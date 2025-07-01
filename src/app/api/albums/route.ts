import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.POSTGRES_URL!);

export async function POST(request: Request) {
    const { title, artist, coverUrl, userId } = await request.json();

    try {
        const inserted = await sql`
      INSERT INTO album (title, artist, image, "userId")
      VALUES (${title}, ${artist}, ${coverUrl}, ${userId})
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

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const albums = await sql`SELECT * FROM album WHERE "userId" = ${userId}`;

    return NextResponse.json(albums);
}
