import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SafeImage from '../components/ui/SafeImage';
import {
  ChevronRight, ShieldCheck, Truck, RotateCcw,
  ShoppingCart, Heart, Star
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import Recommendations from '../components/Recommendations';
import ImageGallery from '../components/ImageGallery';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const {
    addToCart,
    toggleWishlist,
    wishlist,
    trackRecentlyViewed,
    recentlyViewed
  } = useAppContext();

  // FIX: String-safe lookup using standardized descriptive IDs
  const product = products.find(p => String(p.id).toLowerCase() === String(id).toLowerCase());
  
  const [selectedVariant, setSelectedVariant] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState(null);

  // --- Reviews & Photos Logic ---
  const [reviewsList, setReviewsList] = React.useState([]);
  const [customerPhotos, setCustomerPhotos] = React.useState([]);
  const [selectedPhoto, setSelectedPhoto] = React.useState(null);
  const [newReview, setNewReview] = React.useState({ rating: 5, comment: "" });

  // Initialize dynamic content
  React.useEffect(() => {
    if (product) {
      setReviewsList(product.customerContent?.reviews || []);
      setCustomerPhotos(product.customerContent?.photos || []);
      
      const defaultVariant = product.variants?.[0] || { 
        label: `${product.ram}/${product.storage}`, 
        price: product.price, 
        stock: product.stock 
      };
      setSelectedVariant(defaultVariant);

      if (product.colors?.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      trackRecentlyViewed(product);
      window.scrollTo(0, 0);
    }
  }, [product, trackRecentlyViewed]);

  // FIX: Explicit Product Not Found screen to prevent "Something went wrong"
  if (!product) {
    return (
      <div className="min-h-screen bg-bgLight dark:bg-[#09090b] flex flex-col items-center justify-center pt-24 px-6 text-center">
        <div className="w-24 h-24 bg-gray-50 dark:bg-white/[0.02] rounded-full flex items-center justify-center mb-6 border border-border dark:border-white/5">
          <ShoppingCart size={40} className="text-text-secondary opacity-50" />
        </div>
        <h2 className="text-3xl font-black text-text-primary dark:text-white mb-4 tracking-tight">Product Not Found</h2>
        <p className="text-text-secondary dark:text-gray-400 mb-8 max-w-sm font-medium">The device you are looking for might have been moved or is no longer available in our catalog.</p>
        <Link to="/shop">
          <Button variant="primary" className="!px-10 !py-4 shadow-xl">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    const review = {
      id: Date.now(),
      user: "You",
      rating: newReview.rating,
      comment: newReview.comment,
      date: "Just now"
    };
    setReviewsList([review, ...reviewsList]);
    setNewReview({ rating: 5, comment: "" });
  };

  const currentPrice = selectedVariant?.price || product.price;
  const stock = selectedVariant?.stock ?? 0;

  // Use the new model-specific 'images' array (High-Priority Fix)
  const productGallery = product.images || [product.image];
  const activeGallery = selectedColor ? [selectedColor.image, ...productGallery.filter(img => img !== selectedColor.image)] : productGallery;

  return (
    <div className="min-h-screen bg-bgLight dark:bg-[#09090b] pt-28 lg:pt-40 pb-32 transition-colors duration-300">

      {/* Breadcrumb */}
      <div className="container-custom pt-8 pb-10 text-sm text-text-secondary dark:text-gray-400 flex gap-2">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-primary dark:hover:text-white transition-colors">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-black dark:text-white font-bold">{product.name}</span>
      </div>

      <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Image - Passing the new gallery array */}
        <div className="lg:col-span-6">
          <ImageGallery images={activeGallery} name={product.name} />
        </div>

        {/* Details */}
        <div className="lg:col-span-6 space-y-8">

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest rounded-full">
              Mobixa Certified {product.condition}
            </span>

            {stock > 0 ? (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20">
                Sold Out
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-text-primary dark:text-white mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
               <span className="text-sm font-bold text-text-secondary dark:text-gray-300">
                {product.rating} <span className="opacity-60 ml-1 dark:text-gray-400">({product.reviews} reviews)</span>
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
             <div className="flex flex-col">
                {product.originalPrice && (
                  <span className="text-sm line-through text-text-secondary/40 dark:text-gray-400/60 font-bold mb-1">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-4xl font-black text-text-primary dark:text-white leading-none">
                  ₹{currentPrice.toLocaleString()}
                </span>
             </div>
             {product.discount && (
               <span className="px-3 py-1.5 bg-emerald-500 text-white text-[11px] font-black uppercase tracking-wider rounded-lg mb-0.5">
                 {product.discount}
               </span>
             )}
          </div>

          {/* --- NEW COLOR SELECTOR --- */}
          {product.colors?.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
              <h3 className="text-[12px] font-black uppercase tracking-[0.15em] text-text-secondary dark:text-gray-400">Choose Color: <span className="text-text-primary dark:text-white ml-1">{selectedColor?.name}</span></h3>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all duration-300 ${
                      selectedColor?.name === color.name 
                        ? "border-primary scale-110 shadow-lg shadow-black/5" 
                        : "border-transparent hover:border-slate-300"
                    }`}
                    title={color.name}
                  >
                    <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variants */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
            <h3 className="text-[12px] font-black uppercase tracking-[0.15em] text-text-secondary dark:text-gray-400">Configuration</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants ? product.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-5 py-3 rounded-xl border-2 transition-all duration-300 font-bold text-sm ${
                    selectedVariant?.label === v.label
                      ? "border-slate-900 bg-slate-900 text-white shadow-xl scale-105 dark:bg-white dark:text-black dark:border-white"
                      : "border-slate-100 text-text-secondary dark:border-white/10 dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  {v.label}
                </button>
              )) : (
                <div className="px-5 py-3 rounded-xl border-2 border-slate-900 bg-slate-900 text-white font-bold text-sm">
                  {product.ram} / {product.storage}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={() => addToCart({ ...product, ...selectedVariant, name: `${product.name} (${selectedColor?.name || ''} ${selectedVariant?.label || ''})` })}
              className="flex-1 !py-5 shadow-2xl shadow-primary/20"
              icon={ShoppingCart}
            >
              Add to Cart
            </Button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                isWishlisted 
                  ? "border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-500/10 text-red-500" 
                  : "border-slate-100 dark:border-white/5 text-secondary dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* --- NEW SPECS GRID --- */}
          {product.specs && (
            <div className="pt-8 border-t border-slate-100 dark:border-white/5">
               <h3 className="text-[12px] font-black uppercase tracking-[0.15em] text-text-secondary dark:text-gray-400 mb-6">Key Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary/60 dark:text-gray-500">Performance</span>
                    <span className="text-sm font-bold text-text-primary dark:text-white">{product.specs.performance}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary/60 dark:text-gray-500">Battery</span>
                    <span className="text-sm font-bold text-text-primary dark:text-white">{product.specs.battery}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary/60 dark:text-gray-500">Main Camera</span>
                    <span className="text-sm font-bold text-text-primary dark:text-white">{product.specs.camera}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary/60 dark:text-gray-500">Charging</span>
                    <span className="text-sm font-bold text-text-primary dark:text-white">{product.specs.charger}</span>
                  </div>
               </div>
            </div>
          )}

           {/* Delivery & Warranty */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 dark:border-white/5">
            <div className="text-center group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <ShieldCheck size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-primary dark:text-white">Warranty</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <Truck size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-primary dark:text-white">Free Ship</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-2 transition-colors group-hover:bg-amber-600 group-hover:text-white">
                <RotateCcw size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-primary dark:text-white">Easy Return</p>
            </div>
          </div>

           {/* Full Technical Specs */}
          {product.technicalSpecs && (
            <div className="pt-10">
              <h3 className="text-[12px] font-black uppercase tracking-[0.15em] text-text-secondary dark:text-gray-400 mb-4">Manufacturer Details</h3>
              <div className="space-y-3">
                {product.technicalSpecs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-white/5 pb-3 last:border-0">
                    <span className="font-bold text-text-secondary dark:text-gray-400">{spec.label}</span>
                    <span className="font-medium text-text-primary dark:text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Reviews Section */}
      <div className="container-custom mt-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Summary */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold mb-6 text-text-primary dark:text-white">Customer Reviews</h2>
            <div className="p-8 bg-slate-50 dark:bg-white/[0.03] rounded-[32px] border border-slate-100 dark:border-white/5 text-center">
              <div className="text-5xl font-black text-text-primary dark:text-white mb-2">{product.rating}</div>
              <div className="flex justify-center text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-text-secondary dark:text-gray-300 font-medium">Based on {product.reviews} verified reviews</p>
            </div>
          </div>

          {/* Right: Reviews List & Form */}
          <div className="lg:w-2/3 space-y-12">
            {/* Form */}
            <div className="p-8 bg-white dark:bg-[#111113] rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm max-w-2xl mx-auto lg:mx-0">
              <h3 className="text-lg font-bold mb-6 text-text-primary dark:text-white">Write a Review</h3>
              <form onSubmit={handleAddReview} className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-text-secondary dark:text-gray-400 mb-3">Rating</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: s })}
                        className={`transition-all ${newReview.rating >= s ? "text-yellow-500 scale-110" : "text-slate-200 dark:text-gray-700"}`}
                      >
                        <Star size={24} fill={newReview.rating >= s ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your thoughts about this device..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-slate-200 min-h-[120px] transition-all"
                />
                <Button type="submit" variant="primary" className="px-8">
                  Submit Review
                </Button>
              </form>
            </div>

            {/* List */}
            <div className="space-y-8">
              {reviewsList.map((r) => (
                <div key={r.id} className="pb-8 border-b border-slate-100 dark:border-white/5 last:border-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-text-primary dark:text-white mb-1">{r.user}</h4>
                      <div className="flex text-yellow-500 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-text-secondary/60 dark:text-gray-500 font-medium">{r.date}</span>
                      <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-100 dark:border-white/10 transition-colors text-[10px] font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400">
                        <Star size={10} /> Helpful ({r.helpful || 0})
                      </button>
                    </div>
                  </div>
                  <p className="text-text-secondary dark:text-gray-400 leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Real Customer Experience (Photos) */}
      <div className="container-custom mt-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2 block">Visual Proof</span>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-text-primary dark:text-white">Real Customer Experience</h2>
          </div>
          <button className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-text-primary dark:text-white hover:text-blue-600 transition-colors border-b-2 border-text-primary dark:border-white hover:border-blue-600 pb-0.5">
            Share Your Photo
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {customerPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-square rounded-[32px] overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm mb-4">
                <SafeImage
                  src={photo.image}
                  alt={photo.caption}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Star size={20} fill="currentColor" />
                  </div>
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-text-primary dark:text-white">{photo.user}</span>
                  <button className="flex items-center gap-1 text-[10px] font-bold text-text-secondary dark:text-gray-400 hover:text-blue-600 transition-colors">
                    <Heart size={10} className="fill-current" /> {photo.likes}
                  </button>
                </div>
                <p className="text-[12px] text-text-secondary dark:text-gray-500 leading-tight line-clamp-1">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl w-full relative" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedPhoto.image} 
              alt={selectedPhoto.caption} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-3xl" 
            />
            <div className="mt-6 flex justify-between items-start text-white">
              <div>
                <h4 className="text-xl font-bold mb-1">{selectedPhoto.user}</h4>
                <p className="text-white/60">{selectedPhoto.caption}</p>
              </div>
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="rotate-90" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compare with Similar Section */}
      <div className="container-custom mt-24">
        <h2 className="text-2xl font-bold mb-8 text-center text-text-primary dark:text-white">Compare with Similar</h2>
        
        {/* Horizontal Scroll Wrapper for Mobile */}
        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="min-w-[800px] lg:min-w-full grid grid-cols-4 border border-slate-100 dark:border-white/5 rounded-[32px] overflow-hidden bg-white dark:bg-[#111113] shadow-sm">
            
            {/* Features Column */}
            <div className="flex flex-col border-r border-slate-100 dark:border-white/5">
              <div className="h-40 bg-slate-50/50 dark:bg-white/[0.02] p-6 border-b border-slate-100 dark:border-white/5 flex items-center font-bold text-text-secondary dark:text-gray-400 uppercase tracking-widest text-[11px]">Feature</div>
              <div className="flex-1 p-6 border-b border-slate-100 dark:border-white/5 font-bold text-sm flex items-center text-text-primary dark:text-white">Price</div>
              <div className="flex-1 p-6 border-b border-slate-100 dark:border-white/5 font-bold text-sm flex items-center text-text-primary dark:text-white">Camera</div>
              <div className="flex-1 p-6 border-b border-slate-100 dark:border-white/5 font-bold text-sm flex items-center text-text-primary dark:text-white">Battery</div>
              <div className="flex-1 p-6 font-bold text-sm flex items-center text-text-primary dark:text-white">Performance</div>
            </div>

            {/* Current Product & Similar Products */}
            {[product, ...(products.filter(p => (p.category === product.category || p.brand === product.brand) && String(p.id) !== String(id)).slice(0, 3))].map((p, idx) => {
              const cameraSpec = p.specs?.camera || "48MP Main";
              const batterySpec = p.specs?.battery || "4500 mAh";
              const performance = p.specs?.performance || (p.category === "Flagship" ? "A17 Pro / Gen 3" : "Snapdragon 8 Series");
              
              return (
                <div key={p.id} className={`flex flex-col border-r border-slate-100 dark:border-white/5 last:border-r-0 ${idx === 0 ? "bg-slate-50/40 dark:bg-white/[0.03]" : ""}`}>
                  {/* Header: Product Info */}
                  <div className="h-40 p-6 border-b border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-2">
                    <SafeImage 
                      src={p.image} 
                      alt={p.name} 
                      brand={p.brand}
                      containerClassName="w-16 h-16 mb-1"
                      className="w-full h-full object-contain" 
                    />
                    <h3 className="font-bold text-xs truncate w-full text-text-primary dark:text-white">{p.name}</h3>
                    {idx === 0 && <span className="text-[10px] font-black uppercase tracking-tighter text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full">Current</span>}
                  </div>

                  <div className="flex-1 p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-center font-black text-text-primary dark:text-white">
                    ₹{p.price.toLocaleString()}
                  </div>

                  {/* Camera */}
                  <div className="flex-1 p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-center text-center text-[11px] text-text-secondary dark:text-gray-400 font-bold uppercase tracking-tight">
                    {cameraSpec}
                  </div>

                  {/* Battery */}
                  <div className="flex-1 p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-center text-center text-[11px] text-text-secondary dark:text-gray-400 font-bold uppercase tracking-tight">
                    {batterySpec}
                  </div>

                  {/* Performance */}
                  <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-4">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-text-secondary dark:text-gray-400 text-center">
                      {performance}
                    </span>

                    {/* View Button (for similar products) */}
                    {idx !== 0 && (
                      <Link to={`/product/${p.id}`}>
                        <button className="text-[11px] font-black uppercase tracking-widest text-text-primary dark:text-white hover:text-blue-600 transition-colors border-b-2 border-text-primary dark:border-white hover:border-blue-600 pb-0.5">
                          View
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-24">
        <Recommendations currentProduct={product} recentlyViewed={recentlyViewed} />
      </div>

      {/* 🔥 MOBILE STICKY BAR */}
      {stock > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#09090b] border-t dark:border-white/10 p-4 flex gap-3 lg:hidden z-50">
          <Button onClick={() => addToCart({ ...product, ...selectedVariant, name: `${product.name} (${selectedVariant?.label})` })} className="flex-1">
            Add to Cart
          </Button>
          <Button onClick={() => addToCart({ ...product, ...selectedVariant, name: `${product.name} (${selectedVariant?.label})` })} variant="secondary" className="flex-1">
            Buy Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;