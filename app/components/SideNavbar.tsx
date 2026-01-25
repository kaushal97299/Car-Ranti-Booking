"use client";

import { useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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

interface NavItemProps {
  path: string;
  icon: ReactNode;
  label: string;
  close?: () => void;
  active: boolean;
}

export default function UserSidebar() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className="fixed top-0 left-0 h-screen w-50 bg-[#0f172a] text-gray-200 border-r border-[#1e293b] transition-transform duration-300 hidden md:block translate-x-0"
      >
        <div className="px-6 py-4 text-lg font-semibold border-b border-[#1e293b] flex justify-between items-center text-white">
          <span>Car Booking</span>
          {/* ❌ Desktop close button removed */}
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

      {/* ❌ DESKTOP OPEN BUTTON REMOVED */}

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0f172a] text-gray-200 border-t border-[#1e293b] flex justify-around py-2 md:hidden z-40">
        <BottomItem router={router} path="/" icon={<Home size={20} />} label="Home" />
        <BottomItem router={router} path="/cars" icon={<Car size={20} />} label="Cars" />
        <BottomItem router={router} path="/cart" icon={<ShoppingCart size={20} />} label="Cart" />
        <BottomItem router={router} path="/profile" icon={<User size={20} />} label="Profile" />
        <button onClick={() => setOpen(true)} className="flex flex-col items-center text-xs">
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
            className="absolute bottom-0 left-3 right-3 h-[65%] bg-[#0f172a] rounded-2xl p-4 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3 text-white">
              <h2 className="font-semibold">Menu</h2>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>

            <nav className="space-y-1 overflow-y-auto">
              <NavItem router={router} path="/" label="Dashboard" icon={<Home size={18} />} active={pathname === "/"} close={() => setOpen(false)} />
              <NavItem router={router} path="/cars" label="Browse Cars" icon={<Car size={18} />} active={pathname === "/cars"} close={() => setOpen(false)} />
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
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
      ${
        active
          ? "bg-[#1e293b] text-white"
          : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
      }`}
    >
      {icon}
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
      className="flex flex-col items-center text-xs text-gray-300 hover:text-white"
    >
      {icon}
      {label}
    </button>
  );
}
