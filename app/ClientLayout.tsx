/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import "./globals.css";
import UserSidebar from "./components/SideNavbar";
import Footer from "./Footer/page";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);

  const hideLayout =
    pathname === "/auth" ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/forgot-password");

  useEffect(() => {
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] min-h-screen"></div>
    );
  }

  return (
    <LanguageProvider>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
      >
        <div className="bg-[#020b0a] min-h-screen">
          {!hideLayout && <UserSidebar />}

          <div className={!hideLayout ? "md:ml-50 flex flex-col" : ""}>
            <main className="flex-1">{children}</main>

            {!hideLayout && <Footer />}
          </div>

          <SpeedInsights />
        </div>
      </GoogleOAuthProvider>
    </LanguageProvider>
  );
}