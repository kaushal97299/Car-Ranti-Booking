/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, Smartphone, Wallet, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [method, setMethod] = useState<string>("");

  const fullName = params.get("fullName");
  const phone = params.get("phone");
  const email = params.get("email");
  const car = params.get("car");
  const total = params.get("total");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-2xl rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-8">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            Secure Payment
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Choose your payment method
          </p>
        </div>

        {/* SUMMARY */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 border border-white/60 rounded-2xl p-5 mb-8 text-slate-700">
          <p><b>Name:</b> {fullName}</p>
          <p><b>Phone:</b> {phone}</p>
          <p><b>Email:</b> {email}</p>
          <p><b>Car:</b> {car}</p>
        </div>

        {/* PAYMENT METHODS */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <PayOption
            icon={<Smartphone size={28} />}
            label="UPI Payment"
            active={method === "UPI"}
            onClick={() => setMethod("UPI")}
          />

          <PayOption
            icon={<CreditCard size={28} />}
            label="Card Payment"
            active={method === "CARD"}
            onClick={() => setMethod("CARD")}
          />

          <PayOption
            icon={<Wallet size={28} />}
            label="Cash on Pickup"
            active={method === "CASH"}
            onClick={() => setMethod("CASH")}
          />
        </div>

        {/* TOTAL + PAY */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600">Total Amount</p>
            <p className="text-4xl font-extrabold text-indigo-700">₹{total}</p>
          </div>

          <button
            disabled={!method}
            onClick={() => {
              alert(`Payment Successful via ${method} 🎉`);
              router.push("/");
            }}
            className={`px-8 py-3 rounded-xl font-bold transition-all
              ${
                method
                  ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-xl hover:scale-[1.03]"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
          >
            {method ? "Pay Now" : "Select Payment Method"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function PayOption({
  icon,
  label,
  active,
  onClick,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300
        ${
          active
            ? "bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white scale-[1.05] shadow-2xl"
            : "bg-white/70 text-slate-700 hover:bg-white"
        }`}
    >
      {icon}
      <span className="font-semibold">{label}</span>
      {active && (
        <CheckCircle2 className="absolute top-3 right-3 text-white" size={20} />
      )}
    </button>
  );
}
