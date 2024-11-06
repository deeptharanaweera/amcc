import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../libs/mongoose";
import User from "../../../../models/User";

export async function POST(req){
    try {
        await connectionToDatabase();
        const {email} = await req.json();
        const user = await User.findOne({email}).select("_id");
        console.log("user: ", user);
        return NextResponse.json({user});
    } catch (error) {
        console.log(error);
    }
}