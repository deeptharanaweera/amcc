import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import connectionToDatabase from '../../../../libs/mongoose';
import User from '../../../../models/User';

export async function POST(req){
    try {
        const { firstName, lastName, email, password, role } = await req.json();
        const hashedPassword = await bcrypt.hash(password,10);
        await connectionToDatabase();
        await User.create({firstName, lastName, email, password: hashedPassword, role});

        console.log(firstName, lastName, email, password, role);


        return NextResponse.json({message: "User registered successfully"}, {status: 201});
    } catch (error) {
        console.error("Registration Error: ", error.message);
        return NextResponse.json({ message: "An error occurred while registering user" }, { status: 500 });
    }
    
}