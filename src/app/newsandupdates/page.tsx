"use client";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/news")
            .then((response) => {
                console.log(response.data); // Log the data being set
                setNewsData(response.data); // Set the gallery data
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust how many items you want to display per page

    // Calculate the total number of pages
    const totalPages = newsData ? Math.ceil(newsData.length / itemsPerPage) : 0;

    // Get the items to display on the current page
    const currentItems = newsData
        ? newsData.slice(
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
        router.push(`/applicationview/${id}`); // Navigate to the image detail page
    };

    if(!newsData)
        return(
            <Loading/>
        )
    return (
        <div className="min-h-screen w-screen flex flex-col">
            <NavBar />
            <div className="flex flex-col items-center mt-0 lg:mb-20 mb-10">
                <div className="flex flex-col justify-center items-center w-screen lg:pt-24 pt-20 pb-2 sticky top-0 bg-white z-10 ">
                    <h1 className="lg:text-5xl text-3xl font-semibold text-[#3A0F09]">
                        News & Updates
                    </h1>
                    <hr className="lg:w-28 w-10 lg:h-2 h-0.5 lg:mx-8 mx-7 bg-[#3A0F09] border-0 rounded lg:mb-2 lg:mt-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10 gap-4 lg:mt-10 mt-5">
                    {newsData &&
                        newsData.map((news) => (
                            <div
                                key={news._id}
                                onClick={() => handleClick(news._id)}
                                className="flex lg:flex-col border-2 border-black rounded-xl lg:w-80 w-80 lg:h-96 h-40 shadow-xl hover:scale-105"
                            >
                                <div className="lg:h-1/5 lg:w-full w-1/2 flex flex-col justify-center items-center">
                                    <h2 className="lg:text-xl font-semibold text-center">
                                        {news.header}
                                    </h2>
                                    {news.closingdate && ( // Conditionally render closing date if it's not empty
                                        <p className="font-semibold text-center">
                                            Closing date{" "}
                                            <span className="text-red-600 font-bold text-md text-center">
                                                ({news.closingdate})
                                            </span>
                                        </p>
                                    )}
                                    {news.startdate && ( // Conditionally render closing date if it's not empty
                                        <p className="font-semibold text-center">
                                            Date -{" "}
                                            <span className="text-blue-600 font-bold text-md text-center">
                                                {news.startdate}
                                            </span>
                                        </p>
                                    )}
                                </div>
                                <div className="lg:h-4/5 lg:w-full w-1/2">
                                    <img
                                        src={news.image}
                                        alt=""
                                        className="w-full h-full lg:rounded-b-xl rounded-r-xl"
                                    />
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
