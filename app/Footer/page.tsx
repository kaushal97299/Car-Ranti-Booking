"use client";

import { useRouter, usePathname } from "next/navigation";
import { 
  Facebook, Twitter, Instagram, Linkedin, Youtube, Github, 
  Mail, Phone, Sparkles, Heart, ArrowUp, 
  Shield, Headphones, ChevronRight, 
  Gift, Star, Truck, Globe, MessageCircle
} from "lucide-react";
import { useState, useEffect } from "react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isHoveredSocial, setIsHoveredSocial] = useState<number | null>(null);

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/auth");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Premium function for newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setSubmitMessage("❌ Please enter your email address");
      setTimeout(() => setSubmitMessage(""), 3000);
      return;
    }
    
    if (!email.includes("@") || !email.includes(".")) {
      setSubmitMessage("❌ Please enter a valid email address");
      setTimeout(() => setSubmitMessage(""), 3000);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitMessage("✅ Thank you! Check your inbox for exclusive offers 🎉");
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }, 1000);
  };

  // Premium function for social share with tracking
  const handleSocialClick = (platform: string, url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    console.log(`📱 Shared on ${platform} at ${new Date().toLocaleTimeString()}`);
    
    // You can add analytics tracking here
    // analytics.track('Social Click', { platform, location: 'footer' });
  };

  // Smooth scroll to top with animation
  const scrollToTop = () => {
    const start = window.pageYOffset;
    const startTime = performance.now();
    const duration = 800;
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - easeProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  };

  // Premium function for quick navigation with analytics
  const handleNavigation = (path: string, linkName: string) => {
    setActiveLink(linkName);
    router.push(path);
    console.log(`🔗 Navigated to: ${linkName}`);
    setTimeout(() => setActiveLink(null), 500);
  };

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Stats counter animation (premium feature)
  const stats = [
    { value: "50K+", label: "Happy Customers", icon: Star },
    { value: "200+", label: "Luxury Cars", icon: Truck },
    { value: "24/7", label: "Support", icon: Headphones },
    { value: "100%", label: "Secure", icon: Shield }
  ];

  if (isAuthPage) return null;

  return (
    <footer className="w-full mt-20 relative overflow-hidden">
      
      {/* Premium Animated Gradient Background */}
      <div className="absolute inset-0 bg-[#020b0a]" />
      <div className="absolute inset-0 bg-transparent" />
      
      {/* Animated Background Orbs with Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-40" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-float-delay opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow opacity-30" />
        <div className="absolute top-20 left-1/3 w-32 h-32 bg-cyan-400 rounded-full filter blur-2xl animate-pulse-slow opacity-20" />
        <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-teal-400 rounded-full filter blur-2xl animate-pulse-slower opacity-20" />
      </div>

      {/* Scroll to Top Button with Progress Ring */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      <div className="relative z-10">
        
        {/* Premium Stats Bar */}
        <div className="border-b border-white/10 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center justify-center gap-3 group cursor-pointer">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full shadow-lg group-hover:scale-110 transition-all duration-300 animate-pulse-light">
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-white text-lg font-bold">{stat.value}</p>
                    <p className="text-gray-400 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Brand Column with Greeting */}
            <div className="space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-light">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    CarBooking
                  </h2>
                  <p className="text-xs text-emerald-300">{getGreeting()}! 👋</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed text-center sm:text-left">
                Experience luxury and comfort with our premium car rental service. Your journey, our responsibility.
              </p>
              
              {/* Premium Trust Badges */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-white/10 border border-white/10 backdrop-blur-sm rounded-full">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                  <span className="text-xs text-gray-400">50K+ Happy</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-white/10 border border-white/10 backdrop-blur-sm rounded-full">
                  <Shield className="w-3 h-3 text-emerald-300" />
                  <span className="text-xs text-gray-400">100% Secure</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-white/10 border border-white/10 backdrop-blur-sm rounded-full">
                  <Globe className="w-3 h-3 text-purple-600" />
                  <span className="text-xs text-gray-400">Global Service</span>
                </div>
              </div>
            </div>

            {/* Quick Links - Company */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold mb-5 text-lg relative inline-block sm:inline-block group">
                Company
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full group-hover:w-full transition-all duration-300"></div>
              </h3>
              <ul className="space-y-3 mt-6">
                {[
                  { name: "About Us", path: "/about", icon: ChevronRight },
                  { name: "Blog", path: "/blog", icon: ChevronRight },
                  { name: "Contact", path: "/contact", icon: ChevronRight },
                  { name: "FAQs", path: "/faq", icon: ChevronRight }
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleNavigation(item.path, item.name)}
                      className={`group flex items-center justify-center sm:justify-start gap-1 text-gray-400 hover:text-emerald-300 bg-white/10 border border-white/10 transition transition-all duration-300 ${
                        activeLink === item.name ? 'translate-x-2 text-emerald-300' : ''
                      }`}
                    >
                      <item.icon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold mb-5 text-lg relative inline-block sm:inline-block group">
                Support
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full group-hover:w-full transition-all duration-300"></div>
              </h3>
              <ul className="space-y-3 mt-6">
                {[
                  { name: "Help Center", path: "/help" },
                  { name: "Terms & Conditions", path: "/terms" },
                  { name: "Privacy Policy", path: "/privacy" },
                  { name: "Refund Policy", path: "/refund" }
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleNavigation(item.path, item.name)}
                      className={`text-gray-400 hover:text-emerald-300 bg-white/10 border border-white/10 transition transition-all duration-300 hover:translate-x-1 ${
                        activeLink === item.name ? 'translate-x-1 text-emerald-300' : ''
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social with Premium Animation */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold mb-5 text-lg relative inline-block sm:inline-block group">
                Connect
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full group-hover:w-full transition-all duration-300"></div>
              </h3>
              
             <div className="space-y-3 mt-6">

  {/* PHONE */}
  <a
    href="tel:+918929935892"
    className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 text-sm group cursor-pointer"
  >
    <div className="p-1 bg-white/10 border border-white/10 rounded-full group-hover:bg-indigo-200 transition-colors">
      <Phone className="w-4 h-4 text-emerald-300" />
    </div>

    <span className="group-hover:text-white transition">
      +91 8929935892
    </span>
  </a>


  {/* EMAIL */}
  <a
    href="mailto:kaushalsharma97299@gmail.com"
    className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 text-sm group cursor-pointer"
  >
    <div className="p-1 bg-white/10 border border-white/10 rounded-full group-hover:bg-indigo-200 transition-colors">
      <Mail className="w-4 h-4 text-emerald-300" />
    </div>

    <span className="group-hover:text-white transition">
      kaushalsharma97299@gmail.com
    </span>
  </a>


  {/* LIVE CHAT */}
  <div
    onClick={() => router.push("/supportmessages")}
    className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 text-sm group cursor-pointer"
  >
    <div className="p-1 bg-white/10 border border-white/10 rounded-full group-hover:bg-indigo-200 transition-colors">
      <MessageCircle className="w-4 h-4 text-emerald-300" />
    </div>

    <span className="group-hover:text-white transition">
      Live Chat 24/7
    </span>
  </div>

</div>

              {/* Premium Social Icons with Hover Effects */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-6">
                {[
                  { icon: Facebook, name: "Facebook", url: "https://www.facebook.com/share/1CYiX7fZfj/", color: "hover:bg-blue-600", bg: "from-blue-500 to-blue-700" },
                  { icon: Twitter, name: "Twitter", url: "https://twitter.com", color: "hover:bg-sky-500", bg: "from-sky-500 to-sky-700" },
                  { icon: Instagram, name: "Instagram", url: "https://www.instagram.com/kaushalgauttam?igsh=MXF1Zzk5cXhuY2pjZg==", color: "hover:bg-pink-600", bg: "from-pink-500 to-pink-700" },
                  { icon: Linkedin, name: "LinkedIn", url: "https://www.linkedin.com/in/kaushal-gauttam-839963275", color: "hover:bg-blue-700", bg: "from-blue-600 to-blue-800" },
                  { icon: Youtube, name: "YouTube", url: "https://youtube.com/@kaushalsharma7400?si=SoHY8e4vGdktMShu", color: "hover:bg-red-600", bg: "from-red-500 to-red-700" },
                  { icon: Github, name: "GitHub", url: "https://github.com/kaushal97299", color: "hover:bg-gray-800", bg: "from-gray-700 to-gray-900" }
                ].map((social, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSocialClick(social.name, social.url)}
                    onMouseEnter={() => setIsHoveredSocial(idx)}
                    onMouseLeave={() => setIsHoveredSocial(null)}
                    className={`w-10 h-10 bg-white/10 border border-white/10 backdrop-blur-sm rounded-full flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-xl  ${
                      isHoveredSocial === idx ? 'scale-110 shadow-xl' : ''
                    }`}
                  >
                    <social.icon className={`w-4 h-4 text-emerald-300 transition-all duration-300 ${
                      isHoveredSocial === idx ? 'text-white scale-110' : ''
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Newsletter Section with Animation */}
        <div className="border-y border-white/10 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Gift className="w-5 h-5 text-emerald-300 animate-bounce" />
                  <h4 className="text-white font-bold text-lg">Exclusive Offers</h4>
                </div>
                <p className="text-gray-400 text-sm mt-1">Get 20% off on first booking + weekly deals</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-white/10 border border-white/10 backdrop-blur-sm rounded-lg text-sm  focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 w-full sm:w-80 transition-all"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg text-sm font-semibold hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>⏳ Subscribing...</>
                  ) : (
                    <>Subscribe ✨</>
                  )}
                </button>
              </form>
            </div>
            {submitMessage && (
              <div className="text-center mt-3 text-sm animate-slideDown">
                <p className={submitMessage.includes("✅") ? "text-emerald-300" : "text-red-400"}>
                  {submitMessage}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Premium Copyright Bar with Dynamic Content */}
        <div className="bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <p className="text-gray-400 flex items-center gap-1">
                © {currentYear} CarBooking. All rights reserved. 
                <span className="hidden sm:inline">|</span>
                <span className="text-emerald-300">v3.0.0</span>
              </p>
              <div className="flex gap-6">
                <button className="text-gray-400 hover:text-emerald-300 bg-white/10 border border-white/10 transition transition flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Security
                </button>
                <button className="text-gray-400 hover:text-emerald-300 bg-white/10 border border-white/10 transition transition flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Sitemap
                </button>
                <button className="text-gray-400 hover:text-emerald-300 bg-white/10 border border-white/10 transition transition">Accessibility</button>
              </div>
              <p className="text-gray-500 flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> for luxury travel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
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
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-light {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        .animate-pulse-light {
          animation: pulse-light 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-light 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-light 6s ease-in-out infinite;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
}