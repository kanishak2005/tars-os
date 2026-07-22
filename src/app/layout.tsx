import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "T.A.R.S. OS",
  description: "Technology Autonomous Repository Supervisor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}