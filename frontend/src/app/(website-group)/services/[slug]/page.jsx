// src/app/services/[slug]/page.jsx

import Image from "next/image";
import { notFound } from "next/navigation";
import FAQSection from "@/components/FAQ";

import { getServiceBySlug, getServiceGallery } from "@/lib/api";

export default async function ServicePage({ params }) {

    const { slug } = await params;

    try {

        // fetch service
        const serviceRes = await getServiceBySlug(slug);
        const service = serviceRes.data;

        if (!service) {
            notFound();
        }

        // fetch gallery
        const galleryRes = await getServiceGallery(service._id);
        const gallery = galleryRes.data || [];

        return (
            <>
                <main className="w-full bg-white pb-24 pt-32">

                    {/* Header Section */}
                    <div className="max-w-5xl mx-auto px-6 text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">
                            {service.title}
                        </h1>
                        <p className="text-black text-[14px] md:text-[16px] font-medium leading-relaxed max-w-4xl mx-auto">
                            {service.subtitle}
                        </p>
                    </div>

                    {/* Banner Image */}
                    <div className="w-full h-[400px] md:h-[600px] relative mb-20">
                        <Image
                            src={service.bannerImage}
                            alt={service.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="max-w-[1300px] mx-auto px-6">

                        {/* --- WHAT WE OFFER --- */}
                        <div className="mb-24">
                            <h2 className="text-2xl md:text-4xl font-bold text-black text-center mb-12">
                                What We Offer
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {service.offers.map((offer, idx) => (
                                    <div key={idx} className="relative p-2 h-full">
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-black" />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-black" />

                                        <div className="bg-[#111111] text-white p-8 h-full">
                                            <h3 className="text-[18px] md:text-[20px] font-semibold mb-4">
                                                {offer.title}
                                            </h3>
                                            <p className="text-[13px] md:text-[14px] text-gray-300 leading-relaxed">
                                                {offer.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- WHAT MAKES IT SPECIAL --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24 items-stretch">

                            {/* Left Text Box */}
                            <div className="relative p-2 h-full">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-black" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-black" />

                                <div className="bg-white border border-gray-100 p-8 md:p-12 h-full shadow-sm">
                                    <h2 className="text-xl md:text-3xl font-bold text-black mb-10">
                                        {service.specialSection.title}
                                    </h2>

                                    <ul className="space-y-6">
                                        {service.specialSection.points.map((point, idx) => (
                                            <li key={idx} className="flex items-start text-[13px] md:text-[14px] text-black leading-relaxed">
                                                <span className="font-bold mr-2 text-black">✓</span>
                                                <p>
                                                    <strong className="font-bold">{point.title}</strong> - {point.text}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="relative p-2 h-[400px] lg:h-auto">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-black z-10" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-black z-10" />

                                <div className="relative w-full h-full">
                                    <Image
                                        src={service.specialSection.image}
                                        alt="Special Setup"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- GALLERY SECTION --- */}
                        {gallery.length > 0 && (
                            <div>
                                <h2 className="text-2xl md:text-4xl font-bold text-black text-center mb-12">
                                    Photify {service.title}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {gallery.map((img, idx) => (
                                        <div key={idx} className="relative p-3 aspect-[3/4]">

                                            {/* Corner Brackets */}
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t-[1px] border-l-[1px] border-black z-10" />
                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1px] border-r-[1px] border-black z-10" />

                                            <div className="relative w-full h-full bg-gray-100">
                                                <Image
                                                    src={img.image}
                                                    alt={`${service.title} Gallery Image ${idx + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </main>

                <FAQSection />
            </>
        );

    } catch (error) {
        console.error(error);
        notFound();
    }
}