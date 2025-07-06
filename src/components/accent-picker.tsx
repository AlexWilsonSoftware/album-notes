"use client";

import { useEffect, useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Paintbrush } from "lucide-react"

const ACCENTS = ["red", "orange", "yellow", "green", "blue", "purple", "monochrome"] as const;

export function AccentPicker() {
    const [accent, setAccent] = useState<string>("monochrome");

    useEffect(() => {
        const saved = localStorage.getItem("accent");
        const fallback = saved || "blue";
        setAccent(fallback);
        document.documentElement.setAttribute("data-accent", fallback);
    }, []);

    const handleAccentChange = (color: string) => {
        setAccent(color);
        localStorage.setItem("accent", color);
        window.dispatchEvent(new Event("accentChange"));
        document.documentElement.setAttribute("data-accent", color);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center gap-2 p-2 rounded text-gray-800 dark:text-gray-200 hover:bg-sidebar-accent transition cursor-pointer"
                >
                    <Paintbrush size={15}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Accent Colour</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={accent} >
                    {ACCENTS.map((color) => (
                        <DropdownMenuRadioItem
                            value={color}
                            key={color}
                            onClick={() => handleAccentChange(color)}
                            className="cursor-pointer"
                        >{color.charAt(0).toUpperCase() + color.slice(1)}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
