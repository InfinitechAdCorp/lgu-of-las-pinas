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
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

declare global {
  interface Navigator {
    standalone?: boolean
  }
}

// Store prompt globally to persist across component remounts
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null
let hasBeenDismissed = false

// Capture the event ASAP when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    console.log("📲 Global beforeinstallprompt captured!")
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
    console.log("🔄 Header mounted, checking PWA status...")

    // Check if user manually dismissed
    if (hasBeenDismissed || localStorage.getItem('pwa-dismissed') === 'true') {
      console.log("ℹ️ Install prompt was dismissed by user")
      setShowInstallButton(false)
      return
    }

    // Detect iOS
    const checkIOS = () => {
      const ua = window.navigator.userAgent.toLowerCase()
      const isIOSDevice = /iphone|ipad|ipod/.test(ua)
      setIsIOS(isIOSDevice)
      console.log(`📱 iOS Device: ${isIOSDevice}`)
      return isIOSDevice
    }

    const iosDetected = checkIOS()

    // Check if app is already installed
    const checkInstalled = () => {
      // Check display mode (PWA)
      const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches
      
      // Check iOS standalone
      const isIOSStandalone = window.navigator.standalone === true
      
      // Check referrer (Android)
      const isAndroidApp = document.referrer.includes('android-app://')
      
      const installed = isStandaloneDisplay || isIOSStandalone || isAndroidApp

      if (installed) {
        console.log("✅ App is already installed!")
        setIsInstalled(true)
        setShowInstallButton(false)
        return true
      }
      
      console.log("ℹ️ App not yet installed")
      return false
    }

    if (checkInstalled()) {
      return
    }

    // For iOS devices, always show install option
    if (iosDetected) {
      console.log("📱 iOS: Showing install button")
      setShowInstallButton(true)
      return
    }

    // Check if we already have the prompt from global capture
    if (globalDeferredPrompt) {
      console.log("✅ Using globally captured install prompt")
      setDeferredPrompt(globalDeferredPrompt)
      setShowInstallButton(true)
    }

    // Listen for beforeinstallprompt (Android/Chrome/Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("📲 beforeinstallprompt event in component")
      e.preventDefault()
      const promptEvent = e as BeforeInstallPromptEvent
      globalDeferredPrompt = promptEvent
      setDeferredPrompt(promptEvent)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Listen for successful installation
    const handleAppInstalled = () => {
      console.log("🎉 App successfully installed!")
      setIsInstalled(true)
      setShowInstallButton(false)
      setDeferredPrompt(null)
      globalDeferredPrompt = null
      localStorage.removeItem('pwa-dismissed')
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    // Debug: Log current state after 2 seconds
    setTimeout(() => {
      console.log("📊 PWA Debug Info:", {
        hasPrompt: !!deferredPrompt || !!globalDeferredPrompt,
        isStandalone: window.matchMedia('(display-mode: standalone)').matches,
        isIOS: iosDetected,
        showButton: showInstallButton,
        userAgent: navigator.userAgent
      })
    }, 2000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    // iOS: Show instructions
    if (isIOS) {
      setShowIOSInstructions(true)
      return
    }

    // Android/Desktop: Use native prompt
    if (!deferredPrompt && !globalDeferredPrompt) {
      console.warn("⚠️ No install prompt available")
      alert("Install prompt not available. Please try:\n• Using Chrome or Edge browser\n• Ensuring site is served over HTTPS\n• Refreshing the page")
      return
    }

    const prompt = deferredPrompt || globalDeferredPrompt

    try {
      console.log("🚀 Showing install prompt...")
      await prompt!.prompt()

      const { outcome } = await prompt!.userChoice
      console.log(`👤 User response: ${outcome}`)

      if (outcome === 'accepted') {
        console.log('✅ User accepted installation')
        setShowInstallButton(false)
      } else {
        console.log('❌ User dismissed installation')
        hasBeenDismissed = true
        localStorage.setItem('pwa-dismissed', 'true')
        setShowInstallButton(false)
      }

      setDeferredPrompt(null)
      globalDeferredPrompt = null
    } catch (error) {
      console.error('❌ Install error:', error)
      alert('Installation failed. Please try again later.')
    }
  }

  const dismissIOSInstructions = () => {
    setShowIOSInstructions(false)
    hasBeenDismissed = true
    localStorage.setItem('pwa-dismissed', 'true')
    setShowInstallButton(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative">
          
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Calapan Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-bold gradient-text">Calapan</span>
                <span className="text-xs text-orange-600 font-semibold">
                  Government System
                </span>
              </div>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={`text-sm font-semibold transition-all relative group ${
                    pathname === link.href ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-emerald-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="hidden md:flex items-center gap-3" 
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
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Download size={18} />
                  <span>{isIOS ? 'Install' : 'Install App'}</span>
                </motion.button>
              )}

              {isInstalled && (
                <motion.div
                  key="installed-badge"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="px-4 py-2.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-2 border border-emerald-200"
                >
                  <Check size={18} />
                  <span>Installed</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Login
            </Link>
          </motion.div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
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
                className="md:hidden bg-white border-t border-orange-100 px-4 py-4 space-y-3 overflow-hidden absolute top-full left-0 w-full z-40 shadow-md"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-sm font-medium py-2 transition-colors ${
                      pathname === link.href ? "text-orange-600 font-semibold" : "text-gray-700 hover:text-orange-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {showInstallButton && !isInstalled && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => {
                      handleInstallClick()
                      setIsOpen(false)
                    }}
                    className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium text-center flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
                  >
                    <Download size={18} />
                    <span>Install App</span>
                  </motion.button>
                )}

                {isInstalled && (
                  <div className="block w-full px-4 py-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium text-center flex items-center justify-center gap-2 border border-emerald-200">
                    <Check size={18} />
                    <span>App Installed</span>
                  </div>
                )}

                <Link
                  href="/login"
                  className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium text-center hover:shadow-lg transition-all active:scale-95"
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
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Smartphone className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Install App</h3>
                  <p className="text-sm text-gray-500">Add to Home Screen</p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">
                      Tap the <strong>Share</strong> button <span className="text-2xl">⬆️</span> at the bottom of your browser
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">
                      Scroll down and tap <strong>"Add to Home Screen"</strong> <span className="text-2xl">➕</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">
                      Tap <strong>"Add"</strong> to confirm installation
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={dismissIOSInstructions}
                className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all active:scale-95"
              >
                Got it!
              </button>

              <button
                onClick={() => {
                  dismissIOSInstructions()
                  hasBeenDismissed = true
                  localStorage.setItem('pwa-dismissed', 'true')
                }}
                className="w-full mt-2 px-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
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