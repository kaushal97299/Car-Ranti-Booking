"use client";

import { useEffect, useState, ReactNode, ChangeEvent } from "react";
import { Pencil, Save, ShieldCheck, Camera } from "lucide-react";

/* ================= TYPES ================= */

type ProfileType = {
  name: string;
  email: string;
  phone: string;
  alternatePhone: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  emergencyName: string;
  emergencyPhone: string;
  bloodGroup: string;
  licenceNumber: string;
  aadhaarNumber: string;
  panNumber: string;
  avatar: string;
  status: string;
};

type PreviewType = {
  avatar: string | null;
  licence: string | null;
  aadhaar: string | null;
  pan: string | null;
};

type CardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  badge?: string;
};

type InputProps = {
  label: string;
  placeholder?: string;
  name: keyof ProfileType;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

type SelectProps = {
  label: string;
  name: keyof ProfileType;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

type UploadProps = {
  title: string;
  description: string;
  preview: string | null;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

type GridProps = {
  children: ReactNode;
};

/* ================= PAGE ================= */

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [loadingPin, setLoadingPin] = useState(false);
  const [pinError, setPinError] = useState("");

  const [profile, setProfile] = useState<ProfileType>({
    name: "",
    email: "",
    phone: "",
    alternatePhone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    emergencyName: "",
    emergencyPhone: "",
    bloodGroup: "",
    licenceNumber: "",
    aadhaarNumber: "",
    panNumber: "",
    avatar: "",
    status: "Verified",
  });

  const [previews, setPreviews] = useState<PreviewType>({
    avatar: null,
    licence: null,
    aadhaar: null,
    pan: null,
  });

  /* ================= LOAD LOCAL STORAGE ================= */
  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTimeout(() => {
        setProfile(parsed.profile);
        setPreviews(parsed.previews);
      }, 0);
    }
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: keyof PreviewType) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [type]: url }));
  };

  /* ================= PINCODE API ================= */
  const handlePincodeFetch = async (pin: string) => {
    if (pin.length !== 6) return;

    setLoadingPin(true);
    setPinError("");

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();

      if (data[0]?.Status === "Success") {
        const post = data[0].PostOffice[0];

        setProfile((prev) => ({
          ...prev,
          state: post.State,
          city: post.District,
          address: post.Block || post.Name,
        }));
      } else {
        setPinError("Invalid pincode");
      }
    } catch {
      setPinError("Unable to fetch location");
    }

    setLoadingPin(false);
  };

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify({ profile, previews }));
    setEditMode(false);
    alert("Profile updated successfully");
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 via-indigo-300 to-purple-300 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={previews.avatar || "/avatar.png"}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-xl"
              />
              {editMode && (
                <label className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full cursor-pointer text-white shadow-lg">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImageUpload(e, "avatar")}
                  />
                </label>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {profile.name || "Your Profile"}
              </h1>
              <p className="text-sm text-slate-500">
                Secure account · Govt verified address
              </p>
            </div>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl shadow-lg"
          >
            {editMode ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>

        {/* PERSONAL INFO */}
        <PremiumCard title="Personal Information" subtitle="Used for bookings and verification">
          <Grid>
            <Input label="Full Name" name="name" value={profile.name} onChange={handleChange} disabled={!editMode} />
            <Input label="Email" name="email" value={profile.email} onChange={handleChange} disabled={!editMode} />
            <Input label="Phone" name="phone" value={profile.phone} onChange={handleChange} disabled={!editMode} />
            <Input label="Alternate Phone" name="alternatePhone" value={profile.alternatePhone} onChange={handleChange} disabled={!editMode} />
          </Grid>
        </PremiumCard>

        {/* ADDRESS */}
        <PremiumCard title="Address (Auto verified by India Post)" subtitle="Enter pincode to auto fill">
          <Grid>
            <Input
              label="Pincode"
              name="pincode"
              value={profile.pincode}
              onChange={(e) => {
                handleChange(e);
                handlePincodeFetch(e.target.value);
              }}
              disabled={!editMode}
            />

            <Input label="State" name="state" value={profile.state} onChange={handleChange} disabled />
            <Input label="District" name="city" value={profile.city} onChange={handleChange} disabled />
            <Input label="Area / Village" name="address" value={profile.address} onChange={handleChange} disabled />
          </Grid>

          {loadingPin && <p className="text-xs text-indigo-600 mt-2">Fetching address…</p>}
          {pinError && <p className="text-xs text-red-500 mt-2">{pinError}</p>}
        </PremiumCard>

        {/* KYC */}
        <PremiumCard title="KYC Verification" subtitle="Encrypted & secure" badge="Protected">
          <Grid>
            <Input label="Driving Licence" name="licenceNumber" value={profile.licenceNumber} onChange={handleChange} disabled={!editMode} />
            <Input label="Aadhaar" name="aadhaarNumber" value={profile.aadhaarNumber} onChange={handleChange} disabled={!editMode} />
            <Input label="PAN" name="panNumber" value={profile.panNumber} onChange={handleChange} disabled={!editMode} />
          </Grid>
        </PremiumCard>

        {/* UPLOADS */}
        <PremiumCard title="Document Upload" subtitle="Clear images required">
          <div className="grid md:grid-cols-3 gap-6">
            <Upload title="Driving Licence" description="Front side" preview={previews.licence} onUpload={(e) => handleImageUpload(e, "licence")} disabled={!editMode} />
            <Upload title="Aadhaar Card" description="Front side" preview={previews.aadhaar} onUpload={(e) => handleImageUpload(e, "aadhaar")} disabled={!editMode} />
            <Upload title="PAN Card" description="Clear image" preview={previews.pan} onUpload={(e) => handleImageUpload(e, "pan")} disabled={!editMode} />
          </div>
        </PremiumCard>

        {editMode && (
          <button
            onClick={saveProfile}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl text-lg font-semibold shadow-xl"
          >
            <Save className="inline mr-2" size={20} />
            Save Changes Securely
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function PremiumCard({ title, subtitle, children, badge }: CardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl p-6 space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-slate-800 text-lg">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {badge && (
          <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
            <ShieldCheck size={14} className="inline mr-1" /> {badge}
          </span>
        )}
      </div>
      <div className="pt-4">{children}</div>
    </div>
  );
}

function Grid({ children }: GridProps) {
  return <div className="grid md:grid-cols-2 gap-5">{children}</div>;
}

function Input({ label, name, value, onChange, disabled }: InputProps) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-400 outline-none disabled:bg-slate-100"
      />
    </div>
  );
}

function Upload({ title, description, preview, onUpload, disabled }: UploadProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-4 text-center shadow-md">
      <p className="font-medium">{title}</p>
      <p className="text-xs text-slate-500 mb-2">{description}</p>
      {preview ? (
        <img src={preview} className="h-32 mx-auto rounded-lg object-cover" />
      ) : (
        <div className="h-32 flex items-center justify-center text-slate-400 border rounded-lg">
          No Image Uploaded
        </div>
      )}
      {!disabled && (
        <input type="file" accept="image/*" onChange={onUpload} className="mt-3 text-sm" />
      )}
    </div>
  );
}
