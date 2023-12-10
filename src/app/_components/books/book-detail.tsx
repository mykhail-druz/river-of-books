import { Author, Book } from "@prisma/client";
import Link from "next/link";

export const BookDetail = ({
  book,
}: {
  book: {
    authors: Author[];
  } & Book;
}) => {
  return (
    <>
      <h2>{book.title}</h2>
      {book.authors.map((author) => (
        <div key={author.id}>
          <Link href={`/author/${author.id}`}>{author.name}</Link>
        </div>
      ))}
      <p>TODO: render what you want :)</p>
    </>
  );
};
