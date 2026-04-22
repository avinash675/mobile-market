import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import iphoneImg from '../assets/images/iphone.png';
import Button from './common/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-white dark:bg-[#09090b] pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden transition-colors duration-300">
      {/* Premium Background Depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-500/[0.02] dark:bg-blue-500/[0.04] rounded-full blur-[120px] absolute -top-1/4 -right-1/4 mix-blend-screen" />
        <div className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-indigo-500/[0.02] dark:bg-purple-500/[0.03] rounded-full blur-[100px] absolute top-1/4 -left-1/4 mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Social Proof Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#09090b] bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden z-10" style={{ zIndex: 10 - i }}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-[12px] font-bold text-gray-600 dark:text-gray-400">Trusted by 10,000+ buyers</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[52px] sm:text-[64px] lg:text-[76px] font-black text-text-primary dark:text-white mb-6 tracking-tighter leading-[1.05]"
            >
              The Flagship Experience.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-600">Without the Premium Price.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[18px] sm:text-[20px] text-text-secondary dark:text-gray-400 mb-10 max-w-[500px] font-medium leading-relaxed"
            >
              Unlock pure power and flawless design. Certified, meticulously restored, and guaranteed to perform like new.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-5 mb-14"
            >
              <Link to="/shop">
                <Button variant="primary" size="lg" className="w-full sm:w-auto h-14 !px-8 text-[15px] shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  Shop Flagships
                </Button>
              </Link>
              <Link to="/deals">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 !px-8 text-[15px] group border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all duration-300">
                  Explore Deals
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center"
                  >
                    <ArrowRight size={16} strokeWidth={2} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>

          </motion.div>

          {/* Right Image Presentation - 3D Composition */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end items-center h-[500px]"
          >
            {/* Core Lighting Behind Phone */}
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-tr from-blue-500/30 to-purple-500/20 dark:from-blue-500/20 dark:to-purple-500/10 rounded-full blur-[80px] -z-10" 
            />
            
            {/* Back Device (Blurred/Faded) */}
            <motion.div
              initial={{ x: 100, y: 50, opacity: 0, scale: 0.8, rotate: 15 }}
              animate={{ x: 50, y: 20, opacity: 0.4, scale: 0.85, rotate: 12 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="absolute z-0 hidden md:block"
            >
              <motion.img 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                src={iphoneImg} 
                alt="Device Layer 2" 
                className="w-[340px] object-contain drop-shadow-2xl"
                style={{ filter: 'blur(6px) drop-shadow(0px 20px 30px rgba(0,0,0,0.3))' }}
              />
            </motion.div>

            {/* Middle Device (Blurred/Faded) */}
            <motion.div
              initial={{ x: -80, y: 30, opacity: 0, scale: 0.85, rotate: -15 }}
              animate={{ x: -60, y: 10, opacity: 0.6, scale: 0.9, rotate: -8 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="absolute z-10 hidden md:block"
            >
              <motion.img 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                src={iphoneImg} 
                alt="Device Layer 1" 
                className="w-[360px] object-contain drop-shadow-2xl"
                style={{ filter: 'blur(3px) drop-shadow(0px 20px 30px rgba(0,0,0,0.4))' }}
              />
            </motion.div>

            {/* Front Main Device */}
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20"
            >
              <motion.img 
                animate={{ y: [-10, 10, -10], rotateZ: [-1, 1, -1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                src={iphoneImg} 
                alt="Premium Smartphone" 
                className="w-[280px] md:w-[420px] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                style={{ filter: 'drop-shadow(0px 40px 50px rgba(0,0,0,0.4))' }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
