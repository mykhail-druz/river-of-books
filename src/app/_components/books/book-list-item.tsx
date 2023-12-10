"use client";

import { Book } from "@prisma/client";
import Link from "next/link";

export const BookItem = ({ book }: { book: Book }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/book/${book.id}`}>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {book.title}
        </h2>
      </Link>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {book.description}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {book.long_description}
      </p>
      <Link href={`/book/${book.id}`}>
        <button className="mt-1 rounded-md bg-blue-700 text-white">
          Read more
        </button>
      </Link>
    </div>
  );
};
