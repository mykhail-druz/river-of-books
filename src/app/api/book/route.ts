import { addBooks, getAllBooks } from "@/server/books";
import { Author, Book } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get("from");
  const limit = searchParams.get("limit");

  const books = await getAllBooks(Number(from), Number(limit));
  return Response.json(books);
};

export const POST = async (request: NextRequest) => {
  const books = (await request.json()) as ({
    authors: Author[];
  } & Book)[];
  await addBooks(books);
  return new Response();
};
