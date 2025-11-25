"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, Briefcase, HomeIcon, FileText, Shield, Heart, GraduationCap } from "lucide-react"
import Link from "next/link"

const services = [
  { name: "Business Permit", description: "Apply for and renew business permits online", icon: Briefcase },
  { name: "Building Permit", description: "Construction and building permit applications", icon: HomeIcon },
  { name: "Cedula", description: "Community tax certificate issuance", icon: FileText },
  { name: "Barangay Clearance", description: "Request barangay clearance documents", icon: Shield },
  { name: "Health Certificate", description: "Medical and health clearance services", icon: Heart },
  { name: "Educational Aid", description: "Scholarship and educational assistance", icon: GraduationCap },
]

export default function HomeContent() {
  return (
    <>
      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-lp-green-50/30 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lp-green-100 text-lp-green-700 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Quick Access
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-lp-green-900 mb-4">City Services</h2>
            <p className="text-lg text-lp-green-600 max-w-2xl mx-auto">
              Access essential government services and documentation with ease
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="p-6 rounded-2xl bg-white border border-lp-green-100 hover:border-lp-green-300 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-lp-green-100 to-lp-gold-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-lp-green-700" />
                  </div>
                  <h3 className="text-lg font-bold text-lp-green-900 mb-2 group-hover:text-lp-green-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-lp-green-600 text-sm">{service.description}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-lp-green-700 to-lp-green-600 text-white font-bold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                View All Services <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-lp-green-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-lp-gold-500/20 text-lp-gold-300 text-sm font-medium mb-4">
                About Las Piñas City
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Home of the World-Famous <span className="text-lp-gold-400">Bamboo Organ</span>
              </h2>
              <p className="text-lp-green-100 leading-relaxed mb-6">
               Las Piñas City is a first-class highly urbanized city in Metro Manila, Philippines. Known for the world-famous Bamboo Organ housed in St. Joseph Parish Church, our city combines rich cultural heritage with modern urban development.

The City Government is committed to providing excellent public services, promoting sustainable development, and creating opportunities for all Las Piñeros to thrive. Through innovation and dedicated leadership, we continue to build a city that honors its past while embracing the future.
              </p>
              <p className="text-lp-green-100 leading-relaxed mb-8">
                With 20 barangays and over 600,000 residents, we are committed to providing excellent public service
                through transparent and participative governance.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lp-gold-500 text-lp-green-900 font-semibold hover:bg-lp-gold-400 transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/bamboo-organ-church-las-pinas.jpg"
                  alt="Bamboo Organ at St. Joseph Parish Church"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lp-green-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-lp-gold-300 text-sm font-medium mb-1">National Cultural Treasure</p>
                  <p className="text-white text-lg font-bold">St. Joseph Parish Church Bamboo Organ</p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-lp-gold-500/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
