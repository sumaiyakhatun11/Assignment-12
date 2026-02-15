"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LoginButton = () => {
    const pathname = usePathname();
    const redirect = pathname && pathname !== "/login" ? `?redirect=${pathname}` : "";

    return (
        <Link href={`/login${redirect}`} className="btn btn-primary">
            Log in
        </Link>
    );
};

export default LoginButton;