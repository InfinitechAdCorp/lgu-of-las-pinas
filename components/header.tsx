"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, Check, Smartphone } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/announcements", label: "Announcements" },
  { href: "/news", label: "News" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

declare global {
  interface Navigator {
    standalone?: boolean
  }
}

let globalDeferredPrompt: BeforeInstallPromptEvent | null = null

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e: Event) => {
    console.log("✅ beforeinstallprompt event captured globally")
    e.preventDefault()
    globalDeferredPrompt = e as BeforeInstallPromptEvent
  })
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    console.log("🔍 PWA Install Button Check Starting...")
    
    // Check iOS
    const checkIOS = () => {
      const ua = window.navigator.userAgent.toLowerCase()
      const isIOSDevice = /iphone|ipad|ipod/.test(ua)
      console.log("📱 iOS Device detected:", isIOSDevice)
      setIsIOS(isIOSDevice)
      return isIOSDevice
    }

    const iosDetected = checkIOS()

    // Check if already installed
    const checkInstalled = () => {
      const isStandaloneDisplay = window.matchMedia("(display-mode: standalone)").matches
      const isIOSStandalone = window.navigator.standalone === true
      const isAndroidApp = document.referrer.includes("android-app://")
      const installed = isStandaloneDisplay || isIOSStandalone || isAndroidApp

      console.log("🔧 Installation Check:", {
        isStandaloneDisplay,
        isIOSStandalone,
        isAndroidApp,
        installed
      })

      if (installed) {
        console.log("✅ App is already installed")
        setIsInstalled(true)
        setShowInstallButton(false)
        return true
      }
      return false
    }

    if (checkInstalled()) {
      console.log("✅ Already installed, hiding button")
      return
    }

    // For iOS, always show install button (with manual instructions)
    if (iosDetected) {
      console.log("📱 iOS detected - showing install button")
      setShowInstallButton(true)
      return
    }

    // For Android/Desktop - ALWAYS show button (don't check for dismissed flag)
    console.log("🤖 Non-iOS device - showing install button")
    setShowInstallButton(true)
    
    // Check if prompt already captured
    if (globalDeferredPrompt) {
      console.log("✅ Global prompt already available")
      setDeferredPrompt(globalDeferredPrompt)
    } else {
      console.log("⏳ Button will show, waiting for beforeinstallprompt event for native prompt...")
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("✅ beforeinstallprompt event fired in component")
      e.preventDefault()
      const promptEvent = e as BeforeInstallPromptEvent
      globalDeferredPrompt = promptEvent
      setDeferredPrompt(promptEvent)
    }

    const handleAppInstalled = () => {
      console.log("✅ App has been installed!")
      setIsInstalled(true)
      setShowInstallButton(false)
      setDeferredPrompt(null)
      globalDeferredPrompt = null
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    // Debug information
    console.log("🔧 PWA Requirements Check:", {
      hasServiceWorker: "serviceWorker" in navigator,
      isSecure: window.isSecureContext,
      protocol: window.location.protocol,
      hasManifest: document.querySelector('link[rel="manifest"]') !== null,
      manifestLink: document.querySelector('link[rel="manifest"]')?.getAttribute('href'),
      displayMode: window.matchMedia("(display-mode: standalone)").matches ? "standalone" : "browser",
      userAgent: navigator.userAgent,
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    console.log("🔘 Install button clicked")
    
    if (isIOS) {
      console.log("📱 iOS - showing instructions")
      setShowIOSInstructions(true)
      return
    }

    const prompt = deferredPrompt || globalDeferredPrompt
    
    if (!prompt) {
      console.error("❌ No install prompt available - showing alert")
      alert(
        "⚠️ Install Prompt Not Available\n\n" +
        "The browser hasn't triggered the install prompt yet. This can happen if:\n\n" +
        "• The app doesn't meet PWA requirements yet\n" +
        "• You're not using Chrome, Edge, or Samsung Internet\n" +
        "• The site isn't served over HTTPS\n\n" +
        "The Install button will remain visible. Please:\n" +
        "• Try refreshing the page\n" +
        "• Check browser console for errors\n" +
        "• Ensure you're using a supported browser"
      )
      return
    }

    try {
      console.log("🚀 Showing install prompt...")
      await prompt.prompt()
      const { outcome } = await prompt.userChoice
      console.log("📊 User choice:", outcome)

      if (outcome === "accepted") {
        console.log("✅ User accepted installation")
        // Keep button visible until app is actually installed
      } else {
        console.log("❌ User dismissed installation")
        // Keep button visible even if dismissed
      }

      // Clear the used prompt
      setDeferredPrompt(null)
      globalDeferredPrompt = null
    } catch (error) {
      console.error("❌ Installation error:", error)
      alert("Installation failed. The Install button will remain available for you to try again.")
    }
  }

  const dismissIOSInstructions = () => {
    setShowIOSInstructions(false)
  }

  const dismissPermanently = () => {
    setShowIOSInstructions(false)
    // Don't hide the install button, just close the modal
  }

  // Debug button visibility
  useEffect(() => {
    console.log("🎯 Install Button State:", {
      showInstallButton,
      isInstalled,
      isIOS,
      hasDeferredPrompt: !!deferredPrompt,
      hasGlobalPrompt: !!globalDeferredPrompt
    })
  }, [showInstallButton, isInstalled, isIOS, deferredPrompt])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-lp-green-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between relative">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/image.png" alt="City of Las Piñas Seal" className="w-full h-full object-contain" />
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-bold text-lp-green-800">City of Las Piñas</span>
                <span className="text-xs text-lp-gold-600 font-medium">Philippines</span>
              </div>
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                      isActive
                        ? "bg-lp-green-100 text-lp-green-800"
                        : "text-lp-green-700 hover:bg-lp-green-50 hover:text-lp-green-800"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-lp-gold-500 rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            className="hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AnimatePresence mode="wait">
              {showInstallButton && !isInstalled && (
                <motion.button
                  key="install-button"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={handleInstallClick}
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-lp-gold-500 to-lp-gold-400 text-lp-green-900 font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Download size={18} />
                  <span>{isIOS ? "Install App" : "Install App"}</span>
                </motion.button>
              )}

              {isInstalled && (
                <motion.div
                  key="installed-badge"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="px-4 py-2.5 rounded-full bg-lp-green-50 text-lp-green-700 font-semibold flex items-center gap-2 border border-lp-green-200"
                >
                  <Check size={18} />
                  <span>Installed</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-lp-green-700 to-lp-green-600 text-white font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Login
            </Link>
          </motion.div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-lp-green-50 transition-colors text-lp-green-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-white border-t border-lp-green-100 px-4 py-4 space-y-2 overflow-hidden absolute top-full left-0 w-full z-40 shadow-lg"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block text-sm font-medium py-3 px-4 rounded-lg transition-colors ${
                        isActive
                          ? "bg-lp-green-100 text-lp-green-800 font-semibold border-l-4 border-lp-gold-500"
                          : "text-lp-green-700 hover:bg-lp-green-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                })}

                {showInstallButton && !isInstalled && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => {
                      handleInstallClick()
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-lp-gold-500 to-lp-gold-400 text-lp-green-900 font-medium text-center flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
                  >
                    <Download size={18} />
                    <span>Install App</span>
                  </motion.button>
                )}

                {isInstalled && (
                  <div className="w-full px-4 py-3 rounded-lg bg-lp-green-50 text-lp-green-700 font-medium text-center flex items-center justify-center gap-2 border border-lp-green-200">
                    <Check size={18} />
                    <span>App Installed</span>
                  </div>
                )}

                <Link
                  href="/login"
                  className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-lp-green-700 to-lp-green-600 text-white font-medium text-center hover:shadow-lg transition-all active:scale-95"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* iOS Install Instructions Modal */}
      <AnimatePresence>
        {showIOSInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={dismissIOSInstructions}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={dismissIOSInstructions}
                className="absolute top-4 right-4 p-2 hover:bg-lp-green-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-lp-green-100 rounded-full">
                  <Smartphone className="text-lp-green-700" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-lp-green-900">Install App</h3>
                  <p className="text-sm text-lp-green-600">Add to Home Screen</p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-lp-gold-100 rounded-full flex items-center justify-center text-lp-gold-700 font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-lp-green-800">
                      Tap the <strong>Share</strong> button <span className="text-2xl">⬆️</span> at the bottom of Safari
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-lp-gold-100 rounded-full flex items-center justify-center text-lp-gold-700 font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-lp-green-800">
                      Scroll down and tap <strong>"Add to Home Screen"</strong> <span className="text-xl">➕</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-lp-gold-100 rounded-full flex items-center justify-center text-lp-gold-700 font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-lp-green-800">
                      Tap <strong>"Add"</strong> in the top right to confirm
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={dismissIOSInstructions}
                className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-lp-green-700 to-lp-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all active:scale-95"
              >
                Got it!
              </button>

              <button
                onClick={dismissPermanently}
                className="w-full mt-2 px-4 py-2 text-lp-green-600 text-sm hover:text-lp-green-800 transition-colors"
              >
                Don't show again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}