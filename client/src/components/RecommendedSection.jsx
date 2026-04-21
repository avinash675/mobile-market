import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { products } from '../data/products';

const RecommendedImage = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      onError={() => imgSrc !== src && setImgSrc(src)}
      className="w-full h-full object-contain grayscale-[0.2] transition-all duration-700 group-hover/card:scale-110 group-hover/card:grayscale-0"
    />
  );
};

const RecommendedSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#09090b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Tailored for You</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-white tracking-tighter uppercase">Recommended for You</h2>
        </div>
        <button className="text-[10px] font-bold uppercase tracking-widest text-text-primary dark:text-white border-b-2 border-accent pb-1 hover:text-accent transition-colors">View All</button>
      </div>

      <div className="relative group">
        <div className="flex overflow-x-auto gap-8 px-6 md:px-[calc((100vw-1280px)/2+24px)] pb-12 no-scrollbar snap-x snap-mandatory">
          {products.slice(0, 8).map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="min-w-[300px] md:min-w-[360px] snap-start bg-slate-50 dark:bg-white/[0.03] rounded-[32px] overflow-hidden border border-slate-100 dark:border-white/5 group/card relative"
            >
              <div className="h-[300px] relative overflow-hidden bg-white dark:bg-[#111113] p-8">
                <RecommendedImage src={product.image} alt={product.name} />
                
                {/* Floating Actions */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all duration-500">
                  <button className="w-10 h-10 bg-white dark:bg-slate-800 shadow-xl rounded-full flex items-center justify-center text-text-primary dark:text-white hover:bg-accent hover:text-white transition-all border border-slate-100 dark:border-white/10">
                    <Heart size={18} />
                  </button>
                  <button className="w-10 h-10 bg-white dark:bg-slate-800 shadow-xl rounded-full flex items-center justify-center text-text-primary dark:text-white hover:bg-accent hover:text-white transition-all border border-slate-100 dark:border-white/10">
                    <Eye size={18} />
                  </button>
                </div>

                <div className="absolute top-6 left-6">
                  <div className="bg-primary text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">Premium Choice</div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-text-primary dark:text-white text-xl mb-1">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} className={s <= 4 ? "text-yellow-400" : "text-slate-200 dark:text-slate-700"} fill="currentColor" />)}
                      <span className="text-[10px] font-bold text-text-secondary dark:text-gray-400 ml-2">{product.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex flex-col">
                    <span className="text-text-secondary dark:text-gray-500 text-xs line-through font-bold opacity-50">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
                    <span className="text-2xl font-bold text-accent">₹{product.price?.toLocaleString('en-IN')}</span>
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-text-primary dark:bg-white text-white dark:text-text-primary rounded-2xl flex items-center justify-center hover:bg-accent dark:hover:bg-accent transition-all shadow-xl shadow-slate-100 dark:shadow-none"
                  >
                    <ShoppingCart size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Scroll Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="h-1 w-12 bg-accent rounded-full"></div>
          <div className="h-1 w-4 bg-slate-200 rounded-full"></div>
          <div className="h-1 w-4 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;
