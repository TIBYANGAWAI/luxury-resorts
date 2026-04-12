"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  Wifi, 
  Coffee, 
  Tv, 
  Waves, 
  Wind,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roomTypes = [
  // Luxury Lagoon Resort (NH Bhatkal)
  { 
    id: 1, 
    property: "Luxury Lagoon Resort",
    location: "NH Bhatkal",
    name: "Deluxe Room (King/Twin)", 
    price: 5000, 
    img: "/images/interior.png", 
    amenities: ["King/Twin Bed", "Garden View", "Wifi", "Mini Bar"],
    description: "Elegant living spaces perfectly designed for comfort and relaxation."
  },
  { 
    id: 2, 
    property: "Luxury Lagoon Resort",
    location: "NH Bhatkal",
    name: "Luxury Room (King)", 
    price: 6000, 
    img: "/images/resort_2.png", 
    amenities: ["King Bed", "Mountain View", "Private Balcony", "Premium Bath"],
    description: "Enhanced luxury with breathtaking views and bespoke amenities."
  },
  { 
    id: 3, 
    property: "Luxury Lagoon Resort",
    location: "NH Bhatkal",
    name: "Executive Suite Room", 
    price: 8000, 
    img: "/images/resort_1.png", 
    amenities: ["Separate Living Area", "King Bed", "Private Balcony", "Express Check-in"],
    description: "Spacious suites with distinct living areas, perfect for extended stays."
  },
  { 
    id: 4, 
    property: "Luxury Lagoon Resort",
    location: "NH Bhatkal",
    name: "Presidential Suit Villa", 
    price: 25000, 
    img: "/images/hero.png", 
    amenities: ["Private Pool", "Private Chef", "Butler Service", "Unending Panoramic View"],
    description: "The ultimate expression of luxury, offering unmatched privacy and grandeur."
  },
  // The Jungle Stay
  { 
    id: 6, 
    property: "The Jungle Stay",
    location: "Sagar Road, Bhatkal",
    name: "Premium Forest Cabin", 
    price: 10000, 
    img: "/images/brand-jungle.png", 
    amenities: ["Secluded Location", "Nature Trails", "Eco-friendly Cabin"],
    description: "Experience deep harmony with the forest in our premium handcrafted cabins."
  },
  // Luxury Beach House
  { 
    id: 7, 
    property: "Luxury Beach House",
    location: "Jali Bhatkal",
    name: "Private Oceanfront Villa", 
    price: 40000, 
    img: "/images/brand-beach.png", 
    amenities: ["Private Jali Beach Access", "Private Pool", "Butler Service"],
    description: "Ultra-luxury oceanfront experience with the sounds of the Arabian Sea as your soundtrack."
  }
];

function BookingContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  // Initialize from search params if they exist
  useEffect(() => {
    const dest = searchParams.get("destination");
    const ci = searchParams.get("checkin");
    const co = searchParams.get("checkout");
    const ad = searchParams.get("adults");
    const ch = searchParams.get("children");

    if (dest) {
       setSelectedProperty(dest);
       if (ci && co) {
          setCheckIn(ci);
          setCheckOut(co);
          if (ad) setAdults(parseInt(ad));
          if (ch) setChildren(parseInt(ch));
          setCurrentStep(4); // Skip to room selection if all params provided
       } else {
          setCurrentStep(2); // Start at dates if property is known
       }
    }
  }, [searchParams]);

  const properties = [
    { 
       id: "Luxury Lagoon Resort", 
       name: "Luxury Lagoon Resort", 
       location: "NH Bhatkal", 
       img: "/images/interior.png", 
       desc: "The pinnacle of eco-luxury living in Bhatkal.",
       basePrice: "From ₹5,000"
    },
    { 
       id: "The Jungle Stay", 
       name: "The Jungle Stay", 
       location: "Sagar Road, Bhatkal", 
       img: "/images/brand-jungle.png", 
       desc: "Deep harmony with nature in handcrafted forest cabins.",
       basePrice: "₹10,000"
    },
    { 
       id: "Luxury Beach House", 
       name: "Luxury Beach House", 
       location: "Jali Bhatkal", 
       img: "/images/brand-beach.png", 
       desc: "Ultra-luxury oceanfront experience on Jali Beach.",
       basePrice: "₹40,000"
    }
  ];

  const handlePropertySelect = (propId: string) => {
    setSelectedProperty(propId);
    setCurrentStep(2);
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const diffTime = Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const filteredRooms = selectedProperty 
    ? roomTypes.filter(r => r.property === selectedProperty) 
    : roomTypes;

  const selectedRoom = roomTypes.find(r => r.id === selectedRoomId);
  const nights = calculateNights();
  const currentTotal = selectedRoom ? selectedRoom.price * nights : 0;

  const stepTitles = ["Select Sanctuary", "Check Dates", "Guest Count", "Select Room"];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-32">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 relative">
               <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
             </div>
             <h1 className="font-[family-name:var(--font-playfair)] text-xl text-[#0B422B] font-bold tracking-tight">Luxury Lagoon Resort</h1>
          </div>

          <div className="flex items-center gap-4">
            {stepTitles.map((title, idx) => (
              <React.Fragment key={title}>
                <div className={`flex items-center gap-2 transition-all duration-500 ${currentStep === idx + 1 ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold transition-colors ${currentStep === idx + 1 ? 'bg-[#0B422B] text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                    {idx + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">{title}</span>
                </div>
                {idx < 3 && <ChevronRight className="w-3 h-3 text-zinc-300 hidden sm:block" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* STEP 1: PROPERTY SELECTION */}
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.4em] font-bold block">First, Choose Your</span>
                <h2 className="font-[family-name:var(--font-playfair)] text-5xl text-[#0B422B] italic">Private Sanctuary</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((p) => (
                  <motion.div 
                    key={p.id}
                    whileHover={{ y: -8 }}
                    onClick={() => handlePropertySelect(p.id)}
                    className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-xl border border-zinc-100 group"
                  >
                    <div className="h-64 relative overflow-hidden">
                       <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                       <div className="absolute bottom-6 left-6 text-white">
                          <p className="text-[9px] uppercase tracking-widest font-bold opacity-70 mb-1">{p.location}</p>
                          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold">{p.name}</h3>
                       </div>
                    </div>
                    <div className="p-6 space-y-4">
                       <p className="text-zinc-500 text-xs leading-relaxed">{p.desc}</p>
                       <div className="pt-4 border-t border-zinc-50 flex justify-between items-center text-[#0B422B]">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{p.basePrice}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DATES */}
          {currentStep === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.4em] font-bold block">Perfect Timing</span>
                <h2 className="font-[family-name:var(--font-playfair)] text-5xl text-[#0B422B] italic">Select Your Dates</h2>
              </div>

              <div className="bg-white p-10 rounded-3xl shadow-2xl space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Check In</label>
                       <input 
                         type="date" 
                         value={checkIn}
                         onChange={(e) => setCheckIn(e.target.value)}
                         className="w-full bg-zinc-50 border-b-2 border-zinc-100 py-3 outline-none focus:border-[#0B422B] transition-colors"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Check Out</label>
                       <input 
                         type="date" 
                         value={checkOut}
                         onChange={(e) => setCheckOut(e.target.value)}
                         className="w-full bg-zinc-50 border-b-2 border-zinc-100 py-3 outline-none focus:border-[#0B422B] transition-colors"
                       />
                    </div>
                 </div>
                 <button 
                   disabled={!checkIn || !checkOut}
                   onClick={() => setCurrentStep(3)}
                   className="w-full bg-[#0B422B] text-white py-5 rounded-xl font-bold uppercase tracking-[0.3em] text-[11px] disabled:opacity-30 transition-all hover:bg-[#135a3d]"
                 >
                   Continue to Guests
                 </button>
              </div>
              <button 
                onClick={() => setCurrentStep(1)}
                className="block mx-auto text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#0B422B] transition-colors"
              >
                Change Sanctuary
              </button>
            </motion.div>
          )}

          {/* STEP 3: OCCUPANCY */}
          {currentStep === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.4em] font-bold block">Travelers</span>
                <h2 className="font-[family-name:var(--font-playfair)] text-5xl text-[#0B422B] italic">Guest Count</h2>
              </div>

              <div className="bg-white p-10 rounded-3xl shadow-2xl space-y-10">
                 <div className="space-y-8">
                    <div className="flex items-center justify-between">
                       <div>
                          <p className="font-bold text-[#0B422B]">Adults</p>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Aged 12+</p>
                       </div>
                       <div className="flex items-center gap-6">
                          <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-[#0B422B] hover:text-white transition-colors">-</button>
                          <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold">{adults}</span>
                          <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-[#0B422B] hover:text-white transition-colors">+</button>
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <div>
                          <p className="font-bold text-[#0B422B]">Children</p>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Aged 0-11</p>
                       </div>
                       <div className="flex items-center gap-6">
                          <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-[#0B422B] hover:text-white transition-colors">-</button>
                          <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold">{children}</span>
                          <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-[#0B422B] hover:text-white transition-colors">+</button>
                       </div>
                    </div>
                 </div>

                 <button 
                   onClick={() => setCurrentStep(4)}
                   className="w-full bg-[#0B422B] text-white py-5 rounded-xl font-bold uppercase tracking-[0.3em] text-[11px] transition-all hover:bg-[#135a3d]"
                 >
                   Reveal Availablity
                 </button>
              </div>
              <button 
                onClick={() => setCurrentStep(2)}
                className="block mx-auto text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#0B422B] transition-colors"
              >
                Change Dates
              </button>
            </motion.div>
          )}

          {/* STEP 4: ROOM SELECTION */}
          {currentStep === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                   <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.4em] font-bold block mb-2">Refining Your Stay in</span>
                   <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#0B422B] italic">{selectedProperty}</h2>
                </div>
                <button 
                   onClick={() => setCurrentStep(1)}
                   className="text-[10px] font-bold uppercase tracking-widest text-[#0B422B] border-b border-[#0B422B] pb-1"
                >
                   Change Sanctuary
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {filteredRooms.map((room) => (
                  <motion.div 
                    key={room.id}
                    whileHover={{ scale: 1.01 }}
                    className={`bg-white border rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col md:flex-row ${selectedRoomId === room.id ? 'ring-2 ring-[#D4AF37]' : ''}`}
                  >
                    <div className="md:w-80 h-72 md:h-auto relative">
                       <Image src={room.img} alt={room.name} fill className="object-cover" />
                       {selectedRoomId === room.id && (
                          <div className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 rounded text-[10px] font-bold tracking-widest flex items-center gap-2">
                             <Check className="w-3 h-3" /> SELECTED
                          </div>
                       )}
                    </div>
                    <div className="flex-1 p-10 flex flex-col justify-between">
                       <div>
                          <div className="flex justify-between items-start mb-6">
                             <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-[#0B422B]">{room.name}</h3>
                             <div className="text-right">
                                <span className="text-2xl font-bold text-[#0B422B]">₹{room.price.toLocaleString()}</span>
                                <span className="text-[9px] block text-zinc-400 uppercase tracking-tighter">Per Night</span>
                             </div>
                          </div>
                          <p className="text-zinc-500 text-sm italic font-light mb-8">{room.description}</p>
                          <div className="flex flex-wrap gap-3 mb-10">
                             {room.amenities.map(a => (
                               <span key={a} className="px-4 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full text-[10px] text-zinc-500 uppercase tracking-widest">{a}</span>
                             ))}
                          </div>
                       </div>
                       <button 
                         onClick={() => setSelectedRoomId(room.id)}
                         className={`w-full md:w-auto px-12 py-4 rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] transition-all shadow-lg ${selectedRoomId === room.id ? 'bg-[#D4AF37] text-white' : 'bg-[#0B422B] text-white hover:bg-[#135a3d]'}`}
                       >
                         {selectedRoomId === room.id ? "Selection Confirmed" : "Choose Sanctuary"}
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* DYNAMIC SUMMARY BAR (MODERN FLOATING) */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            className="fixed bottom-8 left-0 right-0 z-[100] px-6"
          >
             <div className="max-w-5xl mx-auto bg-[#0B422B]/95 backdrop-blur-xl text-white p-6 md:p-8 rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(11,66,43,0.3)] flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
                <div className="flex items-center gap-8 divide-x divide-white/10">
                   <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-bold">Resort</span>
                      <span className="text-sm font-medium tracking-wide">{selectedProperty}</span>
                   </div>
                   <div className="pl-8 flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-bold">Itinerary</span>
                      <span className="text-sm font-medium tracking-wide">
                        {checkIn ? new Date(checkIn).toLocaleDateString('default', { month: 'short', day: 'numeric' }) : "--"} 
                        {" → "} 
                        {checkOut ? new Date(checkOut).toLocaleDateString('default', { month: 'short', day: 'numeric' }) : "--"}
                      </span>
                   </div>
                   <div className="pl-8 flex flex-col gap-1 hidden sm:flex">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-bold">Guests</span>
                      <span className="text-sm font-medium tracking-wide">{adults + children} Passengers</span>
                   </div>
                </div>

                <div className="flex items-center gap-10">
                   <div className="text-right">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold block mb-1">Estimated Stay</span>
                      <span className="font-[family-name:var(--font-playfair)] text-3xl italic">
                         ₹{(currentTotal || (selectedProperty === "The Jungle Stay" ? 10000 : selectedProperty === "Luxury Beach House" ? 40000 : 0) * nights).toLocaleString()}
                      </span>
                   </div>
                   <button 
                     disabled={!selectedRoomId}
                     className={`h-[60px] px-12 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl ${selectedRoomId ? 'bg-[#D4AF37] text-white hover:scale-105 active:scale-95' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
                   >
                      Confirm Reservation
                   </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer (Static) */}
      <footer className="bg-[#0B422B] text-white py-20">
         <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
            <h4 className="font-[family-name:var(--font-playfair)] text-3xl italic">Luxury Lagoon Resort Portfolio</h4>
            <div className="flex flex-wrap justify-center gap-12">
               <div className="flex flex-col items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Secure Global Payments</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <Coffee className="w-8 h-8 text-[#D4AF37]" />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Elite Concierge Service</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <Calendar className="w-8 h-8 text-[#D4AF37]" />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Flexible Cancellation</span>
               </div>
            </div>
            <div className="pt-12 border-t border-white/5">
                <p className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-bold">© 2026 Luxury Lagoon Resort. All Rights Reserved.</p>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default function BookingLandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#0B422B]">Preparing Sanctuary...</p>
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
