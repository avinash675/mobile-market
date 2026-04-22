import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, X, Navigation, Crosshair } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import Button from '../common/Button';

// Fix for Leaflet default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper component to handle map centering
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const MapAddressPicker = ({ isOpen, onClose, onSelectAddress }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState([19.0760, 72.8777]); // Initial: Mumbai
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const markerRef = useRef(null);
  
  const handleReverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`);
      const data = await res.json();
      if (data && data.address) {
        const addr = data.address;
        
        // Detailed extraction for premium accuracy
        const road = addr.road || addr.suburb || addr.neighbourhood || '';
        const houseNumber = addr.house_number || '';
        const area = addr.suburb || addr.city_district || addr.neighbourhood || '';
        
        const formattedLabel = data.display_name;
        const shortAddress = [houseNumber, road, area].filter(Boolean).join(', ') || formattedLabel.split(',').slice(0, 2).join(', ');

        const formatted = {
          label: formattedLabel,
          address: shortAddress,
          city: addr.city || addr.town || addr.village || addr.municipality || addr.district || '',
          state: addr.state || '',
          pincode: addr.postcode || ''
        };
        setSelectedAddress(formatted);
        setSearch(shortAddress);
      }
    } catch (err) {
      console.error("Geocoding error", err);
    }
  };

  const handleMarkerDragEnd = () => {
    const marker = markerRef.current;
    if (marker) {
      const { lat, lng } = marker.getLatLng();
      setPosition([lat, lng]);
      handleReverseGeocode(lat, lng);
    }
  };

  const handleLocateUser = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        handleReverseGeocode(latitude, longitude);
        setIsLocating(false);
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true }
    );
  };

  const handleSearch = async (val) => {
    setSearch(val);
    if (val.length > 3) {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${val}&limit=5`);
        const data = await res.json();
        setSuggestions(data.map(item => ({
          id: item.place_id,
          title: item.display_name.split(',')[0],
          full: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          raw: item
        })));
      } catch (e) {
        console.error("Search error", e);
      }
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionClick = (s) => {
    setPosition([s.lat, s.lng]);
    setSuggestions([]);
    setSearch(s.title);
    handleReverseGeocode(s.lat, s.lng);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px] border border-border"
      >
        {/* Left: Search & Suggestions */}
        <div className="w-full md:w-[400px] p-8 border-r border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-primary tracking-tight">Locate Address</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-primary">
              <X size={20} />
            </button>
          </div>

          <div className="relative mb-6">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search area, street or landmark..."
              className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl border-none font-bold text-sm text-primary focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {suggestions.length > 0 ? (
              suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSuggestionClick(s)}
                  className="w-full p-4 flex items-start gap-4 hover:bg-slate-50 rounded-2xl transition-all text-left group"
                >
                  <div className="p-2 bg-white rounded-lg group-hover:bg-accent group-hover:text-white transition-colors shadow-sm text-primary">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary uppercase tracking-tight truncate w-48">{s.title}</p>
                    <p className="text-[10px] text-secondary font-medium line-clamp-2">{s.full}</p>
                  </div>
                </button>
              ))
            ) : selectedAddress ? (
              <div className="p-6 bg-accent/5 rounded-3xl border border-accent/20">
                 <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Selected Location</p>
                 <p className="text-sm font-bold text-primary leading-tight mb-4">{selectedAddress.label}</p>
                 <Button 
                   onClick={() => onSelectAddress(selectedAddress)}
                   variant="primary" 
                   className="w-full py-3 text-[10px]"
                 >
                   Confirm Location
                 </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Navigation size={40} className="mx-auto text-slate-100 mb-4" />
                <p className="text-xs text-secondary font-medium px-4">Search for your location or drag the pin on map</p>
              </div>
            )}
          </div>

          <Button 
            onClick={handleLocateUser}
            variant="secondary"
            className="mt-6 w-full py-4 flex items-center justify-center gap-3 text-[10px] font-bold"
          >
            {isLocating ? (
              <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
            ) : <Crosshair size={16} />}
            {isLocating ? 'Locating...' : 'Use Current Location'}
          </Button>
        </div>

        {/* Right: Map Integration */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden group">
          <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <ChangeView center={position} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker 
              position={position} 
              draggable={true} 
              eventHandlers={{ dragend: handleMarkerDragEnd }}
              ref={markerRef}
            />
          </MapContainer>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/20 z-[1000] pointer-events-none">
             <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2 whitespace-nowrap">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               Drag pin for precise location
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MapAddressPicker;
