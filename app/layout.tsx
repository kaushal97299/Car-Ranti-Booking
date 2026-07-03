import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Car Rental Booking",
  description: "Best Car Rental Booking Platform",
  verification: {
    google: "50WBTxSU_o3RNCSATCc9HWZ1G-l9L5T_yHZmwPzLRr0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}