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
} from "lucide-react";

/* ================= TYPES ================= */

interface AboutCard {
  id: number;
  title: string;
  icon: ReactNode;
  short: string;
  details: string;
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
  },
  {
    id: 2,
    title: "Secure Booking",
    icon: <ShieldCheck size={28} />,
    short: "100% safe & verified",
    details:
      "All bookings are secured with encrypted payments, verified partners and insurance coverage. Your safety and privacy are our top priorities.",
  },
  {
    id: 3,
    title: "Trusted Users",
    icon: <Users size={28} />,
    short: "10,000+ happy customers",
    details:
      "Thousands of customers across India trust Car Booking for reliable, affordable and transparent rental services.",
  },
  {
    id: 4,
    title: "Nationwide Service",
    icon: <Globe size={28} />,
    short: "100+ cities covered",
    details:
      "Our services are available in more than 100 cities across India, making travel convenient wherever you go.",
  },
  {
    id: 5,
    title: "Top Rated",
    icon: <Star size={28} />,
    short: "Consistent 5★ ratings",
    details:
      "We are consistently rated 5 stars by our users for service quality, pricing and customer support.",
  },
];

/* ================= PAGE ================= */

export default function AboutPage() {
  const [activeCard, setActiveCard] = useState<AboutCard | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 text-slate-700">

      {/* HERO */}
      <section className="py-24 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-slate-900"
        >
          About Car Booking
        </motion.h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          A premium, secure and technology-driven car rental platform built
          for modern travelers.
        </p>
      </section>

      {/* ABOUT COMPANY */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Who We Are</h2>
          <p className="text-slate-600 leading-relaxed">
            Car Booking is a technology-driven mobility platform designed to make
            car rentals simple, secure and affordable. We connect customers with
            verified partners to ensure reliable rides across India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur border border-white/40 rounded-2xl p-3 shadow-lg"
        >
         {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1549924231-f129b911e442"
            alt="car"
            className="rounded-xl"
          />
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Our Mission",
              text: "To simplify mobility by offering transparent pricing, secure bookings and premium vehicles using modern technology.",
            },
            {
              title: "Our Vision",
              text: "To become India’s most trusted and customer-first car rental platform.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur border border-white/40 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CARDS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-14">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveCard(card)}
              className="cursor-pointer bg-white/70 backdrop-blur border border-white/40 rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:scale-[1.02] transition"
            >
              <div className="flex justify-center mb-4 text-indigo-600">
                {card.icon}
              </div>
              <h3 className="text-slate-900 font-semibold mb-1">{card.title}</h3>
              <p className="text-slate-600 text-sm">{card.short}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl"
            >
              <button
                onClick={() => setActiveCard(null)}
                className="absolute right-4 top-4 text-slate-500 hover:text-black"
              >
                <X />
              </button>

              <div className="text-indigo-600 mb-4">{activeCard.icon}</div>
              <h3 className="text-slate-900 text-xl font-semibold mb-2">
                {activeCard.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {activeCard.details}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
