"use client";

import { useState, ReactNode } from "react";
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
  Menu,
  X,
} from "lucide-react";

export default function UserSidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          fixed top-0 left-0 h-screen w-50
          bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200
          border-r border-white/40
          text-slate-800 hidden md:block
        "
      >
        <div className="px-6 py-4 text-lg font-bold border-b border-white/40 text-slate-900">
          Car Booking
        </div>

        <nav className="px-3 py-4 space-y-1">
          <NavItem router={router} path="/" label="Dashboard" icon={<Home size={18} />} active={pathname === "/"} />
          <NavItem router={router} path="/dashboard" label="Browse Cars" icon={<Car size={18} />} active={pathname === "/dashboard"} />
          <NavItem router={router} path="/cart" label="Cart" icon={<ShoppingCart size={18} />} active={pathname === "/cart"} />
          <NavItem router={router} path="/my-bookings" label="My Bookings" icon={<CalendarCheck size={18} />} active={pathname === "/my-bookings"} />
          <NavItem router={router} path="/wishlist" label="Wishlist" icon={<Heart size={18} />} active={pathname === "/wishlist"} />
          <NavItem router={router} path="/notifications" label="Notifications" icon={<Bell size={18} />} active={pathname === "/notifications"} />
          <NavItem router={router} path="/profile" label="Profile" icon={<User size={18} />} active={pathname === "/profile"} />
          <NavItem router={router} path="/auth" label="Login" icon={<LogIn size={18} />} active={pathname === "/auth"} />
        </nav>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav
        className="
        fixed bottom-0 left-0 right-0
        bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600
        text-white border-t border-white/30
        flex justify-around py-2 md:hidden z-40 shadow-xl"
      >
        <BottomItem router={router} path="/" icon={<Home size={20} />} label="Home" />
        <BottomItem router={router} path="/dashboard" icon={<Car size={20} />} label="Cars" />
        <BottomItem router={router} path="/cart" icon={<ShoppingCart size={20} />} label="Cart" />
        <BottomItem router={router} path="/profile" icon={<User size={20} />} label="Profile" />
        <button onClick={() => setOpen(true)} className="flex flex-col items-center text-xs text-white/90 hover:text-yellow-300">
          <Menu size={22} /> More
        </button>
      </nav>

      {/* MOBILE SHEET */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          <aside
            className="
              absolute bottom-0 left-3 right-3 h-[65%]
              bg-gradient-to-br from-indigo-200/90 via-purple-200/90 to-fuchsia-200/90
              backdrop-blur-lg
              rounded-2xl p-4 shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3 text-slate-900">
              <h2 className="font-semibold">Menu</h2>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>

            <nav className="space-y-1 overflow-y-auto">
              <NavItem router={router} path="/" label="Dashboard" icon={<Home size={18} />} active={pathname === "/"} close={() => setOpen(false)} />
              <NavItem router={router} path="/dashboard" label="Browse Cars" icon={<Car size={18} />} active={pathname === "/dashboard"} close={() => setOpen(false)} />
              <NavItem router={router} path="/cart" label="Cart" icon={<ShoppingCart size={18} />} active={pathname === "/cart"} close={() => setOpen(false)} />
              <NavItem router={router} path="/my-bookings" label="My Bookings" icon={<CalendarCheck size={18} />} active={pathname === "/my-bookings"} close={() => setOpen(false)} />
              <NavItem router={router} path="/wishlist" label="Wishlist" icon={<Heart size={18} />} active={pathname === "/wishlist"} close={() => setOpen(false)} />
              <NavItem router={router} path="/notifications" label="Notifications" icon={<Bell size={18} />} active={pathname === "/notifications"} close={() => setOpen(false)} />
              <NavItem router={router} path="/profile" label="Profile" icon={<User size={18} />} active={pathname === "/profile"} close={() => setOpen(false)} />
              <NavItem router={router} path="/auth" label="Login" icon={<LogIn size={18} />} active={pathname === "/auth"} close={() => setOpen(false)} />
            </nav>
          </aside>
        </div>
      )}
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
