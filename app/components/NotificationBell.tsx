/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  /* ================= FETCH NOTIFICATIONS ================= */

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data) setNotifications(data); })
      .catch((err) => console.log("Notification error:", err));
  }, []);

  /* ================= MARK AS READ ================= */

  const markAsRead = async (id: string) => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if (!token) return;

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.filter((n) => n._id !== id)
      );
    } catch (err) {
      console.log("Mark read error:", err);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="relative w-full">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-emerald-300 transition relative"
      >
        <span className="text-emerald-300">🔔</span>
        <span>Notifications</span>

        {notifications.length > 0 && (
          <span className="absolute right-4 text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-2 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 max-h-[70vh] overflow-y-auto scrollbar-thin w-72 bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl p-3 z-[999]">

          {notifications.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-2">
              No new notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className="border-b border-white/10 py-2 text-sm"
              >
                <p className="font-semibold text-white">
                  {n.title}
                </p>

                <p className="text-gray-400">
                  {n.message}
                </p>

                <button
                  onClick={() => markAsRead(n._id)}
                  className="block text-emerald-300 hover:text-cyan-300 text-xs mt-1 transition"
                >
                  Mark as read
                </button>
              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
}