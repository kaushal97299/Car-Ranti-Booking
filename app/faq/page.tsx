/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { 
  Search, ChevronDown, ChevronUp, HelpCircle, 
  Phone, Mail, MessageCircle, Clock, Shield, 
  CreditCard, Car, FileText, Users, MapPin,
  AlertCircle, CheckCircle, Star, Headphones
} from "lucide-react";
import Link from "next/link";

export default function FAQs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // FAQ Categories
  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "booking", name: "Booking", icon: Calendar },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "vehicle", name: "Vehicle", icon: Car },
    { id: "insurance", name: "Insurance", icon: Shield },
    { id: "return", name: "Return", icon: MapPin }
  ];

  // FAQs Data
  const faqs = [
    {
      id: 1,
      category: "booking",
      question: "How do I book a car?",
      answer: "You can book a car through our website or mobile app. Simply select your pickup location, dates, choose a car, make payment, and you're done! The entire process takes less than 5 minutes.",
      popular: true
    },
    {
      id: 2,
      category: "booking",
      question: "What documents do I need to rent a car?",
      answer: "You need a valid driver's license (International Driving Permit if required), a credit card in your name, and a government-issued ID (Passport/Driver's License).",
      popular: true
    },
    {
      id: 3,
      category: "booking",
      question: "Can I modify or cancel my booking?",
      answer: "Yes, you can modify or cancel your booking online. Free cancellation is available up to 48 hours before pickup. Modifications are subject to availability.",
      popular: false
    },
    {
      id: 4,
      category: "booking",
      question: "What is the minimum age to rent a car?",
      answer: "The minimum age to rent a car is 21 years. Drivers under 25 may incur a young driver surcharge. Some luxury vehicles require minimum age of 25.",
      popular: true
    },
    {
      id: 5,
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, UPI, Net Banking, and digital wallets. Cash payments are not accepted.",
      popular: true
    },
    {
      id: 6,
      category: "payment",
      question: "Is there a security deposit?",
      answer: "Yes, a security deposit of $200-$500 is required depending on the car category. The deposit is refunded within 7-14 business days after return, subject to no damages.",
      popular: false
    },
    {
      id: 7,
      category: "payment",
      question: "Are there any hidden charges?",
      answer: "No, we believe in transparent pricing. All charges including taxes, fees, and insurance are shown before you confirm your booking.",
      popular: true
    },
    {
      id: 8,
      category: "payment",
      question: "What is your cancellation policy?",
      answer: "Free cancellation up to 48 hours before pickup. 50% refund between 24-48 hours. No refund for cancellations within 24 hours or no-shows.",
      popular: true
    },
    {
      id: 9,
      category: "vehicle",
      question: "What types of cars are available?",
      answer: "We offer Economy, Compact, Midsize, Full-size, SUVs, Luxury cars, and Vans. All cars are less than 2 years old and well-maintained.",
      popular: true
    },
    {
      id: 10,
      category: "vehicle",
      question: "Can I choose a specific car model?",
      answer: "You can select a car category. Specific model availability depends on current inventory at your pickup location.",
      popular: false
    },
    {
      id: 11,
      category: "vehicle",
      question: "Is there a mileage limit?",
      answer: "Most rentals include unlimited mileage. Some luxury cars may have mileage limits - this will be clearly mentioned during booking.",
      popular: false
    },
    {
      id: 12,
      category: "vehicle",
      question: "Can I add extra equipment?",
      answer: "Yes, you can add GPS navigation, child seats, ski racks, and roof boxes for an additional fee.",
      popular: false
    },
    {
      id: 13,
      category: "insurance",
      question: "What insurance is included?",
      answer: "Basic insurance including Collision Damage Waiver (CDW) and Theft Protection is included. Excess/deductible applies.",
      popular: true
    },
    {
      id: 14,
      category: "insurance",
      question: "Can I buy additional coverage?",
      answer: "Yes, you can purchase Full Coverage Insurance that reduces the excess/deductible to zero. Available during booking.",
      popular: true
    },
    {
      id: 15,
      category: "insurance",
      question: "What is not covered by insurance?",
      answer: "Tires, windshield, undercarriage, interior damage, and driving under influence are not covered. Read terms carefully.",
      popular: false
    },
    {
      id: 16,
      category: "return",
      question: "What is the fuel policy?",
      answer: "We follow full-to-full policy. You receive the car with a full tank and must return it full. Otherwise, refueling charges apply.",
      popular: true
    },
    {
      id: 17,
      category: "return",
      question: "Can I return the car to a different location?",
      answer: "Yes, one-way rentals are available for an additional fee. Fee varies based on distance and location.",
      popular: false
    },
    {
      id: 18,
      category: "return",
      question: "What happens if I return the car late?",
      answer: "A grace period of 30 minutes is provided. After that, late fees of $15 per hour apply, up to a full day's rental.",
      popular: false
    },
    {
      id: 19,
      category: "return",
      question: "What if I damage the car?",
      answer: "Report immediately. Insurance excess/deductible applies. You can purchase additional coverage to reduce excess.",
      popular: true
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFaqs = faqs.filter(faq => faq.popular);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a] text-white">
      {/* Background Gradient - Fixed properly */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020b0a] via-[#041f1e] to-[#020b0a]" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-40" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-delay opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-medium text-gray-300">Got Questions? Weve Got Answers</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about booking, payments, vehicles, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all text-white placeholder-gray-400 shadow-lg"
            />
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg"
                  : "bg-white/10 border border-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 shadow-md"
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-400 bg-white/10 border border-white/10 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
            Found {filteredFaqs.length} {filteredFaqs.length === 1 ? "question" : "questions"}
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={faq.id}
              className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3 pr-4">
                  <div className="mt-1">
                    {openIndex === idx ? (
                      <ChevronUp className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-white font-semibold text-lg">
                    {faq.question}
                  </span>
                </div>
                {faq.popular && (
                  <span className="flex items-center gap-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full shadow-md">
                    <Star className="w-3 h-3 fill-white" />
                    Popular
                  </span>
                )}
              </button>
              
              {openIndex === idx && (
                <div className="px-6 pb-4 pt-2 border-t border-white/10">
                  <p className="text-gray-400 leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No questions found</h3>
              <p className="text-gray-400">Try different keywords or contact our support team</p>
            </div>
          )}
        </div>

        {/* Popular Questions Section */}
        {searchTerm === "" && activeCategory === "all" && (
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              🔥 Most Popular Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularFaqs.slice(0, 6).map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:shadow-lg transition-all cursor-pointer group hover:bg-white/20"
                  onClick={() => {
                    const filteredIndex = filteredFaqs.findIndex(f => f.id === faq.id);
                    if (filteredIndex !== -1) toggleAccordion(filteredIndex);
                  }}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 group-hover:text-cyan-300 transition font-medium">
                      {faq.question}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Still Have Questions? */}
        <div className="max-w-4xl mx-auto mt-16 mb-12">
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Cant find the answer youre looking for? Please contact our support team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105">
                <Headphones className="w-5 h-5" />
                Live Chat
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/10 backdrop-blur-sm text-emerald-300 rounded-xl hover:shadow-lg transition-all hover:scale-105 border border-white/10">
                <Mail className="w-5 h-5" />
                Email Support
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/10 backdrop-blur-sm text-emerald-300 rounded-xl hover:shadow-lg transition-all hover:scale-105 border border-white/10">
                <Phone className="w-5 h-5" />
                Call Us
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
              <div className="w-px h-4 bg-emerald-400/30" />
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>Avg response: 2 min</span>
              </div>
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

// Calendar icon component
function Calendar(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}