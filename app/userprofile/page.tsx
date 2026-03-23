/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  User,
  MapPin,
  Calendar,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyProfile() {

  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const [villages, setVillages] = useState<any[]>([]);
  const [loadingPin, setLoadingPin] = useState(false);

  const router = useRouter();

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth");
      return;
    }

    fetch(`${API}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {

          console.log("Avatar:", data.user.avatar); // 👈 YAHAN ADD KARO


        if (!data.user) {
          router.push("/auth");
          return;
        }

        setUser({
          ...data.user,
          phone: data.user.phone || "",
          bio: data.user.bio || "",
          emergency: data.user.emergency || "",
          pincode: data.user.pincode || "",
          village: data.user.village || "",
          district: data.user.district || "",
          state: data.user.state || "",
          avatar: data.user.avatar || "",
          dob: data.user.dob || "",
          gender: data.user.gender || "",
          address: data.user.address || "",
        });

      });

  }, []);

  /* ================= PINCODE ================= */
  const handlePincode = async (pin: string) => {

    setUser((prev: any) => ({
      ...prev,
      pincode: pin,
    }));

    if (pin.length !== 6) {
      setVillages([]);
      return;
    }

    setLoadingPin(true);

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/pincode/${pin}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success && data.addressList?.length) {

        setVillages(data.addressList);

        const first = data.addressList[0];

        setUser((prev: any) => ({
          ...prev,
          village: first.village,
          district: first.district,
          state: first.state,
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

  const previewUrl = URL.createObjectURL(file);

  setPreview(previewUrl);

  setUser((prev: any) => ({
    ...prev,
    avatarFile: file
  }));

};
  /* ================= SAVE ================= */
  const handleSave = async () => {

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("name", user.name);
  formData.append("phone", user.phone);
  formData.append("bio", user.bio);
  formData.append("emergency", user.emergency);
  formData.append("pincode", user.pincode);
  formData.append("village", user.village);
  formData.append("district", user.district);
  formData.append("state", user.state);
  formData.append("dob", user.dob);
  formData.append("gender", user.gender);
  formData.append("address", user.address);

  if (user.avatarFile) {
    formData.append("avatar", user.avatarFile);
  }

  const res = await fetch(`${API}/api/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!data.success) {
    alert("Update failed");
    return;
  }

  setUser(data.user);
  setEditing(false);

  alert("Profile Updated Successfully ✅");

};

  if (!user) return null;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200">

      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-8 border-b">

          <div className="relative">

            <img
              src={
  preview ||
  (user.avatar || "/avatar.png")
}
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200"
            />

            {editing && (
              <label className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full cursor-pointer text-white">
                <Camera size={16} />
                <input type="file" hidden onChange={handleImage} />
              </label>
            )}

          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="flex gap-2 mt-1">
              <Mail size={15} /> {user.email}
            </p>
          </div>

          <button
            onClick={() => editing ? handleSave() : setEditing(true)}
            className="flex gap-2 bg-indigo-600 text-white px-5 py-2 rounded-xl"
          >
            {editing ? <Save size={16} /> : <Edit size={16} />}
            {editing ? "Save" : "Edit"}
          </button>

        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">

          {/* PERSONAL */}
          <Section title="Personal Information">

            <Input label="Full Name" name="name"
              value={user.name}
              editable={editing}
              onChange={handleChange}
              icon={<User size={16} />} />

            <Input label="Email (Locked)"
              value={user.email}
              locked
              icon={<Mail size={16} />} />

            <Input label="Phone"
              name="phone"
              value={user.phone}
              editable={editing}
              onChange={handleChange}
              icon={<Phone size={16} />} />

            <Input label="Date of Birth"
              name="dob"
              type="date"
              value={user.dob}
              editable={editing}
              onChange={handleChange}
              icon={<Calendar size={16} />} />

            {/* Gender */}
            <div>
              <label className="text-sm mb-1 block">Gender</label>
              <select
                name="gender"
                value={user.gender}
                disabled={!editing}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Textarea label="Bio"
              name="bio"
              value={user.bio}
              editable={editing}
              onChange={handleChange} />

            <Input label="Emergency Contact"
              name="emergency"
              value={user.emergency}
              editable={editing}
              onChange={handleChange} />

          </Section>

          {/* ADDRESS */}
          <Section title="Address Information">

            <Textarea label="Full Address"
              name="address"
              value={user.address}
              editable={editing}
              onChange={handleChange} />

            <Input label="Pincode"
              name="pincode"
              value={user.pincode}
              editable={editing}
              onChange={(e: any) => handlePincode(e.target.value)}
              icon={<MapPin size={16} />} />

            {loadingPin && (
              <p className="text-xs text-indigo-500">Fetching villages...</p>
            )}

            {/* Village Dropdown */}
            <div>
              <label className="text-sm mb-1 block">Village / Town</label>
              <select
                disabled={!editing || !villages.length}
                value={user.village}
                onChange={(e) => {

                  const selected = villages.find(
                    v => v.village === e.target.value
                  );

                  if (!selected) return;

                  setUser((prev: any) => ({
                    ...prev,
                    village: selected.village,
                    district: selected.district,
                    state: selected.state,
                  }));
                }}
                className="w-full border rounded-xl px-4 py-2"
              >
                <option value="">
                  {villages.length
                    ? "Select Village"
                    : "Enter Pincode"}
                </option>

                {villages.map((v, i) => (
                  <option key={i} value={v.village}>
                    {v.village}
                  </option>
                ))}
              </select>
            </div>

            <Input label="District"
              name="district"
              value={user.district}
              editable={editing}
              onChange={handleChange} />

            <Input label="State"
              name="state"
              value={user.state}
              editable={editing}
              onChange={handleChange} />

          </Section>

        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  editable,
  onChange,
  locked,
  icon,
  type = "text",
}: any) {
  return (
    <div>
      <label className="text-sm mb-1 block">{label}</label>
      <div className="flex gap-3 border rounded-xl px-4 py-2">
        {icon && <span>{icon}</span>}
        <input
          type={type}
          name={name}
          value={value}
          disabled={!editable || locked}
          onChange={onChange}
          className="flex-1 outline-none"
        />
      </div>
    </div>
  );
}

function Textarea({
  label,
  name,
  value,
  editable,
  onChange,
}: any) {
  return (
    <div>
      <label className="text-sm mb-1 block">{label}</label>
      <textarea
        name={name}
        value={value}
        disabled={!editable}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-2 outline-none"
        rows={3}
      />
    </div>
  );
}