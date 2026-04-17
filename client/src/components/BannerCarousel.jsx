import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    title: "Up to 60% OFF on Refurbished Smartphones",
    subtitle: "Premium devices completely restored & tested.",
    color: "from-blue-900/80 to-primary"
  },
  {
    title: "Certified Refurbished Devices",
    subtitle: "30-point quality check with 6 months warranty.",
    color: "from-purple-900/80 to-primary"
  },
  {
    title: "Premium Phones at Smart Prices",
    subtitle: "Upgrade to ultimate performance.",
    color: "from-indigo-900/80 to-primary"
  }
];

function BannerCarousel({ className = "" }) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
           clickable: true,
           bulletClass: 'swiper-custom-bullet',
           bulletActiveClass: 'swiper-custom-bullet-active',
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background gradient simulating an image overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} z-0`}></div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-10 text-center">
                <div className="space-y-6 max-w-lg">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 font-medium">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerCarousel;
