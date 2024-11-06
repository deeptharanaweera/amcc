"use client";
import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function page() {
//     const session = await getServerSession(authOptions);
 
//   if (session) redirect("/dashboard");

    return (
        <div>
            <RegisterForm/>
        </div>
    );
}
