"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] flex items-center justify-center text-white px-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl p-8 max-w-md w-full text-center">

        <div className="text-5xl mb-4">✅</div>

        <h1 className="text-2xl font-bold mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-400 mb-6">
          Your booking has been confirmed successfully.
        </p>

        <div className="bg-white/10 border border-white/10 rounded-xl p-3 text-xs break-all text-gray-300">
          Session ID:
          <div className="mt-1 text-emerald-300">
            {sessionId}
          </div>
        </div>

        <button
          onClick={() => window.location.href = "/dashboard"}
          className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition"
        >
          Go to Dashboard
        </button>

      </div>

    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense
  fallback={
    <div className="min-h-screen flex items-center justify-center bg-[#020b0a] text-white">
      Loading payment confirmation...
    </div>
  }
>
      <SuccessContent />
    </Suspense>
  );
}