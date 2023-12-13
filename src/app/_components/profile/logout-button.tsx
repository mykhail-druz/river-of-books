'use client'

import {signOut} from "next-auth/react";
import {redirect} from "next/navigation";
import { IoIosLogOut } from "react-icons/io";


export const LogoutButton = () => (
    <button className="btn w-64 rounded-full btn-outline" onClick={() => signOut().then(redirect('/discover'))}>
        <IoIosLogOut className="text-purple-900"/>
        Logout
    </button>
);

export default LogoutButton;