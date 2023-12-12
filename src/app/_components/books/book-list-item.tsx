"use client";

import { Author, Book, Tag } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

export const BookItem = ({
  book,
}: {
  book: {
    authors: Author[];
    tags: Tag[];
  } & Book;
}) => {
  return (
    <Link href={`/book/${book.id}`}>
      <div className="bg-gray-50 p-6 rounded-md shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 h-full">
        <div className="relative w-full h-96 mb-4">
          <Image
            src={book.cover_picture}
            alt={book.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
        <div className="text-gray-600 mb-2">
          {book.authors.map((author) => (
            <div key={author.id}>{author.name}</div>
          ))}
        </div>
        <p className="text-gray-700 mb-4">{book.description}</p>
        <div className="text-blue-500">
          {book.tags.map((tag) => (
            <div key={tag.id}>{tag.name}</div>
          ))}
        </div>
      </div>
    </Link>
  );
};
