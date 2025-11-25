"use client"

import { motion } from "framer-motion"

interface PageHeroBannerProps {
  title: string
  subtitle: string
}

export default function PageHeroBanner({ title, subtitle }: PageHeroBannerProps) {
  return (
    <div className="relative w-full min-h-[350px] md:min-h-[420px] overflow-hidden pt-16 md:pt-20">
      {/* Rich layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-lp-green-900 via-lp-green-800 to-lp-green-900" />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-lp-gold-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-lp-green-600/30 via-transparent to-transparent" />
      </div>

      {/* Animated floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-32 h-32 bg-lp-gold-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-[20%] w-40 h-40 bg-lp-gold-500/15 rounded-full blur-3xl"
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Bamboo Organ inspired vertical lines - left side */}
      <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-1">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 30 + Math.sin(i * 0.8) * 15, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            className="w-1.5 bg-gradient-to-t from-lp-gold-400 to-lp-gold-300/50 rounded-t-full"
          />
        ))}
      </div>

      {/* Bamboo Organ inspired vertical lines - right side */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-1">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 30 + Math.sin((6 - i) * 0.8) * 15, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            className="w-1.5 bg-gradient-to-t from-lp-gold-400 to-lp-gold-300/50 rounded-t-full"
          />
        ))}
      </div>

      {/* City seal watermark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-lp-gold-400/20 rounded-full blur-2xl scale-110" />
          <img src="/images/image.png" alt="" className="relative w-32 md:w-48 lg:w-56 drop-shadow-2xl" />
        </div>
      </motion.div>

      {/* Top decorative bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lp-gold-600 via-lp-gold-400 to-lp-gold-600 shadow-lg shadow-lp-gold-500/30" />

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lp-gold-500/60 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
        >
          <span className="text-xs md:text-sm font-medium text-lp-gold-200 tracking-wider uppercase">
            City of Las Piñas
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance drop-shadow-lg"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-lp-gold-100 max-w-2xl text-balance leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-lp-gold-400" />
          <div className="w-20 md:w-32 h-0.5 bg-gradient-to-r from-lp-gold-400 to-lp-gold-500 rounded-full" />
          <div className="w-3 h-3 rounded-full bg-lp-gold-400 ring-4 ring-lp-gold-400/30" />
          <div className="w-20 md:w-32 h-0.5 bg-gradient-to-l from-lp-gold-400 to-lp-gold-500 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-lp-gold-400" />
        </motion.div>
      </div>
    </div>
  )
}
