import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import iphoneImg from '../assets/images/iphone.png';
import samsungImg from '../assets/images/samsung.png';
import pixelImg from '../assets/images/pixel.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const banners = [
  {
    title: "iPhone 15 Pro",
    subtitle: "Experience the Future of Mobile Computing",
    image: iphoneImg, 
    gradient: "from-blue-600/40 via-transparent to-transparent"
  },
  {
    title: "Galaxy Flagships",
    subtitle: "Unmatched Performance, Certified Refurbished",
    image: samsungImg, 
    gradient: "from-purple-600/40 via-transparent to-transparent"
  },
  {
    title: "The Pixel Way",
    subtitle: "Smartest Software on Cleanest Hardware",
    image: pixelImg, 
    gradient: "from-accent/40 via-transparent to-transparent"
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
            <div className="absolute inset-0 bg-[#020617]">
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-full h-full object-cover transition-transform duration-[4000ms] ease-linear group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} to-[#020617]/80`}></div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-16 md:p-24 z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4 tracking-tighter">
                  {banner.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/60 font-medium tracking-tight">
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
