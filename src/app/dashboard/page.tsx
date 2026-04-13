"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Hotel, Users, Settings, LogOut, 
  MapPin, Calendar, TrendingUp, DollarSign,
  ArrowUpRight, CheckCircle, XCircle, BarChart3,
  Search, ShieldCheck, Mail, Share2, UserCheck,
  Package, Clock, BellRing
} from "lucide-react";
import Image from "next/image";

// 🚀 TOTAL SYSTEM REBOOT: BHATKAL MASTER REVENUE DATA
const bhatkalEcosystem = [
  {
    id: "luxury-lagoon",
    name: "Luxury Lagoon Resort",
    location: "NH Bhatkal",
    image: "/images/interior.png",
    price: 5000,
    status: "Live",
    revenue: "₹4.8L",
    visitors: "1.2k"
  },
  {
    id: "jungle-stay",
    name: "The Jungle Stay",
    location: "Sagar Road, Bhatkal",
    image: "/images/brand-jungle.png",
    price: 10000,
    status: "Live",
    revenue: "₹2.2L",
    visitors: "450"
  },
  {
    id: "beach-house",
    name: "Luxury Beach House",
    location: "Jali Bhatkal",
    image: "/images/brand-beach.png",
    price: 40000,
    status: "Maintenance",
    revenue: "₹1.1L",
    visitors: "120"
  }
];

const mockCheckIns = [
  { id: 1, guest: "Isabella Sharma", property: "Luxury Lagoon", time: "10:30 AM", status: "Checked In" },
  { id: 2, guest: "Maximilian Hoffmann", property: "Jungle Stay", time: "12:45 PM", status: "Pending" },
  { id: 3, guest: "Eleanor Crawford", property: "Beach House", time: "02:15 PM", status: "Scheduled" }
];

export default function LuxuryDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [portfolio, setPortfolio] = useState(bhatkalEcosystem);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [activeProperty, setActiveProperty] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === "Admin" && password === "digi9513") {
      setIsLoggedIn(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0B422B] flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/20 shadow-2xl"
        >
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-white italic mb-2">Portfolio Master</h1>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold">Secure Dashboard Access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="text" 
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="System ID"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] transition-all"
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access Key"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37] transition-all"
            />
            {error && <p className="text-red-400 text-[10px] text-center font-bold">Protocol Violation</p>}
            <button className="w-full bg-[#D4AF37] text-[#0B422B] py-5 rounded-2xl font-bold uppercase tracking-[0.4em] text-[10px] transition-all hover:bg-white active:scale-95 shadow-xl">
               Authorize Entry
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B422B] flex font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-80 bg-[#0B422B] fixed inset-y-0 p-12 flex flex-col z-50">
         <div className="mb-20">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white italic mb-1">Luxury Lagoon</h2>
            <p className="text-[#D4AF37] text-[8px] uppercase tracking-[0.5em] font-extrabold">Executive Dashboard</p>
         </div>
         <nav className="flex-1 space-y-6">
            {[
              { label: "Executive View", icon: LayoutDashboard, active: true },
              { label: "Inventory Grid", icon: Hotel, active: false },
              { label: "Revenue Matrix", icon: BarChart3, active: false },
              { label: "Guest Terminal", icon: Users, active: false },
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-6 px-4 py-4 rounded-2xl transition-all ${item.active ? 'bg-[#D4AF37] text-white shadow-lg' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-widest leading-none">{item.label}</span>
              </button>
            ))}
         </nav>
         <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-6 text-red-300/60 font-bold text-[10px] uppercase tracking-widest hover:text-red-400">
            <LogOut className="w-5 h-5" /> Sign Out
         </button>
      </aside>

      <main className="ml-80 flex-1 p-20 max-w-[1600px]">
         {/* TOP STATS WIDGETS */}
         <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Total Asset Value", value: "₹4.5Cr", icon: Wallet, color: "text-blue-600" },
              { label: "Monthly Revenue", value: "₹8.1L", icon: TrendingUp, color: "text-green-600" },
              { label: "Active Guests", value: "84", icon: UserCheck, color: "text-purple-600" },
              { label: "Pending Tasks", value: "12", icon: BellRing, color: "text-orange-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-100 flex items-center gap-6 group hover:shadow-xl transition-all">
                 <div className={`w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                    <stat.icon className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-[9px] uppercase tracking-widest font-extrabold text-zinc-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold tracking-tight text-[#0B422B]">{stat.value}</p>
                 </div>
              </div>
            ))}
         </section>

         <div className="grid grid-cols-3 gap-12">
            {/* LEFT: REVENUE BY PROPERTY */}
            <div className="col-span-2 space-y-12">
               <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-4xl italic mb-1">Portfolio Matrix</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37]">Bhatkal Master Collection • Live Sync</p>
                  </div>
                  <button className="bg-white border border-zinc-100 px-6 py-3 rounded-full text-[9px] uppercase font-bold tracking-widest hover:bg-zinc-50 transition-all">Full Report <ArrowUpRight className="inline w-3 h-3 ml-2" /></button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {portfolio.map((prop) => (
                    <motion.div 
                      key={prop.id}
                      whileHover={{ y: -8 }}
                      className="bg-white/40 backdrop-blur-xl border border-[#D4AF37]/10 rounded-[3rem] overflow-hidden shadow-xl"
                    >
                      <div className="h-44 relative group">
                         <Image src={prop.image} alt={prop.name} fill className="object-cover transition-all duration-1000 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-[#0B422B]/20" />
                         <div className="absolute top-6 right-6">
                            <span className={`px-4 py-1.5 rounded-full text-[8px] uppercase font-bold tracking-widest border border-white/20 backdrop-blur-md ${prop.status === 'Live' ? 'bg-green-500/80 text-white' : 'bg-amber-500/80 text-white'}`}>
                               {prop.status}
                            </span>
                         </div>
                      </div>
                      <div className="p-8">
                         <h4 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-4">{prop.name}</h4>
                         <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                               <span className="text-zinc-400 uppercase tracking-widest font-bold text-[8px]">Revenue</span>
                               <span className="font-bold text-[#0B422B]">{prop.revenue}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                               <span className="text-zinc-400 uppercase tracking-widest font-bold text-[8px]">Visitors</span>
                               <span className="font-bold text-zinc-500">{prop.visitors}</span>
                            </div>
                            <div className="pt-6 border-t border-zinc-100">
                               <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] hover:tracking-[0.3em] transition-all cursor-pointer">Managed Portal <ArrowUpRight className="inline w-3 h-3 ml-1" /></p>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* RIGHT: LIVE GUEST TERMINAL */}
            <div className="col-span-1">
               <div className="bg-[#0B422B] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Users className="w-32 h-32" />
                  </div>
                  <div className="relative z-10 mb-12">
                     <h3 className="font-[family-name:var(--font-playfair)] text-3xl italic mb-2">Check-in Registry</h3>
                     <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.4em] font-extrabold">Real-time Guest Arrival</p>
                  </div>

                  <div className="space-y-8 relative z-10">
                     {mockCheckIns.map(guest => (
                       <div key={guest.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-serif text-xl italic text-[#D4AF37] border border-white/10">
                                {guest.guest.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-bold tracking-tight">{guest.guest}</p>
                                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">{guest.property}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-[#D4AF37] mb-1">{guest.time}</p>
                             <p className="text-[8px] uppercase tracking-widest font-bold text-white/20 group-hover:text-white/60 transition-colors uppercase">{guest.status}</p>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="absolute bottom-12 left-12 right-12">
                     <button className="w-full bg-[#D4AF37] text-[#0B422B] py-5 rounded-2xl font-extrabold uppercase tracking-[0.4em] text-[9px] transition-all hover:bg-white shadow-xl">
                        View Master Terminal
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </main>

      {/* SOVEREIGN FOOTER */}
      <footer className="ml-80 fixed bottom-0 left-0 right-0 py-10 px-20 border-t border-zinc-100 bg-white/50 backdrop-blur-md flex justify-between items-center text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-bold">
         <p>© 2026 Luxury Lagoon Resort Portfolio Management v3.4.1</p>
         <div className="flex items-center gap-10">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Asset Tracking: Active</span>
         </div>
      </footer>
    </div>
  );
}

function Wallet({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
  );
}
