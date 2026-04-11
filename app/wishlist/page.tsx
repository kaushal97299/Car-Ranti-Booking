/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();

  /* ================= TOKEN ================= */
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = async () => {
    try {
      if (!token) return;

      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data = await res.json();

      setWishlist(data);
      setLoading(false);

      // 🔥 Update Sidebar Counter
      window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (err) {
      console.log("Wishlist fetch error:", err);
      setLoading(false);
    }
  };

  /* ================= FIRST LOAD ================= */
  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /* ================= REMOVE ================= */
  const removeFromWishlist = async (id: string) => {
    try {

      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // ✅ Update UI instantly
      setWishlist((prev) =>
        prev.filter((item) => item._id !== id)
      );

      // 🔥 Update Sidebar Counter
      window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (err) {
      console.log("Remove error:", err);
      alert("Failed to remove item");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-300 bg-[#020b0a]">
        Loading wishlist...
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white">

        <h1 className="text-2xl font-bold mb-6 text-white">
          ❤️ My Wishlist
        </h1>

        <p>No cars in wishlist</p>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 text-emerald-300"
        >
          ← Back to Cars
        </button>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white">

      <h1 className="text-2xl font-bold mb-6 text-white">
        ❤️ My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {wishlist.map((item) => (

          <div
            key={item._id}
            className="
              bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-3
              cursor-pointer
              hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all duration-300
            "
            onClick={() =>
              router.push(`/dashboard/${item.car._id}`)
            }
          >

            {/* IMAGE */}
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${item.car.image}`}
              className="h-32 w-full object-contain"
            />

            {/* NAME */}
            <div className="font-semibold mt-2">
              {item.car.name}
            </div>

            {/* BRAND */}
            <div className="text-xs text-gray-400">
              {item.car.brand}
            </div>

            <div className="flex justify-between items-center mt-3">

              {/* PRICE */}
              <span className="font-bold text-emerald-300">
                ₹{item.car.price}/day
              </span>

              {/* REMOVE */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🔴 Stop card click
                  removeFromWishlist(item._id);
                }}
                className="text-red-400 text-sm hover:text-red-300 transition"
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* BACK */}
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 text-emerald-300"
      >
        ← Back to Cars
      </button>

    </div>
  );
}