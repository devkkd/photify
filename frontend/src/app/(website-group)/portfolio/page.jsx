"use client";
// src/app/portfolio/page.jsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FAQSection from "@/components/FAQ";
import { getBackdrops, getPortfolio } from "@/lib/api";


export default function Page() {
    const [portfolioImages, setPortfolioImages] = useState([]);
    const [backdrops, setBackdrops] = useState([]);
    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await getPortfolio();
                setPortfolioImages(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchBackdrops = async () => {
            const res = await getBackdrops();
            setBackdrops(res.data);
        };

        fetchPortfolio();
        fetchBackdrops();
    }, []);

    return (
        <>
            <main className="w-full min-h-screen bg-white pb-32 pt-32">

                {/* --- PORTFOLIO SECTION --- */}
                <div className="mb-32">
                    {/* Header Section */}
                    <div className="max-w-5xl mx-auto px-6 text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                            Photify Portfolio
                        </h1>
                        <p className="text-black text-[14px] md:text-[16px] font-medium leading-relaxed max-w-4xl mx-auto">
                            Our work speaks for itself. From fashion editorials to product photography, maternity sessions to podcast setups, explore how we've helped brands and creators bring their visions to life.
                        </p>
                    </div>

                    {/* Gallery Grid Section */}
                    <div className="max-w-[1400px] mx-auto px-6">
                        {/* 1 column on mobile, 2 on tablets, 4 on desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                            {portfolioImages.map((item, idx) => (
                                <div key={item._id} className="group relative p-3 aspect-[3/4]">

                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />

                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

                                    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={`Photify Portfolio Image ${idx + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- BACKDROPS SECTION --- */}
                <div className="max-w-[1400px] mx-auto px-6">
                    {/* Backdrops Header (Left Aligned as per screenshot) */}
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            {backdrops.length > 0 ? `${backdrops.length}+ Creative Backdrops` : "Creative Backdrops"}
                        </h2>
                        <p className="text-black text-[14px] md:text-[15px] font-medium leading-relaxed max-w-4xl opacity-90">
                            Discover endless creative possibilities with our diverse collection of professional backdrops and themed setups, all under one roof in Jaipur's premier multi-functional photography studio.
                        </p>
                    </div>

                    {/* Backdrops Grid Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {backdrops.map((item, idx) => (
                            <div key={item._id} className="group relative p-3 aspect-[3/4]">

                                {/* Top Left Corner Bracket */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />

                                {/* Bottom Right Corner Bracket */}
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

                                {/* Image Container */}
                                <div className="relative w-full h-full bg-gray-100 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={`Creative Backdrop ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </main>
            <FAQSection />
        </>
    );
}