import Image from "next/image";
import {AlbumCard} from "../components/album-card"

const albums = [
        {
            "name": "Dark Side of the Moon",
            "artist": "Pink Floyd",
            "image": "https://ia904502.us.archive.org/0/items/mbid-956fbc58-362d-43b8-b880-3779e0508559/mbid-956fbc58-362d-43b8-b880-3779e0508559-34025419985.jpg",
            "notes": "Pink Floyd’s The Dark Side of the Moon is a haunting, immersive journey through themes of time, madness, greed, and human conflict. Seamlessly blending progressive rock with experimental soundscapes, it features iconic tracks like “Time” and “Us and Them.” Its sonic cohesion and philosophical depth make it more than an album—it's a timeless experience that continues to resonate deeply, both musically and emotionally, decades after its release.",
        },
        {
            "name": "Masterpiece",
            "artist": "Big Thief",
            "image": "https://i.scdn.co/image/ab67616d0000b27319c446121fcfc0dc1f62b2d6",
            "notes": "Big Thief’s debut album Masterpiece, released in 2016, is a raw, emotionally charged exploration of love, memory, loss, and personal growth. Helmed by lead singer and songwriter Adrianne Lenker, the album immediately establishes the band’s signature sound—intimate, earthy folk-rock with a gritty, electric edge and poetic vulnerability.\n" +
                "\n" +
                "The title track “Masterpiece” opens the record with a surge of energy, blending fuzzy guitars with Lenker’s evocative vocals. It’s a perfect introduction to the band’s ability to marry immediacy and introspection, as Lenker reflects on the ephemerality of youth and the beauty found in fleeting moments. Her lyrics are sharp yet open-ended, often feeling like fragments of deeply personal recollections delivered with universal emotional weight.\n" +
                "\n" +
                "Throughout the album, Big Thief navigates various shades of sound, from the gentle fingerpicking on “Lorraine” and “Velvet Ring” to the heavier, distorted riffs in “Real Love” and “Humans.” There’s a persistent tension between tenderness and volatility, as if each song teeters on the edge of emotional collapse—but in the most compelling way.\n" +
                "\n" +
                "Lenker’s vocal performance deserves particular praise. Her voice carries a raw, trembling quality that makes every word feel urgent and true. Whether she’s singing softly or screaming into the void, there’s an authenticity that anchors the record and draws the listener in completely.\n" +
                "\n" +
                "One of Masterpiece's greatest strengths lies in its lyrical ambiguity. The songs are filled with fragments of stories, characters, and memories that invite interpretation. “Paul” stands out as a heartbreaking confession of conflicted love, while “Interstate” feels like a nostalgic road trip through someone else’s bittersweet past.\n" +
                "\n" +
                "As a debut, Masterpiece lives up to its name not through polish or grandeur, but through emotional honesty, fearless songwriting, and a sound that feels both grounded and transcendental. It laid the groundwork for Big Thief’s future experimentation while standing strong as a complete, cohesive work on its own."
        },
        {
            "name": "Dummy",
            "artist": "Portishead",
            "image": "https://ia601604.us.archive.org/28/items/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd-829521842.jpg",
            "notes": "Dark and gorgeous"
        }
        ]

export default function Home() {
  return (
    <div className="w-full">
        <div className="flex flex-wrap justify-center md:justify-start gap-4 p-4 w-full">
            {[...albums, ...albums, ...albums, ...albums].map(album => AlbumCard(album))}
        </div>
    </div>
  );
}
