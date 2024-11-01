import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../libs/mongoose";
import News from "../../../../models/News";

export async function POST(request){
    try {
        await connectionToDatabase();
        const {header, description, closingdate, startdate, image, download, onlineapply, category} = await request.json();
        const newNews = new News({header, description, closingdate, startdate, image, download, onlineapply, category});
        console.log(header, description, closingdate, startdate, image, download, onlineapply, category)
        await newNews.save();
        return NextResponse.json(newNews, {status: 201});
    } catch (error) {
        console.log(error);
    }
}

export async function GET(request){
    try {
        await connectionToDatabase();
        const news = await News.find();
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse(error);
    }
}