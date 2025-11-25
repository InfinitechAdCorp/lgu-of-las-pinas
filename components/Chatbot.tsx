"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Bot, X, Send } from "lucide-react"

interface Message {
  type: "bot" | "user"
  text: string
  quickReplies?: string[]
}

export default function Chatbot() {
  const pathname = usePathname()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showPromoMessage, setShowPromoMessage] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      text: "Hi there! 👋 I'm your Las Piñas City Assistant. How can I help you today?",
      quickReplies: [
        "Our Mission",
        "Our Vision",
        "Our Values",
        "Contact Info",
        "Office Hours",
        "Services",
        "Bamboo Organ",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Hide on dashboard, login, and register routes
  if (pathname?.startsWith("/dashboard") || pathname === "/login" || pathname === "/register") {
    return null
  }

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputMessage
    if (messageToSend.trim() === "") return

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: messageToSend }])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(messageToSend)
      setMessages((prev) => [...prev, botResponse])
    }, 800)

    setInputMessage("")
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const getBotResponse = (message: string): Message => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("mission") || lowerMessage === "our mission") {
      return {
        type: "bot",
        text: "🎯 Our Mission:\n\nTo provide quality, effective, and efficient public service through transparent, accountable, and participative governance in partnership with all stakeholders for a progressive, peaceful, and livable Las Piñas City.",
        quickReplies: ["Our Vision", "Our Values", "Contact Info", "Services"],
      }
    } else if (lowerMessage.includes("vision") || lowerMessage === "our vision") {
      return {
        type: "bot",
        text: "🌟 Our Vision:\n\nLas Piñas: A premier city of empowered, peaceful, healthy, and productive citizens living in a clean, green, and sustainable environment with a dynamic economy anchored on good governance.",
        quickReplies: ["Our Mission", "Our Values", "Contact Info", "Services"],
      }
    } else if (lowerMessage.includes("values") || lowerMessage === "our values") {
      return {
        type: "bot",
        text: "💎 Our Values:\n\n• Integrity - We uphold honesty and strong moral principles\n• Excellence - We strive for outstanding service delivery\n• Transparency - We operate openly and accountably\n• Public Service - Serving the people of Las Piñas is our priority\n• Innovation - We embrace modern solutions for better governance",
        quickReplies: ["Our Mission", "Our Vision", "Visit Us", "Contact Info"],
      }
    } else if (lowerMessage.includes("bamboo") || lowerMessage.includes("organ")) {
      return {
        type: "bot",
        text: "🎵 The Bamboo Organ:\n\nLas Piñas City is world-famous for the historic Bamboo Organ, located at St. Joseph Parish Church. Built in 1821 by Father Diego Cera, it features 1,031 bamboo pipes and is considered a National Cultural Treasure.\n\nEvery February, the Bamboo Organ Festival attracts musicians and visitors from around the world!",
        quickReplies: ["Visit Us", "Services", "Contact Info", "Our History"],
      }
    } else if (lowerMessage.includes("visit") || lowerMessage === "visit us") {
      return {
        type: "bot",
        text: "📍 Visit Us:\n\nLas Piñas City Hall\nAlabangg-Zapote Road\nLas Piñas City, Metro Manila\nPostal Code: 1740\nPhilippines\n\nThe City Hall is accessible via public transportation and has ample parking space for visitors.",
        quickReplies: ["Office Hours", "Contact Info", "Services", "Our Mission"],
      }
    } else if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("kumusta") ||
      lowerMessage.includes("mabuhay")
    ) {
      return {
        type: "bot",
        text: "Mabuhay! 👋 Welcome to Las Piñas City! How can I help you with city services today?",
        quickReplies: ["Our Mission", "Our Vision", "Services", "Contact Info", "Office Hours", "Bamboo Organ"],
      }
    } else if (lowerMessage.includes("service") || lowerMessage.includes("services")) {
      return {
        type: "bot",
        text: "🏛️ Las Piñas City offers various services including:\n\n• Business Permits & Licensing\n• Community Tax Certificate (Cedula)\n• Health Services & Vaccinations\n• Building Permits\n• Civil Registration (Birth, Marriage, Death)\n• Real Property Tax\n• Barangay Clearances\n• Police Clearance\n\nWhat specific service are you looking for?",
        quickReplies: ["Business Permits", "Health Services", "Documents", "Office Hours"],
      }
    } else if (lowerMessage.includes("contact") || lowerMessage === "contact info") {
      return {
        type: "bot",
        text: "📞 Contact Us:\n\n• Trunkline: (02) 8871-4360\n• Email:laspinascitygov@yahoo.com\n• Facebook: https://www.facebook.com/\ncityoflaspinasofficial/LPCGov\n• Website: www.laspinascity.gov.ph\n\nFor emergency services, dial 911.",
        quickReplies: ["Office Hours", "Visit Us", "Services", "Our Mission"],
      }
    } else if (
      lowerMessage.includes("hours") ||
      lowerMessage.includes("time") ||
      lowerMessage.includes("schedule") ||
      lowerMessage === "office hours"
    ) {
      return {
        type: "bot",
        text: "🕐 Office Hours:\n\nMonday to Friday\n8:00 AM - 5:00 PM\n\nSome offices like the Civil Registry may have extended hours. The Las Piñas City Hall is closed on weekends and national holidays.\n\nWould you like to know about a specific department?",
        quickReplies: ["Services", "Contact Info", "Visit Us"],
      }
    } else if (lowerMessage.includes("permit") || lowerMessage.includes("business")) {
      return {
        type: "bot",
        text: "📋 Business Permits:\n\nVisit the Business Permits and Licensing Office (BPLO) at Las Piñas City Hall. Requirements include:\n\n• Barangay Clearance\n• DTI/SEC Registration\n• Contract of Lease/Land Title\n• Fire Safety Inspection Certificate\n\nYou can also check our website for online application procedures.",
        quickReplies: ["Office Hours", "Contact Info", "Services", "Documents"],
      }
    } else if (
      lowerMessage.includes("document") ||
      lowerMessage.includes("certificate") ||
      lowerMessage === "documents"
    ) {
      return {
        type: "bot",
        text: "📄 Document Requests:\n\nFor documents like Cedula, Birth/Death/Marriage Certificates, please visit:\n\n• Civil Registry Office (City Hall)\n• Your local Barangay Hall for Barangay Clearance\n\nBring valid IDs and supporting documents.",
        quickReplies: ["Office Hours", "Contact Info", "Services", "Business Permits"],
      }
    } else if (
      lowerMessage.includes("health") ||
      lowerMessage.includes("medical") ||
      lowerMessage === "health services"
    ) {
      return {
        type: "bot",
        text: "🏥 Health Services:\n\nLas Piñas General Hospital and Satellite Clinic (LPGHSC) offers:\n\n• Out-patient Consultations\n• Emergency Services\n• Vaccinations\n• Maternal & Child Health\n• Laboratory Services\n• PhilHealth Enrollment\n\nCity Health Centers are also available in different barangays.",
        quickReplies: ["Office Hours", "Contact Info", "Services"],
      }
    } else if (lowerMessage.includes("barangay")) {
      return {
        type: "bot",
        text: "🏘️ Las Piñas City Barangays:\n\nLas Piñas has 20 barangays including:\n\n• Almanza Uno & Dos\n• BF International\n• CAA-BF International\n• Daniel Fajardo\n• Elias Aldana\n• Ilaya\n• Manuyo Uno & Dos\n• Pamplona Uno, Dos & Tres\n• Pulang Lupa Uno & Dos\n• Talon Uno & Dos, etc.\n\nEach barangay has its own hall for local services.",
        quickReplies: ["Services", "Contact Info", "Visit Us"],
      }
    } else if (lowerMessage.includes("thank") || lowerMessage.includes("salamat")) {
      return {
        type: "bot",
        text: "Walang anuman! 😊 Feel free to ask if you need any other assistance. Have a great day in Las Piñas City!",
        quickReplies: ["Our Mission", "Services", "Contact Info"],
      }
    } else {
      return {
        type: "bot",
        text: "Salamat for your message! For detailed information, please visit our website at www.laspinascity.gov.ph or contact us directly. You can also visit Las Piñas City Hall during office hours for personalized assistance.",
        quickReplies: ["Our Mission", "Services", "Contact Info", "Office Hours", "Bamboo Organ"],
      }
    }
  }

  return (
    <>
      {/* Floating Promo Message */}
      {showPromoMessage && !isChatOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl z-50 p-4 max-w-xs border-2 border-lp-green-500 animate-bounce-slow">
          <button
            onClick={() => setShowPromoMessage(false)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
            aria-label="Close message"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="bg-lp-green-100 p-2 rounded-full flex-shrink-0">
              <Bot className="w-6 h-6 text-lp-green-600" />
            </div>
            <div>
              <p className="font-bold text-lp-green-800 text-sm mb-1">Mabuhay! 💬</p>
              <p className="text-lp-green-600 text-xs">
                Chat with us now for quick assistance with Las Piñas City services!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-lp-green-700 to-lp-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Open Chatbot"
      >
        {isChatOpen ? <X className="w-7 h-7" /> : <Bot className="w-7 h-7 animate-pulse" />}
        <span className="absolute -top-1 -right-1 bg-lp-gold-500 text-lp-green-900 text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce font-bold">
          !
        </span>
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-lp-green-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-lp-green-700 to-lp-green-600 text-white p-4 flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <img src="/image.png" alt="Las Piñas City Seal" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Las Piñas City Assistant</h3>
              <p className="text-xs text-lp-green-100">Always here to serve you</p>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-lp-green-800 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-lp-green-50/50">
            {messages.map((message, index) => (
              <div key={index}>
                <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-lp-green-700 text-white rounded-br-none"
                        : "bg-white text-lp-green-800 shadow-sm rounded-bl-none border border-lp-green-100"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>

                {/* Quick Reply Buttons */}
                {message.type === "bot" && message.quickReplies && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-start">
                    {message.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="px-4 py-2 text-xs bg-white border-2 border-lp-green-500 text-lp-green-700 rounded-full hover:bg-lp-green-500 hover:text-white transition-colors duration-200 shadow-sm font-medium"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-lp-green-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-lp-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-lp-green-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-lp-green-700 text-white p-2 rounded-full hover:bg-lp-green-800 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .fixed.bottom-24.right-6.w-96 {
            width: calc(100vw - 2rem);
            right: 1rem;
            left: 1rem;
            bottom: 5rem;
            height: calc(100vh - 10rem);
            max-height: 550px;
          }
          .fixed.bottom-24.right-6.max-w-xs {
            right: 1rem;
            left: 1rem;
            max-width: calc(100vw - 2rem);
            bottom: 6rem;
          }
          .fixed.bottom-6.right-6 {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  )
}
