import { getAuthorWithBooks } from "@/server/authors";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const authorId = searchParams.get("id");

  if (!authorId) {
    return new Response("Author ID is required", { status: 400 });
  }

  const author = await getAuthorWithBooks(Number(authorId));
  return new Response(JSON.stringify(author), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
