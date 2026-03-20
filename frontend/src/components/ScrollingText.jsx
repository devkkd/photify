import React from 'react';

export default function ScrollingText() {
  const marqueeItems = [
    "A SPACE FOR",
    "DANCE & MOVEMENT",
    "MINDFULNESS",
    "EVENTS & EXPERIENCES"
  ];

  return (
    <section className="w-full bg-white text-black py-10 border-y border-gray-300 overflow-hidden relative ">
      
      {/* Top Static Text */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-[18px] md:text-[20px] font-bold tracking-wider uppercase">
          A multi-functional space for the multi-dimensional you.
        </h2>
      </div>

      {/* Marquee Container with Fade Masks */}
      <div className="relative w-full overflow-hidden flex items-center">
        
        {/* Left Edge Fade In */}
        <div className="absolute left-0 top-0 w-24 md:w-64 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        
        {/* Right Edge Fade Out */}
        <div className="absolute right-0 top-0 w-24 md:w-64 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Inject Custom Keyframes for the Smooth Scroll */}
        <style>{`
          @keyframes scroll-text {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-text {
            animation: scroll-text 25s linear infinite;
            width: max-content;
          }
        `}</style>

        {/* Scrolling Track */}
        <div className="flex w-max animate-scroll-text">
          
          {/* Render two identical sets to create the seamless infinite loop */}
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {marqueeItems.map((item, index) => (
                <React.Fragment key={`${setIndex}-${index}`}>
                  <span className="text-[22px] md:text-[28px] font-normal tracking-widest uppercase px-6 md:px-10 whitespace-nowrap text-gray-800">
                    {item}
                  </span>
                  <span className="text-[20px] md:text-[24px] px-2 md:px-4 flex items-center justify-center">
                    ✷
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}