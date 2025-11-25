"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Upload, XCircle, User, Mail, Phone, MapPin, Lock } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    votersId: null as File | null,
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, votersId: file || null }))
      setError("")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.votersId) {
      setError("Please upload your Voter's ID")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)
    setError("")

    // Simulate registration
    setTimeout(() => {
      setLoading(false)
      router.push("/login")
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-lp-green-50 via-white to-lp-gold-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-lp-green-100">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lp-green-100 mb-4">
              <img src="/image.png" alt="Las Piñas Seal" className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-lp-green-800 mb-2">Create Account</h1>
            <p className="text-lp-green-600">Join City of Las Piñas Government System</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
            >
              <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-lp-green-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lp-green-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="Juan Dela Cruz"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-lp-green-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lp-green-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="juan@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-lp-green-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lp-green-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="+63 912 345 6789"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-lp-green-700 mb-2">Voters ID Upload</label>
                <label className="w-full h-[50px] rounded-xl border-2 border-dashed border-lp-green-200 hover:border-lp-green-500 cursor-pointer flex items-center justify-center gap-2 transition bg-lp-green-50/50 hover:bg-lp-green-100/50">
                  <Upload size={18} className="text-lp-green-600" />
                  <span className="text-sm text-lp-green-600 font-medium truncate max-w-[150px]">
                    {formData.votersId ? formData.votersId.name : "Upload ID"}
                  </span>
                  <input type="file" onChange={handleFileChange} className="hidden" accept="image/*,.pdf" required />
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-lp-green-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lp-green-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-lp-green-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lp-green-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="Re-enter password"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-lp-green-700 mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lp-green-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-lp-green-200 focus:border-lp-green-500 focus:ring-2 focus:ring-lp-green-200 transition bg-lp-green-50/50"
                    placeholder="123 Main Street, Barangay, Las Piñas"
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 rounded-xl bg-lp-green-700 text-white font-bold hover:bg-lp-green-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight size={18} />
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-8 border-t border-lp-green-100 text-center"
          >
            <p className="text-lp-green-600">
              Already have an account?{" "}
              <Link href="/login" className="text-lp-gold-600 font-bold hover:text-lp-gold-700">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
