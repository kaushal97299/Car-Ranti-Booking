"use client";

import { useState, ReactNode, useEffect } from "react";
import { isTokenExpired, logoutUser } from "../utils/auth";
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
  const [loadingRoute,setLoadingRoute] = useState(false);
  const pathname = usePathname();

  /* ================= TOKEN ================= */

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;


      /* ================= TOKEN EXPIRY WATCHER ================= */

useEffect(() => {
  const checkToken = () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    if (isTokenExpired(token)) {
      logoutUser();
    }
  };

  // page load check
  checkToken();

  // auto check every 30 seconds
  const interval = setInterval(checkToken, 30000);

  return () => clearInterval(interval);
}, []);

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

     if (res.status === 401) {
  logoutUser();
  return;
}

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

     if (res.status === 401) {
  logoutUser();
  return;
}

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
  logoutUser();

  setWishlistCount(0);
  setCartCount(0);

  router.push("/auth");
};

  // Navigation items
  const navItems = [
    { path: "/", label: "Dashboard", icon: <Home size={18} />, mobileIcon: <Home size={20} /> },
    { path: "/dashboard", label: "Browse Cars", icon: <Car size={18} />, mobileIcon: <Car size={20} /> },
    { 
      path: "/cart", 
      label: `Cart ${cartCount > 0 ? `(${cartCount})` : ""}`, 
      icon: <ShoppingCart size={18} />, 
      mobileIcon: <ShoppingCart size={20} />,
      badge: cartCount > 0 ? cartCount : null
    },
    { path: "/my-booking", label: "Bookings", icon: <CalendarCheck size={18} />, mobileIcon: <CalendarCheck size={20} /> },
    { 
      path: "/wishlist", 
      label: `Wishlist ${wishlistCount > 0 ? `(${wishlistCount})` : ""}`, 
      icon: <Heart size={18} />, 
      mobileIcon: <Heart size={20} />,
      badge: wishlistCount > 0 ? wishlistCount : null
    },
    { path: "/notifications", label: "Notifications", icon: <Bell size={18} />, mobileIcon: <Bell size={20} /> },
    { path: "/profile", label: "Profile", icon: <User size={18} />, mobileIcon: <User size={20} /> },
  ];

  // Items for bottom navbar (without wishlist)
  const bottomNavItems = navItems.filter(item => item.path !== "/wishlist").slice(0, 4);

  return (
    <>
{loadingRoute && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">

<div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>

</div>

)}

      {/* ================= MOBILE BOTTOM NAVBAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200 shadow-lg z-50 border-t border-white/40">
        <nav className="flex justify-around items-center px-2 py-1">
          {bottomNavItems.map((item) => (
            <MobileNavItem
              key={item.path}
              router={router}
              path={item.path}
              icon={item.mobileIcon}
              label={item.label.split(' ')[0]}
              active={pathname === item.path}
              badge={item.badge}
            />
          ))}
          
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col items-center text-xs text-slate-800 hover:text-indigo-900 transition course-pointer"
          >
            <Menu size={20} className="text-indigo-700" />
            <span>More</span>
          </button>
        </nav>
      </div>

      {/* ================= MOBILE MORE MENU ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden flex items-end justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200 rounded-t-xl shadow-2xl max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/40">
              <div className="text-lg font-bold text-slate-900">
                More Options
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-white/30 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {user && (
              <div
                onClick={() => {
                  router.push("/userprofile");
                  setOpen(false);
                }}
                className="px-4 py-3 border-b border-white/40 cursor-pointer hover:bg-white/30 cursor-pointer"
              >
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-600 truncate">{user.email}</p>
              </div>
            )}

            <nav className="px-3 py-4 space-y-1">
              {/* Sirf wohi items jo bottom navbar mein nahi hain */}
              {navItems.filter(item => !bottomNavItems.includes(item)).map((item) => (
                <NavItem
                  key={item.path}
                  router={router}
                  path={item.path}
                  label={item.label}
                  icon={item.icon}
                  close={() => setOpen(false)}
                  active={pathname === item.path}
                  
                />
              ))}

              {!user ? (
                <NavItem
                  router={router}
                  path="/auth"
                  label="Login"
                  icon={<LogIn size={18} />}
                  close={() => setOpen(false)}
                  active={pathname === "/auth"}
                />
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-100/50 transition cursor-pointer"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          fixed top-0 left-0 h-screen w-50
          bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200
          border-r border-white/40
          text-slate-800 hidden md:block 
        "
      >
        <div
          onClick={() => router.push("/")}
          className="px-6 py-4 text-lg font-bold border-b border-white/40 text-slate-900
          flex items-center gap-2 cursor-pointer hover:bg-white/30"
        >
          🚗 Car Booking
        </div>

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
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              router={router}
              path={item.path}
              label={item.label}
              icon={item.icon}
              active={pathname === item.path}
            />
          ))}

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

function MobileNavItem({
  router,
  path,
  icon,
  label,
  active,
  badge,
}: {
  router: ReturnType<typeof useRouter>;
  path: string;
  icon: ReactNode;
  label: string;
  active: boolean;
  badge?: number | null;
}) {
  return (
    <button
      onClick={() => router.push(path)}
      className={`flex flex-col items-center text-xs relative py-1 px-2 rounded-lg transition
      ${active ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg" : "text-slate-800 hover:text-indigo-900"}`}
    >
      <div className="relative">
        <span className={active ? "text-yellow-300" : "text-indigo-700"}>
          {icon}
        </span>
        {badge && badge > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </div>
      <span className="text-[10px] mt-0.5 text-slate-800">{label}</span>
    </button>
  );
}