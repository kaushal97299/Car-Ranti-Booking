"use client";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="w-full mt-20 relative overflow-hidden">

      {/* LIGHT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100" />

      {/* soft glass overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />

      {/* CONTENT */}
      <div className="relative z-10 border-t border-indigo-200">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* LOGO */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-800">CarBooking</h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Premium car rentals with trusted service, transparent pricing and 24/7 support.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold text-indigo-700 mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li onClick={() => router.push("/about")} className="cursor-pointer hover:text-indigo-700 transition">About Us</li>
              <li onClick={() => router.push("/careers")} className="cursor-pointer hover:text-indigo-700 transition">Careers</li>
              <li onClick={() => router.push("/blog")} className="cursor-pointer hover:text-indigo-700 transition">Blog</li>
              <li onClick={() => router.push("/contact")} className="cursor-pointer hover:text-indigo-700 transition">Contact</li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold text-indigo-700 mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li onClick={() => router.push("/cars")} className="cursor-pointer hover:text-indigo-700 transition">Car Rental</li>
              <li onClick={() => router.push("/cars?type=luxury")} className="cursor-pointer hover:text-indigo-700 transition">Luxury Cars</li>
              <li onClick={() => router.push("/airport-pickup")} className="cursor-pointer hover:text-indigo-700 transition">Airport Pickup</li>
              <li onClick={() => router.push("/corporate")} className="cursor-pointer hover:text-indigo-700 transition">Corporate Booking</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold text-indigo-700 mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li onClick={() => router.push("/help")} className="cursor-pointer hover:text-indigo-700 transition">Help Center</li>
              <li onClick={() => router.push("/terms")} className="cursor-pointer hover:text-indigo-700 transition">Terms & Conditions</li>
              <li onClick={() => router.push("/privacy")} className="cursor-pointer hover:text-indigo-700 transition">Privacy Policy</li>
              <li onClick={() => router.push("/refund")} className="cursor-pointer hover:text-indigo-700 transition">Refund Policy</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-indigo-200 text-center py-4 text-sm text-slate-600">
          © {new Date().getFullYear()} CarBooking. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
