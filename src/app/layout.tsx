import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velora",
  description: "A calm, premium fintech experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} min-h-screen bg-black text-white antialiased`}
      >
        <div className="w-full bg-yellow-500/10 text-yellow-400 text-xs text-center py-2">
          Demo Mode — All payments simulated
        </div>
        {children}
      </body>
    </html>
  );
}

