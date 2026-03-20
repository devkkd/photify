"use client";

import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/lib/api";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push("/admin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      
      {/* Left */}
      <h2 className="text-lg font-semibold text-gray-700">
        Admin Dashboard
      </h2>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Admin
        </span>

        <div className="w-8 h-8 bg-[#1D4F41] rounded-full flex items-center justify-center text-white text-sm">
          A
        </div>

        {/* 🔥 LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1.5 border border-gray-700 rounded-md hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>

    </header>
  );
}