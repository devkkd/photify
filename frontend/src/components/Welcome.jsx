import React from 'react';

export default function Welcome() {
  const stats = [
    {
      number: "100+",
      title: "Creative Sparks",
      desc: "From first-time creators to established brands, we've welcomed diverse talents."
    },
    {
      number: "120+",
      title: "Successful Shoots",
      desc: "Every project tells a unique story"
    },
    {
      number: "800+",
      title: "Studio Hours",
      desc: "Dedicated to bringing visions to life"
    },
    {
      number: "50+",
      title: "Brands",
      desc: "Trust us with their visual storytelling"
    }
  ];

  return (
    <section className="w-full bg-white py-20 text-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-[36px] md:text-[42px] lg:text-[48px] font-bold tracking-tight mb-4">
            The Numbers Behind Photify
          </h2>
          <p className="text-[15px] md:text-[18px] font-medium opacity-80">
            In less than a year, we've grown into Jaipur's most trusted creative space
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative p-2.5 h-full group cursor-default transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Top Left Bracket */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
              {/* Bottom Right Bracket */}
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />
              
              {/* Card Content */}
              <div className="w-full h-full bg-[#111111] text-white p-6 md:p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h3 className="text-[32px] md:text-[40px] font-bold tracking-tight mb-2">
                    {stat.number}
                  </h3>
                  <h4 className="text-[18px] md:text-[22px] font-bold leading-[1.2] mb-6">
                    {stat.title}
                  </h4>
                </div>
                <p className="text-[12px] md:text-[13px] font-medium leading-[1.6] opacity-80">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Images Grid (50% / 25% / 25% layout on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Image 1 (Wide - 50%) */}
          <div className="md:col-span-2 relative p-2.5 w-full h-[250px] md:h-[350px] lg:h-[400px] group cursor-pointer">
            {/* Top Left Bracket */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
            {/* Bottom Right Bracket */}
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />
            
            <div className="w-full h-full overflow-hidden">
              <img 
                src="/images/Welcome/Welcome1.png" 
                alt="Studio Space" 
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Image 2 (Portrait - 25%) */}
          <div className="col-span-1 relative p-2.5 w-full h-[250px] md:h-[350px] lg:h-[400px] group cursor-pointer">
            {/* Top Left Bracket */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
            {/* Bottom Right Bracket */}
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />
            
            <div className="w-full h-full overflow-hidden">
              <img 
                src="/images/Welcome/Welcome2.png" 
                alt="Studio Setup" 
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Image 3 (Portrait - 25%) */}
          <div className="col-span-1 relative p-2.5 w-full h-[250px] md:h-[350px] lg:h-[400px] group cursor-pointer">
            {/* Top Left Bracket */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
            {/* Bottom Right Bracket */}
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />
            
            <div className="w-full h-full overflow-hidden">
              <img 
                src="/images/Welcome/Welcome3.png" 
                alt="Family Shoot" 
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}