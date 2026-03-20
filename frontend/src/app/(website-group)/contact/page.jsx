// src/app/contact/page.jsx
import React from 'react';

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-white pb-32 pt-32">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Let's Create Magic
        </h1>
        <h2 className="text-lg md:text-xl font-bold text-black uppercase tracking-wider mb-6">
          YOUR VISION, OUR STUDIO
        </h2>
        <p className="text-black text-[14px] md:text-[16px] font-medium leading-relaxed opacity-90 max-w-2xl mx-auto">
          Ready to bring your vision to life?<br className="hidden md:block" />
          Whether you have a clear concept or just a spark of an idea, we're here to help.
        </p>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Contact Information */}
        <div className="lg:col-span-4 flex flex-col space-y-10 text-black">
          
          {/* Address */}
          <div>
            <h3 className="text-[18px] md:text-[20px] font-medium mb-4">Address</h3>
            <p className="text-[14px] md:text-[15px] leading-[1.8] font-medium opacity-90">
              Plot No. 59B. 2nd Floor,<br />
              Sumer Nagar, Opp.<br />
              St. Wilfred's College,<br />
              New Sanganer Road,<br />
              Mansarovar, Jaipur<br />
              Rajasthan
            </p>
          </div>
          
          {/* Email */}
          <div>
            <p className="text-[14px] md:text-[15px] font-medium">
              <span className="font-semibold uppercase mr-2">EMAIL :</span>
              studiosphotify@gmail.com
            </p>
          </div>
          
          {/* Phone */}
          <div>
            <p className="text-[14px] md:text-[15px] font-medium">
              <span className="font-semibold mr-2">Call :</span>
              +91 9784562130 | +91 9057775566
            </p>
          </div>

        </div>

        {/* Right Column: Map with Corner Brackets */}
        <div className="lg:col-span-8 relative p-3 w-full h-[150px] md:h-[340px]">
          
          {/* Top Left Bracket */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black" />
          
          {/* Bottom Right Bracket */}
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black" />
          
          {/* Map Container */}
          <div className="relative w-full h-full  overflow-hidden">
            {/* Embedded Google Map with exact address */}
            <iframe 
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Plot%20No.%2059B,%20Sumer%20Nagar,%20Opp.%20St.%20Wilfred's%20College,%20New%20Sanganer%20Road,%20Mansarovar,%20Jaipur,%20Rajasthan+(Photify%20Studios)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover" 
            />
          </div>

        </div>

      </div>

    </main>
  );
}