"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ClientVideo from "@/components/ClientVideo";
import { getTestimonials } from "@/lib/api";

// Instagram Icon
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ig-gradient" x1="2" y1="22" x2="22" y2="2">
        <stop offset="0%" stopColor="#feda75" />
        <stop offset="25%" stopColor="#fa7e1e" />
        <stop offset="50%" stopColor="#d62976" />
        <stop offset="75%" stopColor="#962fbf" />
        <stop offset="100%" stopColor="#4f5bd5" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-gradient)" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke="url(#ig-gradient)" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-gradient)" />
  </svg>
);

export default function TestimonialsPage() {
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await getTestimonials();
        setClientsData(res.data || []);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <main className="relative z-0 w-full min-h-screen bg-white pb-32 pt-32">
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Heading */}
          <div className="mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Our Clients & Their Experience
            </h1>
            <p className="text-black text-[14px] md:text-[16px] font-medium leading-relaxed max-w-3xl">
              We're proud to have worked with a diverse range of clients, from established brands to rising influencers.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-20 text-gray-500">
              Loading clients...
            </div>
          )}

          {/* Empty */}
          {!loading && clientsData.length === 0 && (
            <div className="text-center py-20 text-gray-800 italic">
              No clients added yet.
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {clientsData.map((client) => (
              <div key={client._id} className="flex flex-col group cursor-pointer">

                {/* Image Box */}
                <div className="relative p-3 aspect-square mb-6">

                  {/* Brackets */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-black transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-black transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

                  {/* Image */}
                  <div className="relative w-full h-full bg-gray-100 overflow-hidden">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="px-1">
                  <h3 className="text-[18px] md:text-[20px] font-semibold text-black mb-3">
                    {client.name}
                  </h3>

                  <div className="flex items-center text-[12px] md:text-[13px] font-medium text-black">
                    <InstagramIcon />
                    <span className="ml-2 mt-0.5">
                      {client.handle} | Followers: {client.followers}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <ClientVideo />
    </>
  );
}