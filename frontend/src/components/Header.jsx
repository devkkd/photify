// src/components/Header.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getServices } from "@/lib/api";
import { FaWhatsapp } from "react-icons/fa";

export default function Header() {
  const [services, setServices] = useState([]);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false); // Toggle for mobile dropdown

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await getServices();
        setServices(res.data);
      } catch (err) {
        console.error("Error services:", err);
      }
    };

    loadServices();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      id="global-header"
      className={`fixed top-0 left-0 w-full z-[100] transition-none ${isHome ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
    >
      {/* BACKGROUND LAYER */}
      <div
        className="absolute inset-0 -z-10 backdrop-blur-md"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 0) 100%)'
        }}
      />

      {/* CONTENT LAYER */}
      <div className="header-inner-container relative max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-end">

        <div className="header-logo absolute left-6 top-1/2 -translate-y-1/2 z-20">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src="/images/logoMain.png"
              alt="Photify Studios"
              className="h-6 md:h-8 w-auto object-contain origin-left"
            />
          </Link>
        </div>

        {/* --- DESKTOP NAV --- */}
        <div className="hidden lg:flex items-center gap-8 z-10">
          <nav className="flex items-center gap-6 text-[12px] xl:text-[13px] font-medium text-black">
            <Link href="/" className="header-anim-item hover:text-gray-600 transition-colors">Home</Link>
            <Link href="/about" className="header-anim-item hover:text-gray-600 transition-colors">About Us</Link>

            {/* SERVICES DROPDOWN (Desktop) */}
            <div className="header-anim-item relative group py-6">
              {/* Padding-y added to increase hover area so dropdown doesn't close immediately */}
              <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">
                Services
                <svg className="w-4 h-4 mt-0.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Dropdown Menu Container */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-white border border-gray-100 rounded-xl shadow-lg py-2 min-w-[220px] overflow-hidden">

                  {/* Map through dynamic services */}
                  {services.map((service) => {
                    const isActive = pathname === `/services/${service.slug}`;

                    return (
                      <Link
                        key={service._id}
                        href={`/services/${service.slug}`}
                        className={`block px-5 py-3 text-[14px] transition-colors duration-200 ${isActive
                          ? "bg-[#1D4F41] text-white"
                          : "text-black hover:bg-[#1D4F41] hover:text-white"
                          }`}
                      >
                        {service.title}
                      </Link>
                    );
                  })}

                </div>
              </div>
            </div>
            {/* END SERVICES DROPDOWN */}

            <Link href="/portfolio" className="header-anim-item hover:text-gray-600 transition-colors">Portfolio</Link>
            <Link href="/packages" className="header-anim-item hover:text-gray-600 transition-colors">Packages</Link>
            <Link href="/equipment" className="header-anim-item hover:text-gray-600 transition-colors">Equipment</Link>
            <Link href="/testimonials" className="header-anim-item hover:text-gray-600 transition-colors">Testimonials</Link>
            <Link href="/faq" className="header-anim-item hover:text-gray-600 transition-colors">FAQ's</Link>
            <Link href="/contact" className="header-anim-item hover:text-gray-600 transition-colors">Contact Us</Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919784562130"
              target="_blank"
              rel="noopener noreferrer"
              className="header-anim-item bg-[#111111] text-white text-[12px] xl:text-[13px] px-4 py-2 rounded-full font-medium hover:bg-black transition-colors flex items-center gap-2">
              <FaWhatsapp className="text-xl" />
              <span className="font-medium hidden sm:block">WhatsApp</span>
            </a>
            <a
              href="https://wa.me/919784562130"
              target="_blank"
              rel="noopener noreferrer"
              className="header-anim-item bg-[#1D4F41] text-white text-[12px] xl:text-[13px] px-4 py-2 rounded-full font-medium hover:bg-black transition-colors flex items-center gap-2">
              Book Studio
            </a>
          </div>
        </div>

        {/* --- MOBILE NAV CONTROLS --- */}
        <div className="flex lg:hidden items-center gap-3 z-10">
          <button className="header-anim-item bg-[#1D4F41] text-white text-[12px] px-4 py-1.5 rounded-full font-medium hover:bg-[#163e33] transition-colors">
            Book Studio
          </button>

          <button
            className="header-anim-item text-black p-1 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-white z-[200] lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/images/logoMain.png" alt="Photify Studios" className="h-6 w-auto object-contain" />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-black focus:outline-none" aria-label="Close Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto px-6 py-8">
          <nav className="flex flex-col gap-5 text-[18px] font-medium text-black">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>

            {/* SERVICES DROPDOWN (Mobile) */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer py-1"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              >
                Services
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Expandable Mobile Sub-menu */}
              <div className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? 'max-h-[400px] mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col pl-4 border-l-2 border-gray-100 py-2 gap-3">
                  {services.map((service) => {
                    const isActive = pathname === `/services/${service.slug}`;

                    return (
                      <Link
                        key={service._id}
                        href={`/services/${service.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-[16px] transition-colors ${isActive
                          ? "text-[#1D4F41] font-semibold"
                          : "text-gray-600 hover:text-[#1D4F41]"
                          }`}
                      >
                        {service.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* END SERVICES DROPDOWN */}

            <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
            <Link href="/packages" onClick={() => setIsMobileMenuOpen(false)}>Packages</Link>
            <Link href="/equipment" onClick={() => setIsMobileMenuOpen(false)}>Equipment</Link>
            <Link href="/testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</Link>
            <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ's</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          </nav>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <button className="w-full bg-[#111111] text-white py-3.5 rounded-full text-[15px] font-medium">
              Visit Studio
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}