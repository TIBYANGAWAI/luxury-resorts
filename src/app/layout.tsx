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
  title: "Luxury Lagoon Resort | Premium Stays in Bhatkal",
  description: "Experience the pinnacle of luxury and serenity at Luxury Lagoon Resort, Bhatkal's premier sanctuary portfolio.",
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
