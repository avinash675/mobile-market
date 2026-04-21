import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Search,
  Sun,
  Moon,
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import SearchSuggestions from './SearchSuggestions';
import { products } from '../data/products';

const nav = [
  { label: 'Shop', to: '/shop' },
  { label: 'Deals', to: '/deals' },
  { label: 'About', to: '/about' },
];

const Navbar = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    user,
    logout,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    isDarkMode,
    toggleDarkMode,
  } = useAppContext();

  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bounce, setBounce] = useState(false);

  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  // 🔥 FIX: Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 FIX: Cart animation (state-based, NOT event-based)
  const [prevCartCount, setPrevCartCount] = useState(cartCount);

  useEffect(() => {
    if (cartCount > prevCartCount) {
      setBounce(true);
      setTimeout(() => setBounce(false), 300);
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  // 🔥 FIX: Outside click for user menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // 🔥 FIX: Optimized search
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return [];
    return products
      .filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery]);

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div
        className={`fixed top-0 inset-x-0 z-40 hidden md:block pointer-events-none transition-all duration-500 ${
          scrolled ? 'pt-3' : 'pt-6'
        }`}
      >
        <nav
          className={`max-w-6xl mx-auto pointer-events-auto rounded-[24px] h-[64px] flex items-center transition-all duration-500 ${
            scrolled
              ? 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg mx-4'
              : 'bg-transparent'
          }`}
        >
          <div className="px-6 w-full flex items-center justify-between gap-8">
            
            {/* LOGO */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-[20px] font-black text-text-primary dark:text-white hover:text-blue-500"
              >
                Mobixa
              </motion.div>
            </Link>

            {/* NAV LINKS */}
            <div className="flex items-center gap-8">
              {nav.map(({ label, to }) => (
                <Link key={label} to={to} className="group relative">
                  <span className="text-[13px] text-text-primary/70 dark:text-white/70 group-hover:text-blue-500">
                    {label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all" />
                </Link>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
              
              {/* SEARCH */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-500/10"
              >
                <Search size={16} />
              </button>

              {/* WISHLIST */}
              <Link to="/wishlist">
                <div className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-500/10">
                  <Heart size={18} />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              </Link>

              {/* CART */}
              <motion.button
                id="cart-icon-desktop"
                animate={
                  bounce
                    ? { scale: [1, 1.2, 1] }
                    : {}
                }
                transition={{ duration: 0.3 }}
                onClick={() => setIsCartOpen(true)}
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-500/10"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[9px] flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* USER */}
              <div className="relative" id="user-menu-container">
                {user ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="w-9 h-9 rounded-full overflow-hidden border"
                    >
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.style.display = 'none')}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-bold">
                          {user.name?.charAt(0) || 'A'}
                        </div>
                      )}
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute right-0 mt-3 w-52 bg-white dark:bg-[#111] border rounded-xl shadow-lg z-50"
                        >
                          <Link to="/profile" className="block px-4 py-2">
                            Profile
                          </Link>
                          <Link to="/my-orders" className="block px-4 py-2">
                            Orders
                          </Link>
                          <button
                            onClick={() => logout()}
                            className="w-full text-left px-4 py-2 text-red-500"
                          >
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to="/login">
                    <button className="px-4 py-2 bg-black text-white rounded-full text-sm">
                      Login
                    </button>
                  </Link>
                )}
              </div>

              {/* DARK MODE */}
              {toggleDarkMode && (
                <button onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* SEARCH PANEL */}
      {isSearchOpen && (
        <div className="fixed top-24 inset-x-0 z-30 flex justify-center">
          <div className="w-full max-w-xl bg-white dark:bg-black rounded-xl p-3">
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent outline-none"
            />
            <SearchSuggestions
              isOpen={isSearchOpen}
              query={searchQuery}
              suggestions={filteredProducts}
              onSuggestionClick={(p) => {
                navigate(`/product/${p.id}`);
                setIsSearchOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;