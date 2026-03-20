// src/components/HeroScroll.jsx
import React from "react";

export default function HeroScroll() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white lowercase">
      
      {/* Background Pattern Layer (Fixed) */}
      <div 
        className="absolute top-0 left-0 z-0 w-full h-full pointer-events-none"
        style={{ 
          backgroundImage: 'url("/images/pattern1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat', 
        }}
      />

      {/* Top Light Effect (Fixed) */}
      <div className="absolute top-0 left-1/2 z-10 w-full max-w-2xl -translate-x-1/2 pointer-events-none">
        <img 
          src="/images/light.png" 
          alt="Top Light" 
          className="w-full h-auto object-contain opacity-80 mix-blend-screen"
        />
      </div>

      {/* Main Moving Content Wrapper */}
      <div className="hero-scroll-content absolute inset-0 w-full h-full z-20 flex flex-col items-center justify-center">
        
        <div className="relative h-[600px] flex flex-col items-center justify-center text-center px-6">
          <div className="mb-14 flex items-center justify-center">
            <img src="/images/logo.png" alt="photify studios" className="h-16 w-auto" />
          </div>

          <p className="mb-5 text-[22px] font-medium tracking-[-3%] flex items-center justify-center">
            welcome to photify studios
          </p>

          <p className="mb-1 text-[16px] font-medium tracking-[-2%] opacity-90 flex items-center justify-center">
            a light that reveals your story
          </p>

          <h1 className="mb-2 max-w-4xl text-[30px] md:text-[50px] font-semibold flex items-center justify-center">
            frame that captures your essence
          </h1>

          <p className="text-[20px] font-medium tracking-[-3%] flex items-center justify-center">
            vision that elevates your brand
          </p>
        </div>

        {/* Scroll Indicator Text */}
        <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <p className="text-[14px] md:text-[16px] font-medium leading-[160%] tracking-[-2%] mix-blend-difference opacity-80">
            scroll down ↓
          </p>
        </div>

      </div>
      
    </section>
  );
}