"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    category: "other"
  });

  const [attachment,setAttachment] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages,setMessages] = useState<any[]>([]);

  /* ================= LOAD USER ================= */

  useEffect(()=>{

    const user =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;

    if(user){
      setForm({
        name:user.name || "",
        email:user.email || "",
        message:"",
        category:"other"
      });
    }

    loadMessages();

  },[]);


  /* ================= LOAD USER CONTACTS ================= */

  const loadMessages = async ()=>{

    try{

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if(!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/my`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setMessages(data);

    }catch(err){
      console.log(err);
    }

  };


  /* ================= FORM CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    setForm({ ...form, [e.target.name]: e.target.value });

  };


  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      let attachmentUrl = "";

      if(attachment){

        const data = new FormData();
        data.append("file",attachment);

        const upload = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
          {
            method:"POST",
            body:data
          }
        );

        const uploadData = await upload.json();

        attachmentUrl = uploadData.url;

      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            ...form,
            attachment:attachmentUrl
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send message");
        return;
      }

      setSuccess(true);

      setForm({
        ...form,
        message:""
      });

      setAttachment(null);

      loadMessages();

    } catch (err) {

      console.log(err);
      alert("Server error");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 text-slate-700">

      {/* HERO */}

      <section className="py-20 text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-900"
        >
          Contact Support
        </motion.h1>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Need help with booking a car? Our dealer team will contact you shortly.
        </p>

      </section>


      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 pb-24">


        {/* ================= FORM ================= */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur border border-white/40 rounded-2xl p-8 shadow-xl"
        >

          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Send us a message
          </h2>

          <div className="space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-slate-300"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-slate-300"
            />

            {/* CATEGORY */}

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-slate-300"
            >

              <option value="other">Select Issue Type</option>
              <option value="booking">Booking Issue</option>
              <option value="payment">Payment Issue</option>
              <option value="availability">Car Availability</option>
              <option value="complaint">Complaint</option>

            </select>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows={4}
              className="w-full p-3 rounded-lg border border-slate-300"
            />

            {/* FILE */}

            <input
              type="file"
              onChange={(e)=>setAttachment(e.target.files?.[0] || null)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
            >
              {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
            </button>


            {success && (

              <div className="text-green-600 text-sm flex items-center gap-2">

                <CheckCircle size={18} />

                Message sent. Our car dealer will contact you shortly.

              </div>

            )}

          </div>

        </motion.form>



        {/* ================= CONTACT INFO ================= */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >

          <div className="bg-white/70 backdrop-blur border border-white/40 rounded-2xl p-6 shadow-lg">

            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Contact Information
            </h3>

            <div className="space-y-4 text-slate-700">

              <p className="flex items-center gap-3">
                <Mail className="text-indigo-600" /> support@carbooking.com
              </p>

              <p className="flex items-center gap-3">
                <MapPin className="text-indigo-600" /> India (All Cities)
              </p>

            </div>

          </div>


          {/* QUICK CONTACT */}

          <div className="grid grid-cols-2 gap-4">

            <a
              href="mailto:support@carbooking.com"
              className="bg-white/70 backdrop-blur border rounded-xl p-5 flex items-center justify-center gap-2 shadow hover:shadow-lg"
            >
              <Mail className="text-indigo-600" /> Email
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              className="bg-white/70 backdrop-blur border rounded-xl p-5 flex items-center justify-center gap-2 shadow hover:shadow-lg"
            >
              <MessageCircle className="text-green-600" /> WhatsApp
            </a>

          </div>



          {/* ================= USER MESSAGES ================= */}

          {messages.length > 0 && (

            <div className="bg-white rounded-xl p-6 shadow">

              <h3 className="font-semibold mb-4">
                Your Support Messages
              </h3>

              <div className="space-y-4">

                {messages.map((msg)=>(
                  
                  <div
                    key={msg._id}
                    className="border p-4 rounded-lg"
                  >

                    <p className="text-sm text-gray-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-xs text-indigo-600">
                      Category: {msg.category}
                    </p>

                    <p className="mt-1">{msg.message}</p>

                    <p className="text-xs mt-2 text-indigo-600">
                      Status: {msg.status}
                    </p>

                    {msg.adminReply && (

                      <div className="mt-2 bg-indigo-50 p-2 rounded text-sm">

                        <b>Admin:</b> {msg.adminReply}

                      </div>

                    )}

                  </div>

                ))}

              </div>

            </div>

          )}

        </motion.div>

      </section>

    </div>

  );

}