import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Location from "@/model/location";

export async function PUT(req, { params }) {
    try {

        const { id } = params;
        const { newTitle: title, newDesc: desc } = await req.json();

        await connectDB();

        await Location.findByIdAndUpdate(id, { location: title, desc: desc })
        return NextResponse.json({ message: "Location updated." }, { status: 200 });

    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(req, { params }) {

    const { id } = params;

    await connectDB();
    await Location.findByIdAndDelete(id)

    return NextResponse.json({message: "Deleted"}, {status: 200});
}