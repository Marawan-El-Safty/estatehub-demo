import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://estatehub.example.com"),
  title: {
    default: "EstateHub — Modern Real Estate Platform",
    template: "%s · EstateHub",
  },
  description:
    "Discover, list, and manage properties with EstateHub — a scalable real estate SaaS with agent dashboards, smart booking, and AI-powered recommendations.",
  openGraph: {
    title: "EstateHub — Modern Real Estate Platform",
    description: "Property listings, agent dashboards, and AI recommendations.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
