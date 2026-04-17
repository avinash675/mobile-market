import React from 'react';
import { motion } from 'framer-motion';

/* ─── Static Brand Data ─────────────────────────────────────────────────────────── */
const BRANDS = [
  { name: 'Apple',    initial: 'A',   color: '#1d1d1f', bg: '#1d1d1f12' },
  { name: 'Samsung',  initial: 'S',   color: '#1428A0', bg: '#1428A012' },
  { name: 'Xiaomi',   initial: 'Mi',  color: '#FF6900', bg: '#FF690012' },
  { name: 'OnePlus',  initial: '1+',  color: '#F5010C', bg: '#F5010C12' },
  { name: 'Vivo',     initial: 'V',   color: '#415FFF', bg: '#415FFF12' },
  { name: 'Oppo',     initial: 'O',   color: '#1D8348', bg: '#1D834812' },
  { name: 'Realme',   initial: 'R',   color: '#CAB227', bg: '#CAB22712' },
  { name: 'Google',   initial: 'G',   color: '#34A853', bg: '#34A85312' },
  { name: 'Motorola', initial: 'M',   color: '#5D2D91', bg: '#5D2D9112' },
  { name: 'Nokia',    initial: 'N',   color: '#124191', bg: '#12419112' },
  { name: 'Sony',     initial: 'So',  color: '#282828', bg: '#28282812' },
  { name: 'Asus',     initial: 'As',  color: '#00539B', bg: '#00539B12' },
  { name: 'Huawei',   initial: 'Hw',  color: '#CF0A2C', bg: '#CF0A2C12' },
  { name: 'Honor',    initial: 'Ho',  color: '#0095D5', bg: '#0095D512' },
  { name: 'Nothing',  initial: 'Nt',  color: '#1a1a1a', bg: '#1a1a1a10' },
  { name: 'Lenovo',   initial: 'L',   color: '#E2231A', bg: '#E2231A12' },
  { name: 'Lava',     initial: 'La',  color: '#E87722', bg: '#E8772212' },
  { name: 'Micromax', initial: 'Mx',  color: '#0B8F5B', bg: '#0B8F5B12' },
  { name: 'Infinix',  initial: 'In',  color: '#3E8914', bg: '#3E891412' },
  { name: 'Tecno',    initial: 'T',   color: '#005DB2', bg: '#005DB212' },
  { name: 'iQOO',     initial: 'iQ',  color: '#5B2D8E', bg: '#5B2D8E12' },
];

/* Split brands into two rows for the dual-row carousel */
const ROW1_BRANDS = BRANDS.slice(0, 11);   // Apple → Nokia  (11 items)
const ROW2_BRANDS = BRANDS.slice(11);      // Sony  → iQOO   (10 items)

/* Duplicate each row for seamless infinite loop */
const TRACK1 = [...ROW1_BRANDS, ...ROW1_BRANDS];
const TRACK2 = [...ROW2_BRANDS, ...ROW2_BRANDS];

/* ─── Lightweight MarqueeCard ────────────────────────────────────────────── */
const MarqueeCard = ({ brand }) => (
  <div
    className={[
      'flex-shrink-0 relative flex flex-col items-center justify-center gap-2.5 sm:gap-3',
      'w-[90px] sm:w-[120px] lg:w-[140px] h-[86px] sm:h-[106px] lg:h-[120px]',
      'rounded-2xl select-none',
      'bg-white dark:bg-white/[0.04]',
      'border border-border dark:border-white/[0.07] transition-all duration-300',
    ].join(' ')}
    aria-label={`Brand logo: ${brand.name}`}
  >
    {/* Badge */}
    <div
      className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center font-black text-[14px] sm:text-[16px] tracking-tight flex-shrink-0"
      style={{
        backgroundColor: brand.bg,
        color: brand.color,
      }}
    >
      {brand.initial}
    </div>

    {/* Name */}
    <span className="text-[11px] sm:text-[13px] font-bold tracking-tight leading-none text-text-primary dark:text-gray-200">
      {brand.name}
    </span>
  </div>
);

/* ─── Main component ─────────────────────────────────────────────────────── */
const BrandCarousel = () => {
  return (
    <section className="py-24 bg-bg-soft dark:bg-[#09090b] border-y border-border dark:border-white/5">
      {/* ── Heading ─────────────────────────────────────────────────── */}
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 space-y-3"
        >
          <span className="label text-text-muted dark:text-gray-500 block">Top Brands</span>
          <h2 className="text-[28px] sm:text-[36px] font-black tracking-tight text-text-primary dark:text-white leading-tight">
            Shop by Top Brands
          </h2>
          <p className="text-[15px] text-text-secondary dark:text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
            Explore smartphones from the most trusted brands worldwide
          </p>
        </motion.div>
      </div>

      {/* ── Two-Row Marquee (full-bleed) ────────────────────────── */}
      <div className="relative w-full overflow-hidden brand-section-wrapper">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 h-full w-32 md:w-52 z-10 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-r from-[#f8fafc] dark:from-[#09090b] to-transparent" />
        </div>
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 h-full w-32 md:w-52 z-10 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-l from-[#f8fafc] dark:from-[#09090b] to-transparent" />
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 py-4">
          {/* Row 1 — scrolls ← (left) */}
          <div
            className="flex gap-4 sm:gap-5 brand-marquee"
            style={{ width: 'max-content' }}
            aria-label="Brand logos row 1"
          >
            {TRACK1.map((brand, idx) => (
              <MarqueeCard key={`r1-${brand.name}-${idx}`} brand={brand} />
            ))}
          </div>

          {/* Row 2 — scrolls right → left (reverse) */}
          <div
            className="flex gap-4 sm:gap-5 brand-marquee-reverse"
            style={{ width: 'max-content' }}
            aria-label="Brand logos row 2"
          >
            {TRACK2.map((brand, idx) => (
              <MarqueeCard key={`r2-${brand.name}-${idx}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
