import React from 'react';

export default function DesignedToFlow() {
  const features = [
    {
      title: "3,500 Sq Ft of Creative Freedom",
      desc: "Emphasizes the spaciousness and versatility for brand campaigns, podcasts, films, and personal projects"
    },
    {
      title: "Modular Setups That Move With You",
      desc: "Highlights the flexibility and ability to combine multiple configurations"
    },
    {
      title: "Sunlit Spaces With Customizable Lighting",
      desc: "Expanded description of natural light benefits plus the control offered by professional lighting equipment"
    },
    {
      title: "Everything You Need, All Included",
      desc: "Clear, benefit-focused explanation of what's included with no hidden costs"
    }
  ];

  return (
    <section className="w-full bg-white pt-20 text-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold tracking-tight mb-4">
            Designed to Flow With Your Ideas
          </h2>
          <p className="text-[15px] md:text-[18px] font-medium opacity-80">
            In less than a year, we've grown into Jaipur's most trusted creative space
          </p>
        </div>

        {/* Content Split */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-stretch">
          
          {/* Left Column: Feature List */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="py-8 border-b border-gray-200/80 first:pt-0 last:border-b-0"
              >
                <h3 className="text-[#1D4F41] text-[20px] md:text-[24px] font-bold mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[14px] md:text-[15px] font-medium leading-[1.8] opacity-80">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Image Collage */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            
            {/* Top Large Image - Fixed height applied */}
            <div className="relative p-2.5 w-full h-[250px] lg:h-[300px] object-bottom group cursor-pointer">
              {/* Top Left Bracket */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
              {/* Bottom Right Bracket */}
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />
              
              <div className="w-full h-full overflow-hidden">
                <img 
                  src="/images/DesignedToFlow/Designed1.png" // Replace with actual top image path
                  alt="Creative Setup" 
                  // object-cover ensures the image fills the fixed height and crops
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Bottom Two Images */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Bottom Left Image - Fixed height applied */}
              <div className="relative p-2.5 w-full h-[250px] lg:h-[400px] group cursor-pointer">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />
                
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src="/images/DesignedToFlow/Designed2.png" // Replace with actual bottom left image path
                    alt="Portrait Shoot" 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Bottom Right Image - Fixed height applied */}
              <div className="relative p-2.5 w-full h-[250px] lg:h-[400px] group cursor-pointer">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />
                
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src="/images/DesignedToFlow/Designed3.png" // Replace with actual bottom right image path
                    alt="Creative Portrait" 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

            </div>

          </div>
          
        </div>

      </div>
    </section>
  );
}