"use client";

import { useParams } from "next/navigation";
import { carsData } from "../../page";
import { useState } from "react";

export default function BookCarPage() {
  const { id } = useParams();
  const car = carsData.find((c) => c.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    pickupLocation: "",
  });

  if (!car) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">

        {/* HEADER */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Book {car.name}
          </h1>
          <p className="text-slate-600 mt-1">
            ₹{car.price}/day • {car.brand} • {car.model}
          </p>
        </div>

        {/* FORM */}
        <form className="grid md:grid-cols-2 gap-6">

          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Name as per ID proof
            </p>
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              placeholder="10 digit mobile number"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              We will contact you on this number
            </p>
          </div>

          {/* EMAIL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              placeholder="example@gmail.com"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Booking confirmation will be sent here
            </p>
          </div>

          {/* PICKUP DATE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Pickup Date
            </label>
            <input
              type="date"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* PICKUP TIME */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Pickup Time
            </label>
            <input
              type="time"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* DROP DATE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Drop-off Date
            </label>
            <input
              type="date"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* DROP TIME */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Drop-off Time
            </label>
            <input
              type="time"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* PICKUP LOCATION */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Pickup Location
            </label>
            <input
              placeholder="Hotel, airport, railway station or address"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Our driver will reach this location
            </p>
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2 pt-4">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transition"
            >
              Confirm Booking
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
