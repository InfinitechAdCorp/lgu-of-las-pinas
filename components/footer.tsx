"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, ChevronRight } from "lucide-react"
import { TikTokIcon, XIcon } from "@/components/icons"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
]

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
]

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/cityoflaspinasofficial/", label: "Facebook" },
  { icon: XIcon, href: "https://x.com/cityoflaspinas", label: "Twitter / X" },
  { icon: Instagram, href: "https://instagram.com/cityoflaspinasofficial", label: "Instagram" },
  { icon: TikTokIcon, href: "https://tiktok.com/@cityoflaspinasofficial", label: "TikTok" },
]

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-lp-green-900 via-lp-green-800 to-lp-green-900 overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-10 w-px h-full bg-gradient-to-b from-lp-gold-500/20 via-lp-gold-500/5 to-transparent" />
        <div className="absolute top-0 left-20 w-px h-3/4 bg-gradient-to-b from-lp-gold-500/15 via-lp-gold-500/5 to-transparent" />
        <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-lp-gold-500/20 via-lp-gold-500/5 to-transparent" />
        <div className="absolute top-0 right-20 w-px h-3/4 bg-gradient-to-b from-lp-gold-500/15 via-lp-gold-500/5 to-transparent" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <img src="/image.png" alt="City of Las Piñas Seal" className="w-14 h-14" />
              <div>
                <h3 className="text-xl font-bold text-white">Las Piñas City</h3>
                <p className="text-lp-gold-400 text-sm font-medium">Philippines</p>
              </div>
            </div>

            <p className="text-lp-green-200 text-sm leading-relaxed mb-6">
              Delivering quality government services and building a progressive community for all Las Piñeros.
            </p>

            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-lp-green-700/50 hover:bg-lp-gold-500 flex items-center justify-center text-lp-green-200 hover:text-lp-green-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h4 className="text-lp-gold-400 font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-lp-green-200 hover:text-lp-gold-400 transition-colors text-sm flex items-center gap-1 group">
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h4 className="text-lp-gold-400 font-bold mb-5 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-lp-green-200 hover:text-lp-gold-400 transition-colors text-sm flex items-center gap-1 group">
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h4 className="text-lp-gold-400 font-bold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-lp-gold-500/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-lp-gold-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Phone</p>
                  <a href="tel:+6328874-5050" className="text-lp-green-200 hover:text-lp-gold-400 text-sm">
                    (02) 8874-5050
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-lp-gold-500/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-lp-gold-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Email</p>
                  <a href="mailto:info@laspinas.gov.ph" className="text-lp-green-200 hover:text-lp-gold-400 text-sm">
                    info@laspinas.gov.ph
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-lp-gold-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-lp-gold-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Address</p>
                  <p className="text-lp-green-200 text-sm">
                    City Hall, Alabang-Zapote Rd,<br />
                    Las Piñas City
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-lp-green-950/50 border-t border-lp-green-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-lp-green-300 text-xs md:text-sm">
              © {new Date().getFullYear()} City Government of Las Piñas. All rights reserved.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-lp-green-400 text-xs md:text-sm">
                Powered by{" "}
                <a
                  href="https://infinitechphil.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-lp-gold-400 hover:text-lp-gold-300"
                >
                  INFINITECH ADVERTISING CORPORATION
                </a>
              </p>

              <span className="hidden md:inline text-lp-green-600">|</span>

              <p className="text-lp-gold-400 text-xs md:text-sm font-medium">
                Proudly serving the people of Las Piñas
              </p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
