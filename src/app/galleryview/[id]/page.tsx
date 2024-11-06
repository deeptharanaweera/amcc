"use client";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function Page({ params }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { id } = params; // Get the ID from the route params
  const [item, setItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/gallery");
        setGalleryData(response.data); // Set the gallery data

        // Filter the gallery item based on the id from params
        const galleryItem = response.data.find((g) => g._id === id); // Ensure _id matches string
        if (galleryItem) {
          setItem(galleryItem);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGalleryData();
  }, [id]);

  if (!item)
    return (
      <Loading/>
    );

  // Pagination logic
  const totalPages = galleryData ? Math.ceil(galleryData.length / itemsPerPage) : 0;
  const currentItems = galleryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  const handleClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <div className="min-h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center lg:mb-20 mb-10">
        <div className="flex flex-col justify-center items-start lg:w-9/12 w-11/12 lg:pt-28 pt-20 pb-2 bg-white">
          <h1 className="lg:text-4xl text-xl font-semibold text-black mb-3 bg-yellow-300">
            {item.header}
          </h1>
          <p className="lg:text-xl text-sm">{item.description}</p>
        </div>
        <div className="columns-1 md:columns-2 xl:columns-4 gap-7 lg:w-9/12 w-11/12 lg:mt-8 mt-4">
        {item.other_images && item.other_images.map((image, index) => (
  <div
    key={index}
    className="relative break-inside-avoid mb-8"
    onClick={() => handleClick(`data:${image.image_type};base64,${Buffer.from(image.image_data).toString("base64")}`)}
  >
    <img
      src={`data:${image.image_type};base64,${Buffer.from(image.image_data).toString("base64")}`}
      alt={image.image_name}
      className="h-auto max-w-full rounded-lg"
    />
  </div>
))}


</div>


        {/* Pagination Controls */}
        <div className="flex justify-end items-center mt-4 space-x-4 w-9/12">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-[#691411] text-white hover:bg-[#3A0F09] rounded ${
              currentPage === 1
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
            className={`px-4 py-2 bg-[#691411] text-white hover:bg-[#3A0F09] rounded ${
              currentPage === totalPages
                ? "text-gray-400 hover:bg-[#691411]"
                : "text-[#3A0F09]"
            }`}
          >
            Next
          </button>
        </div>

        {/* Event Modal */}
        {isOpen && selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected view"
                className="max-w-full max-h-screen"
              />
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 mt-2 mr-2 text-white p-2 rounded-full"
              >
                <IoCloseSharp className="text-5xl" />
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
