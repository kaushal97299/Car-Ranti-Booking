/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

/* ================== DATA ================== */
const carsData = [
  { id: 1, name: "Swift", brand: "Maruti", model: "Swift", fuel: "Petrol", gear: "Manual", class: "Hatchback", price: 1200, rating: 4.5, reviews: 120, image: "../swift.png" },
  { id: 2, name: "Baleno", brand: "Maruti", model: "Baleno", fuel: "Petrol", gear: "Manual", class: "Hatchback", price: 1400, rating: 4.4, reviews: 90, image: "../be1.png" },
  { id: 3, name: "Brezza", brand: "Maruti", model: "Brezza", fuel: "Petrol", gear: "Manual", class: "SUV", price: 1800, rating: 4.6, reviews: 200, image: "../br1.png" },

  { id: 4, name: "i20", brand: "Hyundai", model: "i20", fuel: "Petrol", gear: "Manual", class: "Hatchback", price: 1500, rating: 4.3, reviews: 150, image: "../hu1.png" },
  { id: 5, name: "Creta", brand: "Hyundai", model: "Creta", fuel: "Diesel", gear: "Manual", class: "SUV", price: 2200, rating: 4.7, reviews: 300, image: "../cr1.png" },
  { id: 6, name: "Venue", brand: "Hyundai", model: "Venue", fuel: "Petrol", gear: "Manual", class: "SUV", price: 1900, rating: 4.4, reviews: 180, image: "../va1.png" },

  { id: 7, name: "Nexon", brand: "Tata", model: "Nexon", fuel: "Petrol", gear: "Manual", class: "SUV", price: 2000, rating: 4.6, reviews: 250, image: "../nex1.png" },
  { id: 8, name: "Punch", brand: "Tata", model: "Punch", fuel: "Petrol", gear: "Manual", class: "SUV", price: 1700, rating: 4.3, reviews: 110, image: "../pun1.png" },
];

/* ================== COMPONENT ================== */
export default function CarsPage() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const [gear, setGear] = useState("");
  const [fuel, setFuel] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [sort, setSort] = useState("");

  const [search, setSearch] = useState("");

  const modelsByBrand = [...new Set(
    carsData.filter(c => !brand || c.brand === brand).map(c => c.model)
  )];

  let filteredCars = carsData.filter((c) => {
    const textMatch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase()) ||
      c.model.toLowerCase().includes(search.toLowerCase());

    return (
      textMatch &&
      (!gear || c.gear === gear) &&
      (!fuel || c.fuel === fuel) &&
      (!brand || c.brand === brand) &&
      (!model || c.model === model) &&
      (!vehicleClass || c.class === vehicleClass)
    );
  });

  if (sort === "low") filteredCars = [...filteredCars].sort((a, b) => a.price - b.price);
  if (sort === "high") filteredCars = [...filteredCars].sort((a, b) => b.price - a.price);

  const clearFilters = () => {
    setGear(""); setFuel(""); setBrand(""); setModel("");
    setVehicleClass(""); setSort(""); setSearch("");
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-pink-500/20 animate-gradient" />

      <div className="relative z-10">

        {/* SEARCH */}
        <input
          placeholder="Search car, brand or model..."
          className="mb-4 border p-2 rounded w-full bg-white/10 text-white placeholder-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TOP BAR */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-6 gap-3 text-white">
          <input className="border p-2 rounded bg-transparent" placeholder="Pickup Location" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
          <input type="date" className="border p-2 rounded bg-transparent" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          <input type="time" className="border p-2 rounded bg-transparent" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
          <input type="date" className="border p-2 rounded bg-transparent" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          <input type="time" className="border p-2 rounded bg-transparent" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} />
          <button className="bg-blue-600 text-white rounded px-4">Search</button>
        </div>

        {/* FILTER BAR */}
        <div className="mt-4 flex flex-wrap gap-3 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow text-sm text-white">
          <select className="border p-2 rounded bg-transparent text-black" value={gear} onChange={(e) => setGear(e.target.value)}>
            <option value="">Gear</option><option>Manual</option><option>Automatic</option>
          </select>
          <select className="border p-2 rounded bg-transparent text-black" value={fuel} onChange={(e) => setFuel(e.target.value)}>
            <option value="">Fuel</option><option>Petrol</option><option>Diesel</option>
          </select>
          <select className="border p-2 rounded bg-transparent text-black" value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); }}>
            <option value="">Brand</option>
            {[...new Set(carsData.map(c => c.brand))].map(b => <option key={b}>{b}</option>)}
          </select>
          <select className="border p-2 rounded bg-transparent text-black" value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
            <option value="">Model</option>
            {modelsByBrand.map(m => <option key={m}>{m}</option>)}
          </select>
          <button onClick={clearFilters} className="ml-auto text-blue-300">Clear</button>
        </div>

        {/* CAR GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3
                transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-1"
            >
              <img src={car.image} className="h-32 w-full object-contain" />
              <div className="mt-2 font-semibold text-white text-sm">{car.name}</div>
              <div className="text-xs text-gray-300">{car.brand} • {car.model}</div>
              <div className="text-xs text-yellow-400">Rating {car.rating} ({car.reviews})</div>

              <div className="flex justify-between items-center mt-3">
                <div className="text-lg font-bold text-blue-300">{car.price} TL</div>
                <button className="bg-blue-600 text-white px-4 py-2 text-xs rounded">RENT</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
