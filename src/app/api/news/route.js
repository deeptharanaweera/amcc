import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../libs/mongoose";
import News from "../../../../models/News";



// export async function POST(request){
//     const {header, description, closingdate, startdate,image, download, onlineapply, category} = await request.json();
//     await connectionToDatabase();
//     await News.create({header, description, closingdate, startdate, image, download, onlineapply, category});
//     console.log(header, description, closingdate, startdate, image, download, onlineapply, category);
//     return NextResponse.json({message: "News created successfully"}, {status: 201});
// }

export const POST = async (request) => {
    try {
        await connectionToDatabase();
        
        const data = await request.formData();
        const header = data.get("header");
        const description = data.get("description");
        const closingdate = data.get("closingdate");
        const startdate = data.get("startdate");
        const download = data.get("download");
        const onlineapply = data.get("onlineapply");
        const category = data.get("category");
        const file = data.get("file");
        if(!file){
            return NextResponse.json({message: "Please upload a file", success:false});
        }
        
        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);
        const newNews = new News({
            header: header,
            description: description,
            closingdate: closingdate,
            startdate: startdate,
            image_name: file.name,
            image_data: buffer,
            image_type: file.type,
            
            download: download,
            onlineapply: onlineapply,
            category: category
        });
        await newNews.save();
        return NextResponse.json({response: "News created successfully", success:true});
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

export async function DELETE(request, {params}){
    const id = request.nextUrl.searchParams.get("id");
    await connectionToDatabase();
    await News.findByIdAndDelete(id);
    return NextResponse.json({message: "News deleted successfully"}, {status: 201});
}