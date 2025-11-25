'use client'

import React, { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Bot, X, Send } from 'lucide-react'

interface Message {
  type: 'bot' | 'user'
  text: string
  quickReplies?: string[]
}

export default function Chatbot() {
  const pathname = usePathname()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showPromoMessage, setShowPromoMessage] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      text: 'Hi there! 👋 I\'m your Calapan City Assistant. How can I help you today?',
      quickReplies: ['Our Mission', 'Our Vision', 'Our Values', 'Contact Info', 'Office Hours', 'Services']
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Hide on dashboard, login, and register routes
  if (pathname?.startsWith('/dashboard') || pathname === '/login' || pathname === '/register') {
    return null
  }

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputMessage
    if (messageToSend.trim() === '') return

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: messageToSend }])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(messageToSend)
      setMessages(prev => [...prev, botResponse])
    }, 800)

    setInputMessage('')
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const getBotResponse = (message: string): Message => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('mission') || lowerMessage === 'our mission') {
      return {
        type: 'bot',
        text: '🎯 Our Mission:\n\nDeliver efficient and transparent government services to every citizen.\n\nWe are committed to providing accessible, reliable, and high-quality services that meet the needs of all Calapan City residents.',
        quickReplies: ['Our Vision', 'Our Values', 'Contact Info', 'Services']
      }
    } else if (lowerMessage.includes('vision') || lowerMessage === 'our vision') {
      return {
        type: 'bot',
        text: '🌟 Our Vision:\n\nA smart city where technology and community values work together.\n\nWe envision Calapan City as a model of modern governance, where innovation enhances the quality of life for all residents while preserving our cultural heritage and community spirit.',
        quickReplies: ['Our Mission', 'Our Values', 'Contact Info', 'Services']
      }
    } else if (lowerMessage.includes('values') || lowerMessage === 'our values') {
      return {
        type: 'bot',
        text: '💎 Our Values:\n\n• Integrity - We uphold the highest ethical standards\n• Transparency - We operate openly and honestly\n• Citizen-Centric - Your needs are our priority\n\nThe Calapan City Government is dedicated to delivering world-class services with the highest standards of integrity and transparency. We strive to foster sustainable community development by embracing innovation, leveraging modern technology, and actively engaging our citizens in decision-making processes.',
        quickReplies: ['Our Mission', 'Our Vision', 'Visit Us', 'Contact Info']
      }
    } else if (lowerMessage.includes('visit') || lowerMessage === 'visit us') {
      return {
        type: 'bot',
        text: '📍 Visit Us:\n\nCalapan City Hall\nCalapan City, Oriental Mindoro\nPostal Code: 5200\nPhilippines\n\nThrough collaborative initiatives and responsive governance, we aim to create a safe, inclusive, and thriving city where every resident has the opportunity to contribute to and benefit from the growth and progress of Calapan.',
        quickReplies: ['Office Hours', 'Contact Info', 'Services', 'Our Mission']
      }
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('kumusta')) {
      return {
        type: 'bot',
        text: 'Hello! 👋 How can I help you with Calapan City services today?',
        quickReplies: ['Our Mission', 'Our Vision', 'Services', 'Contact Info', 'Office Hours']
      }
    } else if (lowerMessage.includes('service') || lowerMessage.includes('services')) {
      return {
        type: 'bot',
        text: '🏛️ We offer various services including:\n\n• Business Permits & Licensing\n• Community Certificates (Cedula)\n• Health Services & Vaccinations\n• Building Permits\n• Document Requests\n• Civil Registration\n• Real Property Tax\n\nWhat specific service are you looking for?',
        quickReplies: ['Business Permits', 'Health Services', 'Documents', 'Office Hours']
      }
    } else if (lowerMessage.includes('contact') || lowerMessage === 'contact info') {
      return {
        type: 'bot',
        text: '📞 Contact Us:\n\n• Facebook: facebook.com/Calapan2031\n• Email: info@calapancity.gov.ph\n• Visit: Calapan City Hall, Oriental Mindoro\n\nFeel free to reach out through any of these channels!',
        quickReplies: ['Office Hours', 'Visit Us', 'Services', 'Our Mission']
      }
    } else if (lowerMessage.includes('hours') || lowerMessage.includes('time') || lowerMessage.includes('schedule') || lowerMessage === 'office hours') {
      return {
        type: 'bot',
        text: '🕐 Office Hours:\n\nMonday to Friday\n8:00 AM - 5:00 PM\n\n(Some services may have different schedules)\n\nWould you like to know about a specific department?',
        quickReplies: ['Services', 'Contact Info', 'Visit Us']
      }
    } else if (lowerMessage.includes('permit') || lowerMessage.includes('business')) {
      return {
        type: 'bot',
        text: '📋 Business Permits:\n\nVisit the Business Permits and Licensing Office (BPLO) at City Hall. You can also check our website for requirements and online application procedures.\n\nNeed help with anything else?',
        quickReplies: ['Office Hours', 'Contact Info', 'Services', 'Documents']
      }
    } else if (lowerMessage.includes('document') || lowerMessage.includes('certificate') || lowerMessage === 'documents') {
      return {
        type: 'bot',
        text: '📄 Document Requests:\n\nFor documents like Cedula, Barangay Clearance, or other certificates, please visit your local Barangay Hall or the City Hall Records Section during office hours.\n\nWhat else can I help you with?',
        quickReplies: ['Office Hours', 'Contact Info', 'Services', 'Business Permits']
      }
    } else if (lowerMessage.includes('health') || lowerMessage.includes('medical') || lowerMessage === 'health services') {
      return {
        type: 'bot',
        text: '🏥 Health Services:\n\nAvailable at the City Health Office and various health centers. Services include:\n• Vaccinations\n• Medical Consultations\n• Maternal & Child Health\n• Disease Prevention Programs\n\nVisit during clinic hours for assistance.',
        quickReplies: ['Office Hours', 'Contact Info', 'Services']
      }
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return {
        type: 'bot',
        text: '💳 Payments:\n\nPayments can be made at the City Treasurer\'s Office. Some services also accept online payments.\n\nWhat type of payment are you inquiring about?',
        quickReplies: ['Office Hours', 'Contact Info', 'Services']
      }
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('salamat')) {
      return {
        type: 'bot',
        text: 'You\'re welcome! 😊 Feel free to ask if you need any other assistance. Have a great day!',
        quickReplies: ['Our Mission', 'Services', 'Contact Info']
      }
    } else {
      return {
        type: 'bot',
        text: 'Thank you for your message. For detailed information, please visit our website or contact us directly through our social media channels. You can also visit City Hall during office hours for personalized assistance.',
        quickReplies: ['Our Mission', 'Services', 'Contact Info', 'Office Hours']
      }
    }
  }

  return (
    <>
      {/* Floating Promo Message */}
      {showPromoMessage && !isChatOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl z-50 p-4 max-w-xs border-2 border-orange-500 animate-bounce-slow">
          <button
            onClick={() => setShowPromoMessage(false)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
            aria-label="Close message"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
              <Bot className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm mb-1">We're Live! 💬</p>
              <p className="text-gray-600 text-xs">
                Chat with us now for quick assistance with city services!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Open Chatbot"
      >
        {isChatOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <Bot className="w-7 h-7 animate-pulse" />
        )}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
          !
        </span>
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <Bot className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Calapan City Assistant</h3>
              <p className="text-xs text-orange-100">Always here to help</p>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-orange-700 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-orange-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
                
                {/* Quick Reply Buttons */}
                {message.type === 'bot' && message.quickReplies && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-start">
                    {message.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="px-4 py-2 text-xs bg-white border-2 border-orange-500 text-orange-600 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-200 shadow-sm"
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
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors"
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