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
      <section className="bg-bg-soft dark:bg-[#09090b] border-y border-border dark:border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              {
                icon: <ShieldCheck size={24} />,
                title: "6 Months Warranty",
                desc: "Hassle-free coverage",
              },
              {
                icon: <CheckCircle2 size={24} />,
                title: "100% Tested",
                desc: "65-point quality check",
              },
              {
                icon: <Truck size={24} />,
                title: "Free Delivery",
                desc: "Across 2,500+ cities",
              },
              {
                icon: <RotateCcw size={24} />,
                title: "Easy Returns",
                desc: "No questions asked",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={homeVariants}
                className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
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