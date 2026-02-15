"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
    const pathname = usePathname();
    const session = useSession();

    const linkClass = (href) =>
        `px-3 py-2 rounded-full text-sm font-semibold transition hover:bg-white/60 ${
            pathname === href ? "bg-white/80" : ""}
        `;

    return (
        <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 border-b border-black/5">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-4">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    Care.xyz
                </Link>
                <nav className="flex items-center gap-2">
                    <Link href="/" className={linkClass("/")}>Home</Link>
                    <Link href="/#services" className={linkClass("/")}>Services</Link>
                    <Link href="/my-bookings" className={linkClass("/my-bookings")}>My Bookings</Link>
                    {session?.data?.role === "admin" ? (
                        <Link href="/admin" className={linkClass("/admin")}>Admin</Link>
                    ) : null}
                    <AuthButtons />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;