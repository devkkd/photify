import React from 'react';

export default function Magic() {
  // Replace these with your actual image paths
  const images = [
    "/images/magic/slide1.png",
    "/images/magic/slide2.png",
    "/images/magic/slide3.png",
    "/images/magic/slide4.png",
    "/images/magic/slide5.png",
    "/images/magic/slide6.png",
    "/images/magic/slide7.png",
    "/images/magic/slide8.png", // Add more if needed
  ];

  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex items-end overflow-hidden bg-black text-white">
      
      {/* Injecting Custom Keyframes for the Infinite Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: 200%; /* Important: Needs to be double width to hold both sets */
        }
      `}</style>

      {/* Background Marquee Images */}
      <div className="absolute inset-0 z-0 flex animate-marquee">
        {/* Set 1 */}
        <div className="flex w-1/2 h-full">
          {images.map((src, index) => (
            <img 
              key={`set1-${index}`} 
              src={src} 
              alt="" 
              className="w-full h-full object-cover shrink-0"
              style={{ flexBasis: `${100 / images.length}%` }} 
            />
          ))}
        </div>
        {/* Set 2 (Duplicate for seamless looping) */}
        <div className="flex w-1/2 h-full">
          {images.map((src, index) => (
            <img 
              key={`set2-${index}`} 
              src={src} 
              alt="" 
              className="w-full h-full object-cover shrink-0"
              style={{ flexBasis: `${100 / images.length}%` }} 
            />
          ))}
        </div>
      </div>

      {/* Dark Gradient Overlay */}
      {/* from-black/90 at the bottom to transparent at the top */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Foreground Content Container */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-12 md:pb-16 flex flex-col md:flex-row justify-between md:items-end gap-10">
        
        {/* Left Side: Text Content */}
        <div className="max-w-2xl">
          <h2 className="text-[36px] md:text-[48px] font-bold mb-2 leading-tight">
            Let's Create Magic!
          </h2>
          <h3 className="text-[16px] md:text-[18px] font-bold uppercase tracking-wide mb-6">
            YOUR VISION,OUR STUDIO
          </h3>
          <p className="text-[14px] md:text-[16px] text-white/90 leading-relaxed max-w-lg font-medium">
            Ready to bring your vision to life?<br />
            Whether you have a clear concept or just a spark of an idea, we're here to help.
          </p>
        </div>

        {/* Right Side: CTA Button */}
        <div className="shrink-0">
          <a 
            href="https://wa.me/919784562130" // Replace with actual WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black font-semibold text-[15px] px-8 py-4 rounded-full transition-transform hover:scale-105"
          >
            Say Hello on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}