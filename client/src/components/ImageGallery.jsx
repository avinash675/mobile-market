import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import SafeImage from './ui/SafeImage';

const ImageGallery = ({ images, name }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)"
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Main Image View */}
      <div className="relative group aspect-square bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-premium transition-all duration-500 hover:shadow-premium-hover">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full p-12 flex items-center justify-center cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setZoomStyle({ transform: "scale(1)" })}
          >
            <SafeImage
              src={images[activeIndex]}
              alt={`${name} - View ${activeIndex + 1}`}
              containerClassName="w-full h-full"
              className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out"
              style={zoomStyle}
              priority="high"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gallery Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <button 
            onClick={prevImage}
            className="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg pointer-events-auto hover:bg-accent hover:text-white transition-all transform hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextImage}
            className="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg pointer-events-auto hover:bg-accent hover:text-white transition-all transform hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Zoom Overlay Hint */}
        <div className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={16} />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
              activeIndex === idx 
              ? "border-accent shadow-accent-glow scale-105 bg-white" 
              : "border-slate-100 hover:border-accent/40 opacity-60 hover:opacity-100 bg-white/50"
            }`}
          >
            <SafeImage 
              src={img} 
              alt={`View ${idx + 1}`} 
              containerClassName="w-full h-full"
              className="w-full h-full object-contain p-2" 
            />
            {activeIndex !== idx && (
              <div className="absolute inset-0 bg-white/10 dark:bg-black/20"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
