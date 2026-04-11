/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */
"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Heart, CalendarCheck, Star, TrendingUp,
  Car, ChevronLeft, ChevronRight, Flame, Crown,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage() {
  const router = useRouter();

  const token   = typeof window !== "undefined" ? localStorage.getItem("token")   : null;
  const userRaw = typeof window !== "undefined" ? localStorage.getItem("user")    : null;
  const user    = userRaw ? JSON.parse(userRaw) : null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allCars,       setAllCars]       = useState<any[]>([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlist,      setWishlist]      = useState<{ carId: string; wishlistId: string }[]>([]);
  const [heroIdx,       setHeroIdx]       = useState(0);

  /* ── auth ── */
  useEffect(() => { if (!token) router.push("/auth"); }, [router, token]);

  /* ── fetch cars ── */
  const fetchCars = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/api/inventory`);
      const data = await res.json();
      setAllCars(Array.isArray(data) ? data : []);
    } catch (e) { console.log(e); }
  }, []);

  /* ── fetch booking count ── */
  const fetchBookings = useCallback(async () => {
    try {
      if (!token) return;
      const res  = await fetch(`${API}/api/booking/my`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return;
      const data = await res.json();
      setTotalBookings(Array.isArray(data) ? data.length : 0);
    } catch (e) { console.log(e); }
  }, [token]);

  /* ── fetch wishlist ── */
  const fetchWishlist = useCallback(async () => {
    try {
      if (!token) return;
      const res  = await fetch(`${API}/api/wishlist`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return;
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setWishlist(data.map((i: any) => ({ carId: i.car._id, wishlistId: i._id })));
      setWishlistCount(data.length);
    } catch (e) { console.log(e); }
  }, [token]);

  useEffect(() => {
    fetchCars();
    fetchBookings();
    fetchWishlist();
  }, [fetchCars, fetchBookings, fetchWishlist]);

  /* ── toggle wishlist ── */
  const toggleWishlist = async (carId: string) => {
    if (!token) { alert("Please login first"); return; }
    const exist = wishlist.find((w) => w.carId === carId);
    if (exist) {
      await fetch(`${API}/api/wishlist/${exist.wishlistId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((p) => p.filter((w) => w.carId !== carId));
      setWishlistCount((p) => p - 1);
    } else {
      const res  = await fetch(`${API}/api/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ carId }),
      });
      const data = await res.json();
      setWishlist((p) => [...p, { carId, wishlistId: data._id }]);
      setWishlistCount((p) => p + 1);
    }
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  /* ── helpers ── */
  const imgSrc = (car: { image?: string }) =>
    car.image?.startsWith("http") ? car.image : `${API}${car.image}`;

  const isWishlisted = (id: string) => wishlist.some((w) => w.carId === id);

  /* ── derived lists (max 4 each) ── */
  const heroCars     = [...allCars].sort((a, b) => (b.rating  || 0) - (a.rating  || 0)).slice(0, 5);
  const topRated     = [...allCars].sort((a, b) => (b.rating  || 0) - (a.rating  || 0)).slice(0, 4);
  const trendingCars = [...allCars].sort((a, b) => (b.reviews || 0) - (a.reviews || 0)).slice(0, 4);
  const luxuryCars   = [...allCars].sort((a, b) =>  b.price         -  a.price        ).slice(0, 4);

  /* ── hero auto-slide ── */
  useEffect(() => {
    if (!heroCars.length) return;
    const t = setInterval(() => setHeroIdx((p) => (p + 1) % heroCars.length), 4500);
    return () => clearInterval(t);
  }, [heroCars.length]);

  /* ── stat cards ── */
  const stats = [
    { label: "Total Cars",   value: allCars.length,  icon: <Car          size={18}/>, color: "from-emerald-500 to-cyan-500", path: "/dashboard"  },
    { label: "My Bookings",  value: totalBookings,   icon: <CalendarCheck size={18}/>, color: "from-purple-500 to-fuchsia-500", path: "/my-booking" },
    { label: "Wishlist",     value: wishlistCount,   icon: <Heart        size={18}/>, color: "from-pink-500 to-rose-500",    path: "/wishlist"   },
  ];

  /* ── section row component ── */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CarRow = ({ cars, badge, badgeColor }: { cars: any[]; badge: string; badgeColor: string }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cars.map((car) => (
        <div
          key={car._id}
          onClick={() => router.push(`/dashboard/${car._id}`)}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
        >
          <div className="relative">
            <img
              src={imgSrc(car)}
              className="w-full h-32 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* badge */}
            <span className={`absolute top-2 left-2 ${badgeColor} text-white text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
              {badge}
            </span>
            {/* wishlist */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleWishlist(car._id); }}
              className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow text-sm hover:scale-110 transition"
            >
              {isWishlisted(car._id) ? "❤️" : "🤍"}
            </button>
          </div>
          <div className="p-3">
            <p className="font-semibold text-sm text-white truncate">{car.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{car.brand} · {car.model}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-[11px] text-slate-600 font-medium">{car.rating || "4.5"}</span>
              <span className="text-[10px] text-slate-400">({car.reviews || 0})</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm font-bold text-emerald-300">₹{car.price}<span className="text-[10px] font-normal text-slate-400">/day</span></p>
              <button
                onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/${car._id}`); }}
                className="text-[11px] bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-2.5 py-1 rounded-lg font-medium"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
   <div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white">

      {/* ═══════════════ HEADER ═══════════════ */}
      <div className="px-4 sm:px-6 pt-5 pb-3 flex justify-between items-center">
        <div>
          <p className="text-xs text-emerald-300 font-medium uppercase tracking-wider">Dashboard</p>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            Hey, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition"
        >
          Browse Cars
        </button>
      </div>

      {/* ═══════════════ STATS ═══════════════ */}
      <div className="grid grid-cols-3 gap-3 px-4 sm:px-6 mt-1">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => router.push(s.path)}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-2 hover:shadow-lg transition text-left"
          >
            <div className={`p-2 rounded-xl bg-gradient-to-br ${s.color} text-white flex-shrink-0`}>
              {s.icon}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[10px] sm:text-xs text-gray-400">{s.label}</p>
              <p className="text-lg font-bold text-white">{s.value || "—"}</p>
            </div>
          </button>
        ))}
      </div>

      {/* ═══════════════ HERO CAROUSEL ═══════════════ */}
      {heroCars.length > 0 && (
        <div className="px-4 sm:px-6 mt-5">
          <div className="relative h-[200px] sm:h-[260px] rounded-2xl overflow-hidden shadow-xl">

            {/* slides */}
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${heroIdx * 100}%)` }}
            >
              {heroCars.map((car) => (
                <div key={car._id} className="min-w-full h-full relative flex-shrink-0">
                  <img src={imgSrc(car)} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                    <div className="text-white">
                      <h3 className="text-base sm:text-lg font-bold leading-tight">{car.name}</h3>
                      <p className="text-xs text-white/70 mt-0.5">{car.brand} · {car.model}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs text-amber-300">{car.rating || "4.5"} · {car.reviews || 0} reviews</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-white font-bold text-base">₹{car.price}<span className="text-xs font-normal">/day</span></p>
                      <button
                        onClick={() => router.push(`/dashboard/${car._id}`)}
                        className="mt-1.5 bg-white/90 text-[#020b0a] px-3 py-1.5 rounded-full text-xs font-bold hover:bg-indigo-50 transition"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* arrows */}
            <button
              onClick={() => setHeroIdx((p) => (p - 1 + heroCars.length) % heroCars.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/60 transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setHeroIdx((p) => (p + 1) % heroCars.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/60 transition"
            >
              <ChevronRight size={16} />
            </button>

            {/* dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {heroCars.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${heroIdx === i ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ TOP RATED ═══════════════ */}
      {topRated.length > 0 && (
        <div className="px-4 sm:px-6 mt-7">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-white flex items-center gap-2 text-sm sm:text-base">
              <Star size={15} className="text-amber-500 fill-amber-500" /> Top Rated
            </h2>
            <button onClick={() => router.push("/dashboard")} className="text-xs text-emerald-300 font-semibold hover:underline">
              See all →
            </button>
          </div>
        
          <CarRow cars={topRated} badge="⭐ Top Rated" badgeColor="bg-amber-500" />
        </div>
      )}

      {/* ═══════════════ TRENDING ═══════════════ */}
      {trendingCars.length > 0 && (
        <div className="px-4 sm:px-6 mt-7">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-white flex items-center gap-2 text-sm sm:text-base">
              <Flame size={15} className="text-orange-500" /> Trending
            </h2>
            <button onClick={() => router.push("/dashboard")} className="text-xs text-emerald-300 font-semibold hover:underline">
              See all →
            </button>
          </div>
          <CarRow cars={trendingCars} badge="🔥 Trending" badgeColor="bg-orange-500" />
        </div>
      )}

      {/* ═══════════════ LUXURY ═══════════════ */}
      {luxuryCars.length > 0 && (
        <div className="px-4 sm:px-6 mt-7">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-white flex items-center gap-2 text-sm sm:text-base">
              <Crown size={15} className="text-purple-600" /> Luxury Picks
            </h2>
            <button onClick={() => router.push("/dashboard")} className="text-xs text-emerald-300 font-semibold hover:underline">
              See all →
            </button>
          </div>
          <CarRow cars={luxuryCars} badge="💎 Luxury" badgeColor="bg-purple-600" />
        </div>
      )}

      {/* ═══════════════ QUICK ACTIONS ═══════════════ */}
      <div className="px-4 sm:px-6 mt-8">
        <h2 className="font-bold text-white mb-3 text-sm sm:text-base flex items-center gap-2">
          <TrendingUp size={15} className="text-emerald-300" /> Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { emoji: "🚗", label: "Browse Cars",  sub: "Find your ride",    path: "/dashboard",   from: "from-indigo-500", to: "to-purple-500"  },
            { emoji: "❤️", label: "Wishlist",     sub: `${wishlistCount} saved`,  path: "/wishlist",    from: "from-pink-500",   to: "to-rose-500"    },
            { emoji: "📅", label: "My Bookings",  sub: `${totalBookings} total`,  path: "/my-booking",  from: "from-emerald-500",to: "to-teal-500"    },
            { emoji: "👤", label: "Profile",      sub: "Manage account",    path: "/userprofile", from: "from-violet-500", to: "to-purple-500"  },
          ].map((a) => (
            <button
              key={a.path}
              onClick={() => router.push(a.path)}
              className={`bg-gradient-to-br ${a.from} ${a.to} text-white p-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 text-left`}
            >
              <span className="text-2xl">{a.emoji}</span>
              <p className="font-bold text-sm mt-2">{a.label}</p>
              <p className="text-[11px] text-white/70 mt-0.5">{a.sub}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
