import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/model/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const {username, email, password} = await req.json();
        const encodedPassword = await bcrypt.hash(password, 10);

        await connectDB();
        await User.create({username, email, password: encodedPassword});

        return NextResponse.json({ message: "ลงทะเบียนเสร็จสิ้น" }, {status: 201});

    } catch (error) {
        return NextResponse.json({ message: "ลงทะเบียนไม่สำเร็จ"} , {status: 500});
    }
}