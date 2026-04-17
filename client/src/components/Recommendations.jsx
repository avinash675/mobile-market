import React from 'react';
import { motion } from 'framer-motion';
import { History, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';

const RecommendationSection = ({ title, products, type = 'ai', icon: Icon }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${type === 'ai' ? 'bg-text-primary/10 dark:bg-white/10 text-text-primary dark:text-white' : 'bg-text-secondary/10 dark:bg-white/5 text-text-secondary dark:text-gray-400'}`}>
              <Icon size={24} />
            </div>
            <div>
              <h2 className="heading-3">{title}</h2>
              <p className="label">
                {type === 'ai' ? 'Based on your unique style and preferences' : 'Pick up where you left off'}
              </p>
            </div>
          </div>
          
          <div className="hidden sm:flex gap-2">
            <button className="p-2 border border-border dark:border-white/10 rounded-full hover:bg-bg-soft dark:hover:bg-white/5 transition-colors">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <button className="p-2 border border-border dark:border-white/10 rounded-full hover:bg-bg-soft dark:hover:bg-white/5 transition-colors">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div 
              key={product.id}
              className="min-w-[280px] md:min-w-[320px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Recommendations = ({ currentProduct, recentlyViewed = [] }) => {
  // Mock AI Logic: Similar category or random popular items
  const mockRecommendations = [
    { id: 101, name: "iPhone 15 Pro", price: 109900, brand: "Apple", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400", condition: 'Like New', storage: '128GB', rating: 4.8 },
    { id: 102, name: "Samsung S24 Ultra", price: 119999, brand: "Samsung", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400", condition: 'Excellent', storage: '256GB', rating: 4.9 },
    { id: 103, name: "Google Pixel 8 Pro", price: 92999, brand: "Google", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400", condition: 'Like New', storage: '128GB', rating: 4.7 },
  ];

  return (
    <div className="bg-bg-soft dark:bg-[#09090b] border-t border-border dark:border-white/[0.05]">
      {/* Smart Recommendations */}
      <RecommendationSection 
        title="You May Also Like" 
        products={mockRecommendations} 
        type="ai" 
        icon={Sparkles} 
      />

      {/* Recently Viewed */}
      <RecommendationSection 
        title="Recently Viewed" 
        products={recentlyViewed.filter(p => !currentProduct || p.id !== currentProduct.id)} 
        type="history" 
        icon={History} 
      />
    </div>
  );
};

export default Recommendations;
