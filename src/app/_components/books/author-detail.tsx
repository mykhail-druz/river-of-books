"use client";

import React, { useEffect, useState } from "react";
import { Author, Book } from "@prisma/client";
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
      <h1 className="mb-6 text-3xl font-bold text-gray-800">{author.name}</h1>
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="relative w-full md:w-96 h-96 mb-6 md:mr-6 rounded-md overflow-hidden">
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
        <h2 className="text-gray-800 text-xl font-semibold mb-4">Books</h2>
        <div className="grid grid-cols-2 gap-4">
          {author.books?.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div
                className="bg-gray-50 p-6 rounded-md shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 flex flex-col items-center"
                style={{ height: "500px", width: "400px"}}
              >
                <div className="relative w-[300px] h-[350px] mb-4">
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
          )) ?? <div>No books available</div>}
        </div>
      </div>
    </div>
  );
};
