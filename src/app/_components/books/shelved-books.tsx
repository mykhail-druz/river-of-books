"use client";

import { BookItem } from "./book-list-item";
import { Author, Book, Tag } from "@prisma/client";

const ShelvedBooks = ({
    shelvedBooks,
}: {
  shelvedBooks: ({
    authors: Author[];
    tags: Tag[];
  } & Book)[];
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {shelvedBooks.map((book) => (
        <div key={book.id}>
          <BookItem book={book}></BookItem>
        </div>
      ))}
    </div>
  );
};

export default ShelvedBooks;
