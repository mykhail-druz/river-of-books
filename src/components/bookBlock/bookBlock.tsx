"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoBookOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaRegSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";

import { Book as BookType } from "@prisma/client";
import BookDescriptionModal from "./BookDescriptionModal";
import AuthorModal from "../authorBlock/AuthorModal";
import async from '../../app/api/shelved/route';
import { getAllBooks } from "@/server/books";

type BookBlockProps = {
  bookId: number;
  tag: string;
};

const calculateHoursAgo = (createdAt: Date) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = Math.abs(
    currentDate.getTime() - createdDate.getTime()
  );
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  return hoursAgo;
};

const BookBlock: React.FC<BookBlockProps> = ({ bookId }) => {
  const [book, setBook] = useState<BookType | null>(null);
  const [liked, setLiked] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);

  const allBooks = getAllBooks(0, 11)

  console.log(allBooks)

  useEffect(() => {
    fetch(`/api/book/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((error) => console.error("Error fetching book:", error));
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleOpenDescriptionModal = () => {
    setShowDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setShowDescriptionModal(false);
  };

  const handleOpenAuthorModal = () => {
    setShowAuthorModal(true);
  };

  const handleCloseAuthorModal = () => {
    setShowAuthorModal(false);
  };

  return (
    <section className="flex w-full my-6">
      <div className=" flex bg-white border-purple-300 border-4 ">
        <div className="w-1/3 bg-purple-200">
          <Image
            onClick={handleOpenDescriptionModal}
            src={`/${book.cover_picture}`}
            alt={book.title}
            width={300}
            height={400}
          />
        </div>
        <div className="w-2/3 flex flex-col items-start space-y-2 p-8">
          <p
            className="text-xl font-bold text-purple-900 mx-auto"
            onClick={handleOpenDescriptionModal}
          >
            {book.title}
          </p>
          <p className="mx-auto font-semibold">
            by{" "}
            <a className="text-purple-900" onClick={handleOpenAuthorModal}>
              {book.authors &&
                book.authors.map((author: { name: any; }) => author.name).join(", ")}
            </a>
          </p>
          <p className="font-medium">{book.description}</p>
          <ul className="flex py-4 items-center space-x-8 font-medium">
            <li className="flex items-center space-x-2">
              <IoBookOutline className="text-3xl" />
              <p>{book.page_count} pages</p>
            </li>

            <li className="flex items-center space-x-2">
              <IoMdTime className="text-3xl" />
              <p>{calculateHoursAgo(book.created_at)} hours ago</p>
            </li>
            <li>
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-2 ${
                  liked ? "text-purple-900" : ""
                }`}
              >
                {liked ? (
                  <>
                    <FaRegCheckSquare className="text-2xl" />
                    <span>Liked</span>
                  </>
                ) : (
                  <>
                    <FaRegSquare className="text-2xl" />
                    <span>Like</span>
                  </>
                )}
              </button>
            </li>
          </ul>
          <div className="bg-purple-200 rounded-full py-2 px-4 shadow-md text-purple-800">
            {book.tags && book.tags.map((tag: { name: any; }) => tag.name).join(", ")}
          </div>
        </div>
        {showDescriptionModal && (
          <BookDescriptionModal
            bookId={bookId}
            book={book}
            onClose={handleCloseDescriptionModal}
          />
        )}
        {showAuthorModal && (
          <AuthorModal bookId={bookId} onClose={handleCloseAuthorModal} />
        )}
      </div>
    </section>
  );
};

export default BookBlock;
