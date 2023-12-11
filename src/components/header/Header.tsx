import React, { useState } from "react";
import Link from "next/link";
import { IoMdCompass } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <header className="pt-12">
      <nav>
        <ul className="menu menu-horizontal bg-base-200 rounded-box border border-gray-500 list-none p-0 m-0">
          <li
            className={`group ${
              activeItem === 0 ? "bg-purple-200" : "hover:bg-purple-100"
            } rounded-tl-box rounded-bl-box border-r border-gray-400`}
          >
            <Link className="flex my-0.5 font-bold" href="/" passHref>
              <IoMdCompass className="text-purple-900" />
              <p>Discover</p>
            </Link>
          </li>
          <li
            className={`group ${
              activeItem === 1 ? "bg-purple-200" : "hover:bg-purple-100"
            }`}
          >
            <Link className="flex my-0.5 font-bold" href="/shelved" passHref>
              <FaStar className="text-purple-900" />
              <p>Shelved</p>
            </Link>
          </li>
          <li
            className={`group ${
              activeItem === 2 ? "bg-purple-200" : "hover:bg-purple-100"
            } rounded-tr-box rounded-br-box border-l border-gray-400`}
          >
            <Link className="flex my-0.5 font-bold" href="/profile" passHref>
              <FaUserCircle className="text-purple-900" />
              <p>Profile</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
