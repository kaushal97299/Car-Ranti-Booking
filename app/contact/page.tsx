"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    // ✅ dummy submit (backend later)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 text-slate-700">

      {/* HERO */}
      <section className="py-20 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-900"
        >
          Contact Us
        </motion.h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          We are here to help you. Fill the form or contact us directly.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 pb-24">

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur border border-white/40 rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Send us a message
          </h2>

          <div className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
            >
              {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
            </button>

            {success && (
              <p className="flex items-center justify-center gap-2 text-green-600 text-sm">
                <CheckCircle size={18} /> Message ready to send (backend later)
              </p>
            )}
          </div>
        </motion.form>

        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="bg-white/70 backdrop-blur border border-white/40 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Contact Information
            </h3>

            <div className="space-y-4 text-slate-700">
              <p className="flex items-center gap-3">
                <Mail className="text-indigo-600" /> support@carbooking.com
              </p>
              <p className="flex items-center gap-3">
                <Phone className="text-indigo-600" /> +91 98765 43210
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="text-indigo-600" /> India (All Cities)
              </p>
            </div>
          </div>

          {/* QUICK CONTACT */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href="mailto:support@carbooking.com"
              className="bg-white/70 backdrop-blur border border-white/40 rounded-xl p-5 flex items-center justify-center gap-2 shadow hover:shadow-lg transition"
            >
              <Mail className="text-indigo-600" /> Email Us
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              className="bg-white/70 backdrop-blur border border-white/40 rounded-xl p-5 flex items-center justify-center gap-2 shadow hover:shadow-lg transition"
            >
              <MessageCircle className="text-green-600" /> WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

     
    </div>
  );
}
