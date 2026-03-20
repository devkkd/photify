"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getServices, deleteService } from "@/lib/api";
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiLoader, 
  FiInbox, 
  FiImage 
} from "react-icons/fi";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // ================= FETCH =================
  const fetchServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      // Optional: Replace with a toast notification in the future
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Services</h1>
          <p className="text-md text-gray-800 mt-1">Manage and organize your photography services.</p>
        </div>

        <button
          onClick={() => router.push("/admin/services/create")}
          className="flex items-center gap-2 bg-[#1D4F41] hover:bg-[#163d34] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
        >
          <FiPlus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
          <FiLoader className="w-8 h-8 text-[#1D4F41] animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading services...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && services.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100 border-dashed">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <FiInbox className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">No services found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">Get started by creating your first service.</p>
          <button
            onClick={() => router.push("/admin/services/create")}
            className="text-[#1D4F41] font-medium hover:underline flex items-center gap-1"
          >
            <FiPlus className="w-4 h-4" /> Add a new service
          </button>
        </div>
      )}

      {/* TABLE */}
      {!loading && services.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              <thead className="bg-gray-50/80 border-b text-gray-800 border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50/50 transition-colors group">
                    
                    {/* IMAGE */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-20 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        {(service.bannerImage?.url || service.bannerImage) ? (
                          <img
                            src={service.bannerImage?.url || service.bannerImage}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiImage className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </td>

                    {/* TITLE */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-800">
                        {service.title}
                      </div>
                    </td>

                    {/* SLUG */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        /{service.slug}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        
                        {/* Edit Button */}
                        <button
                          onClick={() => router.push(`/admin/services/edit/${service._id}`)}
                          className="p-2 text-[#1D4F41] bg-[#1D4F41]/10 hover:bg-[#1D4F41]/20 rounded-lg transition-colors tooltip-trigger"
                          title="Edit Service"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="p-2 text-[#1D4F41] bg-[#1D4F41]/10 hover:bg-[#1D4F41]/20 rounded-lg transition-colors tooltip-trigger"
                          title="Delete Service"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                        
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}