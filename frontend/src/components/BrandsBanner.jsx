import React from 'react';

export default function BrandsBanner() {
  // Base array of your brand image paths
  const baseBrands = [
    "/images/brands/brand1.png",
    "/images/brands/brand2.png",
    "/images/brands/brand3.png",
    "/images/brands/brand4.png",
    "/images/brands/brand5.png"
  ];

  // We triple the sequence to ensure the track is super wide,
  // preventing it from breaking on ultra-wide desktop monitors.
  const brandSequence = [...baseBrands, ...baseBrands, ...baseBrands];

  return (
    <section className="w-full bg-white text-black pt-20 overflow-hidden relative">
      
      {/* Top Heading */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold tracking-tight">
          Brands That Trust Photify Studios
        </h2>
      </div>

      {/* Marquee Container with Fade Masks */}
      <div className="relative w-full overflow-hidden flex items-center">
        
        {/* Left Edge Fade In */}
        <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        
        {/* Right Edge Fade Out */}
        <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Inject Custom Keyframes for the Smooth Scroll */}
        <style>{`
          @keyframes scroll-brands {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-brands {
            /* 30s controls the speed. Lower = faster, Higher = slower */
            animation: scroll-brands 30s linear infinite; 
            width: max-content;
          }
        `}</style>

        {/* Scrolling Track: 
          Added precise gaps and right-padding that perfectly match the gap size. 
          This ensures the infinite loop jumps back seamlessly without stuttering.
        */}
        <div className="flex w-max animate-scroll-brands items-center gap-12 md:gap-20 lg:gap-28 pr-12 md:pr-20 lg:pr-28">
          
          {/* Render Set 1 */}
          {brandSequence.map((imgSrc, index) => (
            <img 
              key={`set1-${index}`}
              src={imgSrc} 
              alt={`Trusted Brand ${index + 1}`} 
              // shrink-0 fixes the overlapping! It forces the browser to respect the image's width.
              className="h-8 md:h-10 lg:h-12 w-auto object-contain shrink-0"
            />
          ))}

          {/* Render Set 2 (Exact duplicate for the seamless -50% CSS loop) */}
          {brandSequence.map((imgSrc, index) => (
            <img 
              key={`set2-${index}`}
              src={imgSrc} 
              alt={`Trusted Brand ${index + 1} clone`} 
              className="h-8 md:h-10 lg:h-12 w-auto object-contain shrink-0"
            />
          ))}
          
        </div>
      </div>
    </section>
  );
}