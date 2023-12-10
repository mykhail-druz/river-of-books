import {getServerAuthSession} from "@/server/auth";
import {redirect} from "next/navigation";

export default async function Shelved() {
    const status = await getServerAuthSession();
    if (!status) {
        // User unauthenticated, redirect to home
        redirect('/');
    }
}