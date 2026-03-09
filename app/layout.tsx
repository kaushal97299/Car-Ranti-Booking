"use client";

import "./globals.css";
import UserSidebar from "./components/SideNavbar";
import Footer from "./Footer/page";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

/* GOOGLE PROVIDER */
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  /* AUTH PAGES WHERE LAYOUT SHOULD HIDE */
  const hideLayout =
    pathname === "/auth" ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/forgot-password");

  return (
    <html lang="en">
      <body className="bg-gray-50">

        {/* GOOGLE PROVIDER */}
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>

          {/* Sidebar */}
          {!hideLayout && <UserSidebar />}

          <main className={`${!hideLayout ? "h-[calc(100vh-4rem)] md:ml-50" : ""}`}>
            
            {children}

            {/* Footer */}
            {!hideLayout && <Footer />}

          </main>

          <SpeedInsights />

        </GoogleOAuthProvider>

      </body>
    </html>
  );
}