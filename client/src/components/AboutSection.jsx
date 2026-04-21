import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Tag, Award, Repeat, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './common/Button';
import aboutImg from '../assets/images/about-illustration.png';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const features = [
    { icon: <ShieldCheck size={24} className="text-blue-600 dark:text-blue-400" />, label: 'Verified Devices', desc: 'Rigorous 65-point quality inspection' },
    { icon: <Tag size={24} className="text-emerald-600 dark:text-emerald-400" />, label: 'Unbeatable Value', desc: 'Premium tech at accessible prices' },
    { icon: <Award size={24} className="text-amber-600 dark:text-amber-400" />, label: '100% Authentic', desc: 'Guaranteed original components' },
    { icon: <Repeat size={24} className="text-violet-600 dark:text-violet-400" />, label: 'Hassle-Free', desc: 'Seamless returns and warranty' },
  ];

  const stats = [
    { value: '10,000+', label: 'Customers' },
    { value: '50+', label: 'Brands' },
    { value: '1,000+', label: 'Products' },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-[#09090b]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            <div className="space-y-5">
              <motion.span 
                variants={itemVariants}
                className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-black tracking-widest uppercase shadow-sm"
              >
                The Mobixa Standard
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="text-[40px] lg:text-[56px] font-black tracking-tighter text-text-primary dark:text-white leading-[1.05]"
              >
                Redefining Refurbished.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-500 mt-1">
                  Premium Tech. Smarter Choices.
                </span>
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-[16px] lg:text-[18px] text-text-secondary dark:text-gray-400 font-medium leading-relaxed max-w-lg"
              >
                We believe premium technology shouldn't come with a premium price tag. Mobixa bridges the gap between flagship performance and accessibility, rigorously restoring top-tier devices to flawless condition.
              </motion.p>
            </div>

            {/* Features Grid - Perfect 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.08] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-[16px] font-bold text-text-primary dark:text-white mb-1.5 tracking-tight">{feature.label}</h4>
                  <p className="text-[13px] text-text-secondary dark:text-gray-400 leading-relaxed font-medium">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Mission Statement - Aligned */}
            <motion.div 
              variants={itemVariants}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                <Star size={80} strokeWidth={1} />
              </div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-black text-blue-600 dark:text-blue-400 mb-3 relative z-10">Our Mission</h3>
              <p className="text-[16px] text-text-primary dark:text-white leading-relaxed font-bold relative z-10 max-w-lg">
                To democratize premium technology by engineering a flawless, accessible, and sustainable smartphone lifecycle.
              </p>
            </motion.div>

            {/* Stats Row - Clean Horizontal */}
            <div className="flex items-center gap-12 lg:gap-20 pt-10 border-t border-gray-100 dark:border-white/5">
              {stats.map((stat, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <div className="text-[32px] lg:text-[36px] font-black text-text-primary dark:text-white tracking-tighter leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-bold text-text-secondary dark:text-gray-400 uppercase tracking-widest mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-2">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="h-14 !px-10 rounded-full group">
                  <span className="font-bold">Experience the Standard</span>
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration Only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
          >
            {/* Animated Glow */}
            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] -z-10" />
            
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative max-w-[420px] rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl z-10 bg-white/5"
            >
              <img 
                src={aboutImg} 
                alt="Mobixa Refurbished Smartphones"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
