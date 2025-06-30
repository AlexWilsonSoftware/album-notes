import { AlbumCard } from "@/components/album-card";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.POSTGRES_URL}`);

export default async function Home() {
    const albums = await sql`SELECT * FROM album`;

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 p-4 w-full">
                {albums.map((album) => (
                    <AlbumCard name={""} image={""} notes={""} artist={""} key={album.id} {...album} />
                ))}
            </div>
        </div>
    );
}
