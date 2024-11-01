"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Link } from "react-alice-carousel";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Home_News_And_Update() {
  
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

  const router = useRouter();

  const handleClick = (id) => {
      router.push(`/applicationview/${id}`); // Navigate to the image detail page
  };
  return (
    <div className="flex flex-col lg:w-2/3 w-screen lg:p-0 p-5 gap-8 lg:py-10">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-4xl text-2xl font-bold">News & Updates</h1>
        <Link
          href="/newsandupdates"
          className="flex justify-center text-sm lg:text-xl items-center gap-2 font-semibold border border-black rounded-md px-2 py-1"
        >
          View all news <MdKeyboardDoubleArrowRight />
        </Link>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-between gap-5">
        {newsData &&
          newsData.slice().reverse().slice(0,3).map((news) => (
            <div key={news._id}
            onClick={() => handleClick(news._id)}
            className="flex lg:flex-col border-2 border-black rounded-xl lg:w-80 w-80 lg:h-96 h-40 shadow-xl hover:scale-105">
              <div className="lg:h-1/5 lg:w-full w-1/2 flex flex-col justify-center items-center ">
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
    </div>
  );
}
