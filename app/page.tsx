/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


const carouselCars = [
  { id: 1, name: "Hyundai Creta", image: "/cr1.png", price: 2200 },
  { id: 2, name: "Tata Nexon", image: "/nex2.png", price: 2000 },
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
  const [active, setActive] = useState(0);   // first carousel
  const [active2, setActive2] = useState(0); // second carousel
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Welcome Back 👋</h1>
        <p className="text-slate-600 text-sm">Find the perfect car for your next journey</p>
      </div>

      {/* ================= FIRST CAROUSEL (UNCHANGED) ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 shadow mb-8">
        <h2 className="font-semibold text-slate-700 mb-3">Popular Cars</h2>

        <div className="relative overflow-hidden h-[240px] md:h-[300px] rounded-xl">
          <div
            className="flex h-full transition-transform duration-700"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {carouselCars.map(car => (
              <div key={car.id} className="min-w-full h-full relative">
                <img src={car.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <p className="text-indigo-200 font-semibold">
                      ₹{car.price}/day
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

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

      {/* ================= SECOND CAROUSEL (ADDED) ================= */}
      <div className="mb-10">
        <h2 className="font-semibold text-slate-700 mb-4">Luxury Picks</h2>

        <div className="relative h-[280px] flex items-center justify-center overflow-hidden">
          {carouselCars.map((car, i) => {
            const diff = i - active2;
            const isActive = i === active2;

            return (
              <div
                key={car.id}
                className="absolute transition-all duration-700"
                style={{
                  transform: `translateX(${diff * 260}px) scale(${isActive ? 1 : 0.85})`,
                  zIndex: 20 - Math.abs(diff),
                  opacity: Math.abs(diff) > 2 ? 0 : 1,
                }}
              >
                <div className="relative w-[280px] h-[200px] rounded-3xl overflow-hidden shadow-2xl">
                  <img src={car.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 w-full p-4 text-white">
                    <h3 className="font-bold">{car.name}</h3>
                    <p className="text-indigo-200">₹{car.price}/day</p>
                    <button
                      onClick={() => router.push("/book")}
                      className="mt-2 bg-white text-slate-900 px-3 py-1 rounded-full text-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {carouselCars.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive2(i)}
              className={`h-2 rounded-full ${
                active2 === i ? "w-8 bg-indigo-600" : "w-3 bg-slate-400/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= FEATURED + QUICK ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* FEATURED */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Featured Car</h2>

          <div className="flex flex-col md:flex-row gap-6">
            <img src={featuredCar.image} className="h-44 object-contain mx-auto" />
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
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg shadow">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-4">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 p-3 rounded-xl"
            >
              🚗 Browse
            </button>

            <button
              onClick={() => router.push("/wishlist")}
              className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 p-3 rounded-xl"
            >
              ❤️ Wishlist
            </button>

            <button
              onClick={() => router.push("/my-bookings")}
              className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 p-3 rounded-xl col-span-2"
            >
              📅 My Bookings
            </button>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-2">
        <div className="min-w-[200px] bg-white rounded-xl p-4 shadow">
          <h4 className="text-sm text-slate-500">Total Cars</h4>
          <p className="text-xl font-bold text-indigo-600">120+</p>
        </div>
        <div className="min-w-[200px] bg-white rounded-xl p-4 shadow">
          <h4 className="text-sm text-slate-500">Active Bookings</h4>
          <p className="text-xl font-bold text-purple-600">3</p>
        </div>
        <div className="min-w-[200px] bg-white rounded-xl p-4 shadow">
          <h4 className="text-sm text-slate-500">Wishlist</h4>
          <p className="text-xl font-bold text-pink-600">5</p>
        </div>
      </div>

    </div>
  );
}


