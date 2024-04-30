import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/model/user";
import bcrypt from "bcryptjs";

export async function POST(req, { params }) {
    try {

        await connectDB();

        const { id } = params;
        const { Password: password } = await req.json();

        const user = await User.findById(id);
        const passwordMatched = await bcrypt.compare(password, user.password);

        return NextResponse.json({ passwordMatched }, { status: 200 });

    } catch (error) {
        console.log(error)
    }
}