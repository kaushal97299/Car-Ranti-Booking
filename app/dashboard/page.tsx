/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ================== DATA ================== */
export const carsData = [
  { id: 1, name: "Swift", brand: "Maruti", model: "Swift", fuel: "Petrol", gear: "Manual", class: "Hatchback", price: 1200, rating: 4.5, reviews: 120, image: "../swift.png" },
  { id: 2, name: "Baleno", brand: "Maruti", model: "Baleno", fuel: "Petrol", gear: "Manual", class: "Hatchback", price: 1400, rating: 4.4, reviews: 90, image: "../be1.png" },
  { id: 3, name: "Brezza", brand: "Maruti", model: "Brezza", fuel: "Petrol", gear: "Manual", class: "SUV", price: 1800, rating: 4.6, reviews: 200, image: "../br1.png" },
  { id: 4, name: "i20", brand: "Hyundai", model: "i20", fuel: "Petrol", gear: "Manual", class: "Hatchback", price: 1500, rating: 4.3, reviews: 150, image: "../hu1.png" },
  { id: 5, name: "Creta", brand: "Hyundai", model: "Creta", fuel: "Diesel", gear: "Manual", class: "SUV", price: 2200, rating: 4.7, reviews: 300, image: "../cr1.png" },
  { id: 6, name: "Venue", brand: "Hyundai", model: "Venue", fuel: "Petrol", gear: "Manual", class: "SUV", price: 1900, rating: 4.4, reviews: 180, image: "../va1.png" },
  { id: 7, name: "Nexon", brand: "Tata", model: "Nexon", fuel: "Petrol", gear: "Manual", class: "SUV", price: 2000, rating: 4.6, reviews: 250, image: "../nex2.png" },
  { id: 8, name: "Punch", brand: "Tata", model: "Punch", fuel: "Petrol", gear: "Manual", class: "SUV", price: 1700, rating: 4.3, reviews: 110, image: "../pun1.png" },
];

export default function CarsPage() {
  const [search, setSearch] = useState("");
  const [gear, setGear] = useState("");
  const [fuel, setFuel] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  /* ❤️ WISHLIST */
  const [wishlist, setWishlist] = useState<number[]>(() => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  }
  return [];
});

  const router = useRouter();

  // load wishlist on page load
 useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);


  // save wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ❤️ HEART CLICK → SAVE + REDIRECT
  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const updated = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });

    // ✅ redirect to wishlist page
    router.push("/wishlist");
  };

  const modelsByBrand = [...new Set(
    carsData.filter(c => !brand || c.brand === brand).map(c => c.model)
  )];

  const filteredCars = carsData.filter(c =>
    (!search || c.name.toLowerCase().includes(search.toLowerCase())) &&
    (!gear || c.gear === gear) &&
    (!fuel || c.fuel === fuel) &&
    (!brand || c.brand === brand) &&
    (!model || c.model === model) &&
    (!minPrice || c.price >= Number(minPrice)) &&
    (!maxPrice || c.price <= Number(maxPrice))
  );

  const clearFilters = () => {
    setSearch(""); setGear(""); setFuel(""); setBrand("");
    setModel(""); setMinPrice(""); setMaxPrice("");
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100">

      {/* SEARCH */}
      <input
        placeholder="Search car, brand or model..."
        className="mb-4 w-full p-2 rounded border"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-3">
        <select className="border p-2 rounded" value={gear} onChange={(e) => setGear(e.target.value)}>
          <option value="">Gear</option><option>Manual</option><option>Automatic</option>
        </select>

        <select className="border p-2 rounded" value={fuel} onChange={(e) => setFuel(e.target.value)}>
          <option value="">Fuel</option><option>Petrol</option><option>Diesel</option>
        </select>

        <select className="border p-2 rounded" value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); }}>
          <option value="">Brand</option>
          {[...new Set(carsData.map(c => c.brand))].map(b => <option key={b}>{b}</option>)}
        </select>

        <select className="border p-2 rounded" value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
          <option value="">Model</option>
          {modelsByBrand.map(m => <option key={m}>{m}</option>)}
        </select>

        <input type="number" placeholder="Min ₹" className="border p-2 rounded w-24" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="number" placeholder="Max ₹" className="border p-2 rounded w-24" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

        <button onClick={clearFilters} className="ml-auto text-indigo-600">Clear All</button>
      </div>

      {/* CAR GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredCars.map(car => (
          <div key={car.id} className="bg-white rounded-xl shadow p-3 relative">

            {/* ❤️ FAVORITE */}
            <button
              onClick={() => toggleWishlist(car.id)}
              className="absolute top-2 right-2 text-xl"
            >
              {wishlist.includes(car.id) ? "❤️" : "🤍"}
            </button>

            <img src={car.image} className="h-32 w-full object-contain" />
            <div className="font-semibold mt-2">{car.name}</div>
            <div className="text-xs text-gray-500">{car.brand} • {car.model}</div>
            <div className="text-xs text-amber-500">⭐ {car.rating}</div>

            <div className="flex justify-between items-center mt-3">
              <span className="font-bold text-indigo-600">₹{car.price}/day</span>
              <button
                onClick={() => router.push(`/dashboard/${car.id}`)}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-xs"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
