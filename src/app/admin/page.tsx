"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Hotel, Users, Settings, LogOut, 
  DollarSign, CheckCircle, XCircle, Search, Bell,
  Menu, ShieldCheck, ArrowRight, Home, BarChart3,
  Waves, Sparkles, MapPin, Eye, Calendar
} from "lucide-react";
import Image from "next/image";

// Mock Data matching the main site resorts
const initialResorts = [
  {
    id: 1,
    name: "The Emerald Forest Resort",
    location: "Munnar, Kerala",
    image: "/images/resort_1.png",
    price: 24500,
    status: "Available",
    bookings: 12
  },
  {
    id: 2,
    name: "Golden Sands Retreat",
    location: "Goa",
    image: "/images/resort_2.png",
    price: 32000,
    status: "Available",
    bookings: 8
  },
  {
    id: 3,
    name: "Himalayan Myst",
    location: "Shimla",
    image: "/images/resort_3.png",
    price: 28500,
    status: "Booked",
    bookings: 15
  }
];

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("resorts"); // Default to resorts for now
  const [resortsList, setResortsList] = useState(initialResorts);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const mockReservations = [
    { id: 1, guest: "Countess Isabella", suite: "Emerald Forest", dates: "Oct 12 - 18", status: "Confirmed", phone: "+919372284069" },
    { id: 2, guest: "Maximilian Hoffmann", suite: "Golden Sands", dates: "Oct 20 - 25", status: "Pending", phone: "+919372284069" },
    { id: 3, guest: "Eleanor St. James", suite: "Himalayan Myst", dates: "Nov 02 - 08", status: "Confirmed", phone: "+919372284069" }
  ];

  const triggerSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === "Admin" && password === "digi9513") {
      setIsLoggedIn(true);
      setError(false);
      triggerSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const toggleAvailability = (id: number) => {
    setResortsList(prev => prev.map(resort => 
      resort.id === id ? { ...resort, status: resort.status === "Available" ? "Booked" : "Available" } : resort
    ));
    triggerSuccess();
  };

  const updatePrice = (id: number, newPrice: string) => {
    const price = parseInt(newPrice) || 0;
    setResortsList(prev => prev.map(resort => 
      resort.id === id ? { ...resort, price } : resort
    ));
    triggerSuccess();
  };

  // 1. LOGIN SCREEN (The Vault)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden">
        {/* Cinematic Blurred Background */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/resort_1.png" alt="Resort" fill className="object-cover scale-110 blur-[10px] brightness-[0.6]" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-white/10 backdrop-blur-2xl p-16 rounded-[3rem] border border-white/20 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] relative z-10 text-white"
        >
          <div className="flex flex-col items-center mb-16">
            <div className="relative h-20 w-44 mb-10 invert brightness-0">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white text-center mb-4 tracking-tight italic">The Manager's Vault</h1>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">Encrypted Executive Terminal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-12">
            <div className="relative group">
              <input 
                type="text" 
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Manager Identifier" 
                className="w-full bg-transparent border-b border-[#D4AF37]/30 py-5 text-lg outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20 font-light"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-focus-within:w-full transition-all duration-500"></div>
            </div>
            <div className="relative group">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Key" 
                className="w-full bg-transparent border-b border-[#D4AF37]/30 py-5 text-lg outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20 font-light"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-focus-within:w-full transition-all duration-500"></div>
            </div>
            
            {error && (
              <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">Protocol Violation: Access Refused</p>
            )}

            <button className="w-full bg-[#D4AF37] hover:bg-[#FAF9F6] text-[#0B422B] py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] transition-all shadow-2xl flex items-center justify-center gap-4 group mt-10">
              Enter The Gateway <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD UI
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex font-sans text-[#0B422B] overflow-hidden">
      
      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-10 right-10 z-[100] bg-white border border-[#D4AF37]/20 shadow-[0_20px_50px_-15px_rgba(11,66,43,0.15)] rounded-2xl px-8 py-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-[#0B422B]/5 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
               <p className="text-[10px] uppercase tracking-[.2em] font-bold">Managerial Success</p>
               <p className="text-xs text-zinc-400">Vault registers have been synchronized</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* SIDEBAR - Refined with Leather Texture */}
      <aside className="w-80 bg-[#0B422B] text-white flex flex-col fixed inset-y-0 shadow-2xl z-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none"></div>

        <div className="p-12 mb-8 border-b border-white/5 relative">
          <div className="relative h-14 w-40 invert brightness-0">
             <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-4">
          {[
            { id: "dashboard", label: "Analytics", icon: LayoutDashboard },
            { id: "resorts", label: "Suites", icon: Hotel },
            { id: "bookings", label: "Reservations", icon: BarChart3 },
            { id: "users", label: "Privileged Guests", icon: Users },
            { id: "settings", label: "Preferences", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${activeTab === item.id ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20 scale-105' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-white' : 'text-[#D4AF37]'}`} />
              <span className="font-bold text-[11px] uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 mt-auto">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-300/60 hover:text-red-400 hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest font-bold"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-72 p-12">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold italic mb-2">Welcome back, Luxury Lagoon Resort Admin</h2>
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-semibold">Exquisite Management Portfolio v2.4</p>
          </div>
          <div className="flex items-center gap-8">
             <div className="relative cursor-pointer group">
               <Bell className="w-6 h-6 text-[#0B422B] group-hover:text-[#D4AF37] transition-colors" />
               <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border-2 border-[#FAF9F6]"></span>
             </div>
             <div className="flex items-center gap-4 border-l border-zinc-200 pl-8">
               <div className="text-right">
                 <p className="text-xs font-bold uppercase tracking-widest">Admin</p>
                 <p className="text-[10px] text-zinc-400">Chief Executive</p>
               </div>
               <div className="w-12 h-12 bg-[#0B422B] rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-xl">DA</div>
             </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT CONTAINER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {activeTab === "bookings" && (
              <div className="space-y-8">
                 <div className="flex justify-between items-end mb-12">
                   <div>
                     <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold italic mb-2">Guest Reservations</h3>
                     <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-semibold">Active Vault Logs</p>
                   </div>
                   <div className="flex gap-4">
                     <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                        <input type="text" placeholder="Search Guest Name" className="bg-white border border-zinc-100 rounded-xl pl-12 pr-6 py-3 text-xs w-64 outline-none focus:border-[#D4AF37] transition-all" />
                     </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {mockReservations.map((res, i) => (
                      <motion.div 
                        key={res.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 flex items-center justify-between group hover:shadow-xl hover:shadow-[#0B422B]/5 transition-all"
                      >
                         <div className="flex items-center gap-10">
                            <div className="w-20 h-20 rounded-full bg-[#FAF9F6] border border-[#D4AF37]/10 flex items-center justify-center font-serif text-2xl font-bold text-[#0B422B] italic">
                               {res.guest.charAt(0)}
                            </div>
                            <div>
                               <h4 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-1 italic">{res.guest}</h4>
                               <div className="flex items-center gap-6">
                                  <p className="text-xs text-zinc-400 flex items-center gap-2"><Hotel className="w-3.5 h-3.5" /> {res.suite} Suite</p>
                                  <p className="text-xs text-zinc-400 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {res.dates}</p>
                               </div>
                            </div>
                         </div>

                         <div className="flex items-center gap-12">
                            <div className="text-right">
                               <span className={`px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold shadow-sm inline-block mb-1 ${res.status === 'Confirmed' ? 'bg-[#0B422B]/5 text-[#0B422B]' : 'bg-zinc-50 text-zinc-400'}`}>
                                  {res.status}
                               </span>
                               <p className="text-[10px] text-zinc-300 font-medium">Boutique Booking</p>
                            </div>
                            <a 
                              href={`https://wa.me/${res.phone}`}
                              target="_blank"
                              className="bg-[#D4AF37] hover:bg-[#0B422B] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all shadow-lg hover:shadow-[#D4AF37]/30 flex items-center gap-3"
                            >
                               WhatsApp Guest <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === "resorts" && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {resortsList.map((resort) => (
                  <motion.div 
                    key={resort.id}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-zinc-100 group transition-all duration-500 hover:shadow-2xl hover:shadow-[#0B422B]/10 hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image src={resort.image} alt={resort.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute top-6 right-6">
                        <span className={`px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold backdrop-blur-md shadow-lg ${resort.status === "Available" ? 'bg-white/90 text-[#0B422B]' : 'bg-[#D4AF37]/90 text-white'}`}>
                          {resort.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-10 flex flex-col">
                      <div className="mb-8">
                         <div className="flex items-center gap-1.5 text-[9px] text-[#D4AF37] mb-2 font-bold tracking-[0.2em] uppercase">
                            <MapPin className="w-3 h-3" /> {resort.location}
                         </div>
                         <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold italic">{resort.name}</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-8 mb-10 pt-8 border-t border-zinc-50">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-300 mb-3 block">Bespoke Rate (₹)</label>
                          <input 
                            type="number"
                            value={resort.price}
                            onChange={(e) => updatePrice(resort.id, e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-[#D4AF37]/20 px-4 py-3 rounded-xl text-lg font-bold text-[#0B422B] focus:border-[#D4AF37] outline-none" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-300 mb-3 block">Live Availability</label>
                          <button 
                            onClick={() => toggleAvailability(resort.id)}
                            className={`w-full h-[52px] rounded-xl flex items-center justify-between px-5 transition-all ${resort.status === "Available" ? 'bg-[#0B422B] text-white' : 'bg-zinc-100 text-[#0B422B]'}`}
                          >
                            <span className="text-[10px] font-bold uppercase tracking-widest">{resort.status === "Available" ? "Active" : "Paused"}</span>
                            {resort.status === "Available" ? <CheckCircle className="w-5 h-5 text-[#D4AF37]" /> : <XCircle className="w-5 h-5 text-zinc-400" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                              <Eye className="w-4 h-4 text-zinc-400" />
                           </div>
                           <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 leading-tight">View Customer Experience</p>
                        </div>
                        <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] hover:tracking-[0.4em] transition-all">Details <ArrowRight className="w-3 h-3 inline ml-1" /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab !== "dashboard" && activeTab !== "resorts" && (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                   <Sparkles className="w-10 h-10 text-zinc-300" />
                </div>
                <h3 className="text-2xl font-[family-name:var(--font-playfair)] italic mb-2">Vault Entry Refinement</h3>
                <p className="text-zinc-400 text-xs uppercase tracking-widest">This section is currently being curated for perfection.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
