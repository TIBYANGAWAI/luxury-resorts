"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Users, ChevronDown, Phone, MapPin, Star,
  Wifi, Coffee, ShieldCheck, CreditCard, CheckCircle2, DoorOpen,
  Heart, Flame, Bird, HandHeart, ArrowRight, Crown, Leaf, GlassWater, Sparkles, Menu, Search, X, Hotel
} from "lucide-react";
import Image from "next/image";

const heroSlides = [
  { image: "/images/slider_1.jpg", subtitle: "Luxury Lagoon Resort", title: "Epitome Of Comfort And", highlight: "Eco-Sensitive" },
  { image: "/images/slider_2.png", subtitle: "Luxury Guest House", title: "Your Private Haven In", highlight: "The Wilderness" },
  { image: "/images/slider_3.jpg", subtitle: "Luxury Cottage", title: "Bespoke Elegance Meets", highlight: "Natural Charm" }
];

const resorts = [
  {
    id: 1,
    name: "The Emerald Forest Resort",
    location: "Munnar, Kerala",
    image: "/images/resort_1.png",
    description: "Nestled in the lush hills with private forest trails and eco-luxury suites featuring breathtaking valley views."
  },
  {
    id: 2,
    name: "Golden Sands Retreat",
    location: "Goa",
    image: "/images/resort_2.png",
    description: "Beachfront villas redefining coastal elegance with private plunge pools, world-class spas, and sunset fine dining."
  },
  {
    id: 3,
    name: "Himalayan Myst",
    location: "Shimla, Himachal Pradesh",
    image: "/images/resort_3.png",
    description: "Snow-capped luxury where you can touch the sky from your private terrace, complete with crackling fireplaces."
  }
];

const reasons = [
  { icon: ShieldCheck, title: "Best Rate Guarantee", desc: "Always get the lowest price when booking directly." },
  { icon: Coffee, title: "Free Breakfast", desc: "Enjoy a complimentary gourmet breakfast every morning." },
  { icon: Wifi, title: "Free Premium Wi-Fi", desc: "Stay seamlessly connected with high-speed internet." },
  { icon: CheckCircle2, title: "Free Cancellation", desc: "Flexible plans with free cancellation on standard rates." },
  { icon: DoorOpen, title: "Last Room Availability", desc: "Exclusive access to our last remaining suites." },
  { icon: CreditCard, title: "Pay At Hotel", desc: "Secure your reservation now, pay upon arrival." },
];

const experiences = [
  { icon: HandHeart, title: "Spa & Ayurveda", desc: "Rejuvenate your mind and body amidst serene surroundings." },
  { icon: Flame, title: "Barbeque Nights", desc: "Savor exquisite grills expertly prepared by our master chefs under the stars." },
  { icon: Heart, title: "Yoga Retreat", desc: "Practice tranquility with guided sunrise and sunset yoga sessions." },
  { icon: GlassWater, title: "Floating Breakfast", desc: "Start your day indulging in a floating breakfast in your private plunge pool." },
  { icon: Sparkles, title: "Candlelight Dinner", desc: "Intimate and bespoke dining setups tailored for your special moments." },
  { icon: Bird, title: "Bird Watching", desc: "Explore local ecology with our expert naturalists on guided trails." },
];

const ourBrands = [
  { name: "K&K Realestate", image: "/images/brand-kk.png" },
  { name: "Luxury Beach House", image: "/images/brand-beach.png" },
  { name: "Coconut Oil", image: "/images/brand-coconut.png" },
  { name: "Jungle Stay", image: "/images/brand-jungle.png" }
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileBookingOpen, setIsMobileBookingOpen] = useState(false);

  // --- NEW BOOKING BAR STATES ---
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState("");
  
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [errorMsg, setErrorMsg] = useState("");

  const handleBookNow = () => {
    if (!selectedDest || !startDate || !endDate) {
      setErrorMsg("Select Sanctuary & Dates");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }
    alert(`Booking: ${selectedDest}, ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}, ${adults + children} Guests`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Calendar Helpers
  const renderCalendar = (monthOffset: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthName = date.toLocaleString('default', { month: 'long' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

    return (
      <div className="w-full">
        <h4 className="text-center font-bold text-[#0B422B] mb-4 uppercase text-[10px] tracking-widest">{monthName} {year}</h4>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-[9px] text-zinc-300 text-center font-bold">{d}</div>)}
          {days.map((d, i) => {
            if (!d) return <div key={i} />;
            const isStart = startDate && d.toDateString() === startDate.toDateString();
            const isEnd = endDate && d.toDateString() === endDate.toDateString();
            const isInRange = startDate && endDate && d > startDate && d < endDate;
            
            return (
              <button 
                key={i} 
                onClick={(e) => {
                  e.stopPropagation();
                  if (!startDate || (startDate && endDate)) {
                    setStartDate(d);
                    setEndDate(null);
                  } else {
                    if (d < startDate) {
                      setStartDate(d);
                      setEndDate(null);
                    } else {
                      setEndDate(d);
                    }
                  }
                }}
                className={`h-8 w-8 text-[10px] rounded-full flex items-center justify-center transition-all ${isStart || isEnd ? 'bg-[#D4AF37] text-white font-bold' : isInRange ? 'bg-[#D4AF37]/10 text-[#0B422B]' : 'hover:bg-zinc-50'}`}
              >
                {d.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-zinc-50 font-sans text-zinc-900 pb-[65px] md:pb-0 md:pt-[96px]">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out bg-white shadow-md ${scrolled ? 'md:-translate-y-full py-3' : 'translate-y-0 py-5'}`}>
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center group cursor-pointer p-2 z-10 w-10" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-7 h-7 text-[#0B422B]" />
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center flex-1 md:flex-none md:items-start absolute md:relative left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-28 md:h-14 md:w-36">
                <Image src="/images/logo.png" alt="Logo" fill className="object-contain md:object-left" />
              </div>
            </div>
            <span className={`hidden md:block text-[9px] tracking-[0.2em] uppercase mt-1 font-bold text-[#0B422B]`}>Leading Environmentally Sensitive Hotels</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden xl:flex items-center gap-8">
            <div className="group relative">
              <button className="flex items-center gap-1 font-semibold text-[11px] uppercase tracking-widest transition-colors text-[#0B422B] hover:text-[#D4AF37]">
                Find Hotels <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
              </button>
              {/* Mega Menu Dropdown */}
              <div className="absolute top-10 left-[-200px] w-[700px] bg-white text-black p-8 rounded shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 grid grid-cols-3 gap-8 border-t-4 border-[#0B422B]">
                <div>
                   <h3 className="text-[#0B422B] font-[family-name:var(--font-playfair)] text-xl font-bold mb-4 border-b border-zinc-200 pb-2">By Region</h3>
                   <ul className="space-y-3 text-xs text-zinc-600 font-semibold tracking-wider uppercase">
                     <li className="hover:text-[#D4AF37] hover:translate-x-1 transition-all cursor-pointer">North India</li>
                     <li className="hover:text-[#D4AF37] hover:translate-x-1 transition-all cursor-pointer">South India</li>
                     <li className="hover:text-[#D4AF37] hover:translate-x-1 transition-all cursor-pointer">Central India</li>
                     <li className="hover:text-[#D4AF37] hover:translate-x-1 transition-all cursor-pointer">West India</li>
                   </ul>
                </div>
                <div>
                   <h3 className="text-[#0B422B] font-[family-name:var(--font-playfair)] text-xl font-bold mb-4 border-b border-zinc-200 pb-2">Our Circuits</h3>
                   <ul className="space-y-3 text-xs text-zinc-600 font-semibold tracking-wider uppercase">
                     <li className="hover:text-[#D4AF37] hover:translate-x-1 transition-all cursor-pointer">Wildlife Safari</li>
                     <li className="hover:text-[#D4AF37] hover:translate-x-1 transition-all cursor-pointer">Coastal Retreats</li>
                     <li className="hover:text-[#D4AF37] hover:translate-x-1 transition-all cursor-pointer">Heritage Hubs</li>
                     <li className="hover:text-[#D4AF37] hover:translate-x-1 transition-all cursor-pointer">Mountain Escapes</li>
                   </ul>
                </div>
                <div className="relative h-full w-full rounded overflow-hidden">
                  <Image src="/images/interior.png" alt="Promo" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
                    <span className="text-white font-[family-name:var(--font-playfair)] text-xl font-bold">New Openings</span>
                    <span className="text-white/90 text-[10px] uppercase tracking-widest mt-1 group-hover:text-[#D4AF37] transition-colors flex items-center gap-1">Explore Now <ArrowRight className="w-3 h-3"/></span>
                  </div>
                </div>
              </div>
            </div>
            <a href="/services/" className="font-semibold text-[11px] uppercase tracking-widest transition-colors text-[#0B422B] hover:text-[#D4AF37]">Services</a>
            <a href="#" className="flex items-center gap-1 font-semibold text-[11px] uppercase tracking-widest transition-colors text-[#0B422B] hover:text-[#D4AF37]"><Crown className="w-3 h-3"/> Crown Collection</a>
            <a href="#" className="font-semibold text-[11px] uppercase tracking-widest transition-colors text-[#0B422B] hover:text-[#D4AF37]">Plan an Event</a>
            <a href="#" className="font-semibold text-[11px] uppercase tracking-widest transition-colors text-[#0B422B] hover:text-[#D4AF37]">Partner with Us</a>
          </nav>

          <div className="flex items-center justify-end gap-3 md:gap-6 z-10 w-10 md:w-auto">
            <div className="md:hidden text-[#0B422B]">
              <Search className="w-6 h-6" />
            </div>
            <button className="hidden md:block bg-[#D4AF37] hover:bg-[#b09028] text-white px-8 py-3 font-bold text-[10px] rounded transition-colors uppercase tracking-[0.2em]">
              Book Login
            </button>
          </div>
        </div>
      </header>

      {/* Overhauled Fern-Style Hero Section */}
      <section className="relative w-full h-auto lg:h-[85vh] overflow-visible bg-white">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left: Cinematic Image Slider */}
          <div className="relative w-full lg:w-[65%] h-[50vh] lg:h-full overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].subtitle}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Forest Green Content Block */}
          <div className="w-full lg:w-[35%] bg-[#0B422B] p-12 lg:p-24 flex flex-col justify-end lg:pb-32 items-start text-white relative">
            <motion.div
              key={`text-block-${currentSlide}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-[#D4AF37] uppercase text-[10px] font-bold tracking-[0.4em] mb-8">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-7xl font-light leading-[1.1] mb-10 tracking-tight italic">
                Seamless <br/> <span className="not-italic font-medium text-white/90">Stays</span>
              </h1>
              <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm mb-12">
                Experience the epitome of eco-sensitive luxury. Our sanctuaries are crafted for those who seek harmony between nature and comfort.
              </p>
              <button 
                onClick={() => setIsMobileBookingOpen(true)}
                className="bg-white/10 hover:bg-white text-white hover:text-[#0B422B] border border-white/20 px-10 py-5 font-bold uppercase tracking-[0.3em] transition-all rounded text-[10px]"
              >
                Explore Now
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating Desktop Booking Bar Integration - High Placement like Fern Hotels */}
        <div className={`hidden lg:block absolute left-0 right-0 z-40 transition-all duration-700 ease-in-out ${scrolled ? 'fixed top-0 w-full rounded-none' : 'top-[15%] px-20'}`}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mx-auto transition-all duration-700 backdrop-blur-3xl overflow-visible ${scrolled ? 'bg-white/95 border-b border-black/5 shadow-2xl' : 'bg-white/90 border border-[#0B422B]/10 shadow-xl rounded-xl max-w-[80rem]'}`}
          >
             <div className={`flex items-center justify-between transition-all duration-700 p-2 ${scrolled ? 'px-8' : ''}`}>
                 
                 {/* 1. Destination Dropdown */}
                 <div className="flex-1 py-4 px-8 border-r border-zinc-200 hover:bg-zinc-50 transition-all duration-300 cursor-pointer relative group flex items-center gap-4"
                      onClick={() => { setIsDestOpen(!isDestOpen); setIsDateOpen(false); setIsGuestOpen(false); }}>
                    <MapPin className="w-4 h-4 text-zinc-400" /> 
                    <span className="text-[15px] font-medium text-[#0B422B] tracking-tight">{selectedDest || "Book Your Destination"}</span>
                    
                    <AnimatePresence>
                      {isDestOpen && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                   className="absolute top-[calc(100%+12px)] left-0 w-full bg-white shadow-2xl p-4 rounded-xl border border-zinc-100 z-50">
                          {resorts.map(r => (
                            <div key={r.id} onClick={(e) => { e.stopPropagation(); setSelectedDest(r.name); setIsDestOpen(false); }}
                                 className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-[#0B422B] hover:text-[#D4AF37] hover:bg-zinc-50 rounded-xl transition-all border-b border-zinc-50 last:border-none">
                               {r.name}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
                 
                 {/* 2. Dual Pane Date Picker */}
                 <div className="flex-1 py-4 px-8 border-r border-zinc-200 hover:bg-zinc-50 transition-all duration-300 cursor-pointer relative flex items-center gap-4"
                      onClick={() => { setIsDateOpen(!isDateOpen); setIsDestOpen(false); setIsGuestOpen(false); }}>
                    <Calendar className="w-4 h-4 text-zinc-400" /> 
                    <span className="text-[15px] font-medium text-[#0B422B] tracking-tight">
                       {startDate ? `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endDate ? endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select Date'}` : "Select Dates"}
                    </span>
                    
                    <AnimatePresence>
                      {isDateOpen && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                   className="absolute top-[calc(100%+12px)] right-0 w-[600px] bg-white shadow-2xl p-8 rounded-[2rem] border border-zinc-100 z-50"
                                   onClick={(e) => e.stopPropagation()}>
                           <div className="grid grid-cols-2 gap-12">
                              {renderCalendar(0)}
                              {renderCalendar(1)}
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>

                 {/* 3. Guest Selector */}
                 <div className="w-[200px] py-4 px-8 hover:bg-zinc-50 transition-all duration-300 cursor-pointer relative flex items-center gap-4"
                      onClick={() => { setIsGuestOpen(!isGuestOpen); setIsDestOpen(false); setIsDateOpen(false); }}>
                    <Users className="w-4 h-4 text-zinc-400" /> 
                    <span className="text-[15px] font-medium text-[#0B422B] tracking-tight">{adults + children} Guests</span>

                    <AnimatePresence>
                      {isGuestOpen && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                   className="absolute top-[calc(100%+12px)] right-0 w-64 bg-white shadow-2xl p-8 rounded-2xl border border-zinc-100 z-50"
                                   onClick={(e) => e.stopPropagation()}>
                           <div className="space-y-8">
                             <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B422B]">Adults</span>
                                <div className="flex items-center gap-4">
                                   <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 rounded-full border border-zinc-200 text-[#D4AF37]">-</button>
                                   <span className="text-xs font-bold w-4 text-center">{adults}</span>
                                   <button onClick={() => setAdults(adults + 1)} className="w-7 h-7 rounded-full border border-zinc-200 text-[#D4AF37]">+</button>
                                </div>
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B422B]">Children</span>
                                <div className="flex items-center gap-4">
                                   <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-7 h-7 rounded-full border border-zinc-200 text-[#D4AF37]">-</button>
                                   <span className="text-xs font-bold w-4 text-center">{children}</span>
                                   <button onClick={() => setChildren(children + 1)} className="w-7 h-7 rounded-full border border-zinc-200 text-[#D4AF37]">+</button>
                                </div>
                             </div>
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>

                 <div className="w-[220px] px-2 relative h-[56px]">
                    <button onClick={handleBookNow}
                            className="w-full h-full bg-[#0B422B] hover:bg-[#D4AF37] text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-md rounded-lg">
                       BOOK NOW
                    </button>
                 </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals Ribbon */}
      <div className="bg-[#0B422B] py-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-70 grayscale contrast-125 brightness-200">
            <span className="text-white font-[family-name:var(--font-playfair)] text-lg md:text-xl font-bold tracking-widest italic flex items-center gap-2 saturate-0 scale-90">Tripadvisor <Star className="w-4 h-4 fill-white" /></span>
            <span className="text-white font-[family-name:var(--font-playfair)] text-lg md:text-xl font-bold tracking-widest flex items-center gap-2 scale-90">FORBES <span className="text-[10px] uppercase font-sans tracking-widest">Travel Guide</span></span>
            <span className="text-white font-[family-name:var(--font-playfair)] text-lg md:text-xl font-bold tracking-widest uppercase scale-90">Condé Nast Traveler</span>
            <span className="text-white font-[family-name:var(--font-playfair)] text-lg md:text-xl font-bold tracking-widest scale-90">TRAVEL + LEISURE</span>
          </div>
        </div>
      </div>

      {/* Why Book With Us Section */}
      <section className="bg-white py-48 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
             <h2 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-6xl text-[#0B422B] mb-8 tracking-tight">The Art Of Hospitality</h2>
             <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mb-8"></div>
             <p className="text-zinc-500 max-w-2xl mx-auto text-xl font-light italic">Experience the unparalleled benefits reserved exclusively for our direct guests.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
            {reasons.map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: idx * 0.1, duration: 0.6 }}
                 className="flex flex-col items-center text-center group"
               >
                 <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-6 group-hover:bg-[#0B422B] transition-colors duration-300">
                   <item.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-white transition-colors duration-300" />
                 </div>
                 <h3 className="font-serif text-xl text-[#0B422B] font-bold mb-3">{item.title}</h3>
                 <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-[80%]">{item.desc}</p>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resort Cards Grid */}
      <section className="bg-zinc-50 py-48">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-32"
          >
            <span className="text-[#D4AF37] font-semibold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our Circuits</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl text-[#0B422B] mb-8 font-light italic">Handpicked Haven</h2>
            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mb-10"></div>
            <p className="text-zinc-500 max-w-4xl mx-auto text-xl font-light leading-relaxed">Inviting you to a world of sublime hospitality, unmatched comfort, and faultless service. Discover experiences bespoke and tailored to your unique needs.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
            {resorts.map((resort, idx) => (
              <motion.div 
                key={resort.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                className="group flex flex-col items-center text-center"
              >
                  <div className="relative w-full aspect-[4/5] mb-12 overflow-hidden mask-arch">
                    <Image 
                      src={resort.image}
                      alt={resort.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"/>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] mb-4 font-bold tracking-[0.3em] uppercase">
                      <MapPin className="w-3.5 h-3.5" /> {resort.location}
                    </div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl text-[#0B422B] mb-6 font-normal italic">{resort.name}</h3>
                    <p className="text-zinc-500 leading-relaxed font-light text-base max-w-[280px] mb-10">{resort.description}</p>
                    
                    <button className="border border-[#D4AF37]/30 text-[#0B422B] hover:text-white hover:bg-[#0B422B] uppercase tracking-[0.3em] text-[10px] font-bold transition-all py-4 px-10 rounded relative overflow-hidden shimmer-btn">
                      Explore Hotel
                    </button>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Experience Grid with Parallax Placeholder Effect */}
      <section className="py-48 bg-white relative overflow-hidden">
        {/* Parallax Background Element */}
        <motion.div 
           initial={{ y: 0 }}
           whileInView={{ y: -100 }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="absolute top-0 right-0 w-[600px] h-[800px] bg-[#FDFBF7] rounded-full blur-3xl -z-10" 
        />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8"
          >
            <div className="max-w-3xl">
              <span className="text-[#D4AF37] font-semibold tracking-[0.4em] uppercase text-[10px] mb-6 block">Live The Moment</span>
              <h2 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-7xl text-[#0B422B] mb-8 font-light">Experiences <span className="italic">Redefined</span></h2>
              <div className="w-24 h-[1px] bg-[#D4AF37] mb-10"></div>
              <p className="text-zinc-500 text-xl font-light leading-relaxed">
                Unlock a world of bespoke adventures. From Michelin-starred dining to holistic wellness retreats, immerse yourself in our signature collections.
              </p>
            </div>
            <a href="/services/" className="flex items-center gap-4 text-[#0B422B] hover:text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold transition-all group">
              Explore All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2"/>
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "World-Class Spa", img: "/images/interior.png", icon: Sparkles },
              { title: "Fine Dining", img: "/images/resort_2.png", icon: GlassWater },
              { title: "Private Tours", img: "/images/hero.png", icon: MapPin }
            ].map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                <Image src={exp.img} alt={exp.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <exp.icon className="w-10 h-10 text-[#D4AF37] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-white font-[family-name:var(--font-playfair)] text-3xl mb-4">{exp.title}</h3>
                  <button className="text-white text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 underline underline-offset-8">Discover More</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Stories Section */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none">
           <Crown className="w-96 h-96 text-[#0B422B]" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <span className="text-[#D4AF37] font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">Reviews</span>
             <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-[#0B422B] mb-6">Guest Stories</h2>
             <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div 
               initial={{ opacity: 0, x: -30 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               viewport={{ once: true }}
               className="p-12 bg-zinc-50 rounded-3xl relative"
            >
               <Sparkles className="w-8 h-8 text-[#D4AF37] mb-8" />
               <p className="font-serif italic text-2xl md:text-3xl text-[#0B422B] leading-relaxed mb-10">
                 "An unmatched experience of serenity and luxury. The attention to detail in every corner of the property is truly breathtaking."
               </p>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0B422B]/10 flex items-center justify-center font-bold text-[#0B422B]">ES</div>
                  <div>
                    <p className="font-bold text-[#0B422B] text-sm italic">Eleanor St. James</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">London, UK</p>
                  </div>
               </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 30 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               viewport={{ once: true }}
               className="p-12 bg-zinc-50 rounded-3xl relative mt-12 md:mt-24"
            >
               <Sparkles className="w-8 h-8 text-[#D4AF37] mb-8" />
               <p className="font-serif italic text-2xl md:text-3xl text-[#0B422B] leading-relaxed mb-10">
                 "Truly the epitome of sustainable luxury. Our stay was perfect from the floating breakfast to the starlit dinners."
               </p>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0B422B]/10 flex items-center justify-center font-bold text-[#0B422B]">MH</div>
                  <div>
                    <p className="font-bold text-[#0B422B] text-sm italic">Maximilian Hoffmann</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">Berlin, Germany</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events & Weddings (Vivaah) */}
      <section className="w-full bg-[#0B422B] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Content Side */}
          <div className="p-12 md:p-24 lg:p-32 flex flex-col justify-center">
             <span className="text-[#D4AF37] font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">Vivaah & Conferences</span>
             <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl mb-6">Unforgettable Celebrations & Events</h2>
             <p className="text-white/70 text-lg font-light leading-relaxed mb-10">
               From intimate weddings to grand receptions, professional corporate conferences, and strategic team meetings, our dedicated event teams handle your special occasions with immaculate precision. Make every event grand.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-[#D4AF37] hover:bg-[#C19B2E] text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all text-center">
                   Plan an Event
                </button>
                <button className="border border-white/30 hover:bg-white hover:text-[#0B422B] text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all text-center">
                   Explore Vivaah
                </button>
             </div>
          </div>
          {/* Image Side */}
          <div className="relative h-[50vh] lg:h-auto min-h-[600px]">
             <Image src="/images/hero.png" alt="Events" fill className="object-cover" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0B422B] via-transparent to-transparent opacity-80 lg:opacity-100" />
          </div>
        </div>
      </section>

      {/* Our Brands Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#0B422B] font-bold mb-4">Our Brands</h2>
            <div className="w-16 h-1 bg-[#D4AF37] rounded" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {ourBrands.map((brand, idx) => (
              <div 
                key={idx} 
                className="group relative h-40 bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out flex items-center justify-center p-6 border border-zinc-100/50 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
              >
                <div className="relative w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <Image 
                    src={brand.image} 
                    alt={brand.name} 
                    fill 
                    className="object-contain" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Footer matching Fern Hotels */}
      <footer className="bg-zinc-950 text-white pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 border-b border-white/10 pb-16">
            <div className="col-span-1 pr-0 lg:pr-8">
               <div className="relative h-12 w-28 mb-6">
                 <Image src="/images/logo.png" alt="Logo" fill className="object-contain object-left invert brightness-0" />
               </div>
               <p className="text-white/60 font-light leading-relaxed text-[11px] mb-6">
                 Leading Environmentally Sensitive Hotels. Prioritizing eco-friendly practices like energy and water conservation.
               </p>
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-colors cursor-pointer text-white/80 hover:text-white">
                   <span className="text-[10px] font-serif italic font-bold">in</span>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-colors cursor-pointer text-white/80 hover:text-white">
                   <span className="text-[10px] font-serif italic font-bold">fb</span>
                 </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-colors cursor-pointer text-white/80 hover:text-white">
                    <span className="text-[10px] font-serif italic font-bold">ig</span>
                  </div>
                </div>
              </div>

              <div className="col-span-1 border-white/10 lg:border-l lg:pl-10">
                 <h4 className="font-sans font-bold uppercase tracking-widest text-[11px] mb-8 text-[#D4AF37]">Join the Inner Circle</h4>
                 <p className="text-white/40 text-[12px] leading-relaxed mb-6">Receive exclusive access to member rates and special curated offers.</p>
                 <div className="flex flex-col gap-3">
                   <input type="email" placeholder="Your Email Address" className="bg-white/5 border border-white/10 px-4 py-3 text-xs focus:border-[#D4AF37] outline-none transition-colors rounded" />
                   <button className="bg-[#D4AF37] hover:bg-[#b09028] text-white px-6 py-3 font-bold text-[10px] rounded transition-colors uppercase tracking-[0.2em]">Subscribe Now</button>
                 </div>
              </div>
            
            <div>
              <h4 className="font-sans font-bold uppercase tracking-widest text-[11px] mb-8 text-[#D4AF37]">Explore</h4>
              <ul className="space-y-4 text-white/60 font-light text-[13px] tracking-wide">
                <li><a href="#" className="hover:text-white transition-colors">Find Hotels</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crown Collection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Rate Guarantee</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Offers & Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Plan an Event</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vivaah by The Fern</a></li>
                <li><a href="/services/" className="hover:text-white transition-colors">Our Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-bold uppercase tracking-widest text-[11px] mb-8 text-[#D4AF37]">Company</h4>
              <ul className="space-y-4 text-white/60 font-light text-[13px] tracking-wide">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner with Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Company Corporate Profile</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pressroom / Media</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Opening Soon</a></li>
                <li><a href="/services/" className="hover:text-white transition-colors">Our Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-bold uppercase tracking-widest text-[11px] mb-8 text-[#D4AF37]">Policies & Contact</h4>
              <ul className="space-y-4 text-white/60 font-light text-[13px] tracking-wide">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Child Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDS Codes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pet Friendly Hotels</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row items-center justify-between text-white/30 text-[11px] font-light tracking-wider">
          <p>Copyright &copy; 2026, The Luxury Resorts & Hotels Portfolio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-medium text-white/40">
            <span>Our Brands</span>
            <span>|</span>
            <span>Sitemap</span>
          </div>
        </div>
      </footer>

      {/* Mobile Full-Screen Booking Modal */}
      <AnimatePresence>
        {isMobileBookingOpen && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col"
          >
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-[#FAF9F6]">
               <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0B422B] italic">Online Reservations</h3>
                  <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Secure Your Sanctuary</p>
               </div>
               <button onClick={() => setIsMobileBookingOpen(false)} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                  <X className="w-5 h-5 text-[#0B422B]" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-12">
               {/* 1. Destination */}
               <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-[#0B422B]/60 font-bold ml-1">Choice of Destination</label>
                  <div className="grid grid-cols-1 gap-3">
                     {resorts.map(r => (
                        <button 
                          key={r.id}
                          onClick={() => setSelectedDest(r.name)}
                          className={`w-full text-left px-6 py-5 rounded-2xl border transition-all flex items-center justify-between ${selectedDest === r.name ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]' : 'border-zinc-100'}`}
                        >
                           <span className="text-sm font-bold text-[#0B422B]">{r.name}</span>
                           {selectedDest === r.name && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                        </button>
                     ))}
                  </div>
               </div>

               {/* 2. Date Selector (Simplified for Mobile scroll) */}
               <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-[#0B422B]/60 font-bold ml-1">Travel Dates</label>
                  <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-zinc-100">
                     <div className="flex justify-between items-center mb-8 px-2">
                        <div className="flex flex-col">
                           <span className="text-[8px] uppercase tracking-widest font-bold text-zinc-400">Check-in</span>
                           <span className="text-sm font-bold text-[#0B422B]">{startDate ? startDate.toLocaleDateString() : 'Pick Date'}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                        <div className="flex flex-col text-right">
                           <span className="text-[8px] uppercase tracking-widest font-bold text-zinc-400">Check-out</span>
                           <span className="text-sm font-bold text-[#0B422B]">{endDate ? endDate.toLocaleDateString() : 'Pick Date'}</span>
                        </div>
                     </div>
                     <div className="overflow-visible">
                        {renderCalendar(0)}
                        <div className="mt-8">
                           {renderCalendar(1)}
                        </div>
                     </div>
                  </div>
               </div>

               {/* 3. Guests */}
               <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-[#0B422B]/60 font-bold ml-1">Occupancy</label>
                  <div className="flex gap-4">
                     <div className="flex-1 bg-zinc-50 p-6 rounded-2xl flex flex-col items-center gap-4">
                        <span className="text-xs font-bold text-[#0B422B]">Adults</span>
                        <div className="flex items-center gap-6">
                           <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-zinc-200 transition-colors">-</button>
                           <span className="font-bold text-lg">{adults}</span>
                           <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border border-zinc-200 transition-colors">+</button>
                        </div>
                     </div>
                     <div className="flex-1 bg-zinc-50 p-6 rounded-2xl flex flex-col items-center gap-4">
                        <span className="text-xs font-bold text-[#0B422B]">Children</span>
                        <div className="flex items-center gap-6">
                           <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-zinc-200 transition-colors">-</button>
                           <span className="font-bold text-lg">{children}</span>
                           <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border border-zinc-200 transition-colors">+</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-white border-t border-zinc-100">
               <button 
                  onClick={handleBookNow}
                  className="w-full bg-[#0B422B] text-white py-6 rounded-2xl font-bold uppercase tracking-[0.4em] text-xs transition-all shadow-2xl"
               >
                  Verify Availability
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between h-[75px]">
          <a href="#" className="flex-1 flex flex-col items-center justify-center gap-1.5 text-[#0B422B] transition-colors h-full">
            <Hotel className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Hotels</span>
          </a>
          
          <button 
            onClick={() => setIsMobileBookingOpen(true)}
            className="flex-1 flex flex-col items-center justify-center gap-1.5 bg-[#D4AF37] text-white h-full transition-colors active:bg-[#b09028]"
          >
            <Calendar className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Book Now</span>
          </button>
          
          <a href="tel:+919372284069" className="flex-1 flex flex-col items-center justify-center gap-1.5 text-[#0B422B] transition-colors h-full">
            <Phone className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Contact</span>
          </a>
          
          <button onClick={() => setIsMobileMenuOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-1.5 text-[#0B422B] transition-colors h-full">
            <Menu className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Menu</span>
          </button>
        </div>
      </div>
    </main>
  );
}
