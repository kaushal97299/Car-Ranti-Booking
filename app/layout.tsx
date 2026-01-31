import "./globals.css";
import UserSidebar from "./components/SideNavbar";
import Footer from "./Footer/page";
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className="bg-gray-50">
        <UserSidebar />
        
        <main className=" h-[calc(100vh-4rem)] md:ml-50">
          {children}
        <Footer/>
        </main>
      </body>
    </html>
  );
}
