import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Location from "@/model/location";

export const dynamic = 'force-dynamic'

export async function POST(req) {
    const {location, desc}  = await req.json();

    await connectDB();
    await Location.create({location: location, desc: desc});

    return NextResponse.json({message: "Locations Created"}, {status: 201});
}

export async function GET(req) {
    const id = req.nextUrl.searchParams.get("id")

    await connectDB();

    if (id) {
        const locations = await Location.findById(id);

        return NextResponse.json({locations});
    }

    const locations = await Location.find();

    return NextResponse.json({locations});
}