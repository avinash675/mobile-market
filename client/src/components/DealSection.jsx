import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function DealSection({ title, subtitle, products }) {
  return (
    <section className="py-16">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Featured Collection</span>
          <h2 className="text-4xl font-black text-textDark dark:text-white tracking-tighter">{title}</h2>
          {subtitle && <p className="text-textMuted dark:text-gray-400 mt-2">{subtitle}</p>}
        </div>
        <button className="text-accent hover:underline italic text-sm font-bold flex items-center gap-2">
          View All Collection <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {products.map((product, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default DealSection;
