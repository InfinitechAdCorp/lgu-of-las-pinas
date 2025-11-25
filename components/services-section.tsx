"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const services = [
  {
    id: 1,
    icon: "📋",
    name: "Business Permit",
    description: "Apply for business permits online"
  },
  {
    id: 2,
    icon: "🏗️",
    name: "Building Permit",
    description: "Construction and renovation permits"
  },
  {
    id: 3,
    icon: "📄",
    name: "Cedula",
    description: "Community tax certificate"
  },
  {
    id: 4,
    icon: "💍",
    name: "Marriage License",
    description: "Marriage certificate application"
  },
  {
    id: 5,
    icon: "🏥",
    name: "Health Certificate",
    description: "Medical clearance documents"
  },
  {
    id: 6,
    icon: "💉",
    name: "Vaccination Records",
    description: "View your vaccination history"
  },
  {
    id: 7,
    icon: "⚕️",
    name: "Medical Assistance",
    description: "Request medical support services"
  },
  {
    id: 8,
    icon: "👮",
    name: "Police Clearance",
    description: "Police clearance certificate"
  },
  {
    id: 9,
    icon: "🚒",
    name: "Fire Safety",
    description: "Fire safety inspections"
  },
  {
    id: 10,
    icon: "📝",
    name: "Barangay Clearance",
    description: "Barangay clearance certificate"
  },
]

const stats = [
  { label: "Active Services", value: "50+", icon: "✓" },
  { label: "Citizens Served", value: "200K+", icon: "👥" },
  { label: "Requests Processed", value: "12K+", icon: "📊" },
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
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Government Services
          </h1>
          <p className="text-xl text-primary-100">
            Access comprehensive government services designed to serve you better
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent-400"
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {service.name}
              </h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
            </motion.div>
          ))}
          {filteredServices.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No services found matching your search
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-xl mb-8 text-accent-100">
            Contact our support team for any questions about our services
          </p>
          <Link href="/support">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-accent-600 px-8 py-3 rounded-lg font-semibold hover:bg-accent-50 transition-colors"
            >
              Get Support
            </motion.button>
          </Link>
        </div>
      </div>
    </>
  )
}