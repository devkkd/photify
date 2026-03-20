import React from 'react';

export default function WhyChoose() {
  const reasons = [
    {
      num: "01.",
      title: "Jaipur's First\nMulti-Functional Studio",
      desc: "26+ creative setups under one roof means unlimited possibilities for your shoot. No need to visit multiple locations - find everything you need in one convenient space.",
      img: "/images/scroll_section/whychoose1.png"
    },
    {
      num: "02.",
      title: "Infinity Wall for Clean,\nProfessional Visuals",
      desc: "Our infinity wall setup is perfect for e-commerce, product photography, and clean editorial looks. Achieve that professional, seamless background that makes your subjects pop.",
      img: "/images/scroll_section/whychoose1.png"
    },
    {
      num: "03.",
      title: "Beautiful Natural\nSunlight",
      desc: "Take advantage of our studio's abundant natural lighting for that soft, authentic look. Combined with our professional lighting equipment, you have complete creative control.",
      img: "/images/scroll_section/whychoose1.png"
    },
    {
      num: "04.",
      title: "All Equipment\nIncluded",
      desc: "Just walk in and shoot. All necessary studio equipment, lights, and setups are included in your booking. No hidden costs, no equipment rentals - everything is ready for you.",
      img: "/images/scroll_section/whychoose1.png"
    },
    {
      num: "05.",
      title: "Premium Quality, Budget-\nFriendly Pricing",
      desc: "Professional-grade studio space shouldn't break the bank. We offer premium facilities and equipment at prices that make sense for creators, small businesses, and established brands alike.",
      img: "/images/scroll_section/whychoose1.png"
    }
  ];

  return (
    <section id="why-choose" className="w-full bg-white pt-20 text-black overflow-visible">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-12 mb-12">
        <h2 className="text-[36px] md:text-[42px] lg:text-[40px] font-bold tracking-tight">
          Why Choose Photify Studios
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto flex flex-col border-t border-gray-200">
        {reasons.map((item, index) => (
          <div 
            key={index} 
            className="group relative border-b border-gray-200 transition-colors duration-300 ease-in-out hover:bg-[#1D4F41] hover:text-white cursor-default"
          >
            {/* The Row Content */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-6 lg:px-12 py-6 md:py-7 flex flex-col md:flex-row items-start md:items-center relative z-20">
              
              {/* Number */}
              <div className="w-full md:w-24 text-[20px] md:text-[22px] font-bold mb-4 md:mb-0 shrink-0">
                {item.num}
              </div>
              
              {/* Title */}
              <div className="w-full md:w-[35%] text-[18px] md:text-[22px] font-bold whitespace-pre-line leading-[1.3] pr-6 mb-4 md:mb-0">
                {item.title}
              </div>
              
              {/* Description */}
              <div className="w-full md:w-[40%] text-[12px] md:text-[14px] leading-[1.8] font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300 lg:pr-32">
                {item.desc}
              </div>
              
            </div>

            {/* Hover Image (Reveals on Hover, hidden on mobile for clean UX) */}
            <div className="hidden lg:block absolute right-[5%] xl:right-[10%] top-1/2 -translate-y-1/2 w-[280px] h-[200px] z-10 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:z-30 transition-all duration-400 ease-out">
              
              <div className="relative w-full h-full p-2.5">
                {/* Bottom Left Bracket */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-[#1D4F41] group-hover:border-[#1D4F41] transition-colors duration-300" />
                
                {/* Top Right Bracket */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-[#1D4F41] group-hover:border-[#1D4F41] transition-colors duration-300" />
                
                {/* Image Base */}
                <img 
                  src={item.img} 
                  alt={item.title.replace('\n', ' ')} 
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>

            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}