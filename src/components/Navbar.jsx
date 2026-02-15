"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
    const pathname = usePathname();
    const session = useSession();

    const linkClass = (href) =>
        `group relative px-3 py-2 rounded-full text-sm font-semibold transition hover:bg-white/60 ${
            pathname === href ? "bg-white/80" : ""}
        `;

    return (
        <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 border-b border-black/5">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                    <span className="h-10 w-10 rounded-xl bg-white/80 border border-black/5 flex items-center justify-center overflow-hidden">
                        <Image src="/logo.png.png" alt="FabricPulse logo" width={40} height={40} />
                    </span>
                    <span>Care.IO</span>
                </Link>
                <nav className="flex items-center gap-2">
                    <Link href="/" className={linkClass("/")}>Home<span className="absolute left-3 right-3 bottom-1 h-0.5 bg-orange-300 scale-x-0 transition-transform group-hover:scale-x-100" /></Link>
                    <Link href="/all-products" className={linkClass("/all-products")}>All Products<span className="absolute left-3 right-3 bottom-1 h-0.5 bg-orange-300 scale-x-0 transition-transform group-hover:scale-x-100" /></Link>
                    <Link href="/about-us" className={linkClass("/about-us")}>About Us<span className="absolute left-3 right-3 bottom-1 h-0.5 bg-orange-300 scale-x-0 transition-transform group-hover:scale-x-100" /></Link>
                    <Link href="/#services" className={linkClass("/")}>Services<span className="absolute left-3 right-3 bottom-1 h-0.5 bg-orange-300 scale-x-0 transition-transform group-hover:scale-x-100" /></Link>
                    <Link href="/my-bookings" className={linkClass("/my-bookings")}>My Bookings<span className="absolute left-3 right-3 bottom-1 h-0.5 bg-orange-300 scale-x-0 transition-transform group-hover:scale-x-100" /></Link>
                    <Link href="/profile" className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-white/60">
                        <span className="h-8 w-8 rounded-full overflow-hidden bg-white/80 border border-black/5 flex items-center justify-center">
                            {session?.data?.user?.image ? (
                                <Image src={session.data.user.image} alt="Profile" width={32} height={32} />
                            ) : (
                                <span className="text-xs font-semibold text-black/60">U</span>
                            )}
                        </span>
                    </Link>
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