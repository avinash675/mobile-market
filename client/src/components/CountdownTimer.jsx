import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target time (e.g., end of today)
    const target = new Date();
    target.setHours(23, 59, 59, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });

      if (difference <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-primary rounded-[32px] p-8 md:p-12 shadow-2xl shadow-primary/30">
          {/* Background Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-20 w-20 md:h-24 md:w-24 bg-accent rounded-full flex items-center justify-center shadow-xl shadow-accent/40"
              >
                <Zap className="text-white fill-white" size={40} />
              </motion.div>
              
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                  Flash Deal – <span className="text-accent italic">iPhone 13</span> 
                </h3>
                <p className="text-white/60 text-lg font-medium">Get up to <span className="text-white font-bold">35% OFF</span>. Offer ends in:</p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
              <div className="flex gap-4">
                {[
                  { label: 'Hrs', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Sec', value: timeLeft.seconds }
                ].map((time, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="h-20 w-20 md:h-24 md:w-24 glass-dark rounded-3xl flex items-center justify-center border-white/5 shadow-2xl backdrop-blur-3xl">
                      <span className="text-3xl md:text-5xl font-black text-white tabular-nums">
                        {time.value.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/40 mt-3">{time.label}</span>
                  </div>
                ))}
              </div>

              <div className="w-full max-w-sm lg:w-80">
                <div className="flex justify-between text-xs font-bold text-white/60 mb-2 uppercase tracking-widest">
                  <span>Deals Claimed</span>
                  <span className="text-accent">72%</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  ></motion.div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary font-black px-10 py-5 rounded-2xl flex items-center gap-3 text-lg shadow-2xl hover:bg-accent hover:text-white transition-all duration-300"
            >
              Shop the Deal <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
