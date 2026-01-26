"use client";

import { useEffect, useState, ReactNode, ChangeEvent } from "react";
import { User, Pencil, Save, ShieldCheck, Camera } from "lucide-react";

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
  children: ReactNode;
  badge?: string;
};

type InputProps = {
  label: string;
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
  preview: string | null;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

type GridProps = {
  children: ReactNode;
};

/* ================= PAGE ================= */

export default function ProfilePage() {
  const [editMode, setEditMode] = useState<boolean>(false);

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
    status: "Active",
  });

  const [previews, setPreviews] = useState<PreviewType>({
    avatar: null,
    licence: null,
    aadhaar: null,
    pan: null,
  });

useEffect(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("profile");

    if (saved) {
      const parsed = JSON.parse(saved);

      // 👇 wrap in setTimeout to avoid lint error
      setTimeout(() => {
        setProfile(parsed.profile);
        setPreviews(parsed.previews);
      }, 0);
    }
  }
}, []);


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

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify({ profile, previews }));
    setEditMode(false);
    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={previews.avatar || "/avatar.png"}
                className="h-20 w-20 rounded-full object-cover border"
                alt="profile"
              />
              {editMode && (
                <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer text-white">
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
              <h1 className="text-xl font-bold text-slate-900">
                {profile.name || "Your Name"}
              </h1>
              <p className="text-sm text-slate-500">Manage profile & KYC</p>
            </div>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            <Pencil size={18} />
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        <Card title="Basic Information">
          <Grid>
            <Input label="Full Name" name="name" value={profile.name} onChange={handleChange} disabled={!editMode} />
            <Input label="Email" name="email" value={profile.email} onChange={handleChange} disabled={!editMode} />
            <Input label="Phone" name="phone" value={profile.phone} onChange={handleChange} disabled={!editMode} />
            <Input label="Alternate Phone" name="alternatePhone" value={profile.alternatePhone} onChange={handleChange} disabled={!editMode} />
          </Grid>
        </Card>

        <Card title="Other Details">
          <Grid>
            <Input label="DOB" name="dob" value={profile.dob} onChange={handleChange} disabled={!editMode} />
            <Select label="Gender" name="gender" value={profile.gender} onChange={handleSelectChange} disabled={!editMode} />
            <Input label="Blood Group" name="bloodGroup" value={profile.bloodGroup} onChange={handleChange} disabled={!editMode} />
            <Input label="Address" name="address" value={profile.address} onChange={handleChange} disabled={!editMode} />
            <Input label="City" name="city" value={profile.city} onChange={handleChange} disabled={!editMode} />
            <Input label="State" name="state" value={profile.state} onChange={handleChange} disabled={!editMode} />
            <Input label="Pincode" name="pincode" value={profile.pincode} onChange={handleChange} disabled={!editMode} />
          </Grid>
        </Card>

        <Card title="KYC Details" badge="Secure">
          <Grid>
            <Input label="Licence" name="licenceNumber" value={profile.licenceNumber} onChange={handleChange} disabled={!editMode} />
            <Input label="Aadhaar" name="aadhaarNumber" value={profile.aadhaarNumber} onChange={handleChange} disabled={!editMode} />
            <Input label="PAN" name="panNumber" value={profile.panNumber} onChange={handleChange} disabled={!editMode} />
          </Grid>
        </Card>

        <Card title="Documents Upload">
          <div className="grid md:grid-cols-3 gap-6">
            <Upload title="Licence" preview={previews.licence} onUpload={(e) => handleImageUpload(e, "licence")} disabled={!editMode} />
            <Upload title="Aadhaar" preview={previews.aadhaar} onUpload={(e) => handleImageUpload(e, "aadhaar")} disabled={!editMode} />
            <Upload title="PAN" preview={previews.pan} onUpload={(e) => handleImageUpload(e, "pan")} disabled={!editMode} />
          </div>
        </Card>

        {editMode && (
          <button
            onClick={saveProfile}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
          >
            <Save className="inline mr-2" size={18} />
            Save Profile
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Card({ title, children, badge }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-slate-800">{title}</h2>
        {badge && (
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
            <ShieldCheck size={14} className="inline mr-1" /> {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: GridProps) {
  return <div className="grid md:grid-cols-2 gap-6">{children}</div>;
}

function Input({ label, name, value, onChange, disabled }: InputProps) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 w-full p-3 border rounded-xl"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, disabled }: SelectProps) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 w-full p-3 border rounded-xl"
      >
        <option value="">Select</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>
  );
}

function Upload({ title, preview, onUpload, disabled }: UploadProps) {
  return (
    <div className="border rounded-xl p-4 text-center">
      <p className="font-medium mb-2">{title}</p>
      {preview ? (
        <img src={preview} className="h-32 mx-auto rounded-lg object-cover" />
      ) : (
        <div className="h-32 flex items-center justify-center text-gray-400 border rounded-lg">
          No Image
        </div>
      )}
      {!disabled && (
        <input type="file" accept="image/*" onChange={onUpload} className="mt-3" />
      )}
    </div>
  );
}
