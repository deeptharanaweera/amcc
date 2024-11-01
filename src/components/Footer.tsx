"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Facebook_logo from "../assets/Facebook_logo.png";
import footer_img from "../assets/footer_img.jpeg";
import lindin_logo from "../assets/lindin_logo.png";
import logo from "../assets/logo.png";
import tiktok_logo from "../assets/tiktok_logo.webp";
import youtube_logo from "../assets/youtube_logo.png";

const Footer = () => {

  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);



  return (
    <div
    ref={footerRef}
    className={`relative items-center justify-center fade-in ${
      isVisible ? "show" : ""
    }`}
  >
    <div className="relative items-center justify-center">
      <div className="lg:hidden absolute justify-center lg:ml-52 mt-20 ml-20">
        <Image
          src={logo}
          alt="Footer Image"
          className="lg:h-[350px] h-[250px] w-full justify-center "
        />
      </div>
      <div className="lg:hidden  ">
        <Image
          src={footer_img}
          alt="Footer Image"
          className="lg:h-[459px] lg:w-[700px] w-full h-60"
        />
        
      </div>
      

      <div className="lg:flex items-center  top-0 w-full bg-[#3A0F09] lg:h-1/2 h-full lg:pt-0 pt-20">
        <div className="lg:flex hidden w-1/2 ">
          <Image
            src={footer_img}
            alt="Footer Image"
            className="h-[459px] w-[700px] clip-path"
          />
        </div>

        <div className="lg:flex hidden absolute z-10 justify-center lg:ml-52 ml-20 ">
          <Image
            src={logo}
            alt="Footer Image"
            className="lg:h-[350px] h-[250px] w-full justify-center"
          />
        </div>

        <div className="lg:flex flex-col justify-between  w-full h-full ">
          <div className="lg:flex  justify-between w-full h-full">
            
            <div className=" flex lg:justify-end w-full gap-40 lg:pr-10">
            <div className="hidden lg:flex flex-col text-white gap-1">
                <h2 className="font-bold text-lg mb-2">Navigation :</h2>
                <a>Home</a>
                <a>About us</a>
                <a>Applications</a>
                <a href="">Contact us</a>
                <a href="">News & Updates</a>
                <a href="">Upcoming event</a>
                <a href="">Sport</a>
                <a href="">Club & associate</a>
                <a href="">Events</a>
                <a href="">Gallery</a>
              </div>
              <div className="flex flex-col text-white gap-1">
                <h2 className="font-bold text-lg mb-2">Contact :</h2>
                <p>045-2286123</p>
                <p>045-2275156</p>
                <p>amcc@gmail.com</p>
              </div>
              <div className="flex flex-col text-white gap-1">
                <h2 className="font-bold text-lg mb-2">Address : </h2>
                <p>Ananda maithreya </p>
                <p>centeral college,</p>
                <p>Miriswaththa,</p>
                <p>Balangoda</p>
              </div>
              
            </div>
            <div className="lg:hidden flex flex-col justify-end text-white gap-1 mb-6">
              <h2 className="font-bold text-lg mb-2">Navigation :</h2>
              <a>Home</a>
              <a>About us</a>
              <a>Applications</a>
              <a href="">Contact us</a>
              <a href="">News & Updates</a>
              <a href="">Upcoming event</a>
              <a href="">Sport</a>
              <a href="">Club & associate</a>
              <a href="">Events</a>
              <a href="">Gallery</a>
            </div>
          </div>
          <div className="flex flex-col lg:items-start items-center justify-center">
            <div className="flex items-center gap-5 lg:ml-60">
              <Image
                src={Facebook_logo}
                alt="Footer Image"
                className="lg:w-8 w-5 h-5 lg:h-8 "
              />
              <Image
                src={lindin_logo}
                alt="Footer Image"
                className="lg:w-8 lg:h-8 w-5 h-5"
              />
              <Image
                src={youtube_logo}
                alt="Footer Image"
                className="lg:w-10 w-6"
              />
              <Image
                src={tiktok_logo}
                alt="Footer Image"
                className="lg:w-10 w-6"
              />
            </div>
            <p className="text-white sm:text-md text-sm lg:ml-40">
              Copyright © 2024 deeptha ranaweera. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Footer;
