"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getPortfolio } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    const [images, setImages] = useState([]);

    React.useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await getPortfolio();

                // take max 8 images
                const imgs = res.data.slice(0, 8).map((item) => item.image);

                setImages(imgs);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImages();
    }, []);

    useGSAP(() => {
        const track = trackRef.current;

        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${track.scrollWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        return () => clearTimeout(timeout);
    }, { scope: sectionRef });

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="relative h-screen w-full bg-white text-black overflow-hidden flex flex-col justify-center items-center pt-[120px] lg:pt-[140px] pb-10 md:gap-12"
        >

            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 shrink-0 mb-3 md:mb-4">
                <h2 className="text-[36px] md:text-[42px] lg:text-[48px] font-semibold tracking-tight mb-4">
                    Photify Portfolio
                </h2>
                <p className="text-[14px] md:text-[15px] font-medium leading-[1.8] opacity-80 max-w-5xl">
                    Our work speaks for itself. From fashion editorials to product photography, maternity sessions to podcast setups, explore how we've helped brands and creators bring their visions to life.
                </p>
            </div>

            <div className="flex items-center w-full ">
                <div
                    ref={trackRef}
                    className="flex flex-nowrap items-center h-full w-max gap-6 md:gap-8 lg:gap-10 pr-6 md:pr-12 lg:pr-20 will-change-transform"
                >

                    <div className="w-[20vw] shrink-0 h-full" />

                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative p-2.5 w-[220px] aspect-[3/4] shrink-0"
                        >

                            <div className="absolute top-0 left-0 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />

                            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />

                            <img
                                src={img}
                                alt={`Creative Setup ${idx + 1}`}
                                className="w-full h-full object-cover shadow-md"
                            />
                        </div>
                    ))}

                    <div className="w-[10vw] shrink-0" />

                </div>
            </div>

        </section>
    );
}