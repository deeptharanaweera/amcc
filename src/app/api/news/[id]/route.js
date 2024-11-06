import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../../libs/mongoose";
import News from "../../../../models/News";

export async function PUT(request,{params}){
    const {id} = params;
    const {header, description, closingdate, startdate,image, download, onlineapply, category} = await request.json();
    await connectionToDatabase();
    await News.findByIdAndUpdate(id, {header, description, closingdate, startdate, image, download, onlineapply, category});
    return NextResponse.json({message: "News updated successfully"}, {status: 201});
}


export async function GET(request, {params}){
    const {id} = params;
    await connectionToDatabase();
    const news = await News.findOne({_id: id});
    return NextResponse.json(news);
}