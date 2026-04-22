import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Tag, Star, ShoppingBag, ArrowRight } from 'lucide-react';

const cards = [
  {
    icon: Smartphone,
    title: 'Best Affordable Smartphones',
    description: 'Find top budget phones with the best performance and price',
    to: '/shop?type=affordable',
    accent: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    border: 'hover:border-blue-200 dark:hover:border-blue-500/50',
    arrowColor: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    featured: true,
    badge: 'Popular',
  },
  {
    icon: Tag,
    title: 'Explore Deals',
    description: 'Discover latest offers and discounts on electronics',
    to: '/shop?type=deals',
    accent: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
    border: 'hover:border-violet-200 dark:hover:border-violet-500/50',
    arrowColor: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
  },
  {
    icon: Star,
    title: 'Best Budget Brands',
    description: 'Browse trusted brands that offer value for money',
    to: '/shop?type=budget',
    accent: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    border: 'hover:border-amber-200 dark:hover:border-amber-500/50',
    arrowColor: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
  },
  {
    icon: ShoppingBag,
    title: 'Best Online Deals',
    description: 'Get the best prices available online in one place',
    to: '/shop?type=online',
    accent: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    border: 'hover:border-emerald-200 dark:hover:border-emerald-500/50',
    arrowColor: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const SmartShoppingOptions = () => {
  return (
    <section className="relative py-28 px-6 bg-bg-soft dark:bg-[#09090b] border-y border-border dark:border-white/5 overflow-hidden z-0">
      {/* Subtle Premium Background Depth */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 space-y-3"
        >
          <span className="label text-text-muted dark:text-gray-400 block">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {cards.map(({ icon: Icon, title, description, to, accent, border, arrowColor, featured, badge }) => (
            <motion.div key={title} variants={itemVariants}>
              <Link
                to={to}
                className={[
                  'group flex flex-col gap-6 p-8 rounded-[24px]',
                  'bg-white dark:bg-[#121212]',
                  featured ? 'border-[1.5px] border-blue-500/30 dark:border-blue-500/40 shadow-blue-500/5' : 'border border-gray-100 dark:border-white/5',
                  'shadow-sm',
                  'cursor-pointer select-none relative overflow-hidden',
                  'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)]',
                  border,
                ].join(' ')}
              >
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] to-transparent dark:from-white/[0.02] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badge for Featured */}
                {featured && badge && (
                  <span className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg z-10">
                    {badge}
                  </span>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-inner relative z-10 ${accent}`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="flex-1 space-y-2 relative z-10">
                  <h3 className="text-[17px] font-bold tracking-tight text-text-primary dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-[14px] text-text-secondary dark:text-gray-400 font-medium leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Arrow CTA */}
                <div className={`flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-text-muted dark:text-gray-400 transition-colors duration-300 ${arrowColor} relative w-fit z-10 mt-2`}>
                  <span>Explore</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:scale-110"
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-current transition-all duration-300 ease-out group-hover:w-full opacity-30" />
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
