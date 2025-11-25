"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Users, Zap, Clock, X } from "lucide-react"

interface NewsArticle {
  id: number
  title: string
  content: string
  category: string
  image?: string
  status: string
  published_at?: string
  created_at: string
  author?: {
    id: number
    name: string
    email: string
  }
}

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        
        // Changed from /api/news to /api/news/published
        const response = await fetch("/api/news/published?per_page=3")
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('[Home] Full API Response:', result)
        
        if (result.success) {
          // Handle Laravel pagination structure properly
          let newsData: NewsArticle[] = []
          
          if (result.data && typeof result.data === 'object') {
            // If data has a 'data' property (paginated response)
            if (Array.isArray(result.data.data)) {
              newsData = result.data.data
            }
            // If data is directly an array
            else if (Array.isArray(result.data)) {
              newsData = result.data
            }
          }
          
          console.log('[Home] Processed news data:', newsData)
          console.log('[Home] Number of articles:', newsData.length)
          
          setNews(newsData)
        } else {
          throw new Error(result.message || 'Failed to fetch news')
        }
      } catch (error) {
        console.error("[Home] Failed to fetch news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Close modal when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedArticle])

  const stats = [
    { label: "Active Citizens", value: "200K+", icon: Users },
    { label: "Services Available", value: "50+", icon: Zap },
    { label: "Requests Processed", value: "12K+", icon: Clock },
  ]

  const services = [
    { name: "Business Permit", description: "Apply for business permits", icon: "📋" },
    { name: "Building Permit", description: "Construction permits", icon: "🏗️" },
    { name: "Cedula", description: "Community tax certificate", icon: "📄" },
    { name: "Barangay Clearance", description: "Apply for Barangay Clearance", icon: "💍" },
    { name: "Health Certificate", description: "Medical clearance", icon: "🏥" },
    { name: "Vaccination Records", description: "View vaccination history", icon: "💉" },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      announcement: "Announcement",
      event: "Event",
      alert: "Alert",
      update: "Update",
      news: "News",
    }
    return categoryMap[category?.toLowerCase()] || "Update"
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-20 pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/calapancity.hall.jpg')",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-600/80 via-accent-500/80 to-primary-500/80"
          animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
              Welcome to Calapan City Government
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto text-balance">
              Access government services, stay informed, and connect with your community all in one place
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 text-center hover:shadow-lg transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground/70 font-semibold">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-50 via-primary-100 to-accent-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
              Our Services
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Quick access to essential government services and documentation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="p-6 rounded-2xl bg-white border border-primary-100 hover:border-primary-300 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-foreground/60 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                View All Services <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
              Latest Updates
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Stay informed with recent announcements from your local government
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 animate-pulse h-64"
                />
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {news.slice(0, 3).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedArticle(item)}
                  className="rounded-2xl bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer border border-primary-100"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500">
                    {item.image ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ""}/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                        📰
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-primary-600">
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <p className="text-sm text-foreground/60 mb-2">
                      {item.published_at ? formatDate(item.published_at) : formatDate(item.created_at)}
                    </p>
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 text-sm line-clamp-3">
                      {item.content.substring(0, 120)}...
                    </p>
                   
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60">No news available at the moment.</p>
            </div>
          )}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <Link href="/announcements">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                View All Updates <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header with Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                {selectedArticle.image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ""}/${selectedArticle.image}`}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 flex items-center justify-center text-white text-8xl">
                    📰
                  </div>
                )}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-slate-700" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                {/* Category Badge */}
                <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {getCategoryLabel(selectedArticle.category)}
                </span>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {selectedArticle.title}
                </h2>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-slate-600 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {selectedArticle.published_at ? formatDate(selectedArticle.published_at) : formatDate(selectedArticle.created_at)}
                    </span>
                  </div>
                  {selectedArticle.author && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>By {selectedArticle.author.name}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
                    {selectedArticle.content}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-6 md:px-8 py-4 border-t border-slate-200">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full md:w-auto px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Ready to Get Started?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Join thousands of citizens using our platform to access services and stay connected
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-3 bg-white text-primary-600 font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Sign Up Today
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}