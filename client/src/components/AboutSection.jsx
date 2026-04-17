import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Tag, Award, Repeat, ArrowRight } from 'lucide-react';
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
    { icon: <ShieldCheck className="text-blue-500" size={24} />, label: 'Verified Devices', desc: '65-point quality check' },
    { icon: <Tag className="text-emerald-500" size={24} />, label: 'Best Prices', desc: 'Unbeatable value' },
    { icon: <Award className="text-amber-500" size={24} />, label: 'Trusted Brands', desc: '100% Authentic products' },
    { icon: <Repeat className="text-violet-500" size={24} />, label: 'Easy Comparison', desc: 'Smart decision making' },
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
            <div className="space-y-4">
              <motion.span 
                variants={itemVariants}
                className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[12px] font-bold tracking-widest uppercase"
              >
                Our Story
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]"
              >
                About Mobixa
                <span className="block text-slate-400 dark:text-slate-500 text-2xl lg:text-3xl mt-2">
                  Smart Technology, Smarter Choices
                </span>
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xl"
              >
                Mobixa is your trusted platform to discover and buy high-quality refurbished smartphones at unbeatable prices. We bring together top brands, verified devices, and the best deals to help you make smarter buying decisions.
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none"
                >
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{feature.label}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Mission Statement */}
            <motion.div 
              variants={itemVariants}
              className="p-8 rounded-3xl bg-blue-600 dark:bg-blue-600/90 text-white relative overflow-hidden group shadow-2xl shadow-blue-600/20"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Award size={80} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Our Mission</h3>
              <p className="text-blue-50 leading-relaxed font-medium relative z-10">
                Our mission is to make premium technology accessible to everyone by offering reliable devices at affordable prices without compromising quality.
              </p>
            </motion.div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-12 pt-4">
              {stats.map((stat, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</div>
                  <div className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-4">
              <Link to="/shop">
                <Button size="xl" className="px-12 group">
                  Explore Deals
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-[40px] blur-[80px] -rotate-6 scale-90" />
            <div className="relative rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
              <img 
                src={aboutImg} 
                alt="Mobixa Refurbished Smartphones"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-900 dark:text-white">65pt Check</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Quality</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
