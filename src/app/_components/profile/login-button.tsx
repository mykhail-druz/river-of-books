'use client'

import {signIn} from "next-auth/react";
import {redirect} from "next/navigation";
import { IoIosLogIn } from "react-icons/io";


export const LoginButton = () => (
    <button className="my-0.5 font-bold" onClick={() => signIn().then(redirect('/discover'))}>
        <IoIosLogIn className="text-purple-900"/>
        Login
    </button>
);

export default LoginButton;