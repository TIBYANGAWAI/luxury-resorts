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

// Mock Data matching the new Bhatkal portfolio
const initialResorts = [
  {
    id: 1,
    property: "Luxury Lagoon Resort",
    name: "Luxury Lagoon Resort",
    location: "NH Bhatkal",
    image: "/images/interior.png",
    price: 5000,
    status: "Available",
    bookings: 45,
    revenue: 225000
  },
  {
    id: 2,
    property: "The Jungle Stay",
    name: "The Jungle Stay",
    location: "Sagar Road, Bhatkal",
    image: "/images/brand-jungle.png",
    price: 10000,
    status: "Available",
    bookings: 22,
    revenue: 220000
  },
  {
    id: 3,
    property: "Luxury Beach House",
    name: "Luxury Beach House",
    location: "Jali Bhatkal",
    image: "/images/brand-beach.png",
    price: 40000,
    status: "Booked",
    bookings: 8,
    revenue: 320000
  }
];

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [resortsList, setResortsList] = useState(initialResorts);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const mockReservations = [
    { id: 1, guest: "Isabella Sharma", property: "Luxury Lagoon Resort", suite: "Deluxe King", dates: "Oct 12 - 18", status: "Confirmed", phone: "+919372284069" },
    { id: 2, guest: "Maximilian Hoffmann", property: "The Jungle Stay", suite: "Forest Cabin", dates: "Oct 20 - 25", status: "Pending", phone: "+919372284069" },
    { id: 3, guest: "Eleanor Crawford", property: "Luxury Beach House", suite: "Oceanfront Villa", dates: "Nov 02 - 08", status: "Confirmed", phone: "+919372284069" }
  ];

  const triggerSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Maintain established 'Vault' login credentials
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
          <Image src="/images/hero.png" alt="Resort" fill className="object-cover scale-110 blur-[10px] brightness-[0.6]" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-[#0B422B]/80 backdrop-blur-2xl p-16 rounded-[3rem] border border-white/20 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] relative z-10 text-white"
        >
          <div className="flex flex-col items-center mb-16">
            <div className="relative h-20 w-44 mb-10">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white text-center mb-4 tracking-tight italic">Luxury Lagoon Vault</h1>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold">Encrypted Multi-Property Terminal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-12">
            <div className="relative group">
              <input 
                type="text" 
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Admin Identity" 
                className="w-full bg-transparent border-b border-[#D4AF37]/30 py-5 text-lg outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20 font-light"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-focus-within:w-full transition-all duration-500"></div>
            </div>
            <div className="relative group">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Elite Access Key" 
                className="w-full bg-transparent border-b border-[#D4AF37]/30 py-5 text-lg outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20 font-light"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-focus-within:w-full transition-all duration-500"></div>
            </div>
            
            {error && (
              <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">Protocol Violation: Access Refused</p>
            )}

            <button className="w-full bg-[#D4AF37] hover:bg-white text-[#0B422B] py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] transition-all shadow-2xl flex items-center justify-center gap-4 group mt-10">
              Unlock Terminal <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
               <p className="text-[10px] uppercase tracking-[.2em] font-bold">Synchronized</p>
               <p className="text-xs text-zinc-400">Inventory modifications applied globally</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#0B422B] text-white flex flex-col fixed inset-y-0 shadow-2xl z-20">
        <div className="p-12 mb-8 border-b border-white/5 relative bg-black/10">
          <div className="relative h-14 w-40">
             <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-4">
          {[
            { id: "dashboard", label: "Executive Overview", icon: LayoutDashboard },
            { id: "inventory", label: "Pricing Manager", icon: Hotel },
            { id: "bookings", label: "Bookings Ledger", icon: BarChart3 },
            { id: "users", label: "Guest Registry", icon: Users },
            { id: "settings", label: "System Config", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${activeTab === item.id ? 'bg-[#D4AF37] text-white shadow-lg' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
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
            <LogOut className="w-5 h-5" /> Terminate Session
          </button>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-80 p-12 overflow-y-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold italic mb-2">Portfolio Management</h2>
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-semibold">Luxury Lagoon Resort Group • Version 1.0.2 (Bhatkal Collection)</p>
          </div>
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-4 border-l border-zinc-200 pl-8">
               <div className="text-right">
                 <p className="text-xs font-bold uppercase tracking-widest text-[#0B422B]">System Operator</p>
                 <p className="text-[10px] text-zinc-400">Chief Conservator</p>
               </div>
               <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0B422B] font-bold border-2 border-white shadow-xl">LL</div>
             </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT CONTAINER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {activeTab === "dashboard" && (
              <div className="space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {resortsList.map(p => (
                      <div key={p.id} className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">
                         <div>
                            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold mb-2 block">{p.name}</span>
                            <h4 className="font-[family-name:var(--font-playfair)] text-2xl font-bold italic mb-6">Revenue Overview</h4>
                         </div>
                         <div className="space-y-2">
                            <p className="text-[#0B422B] text-4xl font-bold">₹{p.revenue.toLocaleString()}</p>
                            <p className="text-[10px] uppercase tracking-widest text-green-600 font-bold">↑ 12% vs last month</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="bg-white rounded-[2rem] p-12 border border-zinc-100">
                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold mb-8 italic">Performance Analytics</h3>
                    <div className="h-[300px] w-full bg-zinc-50 rounded-2xl flex items-end justify-between p-10 gap-4">
                       {[60, 45, 85, 55, 75, 95, 65, 80, 50, 70, 90, 100].map((h, i) => (
                         <div key={i} className="flex-1 bg-[#0B422B]/10 rounded-t-lg relative group">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              className="absolute bottom-0 left-0 right-0 bg-[#0B422B] rounded-t-lg transition-all group-hover:bg-[#D4AF37]"
                            />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="space-y-8">
                 <div className="flex justify-between items-end mb-12">
                   <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold italic">Reservations Ledger</h3>
                   <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                      <input type="text" placeholder="Search Master Log" className="bg-white border border-zinc-100 rounded-xl pl-12 pr-6 py-3 text-xs w-64 outline-none focus:border-[#D4AF37] transition-all shadow-sm" />
                   </div>
                 </div>

                 <div className="bg-white rounded-[2rem] overflow-hidden border border-zinc-100 shadow-sm">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-zinc-50 border-b border-zinc-100">
                             <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Guest</th>
                             <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Property</th>
                             <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Category</th>
                             <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Dates</th>
                             <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Status</th>
                             <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-zinc-400 text-right">Action</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-zinc-50">
                          {mockReservations.map((res) => (
                            <tr key={res.id} className="hover:bg-zinc-50/50 transition-colors">
                               <td className="p-6 font-bold">{res.guest}</td>
                               <td className="p-6 italic text-[#D4AF37]">{res.property}</td>
                               <td className="p-6 text-xs text-zinc-500">{res.suite}</td>
                               <td className="p-6 text-xs text-zinc-500">{res.dates}</td>
                               <td className="p-6">
                                  <span className={`px-4 py-1.5 rounded-full text-[8px] uppercase tracking-widest font-bold ${res.status === 'Confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-600'}`}>
                                     {res.status}
                                  </span>
                               </td>
                               <td className="p-6 text-right">
                                  <button className="bg-[#0B422B] text-white p-2 rounded-lg hover:bg-[#D4AF37] transition-all">
                                     <Eye className="w-4 h-4" />
                                  </button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            )}

            {activeTab === "inventory" && (
              <div className="space-y-12">
                 <div className="text-center mb-16">
                    <h3 className="font-[family-name:var(--font-playfair)] text-4xl font-bold italic mb-4">Pricing Manager</h3>
                    <p className="text-zinc-400 text-sm italic">Optimize daily values for the elite Bhatkal collection</p>
                 </div>

                 <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    {resortsList.map((resort) => (
                      <div key={resort.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-zinc-100 group transition-all duration-500 hover:shadow-2xl">
                        <div className="relative h-48">
                          <Image src={resort.image} alt={resort.name} fill className="object-cover" />
                        </div>
                        <div className="p-10">
                           <h4 className="font-[family-name:var(--font-playfair)] text-xl font-bold italic mb-6">{resort.name}</h4>
                           <div className="space-y-6">
                              <div>
                                 <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-300 mb-2 block">Premium Daily Rate (₹)</label>
                                 <input 
                                   type="number"
                                   value={resort.price}
                                   onChange={(e) => updatePrice(resort.id, e.target.value)}
                                   className="w-full bg-[#FAF9F6] border border-[#D4AF37]/20 px-4 py-4 rounded-xl text-xl font-bold text-[#0B422B] focus:border-[#D4AF37] outline-none transition-colors" 
                                 />
                              </div>
                              <button 
                                onClick={() => toggleAvailability(resort.id)}
                                className={`w-full py-4 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-3 ${resort.status === "Available" ? 'bg-[#0B422B] text-white' : 'bg-red-50 text-red-600'}`}
                              >
                                {resort.status === "Available" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                {resort.status === "Available" ? "Publicly Visible" : "Withdrawn from Portal"}
                              </button>
                           </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === "users" && (
               <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                 <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                    <Users className="w-10 h-10 text-zinc-300" />
                 </div>
                 <h3 className="text-2xl font-[family-name:var(--font-playfair)] italic mb-2">Registry Expansion</h3>
                 <p className="text-zinc-400 text-xs uppercase tracking-widest">Compiling guest data for precision service.</p>
               </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
