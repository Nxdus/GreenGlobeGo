import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/model/user";
import bcrypt from "bcryptjs";

export async function PUT(req, { params }) {
    try {

        const { id } = params;
        const { newUsername: username, newPassword: password } = await req.json();

        await connectDB();

        if (username) {
            await User.findByIdAndUpdate(id, { username: username })
            return NextResponse.json({ message: "Username updated." }, { status: 200 });
        } 

        if (password) {

            const encodedPassword = await bcrypt.hash(password, 10);

            await User.findByIdAndUpdate(id, { password: encodedPassword })
            return NextResponse.json({ message: "User password updated." }, { status: 200 });
        }

        return NextResponse.json({ message: "Don't have anythings Update." }, { status: 200 });

    } catch (error) {
        console.log(error)
    }
}