/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL as string;

export default function SpaceAuth() {

const [isLogin, setIsLogin] = useState<boolean>(true);
const [checking, setChecking] = useState<boolean>(true);

const router = useRouter();

useEffect(() => {

const token = localStorage.getItem("token");

if (token) {
  router.replace("/");
} else {
  setChecking(false);
}

}, [router]);

if (checking) return null;

return (
<div className="fixed inset-0 h-screen w-screen overflow-y-auto md:overflow-hidden bg-gradient-to-br from-[#1a0638] via-[#2b0f55] to-[#3a1570]">

  {/* DESKTOP */}
  <div className="hidden md:grid grid-cols-2 h-full">

    <DesktopLeft isLogin={isLogin} />

    <div className="flex items-center justify-center">
      <Form isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>

  </div>

  {/* MOBILE */}
  <div className="md:hidden h-screen flex flex-col">

    <div className="flex-1 relative px-5 pt-8 pb-4 flex items-end">

      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-500/40 blur-3xl animate-pulse" />
      <div className="absolute top-10 right-0 w-36 h-36 rounded-full bg-purple-400/40 blur-2xl animate-pulse" />

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

    <div className="flex-1 overflow-y-auto px-3 py-4 flex items-start justify-center">
      <Form isLogin={isLogin} setIsLogin={setIsLogin} mobile />
    </div>

  </div>

</div>

);
}

/* ================= LEFT ================= */

function DesktopLeft({ isLogin }: { isLogin: boolean }) {

return (
<div className="relative flex items-center justify-center overflow-hidden">

  <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/30 blur-3xl animate-pulse" />
  <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-purple-400/30 blur-2xl animate-pulse" />

  <div className="relative z-10 px-16 text-white">

    <h1 className="text-4xl font-bold mb-3">
      {isLogin ? "Start Your Next Journey" : "Create Your Account"}
    </h1>

    <h2 className="text-5xl font-extrabold text-purple-300">
      {isLogin ? "With Confidence" : "Drive Smarter"}
    </h2>

    <p className="text-gray-300 mt-6 max-w-md">
      Luxury cars, instant booking, transparent pricing, and 24/7 support —
      all in one premium platform.
    </p>

  </div>

</div>

);
}

/* ================= FORM ================= */

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

const [name, setName] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");

const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string>("");

const [showForgot, setShowForgot] = useState<boolean>(false);
const [forgotEmail, setForgotEmail] = useState<string>("");

/* GOOGLE LOGIN */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleGoogleLogin = async (credentialResponse: any) => {

try {

  const res = await axios.post(`${API}/api/google-login`, {
    token: credentialResponse.credential
  });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  router.replace("/");

} catch {

  setError("Google login failed");

}

};

/* LOGIN / REGISTER */

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

e.preventDefault();

setLoading(true);
setError("");

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
    setError(data.msg || "Something went wrong");
    return;
  }

  if (!isLogin) {

    alert("Signup successful! Please login.");
    setIsLogin(true);
    setPassword("");
    return;

  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  router.replace("/");

} catch {

  setError("Server error");

} finally {

  setLoading(false);

}

};

/* FORGOT PASSWORD */

const handleForgotPassword = async () => {

if (!forgotEmail) {
  setError("Enter your email");
  return;
}

try {

  await axios.post(`${API}/api/forgot-password`, {
    email: forgotEmail
  });

  alert("Password reset link sent to your email");
  setShowForgot(false);
  setForgotEmail("");

} catch {

  setError("Failed to send reset email");

}

};

return (

<div className={`w-full max-w-md mx-auto rounded-2xl text-white bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.45)] ${mobile ? "p-4 sm:p-6" : "p-8"}`}>

  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
    {isLogin ? "Sign In" : "Sign Up"}
  </h2>

  {error && (
    <p className="bg-red-500/20 border border-red-500/40 text-red-200 px-3 py-2 rounded mb-3 text-sm">
      {error}
    </p>
  )}

  <div className="grid grid-cols-2 gap-3 mb-4">

    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => setError("Google authentication failed")}
    />

    <button
      type="button"
      onClick={() => window.location.href = `${API}/api/github`}
      className="flex items-center justify-center gap-2 py-2 text-sm rounded-md bg-black/40 hover:bg-black/60"
    >
      <Github size={16} /> GitHub
    </button>

  </div>

  <form onSubmit={handleSubmit} className="space-y-3">

    {!isLogin && (
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none"
        placeholder="Full Name"
        required
      />
    )}

    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none"
      placeholder="Email"
      type="email"
      required
    />

    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none"
      placeholder="Password"
      required
    />

    {isLogin && (
      <div className="text-right">
        <button
          type="button"
          onClick={() => setShowForgot(true)}
          className="text-xs text-purple-300 hover:underline"
        >
          Forgot password?
        </button>
      </div>
    )}

    <button
      disabled={loading}
      className="w-full py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-500 font-semibold shadow disabled:opacity-50"
    >
      {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
    </button>

  </form>

  {showForgot && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-[#2b0f55] p-6 rounded-xl w-full max-w-sm">

        <h3 className="text-lg font-bold mb-3 text-white">
          Reset Password
        </h3>

        <input
          type="email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 rounded-md bg-white/10 mb-3 outline-none"
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={() => setShowForgot(false)}
            className="px-3 py-1 text-sm bg-gray-500/40 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleForgotPassword}
            className="px-3 py-1 text-sm bg-purple-600 rounded"
          >
            Send Reset Link
          </button>

        </div>

      </div>

    </div>
  )}

  <p className="text-center text-sm mt-4 text-gray-300">

    {isLogin ? (
      <>
        Don’t have an account?{" "}
        <button
          onClick={() => setIsLogin(false)}
          className="text-purple-300 font-semibold"
        >
          Sign up
        </button>
      </>
    ) : (
      <>
        Already have an account?{" "}
        <button
          onClick={() => setIsLogin(true)}
          className="text-purple-300 font-semibold"
        >
          Sign in
        </button>
      </>
    )}

  </p>

</div>

);
}