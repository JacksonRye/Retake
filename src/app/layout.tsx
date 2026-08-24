import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Retake | AI Motion Graphics Video Editor",
  description: "Turn raw talking-head videos into high-retention motion graphics in seconds with zero manual editing.",
  icons: {
    icon: "/retake_logo.svg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Retake | AI Motion Graphics Video Editor",
    description: "Turn raw talking-head videos into high-retention motion graphics in seconds.",
    images: ["/logo.jpg"],
  },
};

import GlobalNotificationProvider from "@/components/GlobalNotificationProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/retake_logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0B0E] text-[#F3F4F6]">
        <GlobalNotificationProvider>
          {children}
        </GlobalNotificationProvider>
      </body>
    </html>
  );
}
