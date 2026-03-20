import React from 'react';

export default function CycMall() {
  return (
    <section id="cyc-wall" className="w-full py-16 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-[1440px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

          {/* First Image (50% Width) */}
          <div className="md:col-span-2 flex flex-col">
            <div className="relative p-2.5 w-full h-[350px] md:h-[400px] lg:h-[500px] group">

              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />

              {/* Inner wrapper */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src="/images/scroll_section/CycMall1.png"
                  alt="CYC Wall Main"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

            </div>

            <p className="mt-4 text-[14px] md:text-[16px] font-medium text-black px-2.5">
              (20 ft by 15.5 ft | H 10 ft)
            </p>
          </div>

          {/* Second Image (25% Width) */}
          <div className="relative p-2.5 w-full h-[350px] md:h-[400px] lg:h-[500px] group">

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />

            {/* Inner wrapper FIX */}
            <div className="w-full h-full overflow-hidden">
              <img
                src="/images/scroll_section/CycMall2.png"
                alt="CYC Wall Setup 1"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

          </div>

          {/* Third Image (25% Width) */}
          <div className="md:col-span-1 flex flex-col">
            <div className="relative p-2.5 w-full h-[350px] md:h-[400px] lg:h-[500px] group">

              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />

              {/* Inner wrapper */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src="/images/scroll_section/CycMall3.png"
                  alt="CYC Wall Setup 2"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}