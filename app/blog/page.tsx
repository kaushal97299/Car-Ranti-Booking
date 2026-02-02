"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Search, X } from "lucide-react";

/* ================= DATA ================= */

const statesData: Record<string, string[]> = {
  Haryana: ["Gurugram", "Faridabad", "Rohtak", "Panipat", "Hisar"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh"],
  Punjab: ["Ludhiana", "Amritsar", "Patiala", "Jalandhar"],
  UttarPradesh: ["Noida", "Ghaziabad", "Agra", "Lucknow"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
};

const categories = [
  "Travel",
  "Rental Guide",
  "Car Tips",
  "Budget",
  "Luxury Cars",
];

const blogs = [
  {
    id: 1,
    title: "Best Cars for Long Trips in India",
    state: "Haryana",
    district: "Gurugram",
    category: "Travel",
    excerpt: "Discover the most comfortable cars for long journeys.",
    content:
      "Long trips require comfort, safety and mileage. SUVs like Creta, XUV700 and sedans like Verna are best for long journeys. Always check tyre pressure, fuel efficiency and service history before starting.",
  },
  {
    id: 2,
    title: "Car Rental Guide for First-Time Users",
    state: "Delhi",
    district: "Dwarka",
    category: "Rental Guide",
    excerpt: "Everything you need to know before booking your first rental.",
    content:
      "First time users should always check fuel policy, insurance coverage, late fees and ID verification. Book early to get the best price and choice of cars.",
  },
  {
    id: 3,
    title: "Top Weekend Getaways from Jaipur",
    state: "Rajasthan",
    district: "Jaipur",
    category: "Travel",
    excerpt: "Perfect weekend trips from Jaipur with rental cars.",
    content:
      "You can visit Ajmer, Pushkar, Ranthambore and Udaipur within 1–2 days from Jaipur. Hatchbacks are best for budget trips while SUVs are great for highways.",
  },
  {
    id: 4,
    title: "How to Save Money on Car Rentals",
    state: "Punjab",
    district: "Ludhiana",
    category: "Budget",
    excerpt: "Smart ways to reduce your car rental cost.",
    content:
      "Book early, avoid weekend rush, choose fuel efficient cars and always compare prices. Weekly rentals are cheaper than daily rentals.",
  },
  {
    id: 5,
    title: "Luxury Cars for Wedding & Events",
    state: "Maharashtra",
    district: "Mumbai",
    category: "Luxury Cars",
    excerpt: "Make your events premium with luxury rentals.",
    content:
      "BMW, Audi and Mercedes are most popular for weddings. Book at least 7 days in advance and always check decoration policy.",
  },
  {
    id: 6,
    title: "Best Cars for City Driving",
    state: "UttarPradesh",
    district: "Noida",
    category: "Car Tips",
    excerpt: "Easy to drive, easy to park city cars.",
    content:
      "Swift, i10 and Tiago are perfect for city driving. They offer great mileage and easy parking in traffic areas.",
  },
];

/* ================= PAGE ================= */

export default function BlogPage() {
  const [state, setState] = useState("All");
  const [district, setDistrict] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeBlog, setActiveBlog] = useState<any>(null);

  const districts =
    state === "All" ? [] : statesData[state as keyof typeof statesData];

  const filteredBlogs = blogs.filter((blog) => {
    const matchState = state === "All" || blog.state === state;
    const matchDistrict = district === "All" || blog.district === district;
    const matchCategory = category === "All" || blog.category === category;
    const matchSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    return matchState && matchDistrict && matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 text-slate-700">

      {/* HERO */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Car Rental Blog
        </h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Location-based travel blogs, car tips and rental guides.
        </p>
      </section>

      {/* FILTERS */}
      <section className="max-w-6xl mx-auto px-6 mb-10 grid md:grid-cols-5 gap-4">
        <input
          placeholder="Search blog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/70 p-3 rounded-xl"
        />

        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setDistrict("All");
          }}
          className="bg-white/70 p-3 rounded-xl"
        >
          <option>All</option>
          {Object.keys(statesData).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          disabled={state === "All"}
          className="bg-white/70 p-3 rounded-xl"
        >
          <option>All</option>
          {districts?.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white/70 p-3 rounded-xl"
        >
          <option>All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </section>

      {/* BLOG CARDS */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-24">
        {filteredBlogs.map((blog) => (
          <motion.div
            key={blog.id}
            onClick={() => setActiveBlog(blog)}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer bg-white/70 backdrop-blur border border-white/40 rounded-2xl p-6 shadow-lg"
          >
            <span className="text-xs text-indigo-600 font-semibold">
              {blog.state} • {blog.district} • {blog.category}
            </span>

            <h3 className="text-lg font-bold text-slate-900 mt-2">
              {blog.title}
            </h3>

            <p className="text-slate-600 text-sm mt-2">
              {blog.excerpt}
            </p>
          </motion.div>
        ))}

        {filteredBlogs.length === 0 && (
          <p className="col-span-full text-center text-slate-500">
            No blogs found
          </p>
        )}
      </section>

      {/* BLOG DETAIL MODAL */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            onClick={() => setActiveBlog(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 relative"
            >
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute right-4 top-4"
              >
                <X />
              </button>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {activeBlog.title}
              </h3>

              <p className="text-sm text-indigo-600 mb-4">
                {activeBlog.state} • {activeBlog.district} • {activeBlog.category}
              </p>

              <p className="text-slate-700 leading-relaxed">
                {activeBlog.content}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-slate-600 text-sm">
        © {new Date().getFullYear()} Car Booking. All rights reserved.
      </footer>
    </div>
  );
}
