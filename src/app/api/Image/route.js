import { NextResponse } from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pump = promisify(pipeline);

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const filePath = `./public/uploads/${uniqueSuffix}-${file.name}`;
        await pump(file.stream(), fs.createWriteStream(filePath));

        return NextResponse.json({imgUrl: "/uploads/" + uniqueSuffix + '-' + file.name}, {status: 200})
    } catch (error) {
        console.log(error)
    }
}