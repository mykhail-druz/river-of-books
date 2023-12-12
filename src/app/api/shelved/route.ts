import {NextRequest, NextResponse} from "next/server";
import db from "@/server/db";

export async function DELETE(request: NextRequest) {
    try {
        const {id} = await request.json();

        const userToUpdate = await db.user.findUnique({
            where: {id: Number(id)},
        });

        if (!userToUpdate) {
            return NextResponse.json({}, {statusText: "User not found", status: 404});
        }

        const updatedUser = await db.user.update({
            where: {id: Number(id)},
            data: {
                shelved: {
                    set: [],
                },
            },
            include: {
                shelved: true,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({}, {statusText: "Failed to update user", status: 500});
    }
}