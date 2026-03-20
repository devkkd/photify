"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  FiGrid, 
  FiBriefcase, 
  FiImage, 
  FiFolder, 
  FiCamera, 
  FiPackage 
} from "react-icons/fi";


export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: FiGrid },
    { name: "Services", href: "/admin/services", icon: FiBriefcase },
    { name: "Service Gallery", href: "/admin/service-gallery", icon: FiImage },
    { name: "Portfolio", href: "/admin/portfolio", icon: FiFolder },
    { name: "Backdrops", href: "/admin/backdrops", icon: FiCamera },
    { name: "Packages", href: "/admin/packages", icon: FiPackage },
  ];

  return (
    <aside className="w-72 bg-[#1D4F41] text-white p-6 flex flex-col min-h-screen border-r border-[#163d34]">
      
      {/* Logo */}
      <div className="mb-12 mx-auto flex items-center pl-2">
        <img
          src="/images/logo.png" 
          alt="Admin Logo" 
          width={140} 
          height={40} 
          className="h-10 w-auto object-contain"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <span className="text-xs font-semibold text-[#8ebaa9] tracking-wider uppercase mb-3 pl-3">
          Menu
        </span>
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out font-medium text-sm ${
                isActive
                  ? "bg-white text-[#1D4F41] shadow-md transform scale-[1.02]"
                  : "text-gray-200 hover:bg-[#163d34] hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#1D4F41]" : "text-[#8ebaa9]"}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}