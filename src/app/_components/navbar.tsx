import Link from 'next/link';
import {getServerAuthSession} from "@/server/auth";
import LoginButton from "@/app/_components/profile/login-button";
import {isUserAdmin} from '@/server/user';

import {IoMdCompass} from "react-icons/io";
import {FaStar, FaUserCircle} from "react-icons/fa";
import {MdManageAccounts} from "react-icons/md";


const Navbar = async () => {
    const status = await getServerAuthSession();
    const isAdmin: boolean = !status ? false : await isUserAdmin(Number(status!.user.id));

    return (
        <nav className="navbar bg-base-100 flex justify-center items-center">
            <ul className="menu space-x-5 menu-horizontal bg-base-200 rounded-box border border-gray-500 p-0 m-0">
                <li>
                    <Link href="/discover" className="my-0.5 font-bold">
                        <IoMdCompass className="text-purple-900"/>
                        Discover
                    </Link>
                </li>
                {status && <li>
                    <Link href="/shelved" className="my-0.5 font-bold">
                        <FaStar className="text-purple-900"/>
                        Shelved
                    </Link>
                </li>
                }
                {status &&
                    <li>
                        <Link href="/profile" className="my-0.5 font-bold">
                            <FaUserCircle className="text-purple-900"/>
                            Profile
                        </Link>
                    </li>
                }
                {!status &&
                    <li>
                        <LoginButton/>
                    </li>
                }
                {status && isAdmin && <li>
                    <Link href="/manage" className="my-0.5 font-bold">
                        <MdManageAccounts className="text-purple-900"/>
                        Manage Books
                    </Link>
                </li>
                }
            </ul>
        </nav>
    )
};

export default Navbar;