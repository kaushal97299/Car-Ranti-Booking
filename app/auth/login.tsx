"use client";

import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
      
      {/* ================= LEFT SIDE (3D / VIDEO) ================= */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-800 text-white relative overflow-hidden">
        
        {/* Background animation glow */}
        <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        
        {/* 3D video / image */}
        <video
          src="/3d-car.mp4"
          autoPlay
          loop
          muted
          className="w-[80%] z-10 rounded-xl shadow-2xl"
        />

        {/* Text */}
        <div className="absolute bottom-10 text-center px-10">
          <h2 className="text-3xl font-bold mb-2">Car Booking Platform</h2>
          <p className="text-gray-200 text-sm">
            Book cars. Manage bookings. Drive smarter.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE (FORM) ================= */}
      <div className="flex items-center justify-center px-6">
        <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? "Login" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {isLogin
              ? "Welcome back, login to continue"
              : "Create your account to get started"}
          </p>

          <form className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            {isLogin ? (
              <p>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 font-semibold"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 font-semibold"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
