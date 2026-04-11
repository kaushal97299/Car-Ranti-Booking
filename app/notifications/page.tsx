/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export default function NotificationBell() {

  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {

    try {

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      setNotifications(data);

    } catch (err) {
      console.log("Notification error", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotifications(prev => prev.filter(n => n._id !== id));
  };

  return (

    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="text-xl relative text-white hover:text-emerald-300 transition"
      >
        🔔

        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-2 rounded-full">
            {notifications.length}
          </span>
        )}

      </button>

      {open && (

        <div className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl p-3 z-50">

          {notifications.length === 0 ? (

            <p className="text-gray-400 text-sm text-center py-2">
              No new notifications
            </p>

          ) : (

            notifications.map(n => (

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