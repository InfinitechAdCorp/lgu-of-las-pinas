import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import CookieConsent from "@/components/cookie-consent"
import ServiceWorkerProvider from "@/components/ServiceWorkerProvider"
import FloatingSocialMedia from "@/components/FloatingSocialMedia"
import Chatbot from "@/components/Chatbot"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://lgu-of-calapan.vercel.app/"),
  
  title: {
    default: "Calapan City System | Smart City Services & Community Portal",
    template: "%s | Calapan City System"
  },
  
  description: "Official Calapan City digital platform providing seamless access to government services, community updates, emergency alerts, and local resources. Your complete gateway to smart city living in Oriental Mindoro.",
  
  keywords: [
    "Calapan City",
    "Oriental Mindoro",
    "city services",
    "government portal",
    "smart city",
    "community updates",
    "local government",
    "Philippine city services",
    "Calapan government",
    "city hall services",
    "emergency alerts",
    "community portal",
    "digital government",
    "e-services Philippines"
  ],
  
  authors: [{ name: "Calapan City Government" }],
  creator: "Calapan City Government",
  publisher: "Calapan City Government",
  generator: "Next.js",
  applicationName: "Calapan City System",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.json",
  
  // Open Graph metadata
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://lgu-of-calapan.vercel.app/",
    title: "Calapan City System | Smart City Services & Community Portal",
    description: "Official Calapan City digital platform providing seamless access to government services, community updates, emergency alerts, and local resources.",
    siteName: "Calapan City System",
    images: [
      {
        url: "https://lgu-of-calapan.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calapan City System - Smart City Services",
      },
    ],
    countryName: "Philippines",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Calapan City System | Smart City Services & Community Portal",
    description: "Official Calapan City digital platform providing seamless access to government services, community updates, and local resources.",
    images: ["https://lgu-of-calapan.vercel.app/twitter-image.png"],
    creator: "@CalapanCity",
  },

  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Calapan City",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px)"
      }
    ]
  },

  // Icons
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon512_rounded.png",
        sizes: "512x512",
        type: "image/png",
      }
    ],
    apple: [
      { url: "/apple-icon.png" },
      { url: "/icon512_rounded.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/icon512_rounded.png",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  
  alternates: {
    canonical: "https://lgu-of-calapan.vercel.app/",
    languages: {
      "en-PH": "https://lgu-of-calapan.vercel.app/",
      "fil-PH": "https://lgu-of-calapan.vercel.app//fil",
    },
  },
  
  category: "government",
  
  // Additional metadata
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ea580c" },
    { media: "(prefers-color-scheme: dark)", color: "#c2410c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Government Organization Schema
  const governmentSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "@id": "hhttps://lgu-of-calapan.vercel.app/#organization",
    "name": "Calapan City Government",
    "url": "hhttps://lgu-of-calapan.vercel.app/",
    "logo": "https://lgu-of-calapan.vercel.app/icon512_rounded.png",
    "description": "Official digital platform of Calapan City Government providing seamless access to city services and community updates",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calapan City Hall",
      "addressLocality": "Calapan City",
      "addressRegion": "Oriental Mindoro",
      "postalCode": "5200",
      "addressCountry": "PH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "13.4119",
      "longitude": "121.1803"
    },
    "areaServed": {
      "@type": "City",
      "name": "Calapan City"
    },
    "sameAs": [
      "https://www.facebook.com/CalapanCity",
      "https://twitter.com/CalapanCity"
    ]
  }

  // LocalBusiness Schema for better local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "hhttps://lgu-of-calapan.vercel.app/#localbusiness",
    "name": "Calapan City Government",
    "image": "https://lgu-of-calapan.vercel.app/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calapan City Hall",
      "addressLocality": "Calapan City",
      "addressRegion": "Oriental Mindoro",
      "postalCode": "5200",
      "addressCountry": "Philippines"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "13.4119",
      "longitude": "121.1803"
    },
    "url": "https://lgu-of-calapan.vercel.app/"
  }

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://lgu-of-calapan.vercel.app/#website",
    "url": "https://lgu-of-calapan.vercel.app/",
    "name": "Calapan City System",
    "description": "Smart City Services & Community Portal",
    "publisher": {
      "@id": "https://lgu-of-calapan.vercel.app/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://lgu-of-calapan.vercel.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang="en-PH">
      <head>
        {/* Primary Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(governmentSchema) }}
        />
        
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Open Graph Image Tags */}
        <meta property="og:image" content="https://lgu-of-calapan.vercel.app/g-image.png" />
        <meta property="og:image:secure_url" content="https://lgu-of-calapan.vercel.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Calapan City System - Smart City Services" />
        
        {/* Twitter Card Image */}
        <meta name="twitter:image" content="https://lgu-of-calapan.vercel.app/twitter-image.png" />
        <meta name="twitter:image:alt" content="Calapan City System" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Geographic meta tags */}
        <meta name="geo.region" content="PH-MDR" />
        <meta name="geo.placename" content="Calapan City" />
        <meta name="geo.position" content="13.4119;121.1803" />
        <meta name="ICBM" content="13.4119, 121.1803" />
        
        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Business-specific meta */}
        <meta property="place:location:latitude" content="13.4119" />
        <meta property="place:location:longitude" content="121.1803" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="hhttps://lgu-of-calapan.vercel.app/" />
        
        {/* Alternative languages */}
        <link rel="alternate" hrefLang="en-ph" href="hhttps://lgu-of-calapan.vercel.app/" />
        <link rel="alternate" hrefLang="fil-ph" href="hhttps://lgu-of-calapan.vercel.app/fil" />
        <link rel="alternate" hrefLang="x-default" href="https://lgu-of-calapan.vercel.app" />
      </head>
      <body className={`${geist.className} antialiased bg-gradient-to-br from-emerald-50 via-orange-50 to-emerald-50`}>
        <ServiceWorkerProvider />
        {children}
        <Toaster />
        <CookieConsent />
        <FloatingSocialMedia />
        <Chatbot />
      </body>
    </html>
  )
}