"use client";

import { useState, ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Car,
  ShoppingCart,
  CalendarCheck,
  Heart,
  Bell,
  User,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function UserSidebar() {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  /* ❤️ Wishlist Count */
  const [wishlistCount, setWishlistCount] = useState(0);

  /* 🛒 Cart Count */
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  /* ================= TOKEN ================= */

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ================= GET USER ================= */

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  /* ================= FETCH WISHLIST COUNT ================= */

  const fetchWishlistCount = async () => {
    try {
      if (!token) {
        setWishlistCount(0);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();

      setWishlistCount(data.count || 0);

    } catch (err) {
      console.log("Wishlist count error:", err);
    }
  };

  /* ================= FETCH CART COUNT ================= */

  const fetchCartCount = async () => {
    try {
      if (!token) {
        setCartCount(0);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();

      setCartCount(data.count || 0);

    } catch (err) {
      console.log("Cart count error:", err);
    }
  };

  /* ================= LIVE + AUTO UPDATE ================= */

  useEffect(() => {

    // Initial Load
    fetchWishlistCount();
    fetchCartCount();

    // Custom Events
    const updateWishlist = () => fetchWishlistCount();
    const updateCart = () => fetchCartCount();

    // Storage Sync
    const storageUpdate = (e: StorageEvent) => {
      if (e.key === "token") {
        fetchWishlistCount();
        fetchCartCount();
      }
    };

    window.addEventListener("wishlistUpdated", updateWishlist);
    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("storage", storageUpdate);

    // Safety Sync
    const interval = setInterval(() => {
      fetchWishlistCount();
      fetchCartCount();
    }, 30000);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlist);
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("storage", storageUpdate);
      clearInterval(interval);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.clear();

    setWishlistCount(0);
    setCartCount(0);

    router.push("/auth");
  };

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          fixed top-0 left-0 h-screen w-50
          bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200
          border-r border-white/40
          text-slate-800 hidden md:block
        "
      >

        {/* BRAND */}
        <div
          onClick={() => router.push("/")}
          className="px-6 py-4 text-lg font-bold border-b border-white/40 text-slate-900
          flex items-center gap-2 cursor-pointer hover:bg-white/30"
        >
          🚗 Car Booking
        </div>

        {/* USER INFO */}
        {user && (
          <div
            onClick={() => router.push("/userprofile")}
            className="px-5 py-3 border-b border-white/40 cursor-pointer hover:bg-white/30"
          >
            <p className="font-semibold text-slate-900">
              {user.name}
            </p>
            <p className="text-xs text-slate-600 truncate">
              {user.email}
            </p>
          </div>
        )}

        <nav className="px-3 py-4 space-y-1">

          <NavItem router={router} path="/" label="Dashboard" icon={<Home size={18} />} active={pathname === "/"} />

          <NavItem router={router} path="/dashboard" label="Browse Cars" icon={<Car size={18} />} active={pathname === "/dashboard"} />

          {/* 🛒 Cart With Counter */}
          <NavItem
            router={router}
            path="/cart"
            label={`Cart ${cartCount > 0 ? `(${cartCount})` : ""}`}
            icon={<ShoppingCart size={18} />}
            active={pathname === "/cart"}
          />

          <NavItem router={router} path="/my-booking" label="My Bookings" icon={<CalendarCheck size={18} />} active={pathname === "/my-booking"} />

          {/* ❤️ Wishlist With Counter */}
          <NavItem
            router={router}
            path="/wishlist"
            label={`Wishlist ${wishlistCount > 0 ? `(${wishlistCount})` : ""}`}
            icon={<Heart size={18} />}
            active={pathname === "/wishlist"}
          />

          <NavItem router={router} path="/notifications" label="Notifications" icon={<Bell size={18} />} active={pathname === "/notifications"} />

          <NavItem router={router} path="/profile" label="Profile" icon={<User size={18} />} active={pathname === "/profile"} />

          {/* LOGIN / LOGOUT */}
          {!user ? (
            <NavItem
              router={router}
              path="/auth"
              label="Login"
              icon={<LogIn size={18} />}
              active={pathname === "/auth"}
            />
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-100/50 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}

        </nav>
      </aside>
    </>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({
  router,
  path,
  icon,
  label,
  close,
  active,
}: {
  router: ReturnType<typeof useRouter>;
  path: string;
  icon: ReactNode;
  label: string;
  close?: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={() => {
        router.push(path);
        close?.();
      }}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200
      ${
        active
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
          : "text-slate-800 hover:bg-white/30 hover:text-indigo-900"
      }`}
    >
      <span className={active ? "text-yellow-300" : "text-indigo-700"}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function BottomItem({
  router,
  path,
  icon,
  label,
}: {
  router: ReturnType<typeof useRouter>;
  path: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={() => router.push(path)}
      className="flex flex-col items-center text-xs text-white/80 hover:text-yellow-300 transition"
    >
      {icon}
      {label}
    </button>
  );
}