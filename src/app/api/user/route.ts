import {NextRequest, NextResponse} from 'next/server';
import db from "@/server/db";

export async function PUT(request: NextRequest) {
    try {
        const {id, password, name, email, role, description, image} = await request.json();

        const userToUpdate = await db.user.findUnique({
            where: {id: Number(id)},
        });

        if (!userToUpdate) {
            return NextResponse.json({}, {statusText: "User not found", status: 404});
        }

        const updatedUser = await db.user.update({
            where: {id: Number(id)},
            data: {
                name: name || userToUpdate.name,
                email: email || userToUpdate.email,
                password: password,
                description: description,
                image: image,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({}, {statusText: "Failed to update user", status: 500});
    }
}