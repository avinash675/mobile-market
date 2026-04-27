import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const banners = [
  {
    title: "Premium Experience",
    subtitle: "Shop Smart. Shop Mobixa.",
    image: "https://res.cloudinary.com/dx40399gl/image/upload/v1777300740/ChatGPT_Image_Apr_27_2026_08_08_18_PM_xuvfaz.png", // ✅ NEW IMAGE
    gradient: "from-blue-600/40 via-transparent to-transparent",
    contain: true
  },
  {
    title: "Best Deals Online",
    subtitle: "Grab the hottest deals today",
    image: "https://res.cloudinary.com/dx40399gl/image/upload/v1777300807/vivo-v50e-vivo-mobile-phone-large-1_apgxcl.avif", // ✅ NEW IMAGE
    gradient: "from-purple-600/40 via-transparent to-transparent",
    contain: true
  },
  {
    title: "Trusted Quality",
    subtitle: "Only the best for you",
    image: "https://res.cloudinary.com/dx40399gl/image/upload/v1777299836/WhatsApp_Image_2026-03-16_at_9.40.11_PM_iihdbj.jpg", // ✅ UNCHANGED
    gradient: "from-accent/40 via-transparent to-transparent",
    contain: false
  }
];

const LoginBannerSlider = () => {
  return (
    <div className="h-full w-full overflow-hidden relative group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        loop={true}
        className="h-full w-full login-swiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="relative overflow-hidden">

            {/* Background container */}
            <div className="absolute inset-0 bg-[#020617] flex items-center justify-center">

              <img 
                src={banner.image} 
                alt={banner.title}
                loading="lazy"
                className={`transition-transform duration-[4000ms] ease-linear group-hover:scale-105
                  ${banner.contain 
                    ? "h-full object-contain"
                    : "w-full h-full object-cover"
                  }`}
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} to-[#020617]/80`}></div>
            </div>

            {/* Text */}
            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16 z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-3 tracking-tight">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-xl text-white/70 font-medium">
                  {banner.subtitle}
                </p>
              </motion.div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LoginBannerSlider;