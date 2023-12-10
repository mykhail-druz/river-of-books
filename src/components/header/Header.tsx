"use client";
import React, { useState } from "react";
import { IoMdCompass } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  return (
    <header className="pt-12">
      <nav>
        <ul className="menu menu-horizontal bg-base-200 rounded-box border border-gray-500 list-none p-0 m-0">
          <li
            className={`group ${
              activeItem === 0 ? "bg-purple-200" : "hover:bg-purple-100"
            } rounded-tl-box rounded-bl-box border-r border-gray-400`}
          >
            <a
              className="my-0.5 font-bold"
              onClick={() => handleItemClick(0)}
            >
              <IoMdCompass className="text-purple-900" />
              Discover
            </a>
          </li>
          <li
            className={`group ${
              activeItem === 1 ? "bg-purple-200" : "hover:bg-purple-100"
            }`}
          >
            <a
              className="my-0.5 font-bold "
              onClick={() => handleItemClick(1)}
            >
              <FaStar className="text-purple-900" />
              Shelved
            </a>
          </li>
          <li
            className={`group ${
              activeItem === 2 ? "bg-purple-200" : "hover:bg-purple-100"
            } rounded-tr-box rounded-br-box border-l border-gray-400`}
          >
            <a
              className="my-0.5 font-bold"
              onClick={() => handleItemClick(2)}
            >
              <FaUserCircle className="text-purple-900" />
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

