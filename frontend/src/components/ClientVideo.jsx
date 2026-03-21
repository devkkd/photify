"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getClientVideos } from "@/lib/api";

export default function ClientVideo() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getClientVideos();
        setVideos(res.data || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
          Client Experience
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.slice(0, 4).map((client) => (
            <div
              key={client._id}
              onClick={() => setSelectedVideo(client.video)}
              className="flex flex-row border border-[#E5E7EB] bg-white group cursor-pointer overflow-hidden h-[350px] md:h-[400px] xl:h-[480px]"
            >
              {/* LEFT */}
              <div className="w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-[11px] sm:text-[13px] xl:text-[14px] text-black leading-[1.8] font-medium opacity-90 mb-6 sm:mb-10">
                  {client.review}
                </p>
                <p className="text-[12px] sm:text-[14px] font-semibold text-black">
                  {client.handle}
                </p>
              </div>

              {/* RIGHT */}
              <div className="relative w-1/2 h-full border-l border-[#E5E7EB]">
                <Image
                  src={client.thumbnail || client.video}
                  alt={client.handle}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 sm:w-7 sm:h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 IMPROVED VIDEO MODAL (Space-Efficient) */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Constrained Container: max-h-[85vh] prevents it from eating the whole screen */}
          <div
            className="relative h-full max-h-[85vh] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />

            {/* Close Button - Clean & Minimal */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-white/20"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}