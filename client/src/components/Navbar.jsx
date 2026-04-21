import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, User, X, Sun, Moon, Home, ShoppingBag } from 'lucide-react';


import { useAppContext } from '../context/AppContext';
import SearchSuggestions from './SearchSuggestions';

import { products } from '../data/products';

const nav = [
  { label: 'Shop',   to: '/shop' },
  { label: 'Deals',  to: '/deals' },
  { label: 'About',  to: '/about' },
];

const Navbar = () => {
  const {
    cart, wishlist, setIsCartOpen, user, logout,
    searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen,
    isDarkMode, toggleDarkMode,
  } = useAppContext();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  console.log("Navbar user data:", user);
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <div className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:block pointer-events-none ${
        scrolled ? 'pt-2 md:pt-3' : 'pt-4 md:pt-6'
      }`}>
        <nav className={`max-w-6xl mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[24px] h-[64px] flex items-center ${
          scrolled 
            ? 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5 mx-4 md:mx-auto' 
            : 'bg-transparent border-transparent shadow-none'
        }`}>
          <div className="px-6 w-full flex items-center justify-between gap-8">
            
            {/* Logo */}
            <Link to="/">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-[20px] font-black tracking-tight text-text-primary dark:text-white flex-shrink-0 cursor-pointer transition-colors hover:text-blue-500 duration-300"
              >
                Mobixa
              </motion.div>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-8">
              {nav.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="relative group py-2"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-[13px] font-medium text-text-primary/70 dark:text-white/70 group-hover:text-blue-500 transition-colors duration-300 ease-in-out cursor-pointer"
                  >
                    {label}
                  </motion.span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              
              {/* Desktop Search Trigger */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-500/10 transition-colors duration-300 text-text-primary dark:text-white"
              >
                <Search size={16} strokeWidth={2} className="group-hover:text-blue-500" />
              </motion.button>

              {/* Wishlist */}
              <Link to="/wishlist">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-500/10 transition-colors duration-300 text-text-primary dark:text-white"
                  aria-label="Wishlist"
                >
                  <Heart size={18} strokeWidth={1.5} className={wishlist.length > 0 ? 'fill-text-primary text-text-primary dark:fill-white dark:text-white' : ''} />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-white/70 dark:border-[#09090b]/70" />
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-500/10 transition-colors duration-300 text-text-primary dark:text-white"
                aria-label="Cart"
              >
                <ShoppingCart size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <motion.span 
                    key={cartCount}
                    initial={{ scale: 0.5, y: -5 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              <div className="w-[1px] h-4 mx-1.5 bg-border dark:bg-white/10" />

              {/* User / Auth */}
              <div className="relative" id="user-menu-container">
                {user ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500/10 transition-colors duration-300 text-text-primary dark:text-white overflow-hidden border border-blue-500/20"
                      aria-label="Account Menu"
                    >
                      {user.profileImage ? (
                        <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-black italic">
                          {user.name?.charAt(0) || 'A'}
                        </div>
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <>
                          {/* Invisible backdrop for outside click */}
                          <div 
                            className="fixed inset-0 z-[-1]" 
                            onClick={() => setIsUserMenuOpen(false)} 
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute right-0 mt-3 w-56 glass-panel overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl z-50 rounded-[20px]"
                          >
                            <div className="p-4 border-b border-white/10 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5">Signed in as</p>
                              <p className="text-sm font-bold text-text-primary dark:text-white truncate">{user.name}</p>
                            </div>
                            <div className="p-2">
                              <Link 
                                to="/profile" 
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[13px] font-bold text-text-primary dark:text-white group"
                              >
                                <User size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                Profile Settings
                              </Link>
                              <Link 
                                to="/my-orders" 
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[13px] font-bold text-text-primary dark:text-white group mt-1"
                              >
                                <ShoppingBag size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                My Orders
                              </Link>

                              <button
                                onClick={() => { logout(); setIsUserMenuOpen(false); }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-error/10 transition-colors text-[13px] font-bold text-error group mt-1"
                              >
                                <div className="w-4 h-4 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
                                  <motion.div whileHover={{ x: 2 }}>→</motion.div>
                                </div>
                                Sign Out
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-full bg-text-primary dark:bg-white text-white dark:text-[#09090b] text-[12px] font-black uppercase tracking-widest hover:opacity-90 transition-all border border-transparent dark:border-white/10"
                    >
                      Login / Signup
                    </motion.button>
                  </Link>
                )}
              </div>
              
              {/* Dark mode */}
              {toggleDarkMode && (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: isDarkMode ? 45 : -45 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-500/10 transition-colors duration-300 text-text-primary dark:text-white"
                >
                  {isDarkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
                </motion.button>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* --- DESKTOP SEARCH EXPANSION --- */}
      {isSearchOpen && (
        <div className="fixed top-24 inset-x-0 z-30 hidden md:flex justify-center pointer-events-none px-4">
          <div className="w-full max-w-xl pointer-events-auto bg-white/70 dark:bg-[#09090b]/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-[24px] p-2 transition-all duration-300">
             <div className="flex items-center gap-3 px-4 py-3 bg-white/50 dark:bg-black/20 rounded-[16px]">
               <Search size={16} className="text-text-secondary" />
               <input
                 autoFocus
                 type="text"
                 placeholder="Search products..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="bg-transparent border-none outline-none text-[15px] w-full text-text-primary dark:text-white font-medium placeholder:text-text-secondary/60"
               />
               <button onClick={() => setIsSearchOpen(false)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                 <X size={14} className="text-text-secondary" />
               </button>
             </div>
             <SearchSuggestions
               isOpen={isSearchOpen}
               onClose={() => setIsSearchOpen(false)}
               query={searchQuery}
               suggestions={searchQuery.length > 0
                 ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
                 : []
               }
               onSuggestionClick={(product) => { 
                 setIsSearchOpen(false); 
                 setSearchQuery(''); 
                 if (product && product.id) {
                   navigate(`/product/${product.id}`); 
                 }
               }}
             />
          </div>
        </div>
      )}


      {/* --- MOBILE TOP HEADER (Logo only) --- */}
      <div className={`fixed top-0 inset-x-0 z-20 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none px-6 pt-6 flex justify-between items-start ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl h-20 shadow-sm border-b border-white/10 dark:border-white/5' 
          : 'bg-gradient-to-b from-white dark:from-[#09090b] to-transparent h-24'
      }`}>
        <Link to="/" className={`text-[24px] font-black tracking-tight text-text-primary dark:text-white pointer-events-auto transition-all duration-500 ${
          scrolled ? 'scale-90 origin-left -translate-y-1' : ''
        }`}>
          Mobixa
        </Link>
        {toggleDarkMode && (
          <button
            onClick={toggleDarkMode}
            className={`w-10 h-10 flex items-center justify-center rounded-full pointer-events-auto transition-all duration-500 ${
              scrolled 
                ? 'bg-transparent shadow-none border-none' 
                : 'bg-white/70 dark:bg-[#09090b]/70 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm'
            } text-text-primary dark:text-white`}
          >
            {isDarkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>
        )}
      </div>

      {/* --- MOBILE BOTTOM FLOATING NAVBAR --- */}
      <div className="fixed bottom-6 inset-x-0 z-40 px-4 md:hidden pointer-events-none flex justify-center">
        <div className="pointer-events-auto bg-white/70 dark:bg-[rgba(20,20,20,0.7)] backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] rounded-full px-5 py-3.5 flex items-center gap-7 transition-all duration-300">
          
          <Link to="/" className="flex flex-col items-center gap-1 text-text-primary dark:text-white hover:opacity-70 active:scale-95 transition-all">
            <Home size={22} strokeWidth={1.5} />
          </Link>

          <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white active:scale-95 transition-all">
            <Search size={22} strokeWidth={1.5} />
          </button>

          <button onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white active:scale-95 transition-all">
            <ShoppingCart size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <motion.span 
                key={cartCount}
                initial={{ scale: 0.5, y: -5 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute -top-1 -right-1.5 w-4 h-4 bg-text-primary dark:bg-white text-white dark:text-[#09090b] text-[9px] font-bold flex items-center justify-center rounded-full border border-white dark:border-[#141414]"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          <Link to="/wishlist" className="relative flex flex-col items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white active:scale-95 transition-all">
            <Heart size={22} strokeWidth={1.5} className={wishlist.length > 0 ? 'fill-text-primary text-text-primary dark:fill-white dark:text-white' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#141414]" />
            )}
          </Link>

          <div className="relative">
            {user ? (
              <>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex flex-col items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white active:scale-95 transition-all"
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-blue-500/20" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black italic flex items-center justify-center">
                      {user.name?.charAt(0) || 'A'}
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bottom-14 right-0 w-48 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-[20px] overflow-hidden z-40"
                    >
                      <div className="p-3 border-b border-white/10 dark:border-white/5">
                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{user.name}</p>
                      </div>
                      <div className="p-1.5 flex flex-col gap-1">
                        <Link 
                          to="/profile" 
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[12px] font-bold text-text-primary dark:text-white"
                        >
                          <User size={14} className="text-gray-500 dark:text-gray-400" /> Profile
                        </Link>
                        <Link 
                          to="/my-orders" 
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[12px] font-bold text-text-primary dark:text-white"
                        >
                          <ShoppingBag size={14} className="text-gray-500 dark:text-gray-400" /> My Orders
                        </Link>

                        <button
                          onClick={() => { logout(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-error/10 text-[12px] font-bold text-error"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link to="/login" className="flex flex-col items-center gap-1 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white active:scale-95 transition-all">
                <User size={22} strokeWidth={1.5} />
              </Link>
            )}
          </div>

        </div>
      </div>

    </>
  );
};

export default Navbar;
