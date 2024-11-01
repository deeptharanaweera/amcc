import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../libs/mongoose";
import Gallery from "../../../../models/gallery";
import Home from "../../../../models/Home";

export async function POST(request){
    try {
        await connectionToDatabase();
        const {curselimage1, curselimage2, curselimage3, inlandranking, provinceranking, teachertostudent, passrate, footerimg, category} = await request.json();
        const newHome = new Home({curselimage1, curselimage2, curselimage3, inlandranking, provinceranking, teachertostudent, passrate, footerimg, category});
        console.log(curselimage1, curselimage2, curselimage3, inlandranking, provinceranking, teachertostudent, passrate, footerimg, category)
        await newHome.save();
        return NextResponse.json(newHome, {status: 201});
    } catch (error) {
        console.log(error);
    }
}

export async function GET(request){
    try {
        await connectionToDatabase();
        const home = await Home.find();
        return NextResponse.json(home);
    } catch (error) {
        return NextResponse(error);
    }
}