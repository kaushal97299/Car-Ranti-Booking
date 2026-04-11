"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  ShieldCheck,
  Users,
  Star,
  Globe,
  X,
  Award,
  Clock,
  Heart,
  Zap,
  ChevronRight,
  Sparkles,
} from "lucide-react";

/* ================= TYPES ================= */

interface AboutCard {
  id: number;
  title: string;
  icon: ReactNode;
  short: string;
  details: string;
  color: string;
}

interface StatItem {
  id: number;
  value: string;
  label: string;
  icon: ReactNode;
}

/* ================= DATA ================= */

const cards: AboutCard[] = [
  {
    id: 1,
    title: "Premium Cars",
    icon: <Car size={28} />,
    short: "Luxury & economy vehicles",
    details:
      "We provide a wide range of premium, economy and luxury cars that are fully serviced, sanitized and ready for any journey. From city rides to long trips, we have the perfect car for every need.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    title: "Secure Booking",
    icon: <ShieldCheck size={28} />,
    short: "100% safe & verified",
    details:
      "All bookings are secured with encrypted payments, verified partners and insurance coverage. Your safety and privacy are our top priorities.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Trusted Users",
    icon: <Users size={28} />,
    short: "10,000+ happy customers",
    details:
      "Thousands of customers across India trust Car Booking for reliable, affordable and transparent rental services.",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    title: "Nationwide Service",
    icon: <Globe size={28} />,
    short: "100+ cities covered",
    details:
      "Our services are available in more than 100 cities across India, making travel convenient wherever you go.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 5,
    title: "Top Rated",
    icon: <Star size={28} />,
    short: "Consistent 5★ ratings",
    details:
      "We are consistently rated 5 stars by our users for service quality, pricing and customer support.",
    color: "from-purple-500 to-pink-500",
  },
];

const stats: StatItem[] = [
  {
    id: 1,
    value: "10K+",
    label: "Happy Customers",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 2,
    value: "100+",
    label: "Cities Covered",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: 3,
    value: "5K+",
    label: "Vehicles",
    icon: <Car className="w-6 h-6" />,
  },
  {
    id: 4,
    value: "4.9★",
    label: "Average Rating",
    icon: <Star className="w-6 h-6" />,
  },
];

const timelineItems = [
  {
    year: "2020",
    title: "Founded",
    description: "Started with a vision to revolutionize car rentals",
  },
  {
    year: "2021",
    title: "Expansion",
    description: "Expanded to 25 cities across India",
  },
  {
    year: "2022",
    title: "10K Customers",
    description: "Reached 10,000 happy customers milestone",
  },
  {
    year: "2023",
    title: "Nationwide",
    description: "Now serving 100+ cities pan-India",
  },
  {
    year: "2024",
    title: "Innovation",
    description: "Launched AI-powered booking system",
  },
];

/* ================= PAGE ================= */

export default function AboutPage() {
  const [activeCard, setActiveCard] = useState<AboutCard | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white">
      
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden py-32 px-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg"
          >
            <Sparkles size={16} />
            <span>Welcome to Car Booking</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_0_25px_rgba(16,185,129,0.45)]"
          >
            Your Journey, Our Passion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            A premium, secure and technology-driven car rental platform built
            for modern travelers. Experience the joy of driving with confidence.
          </motion.p>

          {/* Stats - Updated colors */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="bg-[#041f1e] border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:border-white/20"
              >
                <div className="text-emerald-300 mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Company - Updated colors */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Who We Are
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Car Booking is a technology-driven mobility platform designed to make
                car rentals simple, secure and affordable. We connect customers with
                verified partners to ensure reliable rides across India.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <Zap className="w-5 h-5" />, text: "Instant booking confirmation", color: "indigo" },
                  { icon: <ShieldCheck className="w-5 h-5" />, text: "Verified & trusted partners", color: "purple" },
                  { icon: <Heart className="w-5 h-5" />, text: "24/7 customer support", color: "fuchsia" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className={`text-emerald-300`}>{item.icon}</div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                Learn More <ChevronRight size={18} />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-[#041f1e] border border-white/10 backdrop-blur-xl rounded-3xl p-3 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1549924231-f129b911e442"
                  alt="car"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards - Already gradient */}
      <section className="py-24 bg-gradient-to-r from-[#041f1e] via-[#062f2c] to-[#041f1e] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Mission",
                text: "To simplify mobility by offering transparent pricing, secure bookings and premium vehicles using modern technology.",
                icon: <Award size={32} />,
              },
              {
                title: "Our Vision",
                text: "To become India's most trusted and customer-first car rental platform.",
                icon: <Globe size={32} />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#041f1e] border border-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-[#041f1e] border border-white/10 transition-all cursor-pointer"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Updated colors */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-400 hidden md:block"></div>

            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  } items-center gap-8`}
                >
                  <div className="flex-1 md:text-right">
                    <div className="bg-[#041f1e] border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:border-white/20">
                      <span className="text-sm font-semibold text-emerald-300 mb-2 block">{item.year}</span>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-xl">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid - Updated colors */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-4"
          >
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-gray-300 mb-16 max-w-2xl mx-auto"
          >
            Experience the best car rental service with our premium features
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveCard(card)}
                className="cursor-pointer group"
              >
                <div className="bg-[#041f1e] border border-white/10 backdrop-blur-xl rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all relative overflow-hidden hover:border-white/20">
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Icon Container */}
                  <div className={`relative mb-6 inline-flex p-4 bg-gradient-to-br ${card.color} rounded-2xl text-white shadow-lg`}>
                    {card.icon}
                  </div>
                  
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{card.short}</p>
                  
                  <button className="text-emerald-300 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal - Updated colors */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#041f1e] border border-white/10 rounded-3xl max-w-md w-full p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setActiveCard(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-gray-300 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              <div className={`inline-flex p-4 bg-gradient-to-br ${activeCard.color} rounded-2xl text-white mb-6 shadow-lg`}>
                {activeCard.icon}
              </div>
              
              <h3 className="text-white text-2xl font-bold mb-3">
                {activeCard.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {activeCard.details}
              </p>
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}