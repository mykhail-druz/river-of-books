import db from "@/server/db";
import { Author, Book, BookReview } from "@prisma/client";

export const getAllBooks = async (from: number, limit: number) => {
  return await db.book.findMany({
    skip: from,
    take: limit,
    include: {
      authors: true,
      tags: true
    },
  });
};

export const getBook = async (id: number) => {
  return await db.book.findUnique({
    where: {
      id: id,
    },
    include: {
      authors: true,
      tags: true,
      reviews: true
    },
  });
};

export const addBooks = async (
  books: ({
    authors: Author[];
  } & Book)[]
) => {
  const createdBooks = await Promise.all(
    books.map(
      async (
        book: {
          authors: Author[];
        } & Book
      ) => {
        const { authors, ...bookDetails } = book;

        const createdBook = await db.book.create({
          data: {
            ...bookDetails,
            authors: {
              create: authors,
            },
          },
          include: {
            authors: true,
          },
        });

        return createdBook;
      }
    )
  );

  return createdBooks;
};

export const addReview = async (review: BookReview) => {
  return await db.book.update({
    where: {
      id: review.book_id,
    },
    data: {
      reviews: {
        create: {
          user_id: review.user_id,
          review: review.review,
          rating: review.rating,
        },
      },
    },
  });
};
