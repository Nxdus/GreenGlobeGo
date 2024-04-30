import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Post from "@/model/post";

export async function POST(req) {
    const { title, desc, img, location, lat, long } = await req.json();
    await connectDB();
    await Post.create({title, desc, img, location, lat, long});

    return NextResponse.json({message: "Post Created"}, {status: 201});
}

export async function GET(req) {

    const location = req.nextUrl.searchParams.get("location")

    await connectDB();

    if (location) {
        const posts = await Post.find({location: location});
        return NextResponse.json({posts});
    }

    const posts = await Post.find();

    return NextResponse.json({posts});
}