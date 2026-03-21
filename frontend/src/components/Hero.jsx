// src/components/Hero.jsx
"use client";

import React from "react";
import Image from "next/image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Hero() {
  const bannerImages = [
    "/images/scroll_section/Creative0.png",
    "/images/banner1.png",
    "/images/scroll_section/CycMall1.png",
    "/images/banner1.png",
  ];

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden overflow-x-hidden">

      {/* STATIC BACKGROUND LAYER (Swiper, Gradient, and Controls) */}
      <div className="absolute inset-0 w-full h-full z-0">

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
            renderBullet: function (index, className) {
              return `<span class="${className}"></span>`;
            },
          }}
          className="w-full h-full relative"
        >
          {bannerImages.map((src, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </SwiperSlide>
          ))}

          {/* Pagination Container */}
          <div className="hero-pagination absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full flex items-center justify-center gap-2 pointer-events-auto shadow-md w-max" />
        </Swiper>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent to-white/90 z-10 pointer-events-none" />

        {/* Left Arrow */}
        <button className="hero-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-300 pointer-events-auto">
          <FiChevronLeft className="text-2xl pr-0.5" />
        </button>

        {/* Right Arrow */}
        <button className="hero-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-300 pointer-events-auto">
          <FiChevronRight className="text-2xl pl-0.5" />
        </button>
      </div>

      {/* ANIMATED CONTENT LAYER (Only Text & CTA move up) */}
      <div className="hero-content-layer absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 md:pb-32 text-center px-4 md:px-12 pointer-events-none">

        <h3 className="text-[18px] md:text-[22px] lg:text-[26px] font-semibold text-black mb-3 tracking-tight">
          Every vision needs the perfect canvas
        </h3>

        <h1 className="text-[25px] md:text-[35px] lg:text-[40px] font-semibold text-black leading-[1.1] mb-6 tracking-tight uppercase max-w-5xl">
          YOUR VISION, OUR STUDIO
        </h1>

        <p className="text-[15px] md:text-[18px] lg:text-[20px] font-medium text-black mb-6 opacity-90 max-w-3xl">
          Jaipur's Premier Multi-Functional Photography & Videography Studio
        </p>

        <a
          href="https://wa.me/YOUR_PHONE_NUMBER"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto bg-[#1D4F41] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full text-[15px] md:text-[16px] font-medium hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg">
          Book Your Session
        </a>

      </div>

      {/* Swiper Overrides */}
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;

        }

        .hero-pagination {
          display: flex !important;
          width: auto !important;
        }

        .hero-pagination .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: rgba(255, 255, 255, 0.5) !important; 
          margin: 0 !important; 
          opacity: 1 !important;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
          display: block;
        }

        .hero-pagination .swiper-pagination-bullet-active {
          background: #ffffff !important; 
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
}