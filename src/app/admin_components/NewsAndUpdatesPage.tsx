"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";

const NewsAndUpdatesPage = () => {
    const router = useRouter();
    const [newsData, setNewsData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [category, setSelectedCategory] = useState("");
    const [header, setHeader] = useState("");
    const [description, setDescription] = useState("");
    const [closingdate, setClosingDate] = useState("");
    const [startdate, setStartDate] = useState("");
    const [file, setImage] = useState('');
    const [download, setDownloadLink] = useState("");
    const [onlineapply, setApplyLink] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjust how many items you want to display per page

    // Pagination handlers
    const totalPages = newsData ? Math.ceil(newsData.length / itemsPerPage) : 0;
    const currentItems = newsData
        ? newsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const [loading, setLoading] = useState(true);
    // Function to load gallery data
    const loadGalleryData = () => {
        setLoading(true);
        axios
            .get("http://localhost:3000/api/news")
            .then((response) => {
                setNewsData(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
            });
    };

    useEffect(() => {
        loadGalleryData(); // Load data on component mount
    }, []);

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const res = await fetch("http://localhost:3000/api/news/", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ category, header, description, closingdate, startdate, download, onlineapply }),
    //         });
    //         console.log(res);
    //         if (res.ok) {
    //             setShowModal(false);
    //             alert("News or Application added successfully");

    //         } else {
    //             console.log("An error occurred");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const [uploadImage, setUploadImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file); // Assuming setImage is the state handler for the file
        if (file) {
            setUploadImage(URL.createObjectURL(file));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please select an image");
            return;
        }

        const data = new FormData();
        data.append("file", file);
        data.append("category", category);
        data.append("header", header);
        data.append("description", description);
        data.append("closingdate", closingdate);
        data.append("startdate", startdate);
        data.append("download", download);
        data.append("onlineapply", onlineapply);

        try {
            await toast.promise(
                fetch("http://localhost:3000/api/news", {
                    method: "POST",
                    body: data,
                }).then(async (result) => {
                    const response = await result.json();
                    if (response.success) {
                        clearFormData();
                        setShowModal(false);
                        loadGalleryData();
                        return "Application or News Added Successfully";
                    } else {
                        throw new Error("Failed to add Application or News");
                    }
                }),
                {
                    loading: 'Saving...',
                    success: <b>Application or News Added Successfully</b>,
                    error: <b>Application or News Adding Failed</b>,
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const clearFormData = () => {
        setImage(null); // Reset the file input
        setSelectedCategory(''); // Reset the category
        setHeader(''); // Reset the header
        setDescription(''); // Reset the description
        setClosingDate(''); // Reset the closing date
        setStartDate(''); // Reset the start date
        setDownloadLink(''); // Reset the download checkbox
        setApplyLink(''); // Reset the online apply checkbox
        setUploadImage(null); // Reset the image preview
    };


    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     if(!file){
    //         alert("Please select an image");
    //         return;
    //     }
    //     const data = new FormData();
    //     data.append("file", file);
    //     data.append("category", category);
    //     data.append("header", header);
    //     data.append("description", description);
    //     data.append("closingdate", closingdate);
    //     data.append("startdate", startdate);
    //     data.append("download", download);
    //     data.append("onlineapply", onlineapply);
    //     try {
    //         let result = await fetch("http://localhost:3000/api/news",{
    //             method: "POST",
    //             body: data,
    //         });
    //         result = await result.json();
    //         if(result.success){
    //             alert("News or Application added successfully");
    //             setShowModal(false);
    //         }else{
    //             alert("An File Uploaded Failed");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    




    const removeNews = (id) => {
        toast.custom((t) => (
            <div
                style={{
                    background: 'white',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <span className="font-semibold text-lg">Are you want to delete this news?</span>
                <div>
                    <button
                        onClick={async () => {
                            await fetch(`http://localhost:3000/api/news?id=${id}`, {
                                method: "DELETE",
                            });
                            toast.success("News deleted successfully.");
                            loadGalleryData();
                            toast.dismiss(t.id); // Dismiss the toast after deletion
                        }}
                        style={{
                            marginLeft: '10px',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            padding: '8px 12px',
                        }}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => {
                            setTimeout(() => toast.dismiss(t.id), 100); // Dismiss after 2 seconds
                        }}
                        style={{
                            marginLeft: '5px',
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            padding: '8px 12px',
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity, // Keep the toast open indefinitely until dismissed
            position: 'top-center', // You can adjust the position as needed
        });
    };





    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <button
                className="fixed flex items-center justify-center lg:top-20 top-20 lg:right-10 right-5  hover:scale-125 text-[#3b3bff] hover:text-[#2547cf]"
                onClick={() => setShowModal(true)}
            >
                <MdAddCircleOutline className="lg:text-5xl text-5xl" />
                <span className="hidden lg:block lg:text-2xl text-2xl">Add New News</span>
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 w-full h-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <div className="flex justify-between">
                            <h2 className="text-3xl font-bold mb-4">
                                {" "}
                                Add News or Application
                            </h2>
                            <button
                                className="text-black text-4xl px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                <IoCloseSharp />
                            </button>
                        </div>
                        <form className="flex flex-col w-full h-full justify-center gap-5" onSubmit={handleFormSubmit}>
                            <div className="flex items-center gap-5">
                                <label htmlFor="" className="text-xl font-semibold">
                                    Select Category
                                </label>
                                <select
                                    name=""
                                    id="category"
                                    value={category}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-1/2 py-2 text-lg pl-3 rounded-lg bg-white border border-[#691411]"
                                >
                                    <option value="" hidden>
                                        Application / News
                                    </option>
                                    <option value="application">Application</option>
                                    <option value="news">News</option>
                                </select>
                            </div>
                            <div className="flex gap-3 items-center">
                                <label htmlFor="" className="text-xl font-semibold">
                                    Header
                                </label>
                                <input
                                    type="text"
                                    name="header"
                                    id="header"
                                    value={header}
                                    onChange={(e) => setHeader(e.target.value)}
                                    className="w-full border pl-3 rounded-lg border-[#691411] py-2"
                                />
                            </div>
                            <div className="">
                                <label className="text-xl font-semibold">Description</label>
                                <textarea
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border pl-3 rounded-lg border-[#691411] h-20 mt-3"
                                ></textarea>
                            </div>

                            <div className="w-full ">
                                <label htmlFor="" className="text-xl font-semibold ">Upload Image</label>
                                <div className="relative border-dotted h-48 w-1/2 mt-3 rounded-lg border-2 border-[#691411] bg-gray-100 flex justify-center items-center">
                                    {uploadImage ? (
                                        <img
                                            src={uploadImage}
                                            alt="Uploaded"
                                            className="h-full w-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="absolute">
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src="/image/10024501.png"
                                                    alt=""
                                                    className="w-10"
                                                />
                                                <span className="block text-gray-400 font-normal">
                                                    Attach your image here
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="h-full w-full opacity-0 cursor-pointer"
                                        name="file"
                                        onChange={handleImageChange}
                                    />
                                </div>

                            </div>
                            {category === "application" && (
                                <div className="flex gap-3 items-center w-1/2">
                                    <label htmlFor="" className="text-xl font-semibold">
                                        Closing Date
                                    </label>
                                    <input
                                        type="date"
                                        value={closingdate}
                                        onChange={(e) => setClosingDate(e.target.value)}
                                        className="w-2/3 border pl-3 rounded-lg border-[#691411] py-2"
                                    />
                                </div>
                            )}
                            {category === "news" && (
                                <div className="flex gap-3 items-center w-1/2">
                                    <label htmlFor="" className="text-xl font-semibold">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={startdate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-2/3 border pl-3 rounded-lg border-[#691411] py-2"
                                    />
                                </div>
                            )}
                            {category === "application" && (
                                <div className="flex justify-center items-center">
                                    <div className="flex gap-2 items-center w-1/2">
                                        <label htmlFor="" className="text-xl font-semibold">
                                            Download Link
                                        </label>
                                        <input
                                            type="text"
                                            value={download}
                                            onChange={(e) => setDownloadLink(e.target.value)}
                                            className="w-2/3 border pl-3 rounded-lg border-[#691411] py-2"
                                        />
                                    </div>

                                    <div className="flex gap-3 items-center w-1/2">
                                        <label htmlFor="" className="text-xl font-semibold">
                                            Apply Link
                                        </label>
                                        <input
                                            type="text"
                                            name="applyLink"
                                            value={onlineapply}
                                            onChange={(e) => setApplyLink(e.target.value)}
                                            className="w-2/3 border pl-3 rounded-lg border-[#691411] py-2"
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="bg-[#691411] text-white py-3 rounded-xl"
                            >
                                Add News or Application
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* News and Updates Display */}
            <section className="flex flex-col justify-center items-center">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="font-manrope lg:text-6xl text-4xl font-bold text-gray-900 text-center mb-5">
                        News And Updates
                    </h2>
                    <div className="lg:grid grid-cols-3 flex justify-center columns-3 gap-y-8 lg:gap-y-20 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                    {loading ? (
              <div className=""><Loading/></div>
            ) : (
                        newsData &&
                            currentItems.map((news) => (
                                <div className="w-full max-lg:max-w-xl lg:w-full border-2 border-black rounded-2xl h-auto justify-between bg-gray-100">
                                    <div className="flex items-center h-2/5 w-full">
                                        <img
                                            src={`data:${news.image_type};base64,${Buffer.from(news.image_data).toString("base64")}`}
                                            alt={news.image_name}
                                            className="rounded-t-2xl w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col p-4 lg:px-2 rounded-b-2xl h-2/5 w-full">
                                        <h4 className="text-xl text-gray-900 font-semibold text-center mb-2">
                                            {news.header}
                                        </h4>
                                        {news.closingdate && ( // Conditionally render closing date if it's not empty
                                            <p className="font-semibold text-center mb-4">
                                                Closing date{" "}
                                                <span className="text-red-600 font-bold text-md ">
                                                    ({news.closingdate})
                                                </span>
                                            </p>
                                        )}
                                        {news.startdate && ( // Conditionally render closing date if it's not empty
                                            <p className="font-semibold text-center mb-4">
                                                Date -{" "}
                                                <span className="text-blue-600 font-bold text-md">
                                                    {news.startdate}
                                                </span>
                                            </p>
                                        )}
                                        <p className="text-sm font-semibold opacity-75">{news.description}</p>

                                    </div>
                                    <div className="flex gap-2 h-1/5 w-full py-3 px-4 items-end">
                                        <button className="cursor-pointer text-lg text-white bg-green-500 hover:bg-green-600 w-1/2 h-1/2 rounded-lg">
                                            Edit
                                        </button>
                                        <button id={news._id} onClick={() => removeNews(news._id)}
                                            className="cursor-pointer text-lg text-white bg-red-500 hover:bg-red-600 w-1/2 h-1/2 rounded-lg">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center mt-4 space-x-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-[#691411] text-white hover:bg-[#3A0F09] rounded ${currentPage === 1 ? "text-gray-400 hover:bg-[#691411]" : "text-[#3A0F09]"
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
                    className={`px-4 py-2 bg-[#691411] text-white hover:bg-[#3A0F09] rounded ${currentPage === totalPages ? "text-gray-400 hover:bg-[#691411]" : "text-[#3A0F09]"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
export default NewsAndUpdatesPage;