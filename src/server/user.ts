import db from "@/server/db";
import {Book, Role, User} from "@prisma/client";

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

export const getNames = async (ids: number[]) => {
    const users: User[] = await db.user.findMany({
        where: {
            id: {in: ids }
        }
    });
    return users;
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
            shelved: {
                include: {
                    tags: true,
                    authors: true
                }
            }
        }
    });
    return user!.shelved!;
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

export const unshelveBook = async (bookId: number, userId: number) => {
    await db.user.update({
        where: {
            id: userId,
        },
        data: {
            shelved: {
                disconnect: {
                    id: bookId
                }
            }
        },
        include: {
            shelved: true
        }
    })
}

export const isBookShelved = async (bookId: number, userId: number) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        },
        include: {
            shelved:true
        }
    });

    if (user?.shelved.find((sb: Book) => sb.id == bookId)) {
        return true;
    };

    return false;
}