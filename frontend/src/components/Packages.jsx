"use client";

import React, { useState, useEffect } from "react";
import { getPackages } from "@/lib/api";

export default function OurPackages() {

  const [activeIndex, setActiveIndex] = useState(0);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await getPackages();

      const sortedPackages = res.data.sort((a, b) => a.order - b.order);

      setPackages(sortedPackages);

    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };


  return (
    <section id="our-packages" className="w-full bg-white pt-20 text-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-12">

        {/* Heading */}
        <h2 className="text-[36px] md:text-[42px] lg:text-[48px] font-bold tracking-tight mb-12">
          Our Packages
        </h2>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-6 mb-16">
          {packages.map((pkg, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={pkg._id}
                className="relative p-2 h-full flex cursor-default transition-transform duration-300"
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Top Left Bracket */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-black/60 pointer-events-none" />

                {/* Bottom Right Bracket */}
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-black/60 pointer-events-none" />

                {/* Card Content Wrapper */}
                <div
                  className={`w-full h-full flex flex-col p-3 md:p-5 transition-colors duration-400 ease-in-out ${isActive
                    ? 'bg-[#1D4F41] text-white shadow-lg border-[#1D4F41]'
                    : 'bg-white text-black border border-black'
                    }`}
                >
                  <h3 className="text-[18px] md:text-[20px] font-medium mb-4">
                    {pkg.title}
                  </h3>

                  <div className="text-[32px] md:text-[36px] font-bold mb-2">
                    {pkg.price}
                  </div>

                  <div className={`text-[16px] font-medium mb-3 transition-colors duration-400 ${isActive ? 'border-white/20' : 'border-black/10'
                    }`}>
                    {pkg.duration}
                  </div>

                  {/* Content with specific font specs */}
                  <div className="flex-grow text-[13px] font-medium leading-[160%] tracking-[-0.03em]">
                    <ul className="flex flex-col gap-2 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 shrink-0">✓</span>
                          <span className={isActive ? 'opacity-90' : 'opacity-80'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <h4 className={`mb-2 ${isActive ? 'opacity-100' : 'opacity-90'}`}>
                        Perfect for:
                      </h4>
                      <ul className="flex flex-col">
                        {pkg.perfectFor.map((item, idx) => (
                          <li key={idx} className={`flex items-start ${isActive ? 'opacity-90' : 'opacity-80'}`}>
                            <span className="mr-2 shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Solutions Bottom Banner */}
        <div className="relative p-2 w-full">
          {/* Top Left Bracket */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-black/60 pointer-events-none" />
          {/* Bottom Right Bracket */}
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-black/60 pointer-events-none" />

          <div className="w-full bg-white border border-black p-8 md:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12 hover:shadow-md transition-shadow duration-300">

            {/* Left Col */}
            <div className="flex-1">
              <p className="text-[14px] md:text-[16px] font-medium text-black/80 mb-2">
                Custom Solutions Available
              </p>
              <h3 className="text-[24px] md:text-[28px] font-bold">
                Need Something Specific?
              </h3>
            </div>

            {/* Mid Col */}
            <div className="flex-1">
              <p className="text-[14px] md:text-[16px] font-medium text-black/80 leading-[1.8]">
                We create customized packages tailored to your unique requirements.<br className="hidden lg:block" />
                Contact us to discuss your project.
              </p>
            </div>

            {/* Right Col (Button) */}
            <div className="shrink-0">
              <button className="bg-[#1D4F41] text-white px-8 py-4 text-[15px] font-medium rounded-full hover:scale-105 active:scale-95 transition-transform duration-300">
                Book Your Session
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}