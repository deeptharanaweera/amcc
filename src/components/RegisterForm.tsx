"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


export default function RegisterForm() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName) {
            toast.error("Please enter your first name.");
            return;
        }
        else if(!lastName){
            toast.error("Please enter your last name.");
            return;
        }
        else if(!role){
            toast.error("Please enter your role.");
            return;
        }
        else if(!email){
            toast.error("Please enter your email.");
            return;
        }
        else if(!password){
            toast.error("Please enter your password.");
            return;
        }
        try {

            const resUserExists = await fetch("http://localhost:3000/api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });

            const {user} = await resUserExists.json();

            if(user){
                toast.error("User already exists!");
                return;
            }

            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName, lastName, email, password, role
                })
            });
            console.log(res);
            if(res.ok){
                const form = e.target;
                form.reset();
                router.push("/login");
                console.log("User Registration Successful!");
                toast.success("User Registration Successful!");
            }
            else{
                console.log("User Registration Failed!");
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.log("Error during Registration: ", error);
        }
    };

    return (
        <div className="relative w-screen h-auto md:h-auto lg:h-screen bg-transparent opacity-150 flex flex-col justify-center items-center"
            style={{
                backgroundImage: "url('/image/hq720.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}>
            <Toaster position="top-center" reverseOrder={false} /> {/* Always render Toaster */}

            <div className="">
                <div className="min-h-screen flex flex-col items-center justify-center lg:px-0 px-2">
                    <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white rounded-md">
                        <div className="w-full px-4">
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center items-center mb-12">
                                    <div className="w-auto h-auto flex justify-start items-start">
                                        <img src="image/logo.png" className="w-40 h-20 object-contain" alt="login-image" />
                                    </div>
                                    <div className="">
                                        <h3 className="text-gray-800 text-3xl font-bold">Admin Register</h3>
                                        <p className="text-xl mt-1 text-gray-800 font-semibold">R/Balangoda Ananda Maithreya Central College, Balangoda</p>
                                    </div>
                                </div>

                                <div className="lg:px-6">
                                    <label className="text-gray-800 text-xl block mb-2">First Name</label>
                                    <div className="relative flex items-center">
                                        <input name="firstname" type="text" onChange={(e) => setFirstName(e.target.value)}  className="w-full text-gray-800 text-lg bg-gray-50 border-b border-gray-400 focus:border-[#3A0F09] px-2 py-3 outline-none" placeholder="Enter First name" />
                                        <MdOutlineEmail className="w-[18px] h-[18px] absolute right-2 cursor-pointer" />
                                    </div>
                                </div>

                                <div className="mt-8 lg:px-6">
                                    <label className="text-gray-800 text-xl block mb-2">Last Name</label>
                                    <div className="relative flex items-center">
                                        <input name="lastname" type="text" onChange={(e) => setLastName(e.target.value)}  className="w-full text-gray-800 text-lg bg-gray-50 border-b border-gray-400 focus:border-[#3A0F09] px-2 py-3 outline-none" placeholder="Enter Last name" />
                                        <MdOutlineEmail className="w-[18px] h-[18px] absolute right-2 cursor-pointer" />
                                    </div>
                                </div>

                                <div className="mt-8 lg:px-6">
                                <label className="text-gray-800 text-xl block mb-2">Role</label>
                                <select value={role} onChange={(e) => setRole(e.target.value)}  className="w-full text-gray-800 text-lg bg-gray-50 border-b border-gray-400 focus:border-[#3A0F09] px-2 py-3 outline-none">
                                    <option value="" hidden>teacher / student</option>
                                    <option value="admin">Admin</option>
                                    <option value="teacher" disabled>Teacher</option>
                                    <option value="student" disabled>Student</option>
                                </select>
                            </div>

                                <div className="mt-8 lg:px-6">
                                    <label className="text-gray-800 text-xl block mb-2">Email</label>
                                    <div className="relative flex items-center">
                                        <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}  className="w-full text-gray-800 text-lg bg-gray-50 border-b border-gray-400 focus:border-[#3A0F09] px-2 py-3 outline-none" placeholder="Enter email" />
                                        <MdOutlineEmail className="w-[18px] h-[18px] absolute right-2 cursor-pointer" />
                                    </div>
                                </div>

                                <div className="mt-8 lg:px-6">
                                    <label className="text-gray-800 text-xl block mb-2">Password</label>
                                    <div className="relative flex items-center">
                                        <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}  className="w-full text-gray-800 text-lg bg-gray-50 border-b border-gray-400 focus:border-[#3A0F09] px-2 py-3 outline-none" placeholder="Enter password" />
                                        <FaRegEye className="w-[18px] h-[18px] absolute right-2 cursor-pointer" />
                                    </div>
                                </div>

                                <div className="mt-12 lg:px-6">
                                    <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-lg tracking-wide rounded-md text-white bg-[#691411] hover:bg-[#3A0F09] focus:outline-none">
                                        Register
                                    </button>
                                </div>

                                <div className="space-x-6 flex justify-center mt-3 lg:px-6">
                                    <button type="button" className="border-none outline-none">
                                        <img src="image/youtube_logo.png" alt="" className="w-8" />
                                    </button>
                                    <button type="button" className="border-none outline-none">
                                        <img src="image/Facebook_logo.png" alt="" className="w-6" />
                                    </button>
                                    <button type="button" className="border-none outline-none">
                                        <img src="image/tiktok_logo.webp" alt="" className="w-8" />
                                    </button>
                                    <button type="button" className="border-none outline-none">
                                        <img src="image/web.png" alt="" className="w-8" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="md:h-full h-full">
                            <img src="image/footer_img.jpeg" className="w-screen h-full object-contain rounded-r-xl" alt="login-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
