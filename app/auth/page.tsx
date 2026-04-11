/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { isTokenExpired, logoutUser } from "../utils/auth";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./auth.css";

const API = process.env.NEXT_PUBLIC_API_URL as string;

const BUBBLES = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  left: `${(i * 4.1 + 3) % 100}%`,
  size: 20 + (i * 7.3) % 60,
  delay: `${(i * 0.23) % 5}s`,
  duration: `${12 + (i * 0.43) % 10}s`,
}));

export default function SpaceAuth() {

const [isLogin, setIsLogin] = useState<boolean>(true);
const [checking, setChecking] = useState<boolean>(true);

const router = useRouter();

useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {

    if (isTokenExpired(token)) {
      logoutUser();
    } else {
      router.replace("/");
    }

  } else {
    setChecking(false);
  }

}, [router]);

if (checking) return null;

return (
<div className="relative min-h-screen overflow-hidden bg-[#020b0a]">
  <div className="absolute inset-0 mesh-bg" />
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
  {BUBBLES.map((b) => (
    <span
      key={b.id}
      className="bubble"
      style={{
        left: b.left,
        width: `${b.size}px`,
        height: `${b.size}px`,
        animationDelay: b.delay,
        animationDuration: b.duration,
      }}
    />
  ))}
</div>

  {/* DESKTOP */}
  <div className="hidden md:grid grid-cols-2 min-h-screen">

    <DesktopLeft isLogin={isLogin} />

    <div className="flex items-center justify-center py-10 px-6">
      <Form isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>

  </div>

  {/* MOBILE */}
  <div className="md:hidden flex flex-col min-h-screen">

    {/* Top Section */}
    <div className="relative pt-10 pb-6 px-5 text-center overflow-hidden">
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-emerald-500/30 blur-3xl animate-pulse" />
      <div className="absolute top-8 right-0 w-32 h-32 rounded-full bg-cyan-400/30 blur-2xl animate-pulse" />

      <div className="relative z-10 text-white">
        <p className="text-emerald-300 text-sm mb-1">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </p>
        <h1 className="text-2xl font-bold">
          {isLogin ? "Sign In to Continue" : "Drive Smarter"}
        </h1>

        <div className="flex justify-center gap-6 mt-3">
          <div><span className="text-base font-bold">500+</span><span className="text-gray-300 text-xs block">Cars</span></div>
          <div><span className="text-base font-bold">50+</span><span className="text-gray-300 text-xs block">Users</span></div>
          <div><span className="text-base font-bold">24/7</span><span className="text-gray-300 text-xs block">Support</span></div>
        </div>

        <p className="text-gray-300 text-xs mt-3 max-w-xs mx-auto">
          Luxury cars, instant booking, transparent pricing, and 24/7 support — all in one premium platform.
        </p>
      </div>
    </div>

    {/* Form Section */}
    <div className="flex-1 px-4 pb-8">
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

  <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-500/30 blur-3xl animate-pulse" />
  <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-cyan-400/30 blur-2xl animate-pulse" />

  <div className="relative z-10 px-16 text-white">

    <h1 className="text-4xl font-bold mb-3">
      {isLogin ? "Start Your Next Journey" : "Create Your Account"}
    </h1>

    <h2 className="text-5xl font-extrabold text-emerald-300">
      {isLogin ? "With Confidence" : "Drive Smarter"}
    </h2>

    {/* STATS ADDED */}
    <div className="flex gap-6 mt-4">
      <div>
        <span className="text-xl font-bold text-white">500+</span>
        <span className="text-gray-300 text-sm block">Cars</span>
      </div>
      <div>
        <span className="text-xl font-bold text-white">50+</span>
        <span className="text-gray-300 text-sm block">Users</span>
      </div>
      <div>
        <span className="text-xl font-bold text-white">24/7</span>
        <span className="text-gray-300 text-sm block">Support</span>
      </div>
    </div>

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
const [confirmPassword, setConfirmPassword] = useState<string>("");

const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string>("");

const [showForgot, setShowForgot] = useState<boolean>(false);
const [forgotEmail, setForgotEmail] = useState<string>("");

/* ================= VALIDATION FUNCTIONS ================= */

const validateName = (name: string): { isValid: boolean; message: string } => {
  const trimmed = name.trim();
  if (!trimmed) return { isValid: false, message: "Full name is required" };
  if (trimmed.length < 2) return { isValid: false, message: "Name must be at least 2 characters" };
  if (trimmed.length > 50) return { isValid: false, message: "Name cannot exceed 50 characters" };
  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return { isValid: false, message: "Name can only contain letters, spaces, hyphens and apostrophes" };
  }
  return { isValid: true, message: "" };
};

const validateEmail = (email: string): { isValid: boolean; message: string } => {
  const trimmed = email.trim();
  if (!trimmed) return { isValid: false, message: "Email is required" };
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  if (trimmed.length > 100) return { isValid: false, message: "Email is too long" };
  return { isValid: true, message: "" };
};

const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password) return { isValid: false, message: "Password is required" };
  if (password.length < 8) return { isValid: false, message: "Password must be at least 8 characters" };
  if (password.length > 100) return { isValid: false, message: "Password is too long" };
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one special character" };
  }
  
  return { isValid: true, message: "" };
};

const validateConfirmPassword = (password: string, confirm: string): { isValid: boolean; message: string } => {
  if (!isLogin && !confirm) {
    return { isValid: false, message: "Please confirm your password" };
  }
  if (password !== confirm) {
    return { isValid: false, message: "Passwords do not match" };
  }
  return { isValid: true, message: "" };
};

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
setError("");

if (!isLogin) {
  const nameValidation = validateName(name);
  if (!nameValidation.isValid) {
    setError(nameValidation.message);
    return;
  }
}

const emailValidation = validateEmail(email);
if (!emailValidation.isValid) {
  setError(emailValidation.message);
  return;
}

const passwordValidation = validatePassword(password);
if (!passwordValidation.isValid) {
  setError(passwordValidation.message);
  return;
}

if (!isLogin) {
  const confirmValidation = validateConfirmPassword(password, confirmPassword);
  if (!confirmValidation.isValid) {
    setError(confirmValidation.message);
    return;
  }
}

setLoading(true);

// ✅ FIXED: Added confirmPassword in payload
const payload = isLogin
  ? { email: email.trim(), password }
  : { 
      name: name.trim(), 
      email: email.trim(), 
      password,
      confirmPassword  // 👈 IMPORTANT: yeh add karo
    };

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
    setError(data.msg || data.error || "Something went wrong");
    return;
  }

  if (!isLogin) {

    alert("Registration successful! Please login with your credentials.");
    setIsLogin(true);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    return;

  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  router.replace("/");

} catch (err) {

  setError("Network error. Please try again.");

} finally {

  setLoading(false);

}

};

/* FORGOT PASSWORD */

const handleForgotPassword = async () => {

setError("");

const emailValidation = validateEmail(forgotEmail);
if (!emailValidation.isValid) {
  setError(emailValidation.message);
  return;
}

setLoading(true);

try {

  await axios.post(`${API}/api/forgot-password`, {
    email: forgotEmail.trim()
  });

  alert("Password reset link has been sent to your email");
  setShowForgot(false);
  setForgotEmail("");

} catch (err: any) {

  setError(err.response?.data?.msg || "Failed to send reset email");

} finally {

  setLoading(false);

}

};

return (
<div className={`mobile-glow-soft w-full max-w-md mx-auto rounded-2xl text-white bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.55)] animate-floatCard ${mobile ? "p-5" : "p-8"}`}>

  <h2 className="text-2xl font-bold mb-2">
    {isLogin ? "Sign In" : "Sign Up"}
  </h2>

  {!isLogin && (
    <p className="text-gray-300 text-sm mb-4">
      Create your account to get started
    </p>
  )}

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

  <div className="relative my-4">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-white/20"></div>
    </div>
    <div className="relative flex justify-center text-xs">
      <span className="bg-[#0b1413] px-2 text-gray-300">or continue with email</span>
    </div>
  </div>

  <form onSubmit={handleSubmit} className="space-y-3">

    {!isLogin && (
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none focus:ring-2 focus:ring-emerald-400/50"
          placeholder="Full Name"
        />
        <p className="text-xs text-gray-400 mt-1">Min 2 characters, letters only</p>
      </div>
    )}

    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none focus:ring-2 focus:ring-emerald-400/50"
        placeholder="Email"
        type="email"
      />
    </div>

    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none focus:ring-2 focus:ring-emerald-400/50"
        placeholder="Password"
      />
      {!isLogin && (
        <p className="text-xs text-gray-400 mt-1">
          Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        </p>
      )}
    </div>

    {!isLogin && (
      <div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full bg-white/10 px-3 py-2 text-sm rounded-md outline-none focus:ring-2 focus:ring-emerald-400/50"
          placeholder="Confirm Password"
        />
      </div>
    )}

    {isLogin && (
      <div className="text-right">
        <button
          type="button"
          onClick={() => setShowForgot(true)}
          className="text-xs text-emerald-300 hover:underline"
        >
          Forgot password?
        </button>
      </div>
    )}

    <button
      type="submit"
      disabled={loading}
     className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
    </button>

  </form>

  {showForgot && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-[#0b1413] p-6 rounded-xl w-full max-w-sm">

        <h3 className="text-lg font-bold mb-3 text-white">
          Reset Password
        </h3>

        <input
          type="email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 rounded-md bg-white/10 mb-3 outline-none focus:ring-2 focus:ring-emerald-400/50"
        />

        <div className="flex justify-end gap-2">

          <button
            type="button"
            onClick={() => {
              setShowForgot(false);
              setForgotEmail("");
              setError("");
            }}
            className="px-3 py-1 text-sm bg-gray-500/40 rounded hover:bg-gray-500/60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={loading}
            className="px-3 py-1 text-sm bg-emerald-500 rounded hover:bg-emerald-600 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </div>

      </div>

    </div>
  )}

  <p className="text-center text-sm mt-4 text-gray-300">

    {isLogin ? (
      <>
        Dont have an account?{" "}
        <button
          type="button"
          onClick={() => {
            setIsLogin(false);
            setError("");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }}
          className="text-emerald-300 font-semibold hover:underline"
        >
          Sign up
        </button>
      </>
    ) : (
      <>
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => {
            setIsLogin(true);
            setError("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }}
          className="text-emerald-300 font-semibold hover:underline"
        >
          Sign in
        </button>
      </>
    )}

  </p>

</div>

);
}