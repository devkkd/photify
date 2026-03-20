"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  getServices,
  getPortfolio,
  getBackdrops,
  getPackages,
  getAllServiceGallery,
  checkAuth
} from "@/lib/api";

import {
  FiBriefcase,
  FiImage,
  FiCamera,
  FiPackage,
  FiArrowRight,
  FiLoader,
  FiClock
} from "react-icons/fi";

export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState({
    services: 0,
    portfolio: 0,
    backdrops: 0,
    packages: 0,
  });

  const [recentPortfolio, setRecentPortfolio] = useState([]);
  const [recentServiceGallery, setRecentServiceGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // 🔐 STEP 1: AUTH CHECK FIRST
      try {
        await checkAuth();
      } catch (err) {
        router.push("/admin-login"); // redirect to login
        return;
      }

      // 📊 STEP 2: FETCH DATA
      try {
        const [
          servicesRes,
          portfolioRes,
          backdropsRes,
          packagesRes,
        ] = await Promise.all([
          getServices(),
          getPortfolio(),
          getBackdrops(),
          getPackages(),
        ]);

        setStats({
          services: servicesRes.data?.length || 0,
          portfolio: portfolioRes.data?.length || 0,
          backdrops: backdropsRes.data?.length || 0,
          packages: packagesRes.data?.length || 0,
        });

        // 🔥 FIX: SHOW LATEST (reverse)
        const portfolioImages = portfolioRes.data || [];
        setRecentPortfolio([...portfolioImages].reverse().slice(0, 5));

        // Service Gallery
        try {
          const sgRes = await getAllServiceGallery();
          const sgImages = sgRes.data || [];
          setRecentServiceGallery([...sgImages].reverse().slice(0, 5));
        } catch (err) {
          console.warn("Service gallery fetch failed");
        }

      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <FiLoader className="w-8 h-8 text-[#1D4F41] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-6 text-gray-800 pb-20">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome back, Admin
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here is what's happening with your studio today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total Services"
          value={stats.services}
          href="/admin/services"
          icon={FiBriefcase}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Portfolio Images"
          value={stats.portfolio}
          href="/admin/portfolio"
          icon={FiImage}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Backdrops"
          value={stats.backdrops}
          href="/admin/backdrops"
          icon={FiCamera}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Packages"
          value={stats.packages}
          href="/admin/packages"
          icon={FiPackage}
          iconColor="text-[#1D4F41]"
          iconBg="bg-[#1D4F41]/10"
        />
      </div>

      {/* Recent Uploads */}
      <div className="space-y-10">

        {/* Portfolio */}
        <Section
          title="Recently Uploaded to Portfolio"
          link="/admin/portfolio"
          images={recentPortfolio}
          emptyMessage="No portfolio images uploaded yet."
        />

        {/* Service Gallery */}
        <Section
          title="Recently Uploaded to Service Gallery"
          link="/admin/service-gallery"
          images={recentServiceGallery}
          emptyMessage="No service gallery images uploaded yet."
        />

      </div>
    </div>
  );
}

// ================= COMPONENTS =================

function StatCard({ title, value, href, icon: Icon, iconColor, iconBg }) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 group block h-40 flex flex-col justify-between relative overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>

        <FiArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#1D4F41] transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>

      <div>
        <h2 className="text-3xl font-black tracking-tight text-gray-800">{value}</h2>
        <p className="text-sm font-semibold text-gray-500 mt-0.5 uppercase tracking-wide">{title}</p>
      </div>
    </Link>
  );
}

function Section({ title, link, images, emptyMessage }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FiClock className="text-[#1D4F41]" /> {title}
        </h2>

        <Link href={link} className="text-sm text-[#1D4F41] font-medium hover:underline flex items-center gap-1">
          View All <FiArrowRight />
        </Link>
      </div>

      <ImageGrid images={images} emptyMessage={emptyMessage} />
    </div>
  );
}

function ImageGrid({ images, emptyMessage }) {
  if (!images || images.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {images.map((img, i) => (
        <div key={img._id || i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
          <img
            src={img.image || img.url || img}
            alt={`Recent upload ${i + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}