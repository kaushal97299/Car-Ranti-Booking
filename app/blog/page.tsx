"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../context/useTranslation";
import {
  Search,
  X,
  MapPin,
  Filter,
  Calendar,
  User,
  ChevronRight,
  Sparkles,
  BookOpen,
  TrendingUp,
  Clock,
  Tag,
  Eye,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";

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
    author: "Rahul Sharma",
    date: "12 Mar 2024",
    readTime: "5 min",
    views: 1234,
    likes: 89,
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
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
    author: "Priya Verma",
    date: "10 Mar 2024",
    readTime: "4 min",
    views: 2156,
    likes: 145,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7fa0ac3",
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
    author: "Amit Singh",
    date: "8 Mar 2024",
    readTime: "6 min",
    views: 1876,
    likes: 112,
    image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9",
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
    author: "Neha Gupta",
    date: "5 Mar 2024",
    readTime: "3 min",
    views: 3456,
    likes: 234,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
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
    author: "Vikram Mehta",
    date: "3 Mar 2024",
    readTime: "7 min",
    views: 2890,
    likes: 178,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
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
    author: "Rajesh Kumar",
    date: "1 Mar 2024",
    readTime: "4 min",
    views: 1987,
    likes: 134,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
  },
];

const featuredBlogs = blogs.slice(0, 3);

/* ================= PAGE ================= */

export default function BlogPage() {
  const { t } = useTranslation();
  const [state, setState] = useState("All");
  const [district, setDistrict] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeBlog, setActiveBlog] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState<number[]>([]);

  const districts =
    state === "All" ? [] : statesData[state as keyof typeof statesData];

  const filteredBlogs = blogs.filter((blog) => {
    const matchState = state === "All" || blog.state === state;
    const matchDistrict = district === "All" || blog.district === district;
    const matchCategory = category === "All" || blog.category === category;
    const matchSearch = blog.title.toLowerCase().includes(search.toLowerCase()) ||
                       blog.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchState && matchDistrict && matchCategory && matchSearch;
  });

  const handleSaveBlog = (blogId: number) => {
    if (savedBlogs.includes(blogId)) {
      setSavedBlogs(savedBlogs.filter(id => id !== blogId));
    } else {
      setSavedBlogs([...savedBlogs, blogId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white">

      {/* HERO SECTION WITH ANIMATION */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg"
          >
            <Sparkles size={16} />
            <span>{t("blog.insights")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
          >
           {t("blog.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {t("blog.subtitle")}
          </motion.p>

          {/* SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto mt-10"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
               placeholder={t("blog.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 backdrop-blur border border-white/10 border border-indigo-200/50 pl-12 pr-4 py-4 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED BLOGS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-emerald-300" size={24} />
            {t("blog.featuredArticles")}
          </h2>
          <button className="text-emerald-300 hover:text-indigo-800 flex items-center gap-1">
            {t("blog.viewAll")} <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveBlog(blog)}
              className="cursor-pointer group relative rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-2 py-1 rounded-full">{blog.category}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{blog.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-sm text-white/80 line-clamp-2">{blog.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FILTERS SECTION */}
      <section className="max-w-6xl mx-auto px-6 mb-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-300 md:hidden"
          >
            <Filter size={20} />
            <span>{t("blog.filters")}</span>
          </button>

          <div className={`${showFilters ? 'block' : 'hidden'} md:grid md:grid-cols-5 gap-4 mt-4 md:mt-0`}>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" size={18} />
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setDistrict("All");
                }}
                className="w-full bg-white/10 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option>{t("blog.allStates")}</option>
                {Object.keys(statesData).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={18} />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={state === "All"}
                className="w-full bg-white/10 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl appearance-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option>{t("blog.allDistricts")}</option>
                {districts?.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500" size={18} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/10 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option>{t("blog.allCategories")}</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
              {t("blog.applyFilters")}
            </button>

            <button className="border border-indigo-200 text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-white/50 transition-all">
              {t("blog.clearAll")}
            </button>
          </div>
        </div>
      </section>

      {/* BLOG STATS */}
      <section className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-between">
          <p className="text-gray-300 flex items-center gap-2">
            <BookOpen size={18} className="text-emerald-300" />
            Showing <span className="font-bold text-emerald-300">{filteredBlogs.length}</span> articles
          </p>
          <p className="text-sm text-slate-500">Last updated: Today</p>
        </div>
      </section>

      {/* BLOG CARDS - ADVANCED */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveBlog(blog.id);
                    }}
                    className="bg-white/90 backdrop-blur p-2 rounded-full hover:bg-white transition-all"
                  >
                    <Bookmark 
                      size={16} 
                      className={savedBlogs.includes(blog.id) ? "fill-indigo-600 text-emerald-300" : "text-gray-300"} 
                    />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-5" onClick={() => setActiveBlog(blog)}>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {blog.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Eye size={14} /> {blog.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="text-red-500" /> {blog.likes}
                    </span>
                  </div>
                  
                  <button className="text-emerald-300 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    {t("blog.readMore")} <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-20"
          >
            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
              <Search size={48} className="mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{t("blog.noBlogs")}</h3>
              <p className="text-gray-300">{t("blog.tryAgain")}</p>
            </div>
          </motion.div>
        )}
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{t("blog.newsletterTitle")}</h2>
          <p className="text-white/80 mb-8">{t("blog.newsletterSubtitle")}</p>
          <div className="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={t("blog.emailPlaceholder")}
              className="flex-1 px-4 py-3 rounded-l-xl text-white focus:outline-none"
            />
            <button className="bg-white text-emerald-300 px-6 py-3 rounded-r-xl font-medium hover:bg-white/10 transition-colors">
              {t("blog.subscribe")}
            </button>
          </div>
        </div>
      </section>

      {/* BLOG DETAIL MODAL - ENHANCED */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={() => setActiveBlog(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#041f1e] border border-white/10 rounded-3xl text-white max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Blog Image */}
              <div className="relative h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={activeBlog.image} 
                  alt={activeBlog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <button
                  onClick={() => setActiveBlog(null)}
                  className="absolute right-4 top-4 bg-white/90 backdrop-blur p-2 rounded-full hover:bg-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-1 rounded-full text-xs">{activeBlog.category}</span>
                    <span className="flex items-center gap-1 text-sm"><Clock size={14} /> {activeBlog.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{activeBlog.title}</h3>
                </div>
              </div>

              {/* Blog Meta */}
              <div className="p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {activeBlog.author[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{activeBlog.author}</p>
                        <p className="text-xs text-slate-500">{activeBlog.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <Heart size={18} className="text-red-500" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <Share2 size={18} className="text-gray-300" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <Bookmark size={18} className="text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="py-6">
                  <p className="text-gray-300 leading-relaxed">
                    {activeBlog.content}
                  </p>
                </div>

                {/* Location Tags */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                  <MapPin size={16} className="text-emerald-300" />
                  <span className="text-sm text-gray-300">{activeBlog.state}, {activeBlog.district}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}