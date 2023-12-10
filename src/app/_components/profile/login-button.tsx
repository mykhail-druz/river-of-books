'use client'

import {signIn} from "next-auth/react";
import {redirect} from "next/navigation";

export const LoginButton = () => (
    <button className="btn w-64 rounded-full" onClick={() => signIn().then(redirect('/'))}>
        Login
    </button>
);

export default LoginButton;