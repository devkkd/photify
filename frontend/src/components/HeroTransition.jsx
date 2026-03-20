// src/components/HeroTransition.jsx
"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroScroll from "./HeroScroll";
import Hero from "./Hero";

gsap.registerPlugin(ScrollTrigger);

export default function HeroTransition() {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const whiteOverlayRef = useRef(null);

  useGSAP(() => {
    // 1. Initial State Preps 
    gsap.set(".header-anim-item", { autoAlpha: 0, y: 15 });
    
    // Natively, the logo is on the left (left-6, which is 24px).
    // We calculate the center offset and push it there BEFORE the animation starts.
    gsap.set(".header-logo", {
      x: () => {
        const container = document.querySelector('.header-inner-container');
        const logo = document.querySelector('.header-logo');
        if (!container || !logo) return 0;
        
        const centerPosition = (container.offsetWidth / 2) - (logo.offsetWidth / 2);
        return centerPosition - 24; // 24 is the 1.5rem native left offset
      }
    });
    
    gsap.set(maskRef.current, {
      clipPath: "circle(4% at 50% 100%)",
      WebkitClipPath: "circle(4% at 50% 100%)"
    });

    gsap.set(".hero-content-layer", {
      y: "30vh",
      opacity: 0,
      filter: "blur(18px)"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, 
      }
    });

    tl.addLabel("reveal");

    tl.to(maskRef.current, {
      clipPath: "circle(150% at 50% 100%)",
      WebkitClipPath: "circle(150% at 50% 100%)",
      ease: "power2.inOut"
    }, "reveal");

    tl.to(".hero-scroll-content", {
      y: "-40vh",
      ease: "power2.inOut"
    }, "reveal");

    tl.to(".hero-content-layer", {
      y: "0",
      opacity: 1,
      filter: "blur(0px)",
      ease: "power2.inOut"
    }, "reveal+=0.2");

    tl.to(whiteOverlayRef.current, {
      opacity: 0,
      ease: "power2.inOut"
    }, "reveal+=0.2");

    // --- SEQUENCED HEADER ANIMATIONS ---
    
    tl.to("#global-header", {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "reveal+=0.2");

    // Animate logo back to its native CSS position (x: 0)
    tl.to(".header-logo", {
      x: 0, 
      duration: 0.6,
      ease: "power2.out"
    }, "reveal+=0.2"); 

    tl.to(".header-anim-item", {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.03
    }, "reveal+=0.6"); 

    // --- CRITICAL CLEANUP BLOCK ---
    // This runs the moment Next.js navigates away from the homepage and unmounts HeroTransition.
    return () => {
      // Strips ALL inline style tags injected by GSAP so Tailwind takes control back instantly.
      gsap.set(["#global-header", ".header-logo", ".header-anim-item"], { 
        clearProps: "all" 
      });
    };

  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <HeroScroll />
      </div>

      <div
        ref={maskRef}
        className="absolute inset-0 w-full h-full z-10"
      >
        <Hero />
        <div
          ref={whiteOverlayRef}
          className="absolute inset-0 w-full h-full bg-white pointer-events-none"
        />
      </div>
    </div>
  );
}