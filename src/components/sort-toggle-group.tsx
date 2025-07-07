import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type SortToggleProps = {
    setSort: (val: string) => void;
}

export function SortToggleGroup({ setSort }: SortToggleProps) {
    const [sortValue, setSortValue] = useState("created")

    return (
        <ToggleGroup
            type="single"
            value={sortValue}
            variant={"outline"}
            onValueChange={(val) => {
                if (val) {
                    setSortValue(val)
                    setSort(val)
                }
            }}
            className="justify-self-center flex w-2/3 md:w-1/9 min-w-[250px]"
        >
            <ToggleGroupItem value="created" className="cursor-pointer">
                Created
            </ToggleGroupItem>
            <ToggleGroupItem value="edited" className="cursor-pointer">
                Edited
            </ToggleGroupItem>
            <ToggleGroupItem value="title" className="cursor-pointer">
                Title
            </ToggleGroupItem>
            <ToggleGroupItem value="artist" className="cursor-pointer">
                Artist
            </ToggleGroupItem>
        </ToggleGroup>
    )
}
