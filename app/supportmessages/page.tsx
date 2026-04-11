"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowLeft, Paperclip } from "lucide-react";
import Link from "next/link";

export default function SupportMessagesPage() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages,setMessages] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

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
    }finally{
      setLoading(false);
    }

  };

  useEffect(()=>{
    loadMessages();
  },[]);


  if(loading){

    return(

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white">

        <div className="text-lg font-semibold text-gray-300">
          Loading your messages...
        </div>

      </div>

    );

  }


  return(

    <div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white py-12 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-10">

          <div className="flex items-center gap-3">

            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-xl text-white shadow-lg">
              <MessageCircle size={22}/>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                Support Messages
              </h1>
              <p className="text-sm text-slate-400">
                View your conversation with support team
              </p>
            </div>

          </div>

          <Link
            href="/contact"
            className="flex items-center gap-2 text-emerald-300 font-medium hover:underline"
          >
            <ArrowLeft size={18}/> Back
          </Link>

        </div>



        {/* EMPTY STATE */}

        {messages.length===0 && (

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-10 text-center">

            <MessageCircle size={40} className="mx-auto text-emerald-300 mb-4"/>

            <h3 className="text-xl font-semibold text-white">
              No Messages Yet
            </h3>

            <p className="text-slate-400 mt-2">
              You haven contacted support yet.
            </p>

          </div>

        )}



        {/* MESSAGE LIST */}

        <div className="space-y-6">

          {messages.map((msg)=>(

            <div
              key={msg._id}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >

              {/* TOP */}

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-sm text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-xs text-emerald-300 font-medium mt-1">
                    Category: {msg.category}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    msg.status === "closed"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : msg.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-cyan-500/20 text-cyan-300"
                  }`}
                >
                  {msg.status}
                </span>

              </div>



              {/* MESSAGE */}

              <p className="mt-4 text-gray-300 leading-relaxed">
                {msg.message}
              </p>



              {/* ATTACHMENT */}

              {msg.attachment && (

                 <Link
    href={
      msg.attachment.startsWith("http")
        ? msg.attachment
        : `${process.env.NEXT_PUBLIC_API_URL}/uploads/contact/${msg.attachment}`
    }
    target="_blank"
    className="inline-flex items-center gap-2 mt-3 text-sm text-emerald-300 hover:underline"
  >
    <Paperclip size={16}/>
    View Attachment
  </Link>

)}



              {/* ADMIN REPLY */}

              {msg.adminReply && (

                <div className="mt-5 bg-white/10 border border-white/10 p-4 rounded-xl">

                  <p className="text-sm font-semibold text-emerald-300 mb-1">
                    Support Reply
                  </p>

                  <p className="text-sm text-gray-300">
                    {msg.adminReply}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}