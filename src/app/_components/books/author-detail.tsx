import { Author, Book } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type AuthorDetailProps = {
  author: Author & { books: Book[] };
};

export const AuthorDetail = ({ author }: AuthorDetailProps) => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <Link href="">
        <div className="text-blue-500 mb-4 block">← Back to Book</div>
      </Link>
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
              TODO: Author's topics tags :)
            </span>
          </div>
          <div className="text-gray-700 mb-2">
            <strong>Book Count:</strong> TODO: Book count :)
            {/* {author.book_count} */}
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
