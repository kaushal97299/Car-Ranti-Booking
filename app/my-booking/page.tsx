"use client";

import { useEffect, useState } from "react";

export default function MyBookingPage() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {

    try {

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/booking/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();
      setBookings(data);

    } catch (err) {
      console.log("Fetch booking error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const downloadInvoice = (id:string) => {

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/booking/invoice/${id}?token=${token}`,
      "_blank"
    );
  };

  if (loading) {
    return <div className="p-10">Loading bookings...</div>;
  }

  return (

    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200">

      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 && (
        <p>No bookings yet</p>
      )}

      <div className="grid gap-4">

        {bookings.map((b) => (

          <div
            key={b._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >

            <div>

              <h2 className="text-lg font-bold">
                {b.name}
              </h2>

              <p className="text-sm">
                {b.pickupDate} → {b.dropDate}
              </p>

              <p className="text-sm">
                {b.days} days
              </p>

              <p className="text-sm">
                ₹{b.amount}
              </p>

              {b.paymentIntentId && (
                <p className="text-xs text-gray-500">
                  Payment ID: {b.paymentIntentId}
                </p>
              )}

              <p className={`text-sm font-bold
                ${b.bookingStatus === "accepted" ? "text-green-600" :
                  b.bookingStatus === "rejected" ? "text-red-600" :
                  "text-yellow-600"}
              `}>
                {b.bookingStatus.toUpperCase()}
              </p>

            </div>

            {b.bookingStatus === "accepted" && (

              <button
                onClick={() => downloadInvoice(b._id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Download Invoice
              </button>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}