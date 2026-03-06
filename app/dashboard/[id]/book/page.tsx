/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


/* ================= STRIPE ================= */
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function BookCarPage() {

  const { id } = useParams();

  /* ================= CAR ================= */
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ================= USER ================= */
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [licenseNo, setLicenseNo] = useState("");

  /* ================= ADDRESS ================= */
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [villages, setVillages] = useState<string[]>([]);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [loadingPin, setLoadingPin] = useState(false);

  /* ================= FILE ================= */
  const [licenseImg, setLicenseImg] = useState<File | null>(null);

  /* ================= DATE ================= */
const [pickupDate, setPickupDate] = useState<Date | null>(null);
const [pickupTime, setPickupTime] = useState("");

const [dropDate, setDropDate] = useState<Date | null>(null);
  const [dropTime, setDropTime] = useState("");

  /* ================= UI ================= */
  const [openPayment, setOpenPayment] = useState(false);
  const [errorPopup, setErrorPopup] = useState("");
  const [blockedRanges, setBlockedRanges] = useState<any[]>([]);

const blockedDates = blockedRanges.flatMap(range => {

  const dates = [];

  // eslint-disable-next-line prefer-const
  let current = new Date(range.from);
  const end = new Date(range.to);

  current.setHours(0,0,0,0);
  end.setHours(0,0,0,0);

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;

});
const blockedIntervals = blockedRanges.map(range => {

  const start = new Date(range.from);
  const end = new Date(range.to);

  start.setHours(0,0,0,0);
  end.setHours(0,0,0,0);

  return { start, end };

});

  useEffect(() => {

  const fetchUnavailable = async () => {
    
    try {
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/booking/unavailable/${id}`
      );
      
      const data = await res.json();
      console.log("block range,", data);
      setBlockedRanges(data);

    } catch (err) {
      console.log("Unavailable fetch error", err);
    }

  };

  if(id) fetchUnavailable();

}, [id]);

const isDateBlocked = (date:string) => {

  return blockedRanges.some(range => {

    const from = new Date(range.from);
    const to = new Date(range.to);
    const check = new Date(date);

    return check >= from && check <= to;

  });

};

const isRangeBlocked = () => {

  if (!pickupDate || !dropDate) return false;

  const start = new Date(pickupDate);
  const end = new Date(dropDate);

  start.setHours(0,0,0,0);
  end.setHours(0,0,0,0);

  for (const range of blockedRanges) {

    const blockedStart = new Date(range.from);
    const blockedEnd = new Date(range.to);

    blockedStart.setHours(0,0,0,0);
    blockedEnd.setHours(0,0,0,0);

    if (start <= blockedEnd && end >= blockedStart) {
      return true;
    }

  }

  return false;
};

useEffect(() => {

  if (!pickupDate || !dropDate) return;

  if (isRangeBlocked()) {

    setErrorPopup("Car already booked between selected dates");

    setDropDate(null);

  }

}, [pickupDate, dropDate]);

  /* ================= FETCH CAR ================= */
  useEffect(() => {

    const fetchCar = async () => {
      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/public/${id}`
        );

        const data = await res.json();

        setCar(data);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (id) fetchCar();

  }, [id]);
  /* ================= PINCODE FETCH ================= */
  const fetchPincodeData = async (pin: string) => {

  if (pin.length !== 6) return;

  try {

    setLoadingPin(true);

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/booking/pincode/${pin}`
    );

    const data = res.data;

    setCity(data.city || "");
    setStateName(data.state || "");
    setVillages(data.villages || []);

  } catch (err:any) {

    console.error("Pincode error:", err);

    setCity("");
    setStateName("");
    setVillages([]);

  } finally {

    setLoadingPin(false);

  }
};
  /* ================= HELPERS ================= */
  const today = new Date().toISOString().split("T")[0];

  const calculateDays = () => {

    if (!pickupDate || !dropDate) return 1;

   const start = new Date(pickupDate);
const end = new Date(dropDate);

if (pickupTime) {
  const [h,m] = pickupTime.split(":");
  start.setHours(Number(h),Number(m));
}

if (dropTime) {
  const [h,m] = dropTime.split(":");
  end.setHours(Number(h),Number(m));
}

    const diff =
      (end.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff > 0 ? Math.ceil(diff) : 1;
  };

  const days = calculateDays();
  const totalPrice = days * (car?.price || 0);

  /* ================= VALIDATION ================= */
  const validateForm = () => {

    if (!fullName) return "Enter name";
    if (!phone) return "Enter phone";
    if (!email) return "Enter email";
    if (!licenseNo) return "Enter license";

    if (!address) return "Enter address";
    if (!pincode) return "Enter pincode";
    if (!city) return "Invalid pincode";
    if (!selectedVillage) return "Select village";

    if (!licenseImg) return "Upload license";

    if (!pickupDate) return "Pickup date required";
    if (!pickupTime) return "Pickup time required";
    if (!dropDate) return "Drop date required";
    if (!dropTime) return "Drop time required";

    return "";
  };

  /* ================= SUBMIT ================= */
  const submitBooking = async () => {

  const err = validateForm();
  if (err) {
    setErrorPopup(err);
    return;
  }

  if (isRangeBlocked()) {
    console.log("Blocked range", blockedRanges);
    setErrorPopup("Car already booked between selected dates");
    return;
  }

  try {

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/create`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
    Authorization:`Bearer ${token}`
  },
        body: JSON.stringify({
          carId: car._id,
          name: car.name,

          days,
          amount: totalPrice,

          fullName,
          phone,
          email,
          licenseNo,

          address,
          pincode,
          city,
          state: stateName,
          village: selectedVillage,

         pickupDate: pickupDate?.toISOString().split("T")[0],
  pickupTime,
  dropDate: dropDate?.toISOString().split("T")[0],
  dropTime,
        }),
      }
    );

    const data = await res.json();

if (!res.ok) {
  setErrorPopup(data.message || "Booking error");
  return;
}

window.location.href = data.checkoutUrl;

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!car) return null;

  /* ================= UI ================= */
  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-fuchsia-300 p-4">

      {/* ERROR */}
      {errorPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl">

            <p>{errorPopup}</p>

            <button
              onClick={()=>setErrorPopup("")}
              className="mt-3 w-full bg-indigo-600 text-white py-2 rounded"
            >
              OK
            </button>

          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white/20 rounded-3xl p-5 grid lg:grid-cols-[1fr_320px] gap-6">

        {/* LEFT */}
        <div className="space-y-5">

          {/* PERSONAL */}
          <div className="bg-white/40 p-5 rounded-xl">

            <h3 className="font-bold mb-3">Personal Info</h3>

            <div className="grid md:grid-cols-2 gap-3">

              <Input label="Name" value={fullName} onChange={(e:any)=>setFullName(e.target.value)} />
              <Input label="Phone" value={phone} onChange={(e:any)=>setPhone(e.target.value)} />
              <Input label="Email" full value={email} onChange={(e:any)=>setEmail(e.target.value)} />

            </div>

          </div>

          {/* ADDRESS */}
          <div className="bg-white/40 p-5 rounded-xl">

            <h3 className="font-bold mb-3">Address</h3>

            <div className="grid md:grid-cols-2 gap-3">

              <Input label="Full Address" full value={address} onChange={(e:any)=>setAddress(e.target.value)} />

              <Input
                label="Pincode"
                value={pincode}
                onChange={(e:any)=>{
                  const val = e.target.value.replace(/\D/g,"");
                  setPincode(val);
if(val.length===6){
  fetchPincodeData(val);
}else{
  setCity("");
  setStateName("");
  setVillages([]);
  setSelectedVillage("");
}                }}
              />

              <Input label="City" value={city} readOnly />
              <Input label="State" value={stateName} readOnly />

              {villages.length > 0 && (
                <div className="md:col-span-2">

                  <label className="text-sm">Village / Town</label>

                  <select
                    value={selectedVillage}
                    onChange={(e)=>setSelectedVillage(e.target.value)}
                    className="w-full p-3 rounded border"
                  >
                    <option value="">Select</option>
                    {villages.map((v,i)=>(
                      <option key={i}>{v}</option>
                    ))}
                  </select>

                </div>
              )}

            </div>

          </div>

          {/* LICENSE */}
          <div className="bg-white/40 p-5 rounded-xl">

            <h3 className="font-bold mb-3">License</h3>

            <div className="grid md:grid-cols-2 gap-3">

              <Input label="License No" value={licenseNo} onChange={(e:any)=>setLicenseNo(e.target.value)} />
              <input type="file" onChange={(e)=>setLicenseImg(e.target.files?.[0] || null)} />

            </div>

          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="
          bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700
          text-white rounded-[28px] p-6 h-fit shadow-2xl
        ">

          <h2 className="text-2xl font-bold mb-3">
            {car.name}
          </h2>

          <div className="grid grid-cols-2 gap-y-2 text-xs mb-5 opacity-90">

            <span>⛽ {car.fuel}</span>
            <span>⚙ {car.gear}</span>
            <span>⭐ {car.rating || 5}</span>
            <span>🚗 {car.class || "SUV"}</span>

          </div>

          <div className="
            bg-white/25 backdrop-blur-xl rounded-2xl p-4 mb-5
            border border-white/20
          ">

            <div className="grid grid-cols-2 gap-3">

           <DatePicker
  selected={pickupDate}
  onChange={(date: SetStateAction<Date | null>)=>{

    setPickupDate(date);

    if(dropDate && date && date > dropDate){
      setDropDate(null);
    }

  }}
  excludeDates={blockedDates}
  excludeDateIntervals={blockedIntervals}
  minDate={new Date()}
  placeholderText="Pickup Date"
  className="w-full px-3 py-2 text-xs rounded-xl bg-white/30"
/>

              <InputSmall label="Pickup Time" type="time" value={pickupTime}
                onChange={(e:any)=>setPickupTime(e.target.value)} />

             <DatePicker
  selected={dropDate}
  onChange={(date: SetStateAction<Date | null>)=>setDropDate(date)}
  excludeDates={blockedDates}
  excludeDateIntervals={blockedIntervals}
  minDate={pickupDate || new Date()}
  placeholderText="Drop Date"
  className="w-full px-3 py-2 text-xs rounded-xl bg-white/30"
/>

              <InputSmall label="Drop Time" type="time" value={dropTime}
                onChange={(e:any)=>setDropTime(e.target.value)} />

            </div>

          </div>

          <div className="border-t border-white/30 pt-4 mb-5">

            <p className="text-xs opacity-80 mb-1">
              Total ({days} days)
            </p>

            <p className="text-[28px] font-extrabold tracking-wide">
              ₹{totalPrice}
            </p>

          </div>

          <button
            onClick={()=>setOpenPayment(true)}
            className="
              w-full bg-white text-indigo-700 py-3 rounded-2xl
              font-bold text-lg shadow-xl hover:scale-[1.02] transition
            "
          >
            Confirm Booking
          </button>

        </div>

      </div>

      {/* PAYMENT MODAL */}
      {openPayment && (
        <Modal>

          <h3 className="font-bold mb-3">Payment</h3>
          <p className="mb-3">₹{totalPrice}</p>

          <button
            onClick={submitBooking}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Pay Now
          </button>

        </Modal>
      )}

    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Modal({ children }:{ children:React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

function Input({ label, full, ...props }:any) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-sm">{label}</label>
      <input {...props} className="w-full p-2 border rounded" />
    </div>
  );
}

function InputSmall({ label, ...props }:any) {
  return (
    <div>

      <label className="text-[11px] opacity-80 mb-1 block">
        {label}
      </label>

      <input
        {...props}
        className="
        w-full px-3 py-2 text-xs rounded-xl
        bg-white/30 border border-white/20
        backdrop-blur
        focus:outline-none focus:ring-2 focus:ring-white/40
      "
      />

    </div>
  );
}