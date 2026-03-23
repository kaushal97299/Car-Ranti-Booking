"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three" ;
import {
  Shield,
  UserCheck,
  CreditCard,
  CalendarX,
  Lock,
  Scale,
  RefreshCw,
  Mail,
  ArrowRight,
  Car,
  Gavel,
  Phone,
  MapPin,
  CheckCircle,
  Globe,
  Calendar,
} from "lucide-react";

export default function TermsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const headerY = useTransform(smoothProgress, [0, 1], [0, -80]);
  const opacityHero = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Car Rental Themed 3D Animation
  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      camera.position.set(0, 3, 14);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();

      // Create a Car-like shape using box geometries
      const carGroup = new THREE.Group();
      
      // Car body
      const bodyGeo = new THREE.BoxGeometry(1.8, 0.4, 1);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, metalness: 0.8, roughness: 0.2 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0;
      carGroup.add(body);
      
      // Car roof
      const roofGeo = new THREE.BoxGeometry(1.2, 0.3, 0.9);
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.7, roughness: 0.3 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 0.35;
      carGroup.add(roof);
      
      // Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 24);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.5, roughness: 0.5 });
      
      const wheelPositions = [[-0.7, -0.2, -0.5], [0.7, -0.2, -0.5], [-0.7, -0.2, 0.5], [0.7, -0.2, 0.5]];
      wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos[0], pos[1], pos[2]);
        carGroup.add(wheel);
      });
      
      // Car lights
      const lightMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.5 });
      const frontLight = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), lightMat);
      frontLight.position.set(0.95, 0.1, -0.55);
      carGroup.add(frontLight);
      
      const backLightMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.3 });
      const backLightCar = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), backLightMat);
      backLightCar.position.set(-0.95, 0.1, -0.55);
      carGroup.add(backLightCar);
      
      group.add(carGroup);
      
      // Create floating road rings
      const ringGeo = new THREE.TorusGeometry(2.2, 0.05, 64, 200);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xa78bfa, metalness: 0.6, roughness: 0.4 });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.rotation.x = Math.PI / 2;
      ring1.position.y = -0.5;
      group.add(ring1);
      
      const ring2 = new THREE.Mesh(ringGeo, ringMat);
      ring2.rotation.z = Math.PI / 3;
      ring2.rotation.x = Math.PI / 3;
      ring2.position.y = -0.2;
      group.add(ring2);
      
      // Floating car icons (small cubes representing cars)
      const carIcons: THREE.Group[] = [];
      for (let i = 0; i < 12; i++) {
        const smallCarGroup = new THREE.Group();
        const smallBody = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.25), new THREE.MeshStandardMaterial({ color: 0xec489a, metalness: 0.7 }));
        smallBody.position.y = 0;
        smallCarGroup.add(smallBody);
        const smallRoof = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.22), new THREE.MeshStandardMaterial({ color: 0xf472b6 }));
        smallRoof.position.y = 0.1;
        smallCarGroup.add(smallRoof);
        
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3.5;
        smallCarGroup.position.x = Math.cos(angle) * radius;
        smallCarGroup.position.z = Math.sin(angle) * radius;
        smallCarGroup.position.y = Math.sin(angle * 2) * 0.8;
        group.add(smallCarGroup);
        carIcons.push(smallCarGroup);
      }
      
      // Floating particles (like dust/road particles)
      const particleCount = 2000;
      const particlesGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 25;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      }
      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xc084fc,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
      scene.add(particleSystem);
      
      scene.add(group);
      
      // Add some floating arrows (direction indicators)
      const arrowGroup = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const arrowCone = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
        const arrowBase = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
        arrowBase.add(arrowCone);
        arrowCone.position.y = 0.15;
        arrowBase.position.y = 0;
        const angle = (i / 8) * Math.PI * 2;
        arrowBase.position.x = Math.cos(angle) * 2.8;
        arrowBase.position.z = Math.sin(angle) * 2.8;
        arrowBase.rotation.y = angle;
        arrowGroup.add(arrowBase);
      }
      scene.add(arrowGroup);
      
      // Lights
      const ambientLight = new THREE.AmbientLight(0x404060);
      scene.add(ambientLight);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(2, 5, 3);
      scene.add(dirLight);
      const backLight = new THREE.PointLight(0xa78bfa, 0.6);
      backLight.position.set(-2, 2, -4);
      scene.add(backLight);
      const fillLight = new THREE.PointLight(0x8b5cf6, 0.4);
      fillLight.position.set(1, 3, 2);
      scene.add(fillLight);
      const movingCarLight = new THREE.PointLight(0xf59e0b, 0.5);
      movingCarLight.position.set(1, 1, 2);
      scene.add(movingCarLight);
      
      let time = 0;
      let animationFrameId: number;
      
      const animate = () => {
        time += 0.01;
        
        // Animate main car
        carGroup.rotation.y = Math.sin(time * 0.5) * 0.3;
        carGroup.position.x = Math.sin(time * 0.4) * 0.3;
        carGroup.position.z = Math.cos(time * 0.6) * 0.2;
        
        // Animate rings
        ring1.rotation.z = time * 0.3;
        ring2.rotation.x = time * 0.2;
        ring2.rotation.y = time * 0.4;
        
        // Animate floating car icons
        carIcons.forEach((car, idx) => {
          const speed = 0.5 + idx * 0.1;
          car.position.y = Math.sin(time * speed + idx) * 0.6;
          car.rotation.y = time * 0.5;
        });
        
        // Animate arrows
        arrowGroup.rotation.y = time * 0.2;
        arrowGroup.rotation.x = Math.sin(time * 0.3) * 0.2;
        
        // Rotate based on mouse
        const targetRotX = mousePosition.y * 0.25;
        const targetRotY = mousePosition.x * 0.5;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
        group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
        
        // Particle movement
        particleSystem.rotation.y += 0.002;
        particleSystem.rotation.x += 0.001;
        
        // Moving light
        movingCarLight.position.x = Math.sin(time) * 1.5;
        movingCarLight.position.z = Math.cos(time * 0.8) * 1.5;
        
        camera.lookAt(0, 0.5, 0);
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
      
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
      };
    } catch (error) {
      console.error("Three.js error:", error);
    }
  }, [mousePosition]);
  
  const sections = [
    {
      title: "1. Introduction",
      icon: Gavel,
      gradient: "from-indigo-500 to-purple-500",
      content: "Welcome to Car Rental Platform. By accessing or using our services, you agree to be bound by these Terms & Conditions. This agreement forms a legally binding contract between you and our company, ensuring a transparent and secure environment for all users.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop",
    },
    {
      title: "2. User Responsibilities",
      icon: UserCheck,
      gradient: "from-purple-500 to-pink-500",
      content: "You must provide accurate, current, and complete information during registration. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      listItems: [
        "Provide accurate and truthful information",
        "Maintain account security and notify us of breaches",
        "Do not misuse services or engage in fraudulent activities",
        "Comply with all local traffic and rental regulations",
      ],
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=300&fit=crop",
    },
    {
      title: "3. Booking & Payments",
      icon: CreditCard,
      gradient: "from-fuchsia-500 to-purple-500",
      content: "All bookings are subject to availability and confirmation. Payments must be completed prior to vehicle pickup unless otherwise agreed. We use industry-standard encryption to protect your financial data.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    },
    {
      title: "4. Cancellation Policy",
      icon: CalendarX,
      gradient: "from-indigo-500 to-fuchsia-500",
      content: "Cancellations must be submitted at least 24 hours before scheduled pickup time. Depending on timing, fees may apply. Refunds are processed within 7-10 business days.",
      image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=500&h=300&fit=crop",
    },
    {
      title: "5. Privacy Policy",
      icon: Lock,
      gradient: "from-purple-500 to-indigo-500",
      content: "Your data is securely stored and used only for essential services, in compliance with GDPR and CCPA regulations. We never sell personal information.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop",
    },
    {
      title: "6. Limitation of Liability",
      icon: Scale,
      gradient: "from-fuchsia-500 to-indigo-500",
      content: "To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from the use of our services.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop",
    },
    {
      title: "7. Changes to Terms",
      icon: RefreshCw,
      gradient: "from-indigo-500 to-pink-500",
      content: "We reserve the right to modify these Terms at any time. Material changes will be communicated via email or prominent website notice.",
      image: "https://images.unsplash.com/photo-1507924538820-3a4ed51469ce?w=500&h=300&fit=crop",
    },
    {
      title: "8. Contact Us",
      icon: Mail,
      gradient: "from-purple-500 to-fuchsia-500",
      content: "If you have any questions, our support team is ready to assist you. Reach out anytime, and we'll respond within 24 hours.",
      contactInfo: {
        email: "support@carrental.com",
        phone: "+1 (555) 789-0123",
        address: "123 Auto Avenue, Los Angeles, CA 90001",
      },
      image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=500&h=300&fit=crop",
    },
  ];
  
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5 },
    }),
  };
  
  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
      {/* 3D Car Rental Animation Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{ pointerEvents: "none" }}
      />
      
      {/* Gradient Overlay - Your specified colors */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-fuchsia-200 opacity-70 -z-5" />
      
      {/* Hero Section */}
      <motion.div
        style={{ y: headerY, opacity: opacityHero }}
        className="relative pt-12 pb-10 px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-md">
            <Car size={14} className="inline mr-1.5" />
            Legal Agreement
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-800 via-purple-800 to-fuchsia-800 bg-clip-text text-transparent"
        >
          Terms & Conditions
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 text-base mt-3 max-w-2xl mx-auto"
        >
          Your guide to safe and secure car rentals — read carefully before booking
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-3 mt-5 text-sm text-gray-500 flex-wrap"
        >
          <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/30">
            <Calendar size={14} className="text-purple-600" />
            <span>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/30">
            <Shield size={14} className="text-purple-600" />
            <span>Secure Booking Guarantee</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Main Content - Transparent Cards */}
      <div className="relative max-w-5xl mx-auto px-6 pb-20">
        <div className="space-y-5">
          {sections.map((section, idx) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="group bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-md`}>
                        <IconComponent size={18} className="text-white" />
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-gray-800">
                        {section.title}
                      </h2>
                    </div>
                    
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <p>{section.content}</p>
                      
                      {section.listItems && (
                        <ul className="mt-3 space-y-1.5">
                          {section.listItems.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -5 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                      
                      {section.contactInfo && (
                        <div className="mt-4 p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/40">
                          <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <Mail size={14} className="text-purple-600" />
                            <span>{section.contactInfo.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 text-sm mt-1.5">
                            <Phone size={14} className="text-purple-600" />
                            <span>{section.contactInfo.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 text-sm mt-1.5">
                            <MapPin size={14} className="text-purple-600" />
                            <span>{section.contactInfo.address}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ x: 3 }}
                      className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-800 transition"
                    >
                      Learn more <ArrowRight size={12} />
                    </motion.button>
                  </div>
                  
                  <div className="md:w-64 relative overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center p-4 md:p-5 rounded-r-2xl">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="relative w-full h-32 md:h-36 rounded-xl overflow-hidden shadow-md"
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 border border-white/40 rounded-xl pointer-events-none" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center pt-6 border-t border-white/30"
        >
          <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
            <Car size={14} className="text-purple-600" />
            <span className="text-xs font-medium">CarBooking — Drive with Confidence</span>
          </div>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Car Rental Platform. All rights reserved.
          </p>
        </motion.div>
      </div>
      
      {/* Floating Animation Element */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed bottom-6 right-6 z-20"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
          <Car size={20} className="text-white" />
        </div>
      </motion.div>
    </div>
  );
}