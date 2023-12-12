import {redirect} from 'next/navigation';

import {getServerAuthSession} from '@/server/auth';
import LogoutButton from "@/app/_components/profile/logout-button";
import Link from "next/link";
import EraseShelvedButton from "@/app/_components/profile/erase-shelved-button";

import {FaEdit} from "react-icons/fa";


export default async function Profile() {
    const status = await getServerAuthSession();
    if (!status) {
        // User unauthenticated, redirect to home
        redirect('/discover');
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ul className="menu space-y-1 bg-base-200 rounded-box">
                <Link className="btn rounded-full btn-outline" href={"/profile/user"}>
                    <FaEdit className="text-purple-900"/>
                    Profile
                </Link>
                <EraseShelvedButton id={parseInt(status.user.id)}/>
                <LogoutButton/>
            </ul>
        </main>
    );
}