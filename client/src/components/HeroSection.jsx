import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import iphoneImg from '../assets/images/iphone.png';
import Button from './common/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-white dark:bg-[#09090b] pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="z-10"
          >
            <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-black text-text-primary dark:text-white mb-6 tracking-tight leading-[1.1]">
              Buy Refurbished <br />
              <span className="text-text-secondary dark:text-gray-400">Smartphones with Confidence</span>
            </h1>
            <p className="text-[17px] sm:text-[19px] text-text-secondary dark:text-gray-400 mb-10 max-w-[460px] font-medium leading-relaxed">
              Premium quality. Best prices. Certified devices. Get the flagship experience for less.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="w-full sm:w-auto h-14 !px-8 text-[14px]">
                  Shop Now
                </Button>
              </Link>
              <Link to="/deals">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 !px-8 text-[14px] group">
                  Explore Deals
                  <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Subtle background glow - No bright colors */}
            <div className="absolute inset-0 bg-text-primary/5 dark:bg-white/[0.03] rounded-full blur-[100px] -z-10 scale-125" />
            
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src={iphoneImg} 
                alt="Premium Smartphone" 
                className="w-full max-w-[320px] md:max-w-[420px] h-auto object-contain drop-shadow-xl"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
