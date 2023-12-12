import { Author, Book, BookReview, Tag } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { AddReview } from "./add-review";
import { Reviews } from "./reviews";
import { getServerAuthSession } from "@/server/auth";
import { ShelveButton } from "./shelve-button";
import { isBookShelved, isUserAdmin } from "@/server/user";
import DeleteButton from "./delete-button";
import RatingStars from "./rating-stars";

const getBookRating = (reviews: BookReview[]) => {
  const sum = reviews.reduce((sum, review) => sum + review.rating, 0);
  return sum / reviews.length || 0;
  return;
};

export const BookDetail = async ({
  book,
}: {
  book: {
    authors: Author[];
    tags: Tag[];
    reviews: BookReview[];
  } & Book;
}) => {
  const status = await getServerAuthSession();
  const _isBookShelved = status
    ? await isBookShelved(book.id, Number(status!.user.id))
    : false;
  const isAdmin = status ? await isUserAdmin(Number(status!.user.id)) : false;
  const roundedBookRating = Math.round(getBookRating(book.reviews) ?? 0);
  const bookRating = Math.round((getBookRating(book.reviews) ?? 0) * 100) / 100;

  return (
    <div className="mt-8 p-6 bg-white rounded-md shadow-md max-w-screen-xl mx-auto">
      <Link href="/discover">
        <div className="text-gray-800 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mr-2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </div>
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">{book.title}</h1>
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="relative w-full md:w-96 h-96 mb-6 md:mr-6 rounded-md overflow-hidden">
          <Image
            src={book.cover_picture}
            alt={book.title}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
        <div>
          <div className="text-gray-600 mb-2 flex">
            {book.authors.map((author) => (
              <div key={author.id}>
                <Link href={`/author/${author.id}`}>
                  <strong>{author.name}</strong>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-gray-700 mb-4 md:max-w-md">
            Description: {book.description}
          </p>
          <p className="text-gray-700 mb-4 md:max-w-md">
            Long description: {book.long_description}
          </p>
          <div className="text-blue-500 mb-4 flex">
            {book.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block bg-blue-200 text-blue-800 px-2 py-1 mr-2 rounded">
                {tag.name}
              </span>
            ))}
          </div>
          <div className="flex ">
            {status && (
              <ShelveButton
                userId={Number(status.user.id)}
                bookId={book.id}
                isBookShelved={_isBookShelved}
              />
            )}
            {isAdmin && <DeleteButton bookId={book.id} />}
          </div>
          <div className="text-gray-700 my-2 ">
            <strong>Page Count:</strong> {book.page_count}
          </div>
          <div className="text-gray-700 my-2">
            <strong>Created:</strong>{" "}
            {new Date(book.created_at).toLocaleDateString()}
          </div>
          <div className="mt-4">
            <div className="text-gray-700 my-2 ">
              Rating: <strong>{bookRating}</strong>
            </div>
            <RatingStars rating={roundedBookRating} />
          </div>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
      {status && <AddReview userId={Number(status.user.id)} bookId={book.id} />}
      {book.reviews.length > 0 && (
        <>
          {status && <hr className="my-6 border-t border-gray-300" />}
          <Reviews reviews={book.reviews} />
        </>
      )}
    </div>
  );
};
