/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= GET TOKEN ================= */
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    try {
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await res.json();

      setCart(data);
      setLoading(false);

      /* 🔔 Update Sidebar */
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.log("Cart fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);


  /* ================= REMOVE ITEM ================= */
  const removeItem = async (cartId: string) => {
    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      /* UI update */
      setCart((prev) =>
        prev.filter((item) => item._id !== cartId)
      );

      /* 🔔 Notify Sidebar */
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.log("Remove error:", err);
    }
  };


  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg bg-[#020b0a] text-white">
        Loading cart...
      </div>
    );
  }


  /* ================= EMPTY CART ================= */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020b0a] text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white p-6">

      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow p-6">

        <h1 className="text-2xl font-bold mb-6 text-white">Your Cart</h1>

        {cart.map((item) => (

          <div
            key={item._id}
            className="flex items-center justify-between border-b border-white/10 py-4"
          >

            <div className="flex items-center gap-4">

              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.car.image}`}
                className="h-16 object-contain"
              />

              <div>
                <p className="font-semibold">{item.car.name}</p>

                <p className="text-sm text-gray-400">
                  ₹{item.car.price}/day
                </p>
              </div>

            </div>

            <div className="flex gap-2">

              {/* BOOK */}
              <button
                onClick={() =>
                  router.push(`/dashboard/${item.car._id}/book`)
                }
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg shadow-emerald-500/20"
              >
                Book
              </button>

              {/* REMOVE */}
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-400 hover:text-red-300 text-sm transition"
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