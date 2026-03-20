"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";


export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      
      <AdminSidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        
        <AdminHeader />

        <div className="overflow-x-auto h-[88vh] p-6">
          {children}
        </div>

      </div>
    </div>
  );
}