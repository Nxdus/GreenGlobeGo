import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Post from "@/model/post";

export async function PUT(req, { params }) {
    try {

        const { id } = params;
        const { title, desc, img, location, lat, long } = await req.json();

        await connectDB();

        await Post.findByIdAndUpdate(id, { title, desc, img, location, lat, long })
        return NextResponse.json({ message: "Posts updated." }, { status: 200 });

    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(req, { params }) {

    const { id } = params;

    await connectDB();
    await Post.findByIdAndDelete(id)

    return NextResponse.json({message: "Deleted"}, {status: 200});
}