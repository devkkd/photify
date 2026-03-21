import React from 'react';
import Link from 'next/link';

export default function WhatWeDo() {
  const services = [
    {
      title: "Maternity Shoots",
      desc: "Celebrate this beautiful journey with our specialized maternity photography. With 3 elegant maternity dresses included and multiple creative setups, we capture the glow and anticipation of motherhood in timeless images.",
      img: "/images/WhatWeDo/WeDo1.png",
      pos: "bottom"
    },
    {
      title: "Baby Shoots",
      desc: "Preserve those precious early moments with our gentle baby photography sessions. Choose from multiple themed setups designed specifically for newborns and infants, creating memories you'll treasure forever.",
      img: "/images/WhatWeDo/WeDo2.png",
      pos: "top"
    },
    {
      title: "Fashion Shoots",
      desc: "From editorial spreads to lookbook photography, our fashion shoot setups are designed to capture your brand's unique style. With professional lighting, creative backdrops, and ample space, we help fashion brands and models create stunning visual stories.",
      img: "/images/WhatWeDo/WeDo3.png",
      pos: "bottom"
    },
    {
      title: "E-Commerce Product",
      desc: "Clean, professional product images that sell. Our infinity wall and professional lighting setups deliver the crisp, high-quality images your e-commerce platform needs. From single products to full catalog shoots, we've got you covered.",
      img: "/images/WhatWeDo/WeDo4.png",
      pos: "top"
    },
    {
      title: "Jewelry Shoots",
      desc: "Showcase the brilliance and detail of your jewelry with our specialized setups. Our controlled lighting environment and infinity wall ensure every piece shines in its best light, perfect for catalogs, e-commerce, and social media.",
      img: "/images/WhatWeDo/WeDo5.png",
      pos: "bottom"
    },
    {
      title: "Podcast Setup",
      desc: "Launch or elevate your podcast with our dedicated podcast setup. Professional audio equipment, proper lighting, and a comfortable recording environment ensure your content looks and sounds exceptional.",
      img: "/images/WhatWeDo/WeDo6.png",
      pos: "top"
    },
    {
      title: "Creator Content",
      desc: "Create scroll-stopping content with access to 26+ different setups. Whether you need behind-the-scenes footage, polished reels, or authentic content, our versatile studio spaces adapt to your creative needs.",
      img: "/images/WhatWeDo/WeDo7.png",
      pos: "bottom"
    },
    {
      title: "Dance & Yoga",
      desc: "Capture movement and grace with our spacious studio designed for dynamic shoots. Perfect lighting and ample room ensure every pose, every movement is documented beautifully.",
      img: "/images/WhatWeDo/WeDo8.png",
      pos: "top"
    }
  ];

  return (
    <section className="w-full bg-[#FBFBFB]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Seamless Grid (No Gaps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          
          {services.map((service, index) => (
            <div 
              key={index} 
              // Fixed height container ensures uniformity. Overflow-hidden keeps the zoom effect inside the box.
              className="group relative w-full h-[650px] md:h-[725px] lg:h-[800px] overflow-hidden bg-gray-100"
            >
              {/* Background Image with Hover Zoom */}
              <img 
                src={service.img} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Overlay Card */}
              <div 
                className={`absolute w-[88%] bg-[#111111]/95 backdrop-blur-sm text-white p-6 lg:p-8 flex flex-col transition-all duration-300 ease-out 
                  ${service.pos === 'top' 
                    ? 'top-6 left-1/2 -translate-x-1/2 group-hover:top-5' 
                    : 'bottom-6 left-1/2 -translate-x-1/2 group-hover:bottom-7'
                  }
                `}
              >
                {/* Top Left Bracket */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-white/60 pointer-events-none" />
                {/* Bottom Right Bracket */}
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-white/60 pointer-events-none" />
                
                <h3 className="text-[18px] lg:text-[20px] font-bold mb-3 tracking-wide">
                  {service.title}
                </h3>
                
                {/* <p className="text-[12px] lg:text-[13px] font-medium leading-[1.6] opacity-80 mb-6">
                  {service.desc}
                </p> */}

                <Link 
                  href="/portfolio"
                  className="w-max bg-white text-black px-5 py-2 rounded-full text-[11px] lg:text-[12px] font-semibold tracking-wide hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  See Shoots →
                </Link>
              </div>

            </div>
          ))}
          
        </div>
        
      </div>
    </section>
  );
}