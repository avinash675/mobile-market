import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlashDealTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num) => num.toString().padStart(2, '0');

  return (
    <section className="py-24 lg:py-40 px-6 relative overflow-hidden bg-white dark:bg-[#09090b]">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-accent/5 rounded-full blur-[150px] -z-0"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 relative z-10">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">Limited Time Signature Event</span>
            <h2 className="text-5xl md:text-8xl font-bold text-text-primary dark:text-white tracking-tighter leading-[0.85] mb-8">
              Flash Deal – <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/60 to-accent/20 italic">40% Selection.</span>
            </h2>
            <p className="text-text-secondary dark:text-gray-400 text-xl font-medium max-w-lg leading-relaxed">Snap up high-performance flagships before the clock runs out. Verified quality, certified performance.</p>
          </motion.div>
        </div>

        <div className="flex gap-4 md:gap-10">
          {[
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center group"
            >
              <div className="w-24 md:w-40 h-32 md:h-48 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 backdrop-blur-3xl rounded-[40px] flex items-center justify-center mb-6 relative overflow-hidden shadow-xl transition-all duration-700 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:scale-105 group-hover:border-accent/30 group-hover:shadow-accent/20">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={item.value}
                    initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
                    className="text-5xl md:text-8xl font-bold text-text-primary dark:text-white tracking-tighter drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  >
                    {format(item.value)}
                  </motion.span>
                </AnimatePresence>
                {/* Subtle Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-30"></div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-secondary dark:text-gray-500 group-hover:text-accent transition-colors">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashDealTimer;
