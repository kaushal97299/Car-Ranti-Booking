/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import "./globals.css";
import UserSidebar from "./components/SideNavbar";
import Footer from "./Footer/page";
import { usePathname, useRouter } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  const hideLayout =
    pathname === "/auth" ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/forgot-password");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token && !hideLayout) {
      router.replace("/auth");
      return;
    }

    if (token && pathname === "/auth") {
      router.replace("/");
      return;
    }

    setChecking(false);

  }, [pathname]);

  if (checking) {
    return (
      <html lang="en">
        <body className="bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white overflow-x-hidden"></body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-[#020b0a]">

        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>

          {!hideLayout && <UserSidebar />}

          {/* MAIN WRAPPER */}
          <div className={!hideLayout ? "md:ml-50 flex flex-col " : ""}>

            <main className="flex-1">
              {children}
            </main>

            {!hideLayout && <Footer />}

          </div>

          <SpeedInsights />

        </GoogleOAuthProvider>

      </body>
    </html>
  );
}