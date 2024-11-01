import axios from "axios";
import { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

export default function Gallery() {
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

  return (
    <div className="">
      {/* Fixed Add Button */}
      <button
        className="fixed lg:bottom-10 bottom-2 lg:right-10 right-0 lg:text-8xl text-6xl text-[#691411] hover:text-[#3A0F09]"
        onClick={() => {
          // Add functionality for the button here, e.g., opening a form
          console.log("Add new item clicked");
        }}
      >
        <MdAddCircleOutline />
      </button>

      <section className="flex flex-col justify-center items-center">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-6xl font-bold text-gray-900 text-center mb-5">
            Gallery
          </h2>
          <div className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            {currentItems.map((image) => (
              <div key={image.id} className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl h-96">
                <div className="flex items-center h-1/2">
                  <img
                    src={image.mainimage}
                    alt="Gallery Image"
                    className="rounded-t-2xl w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl h-1/2 justify-between bg-gray-100">
                  <h4 className="text-xl text-gray-900 font-semibold leading-8 h-4/5">
                    {image.header}
                  </h4>
                  <div className="flex gap-2 h-1/5">
                    <button
                      className="cursor-pointer text-lg text-white bg-green-500 hover:bg-green-600 w-1/2 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      className="cursor-pointer text-lg text-white bg-red-500 hover:bg-red-600 w-1/2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-4 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-[#691411] text-white hover:bg-[#3A0F09] rounded ${
            currentPage === 1 ? "text-gray-400 hover:bg-[#691411]" : "text-[#3A0F09]"
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
            currentPage === totalPages ? "text-gray-400 hover:bg-[#691411]" : "text-[#3A0F09]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
