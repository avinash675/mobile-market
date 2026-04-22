import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const USER_KEY = "mobixa_current_user";
  const USERS_DB_KEY = "mobixa_users";

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mobixa_cart')) || [];
    } catch (e) { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mobixa_wishlist')) || [];
    } catch (e) { return []; }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY)) || null;
    } catch (e) { return null; }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mobixa_recent')) || [];
    } catch (e) { return []; }
  });

  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mobixa_orders')) || [];
    } catch (e) { return []; }
  });
  const [checkoutData, setCheckoutData] = useState({
    address: null,
    paymentMethod: 'upi',
    coupon: null
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('mobixa_dark_mode')) || false;
  });

  const [loading, setLoading] = useState(true);

  // Initial Sync Logic (Handled by lazy initialization above)
  useEffect(() => {
    setLoading(false);
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

  // 🚚 DELIVERY ESTIMATION
  const getDeliveryTime = useCallback((state, city) => {
    if (!state || !city) return '3-5 Business Days';
    const fastStates = ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Telangana', 'Gujarat', 'West Bengal'];
    if (fastStates.includes(state)) return '1-2 Business Days';
    return '3-5 Business Days';
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-[#09090b] z-[9999]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-500 animate-pulse">Initializing Mobixa...</p>
        </div>
      </div>
    );
  }

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
      isDarkMode, toggleDarkMode,
      getDeliveryTime
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