"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getClientVideos,
  createClientVideo,
  deleteClientVideo,
  checkAuth // Imported checkAuth
} from "@/lib/api";
import { 
  FiVideo, 
  FiTrash2, 
  FiUploadCloud, 
  FiImage, 
  FiMessageSquare, 
  FiAtSign,
  FiLoader
} from "react-icons/fi";

export default function ClientVideosAdmin() {
  const router = useRouter();

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ review: "", handle: "" });
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
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
      const res = await getClientVideos();
      setData(res.data || []);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    }
  };

  useEffect(() => {
    if (!isAuthLoading) {
      fetchData();
    }
  }, [isAuthLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) return alert("Please select a video file");

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("review", form.review);
    formData.append("handle", form.handle);
    formData.append("video", video);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await createClientVideo(formData);
      setForm({ review: "", handle: "" });
      setVideo(null);
      setThumbnail(null);
      // Reset file inputs visually
      e.target.reset();
      fetchData();
    } catch (err) {
      alert("Upload failed. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this video testimonial?")) {
      await deleteClientVideo(id);
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
          <FiVideo className="text-[#1D4F41]" />
          Video Testimonials
        </h1>
        <p className="text-gray-800 mt-2">Manage your high-conversion video content and reviews.</p>
      </div>

      {/* UPLOAD FORM */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-12"
      >
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiUploadCloud className="text-[#1D4F41]" />
          Upload New Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FiMessageSquare className="text-gray-800" /> Client Review
            </label>
            <textarea
              placeholder="What did they say about your service?"
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              className="border text-gray-700 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#1D4F41]/20 focus:border-[#1D4F41] transition-all bg-gray-50/50 min-h-[100px]"
              required
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiAtSign className="text-gray-800" /> Client Handle
              </label>
              <input
                placeholder="e.g. john_doe"
                value={form.handle}
                onChange={(e) => setForm({ ...form, handle: e.target.value })}
                className="border text-gray-700 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#1D4F41]/20 focus:border-[#1D4F41] transition-all bg-gray-50/50"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-800 uppercase">Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                  className="text-xs text-gray-800 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#1D4F41]/10 file:text-[#1D4F41] cursor-pointer"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-800 uppercase">Thumbnail (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="text-xs text-gray-800 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-10 py-3 bg-[#1D4F41] text-white font-bold rounded-xl shadow-md hover:bg-[#153a30] active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSubmitting ? "Processing..." : "Upload Video Testimonial"}
        </button>
      </form>

      {/* VIDEO LIST */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">Existing Videos ({data.length})</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.map((item) => (
          <div key={item._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
            
            <div className="relative aspect-video bg-black">
              <video
                src={item.video}
                poster={item.thumbnail}
                className="w-full h-full object-cover"
                onMouseOver={e => e.target.play()}
                onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                muted
              />
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md pointer-events-none">
                PREVIEW ON HOVER
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-gray-800 text-sm font-medium italic leading-relaxed line-clamp-3">
                    "{item.review}"
                  </p>
                  <p className="text-[#1D4F41] font-bold text-xs mt-3 uppercase tracking-wider">
                    @{item.handle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item._id)}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <FiTrash2 /> Remove Video
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}