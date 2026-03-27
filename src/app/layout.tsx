import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Background Remover — Remove Image Backgrounds Instantly",
  description:
    "Upload your photo, let AI erase the background, and download a clean transparent PNG instantly. No signup required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-gray-800 selection:bg-primary-200/50`}>
        {children}
      </body>
    </html>
  );
}
