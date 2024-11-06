"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Link } from "react-alice-carousel";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useInView } from "react-intersection-observer";

export default function Gallery() {
    const [galleryData, setGalleryData] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/gallery")
            .then((response) => {
                console.log(response.data); // Log the data being set
                setGalleryData(response.data); // Set the gallery data
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const { ref: section1Ref, inView: section1InView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });
    const { ref: section1Ref1, inView: section1InView1 } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });
    const { ref: section1Ref2, inView: section1InView2 } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });
    const { ref: section1Ref3, inView: section1InView3 } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const router = useRouter();

    const handleClick = (id) => {
        router.push(`/galleryview/${id}`); // Navigate to the image detail page
    };
    return (
        <>
            <div
                ref={section1Ref}
                className={`flex flex-col justify-between items-center w-screen h-auto bg-[#691411] lg:pt-20 pt-10   ${section1InView ? "" : ""
                    }`}
            >
                <div className="relative w-screen h-[45vh] md:h-[60vh] lg:h-[70vh] bg-transparent flex justify-center items-end ">
                    <div className="absolute top-0 mx-auto h-full w-screen max-w-screen-2xl px-4 md:px-8">
                        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
                            <div className="flex flex-col items-center">
                                <h2 className="text-3xl font-bold text-white lg:text-6xl dark:text-white">
                                    Gallery
                                </h2>
                                <hr className="lg:w-20 w-10 h-1 bg-white border-0 rounded lg:mt-3 mt-1" />
                            </div>

                            <Link
                                href="/gallery"
                                className="flex justify-center text-sm lg:text-xl items-center gap-2 font-semibold border border-white text-white hover:bg-white hover:text-black rounded-md px-2 py-1"
                            >
                                see all <MdKeyboardDoubleArrowRight />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 md:gap-6 xl:gap-8">
                            {galleryData &&
                                galleryData
                                    .slice()
                                    .reverse()
                                    .slice(0, 6)
                                    .map((data) => (
                                        <div
                                            ref={section1Ref1}
                                            className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80  ${section1InView1
                                                    ? "animate-fade-right animate-once animate-ease-linear animate-normal"
                                                    : ""
                                                }`}
                                            key={data._id}
                                            onClick={() => handleClick(data._id)}
                                        >
                                                              {data.main_image && (
                                            <img
                                            src={`data:${data.main_image.image_type};base64,${Buffer.from(data.main_image.image_data).toString("base64")}`}
                                            alt={data.main_image.image_name}
                                                loading="lazy"
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                            />
                                                              )}
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                                            <span className="relative ml-4 mb-3 inline-block font-semibold text-sm text-white md:ml-5 md:text-lg">
                                                {data.header}
                                            </span>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>
                <div className="w-screen lg:h-[60vh] h-[50vh] bg-white"></div>
            </div>
        </>
    );
}
