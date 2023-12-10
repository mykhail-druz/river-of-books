import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/server/auth';
import LogoutButton from "@/app/_components/profile/logout-button";
import Link from "next/link";
import EraseShelvedButton from "@/app/_components/profile/erase-shelved-button";

export default async function Profile() {
    const status = await getServerAuthSession();
    if (!status) {
        // User unauthenticated, redirect to home
        redirect('/');
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <ul className="menu bg-base-200 rounded-box">
                    <Link className="btn rounded-full btn-outline" href={"/profile/user"}>Profile</Link>
                    <EraseShelvedButton id={parseInt(status.user.id)}/>
                    <LogoutButton/>
                </ul>
        </main>
    );
}