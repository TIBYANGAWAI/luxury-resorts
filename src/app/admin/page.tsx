"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Hotel, Users, Settings, LogOut, 
  MapPin, Calendar, TrendingUp, DollarSign,
  ArrowUpRight, CheckCircle, XCircle, BarChart3,
  Search, ShieldCheck, Mail, Share2
} from "lucide-react";
import Image from "next/image";

// 🏆 THE TAJ STANDARD: BHATKAL EXCLUSIVE INVENTORY
const tajBhatkalInventory = [
  {
    id: "luxury-lagoon",
    name: "Luxury Lagoon Resort",
    location: "NH Bhatkal",
    image: "/images/interior.png",
    price: 5000,
    status: "Active",
    revenue: "₹2.25L",
    growth: "+15.2%"
  },
  {
    id: "jungle-stay",
    name: "The Jungle Stay",
    location: "Sagar Road, Bhatkal",
    image: "/images/brand-jungle.png",
    price: 10000,
    status: "Active",
    revenue: "₹1.80L",
    growth: "+22.5%"
  },
  {
    id: "beach-house",
    name: "Luxury Beach House",
    location: "Jali Bhatkal",
    image: "/images/brand-beach.png",
    price: 40000,
    status: "Maintenance",
    revenue: "₹3.40L",
    growth: "+8.9%"
  }
];

export default function TajAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inventory, setInventory] = useState(tajBhatkalInventory);
  const [activeTab, setActiveTab] = useState("inventory");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const updatePrice = (id: string, price: number) => {
    setInventory(prev => prev.map(p => p.id === id ? { ...p, price } : p));
    setEditingId(null);
  };

  const toggleStatus = (id: string) => {
    setInventory(prev => prev.map(p => p.id === id ? { ...p, status: p.status === "Active" ? "Maintenance" : "Active" } : p));
  };

  // 1. SECURE TERMINAL (THE VAULT)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0B422B] flex items-center justify-center p-8 selection:bg-[#D4AF37] selection:text-white">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none grayscale">
          <Image src="/images/hero.png" alt="Overlay" fill className="object-cover" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-white/5 backdrop-blur-2xl p-16 rounded-[4rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative z-10"
        >
          <div className="text-center mb-16">
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl text-white italic mb-4">The Taj Terminal</h1>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-bold">Elite Portfolio Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-8">
            <input 
              type="text" 
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="System Identifier"
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-10 py-6 text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] transition-all"
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Executive Key"
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-10 py-6 text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] transition-all"
            />
            {error && <p className="text-red-400 text-[10px] text-center uppercase tracking-widest font-bold">Protocol Error: Access Denied</p>}
            <button className="w-full bg-[#D4AF37] hover:bg-white text-[#0B422B] py-6 rounded-[2rem] font-bold uppercase tracking-[0.5em] text-[11px] transition-all active:scale-95 shadow-2xl">
              Initialize Session
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 2. MODERN DASHBOARD UI
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B422B]">
      {/* Sleek Navigation Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-80 bg-[#0B422B] p-12 flex flex-col z-50">
         <div className="mb-24">
            <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.6em] font-extrabold mb-1">Taj Edition</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-white italic">Luxury Lagoon</h2>
         </div>
         <nav className="flex-1 space-y-6">
            {[
              { id: "dashboard", label: "Executive Desk", icon: LayoutDashboard },
              { id: "inventory", label: "Taj Portfolio", icon: Hotel },
              { id: "analytics", label: "Revenue Grid", icon: BarChart3 },
              { id: "settings", label: "System Core", icon: Settings },
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-6 px-4 py-4 rounded-3xl transition-all ${activeTab === item.id ? 'bg-[#D4AF37] text-white' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-widest leading-none">{item.label}</span>
              </button>
            ))}
         </nav>
         <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-6 text-red-300 font-bold text-[10px] uppercase tracking-widest hover:text-red-400">
            <LogOut className="w-5 h-5" /> Terminate Session
         </button>
      </aside>

      <main className="ml-80 p-20 max-w-7xl">
         {/* HEADER SUMMARY SECTION */}
         <header className="flex justify-between items-start mb-20">
            <div className="space-y-3">
               <h1 className="font-[family-name:var(--font-playfair)] text-5xl italic tracking-tighter">Taj Dashboard</h1>
               <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Server Optimized: Bhatkal Hub</span>
                  <span className="text-zinc-300">|</span>
                  <span className="text-zinc-400">Build 3.0.1 (Stable)</span>
               </div>
            </div>
            <div className="flex items-center gap-8 border-l border-zinc-200 pl-8">
               <div className="text-right">
                  <p className="text-[11px] font-bold text-[#0B422B] uppercase tracking-widest leading-none mb-1">Chief Executive</p>
                  <p className="text-[9px] text-[#D4AF37] uppercase tracking-[0.3em] font-extrabold uppercase">Authenticated</p>
               </div>
               <div className="w-14 h-14 bg-[#0B422B] rounded-3xl flex items-center justify-center text-white border-4 border-white shadow-2xl font-bold">LL</div>
            </div>
         </header>

         {/* REVENUE INSIGHTS (TAJ STANDARD) */}
         <section className="mb-20">
            <div className="bg-white rounded-[3rem] p-12 shadow-[0_30px_60px_-15px_rgba(11,66,43,0.05)] border border-zinc-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                  <TrendingUp className="w-40 h-40 text-[#0B422B]" />
               </div>
               <div className="flex justify-between items-center mb-16 relative z-10">
                  <div>
                     <h3 className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-zinc-400 mb-2">Revenue Insights</h3>
                     <p className="font-[family-name:var(--font-playfair)] text-3xl italic">Monthly Performance Velocity</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="px-6 py-3 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">Growth: +28.4%</span>
                     </div>
                  </div>
               </div>
               
               <div className="h-64 flex items-end justify-between gap-6 relative z-10">
                  {[65, 45, 85, 35, 95, 55, 100, 75, 45, 80, 60, 90].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="flex-1 group relative"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                    >
                       <div className="w-full h-full bg-[#0B422B]/5 rounded-2xl group-hover:bg-[#D4AF37]/20 transition-all duration-500 relative overflow-hidden">
                          <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#0B422B] transition-all group-hover:bg-[#D4AF37] ${i === 6 ? 'opacity-40' : 'opacity-10'}`} />
                       </div>
                       <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] font-bold text-zinc-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Month {i+1}</span>
                    </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* PROPERTY GRID (GLASSMORPHISM CARDS) */}
         <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {inventory.map((property) => (
              <motion.div 
                key={property.id}
                whileHover={{ y: -10 }}
                className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[3rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]"
              >
                <div className="h-64 relative group">
                   <Image src={property.image} alt={property.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute top-8 right-8">
                      <button 
                        onClick={() => toggleStatus(property.id)}
                        className={`px-5 py-2 rounded-full text-[9px] uppercase font-extrabold tracking-[0.2em] backdrop-blur-md border border-white/20 transition-all ${property.status === "Active" ? 'bg-green-500/80 text-white' : 'bg-orange-500/80 text-white'}`}
                      >
                         {property.status}
                      </button>
                   </div>
                   <div className="absolute bottom-8 left-8 text-white">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4AF37] mb-2">
                         <MapPin className="w-3.5 h-3.5" /> {property.location}
                      </div>
                      <h4 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight">{property.name}</h4>
                   </div>
                </div>

                <div className="p-12 space-y-12">
                   <div className="flex justify-between items-center bg-zinc-50/50 p-6 rounded-[2rem]">
                      <div>
                         <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-bold mb-1">Monthly Revenue</p>
                         <p className="text-2xl font-bold text-[#0B422B]">{property.revenue}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-bold mb-1">MoM Growth</p>
                         <p className="text-sm font-bold text-green-600">{property.growth}</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-extrabold block">Price Management</label>
                      {editingId === property.id ? (
                        <div className="flex items-center gap-4">
                           <input 
                              type="number"
                              autoFocus
                              className="text-3xl font-bold bg-[#0B422B] text-white w-full px-6 py-4 rounded-3xl outline-none"
                              defaultValue={property.price}
                              onBlur={(e) => updatePrice(property.id, parseInt(e.target.value))}
                              onKeyDown={(e) => e.key === 'Enter' && updatePrice(property.id, parseInt((e.target as HTMLInputElement).value))}
                           />
                        </div>
                      ) : (
                        <div 
                           onClick={() => setEditingId(property.id)}
                           className="flex items-center justify-between p-8 border-2 border-zinc-100 rounded-[2rem] cursor-pointer hover:border-[#D4AF37] transition-all group"
                        >
                           <div className="flex items-center gap-3">
                              <span className="text-zinc-300 text-3xl font-light italic">₹</span>
                              <span className="text-4xl font-bold tracking-tighter text-[#0B422B]">{property.price.toLocaleString()}</span>
                           </div>
                           <ArrowUpRight className="w-6 h-6 text-zinc-200 group-hover:text-[#D4AF37] transition-all" />
                        </div>
                      )}
                   </div>

                   <div className="pt-8 border-t border-zinc-50 flex justify-between items-center text-zinc-400">
                      <div className="flex items-center gap-3">
                         <ShieldCheck className="w-5 h-5 text-green-500" />
                         <span className="text-[10px] font-bold uppercase tracking-widest uppercase">Inventory Verified</span>
                      </div>
                      <div className="flex gap-4">
                         <Share2 className="w-4 h-4 cursor-pointer hover:text-[#D4AF37]" />
                         <Mail className="w-4 h-4 cursor-pointer hover:text-[#D4AF37]" />
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
         </section>
      </main>

      {/* TAJ FOOTER AUTH */}
      <footer className="ml-80 py-12 px-20 border-t border-zinc-100 flex justify-between items-center text-[10px] text-zinc-400 uppercase tracking-[0.4em] font-bold">
         <p>© 2026 Luxury Lagoon Resort • Sovereign Management Suite</p>
         <div className="flex items-center gap-8">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" /> Real-time Node Status: Optimal</span>
         </div>
      </footer>
    </div>
  );
}
