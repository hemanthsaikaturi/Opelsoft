import "./globals.css";
import "./interactive.css";
import "./header.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/ui/Preloader";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"], variable: "--font-inter", display: "swap", });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-mono", display: "swap", });

// Modern geometric display font for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"], variable: "--font-display", display: "swap", });

const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === 'production') return 'https://opelsoft.com';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export const metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    template: '%s | OpelSoft',
    default: 'OpelSoft | IT Consulting & Talent Solutions',
  },
  description: 'OpelSoft provides Software Development, IT Consulting, and Talent Solutions for Fortune 500 clients nationwide.',
  keywords: ['IT Consulting', 'Software Development', 'Contract Staffing', 'Bench Sales', 'Application Development', 'OpelSoft LLC', 'New Jersey'],
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'OpelSoft',
    title: 'OpelSoft | IT Consulting & Talent Solutions',
    description: 'Drive Efficiency with AI-Powered Workforce Solutions. IT Consulting & Development for Fortune 500s.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OpelSoft - IT Consulting & Talent Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpelSoft | IT Consulting & Talent Solutions',
    description: 'Drive Efficiency with AI-Powered Workforce Solutions. IT Consulting & Development for Fortune 500s.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OpelSoft LLC",
              "url": "https://opelsoft.com",
              "logo": "https://opelsoft.com/logo.svg",
              "description": "OpelSoft provides Software Development & IT Consulting Services to Fortune 500 clients across the US.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Edison",
                "addressRegion": "NJ",
                "addressCountry": "US"
              }
            })
          }}
        />
        <Preloader />
        <Header />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
