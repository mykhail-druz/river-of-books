import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Book as BookType } from "@prisma/client";

type AuthorModalProps = {
  bookId: number;
  onClose: () => void;
};

const AuthorModal: React.FC<AuthorModalProps> = ({ onClose, bookId }) => {
  const [book, setBook] = useState<BookType | null>(null);

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

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="fixed w-full h-screen flex items-center justify-center">
      <div
        className="h-full w-full absolute z-10"
        onClick={handleCloseClick}
      ></div>
      <div className="relative z-20 -top-[25%] right-[5%] flex items-center justify-center bg-white border-8 border-purple-200">
        <button
          onClick={handleCloseClick}
          className="absolute top-0 right-0 mr-2 text-black cursor-pointer"
        >
          <span className="text-5xl">×</span>
        </button>
        <div className="w-1/3 bg-purple-200">
          <Image
            src={`/${book.authors.map((author: { portrait: any; }) => author.portrait).join(", ")}`}
            alt={book.authors.map((author: { name: any; }) => author.name).join(", ")}
            width={300}
            height={400}
          />
        </div>
        <div className="w-2/3 flex flex-col items-start space-y-2 px-8">
          <p className="text-xl font-bold text-purple-900 mx-auto">
            {book.authors.map((author: { name: any; }) => author.name).join(", ")}
          </p>
          <p className="font-medium">{book.authors.map((author: { description: any; }) => author.description).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorModal;
