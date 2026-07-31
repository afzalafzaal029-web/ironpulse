import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ironpulse-gym.vercel.app"),
  title: {
    default: "IRONPULSE | Premium Fitness Studio",
    template: "%s | IRONPULSE",
  },
  description:
    "Transform your body at IRONPULSE. World-class trainers, cutting-edge equipment, and a community that pushes you beyond limits. Join now.",
  keywords: [
    "gym",
    "fitness",
    "HIIT",
    "yoga",
    "crossfit",
    "boxing",
    "personal training",
    "Los Angeles gym",
    "premium fitness",
  ],
  authors: [{ name: "IRONPULSE" }],
  creator: "IRONPULSE",
  openGraph: {
    title: "IRONPULSE | Premium Fitness Studio",
    description:
      "Transform your body at IRONPULSE. Join the elite fitness community.",
    url: "https://ironpulse-fitnessgym.vercel.app",
    siteName: "IRONPULSE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IRONPULSE Fitness Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IRONPULSE | Premium Fitness Studio",
    description:
      "Transform your body at IRONPULSE. Join the elite fitness community.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ironpulse-fitnessgym.vercel.app",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "IRONPULSE Fitness Studio",
    image: "https://ironpulse-fitnessgym.vercel.app/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Fitness Avenue",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90001",
    },
    telephone: "+1-555-123-4567",
    priceRange: "$$",
    openingHours: "Mo-Su 05:00-22:00",
    sameAs: [
      "https://instagram.com/ironpulse-fitnessgym",
      "https://twitter.com/ironpulse-fitnessgym",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${oswald.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
