import { addReview } from "@/server/books";
import { BookReview } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const review = (await request.json()) as BookReview;
  await addReview(review);
  return new NextResponse();
};
