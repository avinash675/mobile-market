import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Truck, Phone, Crosshair, Plus, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import StepIndicator from '../components/checkout/StepIndicator';
import OrderSummary from '../components/checkout/OrderSummary';
import Button from '../components/common/Button';
import AddressCard from '../components/checkout/AddressCard';
import MapAddressPicker from '../components/checkout/MapAddressPicker';

const AddressPage = () => {
  const { cart, checkoutData, updateCheckoutData, user } = useAppContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      localStorage.setItem('redirect_after_login', '/address');
      navigate('/login');
    }
  }, [user, navigate]);
  
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const saved = localStorage.getItem('mobixa_addresses');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedAddressId, setSelectedAddressId] = useState(checkoutData.address?.id || 1);
  const [showNewForm, setShowNewForm] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    type: 'Home'
  });
  const [errors, setErrors] = useState({});
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock data for fallback API
  const SIMULATED_ADDRESSES = [
    { label: "Andheri West, Mumbai, Maharashtra 400053", address: "Andheri West", city: "Mumbai", state: "Maharashtra", pincode: "400053" },
    { label: "Bandra Kurla Complex, Mumbai, Maharashtra 400051", address: "Bandra Kurla Complex", city: "Mumbai", state: "Maharashtra", pincode: "400051" },
    { label: "Koramangala, Bengaluru, Karnataka 560034", address: "Koramangala, Bengaluru", city: "Bengaluru", state: "Karnataka", pincode: "560034" },
    { label: "Hitech City, Hyderabad, Telangana 500081", address: "Hitech City", city: "Hyderabad", state: "Telangana", pincode: "500081" },
    { label: "Connaught Place, New Delhi, Delhi 110001", address: "Connaught Place", city: "New Delhi", state: "Delhi", pincode: "110001" },
    { label: "Salt Lake City, Kolkata, West Bengal 700091", address: "Sector 5, Salt Lake City", city: "Kolkata", state: "West Bengal", pincode: "700091" },
    { label: "Navrangpura, Ahmedabad, Gujarat 380009", address: "Navrangpura", city: "Ahmedabad", state: "Gujarat", pincode: "380009" }
  ];

  const fetchPincodeData = async (pincode) => {
    setIsFetchingPincode(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      
      if (data && data[0] && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setFormData(prev => ({
          ...prev,
          state: postOffice.State,
          city: postOffice.District
        }));
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.pincode;
          return newErrors;
        });
      } else {
        setErrors(prev => ({ ...prev, pincode: 'Invalid Pincode' }));
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, pincode: 'Failed to fetch location' }));
    } finally {
      setIsFetchingPincode(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    let error = '';

    if (name === 'phone') {
      value = value.replace(/\D/g, '').substring(0, 10);
      if (value.length > 0 && value.length < 10) error = 'Enter valid 10-digit phone number';
    } else if (name === 'pincode') {
      value = value.replace(/\D/g, '').substring(0, 6);
      if (value.length > 0 && value.length < 6) error = 'Enter valid 6-digit pincode';
    } else if (name === 'fullName') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'address') {
      value = value.replace(/[^a-zA-Z0-9\s,]/g, '');
      if (value.length > 2) {
        const filtered = SIMULATED_ADDRESSES.filter(a => a.label.toLowerCase().includes(value.toLowerCase()));
        setAddressSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else if (name === 'city' || name === 'state') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === 'pincode' && value.length === 6) {
      fetchPincodeData(value);
    }
  };

  const handleLocationAutoFill = () => {
    setIsLocating(true);
    
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Using a more robust reverse geocoding approach with addressdetails=1
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
              {
                headers: {
                  'Accept-Language': 'en-US,en;q=0.9',
                  'User-Agent': 'Mobixa-App'
                }
              }
            );
            
            const data = await response.json();
            
            if (data && data.address) {
              const addr = data.address;
              
              // Extracting exact components for high accuracy
              const road = addr.road || addr.suburb || addr.neighbourhood || '';
              const houseNumber = addr.house_number || '';
              const area = addr.suburb || addr.city_district || addr.neighbourhood || '';
              
              const formattedAddress = [houseNumber, road, area]
                .filter(Boolean)
                .join(', ') || data.display_name.split(',').slice(0, 2).join(', ');

              const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || '';
              const state = addr.state || '';
              const pincode = addr.postcode || '';

              // CRITICAL: Ensure we have at least a partial address and pincode
              if (formattedAddress && pincode) {
                setFormData({
                  ...formData,
                  address: formattedAddress,
                  city: city,
                  state: state,
                  pincode: pincode
                });
                
                // Clear any previous errors for these fields
                setErrors(prev => {
                  const newErrors = { ...prev };
                  delete newErrors.address;
                  delete newErrors.city;
                  delete newErrors.state;
                  delete newErrors.pincode;
                  return newErrors;
                });

                // Trigger city/state update from pincode if city/state were missing
                if (!city || !state) {
                  fetchPincodeData(pincode);
                }
              } else {
                throw new Error("Missing exact address or pincode");
              }
            } else {
              throw new Error("Invalid response from geocoding service");
            }
          } catch (err) {
            console.error("Geocoding Error:", err);
            alert("Could not detect exact address. Please enter details manually.");
          } finally {
            setIsLocating(false);
            setShowNewForm(true);
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          setIsLocating(false);
          let msg = "Location access denied.";
          if (error.code === error.TIMEOUT) msg = "Location request timed out.";
          if (error.code === error.POSITION_UNAVAILABLE) msg = "Location information is unavailable.";
          alert(msg);
        },
        options
      );
    } else {
      setIsLocating(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleMapSelection = (addressData) => {
    setFormData({
      ...formData,
      address: addressData.address || '',
      city: addressData.city || '',
      state: addressData.state || '',
      pincode: addressData.pincode || ''
    });
    setIsMapOpen(false);
    setShowNewForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalAddress;
    if (showNewForm) {
      if (Object.values(errors).some(e => e !== '') || !formData.fullName || !formData.phone || !formData.pincode || !formData.address) {
        alert("Please fix validation errors and fill all fields before submitting.");
        return;
      }
      finalAddress = { ...formData, id: Date.now() };
      const newAddresses = [...savedAddresses, finalAddress];
      setSavedAddresses(newAddresses);
      localStorage.setItem('mobixa_addresses', JSON.stringify(newAddresses));
      setSelectedAddressId(finalAddress.id);
    } else {
      finalAddress = savedAddresses.find(a => a.id === selectedAddressId);
    }
    
    if (!finalAddress) {
      alert("Please select or add an address to continue.");
      return;
    }
    
    updateCheckoutData({ address: finalAddress });
    navigate('/payment');
  };

  const handleDeleteAddress = (id) => {
    const newAddresses = savedAddresses.filter(a => a.id !== id);
    setSavedAddresses(newAddresses);
    localStorage.setItem('mobixa_addresses', JSON.stringify(newAddresses));
    if (selectedAddressId === id) {
      setSelectedAddressId(newAddresses.length > 0 ? newAddresses[0].id : null);
    }
  };

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-bgLight dark:bg-[#09090b] pt-24 pb-20 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 lg:pt-20">
        <StepIndicator currentStep="address" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Saved Addresses Section */}
            <div className="space-y-6">
               <div className="flex items-center justify-between mb-2 px-1">
                  <div>
                    <h2 className="text-2xl font-black text-primary dark:text-white tracking-tight">Select Delivery Address</h2>
                    <p className="text-xs text-secondary dark:text-gray-400 font-medium italic">Choose a saved location or add a new one.</p>
                  </div>
                  <Button 
                    onClick={handleLocationAutoFill}
                    variant="secondary"
                    className="flex items-center gap-2 px-5 py-3 text-[10px] group bg-white dark:bg-white/5 border border-border dark:border-white/10 shadow-sm hover:border-accent text-primary dark:text-white"
                  >
                    {isLocating ? (
                      <div className="w-3 h-3 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
                    ) : <Crosshair size={14} className="group-hover:rotate-90 transition-transform duration-500" />}
                    {isLocating ? 'Locating...' : 'Use Current Location'}
                  </Button>
               </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {savedAddresses.length > 0 ? savedAddresses.map((addr) => (
                    <AddressCard 
                      key={addr.id}
                      address={addr}
                      isSelected={selectedAddressId === addr.id && !showNewForm}
                      onSelect={(a) => {
                        setSelectedAddressId(a.id);
                        setShowNewForm(false);
                      }}
                      onDelete={() => handleDeleteAddress(addr.id)}
                    />
                 )) : (
                    <div className="md:col-span-2 py-8 text-center text-secondary dark:text-gray-400 border border-dashed border-border dark:border-white/10 rounded-[24px]">
                      No saved addresses yet
                    </div>
                 )}
                 
                   <motion.button
                   whileHover={{ y: -4, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)' }}
                   onClick={() => setShowNewForm(true)}
                   className={`
                      relative p-8 rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-300 min-h-[160px]
                      ${showNewForm ? 'border-accent bg-accent/5' : 'border-slate-200 dark:border-white/10 hover:border-accent/40 bg-white dark:bg-white/5 shadow-sm'}
                   `}
                 >
                    <div className={`p-4 rounded-full ${showNewForm ? 'bg-accent text-white' : 'bg-slate-100 dark:bg-white/10 text-secondary dark:text-gray-400'}`}>
                       <Plus size={24} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-primary dark:text-white">Add New Address</span>
                 </motion.button>
               </div>
            </div>

            {/* New Address Form */}
            <AnimatePresence>
              {showNewForm && (
                 <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-[#111] rounded-[40px] p-8 md:p-12 border border-border dark:border-white/5 shadow-premium overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-accent/10 text-accent rounded-2xl">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-primary dark:text-white tracking-tight">New Shipping Detail</h3>
                        <p className="text-[10px] text-secondary dark:text-gray-400 font-black uppercase tracking-widest">Enter specific delivery info</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsMapOpen(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-50 dark:bg-white/5 border border-border dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <Globe size={14} /> Open Map Picker
                    </button>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2 group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1 group-focus-within:text-accent transition-colors">Full Name</label>
                      <input 
                        required
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Avinash Goru"
                        className="w-full px-8 py-5 bg-slate-50 dark:bg-white/5 rounded-[24px] border-2 border-transparent font-bold text-primary dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-accent/40 transition-all outline-none"
                      />
                      {errors.fullName && <p className="text-red-500 text-[10px] ml-1">{errors.fullName}</p>}
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1 group-focus-within:text-accent transition-colors">Phone Number</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-accent transition-colors" />
                        <input 
                          required
                          type="tel" 
                          inputMode="numeric"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength={10}
                          placeholder="e.g. 9876543210"
                          className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-white/5 rounded-[24px] border-2 border-transparent font-bold text-primary dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-accent/40 transition-all outline-none"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[10px] ml-1">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2 group relative">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1 group-focus-within:text-accent transition-colors">Pincode</label>
                        {isFetchingPincode && <span className="text-[10px] text-accent animate-pulse font-bold mr-1">Fetching...</span>}
                      </div>
                      <input 
                        required
                        type="tel" 
                        inputMode="numeric"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        placeholder="xxxxxx"
                        className="w-full px-8 py-5 bg-slate-50 dark:bg-white/5 rounded-[24px] border-2 border-transparent font-bold text-primary dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-accent/40 transition-all outline-none"
                      />
                      {errors.pincode && <p className="text-red-500 text-[10px] ml-1">{errors.pincode}</p>}
                    </div>
                    <div className="md:col-span-2 space-y-2 group relative">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1 group-focus-within:text-accent transition-colors">Flat / House / Street</label>
                      <textarea 
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onFocus={() => { if (formData.address.length > 2) setShowSuggestions(true); }}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        rows="3"
                        placeholder="Start typing your address..."
                        className="w-full px-8 py-5 bg-slate-50 dark:bg-white/5 rounded-[24px] border-2 border-transparent font-bold text-primary dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-accent/40 transition-all outline-none resize-none"
                      ></textarea>
                      {errors.address && <p className="text-red-500 text-[10px] ml-1">{errors.address}</p>}
                      <AnimatePresence>
                        {showSuggestions && addressSuggestions.length > 0 && (
                          <motion.ul 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-20 top-[90px] left-0 right-0 mt-2 bg-white dark:bg-[#111] rounded-2xl border border-border dark:border-white/10 shadow-premium max-h-48 overflow-y-auto"
                          >
                            {addressSuggestions.map((sug, idx) => (
                              <li 
                                key={idx}
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, address: sug.address, city: sug.city, state: sug.state, pincode: sug.pincode }));
                                  setErrors(prev => {
                                    const newErrs = { ...prev };
                                    delete newErrs.address; delete newErrs.city; delete newErrs.state; delete newErrs.pincode;
                                    return newErrs;
                                  });
                                  setShowSuggestions(false);
                                }}
                                className="px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                              >
                                <span className="text-sm font-bold text-primary dark:text-white">{sug.label}</span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1 group-focus-within:text-accent transition-colors">City / District</label>
                      <input 
                        required
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Mumbai"
                        className="w-full px-8 py-5 bg-slate-50 dark:bg-white/5 rounded-[24px] border-2 border-transparent font-bold text-primary dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-accent/40 transition-all outline-none"
                      />
                      {errors.city && <p className="text-red-500 text-[10px] ml-1">{errors.city}</p>}
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1 group-focus-within:text-accent transition-colors">State</label>
                      <input 
                        required
                        type="text" 
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Maharashtra"
                        className="w-full px-8 py-5 bg-slate-50 dark:bg-white/5 rounded-[24px] border-2 border-transparent font-bold text-primary dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-accent/40 transition-all outline-none"
                      />
                      {errors.state && <p className="text-red-500 text-[10px] ml-1">{errors.state}</p>}
                    </div>
                    <div className="md:col-span-2 space-y-3 mt-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1">Save Address As</label>
                      <div className="flex flex-wrap gap-4">
                        {['Home', 'Work', 'Other'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, type }))}
                            className={`px-6 py-2.5 rounded-2xl text-[11px] uppercase tracking-wider font-bold transition-all border-2 ${formData.type === type ? 'border-accent bg-accent/10 text-accent ring-2 ring-accent/20' : 'border-slate-200 dark:border-white/10 text-secondary dark:text-gray-400 hover:border-slate-300 bg-white dark:bg-white/5 shadow-sm'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom CTA & Trust */}
            <div className="space-y-6">
              <Button onClick={handleSubmit} variant="primary" className="w-full py-6 text-sm flex items-center justify-center gap-4">
                Deliver to this Address <ChevronRight size={18} />
              </Button>

              <div className="flex items-center gap-4 p-8 bg-white dark:bg-white/[0.02] rounded-[32px] border border-border dark:border-white/5 shadow-sm">
                <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-xl">
                  <Truck className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-white">Free Shipping Guaranteed</p>
                  <p className="text-xs text-secondary dark:text-gray-400 font-medium">Mobixa Priority Logistics ensures safe, express delivery.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Summary */}
          <div className="lg:col-span-1">
            <OrderSummary 
              cart={cart} 
              coupon={checkoutData.coupon} 
              onApplyCoupon={(c) => updateCheckoutData({ coupon: c })} 
            />
          </div>
        </div>
      </main>

      <MapAddressPicker 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        onSelectAddress={handleMapSelection} 
      />
    </div>
  );
};

export default AddressPage;
