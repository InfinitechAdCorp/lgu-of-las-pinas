"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import PageHeroBanner from "@/components/page-hero-banner"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export default function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHeroBanner title={title} subtitle={subtitle || ""} />
      {children}
      <Footer />
    </main>
  )
}
