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
            <a href="/services" className="font-semibold text-[11px] uppercase tracking-widest transition-colors text-[#0B422B] hover:text-[#D4AF37]">Services</a>
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

      {/* Desktop Booking Bar (Glass Pill Style -> Flat Bar Style on Scroll) */}
      <div className={`hidden md:block fixed left-0 right-0 w-full z-40 transition-all duration-500 ease-in-out ${scrolled ? 'top-0' : 'top-[170px]'}`}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`mx-auto transition-all duration-500 overflow-hidden backdrop-blur-xl ${scrolled ? 'max-w-full bg-white/60 border-b border-white/50 rounded-none shadow-md' : 'max-w-[55rem] bg-white/40 border border-white/40 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.4)] rounded-full'}`}
        >
           <div className={`flex items-center justify-between transition-all duration-500 p-2 ${scrolled ? 'max-w-[80rem] mx-auto' : ''}`}>
               {/* Destination Input */}
               <div className={`flex-[1.2] py-3.5 px-6 hover:bg-white/30 border-r border-black/10 transition-all duration-300 cursor-text flex flex-col justify-center group relative ${scrolled ? 'rounded-l-lg' : 'rounded-l-full'}`}>
                 <div className="flex items-center gap-2 text-[#0B422B] font-[family-name:var(--font-playfair)] text-[16px] tracking-wide">
                   <MapPin className="w-3.5 h-3.5 text-[#0B422B]" strokeWidth={2} /> <span className="pt-0.5 font-bold">Book Your Destination</span>
                 </div>
                 <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[30px] group-hover:opacity-100 group-hover:mt-1 transition-all duration-300">
                   <input type="text" placeholder="Type city or hotel" className="w-full bg-transparent outline-none text-zinc-900 placeholder:text-zinc-700 font-sans pl-[22px] text-xs font-semibold group-hover:text-[#0B422B]" />
                 </div>
               </div>
               
               {/* Dates Input */}
               <div className={`flex-[1.2] py-3.5 px-6 hover:bg-white/30 transition-all duration-300 cursor-pointer flex flex-col justify-center group relative ${scrolled ? '' : ''}`}>
                 <div className="flex items-center gap-2 text-[#0B422B] font-[family-name:var(--font-playfair)] text-[16px] tracking-wide">
                   <Calendar className="w-3.5 h-3.5 text-[#0B422B]" strokeWidth={2} /> <span className="pt-0.5 font-bold">Select Dates</span>
                 </div>
                 <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[30px] group-hover:opacity-100 group-hover:mt-1 transition-all duration-300">
                   <input type="text" readOnly placeholder="Select check-in & check-out" className="w-full bg-transparent outline-none text-zinc-900 placeholder:text-zinc-700 font-sans cursor-pointer pl-[22px] text-xs font-semibold group-hover:text-[#0B422B]" />
                 </div>
               </div>

               {/* Action Button */}
               <div className="flex-[0.8] flex items-center justify-end px-1 group">
                  <button className="w-full h-[52px] bg-[#1a4a35] hover:bg-[#123827] text-white rounded-full uppercase tracking-[0.1em] text-[11px] font-semibold shadow-md transition-all duration-300 flex flex-col items-center justify-center overflow-hidden relative">
                     <span className="block group-hover:-translate-y-[8px] transition-transform duration-300 font-bold z-10">BOOK NOW</span>
                     <span className="flex items-center gap-1 text-[#e0ddc6] text-[7px] font-bold tracking-[0.2em] uppercase z-10 absolute bottom-[9px] opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Crown className="w-[10px] h-[10px] text-[#e0ddc6]" /> Best Rate Guarantee
                     </span>
                  </button>
               </div>
           </div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden bg-zinc-900 border-none">
        <AnimatePresence mode="popLayout">
            <motion.div
              suppressHydrationWarning
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
               <Image
                 src={heroSlides[currentSlide].image}
                 alt={heroSlides[currentSlide].subtitle}
                 fill
                 className="object-cover"
                 priority
               />
               <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div 
            suppressHydrationWarning
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 md:mt-40"
          >
            <motion.p
               suppressHydrationWarning
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 1 }}
               className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold shadow-black drop-shadow-lg mb-6"
            >
               {heroSlides[currentSlide].subtitle}
            </motion.p>
            <motion.h1 
              suppressHydrationWarning
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-xl mb-6 leading-[1.1] max-w-6xl font-normal"
            >
              {heroSlides[currentSlide].title} <br/>
              <span className="italic font-light drop-shadow-lg">{heroSlides[currentSlide].highlight}</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
               <button className="flex items-center gap-3 bg-white/10 backdrop-blur hover:bg-white text-white hover:text-[#0B422B] border border-white/30 px-8 py-4 font-bold uppercase tracking-widest transition-all rounded text-xs mx-auto mt-4">
                 Explore Now <ArrowRight className="w-4 h-4" />
               </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Why Book With Us Section */}
      <section className="bg-white py-24 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-[#0B422B] mb-4">Why Book With Us</h2>
             <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mb-6"></div>
             <p className="text-zinc-500 max-w-xl mx-auto text-lg font-light">Enjoy the unparalleled benefits of booking directly on our official site.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
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
      <section className="bg-zinc-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">Our Circuits</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-[#0B422B] mb-6">Handpicked Destinations</h2>
            <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-zinc-500 max-w-3xl mx-auto text-lg font-light">Inviting you to a world of sublime hospitality, unmatched comfort, and faultless service. Be it a leisure getaway or a business trip, discover experiences bespoke and tailored to your unique needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {resorts.map((resort, idx) => (
              <motion.div 
                key={resort.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group bg-white rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-500 border border-zinc-100/50"
              >
                  <div className="relative h-[22rem] overflow-hidden rounded-t-xl">
                    <Image 
                      src={resort.image}
                      alt={resort.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"/>
                    
                    {/* Floating Info Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] mb-2 font-bold tracking-widest uppercase">
                        <MapPin className="w-3.5 h-3.5" /> {resort.location}
                      </div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl text-white mb-0">{resort.name}</h3>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col items-center text-center">
                    <p className="text-zinc-500 leading-relaxed mx-auto mb-8 font-light text-sm">{resort.description}</p>
                    
                    <button className="mt-auto text-[#0B422B] group-hover:text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold transition-all flex items-center justify-center gap-2 group/btn relative w-full border border-zinc-200 py-3 rounded hover:border-[#D4AF37]">
                      Explore Hotel
                    </button>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Experiences */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#D4AF37] font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">Live The Moment</span>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-[#0B422B] mb-6">Our Exquisite Experiences</h2>
              <div className="w-16 h-[2px] bg-[#D4AF37] mb-6"></div>
              <p className="text-zinc-500 text-lg font-light leading-relaxed">
                Revel in elegant accommodations, complimentary amenities, and unique sensory experiences tailored perfectly for your stay.
              </p>
            </div>
            <a href="/services" className="flex items-center gap-2 text-[#0B422B] hover:text-[#D4AF37] uppercase tracking-widest text-xs font-bold transition-colors">
              View All Experiences <ArrowRight className="w-4 h-4"/>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: idx * 0.1, duration: 0.5 }}
                 className="p-10 border border-zinc-100 bg-zinc-50 hover:bg-[#0B422B] group transition-colors duration-500 rounded-lg flex flex-col justify-between min-h-[300px]"
               >
                  <div>
                    <exp.icon className="w-10 h-10 text-[#D4AF37] mb-8" />
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#0B422B] group-hover:text-white mb-4 transition-colors duration-500">{exp.title}</h3>
                    <p className="text-zinc-500 group-hover:text-white/80 font-light text-sm leading-relaxed transition-colors duration-500">{exp.desc}</p>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-[#D4AF37] transition-colors duration-500 flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-4 h-4 text-[#0B422B] group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>
               </motion.div>
            ))}
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
            <div className="col-span-1 md:col-span-2 lg:col-span-2 pr-0 lg:pr-12">
               <div className="relative h-16 w-32 mb-8">
                 <Image src="/images/logo.png" alt="Logo" fill className="object-contain object-left invert brightness-0" />
               </div>
               <p className="text-white/60 font-light leading-relaxed text-sm max-w-lg mb-8">
                 Leading Environmentally Sensitive Hotels. Prioritizing eco-friendly practices like energy and water conservation, waste reduction, and local community support.
               </p>
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-colors cursor-pointer text-white/80 hover:text-white">
                   <span className="font-serif italic font-bold">in</span>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-colors cursor-pointer text-white/80 hover:text-white">
                   <span className="font-serif italic font-bold">fb</span>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-colors cursor-pointer text-white/80 hover:text-white">
                   <span className="font-serif italic font-bold">ig</span>
                 </div>
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
                <li><a href="/services" className="hover:text-white transition-colors">Our Services</a></li>
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

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0B422B] flex flex-col pt-6 px-6"
          >
            <div className="flex justify-between items-center pb-6 border-b border-white/20">
               <div className="relative h-10 w-28">
                 <Image src="/images/logo.png" alt="Logo" fill className="object-contain object-left" />
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white -mr-2">
                 <X className="w-8 h-8" />
               </button>
            </div>
            <nav className="flex flex-col gap-6 mt-10">
               <a href="#" className="text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide">Find Hotels</a>
               <a href="/services" className="text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide">Services</a>
               <a href="#" className="flex items-center gap-3 text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide"><Crown className="w-5 h-5 text-[#D4AF37]"/> Crown Collection</a>
               <a href="#" className="text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide">Offers</a>
               <a href="#" className="text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide">Plan an Event</a>
               <a href="#" className="text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide">Partner with Us</a>
               <button className="mt-8 bg-[#D4AF37] hover:bg-[#b09028] transition-colors text-white py-4 font-bold text-xs rounded uppercase tracking-[0.2em] w-full">
                 Book Login
               </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-md border-t border-zinc-200">
        <div className="flex items-center justify-between h-[65px]">
          <a href="#" className="flex-1 flex flex-col items-center justify-center gap-1.5 text-[#0B422B] hover:text-[#C5A059] transition-colors h-full">
            <Hotel className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-semibold uppercase tracking-widest">Hotels</span>
          </a>
          
          <button className="flex-1 flex flex-col items-center justify-center gap-1.5 bg-[#C5A059] text-white h-full hover:bg-[#b09028] transition-colors">
            <Calendar className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Book Now</span>
          </button>
          
          <a href="tel:+919372284069" className="flex-1 flex flex-col items-center justify-center gap-1.5 text-[#0B422B] hover:text-[#C5A059] transition-colors h-full">
            <Phone className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-semibold uppercase tracking-widest">Contact</span>
          </a>
          
          <button onClick={() => setIsMobileMenuOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-1.5 text-[#0B422B] hover:text-[#C5A059] transition-colors h-full">
            <Menu className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-semibold uppercase tracking-widest">Menu</span>
          </button>
        </div>
      </div>
    </main>
  );
}
