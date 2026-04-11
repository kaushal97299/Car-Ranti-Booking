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
import Link from "next/link";

export default function ContactPage() {

  const [form,setForm] = useState({
    name:"",
    email:"",
    message:"",
    category:"other"
  });

  const [attachment,setAttachment] = useState<File | null>(null);
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false);

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

  },[]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  )=>{
    setForm({...form,[e.target.name]:e.target.value});
  };


  const handleSubmit = async (e:React.FormEvent)=>{

    e.preventDefault();

    if(!form.name || !form.email || !form.message){
      alert("Please fill all fields");
      return;
    }

    try{

      setLoading(true);

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      const formData = new FormData();

      formData.append("name",form.name);
      formData.append("email",form.email);
      formData.append("message",form.message);
      formData.append("category",form.category);

      if(attachment){
        formData.append("attachment",attachment);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method:"POST",
          headers:{
            Authorization: token ? `Bearer ${token}` : ""
          },
          body:formData
        }
      );

      const data = await res.json();

      if(!res.ok){
        alert(data.message || "Failed to send message");
        return;
      }

      setSuccess(true);

      setForm({
        ...form,
        message:""
      });

      setAttachment(null);

    }catch(err){

      console.log(err);
      alert("Server error");

    }finally{

      setLoading(false);

    }

  };


  return(

    <div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white text-gray-400">


      {/* HERO */}

      <section className="py-20 text-center px-6">

        <motion.h1
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          className="text-4xl md:text-5xl font-bold text-white"
        >

          Contact Support

        </motion.h1>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Need help with booking a car? Our dealer team will contact you shortly.
        </p>

      </section>



      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 pb-24">


        {/* FORM */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{opacity:0,x:-40}}
          whileInView={{opacity:1,x:0}}
          viewport={{once:true}}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
        >

          <h2 className="text-2xl font-semibold text-white mb-6">
            Send us a message
          </h2>

          <div className="space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-400"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-400"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-400"
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
              className="w-full p-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-400"
            />

            <input
              type="file"
              onChange={(e)=>setAttachment(e.target.files?.[0] || null)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-emerald-500/40 transition"
            >
              {loading ? "Sending..." : <>Send Message <Send size={18}/></>}
            </button>

            {success &&(

              <div className="text-emerald-300 text-sm flex items-center gap-2">
                <CheckCircle size={18}/>
                Message sent successfully.
              </div>

            )}

          </div>

        </motion.form>



        {/* RIGHT SIDE */}

        <motion.div
          initial={{opacity:0,x:40}}
          whileInView={{opacity:1,x:0}}
          viewport={{once:true}}
          className="space-y-6"
        >

          {/* CONTACT INFO */}

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">

            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Information
            </h3>

            <div className="space-y-4 text-gray-400">

              <p className="flex items-center gap-3">
                <Mail className="text-emerald-300"/> support@carbooking.com
              </p>

              <p className="flex items-center gap-3">
                <MapPin className="text-emerald-300"/> India (All Cities)
              </p>

            </div>

          </div>


          {/* QUICK CONTACT */}

          <div className="grid grid-cols-2 gap-4">

            <a
              href="mailto:support@carbooking.com"
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex items-center justify-center gap-2 shadow hover:shadow-lg"
            >
              <Mail className="text-emerald-300"/> Email
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex items-center justify-center gap-2 shadow hover:shadow-lg"
            >
              <MessageCircle className="text-emerald-300"/> WhatsApp
            </a>

          </div>


          {/* VIEW SUPPORT MESSAGES */}

          <Link
            href="/supportmessages"
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex items-center justify-center gap-2 shadow hover:shadow-lg"
          >

            <MessageCircle className="text-emerald-300"/>

            View Your Support Messages

          </Link>

        </motion.div>

      </section>

    </div>

  );

}