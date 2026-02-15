"use client";

import { signOut, useSession } from "next-auth/react";
import LoginButton from "./LoginButton";

const AuthButtons = () => {
    const session = useSession();

    if (session.status === "authenticated") {
        return (
            <button className="btn btn-outline" onClick={() => signOut()}>
                Log out
            </button>
        );
    }

    return <LoginButton />;
};

export default AuthButtons;