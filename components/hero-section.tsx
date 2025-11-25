"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Building2, Users, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const stats = [
    { label: "Residents Served", value: "600K+", icon: Users },
    { label: "Barangays", value: "20", icon: Building2 },
    { label: "Land Area", value: "32km²", icon: MapPin },
    { label: "Online Services", value: "24/7", icon: Clock },
  ]

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-lp-green-900 via-lp-green-800 to-lp-green-900" />

      {/* Bamboo Organ inspired decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 hidden lg:flex flex-col items-center gap-1">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: 80 + Math.sin(i * 0.5) * 40 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="w-3 bg-gradient-to-t from-lp-gold-400 to-lp-gold-300 rounded-t-full"
          />
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 hidden lg:flex flex-col items-center gap-1">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: 80 + Math.sin((11 - i) * 0.5) * 40 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="w-3 bg-gradient-to-t from-lp-gold-400 to-lp-gold-300 rounded-t-full"
          />
        ))}
      </div>

      {/* Animated floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-20 left-[15%] w-40 h-40 bg-lp-gold-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-[15%] w-56 h-56 bg-lp-gold-500/15 rounded-full blur-3xl"
      />

      {/* Top decorative bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lp-gold-600 via-lp-gold-400 to-lp-gold-600" />

      {/* City seal watermark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <img src="/image.png" alt="" className="w-[400px] h-[400px] object-contain" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-lp-gold-300 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Welcome to Las Piñas City
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance"
            >
              <span className="text-white">Your Gateway to</span>
              <br />
              <span className="bg-gradient-to-r from-lp-gold-300 via-lp-gold-400 to-lp-gold-300 bg-clip-text text-transparent">
                Smart City Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-lp-green-100 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-pretty"
            >
              Experience modern government services with transparency, efficiency, and innovation. Home of the
              world-famous Bamboo Organ and rich cultural heritage.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/services"
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-lp-gold-400 to-lp-gold-500 text-lp-green-900 font-bold hover:shadow-xl hover:shadow-lp-gold-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:grid grid-cols-2 gap-4 auto-rows-fr"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              const isGold = i % 2 === 1
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`p-6 rounded-2xl backdrop-blur-sm border transition-all h-full min-h-[160px] flex flex-col justify-center ${
                    isGold ? "bg-lp-gold-500/20 border-lp-gold-400/30" : "bg-white/10 border-white/20"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      isGold ? "bg-lp-gold-400/30" : "bg-white/20"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isGold ? "text-lp-gold-300" : "text-white"}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className={`text-sm ${isGold ? "text-lp-gold-200" : "text-lp-green-200"}`}>{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lg:hidden mt-12 grid grid-cols-2 gap-4 auto-rows-fr"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center h-full min-h-[120px] flex flex-col items-center justify-center"
              >
                <Icon className="w-6 h-6 text-lp-gold-400 mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-lp-green-200">{stat.label}</p>
              </div>
            )
          })}
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mt-16"
        >
          <div className="w-2 h-2 rounded-full bg-lp-gold-400" />
          <div className="w-24 h-0.5 bg-gradient-to-r from-lp-gold-400 to-transparent rounded-full" />
          <div className="w-3 h-3 rounded-full bg-lp-gold-400 ring-4 ring-lp-gold-400/30" />
          <div className="w-24 h-0.5 bg-gradient-to-l from-lp-gold-400 to-transparent rounded-full" />
          <div className="w-2 h-2 rounded-full bg-lp-gold-400" />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}