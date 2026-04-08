/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Shield, Clock, CreditCard, AlertCircle, CheckCircle,
  ArrowLeft, Calendar, RefreshCw, Banknote, FileText,
  HelpCircle, MessageCircle, Phone, Mail, Star, Award,
  AlertTriangle, ThumbsUp, XCircle, TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function RefundPolicy() {
  const [activeTab, setActiveTab] = useState("cancellation");

  const cancellationStages = [
    {
      id: 1,
      title: "Free Cancellation",
      time: "48+ hours before pickup",
      refund: "100% Refund",
      color: "from-green-500 to-emerald-600",
      icon: CheckCircle,
      description: "Full refund credited within 5-7 business days",
      features: ["No questions asked", "Instant cancellation", "No processing fee"]
    },
    {
      id: 2,
      title: "Partial Refund",
      time: "24-48 hours before pickup",
      refund: "50% Refund",
      color: "from-yellow-500 to-orange-500",
      icon: Clock,
      description: "50% of booking amount will be refunded",
      features: ["Cancellation fee applies", "Processing takes 7-10 days"]
    },
    {
      id: 3,
      title: "No Refund",
      time: "Less than 24 hours",
      refund: "0% Refund",
      color: "from-red-500 to-rose-600",
      icon: XCircle,
      description: "No refund for last minute cancellations",
      features: ["Can reschedule with fee", "Contact support for exceptions"]
    }
  ];

  const refundMethods = [
    {
      method: "Credit Card",
      time: "5-7 business days",
      icon: CreditCard,
      details: "Refund to original card"
    },
    {
      method: "Debit Card",
      time: "7-10 business days",
      icon: Banknote,
      details: "Depends on bank processing"
    },
    {
      method: "UPI / Wallet",
      time: "3-5 business days",
      icon: TrendingUp,
      details: "Instant to wallet if available"
    }
  ];

  const specialCases = [
    {
      title: "Vehicle Breakdown",
      policy: "Full refund + compensation",
      icon: AlertTriangle,
      color: "text-orange-600",
      bg: "bg-orange-50",
      description: "If vehicle breaks down within 1 hour of pickup"
    },
    {
      title: "Medical Emergency",
      policy: "100% refund with documents",
      icon: Shield,
      color: "text-blue-600",
      bg: "bg-blue-50",
      description: "Valid medical certificate required"
    },
    {
      title: "Flight Cancellation",
      policy: "Free rescheduling",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50",
      description: "Official flight cancellation proof needed"
    },
    {
      title: "Duplicate Booking",
      policy: "Full refund + 10% credit",
      icon: RefreshCw,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      description: "If system error causes duplicate booking"
    }
  ];

  const steps = [
    { step: 1, title: "Request Cancellation", description: "Go to My Bookings → Cancel Booking" },
    { step: 2, title: "Verify Eligibility", description: "System checks cancellation timeline" },
    { step: 3, title: "Confirm Refund Amount", description: "Review refund amount before confirming" },
    { step: 4, title: "Receive Confirmation", description: "Email & SMS confirmation sent" },
    { step: 5, title: "Wait for Processing", description: "Refund processed within timeline" }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200 -z-10" />
      
      {/* Animated Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5 hidden md:block">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-40" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-float-delay opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Back Button */}
        <Link href="/faqs" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to FAQs</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Refund & Cancellation</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 text-gray-900">
            Refund Policy
          </h1>
          
          <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
            Clear, transparent refund policy. Know your rights and refund eligibility.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-green-600">100%</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Refund</div>
            <div className="text-[10px] sm:text-xs text-gray-500">48+ hours prior</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600">50%</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Refund</div>
            <div className="text-[10px] sm:text-xs text-gray-500">24-48 hours prior</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">5-7</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Days</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Processing time</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Support</div>
            <div className="text-[10px] sm:text-xs text-gray-500">For queries</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          <button
            onClick={() => setActiveTab("cancellation")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 text-sm sm:text-base ${
              activeTab === "cancellation"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90"
            }`}
          >
            Cancellation Policy
          </button>
          <button
            onClick={() => setActiveTab("refund")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 text-sm sm:text-base ${
              activeTab === "refund"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90"
            }`}
          >
            Refund Process
          </button>
          <button
            onClick={() => setActiveTab("special")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 text-sm sm:text-base ${
              activeTab === "special"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90"
            }`}
          >
            Special Cases
          </button>
        </div>

        {/* Cancellation Policy Tab */}
        {activeTab === "cancellation" && (
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
              {cancellationStages.map((stage) => (
                <div
                  key={stage.id}
                  className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`bg-gradient-to-r ${stage.color} p-4 sm:p-6 text-white`}>
                    <stage.icon className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3" />
                    <h3 className="text-lg sm:text-xl font-bold">{stage.title}</h3>
                    <p className="text-xs sm:text-sm opacity-90 mt-1">{stage.time}</p>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">{stage.refund}</div>
                    <p className="text-sm text-gray-600 mb-3 sm:mb-4">{stage.description}</p>
                    <div className="space-y-1.5 sm:space-y-2">
                      {stage.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Important Notes:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                    <li>• No-shows are not eligible for any refund</li>
                    <li>• Early returns do not qualify for refund</li>
                    <li>• Peak season bookings may have different policies</li>
                    <li>• Refund timeline starts from cancellation confirmation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Refund Process Tab */}
        {activeTab === "refund" && (
          <div className="max-w-4xl mx-auto">
            {/* Steps */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">How to Get Refund?</h3>
              <div className="relative">
                <div className="hidden md:block absolute left-8 top-12 w-0.5 h-[calc(100%-5rem)] bg-gradient-to-b from-indigo-400 to-purple-400" />
                <div className="space-y-6 sm:space-y-8">
                  {steps.map((step, idx) => (
                    <div key={step.step} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 relative">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base sm:text-lg flex-shrink-0 shadow-lg z-10">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Refund Methods */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Refund Methods & Timeline</h3>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {refundMethods.map((method) => (
                <div key={method.method} className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 mb-3 sm:mb-4">
                    <method.icon className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">{method.method}</h4>
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">{method.time}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{method.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special Cases Tab */}
        {activeTab === "special" && (
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {specialCases.map((case_) => (
                <div
                  key={case_.title}
                  className={`${case_.bg} backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-opacity-20 hover:shadow-xl transition-all cursor-pointer group`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`${case_.color} flex-shrink-0`}>
                      <case_.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1">{case_.title}</h3>
                      <p className="text-sm font-semibold text-indigo-600 mb-2">{case_.policy}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{case_.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Documentation Required */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                Documentation Required for Special Cases
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-sm sm:text-base text-gray-700">Medical Certificate</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-sm sm:text-base text-gray-700">Flight Cancellation Proof</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-sm sm:text-base text-gray-700">Police Report (if applicable)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-sm sm:text-base text-gray-700">Booking Reference Number</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-indigo-100/90 to-purple-100/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Still have questions about refund?
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Our support team is available 24/7 to help you with refund queries
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all text-sm sm:text-base">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Live Chat
              </button>
              <button className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/90 backdrop-blur-sm text-indigo-700 rounded-lg sm:rounded-xl hover:shadow-lg transition-all border border-indigo-200 text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call Support
              </button>
              <button className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/90 backdrop-blur-sm text-indigo-700 rounded-lg sm:rounded-xl hover:shadow-lg transition-all border border-indigo-200 text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Email Us
              </button>
            </div>
            <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Average response time: 2 minutes</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out infinite reverse;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}