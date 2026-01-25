"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { carsData } from "../dashboard/page";

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<number[]>(() => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  }
  return [];
});
  useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);


  const removeFromWishlist = (id: number) => {
    const updated = wishlist.filter(i => i !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const wishlistCars = carsData.filter(car => wishlist.includes(car.id));

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100">

      <h1 className="text-2xl font-bold mb-6">❤️ My Wishlist</h1>

      {wishlistCars.length === 0 ? (
        <p>No cars in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistCars.map(car => (
            <div key={car.id} className="bg-white rounded-xl shadow p-3">
              <img src={car.image} className="h-32 w-full object-contain" />
              <div className="font-semibold mt-2">{car.name}</div>
              <div className="text-xs text-gray-500">{car.brand}</div>

              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-indigo-600">₹{car.price}/day</span>
                <button
                  onClick={() => removeFromWishlist(car.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 text-indigo-600"
      >
        ← Back to Cars
      </button>
    </div>
  );
}
