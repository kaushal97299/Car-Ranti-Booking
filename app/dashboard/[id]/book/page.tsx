"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { carsData } from "../../page"; // ✅ FIXED IMPORT

export default function BookCarPage() {
  const { id } = useParams();
  const car = carsData.find((c) => c.id === Number(id));

  // ================= STATES =================
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [licenseNo, setLicenseNo] = useState("");

  const [licenseImg, setLicenseImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState(false);

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [dropTime, setDropTime] = useState("");

  const [openPayment, setOpenPayment] = useState(false);
  const [errorPopup, setErrorPopup] = useState("");

  if (!car) return null;

  // ================= HELPERS =================
  const today = new Date().toISOString().split("T")[0];

  const calculateDays = () => {
    if (!pickupDate || !dropDate) return 1;
    const start = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
    const end = new Date(`${dropDate}T${dropTime || "00:00"}`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.ceil(diff) : 1;
  };

  const days = calculateDays();
  const totalPrice = days * car.price;

  const validateForm = () => {
    if (!fullName) return "Please enter your full name";
    if (!phone) return "Please enter phone number";
    if (!email) return "Please enter email";
    if (!licenseNo) return "Please enter license number";
    if (!licenseImg) return "Please upload license image";
    if (!pickupDate) return "Please select pickup date";
    if (!pickupTime) return "Please select pickup time";
    if (!dropDate) return "Please select drop date";
    if (!dropTime) return "Please select drop time";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-fuchsia-300 p-4">

      {/* ================= ERROR POPUP ================= */}
      {errorPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-sm">
            <h3 className="text-lg font-bold text-red-600 mb-2">Error</h3>
            <p className="text-sm">{errorPopup}</p>
            <button
              onClick={() => setErrorPopup("")}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl font-bold"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ================= IMAGE PREVIEW ================= */}
      {previewImg && licenseImg && (
        <div
          onClick={() => setPreviewImg(false)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
        >
          <img
            src={URL.createObjectURL(licenseImg)}
            className="max-h-[90%] max-w-[90%] rounded-xl"
          />
        </div>
      )}

      {/* ================= PAYMENT MODAL ================= */}
      {openPayment && (
        <Modal>
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <p className="mb-4">
            Pay <b>₹{totalPrice}</b> for <b>{car.name}</b>
          </p>

          <div className="space-y-3">
            <button className="w-full border py-2 rounded-xl">UPI</button>
            <button className="w-full border py-2 rounded-xl">Card</button>
            <button className="w-full border py-2 rounded-xl">Cash</button>
          </div>

          <button
            onClick={() => {
              setOpenPayment(false);
              alert("Booking Confirmed 🎉");
            }}
            className="w-full bg-green-600 text-white py-2 rounded-xl mt-5 font-bold"
          >
            Pay Now
          </button>
        </Modal>
      )}

      {/* ================= MAIN UI ================= */}
      <div className="max-w-6xl mx-auto bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl p-5 grid lg:grid-cols-[1fr_300px] gap-6">

        {/* LEFT */}
        <div className="space-y-5">
          <div className="bg-white/40 backdrop-blur rounded-2xl p-5">
            <h3 className="font-bold text-indigo-700 mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Input label="Full Name" value={fullName} onChange={(e:any)=>setFullName(e.target.value)} />
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Input label="Phone Number" value={phone} onChange={(e:any)=>setPhone(e.target.value)} />
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Input label="Email" full value={email} onChange={(e:any)=>setEmail(e.target.value)} />
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur rounded-2xl p-5">
            <h3 className="font-bold text-purple-700 mb-4">License Verification</h3>
            <div className="grid md:grid-cols-2 gap-4 items-center">
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Input label="License Number" value={licenseNo} onChange={(e:any)=>setLicenseNo(e.target.value.toUpperCase())} />
              <input type="file" accept="image/*" onChange={(e)=>setLicenseImg(e.target.files?.[0] || null)} />
              {licenseImg && (
                <button onClick={() => setPreviewImg(true)} className="text-xs underline text-indigo-700">
                  Preview Image
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700 text-white rounded-2xl p-5 h-fit shadow-xl">
          <h2 className="text-lg font-bold">{car.name}</h2>
          <p className="text-xs opacity-80 mb-3">{car.brand} • {car.model}</p>

          <div className="grid grid-cols-2 gap-2 text-xs mb-4">
            <span>⛽ {car.fuel}</span>
            <span>⚙ {car.gear}</span>
            <span>⭐ {car.rating}</span>
            <span>🚗 {car.class}</span>
          </div>

          <div className="bg-white/20 rounded-xl p-3 mb-4">
            <div className="grid grid-cols-2 gap-2">
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <InputSmall label="Pickup Date" type="date" min={today} value={pickupDate} onChange={(e:any)=>{setPickupDate(e.target.value);setDropDate("");}} />
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <InputSmall label="Pickup Time" type="time" value={pickupTime} onChange={(e:any)=>setPickupTime(e.target.value)} />
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <InputSmall label="Drop Date" type="date" value={dropDate} min={pickupDate ? new Date(new Date(pickupDate).getTime() + 86400000).toISOString().split("T")[0] : today} onChange={(e:any)=>setDropDate(e.target.value)} />
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <InputSmall label="Drop Time" type="time" value={dropTime} onChange={(e:any)=>setDropTime(e.target.value)} />
            </div>
          </div>

          <div className="mt-4 border-t border-white/30 pt-4">
            <p className="text-xs opacity-80">Total ({days} days)</p>
            <p className="text-2xl font-extrabold">₹{totalPrice}</p>
          </div>

          <button
            onClick={() => {
              const err = validateForm();
              if (err) {
                setErrorPopup(err);
                return;
              }
              setOpenPayment(true);
            }}
            className="w-full mt-4 bg-white text-indigo-700 py-2.5 rounded-xl font-bold"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Modal({ children }:{ children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden p-6 flex flex-col">
        {children}
      </div>
    </div>
  );
}
 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
function Input({ label, type = "text", full, ...props }: any) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input type={type} {...props} className="w-full mt-1 p-3 rounded-xl bg-white/30 border" />
    </div>
  );
}
 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
function InputSmall({ label, type = "text", full, ...props }: any) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="text-[11px] opacity-80">{label}</label>
      <input type={type} {...props} className="w-full mt-1 p-2 text-xs rounded-lg bg-white/20 border" />
    </div>
  );
}
