// src/components/HomeHeader.jsx
"use client";

import React, { useState, useRef, useEffect } from 'react';

const navItems = [
  { label: 'CYC WALL', id: 'cyc-wall' },
  { label: 'STUDIO RENTALS', id: 'studio-rentals' },
  { label: 'PORTFOLIO', id: 'portfolio' },
  { label: 'EQUIPMENT', id: 'equipment' },
  { label: 'OUR PACKAGES', id: 'our-packages' },
  { label: 'WHY CHOOSE', id: 'why-choose' },
];

export default function HomeHeader() {
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef(null);

  // IMPORTANT: Set this to the exact pixel height of your main website header 
  const MAIN_HEADER_HEIGHT = 80;

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      
      const localHeaderHeight = headerRef.current.offsetHeight;
      const triggerOffset = MAIN_HEADER_HEIGHT + localHeaderHeight + 20;

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      if (isAtBottom) {
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      let currentActive = '';

      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        
        if (section) {
          const rect = section.getBoundingClientRect();
          
          if (rect.top <= triggerOffset) {
            currentActive = navItems[i].id;
            break;
          }
        }
      }

      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
        
        // --- NEW: Auto-scroll the horizontal nav to keep the active item in view on mobile ---
        const activeNavElement = document.getElementById(`nav-item-${currentActive}`);
        const navContainer = document.getElementById('horizontal-nav-container');
        
        if (activeNavElement && navContainer) {
          // Center the active item in the scroll view
          const scrollLeftTarget = activeNavElement.offsetLeft - (navContainer.clientWidth / 2) + (activeNavElement.clientWidth / 2);
          navContainer.scrollTo({
            left: scrollLeftTarget,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    
    if (section && headerRef.current) {
      const localHeaderHeight = headerRef.current.offsetHeight;
      const totalOffset = localHeaderHeight + MAIN_HEADER_HEIGHT;
      
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - totalOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(id);
    }
  };

  return (
    <div 
      ref={headerRef}
      // sticky position adjusted slightly for better mobile clearance if needed
      className="sticky top-[56px] md:top-[43px] w-full z-40 transition-all duration-300 py-3 md:py-6"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20 w-full">
        
        {/* The Boxed Navigation Container */}
        <div className="w-full border border-[#A5CEC1] bg-white rounded-md md:rounded-none shadow-sm md:shadow-none overflow-hidden">
          
          {/* Added an ID here to target for auto-scrolling. 
            Used flex-nowrap to enforce a single line. 
          */}
          <nav 
            id="horizontal-nav-container"
            className="flex flex-nowrap items-center overflow-x-auto whitespace-nowrap no-scrollbar p-1.5 md:p-2 gap-1.5 md:gap-2 scroll-smooth"
          >
            
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              
              return (
                <a
                  key={item.id}
                  id={`nav-item-${item.id}`} // Added ID to track position in horizontal scroll
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`
                    relative px-4 sm:px-5 py-2.5 md:px-5 md:py-2.5 lg:py-3 text-[12px] sm:text-[13px] md:text-[13px] font-medium tracking-wide transition-all duration-300 text-center shrink-0 lg:flex-1 rounded-sm md:rounded-none
                    ${isActive 
                      ? 'bg-[#1D4F41] text-white shadow-sm' 
                      : 'bg-transparent text-black hover:text-[#1D4F41] hover:bg-[#f0fdf7]'
                    }
                  `}
                >
                  {item.label}

                  {/* Corner Brackets for Active State */}
                  {isActive && (
                    <>
                      {/* Reduced bracket size on mobile */}
                      <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-2 h-2 md:w-2.5 md:h-2.5 border-t-[1.5px] border-r-[1.5px] border-white pointer-events-none" />
                      <div className="absolute bottom-1.5 left-1.5 md:bottom-2 md:left-2 w-2 h-2 md:w-2.5 md:h-2.5 border-b-[1.5px] border-l-[1.5px] border-white pointer-events-none" />
                    </>
                  )}
                </a>
              );
            })}
            
          </nav>
        </div>

      </div>
      
      {/* Global styles for hiding scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}