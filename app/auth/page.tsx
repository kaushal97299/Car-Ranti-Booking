"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chrome, Github } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SpaceAuth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-y-auto md:overflow-hidden bg-gradient-to-br from-[#1a0638] via-[#2b0f55] to-[#3a1570]">

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:grid grid-cols-2 h-full">
        <DesktopLeft isLogin={isLogin} />
        <div className="flex items-center justify-center">
          <Form isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden h-screen flex flex-col">

        {/* ---------- TOP 50% ---------- */}
        <div className="flex-1 relative px-5 pt-8 pb-4 flex items-end">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-500/40 blur-3xl animate-pulse" />
          <div className="absolute top-10 right-0 w-36 h-36 rounded-full bg-purple-400/40 blur-2xl animate-pulse" />

          {/* 🔥 TEXT MOVED UP (MOBILE ONLY) */}
          <div className="relative z-10 text-white -translate-y-6">
            <h1 className="text-2xl font-bold leading-tight">
              {isLogin ? "Start Your Next Journey" : "Create Your Account"}
            </h1>

            <h2 className="text-3xl font-extrabold text-purple-300 mt-1">
              {isLogin ? "With Confidence" : "Drive Smarter"}
            </h2>

            <p className="text-gray-300 text-xs mt-3 max-w-sm">
              Luxury cars, instant booking, transparent pricing, and 24/7 support —
              all in one premium platform.
            </p>
          </div>
        </div>

        {/* ---------- BOTTOM 50% ---------- */}
        <div className="flex-1 overflow-y-auto px-3 py-4 flex items-start justify-center">
          <Form isLogin={isLogin} setIsLogin={setIsLogin} mobile />
        </div>
      </div>
    </div>
  );
}

function DesktopLeft({ isLogin }: { isLogin: boolean }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-purple-400/30 blur-2xl animate-pulse" />

      <div className="relative z-10 px-16 text-white">
        <h1 className="text-4xl font-bold mb-3 animate-fadeUp">
          {isLogin ? "Start Your Next Journey" : "Create Your Account"}
        </h1>

        <h2 className="text-5xl font-extrabold text-purple-300 animate-glow">
          {isLogin ? "With Confidence" : "Drive Smarter"}
        </h2>

        <p className="text-gray-300 mt-6 max-w-md">
          Luxury cars, instant booking, transparent pricing, and 24/7 support —
          all in one premium platform.
        </p>

        <div className="flex gap-10 mt-10 text-sm text-gray-300">
          <div><p className="text-xl font-bold text-white">500+</p>Cars</div>
          <div><p className="text-xl font-bold text-white">50k+</p>Users</div>
          <div><p className="text-xl font-bold text-white">24/7</p>Support</div>
        </div>
      </div>
    </div>
  );
}

function Form({
  isLogin,
  setIsLogin,
  mobile,
}: {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
  mobile?: boolean;
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    const url = isLogin
      ? `${API}/api/login`
      : `${API}/api/register`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (!isLogin) {
        alert("Signup successful! Please login.");
        setIsLogin(true);
        setPassword("");
        return;
      }

      alert("Login successful!");
      router.push("/");

    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = `${API}/api/google`;
  };

  const handleGithub = () => {
    window.location.href = `${API}/api/github`;
  };

  return (
    <div
      className={`w-full max-w-md mx-auto rounded-2xl text-white
      bg-white/10 backdrop-blur-xl border border-white/20
      shadow-[0_25px_60px_rgba(0,0,0,0.45)]
      ${mobile ? "p-4 sm:p-6" : "p-8"}`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        {isLogin ? "Sign In" : "Sign Up"}
      </h2>

      <p className="text-gray-300 text-sm mb-5">
        {isLogin
          ? "Sign in to continue your premium experience"
          : "Create your account to get started"}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button type="button" onClick={handleGoogle}
          className="flex items-center justify-center gap-2 py-2 text-sm rounded-md bg-white/20 hover:bg-white/30 transition">
          <Chrome size={16} /> Google
        </button>

        <button type="button" onClick={handleGithub}
          className="flex items-center justify-center gap-2 py-2 text-sm rounded-md bg-black/40 hover:bg-black/60 transition">
          <Github size={16} /> GitHub
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 my-3">
        or continue with email
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none"
            placeholder="Full Name"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none"
          placeholder="Password"
        />

        <button
          disabled={loading}
          className="w-full py-2 text-sm sm:text-base rounded-md bg-gradient-to-r from-purple-600 to-blue-500 font-semibold shadow-lg disabled:opacity-50"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-gray-300">
        {isLogin ? (
          <>Don’t have an account? <button onClick={() => setIsLogin(false)} className="text-purple-300 font-semibold">Sign up</button></>
        ) : (
          <>Already have an account? <button onClick={() => setIsLogin(true)} className="text-purple-300 font-semibold">Sign in</button></>
        )}
      </p>
    </div>
  );
}
