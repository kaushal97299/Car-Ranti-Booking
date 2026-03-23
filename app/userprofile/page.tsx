/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Edit, Save, Camera, Mail, Phone,
  User, MapPin, Calendar, Lock, ShieldCheck,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyProfile() {

  const [user,       setUser]       = useState<any>(null);
  const [editing,    setEditing]    = useState(false);
  const [preview,    setPreview]    = useState<any>(null);
  const [villages,   setVillages]   = useState<any[]>([]);
  const [loadingPin, setLoadingPin] = useState(false);

  const router = useRouter();

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) { router.push("/auth"); return; }

    fetch(`${API}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {

        console.log("Avatar:", data.user.avatar);

        if (!data.user) { router.push("/auth"); return; }

        setUser({
          ...data.user,
          phone:     data.user.phone     || "",
          bio:       data.user.bio       || "",
          emergency: data.user.emergency || "",
          pincode:   data.user.pincode   || "",
          village:   data.user.village   || "",
          district:  data.user.district  || "",
          state:     data.user.state     || "",
          avatar:    data.user.avatar    || "",
          dob:       data.user.dob       || "",
          gender:    data.user.gender    || "",
          address:   data.user.address   || "",
        });
      });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================= PINCODE ================= */
  const handlePincode = async (pin: string) => {

    setUser((prev: any) => ({ ...prev, pincode: pin }));

    if (pin.length !== 6) { setVillages([]); return; }

    setLoadingPin(true);

    try {

      const token = localStorage.getItem("token");

      const res  = await fetch(`${API}/api/pincode/${pin}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success && data.addressList?.length) {

        setVillages(data.addressList);

        const first = data.addressList[0];

        setUser((prev: any) => ({
          ...prev,
          village:  first.village,
          district: first.district,
          state:    first.state,
        }));

      } else {
        setVillages([]);
      }

    } catch (err) {
      console.error(err);
      setVillages([]);
    }

    setLoadingPin(false);
  };

  /* ================= INPUT ================= */
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE ================= */
  const handleImage = (e: any) => {

    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUser((prev: any) => ({ ...prev, avatarFile: file }));
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {

    const token    = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name",      user.name);
    formData.append("phone",     user.phone);
    formData.append("bio",       user.bio);
    formData.append("emergency", user.emergency);
    formData.append("pincode",   user.pincode);
    formData.append("village",   user.village);
    formData.append("district",  user.district);
    formData.append("state",     user.state);
    formData.append("dob",       user.dob);
    formData.append("gender",    user.gender);
    formData.append("address",   user.address);

    if (user.avatarFile) formData.append("avatar", user.avatarFile);

    const res  = await fetch(`${API}/api/profile`, {
      method:  "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body:    formData,
    });

    const data = await res.json();

    if (!data.success) { alert("Update failed"); return; }

    setUser(data.user);
    setEditing(false);
    alert("Profile Updated Successfully ✅");
  };

  if (!user) return null;

  /* ── avatar src ── */
  const avatarSrc = preview || user.avatar || "/avatar.png";

  /* ── shared field classes ── */
  const fieldBase =
    "w-full bg-white/60 border border-indigo-100 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200 p-4 sm:p-6 pb-24 md:pb-8">

      <div className="max-w-4xl mx-auto space-y-5">

        {/* ═══════════ PROFILE CARD ═══════════ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">

          {/* banner */}
          <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500" />

          <div className="px-5 sm:px-8 pb-6">

            {/* avatar row */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">

              {/* avatar */}
              <div className="relative w-24 h-24 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                {editing && (
                  <label className="absolute -bottom-1 -right-1 bg-indigo-600 hover:bg-indigo-700 p-1.5 rounded-xl cursor-pointer text-white shadow transition">
                    <Camera size={14} />
                    <input type="file" hidden accept="image/*" onChange={handleImage} />
                  </label>
                )}
              </div>

              {/* name + email */}
              <div className="flex-1 sm:pb-1">
                <h1 className="text-xl font-bold text-slate-800">{user.name}</h1>
                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Mail size={13} /> {user.email}
                </p>
              </div>

              {/* edit / save button */}
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition sm:self-end ${
                  editing
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-emerald-200"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-200"
                }`}
              >
                {editing ? <Save size={15} /> : <Edit size={15} />}
                {editing ? "Save Changes" : "Edit Profile"}
              </button>

            </div>

          </div>
        </div>

        {/* ═══════════ PERSONAL INFO ═══════════ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-5 sm:p-7">

          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-5 flex items-center gap-2">
            <User size={14} /> Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* name */}
            <Field label="Full Name" icon={<User size={14} />}>
              <input
                name="name" value={user.name}
                disabled={!editing} onChange={handleChange}
                className={fieldBase}
              />
            </Field>

            {/* email locked */}
            <Field label="Email Address" icon={<Mail size={14} />} locked>
              <div className="relative">
                <input
                  value={user.email} disabled
                  className={`${fieldBase} pr-9`}
                />
                <Lock size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </Field>

            {/* phone */}
            <Field label="Phone Number" icon={<Phone size={14} />}>
              <input
                name="phone" value={user.phone}
                disabled={!editing} onChange={handleChange}
                className={fieldBase} placeholder="Enter phone"
              />
            </Field>

            {/* dob */}
            <Field label="Date of Birth" icon={<Calendar size={14} />}>
              <input
                type="date" name="dob" value={user.dob}
                disabled={!editing} onChange={handleChange}
                className={fieldBase}
              />
            </Field>

            {/* gender */}
            <Field label="Gender" icon={<User size={14} />}>
              <select
                name="gender" value={user.gender}
                disabled={!editing} onChange={handleChange}
                className={fieldBase}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </Field>

            {/* emergency */}
            <Field label="Emergency Contact" icon={<Phone size={14} />}>
              <input
                name="emergency" value={user.emergency}
                disabled={!editing} onChange={handleChange}
                className={fieldBase} placeholder="Emergency number"
              />
            </Field>

            {/* bio — full width */}
            <div className="sm:col-span-2">
              <Field label="Bio">
                <textarea
                  name="bio" value={user.bio} rows={3}
                  disabled={!editing} onChange={handleChange}
                  className={`${fieldBase} resize-none`}
                  placeholder="Tell us about yourself..."
                />
              </Field>
            </div>

          </div>
        </div>

        {/* ═══════════ ADDRESS INFO ═══════════ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-5 sm:p-7">

          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-5 flex items-center gap-2">
            <MapPin size={14} /> Address Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* full address — full width */}
            <div className="sm:col-span-2">
              <Field label="Full Address" icon={<MapPin size={14} />}>
                <textarea
                  name="address" value={user.address} rows={2}
                  disabled={!editing} onChange={handleChange}
                  className={`${fieldBase} resize-none`}
                  placeholder="House no, street, area..."
                />
              </Field>
            </div>

            {/* pincode */}
            <Field label="Pincode" icon={<MapPin size={14} />}>
              <input
                name="pincode" value={user.pincode} maxLength={6}
                disabled={!editing}
                onChange={(e) => handlePincode(e.target.value)}
                className={fieldBase} placeholder="6-digit pincode"
              />
              {loadingPin && (
                <p className="text-xs text-indigo-500 mt-1">Fetching location...</p>
              )}
            </Field>

            {/* village dropdown */}
            <Field label="Village / Town">
              <select
                disabled={!editing || !villages.length}
                value={user.village}
                onChange={(e) => {
                  const selected = villages.find(v => v.village === e.target.value);
                  if (!selected) return;
                  setUser((prev: any) => ({
                    ...prev,
                    village:  selected.village,
                    district: selected.district,
                    state:    selected.state,
                  }));
                }}
                className={fieldBase}
              >
                <option value="">
                  {villages.length ? "Select Village" : "Enter Pincode first"}
                </option>
                {villages.map((v, i) => (
                  <option key={i} value={v.village}>{v.village}</option>
                ))}
              </select>
            </Field>

            {/* district */}
            <Field label="District">
              <input
                name="district" value={user.district}
                disabled={!editing} onChange={handleChange}
                className={fieldBase} placeholder="District"
              />
            </Field>

            {/* state */}
            <Field label="State">
              <input
                name="state" value={user.state}
                disabled={!editing} onChange={handleChange}
                className={fieldBase} placeholder="State"
              />
            </Field>

          </div>
        </div>

        {/* ═══════════ KYC STATUS ═══════════ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-5 sm:p-7">

          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> KYC Status
          </h2>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
              user.kycStatus === "verified"
                ? "bg-green-100 text-green-600"
                : user.kycStatus === "rejected"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}>
              {(user.kycStatus || "pending").toUpperCase()}
            </span>
            <p className="text-sm text-slate-500">
              {user.kycStatus === "verified"
                ? "Your identity has been verified."
                : user.kycStatus === "rejected"
                ? `Rejected: ${user.kycRejectReason || "Contact support"}`
                : "KYC verification is pending."}
            </p>
          </div>

        </div>

        {/* ═══════════ SAVE BUTTON (bottom) ═══════════ */}
        {editing && (
          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition text-sm"
          >
            <Save size={15} className="inline mr-2" />
            Save All Changes
          </button>
        )}

      </div>
    </div>
  );
}

/* ═══════════ FIELD WRAPPER ═══════════ */
function Field({ label, icon, locked, children }: {
  label: string;
  icon?: React.ReactNode;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
        {icon}
        {label}
        {locked && <Lock size={11} className="text-slate-400 ml-auto" />}
      </label>
      {children}
    </div>
  );
}
