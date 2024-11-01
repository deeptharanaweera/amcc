"use client";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GalleryPage() {
    const [galleryData, setGalleryData] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/gallery")
            .then((response) => {
                setGalleryData(response.data); // Set the gallery data  
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust how many items you want to display per page

    // Calculate the total number of pages
    const totalPages = galleryData
        ? Math.ceil(galleryData.length / itemsPerPage)
        : 0;

    // Get the items to display on the current page
    const currentItems = galleryData
        ? galleryData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        : [];

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const router = useRouter();

    const handleClick = (id) => {
        router.push(`/galleryview/${id}`); // Navigate to the image detail page
    };

    if(!galleryData)
    return (
        <Loading/>
    )
    return (
        <div className="min-h-screen w-screen flex flex-col">
            <NavBar />
            <div className="flex flex-col items-center mt-0 lg:mb-20 mb-10">
                <div className="flex flex-col justify-center items-center w-screen lg:pt-24 pt-20 pb-2 sticky top-0 bg-white z-10 ">
                    <h1 className="lg:text-7xl text-3xl font-semibold text-[#3A0F09]">
                        Gallery
                    </h1>
                    <hr className="lg:w-28 w-10 lg:h-2 h-0.5 lg:mx-8 mx-7 bg-[#3A0F09] border-0 rounded lg:mb-2 lg:mt-2" />
                </div>
                <div className="columns-1 md:columns-2 xl:columns-3 gap-7 lg:w-9/12 w-11/12 lg:mt-8 mt-4">
                    {galleryData &&
                        galleryData.map((image) => (
                            <div
                                key={image._id}
                                onClick={() => handleClick(image._id)}
                                className="relative break-inside-avoid mb-8"
                            >
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src={image.mainimage} // Assuming image.image contains the image URL
                                    alt="Gallery image"
                                />
                                <div className="absolute inset-0 flex flex-col items-start justify-end text-black px-2 pb-2">
                                    <h1 className="text-2xl font-semibold bg-[#f2ff42] px-2 w-4/5">
                                        {image.header}
                                    </h1>{" "}
                                    {/* Display the header */}
                                </div>
                            </div>
                        ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-end items-center mt-4 space-x-4 w-9/12">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-[#691411] text-white hover:bg-[#3A0F09] rounded ${currentPage === 1
                                ? "text-gray-400 hover:bg-[#691411]"
                                : "text-[#3A0F09]"
                            }`}
                    >
                        Previous
                    </button>
                    <span className="text-lg">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-[#691411] text-white hover:bg-[#3A0F09] rounded ${currentPage === totalPages
                                ? "text-gray-400 hover:bg-[#691411]"
                                : "text-[#3A0F09]"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
