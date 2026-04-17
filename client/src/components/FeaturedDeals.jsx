import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';
import ProductCard from './ProductCard';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const FeaturedDeals = ({ products }) => {
  return (
    <div className="featured-deals-carousel relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, FreeMode]}
        spaceBetween={30}
        slidesPerView={1}
        freeMode={true}
        grabCursor={true}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="pb-20 !px-4 md:!px-0"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="py-4">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default FeaturedDeals;
