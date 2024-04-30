import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req) {
    const form = await req.formData();
    const file = form.get("file")

    console.log(file)

    if (!file) return NextResponse.json({error: "No file provide"}, {status: 400});

    const upload = await put(file.name, file, {
        access: "public",
    })

    return NextResponse.json(upload)
}