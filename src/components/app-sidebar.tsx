import { Home, Search, Settings, Plus } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import DarkModeToggle from "@/components/dark-mode-toggle";
import Link from "next/link";

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Add Album",
        url: "/add-album",
        icon: Plus
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent className="h-full flex flex-col">
                <SidebarGroup className="h-full">
                    <SidebarGroupLabel>Album Notes</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div className="flex justify-end p-2">
                    <DarkModeToggle />
                </div>
            </SidebarContent>

        </Sidebar>
    )
}