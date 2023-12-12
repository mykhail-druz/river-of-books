import db from "@/server/db";
import {Role, User} from "@prisma/client";

export const getUserById = async (_id: number) => {
    return await db.user.findUniqueOrThrow({
        where: {
            id: _id,
        }
    });
}

export const updateUserById = async (_id: number, user: User) => {
    return await db.user.update({
        where: {
            id: _id,
        },
        data: {
            password: user.password,
            name: user.name,
            email: user.email,
            role: user.role,
            description: user.description,
            image: user.image
        }
    });
}

export const getName = async (id: number) => {
    const user = await db.user.findUnique({
        where: {
            id: id
        }
    });

    return user?.name;
}

export const isUserAdmin = async (id: number) => {
    const user = await db.user.findUnique({
        where: {
            id: id
        }
    });

    return user?.role === Role.ADMIN;
}

export const getShelvedBooks = async (userId: number) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        },
        include: {
            shelved: true
        }
    });

    return user?.shelved;
}

export const shelveBook = async (bookId: number, userId: number) => {
    await db.user.update({
        where: {
            id: userId,
        },
        data: {
            shelved: {
                connect: {
                    id: bookId
                }
            }
        },
        include: {
            shelved: true
        }
    })
}