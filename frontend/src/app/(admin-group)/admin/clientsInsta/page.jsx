"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
  checkAuth // Imported checkAuth
} from "@/lib/api";
import { FiTrash2, FiInstagram, FiUsers, FiUploadCloud, FiLoader } from "react-icons/fi";

export default function ClientsInstaAdmin() {
  const router = useRouter();
  
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    handle: "",
    followers: ""
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ================= AUTH CHECK =================
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
        setIsAuthLoading(false); // Auth passed, allow rendering
      } catch (err) {
        console.error("Auth failed, redirecting to login...");
        router.push("/admin-login");
      }
    };

    verifyAuth();
  }, [router]);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const res = await getTestimonials();
      setData(res.data || []);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    if (!isAuthLoading) {
      fetchData();
    }
  }, [isAuthLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Image is required");

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("handle", form.handle);
    formData.append("followers", form.followers);
    formData.append("image", image);

    try {
      await createTestimonial(formData);
      setForm({ name: "", handle: "", followers: "" });
      setImage(null);
      // Reset the file input visually
      document.getElementById("image-upload").value = "";
      fetchData();
    } catch (err) {
      console.error("Failed to upload", err);
      alert("Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      await deleteTestimonial(id);
      fetchData();
    }
  };

  // Prevent UI flash before redirecting
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <FiLoader className="text-4xl text-[#1D4F41] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
          <FiInstagram className="text-[#E1306C]" />
          Instagram Clients
        </h1>
        <p className="text-gray-800 mt-2">Manage your Instagram client testimonials and gallery.</p>
      </div>

      {/* FORM SECTION */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-12"
      >
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiUploadCloud className="text-[#1D4F41]" />
          Add New Client
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-gray-700">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold ">Client Name</label>
            <input
              placeholder="e.g. Jane Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D4F41]/20 focus:border-[#1D4F41] transition-all bg-gray-50/50"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold ">Instagram Handle</label>
            <div className="relative">
              <input
                placeholder="username"
                value={form.handle}
                onChange={(e) => setForm({ ...form, handle: e.target.value })}
                className="w-full border border-gray-200 p-3 pl-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D4F41]/20 focus:border-[#1D4F41] transition-all bg-gray-50/50"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold ">Followers Count</label>
            <input
              placeholder="e.g. 10.5K"
              value={form.followers}
              onChange={(e) => setForm({ ...form, followers: e.target.value })}
              className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D4F41]/20 focus:border-[#1D4F41] transition-all bg-gray-50/50"
              required
            />
          </div>
        </div>

        {/* File Upload Area */}
        <div className="flex flex-col gap-1.5 mb-8">
          <label className="text-sm font-semibold text-gray-800 ">Client Photo</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50 hover:bg-gray-100/50 transition-colors">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-800
                file:mr-4 file:py-2.5 file:px-6
                file:rounded-full file:border-0
                file:text-sm file:font-bold
                file:bg-[#1D4F41]/10 file:text-[#1D4F41]
                hover:file:bg-[#1D4F41]/20 file:cursor-pointer cursor-pointer"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 bg-[#1D4F41] text-white font-bold rounded-xl shadow-md shadow-[#1D4F41]/20 hover:bg-[#153a30] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            "Uploading..."
          ) : (
            <>Upload Client <FiUploadCloud /></>
          )}
        </button>
      </form>

      {/* GALLERY SECTION */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">Gallery ({data.length})</h2>
      
      {data.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-800">
          No clients added yet. Upload one above!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item) => (
            <div 
              key={item._id} 
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {/* Followers Badge */}
                {item.followers && (
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1.5">
                    <FiUsers className="text-[#1D4F41]" />
                    {item.followers}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-1">
                <p className="font-extrabold text-gray-900 text-lg leading-tight truncate">{item.name}</p>
                <p className="text-sm text-gray-800 font-medium mb-4 truncate">@{item.handle}</p>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-xl text-sm font-bold transition-colors"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}