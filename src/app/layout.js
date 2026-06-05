import "./globals.css";
import "./interactive.css";
import "./header.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"], variable: "--font-inter", display: "swap", });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-mono", display: "swap", });

// Modern geometric display font for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"], variable: "--font-display", display: "swap", });

export const metadata = {
  title: "OpelSoft, Jobs, Talent & Staffing", description:
    "OpelSoft connects candidates and employers, find jobs, build your profile, apply, and hire across every industry.", };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
