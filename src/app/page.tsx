"use client"; // Ensures the component is rendered on the client side

import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Home_News_And_Update from "@/components/Home_News_And_Update";
import Home_UpcomingEvent from "@/components/Home_UpcomingEvent";
import NavBar from "@/components/NavBar";
import Section from "@/components/Section";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import AliceCarousel, { Link } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css"; // Make sure the carousel styles are imported
import { useInView } from "react-intersection-observer";
const ighland_rank = require("../assets/ighland_rank.png");
const province_ranking = require("../assets/province_ranking.png");
const teacher_to_student_ratio = require("../assets/teacher_to_student_ratio.png");
const pass_rate = require("../assets/pass_rate.png");


export default function Home() {

  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/home")
      .then((response) => {
        
        const filteredData = response.data.filter(
          (item) => item.category === "home"
        );
        setHomeData(filteredData); // Set only the filtered data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { ref: visionMissionRef, inView: visionMissionInView } = useInView({
    triggerOnce: false, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the element is in the viewport
  });

  const { ref: strengthRef, inView: strengthInView } = useInView({
    triggerOnce: false, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the element is in the viewport
  });

  const { ref: aboutusRef, inView: aboutusView } = useInView({
    triggerOnce: false, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the element is in the viewport
  });

  return  (
    <div>
      {homeData && (
      <div className="min-h-screen flex flex-col ">
      <NavBar />
      <AliceCarousel
        autoPlay
        autoPlayStrategy="none"
        autoPlayInterval={1500}
        animationDuration={1000}
        animationType="fadeout"
        infinite
        touchTracking={false}
        disableButtonsControls
        disableDotsControls
        items={[
          <div className="item" data-value="1">
            <img
              src={homeData[0].curselimage1}
              alt="Item 1"
              className="w-screen lg:h-screen h-[50vh] object-cover"
            />
          </div>,
          <div className="item" data-value="2">
            <img
              src={homeData[0].curselimage2}
              alt="Item 2"
              className="w-screen lg:h-screen h-[50vh] object-cover"
            />
          </div>,
          <div className="item" data-value="3">
            <img
              src={homeData[0].curselimage3}
              alt="Item 3"
              className="w-screen lg:h-screen h-[50vh] object-cover"
            />
          </div>,
        ]}
      />
      {/* <div className="lg:mt-0 mt-10">
        <video ref={videoRef} className="w-screen h-auto" autoPlay muted loop>
          <source src="/video/welcome.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}

      <div className="flex flex-col items-center justify-center bg-white">
        {/* Vision and Mission */}
        <div className="lg:flex lg:w-4/5 h-full justify-center items-center gap-10 ">
          <div
            ref={visionMissionRef}
            className={`lg:w-1/2 transition-all duration-500 ${
              visionMissionInView
                ? "lg:animate-fade-right animate-fade-down"
                : ""
            }`}
          >
            <p className="text-black lg:text-3xl text-md font-semibold lg:p-0 p-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi cum
              incidunt, nobis soluta quod vero, neque pariatur laudantium
              possimus sit magni aspernatur, tempora iure! Sint nihil
              repellendus adipisci sunt explicabo.
            </p>
          </div>
          <div
            ref={visionMissionRef}
            className={`bg-[#691411] text-white lg:w-1/2 h-full lg:p-10 p-5 duration-500 ${
              visionMissionInView ? "lg:animate-fade-left animate-fade-up" : ""
            }`}
          >
            <div>
              <h1 className="lg:text-3xl text-xl font-semibold">Our Vision</h1>
              <hr className="lg:w-20 w-10 lg:h-1 h-0.5 lg:mx-8 mx-7 bg-white border-0 rounded  lg:mb-2 lg:mt-2" />
              <p className="lg:text-xl lg:mb-10 mb-5 ml-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </p>
            </div>
            <div>
              <h1 className="lg:text-3xl text-xl font-semibold">Our Mission</h1>
              <hr className="lg:w-20 w-10 lg:h-1 h-0.5 lg:mx-8 mx-8 bg-white border-0 rounded  lg:mb-2 lg:mt-2" />
              <p className="lg:text-xl ml-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quos.
              </p>
            </div>
          </div>
        </div>

        {/* Strenth */}
        <div
          ref={strengthRef}
          className={`lg:flex flex-col items-center justify-center bg-[#3A0F09] text-white w-screen h-full lg:p-10 p-5 duration-500 ${
            strengthInView
              ? "animate-fade-up animate-once animate-duration-500 animate-ease-linear animate-normal transform"
              : "translate-y-[50px] opacity-0"
          }`}
        >
          <div className="flex flex-col justify-center items-center lg:mb-5 mb-4">
            <h1 className="lg:text-4xl text-2xl font-bold">
              STRENGTHS AT A AMCC
            </h1>
            <hr className="lg:w-52 w-32 h-1 bg-white border-0 rounded lg:mt-3 mt-1" />
          </div>
          <div className="flex lg:flex-row flex-col justify-between items-center lg:w-4/5 h-full lg:gap-0 gap-5 ">
            <div
              ref={strengthRef}
              className={`flex flex-col justify-center items-center lg:gap-2 ${
                strengthInView
                  ? "animate-fade-right animate-once animate-duration-[800ms] animate-ease-linear animate-normal"
                  : ""
              }`}
            >
              <Image src={ighland_rank} alt="" className="w-40 " />
              <h1 className="text-6xl font-bold text-[#E1FF00]">{homeData[0].inlandranking}</h1>
              <h2 className="text-2xl font-semibold">Inland Ranking</h2>
            </div>
            <div
              ref={strengthRef}
              className={`flex flex-col justify-center items-center lg:gap-2 ${
                strengthInView
                  ? "animate-fade-right animate-once animate-duration-[800ms] animate-ease-linear animate-normal"
                  : ""
              }`}
            >
              <Image src={province_ranking} alt="" className="w-24 " />
              <h1 className="text-6xl font-bold text-[#E1FF00]">{homeData[0].provinceranking}</h1>
              <h2 className="text-2xl font-semibold">Province Ranking</h2>
            </div>
            <div
              ref={strengthRef}
              className={`flex flex-col justify-center items-center lg:gap-2 ${
                strengthInView
                  ? "animate-fade-left animate-once animate-duration-[800ms] animate-ease-linear animate-normal"
                  : ""
              }`}
            >
              <Image src={teacher_to_student_ratio} alt="" className="w-24 " />
              <h1 className="text-6xl font-bold text-[#E1FF00]">{homeData[0].teachertostudent}</h1>
              <h2 className="text-2xl font-semibold">
                Teacher To Student Ratio
              </h2>
            </div>
            <div
              ref={strengthRef}
              className={`flex flex-col justify-center items-center lg:gap-2 ${
                strengthInView
                  ? "animate-fade-left animate-once animate-duration-[800ms] animate-ease-linear animate-normal"
                  : ""
              }`}
            >
              <Image src={pass_rate} alt="" className="w-24 " />
              <h1 className="text-6xl font-bold text-[#E1FF00]">{homeData[0].passrate}</h1>
              <h2 className="text-2xl font-semibold">Pass Rate</h2>
            </div>
          </div>
        </div>
        {/* Topic */}
        {/* <div className="flex w-screen h-full justify-center items-center p-4 gap-10">
          <h1 className="text-5xl font-bold text-[#3A0F09]">න නරස්‍ය නරෝ දාස:</h1>
          <h1 className="text-5xl font-bold text-[#3A0F09]">න නරස්‍ය නරෝ දාස:</h1>
          <h1 className="text-5xl font-bold text-[#3A0F09]">න නරස්‍ය නරෝ දාස:</h1>
        </div> */}
        <div className="flex overflow-hidden w-screen lg:p-4 p-2">
          <div className="flex flex-shrink min-w-[100%] w-[33.33%] lg:gap-40 animate-loop-scroll text-light_black text-[#989696]">
            <p className="lg:text-4xl font-bold whitespace-nowrap">
              න නරස්‍ය නරෝ දාස:
            </p>
            <p className="lg:text-4xl font-bold whitespace-nowrap ml-40">
              න නරස්‍ය නරෝ දාස:
            </p>
            <p className="lg:text-4xl font-bold whitespace-nowrap ml-40">
              න නරස්‍ය නරෝ දාස:
            </p>

            <p className="lg:text-4xl font-bold whitespace-nowrap ml-40">
              න නරස්‍ය නරෝ දාස:
            </p>
            <p className="lg:text-4xl font-bold whitespace-nowrap ml-40">
              න නරස්‍ය නරෝ දාස:
            </p>
            <p className="lg:text-4xl font-bold whitespace-nowrap ml-40">
              න නරස්‍ය නරෝ දාස:
            </p>
          </div>
        </div>
        {/* About us & news and update */}
        <div className="relative flex flex-col justify-between items-center h-full bg-white">
          <div
            className="relative w-screen h-[60vh] md:h-[60vh] lg:h-[60vh] bg-transparent flex justify-center items-end "
            style={{
              backgroundImage: "url('image/about_us.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", // Keeps background image fixed during scroll
            }}
          >
            <div
              ref={aboutusRef}
              className={`absolute h-auto  flex flex-col gap-2 md:gap-3 text-white z-20 bg-[#691411] mt-10 w-full md:w-3/4 p-4 md:p-5 lg:p-10 rounded-xl md:rounded-2xl ${
                aboutusView ? "lg:animate-fade-top animate-fade-down" : ""
              }`}
            >
              <p className="text-sm md:text-md lg:text-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
                quasi eos iusto veritatis fugiat maiores sunt labore nam nisi,
                beatae natus doloribus rerum. Vero quia voluptatibus placeat
                quasi eos iusto veritatis fugiat maiores sunt labore nam nisi,
                beatae natus doloribus rerum. Vero quia voluptatibus placeat
              </p>
              <div className="flex justify-end items-center mt-4">
                <Link href="/aboutus" className="border-2 text-xs md:text-sm lg:text-md py-1 px-3 md:px-5 rounded-md">
                  See more
                </Link>
              </div>
            </div>
            <div className="w-screen h-24 bg-white"></div>
          </div>
        </div>
        <Home_News_And_Update />
        <div className="flex items-center justify-center w-screen bg-[#3A0F09] py-5">
        <Home_UpcomingEvent />
        </div>
        <Section/>

        <Gallery/>

        
      </div>
      <Footer />
    </div>
    )}
    </div>
  );
}
