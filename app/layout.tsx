"use client";

import "./globals.css";
import UserSidebar from "./components/SideNavbar";
import Footer from "./Footer/page";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ Hide layout elements on auth page
  const hideLayout = pathname === "/auth";

  return (
    <html lang="en">
      <body className="bg-gray-50">

        {/* Sidebar only if not auth */}
        {!hideLayout && <UserSidebar />}

        <main className={`${!hideLayout ? "h-[calc(100vh-4rem)] md:ml-50" : ""}`}>
          {children}

          {/* Footer only if not auth */}
          {!hideLayout && <Footer />}
        </main>

        <SpeedInsights />
      </body>
    </html>
  );
}
