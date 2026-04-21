import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Button from './common/Button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

// Images
import iphoneImg from '../assets/images/iphone.png';
import samsungImg from '../assets/images/samsung.png';
import pixelImg from '../assets/images/pixel.png';
import oneplusImg from '../assets/images/oneplus.png';

const dealSlides = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    price: "₹89,999",
    originalPrice: "₹1,34,900",
    discount: "33% OFF",
    image: iphoneImg,
    color: "from-blue-600/20 to-transparent",
    tag: "Most Popular"
  },
  {
    id: 2,
    title: "Galaxy S24 Ultra",
    price: "₹92,999",
    originalPrice: "₹1,29,999",
    discount: "28% OFF",
    image: samsungImg,
    color: "from-purple-600/20 to-transparent",
    tag: "Limited Time"
  },
  {
    id: 3,
    title: "Pixel 8 Pro",
    price: "₹65,999",
    originalPrice: "₹1,06,999",
    discount: "38% OFF",
    image: pixelImg,
    color: "from-accent/20 to-transparent",
    tag: "Best Value"
  },
  {
    id: 4,
    title: "OnePlus 12",
    price: "₹54,999",
    originalPrice: "₹64,999",
    discount: "15% OFF",
    image: oneplusImg,
    color: "from-red-600/20 to-transparent",
    tag: "New Arrival"
  }
];

const DealsCarousel = () => {
  return (
    <section className="py-24 bg-bgLight dark:bg-[#09090b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-accent font-bold uppercase text-xs mb-3 tracking-widest">
              <Zap size={14} className="fill-accent" />
              Flash Deals of the Day
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-textDark dark:text-white tracking-tighter leading-tight">
              Exclusive <span className="italic text-textDark dark:text-white">Offers</span> <br /> 
              Waiting For You.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" className="group rounded-2xl bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-textDark dark:text-white">
              View All Deals <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="deals-swiper overflow-visible pb-16"
        >
          {dealSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="w-[300px] md:w-[450px]">
              <div className={`relative bg-gradient-to-tr ${slide.color} bg-white dark:bg-[#111113] rounded-[40px] p-8 md:p-12 border border-gray-100 dark:border-white/5 shadow-premium group hover:shadow-premium-hover transition-all duration-500`}>
                <div className="absolute top-8 left-8 z-20">
                  <span className="bg-textDark dark:bg-white text-white dark:text-textDark text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 block w-fit">
                    {slide.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-accent/20">
                      {slide.discount}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full h-64 md:h-80 mb-8"
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </motion.div>

                  <div className="text-center">
                    <h3 className="text-2xl font-black text-textDark dark:text-white mb-2">{slide.title}</h3>
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <span className="text-3xl font-black text-textDark dark:text-white">{slide.price}</span>
                      <span className="text-lg text-textMuted dark:text-gray-400 line-through font-medium">{slide.originalPrice}</span>
                    </div>
                    <Button size="lg" className="w-full rounded-2xl shadow-xl shadow-accent/10">
                      Claim This Deal
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
};

export default DealsCarousel;
