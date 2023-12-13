import { deleteBook } from "@/server/books";
import { NextRequest } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    await deleteBook(Number(params.id));
    return new Response();
}