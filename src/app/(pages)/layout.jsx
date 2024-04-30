"use client"

import Navbar from "@/components/Navbar"

import { useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation";

export default function PagesLayout({children}) {

    const pathname = usePathname();

    const {data: session} = useSession();

    if (!session) redirect("/")

    return (
        <main className="w-full h-screen">
            {children}
            {pathname !== '/pages/dashboard' && (<Navbar />)}
        </main>
    )
}