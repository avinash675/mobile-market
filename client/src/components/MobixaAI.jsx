import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { products } from '../data/products';

const MobixaAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello 👋 Welcome to Mobixa. I’ll help you find the perfect mobile. To get started, what’s your budget range?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0); // 0: Budget, 1: Usage, 2: Recommendations
  const [userPrefs, setUserPrefs] = useState({ budget: null, usage: null });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const STRICTURE_MSG = "I can assist only with finding the best mobile phones on Mobixa 😊";

  const isUnrelated = (text) => {
    const forbidden = ["code", "programming", "movie", "film", "history", "politics", "health", "advice", "weather", "news"];
    return forbidden.some(word => text.toLowerCase().includes(word));
  };

  const parseBudget = (text) => {
    const match = text.replace(/,/g, '').match(/\d+/);
    return match ? parseInt(match[0]) : null;
  };

  const getRecommendations = (budget, usage) => {
    let filtered = products.filter(p => p.price <= budget);
    
    // Fallback if budget is too low
    if (filtered.length === 0) {
      filtered = products.filter(p => p.price <= budget + 10000).slice(0, 5);
    }

    // Sort or filter by usage
    if (usage === "Gaming") {
      filtered = filtered.sort((a, b) => (b.category === "Flagship" ? 1 : -1));
    } else if (usage === "Camera") {
      filtered = filtered.filter(p => p.brand === "Apple" || p.brand === "Samsung" || p.brand === "Google" || p.category === "Flagship");
    } else if (usage === "Battery") {
      filtered = filtered.filter(p => p.name.includes("M") || p.name.includes("Max") || p.price < 30000); // Heuristic
    }

    return filtered.slice(0, 4); // Exact 3-4 as requested
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input.trim().toLowerCase();
    const rawInput = input;
    setInput("");

    // Detect Greeting
    if (currentInput === "hi" || currentInput === "hello") {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "Hello 👋 Welcome to Mobixa. I’ll help you find the perfect mobile.\n\nTo get started, what’s your budget range?", isBot: true }]);
        setStep(0);
      }, 600);
      return;
    }

    // Rule check
    if (isUnrelated(currentInput)) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: STRICTURE_MSG, isBot: true }]);
      }, 600);
      return;
    }

    // Logic Flow
    if (step === 0) {
      const budget = parseBudget(rawInput);
      if (!budget) {
        setTimeout(() => {
          setMessages(prev => [...prev, { id: Date.now() + 1, text: "I need a budget range to help you. What's your budget?", isBot: true }]);
        }, 600);
      } else {
        setUserPrefs(prev => ({ ...prev, budget }));
        setStep(1);
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            text: "Great choice 👍\n\nWhat are you primarily looking for?", 
            isBot: true,
            isOptions: true 
          }]);
        }, 600);
      }
    } else if (step === 1) {
      processUsage(rawInput);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "Would you like a comparison or more options?", isBot: true }]);
        setStep(0);
      }, 600);
    }
  };

  const processUsage = (usage) => {
    const validUsages = ["Camera", "Gaming", "Battery", "All-round performance"];
    const normalizedUsage = validUsages.find(u => usage.toLowerCase().includes(u.toLowerCase())) || "All-round performance";
    
    setUserPrefs(prev => ({ ...prev, usage: normalizedUsage }));
    setStep(2);

    setTimeout(() => {
      const recs = getRecommendations(userPrefs.budget, normalizedUsage);
      const botMsg = { 
        id: Date.now() + 1, 
        text: `Based on your budget and preference, here are the best options:`,
        isBot: true,
        recs: recs
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] sm:w-[380px] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 flex flex-col overflow-hidden glass-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-900 dark:bg-black z-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-[16px]">📱</span>
                </div>
                <h2 className="text-white font-semibold text-[18px] tracking-tight m-0">
                  Mobixa Assistant
                </h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:rotate-90 transition-transform duration-300 opacity-80 hover:opacity-100 p-1"
                aria-label="Close Chatbot"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50 dark:bg-slate-950/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.isBot 
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm border border-gray-100 dark:border-white/5' 
                        : 'bg-primary dark:bg-cyan-600 text-white rounded-tr-none shadow-md'
                    }`}
                  >
                    {msg.text}

                    {msg.isOptions && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {["📸 Camera", "🎮 Gaming", "🔋 Battery", "⚖️ All-round performance"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => processUsage(opt.split(/ (.+)/)[1])}
                            className="p-2 text-xs bg-slate-50 dark:bg-slate-700 hover:bg-cyan-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-white/10 rounded-lg transition-colors text-slate-700 dark:text-white text-left"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.recs && (
                      <div className="mt-4 space-y-3">
                        {msg.recs.map((phone, idx) => (
                          <div key={phone.id} className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-white/5">
                            <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                              <span>📱</span> {phone.name}
                            </p>
                            <p className="text-cyan-600 dark:text-cyan-400 font-bold text-xs mt-1">
                              💰 ₹{phone.price.toLocaleString()}
                            </p>
                            <div className="text-[11px] mt-2 space-y-1 text-slate-500 dark:text-slate-400">
                              <p>⚡ {phone.ram}/{phone.storage}, {phone.condition} Condition</p>
                              <p>✅ Best for {userPrefs.usage || "everything"}</p>
                            </div>
                          </div>
                        ))}
                        <button 
                         onClick={() => {
                           setMessages(prev => [...prev, { id: Date.now(), text: "Do you want camera-focused phones or gaming ones?", isBot: true }]);
                           setStep(1);
                         }}
                         className="w-full py-2 text-[11px] text-cyan-600 font-bold hover:underline"
                        >
                          Do you want me to show more options?
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your budget..."
                  className="flex-1 bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-primary dark:bg-cyan-600 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg shadow-cyan-500/10"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-white text-slate-900 rotate-90' : 'bg-primary dark:bg-cyan-600 text-white'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default MobixaAI;
