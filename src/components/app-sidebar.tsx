"use client";

import { Home, Search, Plus, User } from "lucide-react"

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
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRef } from 'react';
import { AccentPicker } from "@/components/accent-picker";

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
        url: "/search",
        icon: Search,
    },
]

export function AppSidebar() {
    const signInRef = useRef(null);

    const handleSignInClick = () => {
        if (signInRef.current) {
            // @ts-expect-error works fine
            signInRef.current.click();
        }
    }

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
                            <SignedOut>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild onClick={handleSignInClick}>
                                        <div className="cursor-pointer">
                                                <User/>
                                                {/*@ts-expect-error ref works fine*/}
                                                <SignInButton mode="modal" ref={signInRef} className="cursor-pointer"/>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SignedOut>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div className="flex justify-end gap-2 p-4">
                    <AccentPicker />
                    <DarkModeToggle />
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </div>
            </SidebarContent>

        </Sidebar>
    )
}