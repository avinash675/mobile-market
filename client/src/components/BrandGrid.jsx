import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';

const brands = [
  { 
    name: 'Apple', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  { 
    name: 'Samsung', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  },
  { 
    name: 'OnePlus', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/OnePlus_logo.svg',
  },
  { 
    name: 'Xiaomi', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg',
  },
  { 
    name: 'Vivo', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Vivo_logo.svg',
  },
  { 
    name: 'Realme', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Realme-logo.svg',
  },
];

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
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function BrandGrid() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-7xl mx-auto px-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-sm md:gap-md"
    >
      {brands.map((brand, i) => (
        <motion.div key={i} variants={itemVariants}>
          <Card 
            padding="lg"
            className="flex flex-col items-center justify-center gap-md cursor-pointer group"
          >
            <div className="h-12 w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
              />
            </div>
            <span className="text-caption font-bold text-secondary uppercase tracking-widest group-hover:text-accent transition-colors">
              {brand.name}
            </span>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default BrandGrid;
