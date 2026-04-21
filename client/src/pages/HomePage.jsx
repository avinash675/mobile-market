import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

import HeroSection from '../components/HeroSection';
import SmartShoppingOptions from '../components/SmartShoppingOptions';
import BrandCarousel from '../components/BrandCarousel';
import AboutSection from '../components/AboutSection';

const homeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const HomePage = () => {
  console.log("HomePage rendered");

  return (
    <div className="bg-white dark:bg-[#09090b] min-h-screen text-text-primary dark:text-white transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <section className="relative bg-white dark:bg-[#09090b] border-y border-gray-100 dark:border-white/5 py-16 md:py-20 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "12-Month Warranty",
                desc: "Hassle-free coverage",
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-50 dark:bg-blue-500/10",
              },
              {
                icon: CheckCircle2,
                title: "100% Tested",
                desc: "65-point quality check",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-50 dark:bg-emerald-500/10",
              },
              {
                icon: Truck,
                title: "Free Delivery",
                desc: "Across 2,500+ cities",
                color: "text-violet-600 dark:text-violet-400",
                bg: "bg-violet-50 dark:bg-violet-500/10",
              },
              {
                icon: RotateCcw,
                title: "7-Day Returns",
                desc: "No questions asked",
                color: "text-amber-600 dark:text-amber-400",
                bg: "bg-amber-50 dark:bg-amber-500/10",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={homeVariants}
                className="group flex flex-col md:flex-row items-center gap-5 text-center md:text-left cursor-default transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm group-hover:shadow-md ${item.bg} ${item.color} group-hover:scale-110`}>
                  <item.icon size={28} strokeWidth={1.8} className="transition-transform duration-300 group-hover:rotate-[-5deg]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[15px] md:text-[16px] font-black tracking-tight text-text-primary dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] text-text-secondary dark:text-gray-400 font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Smart Shopping */}
      <SmartShoppingOptions />

      {/* 4. Brand Carousel (Logos Only) */}
      <BrandCarousel />

      {/* 5. About Section */}
      <AboutSection />
    </div>
  );
};

export default HomePage;