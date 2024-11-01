import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../libs/mongoose";
import Gallery from "../../../../models/gallery";
import { json } from "stream/consumers";

export async function POST(request){
    try {
        await connectionToDatabase();
        const {header, description, mainimage, otherimages} = await request.json();
        const newGallery = new Gallery({header, description, mainimage, otherimages});
        console.log(header, description, mainimage, otherimages)
        await newGallery.save();
        return NextResponse.json(newGallery, {status: 201});
    } catch (error) {
        console.log(error);
    }
}

export async function GET(request){
    try {
        await connectionToDatabase();
        const gallery = await Gallery.find();
        return NextResponse.json(gallery);
    } catch (error) {
        return NextResponse(error);
    }
}