import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import SearchSuggestions from './SearchSuggestions';
import { products } from '../data/products';
import Button from './common/Button';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                    <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm">
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

      {/* MOBILE NAVBAR */}
      <div className={`fixed top-0 inset-x-0 z-50 md:hidden transition-all duration-500 ${scrolled ? 'h-16 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b dark:border-white/5' : 'h-20 bg-transparent'}`}>
        <div className="h-full px-5 flex items-center justify-between">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-[20px] font-black text-text-primary dark:text-white">Mobixa</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-500/10 text-text-primary dark:text-white"
            >
              <Search size={18} />
            </button>
            
            <button
              id="cart-icon-mobile"
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-500/10 text-text-primary dark:text-white"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-blue-500 text-white text-[8px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-text-primary dark:bg-white text-white dark:text-text-primary ml-1"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-[#09090b] z-[60] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 pt-24 space-y-8 flex-1">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary dark:text-gray-500">Navigation</p>
                  <div className="flex flex-col gap-4">
                    {nav.map(({ label, to }) => (
                      <Link 
                        key={label} 
                        to={to} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between group"
                      >
                        <span className="text-2xl font-black text-text-primary dark:text-white">{label}</span>
                        <ChevronRight size={20} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                    <Link 
                      to="/wishlist" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-2xl font-black text-text-primary dark:text-white">Wishlist</span>
                      <div className="flex items-center gap-2">
                        {wishlist.length > 0 && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                        <ChevronRight size={20} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="space-y-4 pt-8 border-t dark:border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary dark:text-gray-500">Settings</p>
                  <button 
                    onClick={() => { toggleDarkMode(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-4 text-text-primary dark:text-white font-bold"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </div>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-white/[0.02] border-t dark:border-white/5">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-white/10 shadow-sm">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold">{user.name?.charAt(0)}</div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-text-primary dark:text-white leading-none">{user.name}</p>
                        <p className="text-xs text-text-secondary dark:text-gray-500 mt-1">Active Session</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <Link 
                        to="/profile" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-white/5 border dark:border-white/10 rounded-xl text-xs font-bold"
                      >
                        <User size={14} /> Profile
                      </Link>
                      <Link 
                        to="/my-orders" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-white/5 border dark:border-white/10 rounded-xl text-xs font-bold"
                      >
                        Orders
                      </Link>
                      <button 
                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                        className="flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-xl text-xs font-bold"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl">Login to Mobixa</Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH PANEL */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 md:top-24 inset-x-0 z-[100] flex justify-center px-4"
          >
            <div className="w-full max-w-xl bg-white dark:bg-[#111] rounded-[24px] p-4 shadow-2xl border dark:border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Search size={20} className="text-text-secondary" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent outline-none text-lg font-medium dark:text-white"
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>
              <SearchSuggestions
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                query={searchQuery}
                setQuery={setSearchQuery}
                suggestions={filteredProducts}
                onSuggestionClick={(p) => {
                  navigate(`/product/${p.id}`);
                  setIsSearchOpen(false);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;