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

    if (!id) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    if (notes == null) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    await sql`UPDATE album SET notes = ${notes} WHERE id = ${id}`;

    return new NextResponse();
}