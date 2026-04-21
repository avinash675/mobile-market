import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orders, setOrders] = useState([]);
  const [checkoutData, setCheckoutData] = useState({
    address: null,
    paymentMethod: 'upi',
    coupon: null
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🔥 SINGLE SOURCE OF TRUTH
  const USER_KEY = "mobixa_current_user";
  const USERS_DB_KEY = "mobixa_users";

  // LOAD DATA
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('mobixa_cart')) || [];
    const savedWishlist = JSON.parse(localStorage.getItem('mobixa_wishlist')) || [];
    const savedRecent = JSON.parse(localStorage.getItem('mobixa_recent')) || [];
    const savedUser = JSON.parse(localStorage.getItem(USER_KEY));
    const savedOrders = JSON.parse(localStorage.getItem('mobixa_orders')) || [];
    const savedDarkMode = JSON.parse(localStorage.getItem('mobixa_dark_mode')) || false;

    setCart(savedCart);
    setWishlist(savedWishlist);
    setRecentlyViewed(savedRecent);
    setUser(savedUser || null);
    setOrders(savedOrders);
    setIsDarkMode(savedDarkMode);
  }, []);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem('mobixa_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mobixa_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mobixa_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('mobixa_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mobixa_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 🛒 CART
  const addToCart = (product) => {
    if (product.stock === 0) return;

    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev
        .map(i =>
          i.id === id ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  // 📦 ORDERS & CHECKOUT
  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateCheckoutData = (updates) => {
    setCheckoutData(prev => ({ ...prev, ...updates }));
  };

  // ❤️ WISHLIST
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product];
    });
  };

  // 👤 AUTH SYSTEM (FIXED)

  const login = (userData) => {
    // ensure user exists in DB
    const usersDB = JSON.parse(localStorage.getItem(USERS_DB_KEY)) || [];
    const exists = usersDB.find(u => u.email === userData.email);

    if (!exists) {
      usersDB.push(userData);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersDB));
    }

    setUser(userData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    setIsCartOpen(false);
  };

  const updateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };

      // update current session
      localStorage.setItem(USER_KEY, JSON.stringify(updated));

      // update DB
      const usersDB = JSON.parse(localStorage.getItem(USERS_DB_KEY)) || [];
      const index = usersDB.findIndex(u => u.email === updated.email);

      if (index !== -1) {
        usersDB[index] = updated;
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersDB));
      }

      return updated;
    });
  };

  // 👀 RECENT
  const trackRecentlyViewed = useCallback((product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(i => i.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  }, []);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      wishlist, toggleWishlist,
      recentlyViewed, trackRecentlyViewed,
      isCartOpen, setIsCartOpen,
      searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen,
      user, login, logout, updateUser,
      isProcessingOrder, setIsProcessingOrder,
      orders, addOrder,
      checkoutData, updateCheckoutData,
      isDarkMode, toggleDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};