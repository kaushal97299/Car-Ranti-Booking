'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Shield, CreditCard, Users, MapPin, FileText, Mail, 
  Lock, Eye, Server, CheckCircle, Award, Clock, Headphones, 
  ChevronRight, Phone, Globe, HeartHandshake, Fingerprint,
  Database, Key, ShieldCheck, BadgeCheck
} from 'lucide-react';
import Image from 'next/image';

// --- 3D Car Model Component ---
const AnimatedCar = () => {
  const carRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    if (carRef.current) {
      carRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
      carRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.8) * 0.05;
      carRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.03;
    }
    wheelRefs.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += 0.05;
    });
  });

  return (
    <group ref={carRef} position={[0, -0.5, 0]} scale={0.8}>
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[1.2, 0.4, 2.2]} />
        <meshStandardMaterial color="#6366f1" roughness={0.15} metalness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 0.5, -0.2]}>
        <boxGeometry args={[0.9, 0.3, 1.4]} />
        <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.65, -0.4]}>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#818cf8" metalness={0.95} roughness={0.05} />
      </mesh>
      {[
        [-0.7, -0.1, -0.8], [0.7, -0.1, -0.8],
        [-0.7, -0.1, 0.7], [0.7, -0.1, 0.7]
      ].map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { wheelRefs.current[i] = el; }}
          castShadow
          position={[pos[0], pos[1], pos[2]]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0.6, 0.2, 1.1]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#fef9c3" emissive="#fde047" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.6, 0.2, 1.1]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#fef9c3" emissive="#fde047" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
};

// --- Particle positions computed once at module level (outside component) ---
const PARTICLE_COUNT = 1500;
const particlePositions = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 40;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
  }
  return arr;
})();

// --- Floating Particles Background ---
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} count={PARTICLE_COUNT} array={particlePositions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#a78bfa" size={0.06} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </points>
  );
};

// --- Main 3D Scene Component (Pure Background) ---
const ThreeScene = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [5, 3, 8], fov: 45 }} 
        shadows
        style={{ pointerEvents: 'none' }}
      >
        <color attach="background" args={['#e0e7ff']} />
        <fog attach="fog" args={['#e0e7ff', 15, 30]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
        <pointLight position={[-3, 2, 4]} intensity={0.8} color="#c084fc" />
        <pointLight position={[3, 1, -2]} intensity={0.6} color="#f0abfc" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <AnimatedCar />
        </Float>
        
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} color="#000" transparent />
        </mesh>
        
        <ParticleField />
        <Sparkles count={200} scale={15} size={0.5} speed={0.3} color="#a855f7" />
        <Stars radius={80} depth={40} count={1500} factor={3} saturation={0.5} fade speed={0.5} />
        <Environment preset="dawn" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.4} 
          target={[0, 0.5, 0]} 
        />
      </Canvas>
    </div>
  );
};

// --- Privacy Policy Content Component ---
const PrivacyContent = () => {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information We Collect",
      content: "Personal details, contact information, driver's license, payment data, and rental history for seamless service."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payment Security",
      content: "256-bit SSL encryption, PCI-DSS compliance, and secure payment processing with industry-leading partners."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Protection",
      content: "Advanced encryption protocols, regular security audits, and strict access controls for your data."
    },
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: "Biometric Security",
      content: "Optional biometric authentication for enhanced security and faster verification processes."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location Services",
      content: "GPS tracking during rentals for safety, with full transparency and control over your location data."
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Your Rights",
      content: "Full GDPR & CCPA compliance. Access, modify, or delete your data anytime with one-click requests."
    }
  ];

  const stats = [
    { value: "99.99%", label: "Uptime Guarantee", icon: ShieldCheck, color: "from-indigo-500 to-purple-500" },
    { value: "24/7", label: "Premium Support", icon: Headphones, color: "from-purple-500 to-pink-500" },
    { value: "10K+", label: "Active Users", icon: Users, color: "from-pink-500 to-rose-500" },
    { value: "15+", label: "Years Trusted", icon: Award, color: "from-rose-500 to-orange-500" }
  ];

  const certifications = [
    { name: "GDPR Compliant", icon: ShieldCheck, color: "text-indigo-600" },
    { name: "PCI DSS Certified", icon: BadgeCheck, color: "text-purple-600" },
    { name: "ISO 27001", icon: Lock, color: "text-pink-600" },
    { name: "SSL Encrypted", icon: Key, color: "text-rose-600" }
  ];

  return (
    <div className="relative z-10 min-h-screen  ">
      {/* Gradient Background */}
      
      {/* Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72  rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content - No extra margin, will work with existing sidebar */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-6">
              <Shield className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Privacy First • Security Focused</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your trust is our foundation. Were committed to protecting your privacy with 
              enterprise-grade security and complete transparency.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-gray-600">Updated: March 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full">
                <Globe className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-gray-600">Global Compliance</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="group bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${stat.color} p-2.5 shadow-lg`}>
                  <stat.icon className="w-full h-full text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Introduction Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/50 shadow-xl mb-12 sm:mb-16">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex-shrink-0">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Our Commitment to Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  At CarRentals, we believe in complete transparency. This Privacy Policy explains how we collect, 
                  use, and safeguard your information. Were dedicated to protecting your data with the highest 
                  industry standards.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/50 rounded-full">
                      <cert.icon className={`w-4 h-4 ${cert.color}`} />
                      <span className="text-xs text-gray-700">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Policy Sections Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {sections.map((section, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all">
                    <div className="text-indigo-600">
                      {section.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Trust & Security Section */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-12 border border-white/50 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Your Data Security is Our Priority</h3>
                <p className="text-gray-600 mb-4">
                  We employ enterprise-grade security measures including AES-256 encryption, multi-factor authentication, 
                  and continuous monitoring to protect your information from unauthorized access.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">AES-256 Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">2FA Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Real-time Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Privacy Support Team</h4>
                  <p className="text-indigo-100 text-sm">Available 24/7 for privacy concerns</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                  Contact Us
                </button>
                <button className="px-6 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Data Request
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 sm:pt-8 border-t border-indigo-200">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition text-sm">Cookie Policy</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition text-sm">Data Requests</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition text-sm">Accessibility</a>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">
              © {new Date().getFullYear()} CarRentals. All rights reserved. | Secured with ❤️
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

// --- Main Page Component ---
export default function PrivacyPolicyPage() {
  return (
    <>
      <ThreeScene />
      <PrivacyContent />
    </>
  );
}