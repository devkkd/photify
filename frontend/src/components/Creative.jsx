"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function StudioRentals() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const includedItems = [
    "2000+ sq ft shooting space",
    "Professional lighting systems (strobe, continuous, RGB)",
    "Multiple backdrop options (solid, textured, seamless)",
    "High-end camera equipment available",
    "Makeup and changing stations",
    "WiFi and client viewing area",
    "Free parking",
    "On-call technical support"
  ];

  const images = [
    "/images/scroll_section/Creative1.png",
    "/images/scroll_section/Creative2.png",
    "/images/scroll_section/Creative3.png"
  ];

  useGSAP(() => {
    const track = trackRef.current;

    // Refresh ScrollTrigger after a short delay to ensure images have loaded 
    // and the scrollWidth is calculated at its true 100% size.
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Combine the animation and ScrollTrigger into one robust call
    gsap.to(track, {
      // Pass x as a function so it dynamically recalculates on resize/refresh
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        // Setting the vertical scroll duration equal to the full track width 
        // ensures it will NEVER unpin before the horizontal scroll finishes.
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        scrub: 1, // Smooth 1-second catch-up scrub
        invalidateOnRefresh: true, // Forces recalculation of the x function on resize
      }
    });

    return () => clearTimeout(timeout);
  }, { scope: sectionRef });

  return (
    <section
      id="studio-rentals"
      ref={sectionRef}
      className="relative h-screen w-full bg-white text-black overflow-hidden flex items-center pt-[140px] lg:pt-[180px] pb-10"
    >

      {/* ========================================= */}
      {/* The Horizontal Scrolling Track            */}
      {/* ========================================= */}
      <div
        ref={trackRef}
        // Added flex-nowrap to strictly enforce horizontal layout
        className="flex flex-nowrap items-center h-full w-max gap-16 md:gap-18 px-6 md:px-12 lg:px-20 will-change-transform"
      >

        {/* Initial Spacer to start content from 25% left */}
        <div className="w-[20vw] shrink-0 h-full" />

        {/* 1. Main Heading & Paragraph Block */}
        <div className="w-[85vw] md:w-[450px] lg:w-[500px] shrink-0 flex flex-col justify-center whitespace-normal">
          <h3 className="text-[16px] md:text-[20px] font-semibold tracking-tight uppercase mb-4">
            Your Creative Playground Awaits
          </h3>
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-[1.1] mb-6 uppercase tracking-tight">
            Why Rent From<br />Photify Studios?
          </h2>
          <p className="text-[14px] md:text-[15px] font-medium leading-[1.8] opacity-80 max-w-lg">
            Premium equipment without the premium price.<br /><br />
            Access professional lighting kits, backdrops, props, and camera gear that would cost thousands to own.<br /><br />
            Shoot in a climate-controlled environment designed for optimal creativity.
          </p>
        </div>

        {/* 2. Creative0 Image (16:9) + What's Included List */}
        <div className="w-[85vw] md:w-[450px] lg:w-[500px] shrink-0 flex flex-col justify-center whitespace-normal h-full max-h-[800px]">

          {/* List Content */}
          <div className="flex flex-col flex-grow justify-center h-[100px] no-scrollbar pb-2">
            {/* Image 16:9 */}
            {/* Remove aspect-video from the wrapper */}
            <div className="relative p-2 w-full mb-2 shrink-0">
              {/* Top Left Bracket */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
              {/* Bottom Right Bracket */}
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />

              <img
                src="/images/scroll_section/Creative0.png"
                alt="Creative Space"
                className="w-full h-[220px] object-cover shadow-sm"
              />
            </div>
            <h2 className="text-[20px] md:text-[24px] font-bold uppercase mb-4 tracking-tight shrink-0">
              What's Included
            </h2>
            <ul className="flex flex-col gap-1 pr-2">
              {includedItems.map((item, idx) => (
                <li key={idx} className="flex items-center text-[12px] md:text-[13px] font-medium opacity-80">
                  <span className="mr-3 shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Remaining Vertical Image Showcase Cards */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative p-2.5 h-[45vh] md:h-[50vh] lg:h-[55vh] aspect-[3/4] shrink-0"
          >
            {/* Top Left Bracket */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
            {/* Bottom Right Bracket */}
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />

            <img
              src={img}
              alt={`Creative Setup ${idx + 1}`}
              className="w-full h-full object-cover shadow-md"
            />
          </div>
        ))}

        {/* End spacer for smooth exiting so the last image clears the screen safely */}
        <div className="w-[10vw] shrink-0" />
      </div>

    </section>
  );
}