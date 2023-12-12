import { Book, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getAuthor = async (id: number) => {
    return await prisma.author.findUnique({
        where: {
            id: id
        }
    });
}