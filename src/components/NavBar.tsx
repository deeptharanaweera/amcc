"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import logo from '../assets/logo.png'; // Adjust the path to your logo

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex justify-between bg-gray-50 sm:py-3 py-2 px-2 sm:px-10 fixed w-screen z-30 ">
            {/* Logo Section */}
            <Link href={"/"} className="flex items-center sm:gap-2">
                <Image src={logo} alt="Ananda Maithreya Central College Logo" className="sm:w-20 w-10" />
                <div className="font-bold text-md sm:text-3xl justify-start">
                    <h1>Ananda Maithreya Central College</h1>
                    <h1>Balangoda</h1>
                </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex justify-end items-end text-xl font-semibold gap-6">
                <Link href="/">Home</Link>
                <Link href="/application">Applications</Link>
                <Link href="/aboutus">About us</Link>
                <Link href="/contactus">Contact us</Link>
            </div>

            {/* Mobile Menu Icon */}
            <div className="sm:hidden flex items-center">
                {isMenuOpen ? (
                    <IoClose size={30} onClick={toggleMenu} className="cursor-pointer text-xl" />
                ) : (
                    <IoMenuSharp size={30} onClick={toggleMenu} className="cursor-pointer" />
                )}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="flex flex-col items-start gap-2 text-lg font-semibold bg-white p-4 absolute top-16 left-0 w-full sm:hidden z-20 shadow-lg">
                    <Link href="/" onClick={toggleMenu} className="block">Home</Link>
                    <Link href="/application" onClick={toggleMenu} className="block">Applications</Link>
                    <Link href="/aboutus" onClick={toggleMenu} className="block">About us</Link>
                    <Link href="/contactus" onClick={toggleMenu} className="block">Contact us</Link>
                </div>
            )}
        </div>
    );
}

export default NavBar;
