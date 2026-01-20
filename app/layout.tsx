import "./globals.css";
import UserSidebar from "./components/SideNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className="bg-gray-50">
        <UserSidebar />
        
        <main className="md:ml-64 p-4 pb-20 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
