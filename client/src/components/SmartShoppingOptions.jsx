import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Tag, Star, ShoppingBag, ArrowRight } from 'lucide-react';

const cards = [
  {
    icon: Smartphone,
    title: 'Best Affordable Smartphones',
    description: 'Find top budget phones with the best performance and price',
    to: '/shop?filter=budget',
    accent: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    border: 'hover:border-blue-200 dark:hover:border-blue-500/30',
    arrowColor: 'group-hover:text-blue-500',
  },
  {
    icon: Tag,
    title: 'Explore Deals',
    description: 'Discover latest offers and discounts on electronics',
    to: '/shop?filter=deals',
    accent: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
    border: 'hover:border-violet-200 dark:hover:border-violet-500/30',
    arrowColor: 'group-hover:text-violet-500',
  },
  {
    icon: Star,
    title: 'Best Budget Brands',
    description: 'Browse trusted brands that offer value for money',
    to: '/shop?filter=brands',
    accent: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    border: 'hover:border-amber-200 dark:hover:border-amber-500/30',
    arrowColor: 'group-hover:text-amber-500',
  },
  {
    icon: ShoppingBag,
    title: 'Best Online Deals',
    description: 'Get the best prices available online in one place',
    to: '/shop?filter=online',
    accent: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    border: 'hover:border-emerald-200 dark:hover:border-emerald-500/30',
    arrowColor: 'group-hover:text-emerald-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const SmartShoppingOptions = () => {
  return (
    <section className="py-24 px-6 bg-bg-soft dark:bg-[#09090b] border-y border-border dark:border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 space-y-3"
        >
          <span className="label text-text-muted dark:text-gray-500 block">
            Smart Shopping
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-black tracking-tight text-text-primary dark:text-white leading-tight">
            Explore Smart Shopping Options
          </h2>
          <p className="text-[15px] text-text-secondary dark:text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">
            Find the best deals, brands, and budget-friendly smartphones in one place
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {cards.map(({ icon: Icon, title, description, to, accent, border, arrowColor }) => (
            <motion.div key={title} variants={itemVariants}>
              <Link
                to={to}
                className={[
                  'group flex flex-col gap-5 p-6 rounded-2xl',
                  'bg-white dark:bg-white/[0.03]',
                  'border border-border dark:border-white/[0.07]',
                  'shadow-card',
                  'cursor-pointer select-none',
                  'transition-all duration-300 ease-expo-out',
                  'hover:-translate-y-1.5 hover:shadow-card-hover',
                  border,
                ].join(' ')}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className="flex-1 space-y-1.5">
                  <h3 className="text-[15px] font-bold tracking-tight text-text-primary dark:text-white leading-snug">
                    {title}
                  </h3>
                  <p className="text-[13px] text-text-secondary dark:text-gray-400 font-medium leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Arrow CTA */}
                <div className={`flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-text-muted dark:text-gray-500 transition-colors duration-300 ${arrowColor}`}>
                  <span>Explore</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 ease-expo-out group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SmartShoppingOptions;
