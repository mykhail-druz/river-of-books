import { Book, PrismaClient } from "@prisma/client";
import db from "./db";

export const getAuthor = async (id: number) => {
  return await db.author.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true,
    },
  });
};

export const getAuthorWithBooks = async (id: number) => {
  return await db.author.findUnique({
    where: {
      id: id,
    },
    include: {
      books: {
        include: {
          tags: true,
        },
      },
    },
  });
};
