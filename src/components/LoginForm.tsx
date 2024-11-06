"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEyeSlash, FaRegEye } from "react-icons/fa"; // Added FaEyeSlash for the closed eye icon
import { MdOutlineEmail } from "react-icons/md";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!email) {
        toast.error('Enter your email');
        return;
      }
      if (!password) {
        toast.error('Enter your password');
        return;
      }
      if (res?.error) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Logged in successfully');
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-screen h-auto md:h-auto lg:h-screen bg-transparent opacity-150 flex flex-col justify-center items-center"
         style={{
           backgroundImage: "url('/image/hq720.jpg')",
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundAttachment: "fixed", // Keeps background image fixed during scroll
         }}>
      <Toaster position="top-center" reverseOrder={false} /> {/* Always render Toaster */}

      <div className="">
        <div className="min-h-screen flex flex-col items-center justify-center lg:px-0 px-2">
          <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white bg-opacity-90 rounded-md">
            <div className="w-full px-4">
              <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center mb-12">
                  <div className="w-auto h-auto flex justify-start items-start">
                    <img src="image/logo.png" className="w-40 h-20 object-contain" alt="login-image" />
                  </div>
                  <div className="">
                    <h3 className="text-gray-800 text-3xl font-bold">Admin Login</h3>
                    <p className="text-xl mt-1 text-gray-800 font-semibold">R/Balangoda Ananda Maithreya Central College, Balangoda</p>
                  </div>
                </div>

                <div className="lg:px-6">
                  <label className="text-gray-800 text-xl block mb-2">Email</label>
                  <div className="relative flex items-center">
                    <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} className="w-full text-gray-800 text-lg bg-gray-50 border-b border-gray-400 focus:border-[#3A0F09] px-2 py-3 outline-none" placeholder="Enter email" />
                    <MdOutlineEmail className="w-[18px] h-[18px] absolute right-2 cursor-pointer"/>
                  </div>
                </div>

                <div className="mt-8 lg:px-6">
                  <label className="text-gray-800 text-xl block mb-2">Password</label>
                  <div className="relative flex items-center">
                    <input 
                      name="password" 
                      type={isPasswordVisible ? "text" : "password"}  // Toggle input type based on visibility
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full text-gray-800 text-lg bg-gray-50 border-b border-gray-400 focus:border-[#3A0F09] px-2 py-3 outline-none" 
                      placeholder="Enter password" 
                    />
                    <div className="absolute right-2 cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                      {isPasswordVisible ? (
                        <FaEyeSlash className="w-[18px] h-[18px]" />
                      ) : (
                        <FaRegEye className="w-[18px] h-[18px]" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-12 lg:px-6">
                  <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-lg tracking-wide rounded-md text-white bg-[#691411] hover:bg-[#3A0F09] focus:outline-none">
                    Login
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

            <div className="md:h-full">
              <img src="image/footer_img.jpeg" className="w-screen h-full object-contain rounded-r-xl" alt="login-image" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
