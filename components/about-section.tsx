"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To deliver efficient, transparent, and accessible government services that uplift the quality of life for all Las Piñeros.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A progressive, inclusive, and sustainable city where every resident thrives in harmony with our rich cultural heritage.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Integrity, excellence, compassion, and commitment to public service guide everything we do.",
  },
]

export default function AboutSection() {
  return (
    <>
      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-lp-green-800 mb-4">Our Commitment to You</h2>
            <p className="text-lg text-lp-green-600 max-w-2xl mx-auto">
              Building a better Las Piñas through dedicated public service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-lp-green-50 border border-lp-green-100 text-center hover:shadow-lg hover:border-lp-green-200 transition-all group"
                >
                  <motion.div className="flex justify-center mb-6" whileHover={{ scale: 1.1 }}>
                    <div className="p-4 bg-lp-green-600 rounded-2xl shadow-lg group-hover:bg-lp-green-700 transition-colors">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-lp-green-800 mb-3">{value.title}</h3>
                  <p className="text-lp-green-600 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-lp-green-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image src="/city_hall.png" alt="Las Piñas City Hall" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-lp-green-900/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-lp-green-800">About Las Piñas City</h2>
              <p className="text-lg text-lp-green-700 leading-relaxed">
                Las Piñas City is a first-class highly urbanized city in Metro Manila, Philippines. Known for the
                world-famous Bamboo Organ housed in St. Joseph Parish Church, our city combines rich cultural heritage
                with modern urban development.
              </p>
              <p className="text-lg text-lp-green-700 leading-relaxed">
                The City Government is committed to providing excellent public services, promoting sustainable
                development, and creating opportunities for all Las Piñeros to thrive. Through innovation and dedicated
                leadership, we continue to build a city that honors its past while embracing the future.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white rounded-xl border border-lp-green-200">
                  <p className="text-3xl font-bold text-lp-gold-600">600K+</p>
                  <p className="text-sm text-lp-green-600">Residents Served</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-lp-green-200">
                  <p className="text-3xl font-bold text-lp-gold-600">20+</p>
                  <p className="text-sm text-lp-green-600">Barangays</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-bold text-lp-green-800 mb-4">Visit Us</h2>
            <p className="text-lp-green-600">Las Piñas City Hall, Alabang-Zapote Road</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg border border-lp-green-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.3741376826397!2d120.9826!3d14.4500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf4e5c3c8c3f%3A0x8c8c8c8c8c8c8c8c!2sLas%20Pi%C3%B1as%20City%20Hall!5e0!3m2!1sen!2sph!4v1699999999999!5m2!1sen!2sph"
              width="100%"
              height="450"
              style={{ border: 0 }}
              title="Las Piñas City Hall Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}
