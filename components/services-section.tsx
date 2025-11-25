"use client"

import { motion } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const services = [
  { id: 1, icon: "📋", name: "Business Permit", description: "Apply for and renew business permits online" },
  { id: 2, icon: "🏗️", name: "Building Permit", description: "Construction and renovation permits" },
  { id: 3, icon: "📄", name: "Cedula", description: "Community tax certificate" },
  { id: 4, icon: "💍", name: "Marriage License", description: "Marriage certificate application" },
  { id: 5, icon: "🏥", name: "Health Certificate", description: "Medical clearance documents" },
  { id: 6, icon: "💉", name: "Vaccination Records", description: "View your vaccination history" },
  { id: 7, icon: "⚕️", name: "Medical Assistance", description: "Request medical support services" },
  { id: 8, icon: "👮", name: "Police Clearance", description: "Police clearance certificate" },
  { id: 9, icon: "🚒", name: "Fire Safety", description: "Fire safety inspections" },
  { id: 10, icon: "📝", name: "Barangay Clearance", description: "Barangay clearance certificate" },
]

const stats = [
  { label: "Active Services", value: "50+", icon: "✓" },
  { label: "Citizens Served", value: "600K+", icon: "👥" },
  { label: "Requests Processed", value: "25K+", icon: "📊" },
]

export default function ServicesSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      {/* Hero */}
      <div className="bg-lp-green-700 text-white py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Government Services</h1>
          <p className="text-xl text-lp-green-100">Access comprehensive city services designed to serve you better</p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-2 border border-lp-green-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lp-green-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-lp-green-900 placeholder-lp-green-400 focus:outline-none focus:ring-2 focus:ring-lp-green-500"
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-md p-6 border border-lp-green-100 hover:border-lp-green-300 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-lp-green-800 group-hover:text-lp-green-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-lp-green-600 mb-4">{service.description}</p>
              <span className="inline-flex items-center text-sm font-medium text-lp-gold-600 group-hover:text-lp-gold-500">
                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.div>
          ))}
          {filteredServices.length === 0 && (
            <div className="col-span-full text-center py-12 text-lp-green-500">
              No services found matching your search
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-lp-green-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-md border border-lp-green-100"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-bold text-lp-green-700 mb-2">{stat.value}</div>
              <div className="text-lp-green-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-lp-gold-500 text-lp-green-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
          <p className="text-xl mb-8 text-lp-green-800">
            Our team is ready to help you with any questions about our services
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-lp-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-lp-green-800 transition-colors shadow-lg"
            >
              Contact Support
            </motion.button>
          </Link>
        </div>
      </div>
    </>
  )
}
