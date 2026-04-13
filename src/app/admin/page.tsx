"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Hotel, Users, Settings, LogOut, 
  CheckCircle, XCircle, Search, Bell,
  ArrowRight, BarChart3, MapPin, Eye, Calendar,
  TrendingUp, ArrowUpRight, DollarSign, Wallet
} from "lucide-react";
import Image from "next/image";

// 100% BHATKAL EXCLUSIVE INVENTORY
const bhatkalPortfolio = [
  {
    id: "luxury-lagoon",
    name: "Luxury Lagoon Resort",
    location: "NH Bhatkal",
    image: "/images/interior.png",
    price: 5000,
    status: "Live",
    bookings: 45,
    occupancy: "88%",
    revenue: "₹2,25,000"
  },
  {
    id: "jungle-stay",
    name: "The Jungle Stay",
    location: "Sagar Road, Bhatkal",
    image: "/images/brand-jungle.png",
    price: 10000,
    status: "Live",
    bookings: 22,
    occupancy: "92%",
    revenue: "₹2,20,000"
  },
  {
    id: "beach-house",
    name: "Luxury Beach House",
    location: "Jali Bhatkal",
    image: "/images/brand-beach.png",
    price: 40000,
    status: "Maintenance",
    bookings: 8,
    occupancy: "100%",
    revenue: "₹3,20,000"
  }
];

export default function LuxuryAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [portfolio, setPortfolio] = useState(bhatkalPortfolio);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);

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

  const updatePrice = (id: string, newPrice: number) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p));
    setEditingPrice(null);
  };

  const toggleStatus = (id: string) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, status: p.status === "Live" ? "Maintenance" : "Live" } : p));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0B422B] flex items-center justify-center p-6 selection:bg-[#D4AF37] selection:text-white">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image src="/images/hero.png" alt="Overlay" fill className="object-cover grayscale" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-3xl p-12 rounded-[2.5rem] border border-white/20 shadow-2xl relative z-10"
        >
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[#D4AF37] rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 rotate-12">
               <Wallet className="w-10 h-10 text-[#0B422B]" />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-white italic mb-2">The Vault</h1>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-bold">Luxury Lagoon Admin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <input 
                type="text" 
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Manager ID"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>
            <div className="group">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Key"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>
            {error && <p className="text-red-400 text-[10px] text-center uppercase tracking-widest font-bold">Access Refused</p>}
            <button className="w-full bg-[#D4AF37] hover:bg-white text-[#0B422B] py-5 rounded-2xl font-bold uppercase tracking-[0.4em] text-[10px] transition-all shadow-xl active:scale-95">
               Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B422B] selection:bg-[#D4AF37] selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-80 bg-[#0B422B] p-10 flex flex-col z-50">
         <div className="mb-20">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white italic">Luxury Lagoon</h2>
            <p className="text-[#D4AF37] text-[8px] uppercase tracking-[0.4em] font-bold mt-1">Management Hub</p>
         </div>

         <nav className="flex-1 space-y-4">
            {[
              { id: "dashboard", label: "Overview", icon: LayoutDashboard },
              { id: "portfolio", label: "Inventory", icon: Hotel },
              { id: "bookings", label: "Reservations", icon: Calendar },
              { id: "analytics", label: "Performance", icon: BarChart3 },
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-[#D4AF37] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
              </button>
            ))}
         </nav>

         <button 
           onClick={() => setIsLoggedIn(false)}
           className="mt-auto flex items-center gap-4 text-red-300 px-6 py-4 hover:bg-red-500/10 rounded-2xl transition-all"
         >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Sign Out</span>
         </button>
      </aside>

      <main className="ml-80 p-16">
         {/* HEADER */}
         <header className="flex justify-between items-end mb-16">
            <div>
               <h1 className="font-[family-name:var(--font-playfair)] text-4xl italic mb-2 uppercase tracking-tight">Portfolio Control</h1>
               <div className="flex items-center gap-4">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#D4AF37]">Bhatkal Master Collection</span>
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">Version 2.0.4 Agency-Grade</span>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-none">System Admin</p>
                  <p className="text-[9px] text-[#D4AF37] uppercase tracking-widest font-bold">Secure Session</p>
               </div>
               <div className="w-12 h-12 bg-[#0B422B] rounded-2xl flex items-center justify-center text-white font-bold text-sm">A</div>
            </div>
         </header>

         {/* ANALYTICS BAR CHART (MINI) */}
         <section className="mb-16">
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-zinc-100">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                     <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                     <h3 className="text-[10px] uppercase font-bold tracking-[0.3em]">7-Day Booking Velocity</h3>
                  </div>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">+24% Revenue Increase</span>
               </div>
               <div className="h-40 flex items-end justify-between gap-4">
                  {[45, 65, 35, 85, 55, 95, 75].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         className="w-full bg-[#0B422B]/5 rounded-t-xl relative overflow-hidden group-hover:bg-[#0B422B]/10 transition-colors"
                       >
                          <div className="absolute bottom-0 left-0 right-0 bg-[#0B422B] h-[30%] opacity-20" />
                       </motion.div>
                       <span className="text-[8px] font-bold text-zinc-300 uppercase">Day {i+1}</span>
                    </div>
                  ))}
               </div>
            </div>
         </section>

         {/* PROPERTY GRID (GLASS-GRADE) */}
         <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {portfolio.map((prop) => (
              <motion.div 
                key={prop.id}
                whileHover={{ y: -8 }}
                className="bg-white/40 backdrop-blur-xl border border-[#D4AF37]/20 rounded-[2.5rem] overflow-hidden shadow-xl"
              >
                <div className="h-56 relative group">
                   <Image src={prop.image} alt={prop.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0B422B]/60 to-transparent" />
                   <div className="absolute top-6 right-6">
                      <button 
                        onClick={() => toggleStatus(prop.id)}
                        className={`px-4 py-1.5 rounded-full text-[8px] uppercase font-bold tracking-widest backdrop-blur-md border border-white/20 transition-all ${prop.status === "Live" ? "bg-green-500/80 text-white" : "bg-amber-500/80 text-white"}`}
                      >
                         {prop.status}
                      </button>
                   </div>
                   <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-[9px] uppercase tracking-[0.2em] opacity-70 flex items-center gap-1.5 font-bold mb-1">
                         <MapPin className="w-3 h-3 text-[#D4AF37]" /> {prop.location}
                      </p>
                      <h4 className="font-[family-name:var(--font-playfair)] text-2xl italic">{prop.name}</h4>
                   </div>
                </div>

                <div className="p-10 space-y-8">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="bg-zinc-50 p-4 rounded-2xl">
                         <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Bookings</p>
                         <p className="text-xl font-bold">{prop.bookings}</p>
                      </div>
                      <div className="bg-zinc-50 p-4 rounded-2xl">
                         <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Occupancy</p>
                         <p className="text-xl font-bold">{prop.occupancy}</p>
                      </div>
                   </div>

                   <div>
                      <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold block mb-4">Pricing Control (Click to Edit)</label>
                      {editingPrice === prop.id ? (
                        <input 
                           autoFocus
                           type="number"
                           onBlur={(e) => updatePrice(prop.id, parseInt(e.target.value))}
                           onKeyDown={(e) => e.key === 'Enter' && updatePrice(prop.id, parseInt((e.target as HTMLInputElement).value))}
                           defaultValue={prop.price}
                           className="text-4xl font-bold bg-[#0B422B] text-white w-full py-2 px-4 rounded-xl outline-none"
                        />
                      ) : (
                        <div 
                          onClick={() => setEditingPrice(prop.id)}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                           <div className="flex items-center gap-2">
                              <span className="text-zinc-300 text-3xl font-light italic">₹</span>
                              <span className="text-4xl font-bold font-[family-name:var(--font-playfair)] tracking-tight text-[#0B422B] animate-pulse-slow">
                                {prop.price.toLocaleString()}
                              </span>
                           </div>
                           <ArrowUpRight className="w-5 h-5 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                   </div>

                   <div className="pt-8 border-t border-[#D4AF37]/10 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                         <Eye className="w-5 h-5 text-zinc-300" />
                         <span className="text-[8px] uppercase tracking-widest font-bold text-zinc-400">Last updated 12m ago</span>
                      </div>
                      <button className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] hover:tracking-[0.3em] transition-all">Details</button>
                   </div>
                </div>
              </motion.div>
            ))}
         </section>
      </main>

      {/* FOOTER STATS */}
      <footer className="ml-80 border-t border-zinc-100 py-10 px-16 flex justify-between items-center text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold">
         <p>© 2026 Luxury Lagoon Resort Portfolio Hub</p>
         <div className="flex items-center gap-8">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Network Status: Stable</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> End-to-End Encrypted</span>
         </div>
      </footer>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
  );
}
