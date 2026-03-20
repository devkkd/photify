"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  reorderPackages,
  checkAuth // Imported checkAuth
} from "@/lib/api";
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSave, 
  FiX, 
  FiCheck, 
  FiClock, 
  FiStar,
  FiPackage,
  FiLoader // Imported loader icon
} from "react-icons/fi";

export default function AdminPackages() {
  const router = useRouter();

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [packages, setPackages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    features: "",
    perfectFor: ""
  });

  const [editingId, setEditingId] = useState(null);

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
  useEffect(() => {
    if (!isAuthLoading) {
      fetchPackages();
    }
  }, [isAuthLoading]);

  const fetchPackages = async () => {
    try {
      const res = await getPackages();
      setPackages(res.data);
    } catch (err) {
      console.error("Failed to fetch packages", err);
    }
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= CLEAN ARRAY =================
  const cleanArray = (str) => {
    return str
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const featuresArr = cleanArray(form.features);
    const perfectArr = cleanArray(form.perfectFor);

    if (
      !form.title.trim() ||
      !form.price.trim() ||
      !form.duration.trim() ||
      featuresArr.length === 0 ||
      perfectArr.length === 0
    ) {
      alert("Please fill all fields properly with comma-separated lists.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      price: form.price.trim(),
      duration: form.duration.trim(),
      features: featuresArr,
      perfectFor: perfectArr
    };

    try {
      if (editingId) {
        await updatePackage(editingId, payload);
      } else {
        await createPackage(payload);
      }

      resetForm();
      fetchPackages();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      price: "",
      duration: "",
      features: "",
      perfectFor: ""
    });
    setEditingId(null);
  };

  // ================= EDIT =================
  const handleEdit = (pkg) => {
    setEditingId(pkg._id);
    setForm({
      title: pkg.title,
      price: pkg.price,
      duration: pkg.duration,
      features: pkg.features.join(", "),
      perfectFor: pkg.perfectFor.join(", ")
    });
    // Scroll to top smoothly so the user sees the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete this package?")) return;
    await deletePackage(id);
    setPackages((prev) => prev.filter((p) => p._id !== id));
  };

  // ================= DRAG & DROP REORDER =================
  const handleDrag = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = async (e, index) => {
    const dragIndex = e.dataTransfer.getData("index");
    if (dragIndex === null || dragIndex === "") return;

    const updated = [...packages];
    const dragged = updated.splice(Number(dragIndex), 1)[0];
    updated.splice(index, 0, dragged);

    setPackages(updated);

    const payload = updated.map((item, i) => ({
      id: item._id,
      order: i
    }));

    try {
      await reorderPackages({ items: payload });
    } catch (err) {
      console.error("Reorder failed:", err);
    }
  };

  // Reusable input class
  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4F41]/20 focus:border-[#1D4F41] transition-all bg-gray-50/50 focus:bg-white";

  // ================= LOADING STATE =================
  if (isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <FiLoader className="w-8 h-8 text-[#1D4F41] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-6 text-gray-800 pb-20">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Package Manager</h1>
        <p className="text-sm text-gray-500 mt-1">Create and manage pricing tiers and packages.</p>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 transition-all">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FiPackage className="text-[#1D4F41]" /> 
            {editingId ? "Edit Package" : "Create New Package"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          
          {/* Row 1: Title, Price, Duration */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Package Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Premium Wedding"
              className={inputClass}
            />
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. ₹10,000"
              className={inputClass}
            />
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Duration</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g. 4 Hours"
              className={inputClass}
            />
          </div>

          {/* Row 2: Features */}
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Features (Comma Separated)</label>
            <textarea
              name="features"
              rows="2"
              value={form.features}
              onChange={handleChange}
              placeholder="e.g. Unlimited setups, Relaxed shooting, All props included"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Row 3: Perfect For */}
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Perfect For (Comma Separated)</label>
            <input
              name="perfectFor"
              value={form.perfectFor}
              onChange={handleChange}
              placeholder="e.g. Newborns, Families, Maternity"
              className={inputClass}
            />
          </div>
        </div>

        {/* Action Buttons (Bottom Right) */}
        <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-end gap-3">
          {editingId && (
            <button
              onClick={resetForm}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2"
            >
              <FiX className="w-4 h-4" /> Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="bg-[#1D4F41] hover:bg-[#163d34] text-white px-8 py-2.5 rounded-xl font-medium transition-all shadow-sm flex items-center gap-2"
          >
            {editingId ? <><FiSave className="w-4 h-4" /> Save Changes</> : <><FiPlus className="w-4 h-4" /> Create Package</>}
          </button>
        </div>
      </div>

      {/* PACKAGE GRID (Spans full width, cleanly breaking into 4 columns) */}
      <div className="w-full">
        {packages.length === 0 ? (
          <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-gray-900 font-medium">No packages created</h3>
              <p className="text-gray-500 text-sm mt-1">Use the form above to create your first pricing tier.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            {packages.map((pkg, index) => (
              <div
                key={pkg._id}
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
                className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col cursor-move group h-full break-words"
                title="Drag to reorder"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">{pkg.title}</h3>
                  <div className="flex items-baseline gap-1 text-[#1D4F41]">
                    <span className="text-3xl font-black tracking-tight">{pkg.price}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-3 font-medium">
                    <FiClock className="w-4 h-4 shrink-0" />
                    {pkg.duration}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col gap-6">
                  
                  {/* Features */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Includes</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-snug">
                          <FiCheck className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Perfect For */}
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Perfect For</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.perfectFor.map((p, i) => (
                        <span key={i} className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-md text-xs font-medium">
                          <FiStar className="w-3 h-3 shrink-0" />
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Overlay */}
                <div className="absolute top-4 right-4 flex gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="p-2 bg-white text-gray-600 hover:text-[#1D4F41] shadow-sm border border-gray-200 hover:border-[#1D4F41] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="p-2 bg-white text-gray-600 hover:text-red-600 shadow-sm border border-gray-200 hover:border-red-500 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}