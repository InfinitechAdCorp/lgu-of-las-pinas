"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, CheckCircle, XCircle, Send } from "lucide-react"
import PageLayout from "@/components/page-layout"
import Link from "next/link"
import { useState } from "react"

function Map() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.7401047894166!2d120.9812538!3d14.4510368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf2d5d5e8b0b%3A0x1d8e6a34f523c671!2sLas%20Pi%C3%B1as%20City%20Hall!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        title="Las Piñas City Map"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We will get back to you soon.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitting(false)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Location",
      details: "City Hall, Alabang-Zapote Rd, Las Piñas City",
      link: "https://maps.google.com/?q=Las+Pinas+City+Hall",
      isExternal: true,
    },
    {
      icon: Phone,
      title: "Phone",
      details: "(02) 8874-5050",
      link: "tel:+6328874-5050",
      isExternal: false,
    },
    {
      icon: Mail,
      title: "Email",
      details: "laspinascitygov@yahoo.com",
      link: "mailto:laspinascitygov@yahoo.com",
      isExternal: false,
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Monday - Friday: 8:00 AM - 5:00 PM",
      link: null,
      isExternal: false,
    },
  ]

  return (
    <PageLayout 
      title="Contact Us" 
      subtitle="Get in touch with Las Piñas City Government"
      image="/announcement_banner.png"
    >
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-lp-green-100">
              <h2 className="text-2xl font-bold text-lp-green-800 mb-6">Send us a Message</h2>

              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    submitStatus.type === "success"
                      ? "bg-lp-green-50 border border-lp-green-200 text-lp-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </motion.div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-lp-green-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lp-green-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lp-green-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="How can we help?"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lp-green-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="Your message..."
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-xl bg-lp-green-700 text-white font-bold hover:bg-lp-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-lp-green-100 flex gap-4 hover:shadow-lg hover:border-lp-gold-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-lp-gold-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-lp-gold-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lp-green-800 mb-1">{item.title}</h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="text-lp-green-600 hover:text-lp-gold-600 text-sm transition-colors"
                    >
                      {item.details}
                    </a>
                  ) : (
                    <p className="text-lp-green-600 text-sm">{item.details}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg border border-lp-green-100"
        >
          <Map />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-lp-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-lp-green-800 mb-6">Access Government Services Easily</h2>
            <p className="text-lp-green-600 text-lg mb-8 max-w-3xl mx-auto">
              Manage your local government needs in one platform—request documents, track applications, and stay updated
              with city services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-lp-green-700 text-white font-bold hover:bg-lp-green-800 transition-colors shadow-lg"
                >
                  Log In
                </motion.button>
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl border-2 border-lp-green-700 text-lp-green-700 font-bold hover:bg-lp-green-100 transition-colors"
                >
                  Register
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}