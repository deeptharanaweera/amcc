"use client";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-alice-carousel";

export default function page({params}) {

  const { id } = params; // Get the ID from the route params
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/news");
        // setApplicationData(response.data); // Set the gallery data

        // Filter the gallery item based on the id from params
        const galleryItem = response.data.find((g) => g._id === id); // Ensure _id matches string
        if (galleryItem) {
          setApplicationData(galleryItem);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplicationData();
  }, [id]);

  if (!applicationData)
    return (
      <Loading/>
    );

  

  
  return (
    <div className="min-h-screen w-screen  flex flex-col">
      <NavBar />
      <div className="fixed inset-0 flex items-center justify-center w-screen">
        <div className="lg:flex items-center justify-center lg:w-6/12 w-10/12 border border-black bg-gray-100 border-opacity-50 rounded-xl shadow-xl lg:h-auto h-5/6">
        <div className="lg:w-2/5 w-full lg:h-full h-2/5  p-5">
          <img src={`data:${applicationData.image_type};base64,${Buffer.from(applicationData.image_data).toString("base64")}`}
                                            alt={applicationData.image_name} className="w-full h-full lg:object-cover rounded-xl"/>
        </div>
        <div className="flex flex-col items-center lg:h-full h-3/5 lg:w-3/5 p-5 lg:gap-5 gap-3">
          <h1 className="lg:text-3xl text-xl font-semibold text-center">{applicationData.header}</h1>
          {applicationData.closingdate && (
            <h2 className="lg:text-xl text-lg font-semibold text-center">
            Closing date - <span className="text-red-600">{applicationData.closingdate}</span>
          </h2>
          )}
          {applicationData.startdate && (
            <h2 className="lg:text-xl text-lg font-semibold text-center">
            Date - <span className="text-blue-600">{applicationData.startdate}</span>
          </h2>
          )}
          <p className="lg:text-lg">
            {applicationData.description}
          </p>
          <div className="w-full flex lg:flex-row flex-col lg:gap-4 gap-2 justify-center items-center">
            {applicationData.download && (
              <Link href={applicationData.download} className="bg-green-400 text-center hover:bg-green-500 lg:text-2xl text-xl py-2 rounded-lg w-full">Download PDF</Link>
            )}
          {applicationData.onlineapply && (
            <Link href={applicationData.onlineapply} className="bg-blue-600 text-center hover:bg-blue-700 lg:text-2xl text-xl text-white py-2 rounded-lg w-full">Apply Online</Link>
          )}
          
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
