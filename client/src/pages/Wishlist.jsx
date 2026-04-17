import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, HeartOff, ChevronLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import iphoneImg from '../assets/images/iphone.png';

const ease = [0.16, 1, 0.3, 1];

const WishlistImage = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src || iphoneImg);
  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => imgSrc !== iphoneImg && setImgSrc(iphoneImg)}
      className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700"
      loading="lazy"
    />
  );
};

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useAppContext();

  return (
    <div className="min-h-screen bg-bgLight dark:bg-base-950 pt-32 pb-20">

      <main className="pb-24 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-14"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-textMuted dark:text-white/40 hover:text-textDark dark:hover:text-white font-bold text-sm mb-6 group transition-colors duration-200"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Store
          </Link>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-5xl font-black text-textDark dark:text-white tracking-tightest mb-2">
                Wishlist
              </h1>
              <p className="text-textMuted dark:text-white/40 font-medium">
                {wishlist.length > 0
                  ? `${wishlist.length} ${wishlist.length === 1 ? 'device' : 'devices'} saved`
                  : 'No items saved yet'}
              </p>
            </div>
            {wishlist.length > 0 && (
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-2xl px-4 py-2 shadow-sm">
                <Heart size={14} className="text-red-500" fill="currentColor" />
                <span className="text-[10px] font-black text-textDark dark:text-white uppercase tracking-widest">
                  {wishlist.length}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="bg-white dark:bg-slate-900 rounded-[40px] p-20 flex flex-col items-center justify-center text-center shadow-card dark:shadow-none border border-gray-100 dark:border-white/5"
          >
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-[28px] flex items-center justify-center text-red-400 mb-8">
              <HeartOff size={36} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-black text-textDark dark:text-white mb-3 tracking-tight">
              Nothing saved yet
            </h2>
            <p className="text-textMuted dark:text-white/40 max-w-sm mb-8 leading-relaxed font-medium text-sm">
              Tap the heart icon on any product to save it here for later.
            </p>
            <Link to="/">
              <Button size="md" className="px-10">Explore Products</Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.07 } }
            }}
          >
            <AnimatePresence mode="popLayout">
              {wishlist.map((product) => (
                <motion.article
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, ease }}
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-slate-900 rounded-[24px] border border-gray-100/80 dark:border-white/5 shadow-card hover:shadow-card-hover dark:shadow-none transition-all duration-500 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="aspect-square bg-gray-50 dark:bg-slate-800 p-8 relative overflow-hidden">
                    <WishlistImage src={product.image} alt={product.name} />

                    {/* Remove button */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-4 right-4 w-9 h-9 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 shadow-sm transition-all duration-200"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={15} fill="currentColor" />
                    </motion.button>

                    {/* Discount */}
                    {product.discount && (
                      <span className="absolute top-4 left-4 bg-textDark dark:bg-white text-white dark:text-textDark text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="text-[10px] font-black text-textLight dark:text-white/30 uppercase tracking-[0.2em] mb-1">
                      {product.brand}
                    </p>
                    <h3 className="font-black text-textDark dark:text-white text-sm mb-1 line-clamp-1 tracking-tight group-hover:text-accent transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-textLight dark:text-white/30 font-bold uppercase tracking-widest mb-5">
                      {product.storage} · {product.condition}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-black text-textDark dark:text-white tracking-tightest">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-[9px] font-black bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30 px-2 py-1 rounded-lg uppercase tracking-widest">
                        Save {product.discount}%
                      </span>
                    </div>

                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full !py-3 group"
                    >
                      <ShoppingCart size={14} strokeWidth={2.5} />
                      Add to Cart
                    </Button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
