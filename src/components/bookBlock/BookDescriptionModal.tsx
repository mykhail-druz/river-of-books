import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Book as BookType } from "@prisma/client";
import { IoBookOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";

type BookDescriptionModalProps = {
  book: {
    created_at: Date;
  };
  bookId: number;
  onClose: () => void;
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

const BookDescriptionModal: React.FC<BookDescriptionModalProps> = ({
  onClose,
  bookId,
}) => {
  const [book, setBook] = useState<BookType | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`/api/book/${bookId}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book:", error));
  }, []);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  console.log(book.reviews && book.reviews.map((review: { review: any; }) => review.review).join(", "))

  return (
    <div className="fixed w-full h-screen flex items-center justify-center">
      <div className="h-full w-full absolute z-10" onClick={handleCloseClick}></div>
      <div className="relative z-20 -top-[25%] right-[5%] flex items-center justify-center bg-white border-8 border-purple-200">
        <button
          onClick={handleCloseClick}
          className="absolute top-0 right-0 mr-2 text-black cursor-pointer"
        >
          <span className="text-5xl">×</span>
        </button>
        <div className="w-1/3 bg-purple-200">
          <Image
            src={`/${book.cover_picture}`}
            alt={book.title}
            width={300}
            height={400}
          />
        </div>
        <div className="w-2/3 flex flex-col items-start space-y-2 px-8">
          <p className="mx-auto text-xl font-bold text-purple-900 mb-2">
            {book.title}
          </p>
          <p className="mx-auto font-semibold text-purple-900">
            by{" "}
            {book.authors &&
              book.authors.map((author: { name: any; }) => author.name).join(", ")}
          </p>
          <p className="font-medium">{book.long_description}</p>
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
          <div className="flex-col pt-4">
            <p className="font-bold">Reviews</p>
            <p>{book.reviews && book.reviews.map((review: { rating: any; }) => review).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDescriptionModal;
