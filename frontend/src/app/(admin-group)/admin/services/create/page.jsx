"use client";

import { useEffect, useState } from "react";
import { createService, checkAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { 
  FiPlus, 
  FiTrash2, 
  FiUploadCloud, 
  FiImage, 
  FiSave,
  FiArrowLeft,
  FiLoader
} from "react-icons/fi";

export default function CreateServicePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    subtitle: "", // Used as Description
  });

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const [offers, setOffers] = useState([
    { title: "", description: "" },
  ]);

  const [specialSection, setSpecialSection] = useState({
    title: "",
    image: null,
    points: [{ title: "", text: "" }],
  });

  const [specialPreview, setSpecialPreview] = useState(null);

  // ================= AUTH CHECK =================
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
        setLoading(false); // Auth passed, show the page
      } catch (err) {
        console.error("Auth failed, redirecting to login...");
        router.push("/admin-login");
      }
    };

    verifyAuth();
  }, [router]);

    // ================= DYNAMIC SLUG GENERATION =================
    const handleNameChange = (e) => {
        const newName = e.target.value;
        // Auto-generate slug: lowercase, replace spaces/special chars with hyphens
        const generatedSlug = newName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

        setForm({ ...form, title: newName, slug: generatedSlug });
    };

    // ================= VALIDATION =================
    const validateFile = (file) => {
        if (!file) return false;

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!validTypes.includes(file.type)) {
            alert("Only JPG, PNG, WEBP allowed");
            return false;
        }

        if (file.size > maxSize) {
            alert("Image must be under 2MB");
            return false;
        }

        return true;
    };

    // ================= IMAGE HANDLERS =================
    const handleBannerChange = (file) => {
        if (!validateFile(file)) return;
        setBannerImage(file);
        setBannerPreview(URL.createObjectURL(file));
    };

    const removeBanner = () => {
        setBannerImage(null);
        setBannerPreview(null);
    };

    const handleSpecialImage = (file) => {
        if (!validateFile(file)) return;
        setSpecialSection({ ...specialSection, image: file });
        setSpecialPreview(URL.createObjectURL(file));
    };

    const removeSpecialImage = () => {
        setSpecialSection({ ...specialSection, image: null });
        setSpecialPreview(null);
    };

    // ================= OFFERS =================
    const handleOfferChange = (index, field, value) => {
        const updated = [...offers];
        updated[index][field] = value;
        setOffers(updated);
    };

    const addOffer = () => {
        if (offers.length >= 6) return;
        setOffers([...offers, { title: "", description: "" }]);
    };

    const removeOffer = (index) => {
        setOffers(offers.filter((_, i) => i !== index));
    };

    // ================= POINTS =================
    const handlePointChange = (index, field, value) => {
        const updated = [...specialSection.points];
        updated[index][field] = value;
        setSpecialSection({ ...specialSection, points: updated });
    };

    const addPoint = () => {
        if (specialSection.points.length >= 6) return;
        setSpecialSection({
            ...specialSection,
            points: [...specialSection.points, { title: "", text: "" }],
        });
    };

    const removePoint = (index) => {
        setSpecialSection({
            ...specialSection,
            points: specialSection.points.filter((_, i) => i !== index),
        });
    };

    // ================= SUBMIT =================
    const handleSubmit = async () => {
        try {
            const data = new FormData();

            data.append("title", form.title);
            data.append("slug", form.slug);
            data.append("subtitle", form.subtitle);

            if (bannerImage) data.append("bannerImage", bannerImage);

            data.append("offers", JSON.stringify(offers));
            data.append("specialTitle", specialSection.title);
            data.append("specialPoints", JSON.stringify(specialSection.points));

            if (specialSection.image) data.append("specialImage", specialSection.image);

            await createService(data);

            alert("Service created successfully!");
            router.push("/admin/services");

        } catch (err) {
            console.log(err);
            alert("Error creating service");
        }
    };

    // cleanup
    useEffect(() => {
        return () => {
            if (bannerPreview) URL.revokeObjectURL(bannerPreview);
            if (specialPreview) URL.revokeObjectURL(specialPreview);
        };
    }, [bannerPreview, specialPreview]);

    // Reusable input class
    const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4F41]/20 focus:border-[#1D4F41] transition-all bg-gray-50/50 focus:bg-white";

    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-800 pb-20">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-500"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create Service</h1>
                        <p className="text-sm text-gray-500 mt-1">Add a new photography service to your offerings.</p>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-[#1D4F41] hover:bg-[#163d34] text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm"
                >
                    <FiSave className="w-5 h-5" />
                    Publish Service
                </button>
            </div>

            <div className="space-y-6">

                {/* BASIC INFO */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Name</label>
                            <input
                                placeholder="e.g. Wedding Photography"
                                className={inputClass}
                                value={form.title}
                                onChange={handleNameChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Slug (Auto-generated)</label>
                            <div className="flex items-center px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 select-none">
                                <span className="text-gray-400 mr-1">/services/</span>
                                <span className="truncate">{form.slug || "..."}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                        <textarea
                            placeholder="Briefly describe this service..."
                            rows={3}
                            className={`${inputClass} resize-none`}
                            value={form.subtitle}
                            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                        />
                    </div>
                </div>

                {/* BANNER IMAGE */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4">Banner Image</h2>

                    {!bannerPreview ? (
                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#1D4F41]/50 transition-all group">
                            <FiUploadCloud className="w-10 h-10 text-gray-400 group-hover:text-[#1D4F41] mb-3 transition-colors" />
                            <span className="text-sm font-medium text-gray-700">Click to upload banner image</span>
                            <span className="text-xs text-gray-500 mt-1">JPG, PNG or WEBP (Max 2MB)</span>
                            <input type="file" hidden onChange={(e) => handleBannerChange(e.target.files[0])} />
                        </label>
                    ) : (
                        <div className="relative rounded-xl overflow-hidden border border-gray-200 group bg-gray-50">
                            <img src={bannerPreview} className="w-full h-48 object-cover" alt="Banner preview" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all backdrop-blur-sm">
                                <label className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition">
                                    Replace
                                    <input type="file" hidden onChange={(e) => handleBannerChange(e.target.files[0])} />
                                </label>
                                <button onClick={removeBanner} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-lg transition">
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* OFFERS */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">What's Included (Offers)</h2>
                        <button onClick={addOffer} className="text-[#1D4F41] text-sm font-medium flex items-center gap-1 hover:underline">
                            <FiPlus /> Add Offer
                        </button>
                    </div>

                    <div className="space-y-3">
                        {offers.map((offer, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="flex flex-1 gap-3">
                                    {/* Father (Title) */}
                                    <input
                                        placeholder="Offer Title (e.g. 4 Hours Coverage)"
                                        className={`${inputClass} w-1/3 py-2 font-medium`}
                                        value={offer.title}
                                        onChange={(e) => handleOfferChange(index, "title", e.target.value)}
                                    />
                                    {/* Son (Description) */}
                                    <input
                                        placeholder="Short Description..."
                                        className={`${inputClass} w-2/3 py-2 text-gray-600`}
                                        value={offer.description}
                                        onChange={(e) => handleOfferChange(index, "description", e.target.value)}
                                    />
                                </div>
                                {/* Trash Button */}
                                <button
                                    onClick={() => removeOffer(index)}
                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                    title="Remove Offer"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SPECIAL SECTION */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4">Special Section</h2>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Section Title</label>
                        <input
                            placeholder="e.g. Why Choose Our Wedding Package?"
                            className={inputClass}
                            value={specialSection.title}
                            onChange={(e) => setSpecialSection({ ...specialSection, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Special Image */}
                        <div className="lg:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Section Image</label>
                            {!specialPreview ? (
                                <label className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group">
                                    <FiImage className="w-8 h-8 text-gray-400 group-hover:text-[#1D4F41] mb-2" />
                                    <span className="text-xs font-medium text-gray-600">Upload Image</span>
                                    <input type="file" hidden onChange={(e) => handleSpecialImage(e.target.files[0])} />
                                </label>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden border border-gray-200 h-40 group">
                                    <img src={specialPreview} className="w-full h-full object-cover" alt="Special preview" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-sm">
                                        <button onClick={removeSpecialImage} className="bg-red-500 text-white p-2 rounded-lg">
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Special Points */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-gray-700">Highlight Points</label>
                                <button onClick={addPoint} className="text-[#1D4F41] text-xs font-medium flex items-center gap-1 hover:underline">
                                    <FiPlus /> Add Point
                                </button>
                            </div>

                            <div className="space-y-3">
                                {specialSection.points.map((point, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="flex flex-1 gap-3">
                                            {/* Father (Title) */}
                                            <input
                                                placeholder="Point Title"
                                                className={`${inputClass} w-1/3 py-2 font-medium`}
                                                value={point.title}
                                                onChange={(e) => handlePointChange(index, "title", e.target.value)}
                                            />
                                            {/* Son (Details) */}
                                            <input
                                                placeholder="Point details..."
                                                className={`${inputClass} w-2/3 py-2 text-gray-600`}
                                                value={point.text}
                                                onChange={(e) => handlePointChange(index, "text", e.target.value)}
                                            />
                                        </div>
                                        {/* Trash Button */}
                                        <button
                                            onClick={() => removePoint(index)}
                                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                            title="Remove Point"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}