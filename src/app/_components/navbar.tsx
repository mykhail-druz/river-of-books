import Link from 'next/link';
import {getServerAuthSession} from "@/server/auth";
import LoginButton from "@/app/_components/profile/login-button";
import { isUserAdmin } from '@/server/user';

const Navbar = async () => {
    const status = await getServerAuthSession();
    const isAdmin: boolean = !status ? false : await isUserAdmin(Number(status!.user.id));
    if (!status) {
        return (
            <nav className="navbar bg-base-100">
                <ul className="container mx-auto flex justify-center">
                    <li>
                        <Link className="btn w-64 rounded-full" href="/">Home</Link>
                    </li>
                    <li>
                        <Link className="btn w-64 rounded-full" href="/discover">Discover</Link>
                    </li>
                    <LoginButton/>
                </ul>
            </nav>
        );
    }
    return (
        <nav className="navbar bg-base-100">
            <ul className="container mx-auto flex justify-center">
                <li>
                    <Link className="btn w-64 rounded-full" href="/">Home</Link>
                </li>
                <li>
                    <Link className="btn w-64 rounded-full" href="/discover">Discover</Link>
                </li>
                <li>
                    <Link className="btn w-64 rounded-full" href="/shelved">Shelved</Link>
                </li>
                <li>
                    <Link className="btn w-64 rounded-full" href="/profile">User</Link>
                </li>
                { isAdmin && <li>
                    <Link href="/manage">Manage Books</Link>
                </li>}
            </ul>
        </nav>
    );
};

export default Navbar;