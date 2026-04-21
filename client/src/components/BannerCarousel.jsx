import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    title: "Flagship Phones. Half the Price.",
    subtitle: "Premium refurbished devices, fully tested & certified.",
    gradient: "from-blue-900/80 via-blue-800/60 to-black"
  },
  {
    title: "Certified Quality. Zero Compromise.",
    subtitle: "30+ quality checks with warranty & support.",
    gradient: "from-purple-900/80 via-indigo-800/60 to-black"
  },
  {
    title: "Upgrade Smart. Save More.",
    subtitle: "Get premium performance without overpaying.",
    gradient: "from-indigo-900/80 via-blue-900/60 to-black"
  }
];

function BannerCarousel({ className = "" }) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{
          delay: 4000, // ✅ FIXED (better UX)
          disableOnInteraction: false,
          pauseOnMouseEnter: true // ✅ important
        }}
        pagination={{
          clickable: true,
        }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center">

              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-center px-6 max-w-xl space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">
                  {slide.title}
                </h2>

                <p className="text-lg text-white/70">
                  {slide.subtitle}
                </p>

                {/* CTA (IMPORTANT) */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-3 rounded-full bg-white text-black text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition"
                >
                  Shop Now →
                </motion.button>
              </motion.div>

              {/* Subtle glow (premium depth) */}
              <div className="absolute inset-0 bg-black/20" />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerCarousel;