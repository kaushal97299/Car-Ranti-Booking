
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

/* ================== PAGINATION ================== */
const ITEMS_PER_PAGE = 8;

export default function CarsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [gear, setGear] = useState("");
  const [fuel, setFuel] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ❤️ Wishlist */
  const [wishlist, setWishlist] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const updated = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
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

  /* PAGINATION */
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200">

      {/* SEARCH */}
      <input
        placeholder="Search car, brand or model..."
        className="w-full mb-4 p-3 rounded-xl bg-white/80 backdrop-blur shadow"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER BAR */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-lg flex flex-wrap gap-3 mb-6">
        <select className="p-2 rounded-lg border" value={gear} onChange={(e) => setGear(e.target.value)}>
          <option value="">Gear</option><option>Manual</option><option>Automatic</option>
        </select>
        <select className="p-2 rounded-lg border" value={fuel} onChange={(e) => setFuel(e.target.value)}>
          <option value="">Fuel</option><option>Petrol</option><option>Diesel</option>
        </select>
        <select className="p-2 rounded-lg border" value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); }}>
          <option value="">Brand</option>
          {[...new Set(carsData.map(c => c.brand))].map(b => <option key={b}>{b}</option>)}
        </select>
        <select className="p-2 rounded-lg border" value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
          <option value="">Model</option>
          {modelsByBrand.map(m => <option key={m}>{m}</option>)}
        </select>
        <input type="number" placeholder="Min ₹" className="p-2 w-24 rounded-lg border" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="number" placeholder="Max ₹" className="p-2 w-24 rounded-lg border" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedCars.map(car => (
          <div
            key={car.id}
            className="
              bg-white/80 backdrop-blur rounded-2xl shadow
              transition-all duration-300
              hover:bg-white
              hover:shadow-xl
              border border-white/60
            "
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={car.image} className="h-40 w-full object-contain" />
              <button
                onClick={() => toggleWishlist(car.id)}
                className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow"
              >
                {wishlist.includes(car.id) ? "❤️" : "🤍"}
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold">{car.name}</h3>
              <p className="text-xs text-gray-500">{car.brand} • {car.model}</p>
              <p className="text-xs text-amber-500 mt-1">⭐ {car.rating} ({car.reviews})</p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{car.price}/day
                </span>
                <button
                  onClick={() => router.push(`/dashboard/${car.id}`)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-lg text-sm shadow"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white/80 hover:bg-white shadow"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
