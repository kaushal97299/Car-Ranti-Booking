"use client";

import { useParams, useRouter } from "next/navigation";
import { carsData } from "../page";
import { useState } from "react";

export default function CarDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [added, setAdded] = useState(false);

  const car = carsData.find((c) => c.id === Number(id));
  if (!car) return <div className="p-10">Car not found</div>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exists = cart.find((c: any) => c.id === car.id);

    if (!exists) {
      cart.push(car);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(true); // UI feedback only
    } else {
      setAdded(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">

        {/* TOP : IMAGE LEFT + DETAILS RIGHT */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={car.image}
              className="w-full max-h-96 object-contain"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-4xl font-bold">{car.name}</h1>
            <p className="text-gray-600 mt-1">{car.brand} • {car.model}</p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <p><b>Fuel:</b> {car.fuel}</p>
              <p><b>Gear:</b> {car.gear}</p>
              <p><b>Class:</b> {car.class}</p>
              <p><b>Rating:</b> ⭐ {car.rating}</p>
              <p><b>Reviews:</b> {car.reviews}</p>
              <p>
                <b>Price:</b>{" "}
                <span className="text-indigo-600 font-bold">
                  ₹{car.price}/day
                </span>
              </p>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 md:hidden text-indigo-600 underline"
            >
              {showDetails ? "Hide details" : "See all details"}
            </button>
          </div>
        </div>

        {/* ABOUT + FEATURES */}
        <div
          className={`mt-10 ${showDetails ? "block" : "hidden"} md:block`}
        >
          <h2 className="text-2xl font-bold mb-3">About this car</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {car.name} is a premium and comfortable car ideal for city rides
            and long journeys. It offers smooth handling, great mileage and
            reliable safety features for every trip.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Air Conditioning",
              "Power Steering",
              "Music System",
              "ABS & Airbags",
              "Comfort Seats",
              "Fuel Efficient Engine",
              "Smooth Suspension",
              "Large Boot Space",
              "Highway & City Ready",
            ].map((f) => (
              <div
                key={f}
                className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm"
              >
                ✔ {f}
              </div>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS (UI SAME) */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-end">

          {/* ADD TO CART (NO NAVIGATION) */}
          <button
            onClick={addToCart}
            className={`px-8 py-3 rounded-2xl font-semibold w-full md:w-auto
            ${added
              ? "bg-green-600 text-white"
              : "bg-slate-900 hover:bg-slate-800 text-white"}`}
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>

          {/* BOOK */}
          <button
            onClick={() => router.push(`/dashboard/${car.id}/book`)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-semibold shadow-lg w-full md:w-auto"
          >
            Book this car
          </button>
        </div>

      </div>
    </div>
  );
}
