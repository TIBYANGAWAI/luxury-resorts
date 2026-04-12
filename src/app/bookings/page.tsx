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
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  
  // States from URL
  const destination = searchParams.get("destination") || "Luxury Lagoon Resort";
  const checkinStr = searchParams.get("checkin");
  const checkoutStr = searchParams.get("checkout");
  const adults = searchParams.get("adults") || "2";
  const children = searchParams.get("children") || "0";

  const checkin = checkinStr ? new Date(checkinStr) : new Date();
  const checkout = checkoutStr ? new Date(checkoutStr) : new Date(new Date().setDate(new Date().getDate() + 1));
  
  const diffTime = Math.abs(checkout.getTime() - checkin.getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Filter rooms by destination property
  const filteredRooms = roomTypes.filter(r => r.property === destination);
  
  // If destination doesn't match any property (or is empty), show all
  const displayRooms = filteredRooms.length > 0 ? filteredRooms : roomTypes;

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
             <h1 className="font-[family-name:var(--font-playfair)] text-xl text-[#0B422B] font-bold tracking-tight">Luxury Lagoon Resort</h1>
          </div>

          {/* Professional Progress Stepper */}
          <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0">
             <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="w-6 h-6 rounded-full bg-[#0B422B] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B422B]">Sanctury</span>
             </div>
             <ChevronRight className="w-3 h-3 text-zinc-300 flex-shrink-0" />
             <div className="flex items-center gap-2 whitespace-nowrap opacity-40">
                <span className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 text-[10px] flex items-center justify-center font-bold">2</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Details</span>
             </div>
             <ChevronRight className="w-3 h-3 text-zinc-300 flex-shrink-0" />
             <div className="flex items-center gap-2 whitespace-nowrap opacity-40">
                <span className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 text-[10px] flex items-center justify-center font-bold">3</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Confirm</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Rooms List */}
          <div className="flex-1 space-y-8">
            <div className="mb-10">
               <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.4em] font-bold mb-2 block">Bhatkal, Karnataka</span>
               <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#0B422B] italic">{destination}</h2>
               <p className="text-zinc-500 text-sm mt-2">Available accommodations for your selected dates</p>
            </div>

            <div className="space-y-6">
              {displayRooms.map((room) => (
                <motion.div 
                  key={room.id}
                  whileHover={{ y: -4 }}
                  className={`relative bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${selectedRoomId === room.id ? 'border-[#D4AF37] shadow-2xl ring-1 ring-[#D4AF37]' : 'border-zinc-100 shadow-xl'}`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-72 h-64 md:h-auto relative">
                      <Image src={room.img} alt={room.name} fill className="object-cover" />
                      {selectedRoomId === room.id && (
                        <div className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                           <Check className="w-3 h-3" /> Selected
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                           <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#0B422B] mb-1">{room.name}</h3>
                           <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                             <MapPin className="w-3 h-3" /> {room.location}
                           </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-zinc-400 line-through block">₹{Math.round(room.price * 1.2)}</span>
                          <span className="text-2xl font-bold text-[#0B422B]">₹{room.price.toLocaleString()}</span>
                          <span className="text-[10px] text-zinc-400 block uppercase font-bold tracking-tighter">Per Night</span>
                        </div>
                      </div>

                      <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-light">{room.description}</p>

                      <div className="flex flex-wrap gap-4 mb-8">
                        {room.amenities.map(a => (
                          <div key={a} className="flex items-center gap-2 text-[11px] text-zinc-600 bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
                             <div className="w-1 h-1 rounded-full bg-[#D4AF37]" /> {a}
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`w-full md:w-auto px-10 py-4 rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] transition-all ${selectedRoomId === room.id ? 'bg-[#D4AF37] text-white' : 'bg-[#0B422B] text-white hover:bg-[#135a3d]'}`}
                      >
                        {selectedRoomId === room.id ? "Room Selected" : "Select Sanctuary"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

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
                  <ShieldCheck className="w-3 h-3 text-green-500" /> Secure checkout powered by Luxury Lagoon Resort
               </div>
            </div>
          </div>

        </div>
      </main>
      
      {/* Luxury Lagoon Resort Dedicated Footer bar */}
      <footer className="bg-[#0B422B] text-white py-12 mt-20">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h4 className="font-[family-name:var(--font-playfair)] text-2xl italic mb-6">Experience the Pinnacle of Sanctuary with Luxury Lagoon Resort</h4>
            <div className="flex items-center justify-center gap-8 mb-8">
               <div className="flex flex-col items-center">
                  <Wifi className="w-5 h-5 text-[#D4AF37] mb-2" />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Free High-Speed Wi-Fi</span>
               </div>
               <div className="flex flex-col items-center">
                  <Coffee className="w-5 h-5 text-[#D4AF37] mb-2" />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Gourmet Breakfast</span>
               </div>
               <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-2" />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Best Rate Guarantee</span>
               </div>
            </div>
            <p className="text-white/30 text-[9px] uppercase tracking-widest font-bold">© 2026 Luxury Lagoon Resort Portfolio. Bhatkal, Karnataka.</p>
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
