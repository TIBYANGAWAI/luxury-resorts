import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxury Resorts | Luxury Rethought",
  description: "Experience the pinnacle of luxury and serenity at Luxury Resorts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-[#0a0a0a] text-zinc-50 flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
