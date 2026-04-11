/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Search, Send, MessageCircle, CheckCircle } from "lucide-react";

export default function HelpPage() {

const [query,setQuery] = useState("");

const [form,setForm] = useState({
category:"booking",
priority:"normal",
message:""
});

const [loading,setLoading] = useState(false);
const [success,setSuccess] = useState(false);

// eslint-disable-next-line
const [tickets,setTickets] = useState<any[]>([]);


/* ================= LOAD USER TICKETS ================= */

useEffect(()=>{
loadTickets();
},[]);

const loadTickets = async ()=>{

try{

const token = localStorage.getItem("token");

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

setTickets(data);

}catch(err){

console.log(err);

}

};


/* ================= HELP SOLUTIONS ================= */

const solutions = [

{
keywords:["payment","failed"],
title:"Payment Failed Solution",
desc:"Try another card or check bank limit."
},

{
keywords:["booking","car"],
title:"How to Book a Car",
desc:"Choose car → select date → complete payment."
},

{
keywords:["cancel"],
title:"Cancel Booking",
desc:"Go to My Bookings and click cancel."
},

];

const filteredSolutions = solutions.filter(s =>
query && s.keywords.some(k => query.toLowerCase().includes(k))
);


/* ================= FORM CHANGE ================= */

const handleChange = (e:any)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};


/* ================= CREATE TICKET ================= */

const createTicket = async ()=>{

if(!form.message) return alert("Write your problem");

try{

setLoading(true);

const token = localStorage.getItem("token");

const res = await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify(form)
}
);

const data = await res.json();

if(!res.ok){

alert(data.message || "Failed");

return;

}

setSuccess(true);

setForm({
...form,
message:""
});

loadTickets();

}catch(err){

console.log(err);

}finally{

setLoading(false);

}

};


/* ================= UI ================= */

return(

<div className="min-h-screen bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white p-10">

<div className="max-w-6xl mx-auto">


{/* TITLE */}

<h1 className="text-4xl font-bold text-center mb-10 text-white ">

Help Center

</h1>


{/* SEARCH */}

<div className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow flex items-center">

<Search className="text-gray-400"/>

<input
placeholder="Describe your problem..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="ml-3 flex-1 outline-none bg-transparent text-white placeholder:text-gray-400"
/>

</div>



{/* SUGGESTED SOLUTIONS */}

{query && filteredSolutions.length > 0 &&(

<div className="mt-8">

<h3 className="font-semibold mb-4 text-emerald-300">

Suggested Solutions

</h3>

<div className="grid md:grid-cols-2 gap-4">

{filteredSolutions.map((s,i)=>(

<div key={i} className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow">

<h4 className="font-semibold">

{s.title}

</h4>

<p className="text-gray-400 text-sm">

{s.desc}

</p>

</div>

))}

</div>

</div>

)}



{/* FAQ */}

<div className="mt-10">

<h2 className="text-xl font-semibold mb-4">

Common Questions

</h2>

<div className="space-y-3">

<div className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-lg shadow">

<b>How to book car?</b>

<p className="text-sm text-gray-400">

Choose car → select dates → pay online.

</p>

</div>

<div className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-lg shadow">

<b>Refund policy?</b>

<p className="text-sm text-gray-400">

Refund processed in 5-7 days.

</p>

</div>

</div>

</div>



{/* CREATE SUPPORT TICKET */}

<div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow mt-12">

<h3 className="font-semibold mb-4 text-emerald-300">

Still need help? Create support ticket

</h3>


<select
name="category"
value={form.category}
onChange={handleChange}
className="bg-white/10 border border-white/10 text-white p-2 rounded w-full mb-3"
>

<option value="booking">Booking Issue</option>
<option value="payment">Payment Issue</option>
<option value="complaint">Complaint</option>
<option value="availability">Availability</option>

</select>


<select
name="priority"
value={form.priority}
onChange={handleChange}
className="bg-white/10 border border-white/10 text-white p-2 rounded w-full mb-3"
>

<option value="low">Low</option>
<option value="normal">Normal</option>
<option value="high">High</option>
<option value="urgent">Urgent</option>

</select>


<textarea
name="message"
value={form.message}
onChange={handleChange}
placeholder="Describe your problem..."
className="w-full bg-white/10 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-400"
/>


<button
onClick={createTicket}
disabled={loading}
className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-5 py-2 rounded mt-3 flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition"
>

{loading ? "Sending..." : <>Submit Ticket <Send size={16}/></>}

</button>


{success &&(

<div className="text-emerald-300 text-sm flex items-center gap-2 mt-3">

<CheckCircle size={18}/>

Ticket created successfully

</div>

)}

</div>



{/* USER TICKETS */}

{tickets.length > 0 &&(

<div className="mt-12">

<h2 className="font-semibold mb-4 flex items-center gap-2">

<MessageCircle size={18}/> Your Support Tickets

</h2>

<div className="space-y-4">

{tickets.map((t:any)=>(

<div
key={t._id}
className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-lg shadow"
>

<p className="text-xs text-gray-400">

{new Date(t.createdAt).toLocaleDateString()}

</p>

<p className="mt-1">

{t.message}

</p>

<span className="text-xs text-emerald-300">

Status: {t.status}

</span>

{t.adminReply &&(

<div className="bg-white/10 border border-white/10 p-2 rounded mt-2 text-sm">

<b>Admin:</b> {t.adminReply}

</div>

)}

</div>

))}

</div>

</div>

)}

</div>

</div>

);

}