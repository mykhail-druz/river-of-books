"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { BookItem } from "./book-list-item";
import { useState } from "react";
import { Author, Book, Tag } from "@prisma/client";

// const limit = 10;

export const BookList = ({
  baseBooks,
}: {
  baseBooks: ({
    authors: Author[];
    tags: Tag[]
  } & Book)[];
}) => {
  const [books, setBooks] = useState(baseBooks);
  const [hasMore, setHasMore] = useState(true);

  const getMoreBooks = async () => {
    const res = await fetch(`api/book?from=${books.length}&limit=${4}`, {
      method: "GET",
    });
    const newBooks = await res.json();
    if (newBooks.length == 0) {
      setHasMore(false);
    }
    setBooks((book) => [...book, ...newBooks]);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={books.length}
        next={getMoreBooks}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {books.map((book) => (
            <div key={book.id}>
              <BookItem book={book}></BookItem>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};
