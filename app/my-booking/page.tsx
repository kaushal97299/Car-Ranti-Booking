"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck, Clock, CheckCircle,
  XCircle, Download, Car, IndianRupee,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyBookingPage() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [page,     setPage]     = useState(1);
  const PER_PAGE = 5;
const [cancelId,setCancelId] = useState<string|null>(null);
const [cancelReason,setCancelReason] = useState("");
const [showCancelModal,setShowCancelModal] = useState(false);


  /* ================= FETCH ================= */
  const fetchBookings = async () => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) { setLoading(false); return; }

      const res = await fetch(`${API}/api/booking/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      setBookings(data);

    } catch (err) {
      console.log("Fetch booking error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  /* ================= INVOICE ================= */
  const downloadInvoice = (id: string) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    window.open(
      `${API}/api/booking/invoice/${id}?token=${token}`,
      "_blank"
    );
  };
  /* ================= CANCEL BOOKING ================= */

const cancelBooking = async () => {

if(!cancelReason){
alert("Enter cancel reason");
return;
}

try{

const token = localStorage.getItem("token");

const res = await fetch(
`${API}/api/booking/cancel/${cancelId}`,
{
method:"PATCH",
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
reason:cancelReason
})
}
);

const data = await res.json();

alert(
`Booking cancelled successfully.\nRefund: ₹${data.refundAmount} (${data.refundPercentage}%)`
);

setShowCancelModal(false);
setCancelReason("");
setCancelId(null);

fetchBookings();

}catch(err){

console.log(err);

}

};
  /* ================= STATUS CONFIG ================= */
  const statusConfig: Record<string, { label: string; icon: React.ReactNode; pill: string }> = {

accepted:{
label:"Accepted",
icon:<CheckCircle size={14}/>,
pill:"bg-emerald-500/20 text-emerald-300"
},

rejected:{
label:"Rejected",
icon:<XCircle size={14}/>,
pill:"bg-gray-500/20 text-gray-300"
},

pending:{
label:"Pending",
icon:<Clock size={14}/>,
pill:"bg-yellow-500/20 text-yellow-300"
},

cancelled:{
label:"Cancelled",
icon:<XCircle size={14}/>,
pill:"bg-gray-200 text-gray-600"
}

};

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-sm font-medium">Loading bookings...</p>
        </div>
      </div>
    );
  }

  /* ================= STATS ================= */
  const total      = bookings.length;
  const accepted   = bookings.filter(b => b.bookingStatus === "accepted").length;
  const pending    = bookings.filter(b => b.bookingStatus === "pending").length;

  /* ================= PAGINATION ================= */
  const totalPages  = Math.ceil(total / PER_PAGE);
  const paginated   = bookings.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white p-4 sm:p-6 pb-24 md:pb-8">

      {/* ═══════════ HEADER ═══════════ */}
      <div className="mb-5">
        <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Overview</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-0.5 flex items-center gap-2">
          <CalendarCheck size={24} className="text-emerald-400" /> My Bookings
        </h1>
      </div>

      {/* ═══════════ STATS ROW ═══════════ */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total",    value: total,    color: "from-emerald-500 to-cyan-500"  },
          { label: "Accepted", value: accepted, color: "from-emerald-500 to-teal-500"   },
          { label: "Pending",  value: pending,  color: "from-amber-400 to-orange-400"   },
        ].map((s) => (
          <div
            key={s.label}
            className="text-emerald-300 rounded-2xl p-3 sm:p-4 shadow-md text-center"
          >
            <p className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
              {s.value}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ═══════════ EMPTY ═══════════ */}
      {bookings.length === 0 && (
        <div className="text-emerald-300 rounded-3xl shadow-xl p-12 text-center">
          <Car size={48} className="text-indigo-300 mx-auto mb-4" />
          <p className="text-white font-semibold text-lg">No bookings yet</p>
          <p className="text-gray-400 text-sm mt-1">Your booking history will appear here.</p>
        </div>
      )}

      {/* ═══════════ BOOKING CARDS ═══════════ */}
      <div className="space-y-4">
        {paginated.map((b) => {

          const cfg = statusConfig[b.bookingStatus] || statusConfig.pending;

          return (
            <div
              key={b._id}
              className="text-emerald-300 rounded-2xl shadow-md hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-shadow overflow-hidden"
            >
              {/* top colour bar */}
              <div className={`h-1 w-full ${
                b.bookingStatus === "accepted" ? "bg-gradient-to-r from-emerald-400 to-teal-400" :
                b.bookingStatus === "rejected" ? "bg-gradient-to-r from-red-400 to-rose-400"    :
                "bg-gradient-to-r from-amber-400 to-orange-400"
              }`} />

              <div className="p-4 sm:p-5">

                {/* row 1 — name + status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Car size={16} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-white text-sm sm:text-base truncate">{b.name}</h2>
                      {b.paymentIntentId && (
                        <p className="text-[10px] text-gray-400 truncate">ID: {b.paymentIntentId}</p>
                      )}
                      {b.bookingStatus==="cancelled" && b.cancelReason && (

                         <p className="text-xs text-red-500 mt-2">
                         Reason: {b.cancelReason}
                          </p>
                          )}
                          {b.bookingStatus==="cancelled" && b.refundAmount>0 && (
                           <p className="text-xs text-green-600 mt-1">
                            Refund: ₹{b.refundAmount}
                            </p>
                          )}
                          {b.autoCancelled && (
                          <p className="text-xs text-gray-500 mt-1">

Auto cancelled by system

                             </p>

                              )}
                    </div>
                  </div>

                  <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${cfg.pill}`}>
                    {cfg.icon} {cfg.label}
                  </span>
                </div>

                {/* row 2 — details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">

                  <Detail label="Pickup" value={b.pickupDate} />
                  <Detail label="Drop"   value={b.dropDate}   />
                  <Detail label="Days"   value={`${b.days} days`} />

                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Amount</p>
                    <p className="text-sm font-bold text-emerald-400 flex items-center gap-0.5 mt-0.5">
                      <IndianRupee size={13} />{b.amount}
                    </p>
                  </div>

                </div>

                {/* row 3 — invoice button */}
              {/* row 3 — actions */}

<div className="flex gap-3 mt-4 flex-wrap">

{b.bookingStatus === "accepted" &&
b.tripStatus === "upcoming" && (

<button
onClick={() => downloadInvoice(b._id)}
className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md bg-white/80 backdrop-blur-md transition"
>

<Download size={15}/> Download Invoice

</button>

)}

{(b.bookingStatus==="pending" ||

(b.bookingStatus==="accepted" && b.tripStatus==="upcoming")

) && (

<button

onClick={()=>{

setCancelId(b._id);
setShowCancelModal(true);

}}

className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow hover:bg-red-600 transition"

>

Cancel Booking

</button>

)}

</div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ═══════════ PAGINATION ═══════════ */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">

          {/* Prev */}
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-xl text-sm font-semibold text-emerald-300 shadow text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
          >
            ← Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-xl text-sm font-bold shadow transition ${
                page === i + 1
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-indigo-200"
                  : "text-emerald-300 text-white hover:bg-white/20"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-xl text-sm font-semibold text-emerald-300 shadow text-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
          >
            Next →
          </button>

        </div>
      )}

{/* CANCEL MODAL */}

{showCancelModal && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center">

<div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-xl text-white w-[350px]">

<h3 className="font-bold mb-3">

Cancel Booking

</h3>

<textarea

placeholder="Enter cancel reason"

value={cancelReason}

onChange={(e)=>setCancelReason(e.target.value)}

className="w-full bg-white/10 border border-white/10 rounded p-2 mb-4 text-white placeholder:text-gray-400"

/>

<div className="flex gap-2">

<button

onClick={cancelBooking}

className="flex-1 bg-red-500 text-white py-2 rounded"

>

Submit

</button>

<button

onClick={()=>setShowCancelModal(false)}

className="flex-1 bg-white/10 border border-white/10 text-white py-2 rounded"

>

Close

</button>

</div>

</div>

</div>

)}
    </div>
  );
}

/* ═══════════ DETAIL CELL ═══════════ */
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-slate-700 mt-0.5">{value}</p>
    </div>
  );
}
