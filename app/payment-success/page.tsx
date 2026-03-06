"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {

  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      
      <h1>✅ Payment Successful</h1>
      <p>Your booking is confirmed.</p>
      
      <p>Session ID:</p>
      <small>{sessionId}</small>

    </div>
  );
}