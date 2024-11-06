import Loading from "@/components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";

export default function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10; // Adjust how many items you want to display per page

  // Pagination handlers
  const totalPages = galleryData ? Math.ceil(galleryData.length / itemsPerPage) : 0;
  const currentItems = galleryData
    ? galleryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [file, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to load gallery data
  const loadGalleryData = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/gallery")
      .then((response) => {
        setGalleryData(response.data);
        setLoading(false); // Turn off loading after data is set
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Turn off loading even if there's an error
      });
  };

  useEffect(() => {
    loadGalleryData(); // Load data on component mount
  }, []);

  // const [uploadImage, setUploadImage] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file); // Assuming setImage is the state handler for the file
  //   if (file) {
  //     setUploadImage(URL.createObjectURL(file));
  //   }
  // };

  // const handleFormSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!file) {
  //         toast.error("Please select an main image");
  //         return;
  //     }

  //     const data = new FormData();
  //     data.append("file", file);
  //     data.append("header", header);
  //     data.append("description", description);
  //     console.log(data);

  //     try {
  //         await toast.promise(
  //             fetch("http://localhost:3000/api/gallery", {
  //                 method: "POST",
  //                 body: data,
  //             }).then(async (result) => {
  //                 const response = await result.json();
  //                 if (response.success) {
  //                     clearFormData();
  //                     setShowModal(false);
  //                     loadGalleryData();
  //                     return "Gallery Added Successfully";
  //                 } else {
  //                     throw new Error("Failed to add Gallery");
  //                 }
  //             }),
  //             {
  //                 loading: 'Saving...',
  //                 success: <b>Application or News Added Successfully</b>,
  //                 error: <b>Application or News Adding Failed</b>,
  //             }
  //         );
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };


  const [mainImageFile, setMainImageFile] = useState(null);
  const [otherImageFiles, setOtherImageFiles] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [otherImagePreviews, setOtherImagePreviews] = useState([]);

  const clearFormData = () => {
    setMainImageFile(null);
    setMainImagePreview(null);
    setOtherImageFiles([]);
    setOtherImagePreviews([]);
    setHeader('');
    setDescription('');
  };

  // Handle main image selection and preview
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setMainImageFile(file);
    setMainImagePreview(file ? URL.createObjectURL(file) : null);
  };

  // Handle additional images selection and previews
  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setOtherImageFiles(files);
    setOtherImagePreviews(files.map(file => URL.createObjectURL(file)));
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate that a main image is selected
    if (!mainImageFile) {
      toast.error("Please select a main image");
      return;
    }

    // Prepare FormData
    const data = new FormData();
    data.append("mainImage", mainImageFile); // Append the main image
    data.append("header", header);
    data.append("description", description);

    // Append other images if they exist
    if (otherImageFiles) {
      otherImageFiles.forEach(file => {
        data.append("otherImages", file); // Append each additional image
      });
    }

    console.log(data);

    try {
      await toast.promise(
        fetch("http://localhost:3000/api/gallery", {
          method: "POST",
          body: data,
        }).then(async (result) => {
          const response = await result.json();
          if (response.success) {
            clearFormData(); // Clear the form fields
            setShowModal(false); // Close the modal
            loadGalleryData(); // Refresh the gallery data
            return "Gallery Added Successfully";
          } else {
            throw new Error("Failed to add Gallery");
          }
        }),
        {
          loading: 'Saving...',
          success: <b>Gallery Added Successfully</b>,
          error: <b>Gallery Adding Failed</b>,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };


  const removeGalley = (id) => {
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
              await fetch(`http://localhost:3000/api/gallery?id=${id}`, {
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
        <MdAddCircleOutline className="lg:text-5xl text-6xl" />
        <span className="hidden lg:block lg:text-2xl text-2xl">Add New Gallery</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 w-full h-screen p-5">
          <div className="bg-gray-50 p-10 rounded-lg shadow-lg w-1/2 h-full">
            <div className="flex justify-between w-full h-1/12 bg-white">
              <h2 className="text-3xl font-bold mb-4">Add New Gallery</h2>
              <button
                className="text-black text-4xl px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                <IoCloseSharp />
              </button>
            </div>
            <form
              className="flex flex-col w-full h-full justify-between gap-5 overflow-y-auto max-h-[calc(100%-2rem)] "
              onSubmit={handleFormSubmit}
            >
              <div className="flex gap-3 items-center">
                <label htmlFor="header" className="text-xl font-semibold">
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

              <div>
                <label className="text-xl font-semibold">Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border pl-3 rounded-lg border-[#691411] h-20 mt-3"
                ></textarea>
              </div>

              <div className="w-full">
                <label htmlFor="mainImage" className="text-xl font-semibold">
                  Main Image
                </label>
                <div className="relative border-dotted h-48 w-1/2 mt-3 rounded-lg border-2 border-[#691411] bg-gray-100 flex justify-center items-center">
                  {mainImagePreview ? (
                    <img
                      src={mainImagePreview}
                      alt="Main Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="absolute">
                      <div className="flex flex-col items-center">
                        <img src="/image/10024501.png" alt="" className="w-10" />
                        <span className="block text-gray-400 font-normal">
                          Attach your main image here
                        </span>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="h-full w-full opacity-0 cursor-pointer"
                    name="file"
                    onChange={handleMainImageChange}
                  />
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="otherImages" className="text-xl font-semibold">
                  Other Images
                </label>
                <div className="border-dotted h-auto gap-2 w-full mt-3 rounded-lg border-2 border-[#691411] bg-gray-100 grid grid-cols-5 justify-center items-center relative cursor-pointer">
                  {otherImagePreviews.length > 0 ? (
                    otherImagePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Additional Preview ${index + 1}`}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ))
                  ) : (
                    <div className="flex flex-col w-full justify-center items-center ml-20">
                      <img src="/image/10024501.png" alt="Placeholder" className="w-10" />
                      <span className="block text-gray-400 font-normal">
                        Attach Other images here
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                    name="file"
                    onChange={handleOtherImagesChange}
                  />
                </div>
              </div>
              <div className="w-full">
                <button type="submit" className="bg-[#691411] w-full text-white py-3 rounded-xl">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

      )}

      {/* Gallery Display */}
      <section className="flex flex-col justify-center items-center">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope lg:text-6xl text-4xl font-bold text-gray-900 text-center mb-5">
            Gallery
          </h2>
          <div className="lg:grid grid-cols-4 flex w-full justify-center gap-y-5 lg:gap-y-10 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            {loading ? (
              <div className=""><Loading/></div>
            ) : (
              
                galleryData.map((item, index) => (
                  <div key={item} className=" w-full max-lg:max-w-xl lg:w-full border border-gray-300 rounded-2xl h-96">
                    <div className="flex items-center h-1/2">
                      {item.main_image && (
                        <img
                          src={`data:${item.main_image.image_type};base64,${Buffer.from(item.main_image.image_data).toString("base64")}`}
                          alt={item.main_image.image_name}
                          className="rounded-t-2xl w-full h-48 object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl h-1/2 justify-between bg-gray-100">
                      <h4 className="text-xl text-gray-900 font-semibold leading-8 h-4/5">
                        {item.header}
                      </h4>
                      <div className="flex gap-2 h-1/5">
                        <button
                          className="cursor-pointer text-lg text-white bg-green-500 hover:bg-green-600 w-1/2 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          id={item._id} onClick={() => removeGalley(item._id)}
                          className="cursor-pointer text-lg text-white bg-red-500 hover:bg-red-600 w-1/2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
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
