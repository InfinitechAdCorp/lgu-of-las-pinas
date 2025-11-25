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
  metadataBase: new URL("https://laspinas.gov.ph/"),

  title: {
    default: "City of Las Piñas | Official Government Portal",
    template: "%s | City of Las Piñas",
  },

  description:
    "Official digital platform of the City of Las Piñas, Philippines. Access government services, community updates, news, and local resources. Your gateway to smart city living in Metro Manila.",

  keywords: [
    "Las Piñas City",
    "Las Piñas",
    "Metro Manila",
    "city services",
    "government portal",
    "smart city",
    "community updates",
    "local government",
    "Philippine city services",
    "Las Piñas government",
    "city hall services",
    "Bamboo Organ",
    "Salt Beds",
    "NCR",
  ],

  authors: [{ name: "City Government of Las Piñas" }],
  creator: "City Government of Las Piñas",
  publisher: "City Government of Las Piñas",
  generator: "Next.js",
  applicationName: "Las Piñas City Portal",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.json", // PWA manifest

  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://laspinas.gov.ph/",
    title: "City of Las Piñas | Official Government Portal",
    description:
      "Official digital platform of the City of Las Piñas providing seamless access to government services, community updates, and local resources.",
    siteName: "Las Piñas City Portal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "City of Las Piñas - Official Government Portal",
      },
    ],
    countryName: "Philippines",
  },

  twitter: {
    card: "summary_large_image",
    title: "City of Las Piñas | Official Government Portal",
    description:
      "Official digital platform of the City of Las Piñas providing seamless access to government services and community updates.",
    images: ["/twitter-image.png"],
  },

  // Apple Web App - PWA
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Las Piñas City",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px)"
      }
    ]
  },

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
    canonical: "https://laspinas.gov.ph/",
    languages: {
      "en-PH": "https://laspinas.gov.ph/",
      "fil-PH": "https://laspinas.gov.ph/fil",
    },
  },

  category: "government",

  // Additional PWA metadata
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2d5a27" },
    { media: "(prefers-color-scheme: dark)", color: "#1a3d17" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover", // PWA viewport fit
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
    "@id": "https://laspinas.gov.ph/#organization",
    name: "City Government of Las Piñas",
    url: "https://laspinas.gov.ph/",
    logo: "https://laspinas.gov.ph/icon512_rounded.png",
    description:
      "Official digital platform of the City Government of Las Piñas providing seamless access to city services and community updates",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pamplona Tres",
      addressLocality: "Las Piñas City",
      addressRegion: "Metro Manila",
      postalCode: "1740",
      addressCountry: "PH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "14.4445",
      longitude: "120.9930",
    },
    areaServed: {
      "@type": "City",
      name: "Las Piñas City",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+63-2-8874-5050",
      contactType: "customer service",
      email: "info@laspinas.gov.ph",
    },
    sameAs: [
      "https://www.facebook.com/LasPinasCity",
      "https://twitter.com/LasPinasCity"
    ]
  }

  // LocalBusiness Schema for better local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://laspinas.gov.ph/#localbusiness",
    name: "City Government of Las Piñas",
    image: "https://laspinas.gov.ph/og-image.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pamplona Tres",
      addressLocality: "Las Piñas City",
      addressRegion: "Metro Manila",
      postalCode: "1740",
      addressCountry: "Philippines"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "14.4445",
      longitude: "120.9930"
    },
    url: "https://laspinas.gov.ph/"
  }

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://laspinas.gov.ph/#website",
    url: "https://laspinas.gov.ph/",
    name: "Las Piñas City Portal",
    description: "Official Government Portal",
    publisher: {
      "@id": "https://laspinas.gov.ph/#organization"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://laspinas.gov.ph/search?q={search_term_string}"
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
        <meta property="og:image" content="https://laspinas.gov.ph/og-image.png" />
        <meta property="og:image:secure_url" content="https://laspinas.gov.ph/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="City of Las Piñas - Official Government Portal" />
        
        {/* Twitter Card Image */}
        <meta name="twitter:image" content="https://laspinas.gov.ph/twitter-image.png" />
        <meta name="twitter:image:alt" content="Las Piñas City Portal" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Geographic meta tags */}
        <meta name="geo.region" content="PH-NCR" />
        <meta name="geo.placename" content="Las Piñas City" />
        <meta name="geo.position" content="14.4445;120.9930" />
        <meta name="ICBM" content="14.4445, 120.9930" />
        
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
        <meta property="place:location:latitude" content="14.4445" />
        <meta property="place:location:longitude" content="120.9930" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://laspinas.gov.ph/" />
        
        {/* Alternative languages */}
        <link rel="alternate" hrefLang="en-ph" href="https://laspinas.gov.ph/" />
        <link rel="alternate" hrefLang="fil-ph" href="https://laspinas.gov.ph/fil" />
        <link rel="alternate" hrefLang="x-default" href="https://laspinas.gov.ph/" />
      </head>
      <body className={`${geist.className} ${geistMono.className} font-sans antialiased overflow-x-hidden`}>
        <ServiceWorkerProvider />
        <div className="min-h-screen">
          {children}
        </div>
        <FloatingSocialMedia />
        <Chatbot />
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  )
}