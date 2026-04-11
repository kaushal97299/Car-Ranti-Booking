"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ResetPassword() {

  const router = useRouter();
  const params = useParams();

  const token = params?.token as string;

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleReset = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!token) {
      setMsg("Token missing");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        `${API}/api/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.msg || "Reset failed");
        return;
      }

      setMsg("Password reset successful");

      setTimeout(() => {
        router.push("/auth");
      }, 2000);

    } catch (err) {

      setMsg("Server error");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center mesh-bg relative overflow-hidden">

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl text-white w-[350px]">

        <h2 className="text-2xl font-bold mb-4 text-white">
          Reset Password
        </h2>

        {msg && (
          <p className="mb-3 text-emerald-300">
            {msg}
          </p>
        )}

        <form onSubmit={handleReset} className="space-y-3">

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 rounded bg-white/10 border border-white/10 text-white placeholder:text-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition py-2 rounded"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

      </div>

    </div>

  );
}