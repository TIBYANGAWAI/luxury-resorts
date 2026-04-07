"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Hotel, Users, Settings, LogOut, 
  DollarSign, CheckCircle, XCircle, Search, Bell,
  Menu, ShieldCheck, ArrowRight, Home, BarChart3,
  Waves, Sparkles, MapPin, Eye
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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [resortsList, setResortsList] = useState(initialResorts);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === "Admin" && password === "digi9513") {
      setIsLoggedIn(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const toggleAvailability = (id: number) => {
    setResortsList(prev => prev.map(resort => 
      resort.id === id ? { ...resort, status: resort.status === "Available" ? "Booked" : "Available" } : resort
    ));
  };

  const updatePrice = (id: number, newPrice: string) => {
    const price = parseInt(newPrice) || 0;
    setResortsList(prev => prev.map(resort => 
      resort.id === id ? { ...resort, price } : resort
    ));
  };

  // 1. LOGIN SCREEN (Gatekeeper)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full max-w-md bg-white p-12 rounded-3xl shadow-[0_20px_50px_-20px_rgba(11,66,43,0.2)] border ${error ? 'border-red-500 shadow-red-500/10' : 'border-[#0B422B]/5'} relative overflow-hidden transition-colors duration-300`}
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <ShieldCheck className="w-32 h-32 text-[#0B422B]" />
          </div>

          <div className="flex flex-col items-center mb-12">
            <div className="relative h-16 w-40 mb-8">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0B422B] text-center mb-2 italic">Gatekeeper Secure Entry</h1>
            <p className="text-zinc-400 text-xs uppercase tracking-[0.3em] font-semibold">Authorized Luxury Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#0B422B] font-bold">Encrypted ID</label>
              <input 
                type="text" 
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Ex: Admin" 
                className="w-full bg-[#FAF9F6] border border-zinc-100 px-5 py-4 rounded-xl text-sm focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#0B422B] font-bold">Secure Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-[#FAF9F6] border border-zinc-100 px-5 py-4 rounded-xl text-sm focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-300"
              />
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-[10px] font-bold uppercase tracking-widest text-center"
              >
                Access Denied: Invalid Credentials
              </motion.p>
            )}

            <button className="w-full bg-[#0B422B] hover:bg-[#123827] text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-xl hover:shadow-[#0B422B]/20 flex items-center justify-center gap-3 group">
              Secure Entry <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-12 text-center text-[10px] text-zinc-400 font-medium">© 2026 The Luxury Resorts Portfolio. All entries are audited.</p>
        </motion.div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD UI
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex font-sans text-[#0B422B]">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0B422B] text-white flex flex-col fixed inset-y-0 shadow-2xl z-20">
        <div className="p-10 mb-8 border-b border-white/5">
          <div className="relative h-14 w-36 invert brightness-0">
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
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold italic mb-2">Welcome back, Digi Adda Admin</h2>
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
            {activeTab === "dashboard" && (
                <div className="grid grid-cols-4 gap-8 mb-16">
                   {[
                     { label: "Total Revenue", value: "₹4.2M", icon: DollarSign, trend: "+12%" },
                     { label: "Active Stays", value: "84", icon: Hotel, trend: "Stable" },
                     { label: "Priv privileged Guests", value: "512", icon: Users, trend: "+5.1%" },
                     { label: "Brand Equity", value: "High", icon: Sparkles, trend: "Peak" },
                   ].map((stat, i) => (
                     <div key={stat.label} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-[#0B422B]/5 transition-all">
                        <stat.icon className="w-8 h-8 text-[#D4AF37] mb-4" />
                        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-[10px] text-zinc-400 mt-2 font-medium">Trend: <span className="text-[#0B422B]">{stat.trend}</span></p>
                     </div>
                   ))}
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
