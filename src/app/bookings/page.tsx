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
  { 
    id: 1, 
    name: "Deluxe Room (King/Twin)", 
    price: 5000, 
    img: "/images/interior.png", 
    amenities: ["King/Twin Bed", "Garden View", "Wifi", "Mini Bar"],
    description: "Elegant living spaces perfectly designed for comfort and relaxation."
  },
  { 
    id: 2, 
    name: "Luxury Room (King)", 
    price: 6000, 
    img: "/images/resort_2.png", 
    amenities: ["King Bed", "Mountain View", "Private Balcony", "Premium Bath"],
    description: "Enhanced luxury with breathtaking views and bespoke amenities."
  },
  { 
    id: 3, 
    name: "Executive Suite Room", 
    price: 8000, 
    img: "/images/resort_1.png", 
    amenities: ["Separate Living Area", "King Bed", "Private Balcony", "Express Check-in"],
    description: "Spacious suites with distinct living areas, perfect for extended stays."
  },
  { 
    id: 4, 
    name: "Presidential Suit Villa", 
    price: 25000, 
    img: "/images/hero.png", 
    amenities: ["Private Pool", "Private Chef", "Butler Service", "Unending Panoramic View"],
    description: "The ultimate expression of luxury, offering unmatched privacy and grandeur."
  },
  { 
    id: 5, 
    name: "Luxury Cottage", 
    price: 12000, 
    img: "/images/resort_3.png", 
    amenities: ["Secluded Location", "Outdoor Rain Shower", "Private Sun Deck"],
    description: "Charming, private cottages nestled in nature for a serene escape."
  },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  
  // States from URL
  const destination = searchParams.get("destination") || "The Emerald Forest Resort";
  const checkinStr = searchParams.get("checkin");
  const checkoutStr = searchParams.get("checkout");
  const adults = searchParams.get("adults") || "2";
  const children = searchParams.get("children") || "0";

  const checkin = checkinStr ? new Date(checkinStr) : new Date();
  const checkout = checkoutStr ? new Date(checkoutStr) : new Date(new Date().setDate(new Date().getDate() + 1));
  
  const diffTime = Math.abs(checkout.getTime() - checkin.getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const selectedRoom = roomTypes.find(r => r.id === selectedRoomId);
  const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 relative">
               <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
             </div>
             <h1 className="font-[family-name:var(--font-playfair)] text-xl text-[#0B422B] font-bold tracking-tight">Luxury Resorts</h1>
          </div>

          {/* Taj-Style Progress Stepper */}
          <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0">
             <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="w-6 h-6 rounded-full bg-[#0B422B] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#0B422B]">Select Room</span>
             </div>
             <ChevronRight className="w-4 h-4 text-zinc-300 flex-shrink-0" />
             <div className="flex items-center gap-2 whitespace-nowrap opacity-40">
                <span className="w-6 h-6 rounded-full bg-zinc-400 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600">Personal Details</span>
             </div>
             <ChevronRight className="w-4 h-4 text-zinc-300 flex-shrink-0" />
             <div className="flex items-center gap-2 whitespace-nowrap opacity-40">
                <span className="w-6 h-6 rounded-full bg-zinc-400 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600">Confirmation</span>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Room Selection Grid */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#0B422B] mb-2">{destination}</h2>
              <div className="flex items-center gap-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                 <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {checkin.toLocaleDateString('en-GB')} - {checkout.toLocaleDateString('en-GB')}</span>
                 <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {adults} Adults, {children} Children</span>
              </div>
            </div>

            <div className="space-y-6">
              {roomTypes.map((room) => (
                <motion.div 
                  key={room.id}
                  whileHover={{ y: -4 }}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col md:flex-row ${selectedRoomId === room.id ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-xl' : 'border-zinc-100 hover:border-zinc-300 shadow-sm'}`}
                >
                  <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                    <Image src={room.img} alt={room.name} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                       <span className="bg-[#0B422B] text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full">Sanitized</span>
                    </div>
                  </div>
                  
                  <div className="md:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#0B422B] font-bold">{room.name}</h3>
                        <div className="text-right">
                          <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Starting from</p>
                          <p className="text-2xl font-bold text-[#0B422B]">₹{room.price.toLocaleString()}</p>
                          <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Per Night</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-zinc-500 mb-6 leading-relaxed">{room.description}</p>
                      
                      <div className="grid grid-cols-2 gap-y-3 mb-8">
                        {room.amenities.map(amenity => (
                          <div key={amenity} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-600">
                             <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> {amenity}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`w-full py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${selectedRoomId === room.id ? 'bg-[#D4AF37] text-white' : 'bg-[#0B422B] text-white hover:bg-[#1a4a35]'}`}
                    >
                      {selectedRoomId === room.id ? 'Selected' : 'Select Room'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Sticky Summary Box (Taj Style) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-[#D4AF37]" />
               
               <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D4AF37] mb-8">Your Stay Summary</h3>
               
               <div className="space-y-6 mb-10 pb-8 border-b border-zinc-100">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#0B422B] flex-shrink-0" />
                    <div>
                       <p className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 mb-0.5">Destiantion</p>
                       <p className="text-sm font-bold text-[#0B422B] leading-tight">{destination}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-[#0B422B] flex-shrink-0" />
                    <div className="grid grid-cols-2 gap-4 w-full">
                       <div>
                          <p className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 mb-0.5">Check-in</p>
                          <p className="text-sm font-bold text-[#0B422B]">{checkin.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                       </div>
                       <div>
                          <p className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 mb-0.5">Check-out</p>
                          <p className="text-sm font-bold text-[#0B422B]">{checkout.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-[#0B422B] flex-shrink-0" />
                    <div>
                       <p className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 mb-0.5">Occupancy</p>
                       <p className="text-sm font-bold text-[#0B422B]">{adults} Adults, {children} Children ({nights} {nights > 1 ? 'Nights' : 'Night'})</p>
                    </div>
                  </div>
               </div>

               {selectedRoom ? (
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-zinc-500">
                       <span className="text-xs">{selectedRoom.name} x {nights} Night(s)</span>
                       <span className="text-sm font-bold text-[#0B422B]">₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-end pt-4">
                       <div>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Total Payable</p>
                          <p className="text-3xl font-bold text-[#0B422B]">₹{totalAmount.toLocaleString()}</p>
                          <p className="text-[8px] text-zinc-400 italic">Inclusive of all taxes</p>
                       </div>
                    </div>
                    <button 
                      className="w-full bg-[#0B422B] hover:bg-[#D4AF37] text-white mt-8 py-5 rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-4 group"
                    >
                      Book Your Experience <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </button>
                 </div>
               ) : (
                 <div className="py-8 text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Please select a room to continue</p>
                 </div>
               )}

               <div className="mt-8 flex items-center gap-3 justify-center text-[8px] uppercase tracking-widest font-bold text-zinc-400">
                  <ShieldCheck className="w-3 h-3 text-green-500" /> Secure checkout powered by DigiAdda
               </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Taj-Style Trusted Footer bar */}
      <footer className="bg-zinc-950 text-white py-12">
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <h4 className="font-[family-name:var(--font-playfair)] text-2xl italic mb-6">Experience Tajness with Luxury Resorts</h4>
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
               <span className="text-xs font-bold uppercase tracking-widest italic group hover:opacity-100">Tripadvisor Certified</span>
               <span className="text-xs font-bold uppercase tracking-widest italic">Condé Nast Traveler</span>
               <span className="text-xs font-bold uppercase tracking-widest italic">Forbes Travel Guide</span>
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
