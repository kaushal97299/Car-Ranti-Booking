"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ================== PAGINATION ================== */
const ITEMS_PER_PAGE = 8;

export default function CarsPage() {
  const router = useRouter();

  /* ================= TOKEN ================= */
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ================= DATA ================= */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [carsData, setCarsData] = useState<any[]>([]);

  // ✅ Store both carId + wishlistId
  const [wishlist, setWishlist] = useState<
    { carId: string; wishlistId: string }[]
  >([]);

  const [loading, setLoading] = useState(true);

  /* ================= FILTER STATES ================= */
  const [search, setSearch] = useState("");
  const [gear, setGear] = useState("");
  const [fuel, setFuel] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH CARS ================= */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/inventory`
        );

        const data = await res.json();

        setCarsData(data);

      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchCars();
  }, []);

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) return;

        const data = await res.json();

        // ✅ Save carId + wishlistId
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted = data.map((i: any) => ({
          carId: i.car._id,
          wishlistId: i._id,
        }));

        setWishlist(formatted);

      } catch (err) {
        console.log("Wishlist error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token]);

  /* ================= TOGGLE WISHLIST ================= */
  const toggleWishlist = async (carId: string) => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      const exist = wishlist.find(
        (w) => w.carId === carId
      );

      /* ========== REMOVE ========== */
      if (exist) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${exist.wishlistId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setWishlist((prev) =>
          prev.filter((w) => w.carId !== carId)
        );
      }

      /* ========== ADD ========== */
      else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ carId }),
          }
        );

        const data = await res.json();

        setWishlist((prev) => [
          ...prev,
          {
            carId,
            wishlistId: data._id,
          },
        ]);
      }

      /* 🔔 Update Sidebar */
      window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (err) {
      console.log("Wishlist toggle error:", err);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading cars...
      </div>
    );
  }

  /* ================= FILTER ================= */

  const modelsByBrand = [
    ...new Set(
      carsData
        .filter((c) => !brand || c.brand === brand)
        .map((c) => c.model)
    ),
  ];

  const filteredCars = carsData.filter(
  (c) =>
    (
      !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.brand?.toLowerCase().includes(search.toLowerCase()) ||
      c.model?.toLowerCase().includes(search.toLowerCase())
    ) &&
    (!gear || c.gear === gear) &&
    (!fuel || c.fuel === fuel) &&
    (!brand || c.brand === brand) &&
    (!model || c.model === model) &&
    (!minPrice || c.price >= Number(minPrice)) &&
    (!maxPrice || c.price <= Number(maxPrice))
);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(
    filteredCars.length / ITEMS_PER_PAGE
  );

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white">

      {/* ================= SEARCH ================= */}
      <input
        placeholder="Search car, brand or model..."
        className="w-full mb-4 p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 text-white placeholder:text-gray-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ================= FILTER BAR ================= */}
      <div className="sticky top-0 z-30 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-lg flex flex-wrap gap-3 mb-6">

        <select
          className="p-2 rounded-lg bg-white/10 border border-white/10 text-white"
          value={gear}
          onChange={(e) => setGear(e.target.value)}
        >
          <option value="">Gear</option>
          <option>Manual</option>
          <option>Automatic</option>
        </select>

        <select
          className="p-2 rounded-lg bg-white/10 border border-white/10 text-white"
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
        >
          <option value="">Fuel</option>
          <option>Petrol</option>
          <option>Diesel</option>
        </select>

        <select
          className="p-2 rounded-lg bg-white/10 border border-white/10 text-white"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setModel("");
          }}
        >
          <option value="">Brand</option>

          {[...new Set(carsData.map((c) => c.brand))].map(
            (b) => (
              <option key={b}>{b}</option>
            )
          )}
        </select>

        <select
          className="p-2 rounded-lg bg-white/10 border border-white/10 text-white"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={!brand}
        >
          <option value="">Model</option>

          {modelsByBrand.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min ₹"
          className="p-2 w-24 rounded-lg bg-white/10 border border-white/10 text-white"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max ₹"
          className="p-2 w-24 rounded-lg bg-white/10 border border-white/10 text-white"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {paginatedCars.map((car) => (

          <div
            key={car._id}
            className="
              bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow
              transition-all duration-300
              hover:bg-white/10
              hover:shadow-xl
              border border-white/60
            "
          >

            <div className="relative">

              {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
              <img
  src={car.image?.startsWith("http") 
    ? car.image 
    : `${process.env.NEXT_PUBLIC_API_URL}${car.image}`}
  className="h-40 w-full object-contain"
/>

              {/* ❤️ Wishlist */}
              <button
                onClick={() => toggleWishlist(car._id)}
                className="absolute top-2 right-2 bg-white/20 backdrop-blur rounded-full p-1 shadow"
              >
                {wishlist.some(w => w.carId === car._id)
                  ? "❤️"
                  : "🤍"}
              </button>

            </div>

            <div className="p-4">

              <h3 className="font-semibold text-white">{car.name}</h3>

              <p className="text-xs text-gray-400">
                {car.brand} • {car.model}
              </p>

              <p className="text-xs text-amber-500 mt-1">
                ⭐ {car.rating || 4.5} ({car.reviews || 100})
              </p>

              <div className="flex justify-between items-center mt-3">

                <span className="text-lg font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  ₹{car.price}/day
                </span>

                <button
                  onClick={() =>
                    router.push(`/dashboard/${car._id}`)
                  }
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1.5 rounded-lg text-sm shadow"
                >
                  Book
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (

        <div className="flex justify-center mt-8 gap-2">

          {Array.from({ length: totalPages }).map(
            (_, i) => (

              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow"
                    : "bg-white/10 hover:bg-white/20 border border-white/10/10 shadow"
                }`}
              >
                {i + 1}
              </button>

            )
          )}
        </div>
      )}

    </div>
  );
}