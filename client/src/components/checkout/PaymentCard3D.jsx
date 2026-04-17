import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const PaymentCard3D = ({ cardNumber, cardHolder, expiry, cvv, isFlipped }) => {
  // Motion values for tilt effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);

  // Handle mouse move for tilting
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Card Type Detection
  const getCardType = (num) => {
    if (num.startsWith('4')) return 'VISA';
    if (/^5[1-5]/.test(num)) return 'MASTERCARD';
    if (/^3[47]/.test(num)) return 'AMEX';
    return 'CARD';
  };
  const cardType = getCardType(cardNumber.replace(/\s/g, ''));

  // Safe formatting fallbacks
  const safeNumber = (cardNumber || '').padEnd(19, '•').substring(0, 19);
  const safeHolder = cardHolder ? cardHolder.toUpperCase() : 'CARD HOLDER';
  const safeExpiry = (expiry || '••/••').padEnd(5, '•');
  const safeCvv = (cvv || '').padEnd(3, '•');

  return (
    <motion.div 
      className="relative w-full max-w-[420px] aspect-[1.586/1] mx-auto perspective-[1200px] group select-none cursor-pointer [container-type:inline-size]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        style={{ rotateX, rotateY }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden w-full h-full rounded-[4.2cqi] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(255,255,255,0.05)_inset] bg-gradient-to-br from-[#0F172A] to-[#1E293B] ring-1 ring-white/10 group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-500">
          {/* Surface Lighting Highlights - Real World Sim */}
          <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
          <div className="absolute top-0 left-[-30%] w-[160%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[-1deg] pointer-events-none" />
          
          {/* Subtle top light reflection overlay */}
          <div className="absolute inset-x-0 top-0 h-[36%] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

          {/* 🟡 CHIP - Exact: 48x36 @ 420w => 11.4% x 13.5%, Top: 7.5%, Left: 5.7% */}
          <div className="absolute w-[11.4cqi] h-[8.5cqi] rounded-[1.4cqi] bg-gradient-to-br from-[#f2e0b6] via-[#d4af37] to-[#8b7325] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_2px_4px_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-center border border-[#7a6321]" style={{ top: '7.5%', left: '5.7%' }}>
            <div className="absolute inset-0 opacity-40 border border-[#4a2e0a]/40 rounded-[1.4cqi] scale-90"></div>
            <div className="absolute w-full h-[0.5px] bg-[#4a2e0a]/30 top-[30%]" />
            <div className="absolute w-full h-[0.5px] bg-[#4a2e0a]/30 top-[50%]" />
            <div className="absolute w-full h-[0.5px] bg-[#4a2e0a]/30 top-[70%]" />
            <div className="absolute w-[0.5px] h-full bg-[#4a2e0a]/30 left-[35%]" />
            <div className="absolute w-[0.5px] h-full bg-[#4a2e0a]/30 right-[35%]" />
          </div>
          
          {/* 💳 VISA LOGO - Top: 7.5%, Right: 5.7% */}
          <div className="absolute" style={{ top: '7.5%', right: '5.7%' }}>
            {cardType === 'VISA' && (
              <div className="w-[12cqi] font-black italic tracking-tighter text-white drop-shadow-lg text-[6cqi] leading-none flex items-center h-[8.5cqi] justify-end underline underline-offset-4 decoration-accent/30">VISA</div>
            )}
            {cardType === 'MASTERCARD' && (
              <div className="flex -space-x-[1cqi] items-center h-[8.5cqi] justify-end">
                <div className="w-[8cqi] h-[8cqi] rounded-full bg-[#EB001B] opacity-95 blur-[0.2px]" />
                <div className="w-[8cqi] h-[8cqi] rounded-full bg-[#F79E1B] opacity-95 blur-[0.2px] -ml-[3cqi]" />
              </div>
            )}
            {cardType === 'AMEX' && (
              <div className="px-[2cqi] py-[1cqi] bg-blue-500/20 border-[2px] border-white/30 rounded-[1.5cqi] text-white font-black tracking-tight text-[4.5cqi] backdrop-blur-sm h-[8.5cqi] flex items-center">AMEX</div>
            )}
            {cardType === 'CARD' && (
              <div className="h-[8.5cqi] flex items-center">
                <span className="text-white/20 italic font-black text-[2.5cqi] tracking-[0.2em] font-mono whitespace-nowrap">MOBIXA PLATINUM</span>
              </div>
            )}
          </div>

          {/* 🔢 CARD NUMBER - Exact: Top: 37.7%, Left: 5.7%, Font size: 20/420 = 4.7cqi */}
          <div className="absolute w-full px-[5.7cqi]" style={{ top: '37.7%' }}>
            <p className="text-white font-[monospace] text-[5cqi] tracking-[0.6cqi] font-medium opacity-95 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              {cardNumber ? safeNumber : '4242 4242 4242 4242'}
            </p>
          </div>

          {/* 👤 CARD HOLDER - Exact: Bottom: 9%, Left: 5.7% */}
          <div className="absolute" style={{ bottom: '9%', left: '5.7%' }}>
            <span className="text-[2cqi] text-white/30 uppercase tracking-[0.2em] font-bold mb-[0.5cqi] block">
              Card Holder
            </span>
            <p className="text-white font-medium tracking-[1px] text-[3.5cqi] drop-shadow-md truncate max-w-[55cqi] uppercase">
              {safeHolder === 'CARD HOLDER' ? 'AVINASH GORU' : safeHolder}
            </p>
          </div>

          {/* 📅 EXPIRY DATE - Exact: Bottom: 9%, Right: 5.7% */}
          <div className="absolute" style={{ bottom: '9%', right: '5.7%' }}>
            <span className="text-[2cqi] text-white/30 uppercase tracking-[0.2em] font-bold mb-[0.5cqi] block text-right">
              Expires
            </span>
            <p className="text-white font-medium tracking-[0px] text-[3.5cqi] drop-shadow-md text-right">
              {safeExpiry === '••/••' ? '12/28' : safeExpiry}
            </p>
          </div>
        </div>

        {/* BACK SIDE */}
        <div style={{ transform: 'rotateY(180deg)' }} className="absolute inset-0 backface-hidden w-full h-full rounded-[4.2cqi] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-white/5 py-[8cqi]">
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

          {/* Magnetic Strip */}
          <div className="w-full h-[22%] bg-black/95 mt-[15%] relative z-10 shadow-inner" />

          {/* CVV Box */}
          <div className="px-[8cqi] mt-[8cqi] relative z-10 text-right w-full">
            <span className="text-[2cqi] text-white/30 uppercase tracking-[0.2em] font-bold pr-[0.5cqi] mb-[1cqi] block">
              CCV / CVV
            </span>
            <div className="bg-[#f0f0f0] rounded-[1cqi] h-[15cqi] w-full flex justify-end items-center px-[4cqi] font-[monospace] text-black tracking-[0.25em] text-[4.5cqi] shadow-inner border-y border-slate-300">
              <span className="italic font-bold opacity-80">{safeCvv}</span>
            </div>
          </div>

          <div className="px-[8cqi] text-white/5 text-[2cqi] text-center mt-auto uppercase tracking-[0.2em] relative z-10 leading-relaxed font-bold italic">
            Authorized Signature. Not valid unless signed.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentCard3D;
