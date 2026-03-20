"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getBackdrops,
  uploadBackdrop,
  deleteBackdrop,
  reorderBackdrop,
  checkAuth // Imported checkAuth
} from "@/lib/api";
import { 
  FiUploadCloud, 
  FiTrash2, 
  FiImage, 
  FiX, 
  FiGrid,
  FiLoader // Imported loader icon
} from "react-icons/fi";

export default function BackdropPage() {
  const router = useRouter();

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [selected, setSelected] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);

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

  // ================= LOAD =================
  useEffect(() => {
    if (!isAuthLoading) {
      fetchData();
    }
  }, [isAuthLoading]);

  const fetchData = async () => {
    try {
      const res = await getBackdrops();
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch backdrops", err);
    }
  };

  // ================= VALIDATION =================
  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      alert(`${file.name} is not a valid format (JPG, PNG, WEBP)`);
      return false;
    }
    if (file.size > maxSize) {
      alert(`${file.name} is too large (Max 2MB)`);
      return false;
    }
    return true;
  };

  // ================= UPLOAD QUEUE HANDLERS =================
  const processFiles = (newFiles) => {
    const valid = newFiles.filter(validateFile);
    setFiles((prev) => [...prev, ...valid]);
    setPreviews((prev) => [...prev, ...valid.map((f) => URL.createObjectURL(f))]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    processFiles(Array.from(e.dataTransfer.files));
  };

  const handleFiles = (e) => {
    processFiles(Array.from(e.target.files));
    e.target.value = null; // reset input
  };

  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[indexToRemove]); // cleanup memory
      return prev.filter((_, i) => i !== indexToRemove);
    });
  };

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (files.length === 0) return;

    const data = new FormData();
    files.forEach((file) => data.append("images", file));

    try {
      await uploadBackdrop(data, {
        onUploadProgress: (e) => {
          setUploadProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      // Reset queue
      setFiles([]);
      setPreviews([]);
      setUploadProgress(0);

      // Refresh gallery
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
      setUploadProgress(0);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this backdrop?")) return;
    await deleteBackdrop(id);
    setItems((prev) => prev.filter((i) => i._id !== id));
    setSelected(selected.filter(selectedId => selectedId !== id));
  };

  // ================= BULK DELETE =================
  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selected.length} backdrops?`)) return;

    await Promise.all(selected.map((id) => deleteBackdrop(id)));

    setItems((prev) => prev.filter((i) => !selected.includes(i._id)));
    setSelected([]);
  };

  // ================= DRAG REORDER =================
  const handleDrag = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDropReorder = async (e, index) => {
    const dragIndex = e.dataTransfer.getData("index");
    if (dragIndex === null || dragIndex === "") return;

    const updated = [...items];
    const dragged = updated.splice(dragIndex, 1)[0];
    updated.splice(index, 0, dragged);

    setItems(updated);

    const payload = updated.map((item, i) => ({
      id: item._id,
      order: i,
    }));

    try {
      await reorderBackdrop({ items: payload });
    } catch (err) {
      console.log("Failed to save reorder", err);
    }
  };

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
    <div className="max-w-6xl mx-auto p-6 text-gray-800 pb-20">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Backdrop Manager</h1>
        <p className="text-sm text-gray-500 mt-1">Upload and organize the backdrops available for your services.</p>
      </div>

      <div className="space-y-8">
        
        {/* UPLOAD SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiUploadCloud className="text-[#1D4F41]" /> Upload New Backdrops
          </h2>

          {/* DRAG ZONE */}
          <label 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="block border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#1D4F41]/50 transition-all group mb-4"
          >
            <div className="w-14 h-14 bg-gray-100 text-gray-400 group-hover:bg-[#1D4F41]/10 group-hover:text-[#1D4F41] rounded-full flex items-center justify-center mb-3 transition-colors">
               <FiUploadCloud className="w-6 h-6" />
            </div>
            <span className="text-base font-medium text-gray-700 mb-1">Drag & Drop Images Here</span>
            <span className="text-sm text-gray-500">or click to browse files (JPG, PNG, WEBP)</span>
            <input type="file" multiple hidden onChange={handleFiles} accept="image/jpeg, image/png, image/webp" />
          </label>

          {/* PREVIEW QUEUE */}
          {previews.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Files ready to upload ({files.length})</h3>
                  {uploadProgress > 0 && <span className="text-sm font-bold text-[#1D4F41]">{uploadProgress}%</span>}
              </div>

              {/* Progress Bar */}
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                  <div className="bg-[#1D4F41] h-2 rounded-full transition-all duration-300 ease-out" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-4">
                {previews.map((src, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-white shadow-sm">
                    <img src={src} className="w-full h-full object-cover" alt="upload preview" />
                    {!uploadProgress && (
                      <button 
                        onClick={() => removeFile(i)} 
                        className="absolute top-1 right-1 bg-red-500/90 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpload}
                disabled={uploadProgress > 0}
                className="w-full sm:w-auto bg-[#1D4F41] hover:bg-[#163d34] disabled:bg-gray-400 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm"
              >
                {uploadProgress > 0 ? "Uploading..." : "Confirm Upload"}
              </button>
            </div>
          )}
        </div>

        {/* GALLERY SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
               <FiGrid className="text-[#1D4F41]" /> Current Backdrops
               <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-2">{items.length} Images</span>
            </h2>

            {/* Bulk Actions */}
            {selected.length > 0 && (
              <div className="flex items-center gap-3 animate-fade-in">
                <span className="text-sm font-medium text-gray-600">
                  {selected.length} selected
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-red-100"
                >
                  <FiTrash2 className="w-4 h-4" /> Delete Selected
                </button>
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <FiImage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-gray-900 font-medium">No backdrops found</h3>
                <p className="text-gray-500 text-sm mt-1">Upload some images above to add to your backdrop collection.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.slice(0, visibleCount).map((item, index) => (
                  <div
                    key={item._id}
                    draggable
                    onDragStart={(e) => handleDrag(e, index)}
                    onDrop={(e) => handleDropReorder(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all aspect-square bg-gray-50 cursor-move"
                    title="Drag to reorder"
                  >
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                      alt="Backdrop"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                      
                      {/* Checkbox */}
                      <label className="cursor-pointer self-start p-1 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded transition-colors">
                         <input
                           type="checkbox"
                           className="w-4 h-4 accent-[#1D4F41] cursor-pointer"
                           checked={selected.includes(item._id)}
                           onChange={(e) => {
                             if (e.target.checked) {
                               setSelected([...selected, item._id]);
                             } else {
                               setSelected(selected.filter((id) => id !== item._id));
                             }
                           }}
                         />
                      </label>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="self-end bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                        title="Delete Backdrop"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Active Selection Outline */}
                    {selected.includes(item._id) && (
                      <div className="absolute inset-0 border-4 border-[#1D4F41] rounded-xl pointer-events-none"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* LOAD MORE */}
              {visibleCount < items.length && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-full transition-colors text-sm"
                  >
                    Load More Backdrops
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}