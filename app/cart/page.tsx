/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const removeItem = (id: number) => {
    const updated = cart.filter((c) => c.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg mb-4">Your cart is empty</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          Browse Cars
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cart.map((car) => (
          <div
            key={car.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img src={car.image} className="h-16 object-contain" />
              <div>
                <p className="font-semibold">{car.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{car.price}/day
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/dashboard/${car.id}/book`)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Book
              </button>

              <button
                onClick={() => removeItem(car.id)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
