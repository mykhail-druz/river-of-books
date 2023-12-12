"use client";

import React, { useEffect, useState } from "react";
import { Author, Book } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type AuthorDetailProps = {
  authorId: number;
};

export const AuthorDetail = ({ authorId }: AuthorDetailProps) => {
  const [author, setAuthor] = useState<(Author & { books: Book[] }) | null>(
    null
  );
  const navigation = useRouter();

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(`/api/author?id=${authorId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-md shadow-md max-w-screen-xl mx-auto">
      <div
        className="text-gray-800 mb-4 cursor-pointer"
        onClick={() => navigation.back()}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </div>
      <div className="flex items-center">
        <div className="relative w-64 h-72 mr-6 border rounded-md overflow-hidden">
          <Image
            src={author.portrait}
            alt={author.name}
            fill
            sizes="cover"
            className="rounded-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {author.name}
          </h1>
          <p className="text-gray-700 mb-4">{author.description}</p>

          <div className="text-blue-500 mb-4">
            {/* {author.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-block bg-blue-200 text-blue-800 px-2 py-1 mr-2 rounded"
            >
              {tag.name}
            </span>
          ))} */}
            <span className="inline-block bg-blue-200 text-blue-800 px-2 py-1 mr-2 rounded">
              TODO: Author topics tags :)
            </span>
          </div>
          <div className="text-gray-700 mb-2">
            <strong>Book Count:</strong> {author.books.length}
          </div>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
      <div>
        <h2 className="text-gray-800 text-xl font-semibold">Books</h2>
        <ul className="text-gray-600">
          {author.books?.map((book) => <li key={book.id}>{book.title}</li>) ?? (
            <li>No books available</li>
          )}
        </ul>
      </div>
    </div>
  );
};
