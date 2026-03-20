"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/api";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await adminLogin({ email, password });

      if (res.status === 200) {
        router.push("/admin");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1D4F41] p-6 relative overflow-hidden">
      
      {/* BACKGROUND AMBIENT GLOWS */}
      <div className="absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] top-[-200px] left-[-200px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-black/20 rounded-full blur-[100px] bottom-[-150px] right-[-150px] pointer-events-none" />

      {/* CENTERED WRAPPER */}
      <div className="w-1/2 max-w-md relative z-10">
        
        {/* BRANDING */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Photify Studios
          </h1>
          <p className="text-white/70 mt-2 text-sm font-medium">
            Admin Dashboard
          </p>
        </div>

        {/* WHITE LOGIN CARD */}
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col gap-6 border border-white/20"
        >
          {/* Heading */}
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-800 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-semibold">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="left-4 top-1/2 -translate-y-1/2 text-gray-800 w-5 h-5" />
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full p-3 border border-gray-200 focus:border-[#1D4F41] focus:ring-2 focus:ring-[#1D4F41]/20 outline-none py-3.5 pl-12 pr-4 rounded-xl transition-all bg-gray-50 focus:bg-white text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-semibold">
              Password
            </label>
            <div className="relative">
              <FiLock className="left-4 top-1/2 -translate-y-1/2 text-gray-800 w-5 h-5" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border p-3 border-gray-200 focus:border-[#1D4F41] focus:ring-2 focus:ring-[#1D4F41]/20 outline-none py-3.5 pl-12 pr-4 rounded-xl transition-all bg-gray-50 focus:bg-white text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 w-full bg-[#1D4F41] hover:bg-[#163d34] text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Sign In <FiLogIn className="w-5 h-5" />
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-white/50 mt-8 font-medium">
          © {new Date().getFullYear()} Photify Studios. All rights reserved.
        </p>
        
      </div>
    </div>
  );
}