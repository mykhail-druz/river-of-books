"use client";

import React, { useEffect, useState } from "react";
import { Author, Book, Tag } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AuthorDetailProps = {
  authorId: number;
};

export const AuthorDetail = ({ authorId }: AuthorDetailProps) => {
  const [author, setAuthor] = useState<(Author & { books: Book[] }) | null>(
    null
  );
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
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
        setUniqueTags(getUniqueTags(data.books));
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  const getUniqueTags = (books: Book[]): string[] => {
    const allTags = books.flatMap((book) => book.tags.map((tag) => tag.name));
    return Array.from(new Set(allTags));
  };

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-md shadow-md max-w-screen-xl mx-auto overflow-hidden">
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
      <h1 className="mb-6 text-3xl font-bold text-gray-800 text-center md:text-start">{author.name}</h1>
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="relative w-[90%] h-72 md:w-96 md:h-96 mb-6 md:mr-6 rounded-md overflow-hidden mx-auto md:mx-0">
          <Image
            src={author.portrait}
            alt={author.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
        <div>
          <p className="text-gray-700 mb-4">{author.description}</p>
          <div className="text-blue-500 mb-4">
            {uniqueTags.map((tagName, index) => (
              <span
                key={index}
                className="inline-block bg-blue-200 text-blue-800 px-2 py-1 mr-2 rounded"
              >
                {tagName}
              </span>
            ))}
          </div>
          <div className="text-gray-700 mb-2">
            <strong>Book Count:</strong> {author.books.length}
          </div>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
      <div>
        <h2 className="text-gray-800 text-xl font-semibold mb-4">Books</h2>
        <div className="grid md:grid-cols-2 gap-4 items-center justify-center">
          {author.books?.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div className="bg-gray-50 sm:p-2 md:p-6 rounded-md w-[80vw] h-[400px] md:w-[400px] md:h-[500px] shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 flex flex-col items-center">
                <div className="relative w-[90%] h-64 md:w-[300px] md:h-[350px]  mb-4">
                  <Image
                    src={book.cover_picture}
                    alt={book.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h2
                  className="text-2xl font-bold text-gray-800 mb-2 text-center"
                  style={{ overflow: "hidden" }}
                >
                  {book.title}
                </h2>
                <p
                  className="text-gray-700 text-center"
                  style={{
                    maxHeight: "4rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {book.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
