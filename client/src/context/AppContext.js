import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null); // { name: 'John Doe', avatar: '...' } or null
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [orders, setOrders] = useState(() => {
    // Initial load for guest or last user
    const savedUser = localStorage.getItem('mobixa_user');
    const userObj = savedUser ? JSON.parse(savedUser) : null;
    const key = userObj?.id ? `mobixa_orders_${userObj.id}` : 'mobixa_orders_guest';
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Load persistence on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mobixa_cart');
    const savedWishlist = localStorage.getItem('mobixa_wishlist');
    const savedRecent = localStorage.getItem('mobixa_recent');
    const savedUser = localStorage.getItem('mobixa_user');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save changes
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
    if (user) {
      localStorage.setItem('mobixa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mobixa_user');
    }
  }, [user]);

  useEffect(() => {
    const key = user?.id ? `mobixa_orders_${user.id}` : 'mobixa_orders_guest';
    localStorage.setItem(key, JSON.stringify(orders));
  }, [orders, user?.id]);

  // Sync orders when user changes (login/logout)
  useEffect(() => {
    const key = user?.id ? `mobixa_orders_${user.id}` : 'mobixa_orders_guest';
    const saved = localStorage.getItem(key);
    setOrders(saved ? JSON.parse(saved) : []);
  }, [user?.id]);

  const addToCart = (product) => {
    console.log(`🛒 Attempting to add to cart: ${product.name} (Stock: ${product.stock})`);
    
    // STRICT VALIDATION: Block if out of stock
    if (product.stock === 0 || product.stock === undefined) {
      console.error(`❌ CANNOT ADD to cart: ${product.name} is SOLD OUT.`);
      alert(`Sorry, ${product.name} is currently out of stock!`);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open drawer on add
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isWishlisted = prev.find((item) => item.id === product.id);
      if (isWishlisted) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const trackRecentlyViewed = useCallback((product) => {
    if (!product) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      return [product, ...filtered].slice(0, 10); // Keep last 10
    });
  }, []);

  const addOrder = useCallback((order) => {
    setOrders(prev => {
      // Ensure no duplicates by ID (prevention for React key warnings)
      const filtered = prev.filter(o => o.id !== order.id);
      return [order, ...filtered];
    });
  }, []);

  const [checkoutData, setCheckoutData] = useState({
    address: null,
    paymentMethod: 'upi',
    coupon: null
  });

  const updateCheckoutData = (updates) => {
    setCheckoutData(prev => ({ ...prev, ...updates }));
  };

  const getDeliveryTime = (state, city) => {
    if (!state && !city) return "2-4 Days";
    const s = (state || '').toLowerCase();
    const c = (city || '').toLowerCase();
    if (c === "hyderabad" || c.includes("mumbai") || c.includes("bengaluru") || c.includes("delhi")) return "1-2 Days";
    if (s.includes("telangana") || s.includes("maharashtra") || s.includes("karnataka") || s.includes("delhi")) return "2-3 Days";
    return "4-7 Days";
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      wishlist, toggleWishlist,
      recentlyViewed, trackRecentlyViewed,
      isCartOpen, setIsCartOpen,
      searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen,
      checkoutData, updateCheckoutData,
      getDeliveryTime,
      orders, addOrder,
      user, 
      login: (userData) => {
        setUser(userData);
        localStorage.setItem('mobixa_user', JSON.stringify(userData));
      }, 
      logout: () => {
        setUser(null);
        localStorage.removeItem('mobixa_user');
      },
      updateUser: (updates) => {
        setUser(prev => {
          const updated = { ...prev, ...updates };
          
          // 1. Update current session
          localStorage.setItem('mobixa_user', JSON.stringify(updated));
          
          // 2. Sync to the permanent user database array
          try {
            const usersDBStr = localStorage.getItem('mobixa_users');
            if (usersDBStr) {
               const usersDB = JSON.parse(usersDBStr);
               const index = usersDB.findIndex(u => u.email === updated.email);
               if (index !== -1) {
                  usersDB[index] = updated;
                  localStorage.setItem('mobixa_users', JSON.stringify(usersDB));
               }
            }
          } catch(err) {
            console.error("Failed to sync user to DB", err);
          }
          
          return updated;
        });
      },
      isProcessingOrder,
      setIsProcessingOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
