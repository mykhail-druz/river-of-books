'use client'

import {signOut} from "next-auth/react";
import {redirect} from "next/navigation";

export const LogoutButton = () => (
    <button className="btn w-64 rounded-full btn-outline" onClick={() => signOut().then(redirect('/'))}>
        Logout
    </button>
);

export default LogoutButton;