import { Author, Book, BookReview, Tag } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { AddReview } from "./add-review";
import { Reviews } from "./reviews";

export const BookDetail = ({
  book,
}: {
  book: {
    authors: Author[];
    tags: Tag[];
    reviews: BookReview[];
  } & Book;
}) => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <Link href="/discover">
        <div className="text-blue-500 mb-4 block">← Back to Book List</div>
      </Link>
      <div className="flex items-center">
        <div className="relative w-48 h-72 mr-6 border rounded-md overflow-hidden">
          <Image
            src={book.cover_picture}
            alt={book.title}
            fill
            sizes="cover"
            className="rounded-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
          <div className="text-gray-600 mb-2">
            {book.authors.map((author) => (
              <div key={author.id}><Link href={`/author/${author.id}`}>{author.name}</Link></div>
            ))}
          </div>
          <p className="text-gray-700 mb-4">{book.description}</p>
          <div className="text-blue-500 mb-4">
            {book.tags.map((tag) => (
              <span key={tag.id} className="inline-block bg-blue-200 text-blue-800 px-2 py-1 mr-2 rounded">
                {tag.name}
              </span>
            ))}
          </div>
          <div className="text-gray-700 mb-2">
            <strong>Page Count:</strong> {book.page_count}
          </div>
          <div className="text-gray-700 mb-2">
            <strong>Created:</strong> {new Date(book.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
      <div className="text-xl font-semibold mb-2">Reviews:</div>
      <AddReview userId={3} bookId={book.id}/>
      <hr className="my-6 border-t border-gray-300" />
      <Reviews reviews={book.reviews}/>
    </div>
  );
};
