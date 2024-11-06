"use client";
import GalleryPageEdit from "@/app/admin_components/GalleryPageEdit";
import HomePage from "@/app/admin_components/HomePage";
import NewsAndUpdatesPage from "@/app/admin_components/NewsAndUpdatesPage";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function DashboardNavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session } = useSession();
    const [activePage, setActivePage] = useState("homepage");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open/close state for mobile
    const dropdownRef = useRef(null);
    const sidebarRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown and sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    const handleSidebarButtonClick = (page) => {
        setActivePage(page);
        setIsSidebarOpen(false); // Close sidebar after clicking a button
    };

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-[#3A0F09] border-b border-[#3A0F09]">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="/" className="flex ms-2 md:me-24">
                                <img src="/image/logo.png" className="h-10 me-3 hidden lg:block" alt="Logo" />
                                <span className="self-center lg:text-xl font-semibold hidden lg:block text-white whitespace-nowrap">Ananda Maithreya Central College, Balangoda</span>
                                <span className="self-center lg:text-xl font-semibold block lg:hidden text-white whitespace-nowrap">Ananda Maithreya Central College,<br></br> Balangoda</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={toggleDropdown}
                                    className="flex text-sm bg-[#691411] rounded-full focus:ring-1 focus:ring-white"
                                    aria-expanded={isDropdownOpen}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-10 h-10 rounded-full" src="/image/images.jfif" alt="user photo" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 z-50 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow">
                                        <div className="px-4 py-3 w-48">
                                            <p className="text-md font-semibold text-gray-800">{session?.user?.firstName} {session?.user?.lastName}</p>
                                            <p className="text-sm font-medium text-gray-600">{session?.user?.email}</p>
                                        </div>
                                        <ul className="py-1">
                                            <li><a href="#" className="block px-4 py-2 text-sm text-[#3A0F09] hover:bg-gray-100">Dashboard</a></li>
                                            <li><a href="#" className="block px-4 py-2 text-sm text-[#3A0F09] hover:bg-gray-100">Settings</a></li>
                                            <li><a href="#" className="block px-4 py-2 text-sm text-[#3A0F09] hover:bg-gray-100">Earnings</a></li>
                                            <li><button onClick={() => signOut()} className="block px-4 py-2 w-full text-sm text-[#3A0F09] hover:bg-gray-100">Sign out</button></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform bg-[#3A0F09] ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0`} // Visible by default on desktop
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-[#3A0F09]">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button onClick={() => handleSidebarButtonClick("homepage")} className="flex w-full items-center p-2 text-white rounded-lg hover:bg-[#691411]">
                                <img src="/image/8273004.png" alt="Home Icon" className="w-8" />
                                <span className="ms-3">Home Page</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleSidebarButtonClick("gallerypage")} className="flex w-full items-center p-2 text-white rounded-lg hover:bg-[#691411]">
                                <img src="/image/gallery-7353267_960_720.webp" alt="Gallery Icon" className="w-8" />
                                <span className="ms-3">Gallery</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleSidebarButtonClick("newsandupdates")} className="flex w-full items-center p-2 text-white rounded-lg hover:bg-[#691411]">
                                <img src="/image/news-icon-24.png" alt="News Icon" className="w-8" />
                                <span className="ms-3">News And Updates</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    {activePage === "homepage" && <HomePage />}
                    {activePage === "gallerypage" && <GalleryPageEdit />}
                    {activePage === "newsandupdates" && <NewsAndUpdatesPage />}
                </div>
            </div>
        </div>
    );
}
