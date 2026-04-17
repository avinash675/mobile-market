import React, { useEffect } from 'react';
import AboutSection from '../components/AboutSection';
import { motion } from 'framer-motion';

const AboutPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bgLight dark:bg-slate-950 pt-24 pb-20 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Hero / Header for About Page */}
      <div className="pt-32 pb-16 px-6 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black tracking-tight"
          >
            Our Mission is <span className="text-blue-600">Trust</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto"
          >
            We're building the most reliable marketplace for refurbished smartphones in India.
          </motion.p>
        </div>
      </div>

      <AboutSection />

      {/* Additional Content: Values */}
      <section className="py-24 bg-slate-50 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight mb-4">The Mobixa Promise</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Verifiable Quality", desc: "Every phone undergoes an exhaustive 65-point diagnostic test by our experts." },
              { title: "Fair Pricing", desc: "No hidden costs. We provide premium tech at prices that make sense." },
              { title: "Full Transparency", desc: "Detailed condition reports and high-res photos for every single device." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
