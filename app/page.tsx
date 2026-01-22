/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const carouselCars = [
  { id: 1, name: "Hyundai Creta", image: "/cr1.png", price: 2200 },
  { id: 2, name: "Tata Nexon", image: "/nex1.png", price: 2000 },
  { id: 3, name: "Maruti Brezza", image: "/br1.png", price: 1800 },
];

const featuredCar = {
  name: "Mahindra Thar",
  image: "../thar.png",
  desc: "Powerful SUV for adventure trips. 4x4 drive, diesel engine, perfect for hills & long rides.",
  fuel: "Diesel",
  gear: "Manual",
  price: 2800,
};

export default function DashboardPage() {
  const [active, setActive] = useState(0);
  const router = useRouter(); // ✅ FIX: hook inside component

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Welcome Back 👋</h1>
        <p className="text-slate-500 text-sm">Find the perfect car for your next journey</p>
      </div>

      {/* CAROUSEL */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow mb-8">
        <h2 className="font-semibold text-slate-700 mb-3">Popular Cars</h2>

        <div className="relative overflow-hidden h-[300px] rounded-xl">
          <div
            className="flex h-full transition-transform duration-700"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {carouselCars.map(car => (
              <div key={car.id} className="min-w-full h-full relative">
                <img src={car.image} className="w-full h-full object-cover" />

                {/* BLUR OVERLAY */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold">{car.name}</h3>
                    <p className="text-indigo-200 font-semibold">
                      Starting at ₹{car.price}/day
                    </p>
                    <p className="text-sm text-gray-200 mt-1">
                      Premium comfort • Best mileage • Safe ride
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DOTS */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselCars.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full ${
                  active === i ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED CAR + QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* FEATURED */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Featured Car</h2>

          <div className="flex flex-col md:flex-row gap-6">
            <img src={featuredCar.image} className="h-48 object-contain" />

            <div>
              <h3 className="text-xl font-bold">{featuredCar.name}</h3>
              <p className="text-sm text-slate-600 mt-2">{featuredCar.desc}</p>

              <div className="flex gap-4 mt-4 text-sm text-slate-600">
                <span>⛽ {featuredCar.fuel}</span>
                <span>⚙ {featuredCar.gear}</span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{featuredCar.price}/day
                </span>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow">
          <h3 className="font-semibold mb-4">Quick Actions</h3>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-indigo-100 text-indigo-700 p-3 rounded-lg"
            >
              🚗 Browse Cars
            </button>

            <button
              onClick={() => router.push("/wishlist")}
              className="w-full bg-purple-100 text-purple-700 p-3 rounded-lg"
            >
              ❤️ Wishlist
            </button>

            <button
              onClick={() => router.push("/my-bookings")}
              className="w-full bg-emerald-100 text-emerald-700 p-3 rounded-lg"
            >
              📅 My Bookings
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow">
          <h4 className="text-sm text-slate-500">Total Cars</h4>
          <p className="text-xl font-bold text-indigo-600">120+</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h4 className="text-sm text-slate-500">Active Bookings</h4>
          <p className="text-xl font-bold text-purple-600">3</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h4 className="text-sm text-slate-500">Wishlist</h4>
          <p className="text-xl font-bold text-pink-600">5</p>
        </div>
      </div>

    </div>
  );
}
