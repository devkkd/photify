"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCategories, getEquipments } from "@/lib/api";

export default function Page() {

  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const categoriesRes = await getCategories();
      const equipmentsRes = await getEquipments();

      const categories = categoriesRes.data;
      const equipments = equipmentsRes.data;

      // group equipments by category
      const grouped = categories.map((cat) => {

        const items = equipments.filter(
          (eq) => eq.category._id === cat._id
        );

        return {
          category: cat.name,
          items: items
        };
      });

      setEquipmentData(grouped);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="w-full min-h-screen bg-white pb-32 pt-32">

      <div className="max-w-5xl mx-auto px-6 text-center mb-20">
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">
          Professional Gear That Powers Your Creativity
        </h1>

        <p className="text-black text-[13px] md:text-[15px] font-medium leading-relaxed max-w-3xl mx-auto opacity-90">
          At Photify Studios, we believe great equipment is the foundation of exceptional work.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 space-y-20">

        {equipmentData.map((categoryBlock, index) => (
          <section key={index}>

            <h3 className="text-[16px] md:text-[18px] font-medium text-black uppercase mb-8 tracking-wide">
              {categoryBlock.category}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12">

              {categoryBlock.items.map((item) => (

                <div key={item._id} className="flex flex-col group cursor-pointer">

                  {/* Image Container */}
                  <div className="relative p-2 mb-4 transition-transform duration-300 group-hover:-translate-y-2">

                    {/* Brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-black pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-black pointer-events-none" />

                    {/* White Box (THIS was missing) */}
                    <div className="w-full aspect-square bg-white flex items-center justify-center p-6 shadow-sm border border-gray-100">

                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Name */}
                  <p className="text-[11px] md:text-[12px] font-semibold text-black uppercase px-2 tracking-wide opacity-90 group-hover:opacity-100">
                    {item.name}
                  </p>

                </div>

              ))}

            </div>

          </section>
        ))}

      </div>

    </main>
  );
}