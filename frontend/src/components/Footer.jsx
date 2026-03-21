import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1D4F41] text-white pt-12 px-6 md:px-12 lg:px-20 font-medium relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* Top Section: Tagline */}
        <div className="text-center w-full mb-16">
          <h2 className="text-[12px] md:text-[16px] lg:text-[20px] font-bold leading-relaxed tracking-wide">
            Where vision becomes reality. Your trusted partner for photography, videography, and creative studio rentals in Jaipur.
          </h2>
        </div>

        {/* Main Content Split: Info (Left) and Map (Right) */}
        <div className="w-full flex flex-col xl:flex-row gap-12 xl:gap-8 justify-between z-10 relative">
          
          {/* Left Side: Information Grid */}
          <div className="flex-1 flex flex-col justify-between">
            
            {/* Main Heading */}
            <h3 className="text-[18px] md:text-[20px] font-bold mb-8">Photify Studios</h3>
            
            {/* 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[10px] md:text-[11px] leading-[1.8] text-white/90 mb-12">
              
              {/* Column 1: Address */}
              <div>
                <p>Plot No. 59B, 2nd Floor,</p>
                <p>Sumer Nagar, Opp.</p>
                <p>St. Wilfred's College,</p>
                <p>New Sanganer Road,</p>
                <p>Mansarovar, Jaipur</p>
                <p>Rajasthan</p>
              </div>

              {/* Column 2: Contact */}
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="mb-1 text-white font-semibold">Call Us</h4>
                  <p>+91 9784562130</p>
                  <p>+91 9057775566</p>
                </div>
                <div>
                  <h4 className="mb-1 text-white font-semibold">Email</h4>
                  <a href="mailto:studiosphotify@gmail.com" className="hover:underline">
                    studiosphotify@gmail.com
                  </a>
                </div>
              </div>

              {/* Column 3: Socials */}
              <div>
                <h4 className="mb-1 text-white font-semibold">Connect With Us</h4>
                <ul className="flex flex-col space-y-1">
                  <li><a href="#" className="hover:underline">Facebook</a></li>
                  <li><a href="#" className="hover:underline">Instagram</a></li>
                  <li><a href="#" className="hover:underline">YouTube</a></li>
                  <li><a href="#" className="hover:underline">WhatsApp</a></li>
                  <li><a href="#" className="hover:underline">Pinterest</a></li>
                </ul>
              </div>

              {/* Column 4: Hours */}
              <div>
                <h4 className="mb-1 text-white font-semibold">Studio Hours</h4>
                <p className="mb-3">
                  Monday - Saturday<br />
                  10:00 AM - 8:00 PM
                </p>
                <p>
                  Sunday<br />
                  11:00 AM - 6:00 PM
                </p>
              </div>

            </div>

            {/* Bottom Credits */}
            <div className="text-[11px] md:text-[12px] text-white/80 space-y-4">
              <p>Copyright © 2026 Photify Studios. All rights reserved. Crafted with passion in the Pink City.</p>
              <p>Crafted by : Kontent Kraft Digital</p>
            </div>
          </div>

          {/* Right Side: Map Container with Decorative Corners */}
          <div className="w-full xl:w-[40%] relative shrink-0 min-h-[300px] xl:min-h-full flex items-center justify-center p-3 mb-8 xl:mb-0">
            
            {/* Top Left Corner Bracket (Updated to white) */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[2px] border-l-[2px] border-white pointer-events-none" />
            
            {/* Bottom Right Corner Bracket (Updated to white) */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[2px] border-r-[2px] border-white pointer-events-none" />
            
            {/* Embedded Map Area */}
            <div className="relative w-full h-full min-h-[250px] overflow-hidden">
              <iframe 
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Plot%20No.%2059B,%20Sumer%20Nagar,%20Opp.%20St.%20Wilfred's%20College,%20New%20Sanganer%20Road,%20Mansarovar,%20Jaipur,%20Rajasthan+(Photify%20Studios)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>

          </div>

        </div>
        
        {/* Huge Bottom Graphic */}
        <div className="w-full mt-10 md:mt-2 pointer-events-none z-0">
          <img 
            src="/images/photifystudio.png" 
            alt="Photify Studio" 
            className="w-full h-auto object-cover transform " 
          />
        </div>

      </div>
    </footer>
  );
}