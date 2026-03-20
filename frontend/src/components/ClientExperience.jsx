import React from 'react';
import { FaInstagram, FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';

export default function ClientExperience() {
  const clients = [
    {
      name: "Ravindra Singh Bhati",
      handle: "ravindrabhati_9",
      followers: "3M",
      img: "/images/client/Ravindra Singh Bhati.png"
    },
    {
      name: "Thiya Keshwani",
      handle: "babythiyu",
      followers: "922K",
      img: "/images/client/Thiya Keshwani.png"
    },
    {
      name: "DJ Sam",
      handle: "djsamjaipur",
      followers: "18.2K",
      img: "/images/client/DJ Sam.png"
    },
    {
      name: "Gulabo Sapera",
      handle: "gulabosapera",
      followers: "8K",
      img: "/images/client/Gulabo Sapera.png"
    }
  ];

  return (
    <section className="w-full bg-[#FBFBFB] py-20 px-6 md:px-12 lg:px-20 text-black">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Headers */}
        <div className="mb-14">
          <h2 className="text-[36px] md:text-[42px] lg:text-[48px] font-bold tracking-tight mb-4">
            Our Clients & Their Experience
          </h2>
          <p className="text-[15px] md:text-[16px] text-black/80 font-medium max-w-3xl">
            We're proud to have worked with a diverse range of clients, from established brands to rising influencers:
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Side: Client Grid */}
          <div className="w-full lg:w-[33%] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {clients.map((client, index) => (
              <div key={index} className="flex flex-col w-full">
                
                {/* Image Container with Brackets */}
                <div className="relative mb-4 p-2">
                  {/* Top Left Bracket */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
                  
                  {/* Bottom Right Bracket */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />
                  
                  <img 
                    src={client.img} 
                    alt={client.name} 
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>

                {/* Client Details */}
                <h3 className="text-[16px] md:text-[18px] font-semibold mb-2">
                  {client.name}
                </h3>
                
                <div className="flex items-center text-[11px] md:text-[12px] font-medium text-black/70 gap-2">
                  {/* Instagram gradient icon approximation using text color */}
                  <FaInstagram className="text-[#E1306C] text-[16px] shrink-0" />
                  <span className="truncate">
                    {client.handle} | Followers: {client.followers}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical Divider (Visible only on large screens) */}
          <div className="hidden lg:block w-px bg-black/20 shrink-0" />

          {/* Right Side: Testimonial & Video Area */}
          <div className="w-full lg:w-[64%] flex flex-col md:flex-row gap-10 md:gap-8 items-center md:items-stretch">
            
            {/* Testimonial Text Container */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-[36px] lg:text-[42px] font-bold leading-[1.2] mb-6">
                Client<br />Experience
              </h2>
              
              <p className="text-[14px] md:text-[15px] font-medium leading-[1.8] text-black/80 mb-8">
                Photify Studios delivered excellent service from start to finish. The team was professional, creative, and made the entire experience very comfortable. The quality of the photos and videos exceeded our expectations. Highly recommended.
              </p>
              
              <p className="font-semibold text-[15px] mb-8">
                learnwithjaspal
              </p>

              {/* Slider Controls */}
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform hover:scale-110">
                  <FaChevronLeft className="text-sm pr-0.5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform hover:scale-110">
                  <FaChevronRight className="text-sm pl-0.5" />
                </button>
              </div>
            </div>

            {/* Video Thumbnail Container */}
            <div className="w-full md:w-1/2 relative h-[400px] md:h-auto min-h-[350px]">
              <img 
                src="/images/client/thumbnail1.png" // Replace with your actual video thumbnail path
                alt="Client Video Testimonial" 
                className="w-full h-full object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer transition-transform hover:scale-110">
                  <FaPlay className="text-white text-xl ml-1" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}