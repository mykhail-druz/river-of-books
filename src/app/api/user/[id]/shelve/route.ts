import { shelveBook, unshelveBook } from "@/server/user";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const userId = Number(params.id);
    const bookId = (await request.json()) as (number);
    await shelveBook(bookId, userId);
    return new Response();
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const userId = Number(params.id);
    const bookId = (await request.json()) as (number);
    await unshelveBook(bookId, userId);
    return new Response();
} 