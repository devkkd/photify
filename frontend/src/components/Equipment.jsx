"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getEquipments } from "@/lib/api";

export default function Equipment() {
  const router = useRouter();

  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await getEquipments();

        // limit to 5 items
        setEquipmentData(res.data.slice(0, 5));
      } catch (err) {
        console.error(err);
        setError("Failed to load equipment");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <section id="equipment" className="w-full bg-white pt-20 text-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Top Header Area */}
        <div className="mb-12">
          <h3 className="text-[20px] md:text-[24px] font-bold mb-4 tracking-tight">
            Equipment
          </h3>
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold tracking-tight mb-6 leading-[1.1]">
            Professional Gear That Powers Your Creativity
          </h2>
          <p className="text-[14px] md:text-[15px] font-medium leading-[1.8] opacity-80 max-w-4xl">
            At Photify Studios, we believe great equipment is the foundation of exceptional work.
            <br className="hidden md:block" />
            Our studio is equipped with industry-leading gear that's meticulously maintained and constantly updated to meet evolving creative demands.
          </p>
        </div>

        {/* Category Title */}
        <div className="mb-8">
          <h4 className="text-[16px] md:text-[18px] font-medium uppercase tracking-wide">
            LIGHTS
          </h4>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mb-16">
          
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {!loading && !error &&
            equipmentData.map((item) => (
              <div key={item._id} className="flex flex-col group cursor-pointer">
                
                {/* Image Container */}
                <div className="relative p-2 mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                  
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />
                  
                  <div className="w-full aspect-square bg-white flex items-center justify-center p-6 shadow-sm border border-gray-100">
                    <img
                      src={item.image}   // must match backend field
                      alt={item.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Product Name */}
                <h5 className="text-[12px] md:text-[13px] font-medium uppercase px-2 tracking-wide opacity-90 group-hover:opacity-100">
                  {item.name}
                </h5>
              </div>
            ))
          }
        </div>

        {/* CTA Button */}
        <div className="w-full flex justify-center">
          <button
            onClick={() => router.push("/equipment")}
            className="bg-[#1D4F41] text-white px-8 py-4 text-[15px] font-medium rounded-full hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            See All Studio Equipment
          </button>
        </div>

      </div>
    </section>
  );
}