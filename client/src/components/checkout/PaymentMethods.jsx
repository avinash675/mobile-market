import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Landmark, Check, QrCode, Timer, Banknote } from 'lucide-react';
import Button from '../common/Button';
const PaymentMethods = ({ 
  selectedMethod, 
  onSelect, 
  selectedBank,
  onSelectBank,
  totalAmount = 0,
  onCompletePayment
}) => {
  const [bankSearch, setBankSearch] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [upiTab, setUpiTab] = useState('apps'); // 'apps' | 'qr'
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);
  const [verifiedUpiName, setVerifiedUpiName] = useState('');
  const [upiError, setUpiError] = useState('');

  useEffect(() => {
    if (selectedMethod === 'upi' && upiTab === 'qr') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedMethod, upiTab]);

  // Notify parent of validity changes
  useEffect(() => {
    if (selectedMethod === 'upi') {
      if (upiTab === 'qr') {
        onSelectBank('READY'); // Using bank as a proxy for readiness or we can add a new prop
      } else if (selectedUpiApp) {
        onSelectBank('READY');
      } else if (verifiedUpiName && !upiError) {
        onSelectBank('READY');
      } else {
        onSelectBank(null);
      }
    }
  }, [selectedMethod, upiTab, selectedUpiApp, verifiedUpiName, upiError, onSelectBank]);

  const handleUpiIdChange = async (val) => {
    setUpiId(val);
    setVerifiedUpiName('');
    setUpiError('');
    setSelectedUpiApp(null); // Deselect app if manual entry starts

    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (upiRegex.test(val)) {
      setIsVerifyingUpi(true);
      // Simulate API verification
      setTimeout(() => {
        setIsVerifyingUpi(false);
        setVerifiedUpiName('Avinash Goru'); // Mock name
      }, 1500);
    } else if (val.length > 5 && !val.includes('@')) {
      setUpiError('Invalid UPI format (e.g. user@upi)');
    }
  };

  const handleAppSelect = (appId) => {
    setSelectedUpiApp(appId);
    setUpiId('');
    setVerifiedUpiName('');
    setUpiError('');
  };

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', iconText: 'G', iconColor: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', borderActive: 'border-blue-600 dark:border-blue-500' },
    { id: 'phonepe', name: 'PhonePe', iconText: 'पे', iconColor: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10', borderActive: 'border-purple-600 dark:border-purple-500' },
    { id: 'paytm', name: 'Paytm', iconText: 'P', iconColor: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/10', borderActive: 'border-sky-600 dark:border-sky-500' }
  ];

  const banks = [
    { id: 'hdfc', name: 'HDFC Bank', color: '#1E3A8A' },
    { id: 'icici', name: 'ICICI Bank', color: '#F97316' },
    { id: 'sbi', name: 'SBI', color: '#0369A1' },
    { id: 'axis', name: 'Axis Bank', color: '#9D174D' },
    { id: 'kotak', name: 'KOTAK', color: '#EF4444' },
    { id: 'canara', name: 'Canara', color: '#0EA5E9' },
    { id: 'idbi', name: 'IDBI Bank', color: '#10B981' },
    { id: 'pnb', name: 'PNB', color: '#BE123C' },
    { id: 'bob', name: 'Bank of Baroda', color: '#F97316' }
  ];

  const filteredBanks = banks.filter(bank => 
    bank.name.toLowerCase().includes(bankSearch.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="mb-2">
        <h3 className="text-sm font-medium text-text-secondary dark:text-gray-400">
          Secure and fast payment options
        </h3>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'upi', label: 'UPI / QR', icon: Smartphone },
          { id: 'netbanking', label: 'Net Banking', icon: Landmark },
          { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
        ].map((method) => (
          <button
            key={method.id}
            onClick={() => { onSelect(method.id); onSelectBank(null); }}
            className={`p-6 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300 ${
              selectedMethod === method.id 
                ? 'border-blue-600 dark:border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-500 shadow-lg shadow-blue-500/20 scale-105' 
                : 'border-white/10 bg-white/5 dark:bg-white/5 text-text-secondary hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <method.icon size={16} />
            <span className="text-sm">{method.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-[#09090b] rounded-[16px] p-6 md:p-8 border border-border dark:border-white/10 shadow-sm min-h-[460px]">
        <AnimatePresence mode="wait">

          {selectedMethod === 'upi' && (
            <motion.div
              key="upi"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col py-4"
            >
              <h4 className="text-[16px] font-black text-text-primary dark:text-white mb-1 tracking-tight">
                Choose your preferred UPI app
              </h4>
              <p className="text-sm text-text-secondary dark:text-gray-400 mb-8 font-medium">
                Pay directly from your phone using any UPI app
              </p>

              <div className="flex bg-bg-soft dark:bg-white/5 p-1 rounded-xl w-fit mx-auto mb-8">
                <button 
                  onClick={() => setUpiTab('apps')} 
                  className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${upiTab === 'apps' ? 'bg-white dark:bg-[#09090b] shadow-sm text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'}`}
                >
                  Send to App
                </button>
                <button 
                  onClick={() => { setUpiTab('qr'); setTimeLeft(300); }} 
                  className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${upiTab === 'qr' ? 'bg-white dark:bg-[#09090b] shadow-sm text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'}`}
                >
                  <QrCode size={16} /> QR Code
                </button>
              </div>

              <AnimatePresence mode="wait">
                {upiTab === 'apps' ? (
                  <motion.div
                    key="apps"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    {/* UPI App Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      {upiApps.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => handleAppSelect(app.id)}
                          className={`
                            p-5 rounded-[20px] border transition-all duration-300 flex flex-col items-center gap-3.5 relative group
                            ${selectedUpiApp === app.id 
                              ? `${app.borderActive} bg-white dark:bg-[#09090b] shadow-lg scale-105 z-10` 
                              : 'border-border dark:border-white/10 hover:border-text-primary/20 dark:hover:border-white/20 bg-bg-soft dark:bg-white/[0.02] hover:scale-105 hover:bg-white dark:hover:bg-white/5 shadow-sm'
                            }
                          `}
                        >
                          <AnimatePresence>
                            {selectedUpiApp === app.id && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className={`absolute top-3 right-3 ${app.iconColor}`}
                              >
                                 <Check size={16} strokeWidth={3} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-[22px] font-black shadow-sm ${app.bg} ${app.iconColor}`}>
                            {app.iconText}
                          </div>
                          
                          <span className="text-[13px] font-bold text-text-primary dark:text-white tracking-wide">
                            {app.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="relative flex items-center py-4 mb-6">
                      <div className="flex-grow border-t border-border dark:border-white/10"></div>
                      <span className="flex-shrink-0 mx-4 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Or</span>
                      <div className="flex-grow border-t border-border dark:border-white/10"></div>
                    </div>

                    {/* Manual UPI ID Input */}
                    <div className="w-full">
                      <label className="label ml-1 mb-2">
                        Enter UPI ID manually
                      </label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          value={upiId}
                          onChange={(e) => handleUpiIdChange(e.target.value)}
                          placeholder="example@upi"
                          className={`form-input w-full pl-11 py-3.5 transition-all text-sm font-medium ${selectedUpiApp === null ? 'border-primary ring-1 ring-primary/20 bg-white dark:bg-[#09090b] shadow-md' : 'group-hover:border-text-primary/30 dark:group-hover:border-white/30'} ${upiError ? 'border-red-500 ring-red-500/20' : ''}`}
                        />
                        <Smartphone className={`absolute left-4 top-1/2 -translate-y-1/2 ${selectedUpiApp === null ? 'text-primary' : 'text-text-secondary'} transition-colors`} size={18} strokeWidth={2} />
                        
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {isVerifyingUpi && <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>}
                          {!isVerifyingUpi && verifiedUpiName && <Check size={18} className="text-success" />}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {upiError && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 font-bold mt-2 ml-1">
                            {upiError}
                          </motion.p>
                        )}
                        {!isVerifyingUpi && verifiedUpiName && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] text-success font-bold mt-2 ml-1 flex items-center gap-1">
                            <Check size={12} /> UPI ID belongs to: <span className="text-text-primary dark:text-white underline">{verifiedUpiName}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="w-full max-w-sm bg-white dark:bg-[#09090b] border border-border dark:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-lg transform transition-all relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                      
                      <h5 className="font-black text-xl text-text-primary dark:text-white tracking-tight mb-2">Scan & Pay</h5>
                      <p className="text-sm font-medium text-text-secondary dark:text-gray-400 mb-6 text-center">
                        Open <span className="text-text-primary dark:text-white font-bold">Google Pay</span>, <span className="text-text-primary dark:text-white font-bold">PhonePe</span>, or <span className="text-text-primary dark:text-white font-bold">Paytm</span> to scan
                      </p>
                      
                      <div className="relative p-3 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl mb-5 bg-white dark:bg-white/5 shadow-sm">
                        {totalAmount > 0 ? (
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@mobixa&pn=Mobixa&am=${totalAmount}&cu=INR`} 
                            alt="UPI QR Code" 
                            className="w-44 h-44 sm:w-52 sm:h-52 object-contain dark:invert"
                          />
                        ) : (
                          <div className="w-44 h-44 sm:w-52 sm:h-52 bg-gray-50 dark:bg-white/5 flex items-center justify-center animate-pulse rounded-xl">
                            <QrCode size={48} className="text-gray-300 dark:text-gray-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-4 py-2 rounded-full mb-8 shadow-sm">
                        <Timer size={16} className="animate-pulse" />
                        <span className="tracking-wide">
                          Valid for {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                      </div>

                      <Button 
                        variant="primary" 
                        onClick={onCompletePayment}
                        className="w-full !py-4 shadow-md !rounded-xl text-sm"
                      >
                        I have completed payment
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          {selectedMethod === 'netbanking' && (
            <motion.div
              key="netbanking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mb-8">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                  <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">?</div>
                </div>
                <input 
                  type="text"
                  value={bankSearch}
                  onChange={(e) => setBankSearch(e.target.value)}
                  placeholder="Search your bank..."
                  className="form-input pl-11"
                />
              </div>

              {filteredBanks.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredBanks.map((bank) => (
                      <button 
                        key={bank.id}
                        onClick={() => onSelectBank(bank.id)}
                        className={`
                          p-4 rounded-[12px] border transition-all duration-200 flex flex-col items-center gap-3 relative
                          ${selectedBank === bank.id 
                            ? 'border-text-primary dark:border-white bg-bg-soft dark:bg-white/5 shadow-sm' 
                            : 'border-border dark:border-white/10 hover:border-text-primary/20 dark:hover:border-white/20 bg-white dark:bg-[#09090b]'
                          }
                        `}
                      >
                        <AnimatePresence>
                          {selectedBank === bank.id && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              className="absolute top-2 right-2 text-text-primary dark:text-white"
                            >
                               <Check size={14} strokeWidth={3} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div className={`
                          w-12 h-12 rounded-[10px] flex items-center justify-center font-bold text-lg transition-all
                          ${selectedBank === bank.id 
                            ? 'bg-text-primary dark:bg-white text-white dark:text-[#09090b]' 
                            : 'bg-bg-soft dark:bg-white/5 text-text-primary dark:text-white'
                          }
                        `}>
                          <span>{bank.name.substring(0, 1)}</span>
                        </div>
                        
                        <span className="text-xs font-medium text-text-primary dark:text-white">
                          {bank.name}
                        </span>
                      </button>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-bg-soft dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-text-secondary">
                    !
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary dark:text-white">No banks found</h4>
                  <p className="text-xs text-text-secondary mt-1">Try another search term</p>
                </div>
              )}
            </motion.div>
          )}

          {selectedMethod === 'cod' && (
            <motion.div
              key="cod"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col py-8 items-center text-center"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-500">
                <Banknote size={40} />
              </div>
              <h4 className="text-[18px] font-black text-text-primary dark:text-white mb-2 tracking-tight">
                Cash on Delivery (COD)
              </h4>
              <p className="max-w-xs text-sm text-text-secondary dark:text-gray-400 mb-8 font-medium">
                Pay with cash when your order is delivered to your doorstep.
              </p>

              <div className="w-full max-w-sm p-5 border border-dashed border-border dark:border-white/10 rounded-2xl bg-bg-soft dark:bg-white/[0.02]">
                 <div className="flex items-center gap-3 text-text-primary dark:text-white font-bold text-sm">
                   <Check size={16} className="text-success" />
                   <span>Cash will be collected at delivery</span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PaymentMethods;
