"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, Search, ChevronDown, ArrowRight, Crown, Leaf,
  Calendar, Phone, Hotel, X, MapPin, Wine, BellRing
} from "lucide-react";
import Image from "next/image";

const ourBrands = [
  { name: "K&K Realestate", image: "/images/brand-kk.png" },
  { name: "Luxury Beach House", image: "/images/brand-beach.png" },
  { name: "Coconut Oil", image: "/images/brand-coconut.png" },
  { name: "Jungle Stay", image: "/images/brand-jungle.png" }
];

export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "Spa & Wellness",
      description: "Immerse yourself in our holistic approach to wellbeing. Focusing strictly on centuries-old Ayurveda practices, our wellness centre offers bespoke therapies designed to detoxify and rejuvenate mind and body through herbal oils, rhythmic massages, and absolute tranquility.",
      image: "/images/resort_1.png",
      icon: <Leaf className="w-8 h-8 text-[#D4AF37]" strokeWidth={1} />,
    },
    {
      title: "Fine Dining",
      description: "Gastronomic brilliance that honors local ingredients. Indulge in our tailored culinary journeys spanning from authentic regional delicacies to contemporary global cuisines. Celebrate your special evenings with private, curated candlelight dinners set against the backdrop of our breathtaking landscapes.",
      image: "/images/resort_3.png",
      icon: <Wine className="w-8 h-8 text-[#D4AF37]" strokeWidth={1} />,
    },
    {
      title: "Concierge",
      description: "Our dedicated relations team redefines hospitality. Enjoy 24/7 personalized, discreet, and highly intuitive service designed to anticipate your every requirement. From booking exclusive reservations to arranging private transport, our Concierge desk ensures your stay remains completely effortless.",
      image: "/images/interior.png",
      icon: <BellRing className="w-8 h-8 text-[#D4AF37]" strokeWidth={1} />,
    },
    {
      title: "Eco-Tours",
      description: "Venture deep into the wilderness while maintaining the utmost respect for nature. Reflecting our deeply 'Eco-Sensitive' brand philosophy, our guided eco-tours take you on mesmerizing local trails, bird watching expeditions, and deeply enriching community engagement walks.",
      image: "/images/hero.png",
      icon: <MapPin className="w-8 h-8 text-[#D4AF37]" strokeWidth={1} />,
    }
  ];

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
            <a href="/" className="font-semibold text-[11px] uppercase tracking-widest transition-colors text-[#0B422B] hover:text-[#D4AF37]">Home</a>
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

      {/* Desktop Booking Bar */}
      <div className={`hidden md:block fixed left-0 right-0 w-full z-40 transition-all duration-500 ease-in-out ${scrolled ? 'top-0' : 'top-[170px]'}`}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`mx-auto transition-all duration-500 overflow-hidden backdrop-blur-xl ${scrolled ? 'max-w-full bg-white/60 border-b border-white/50 rounded-none shadow-md' : 'max-w-[55rem] bg-white/40 border border-white/40 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.4)] rounded-full'}`}
        >
           <div className={`flex items-center justify-between transition-all duration-500 p-2 ${scrolled ? 'max-w-[80rem] mx-auto' : ''}`}>
               <div className={`flex-[1.2] py-3.5 px-6 hover:bg-white/30 border-r border-black/10 transition-all duration-300 cursor-text flex flex-col justify-center group relative ${scrolled ? 'rounded-l-lg' : 'rounded-l-full'}`}>
                 <div className="flex items-center gap-2 text-[#0B422B] font-[family-name:var(--font-playfair)] text-[16px] tracking-wide">
                   <MapPin className="w-3.5 h-3.5 text-[#0B422B]" strokeWidth={2} /> <span className="pt-0.5 font-bold">Book Your Destination</span>
                 </div>
                 <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[30px] group-hover:opacity-100 group-hover:mt-1 transition-all duration-300">
                   <input type="text" placeholder="Type city or hotel" className="w-full bg-transparent outline-none text-zinc-900 placeholder:text-zinc-700 font-sans pl-[22px] text-xs font-semibold group-hover:text-[#0B422B]" />
                 </div>
               </div>
               
               <div className={`flex-[1.2] py-3.5 px-6 hover:bg-white/30 border-r border-black/10 transition-all duration-300 cursor-pointer flex flex-col justify-center group relative ${scrolled ? '' : ''}`}>
                 <div className="flex items-center gap-2 text-[#0B422B] font-[family-name:var(--font-playfair)] text-[16px] tracking-wide">
                   <Calendar className="w-3.5 h-3.5 text-[#0B422B]" strokeWidth={2} /> <span className="pt-0.5 font-bold">Select Dates</span>
                 </div>
                 <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[30px] group-hover:opacity-100 group-hover:mt-1 transition-all duration-300">
                   <input type="text" readOnly placeholder="Select check-in & check-out" className="w-full bg-transparent outline-none text-zinc-900 placeholder:text-zinc-700 font-sans cursor-pointer pl-[22px] text-xs font-semibold group-hover:text-[#0B422B]" />
                 </div>
               </div>

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

      {/* Hero Parallax Section */}
      <section className="relative w-full h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/images/interior.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/20" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-light mb-4 tracking-wide text-[#FAF9F6]"
          >
            Exquisite Services
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-16 h-0.5 bg-[#D4AF37] mx-auto rounded"
          />
        </div>
      </section>

      {/* Zig-Zag Content Sections */}
      <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
        {services.map((service, idx) => {
          const isImageLeft = idx % 2 === 0;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 mb-32 last:mb-0`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]">
                <Image src={service.image} alt={service.title} fill className="object-cover rounded-sm shadow-xl" />
              </div>

              {/* Text Container */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: [0.9, 1.1, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="mb-8 mx-auto lg:mx-0 bg-[#FAF9F6] w-16 h-16 rounded-full flex items-center justify-center shadow-sm"
                >
                  {service.icon}
                </motion.div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#0B422B] font-bold mb-6">
                  {service.title}
                </h2>
                <div className="w-12 h-0.5 bg-[#D4AF37] mb-8 mx-auto lg:mx-0 rounded" />
                <p className="text-zinc-600 font-light leading-relaxed text-lg pb-6">
                  {service.description}
                </p>
                <div className="pt-2">
                  <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0B422B] hover:text-[#D4AF37] transition-colors group">
                    Discover More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* Tailor Your Stay (CTA) */}
      <section className="bg-[#0B422B] text-white py-24 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Crown className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" strokeWidth={1} />
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl mb-6">Curate Your Perfect Stay</h2>
          <p className="text-white/80 font-light leading-relaxed mb-10 text-lg">
            Every guest is an individual, and every stay should be precisely catered to your distinct tastes. Reach out to our Guest Relations Manager directly to tailor an unforgettable experience.
          </p>
          <a 
            href="https://wa.me/919372284069" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-[#D4AF37] hover:bg-[#C19B2E] text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Connect on WhatsApp
          </a>
        </motion.div>
      </section>

      {/* Small Brands Grid */}
      <section className="bg-zinc-50 py-16 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-10">
            Our world-class services are powered by our trusted partners
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto opacity-70">
            {ourBrands.map((brand, idx) => (
              <div key={idx} className="relative h-16 grayscale">
                <Image src={brand.image} alt={brand.name} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

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
               <a href="/" className="text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide">Home</a>
               <a href="#" className="flex items-center gap-3 text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide"><Crown className="w-5 h-5 text-[#D4AF37]"/> Crown Collection</a>
               <a href="#" className="text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide">Plan an Event</a>
               <a href="#" className="text-white text-xl font-[family-name:var(--font-playfair)] tracking-wide">Partner with Us</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] md:hidden bg-white/90 backdrop-blur-md border-t border-zinc-200">
        <div className="flex items-center justify-between h-[65px]">
          <a href="/" className="flex-1 flex flex-col items-center justify-center gap-1.5 text-[#0B422B] hover:text-[#C5A059] transition-colors h-full">
            <Hotel className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-semibold uppercase tracking-widest">Home</span>
          </a>
          
          <button className="flex-1 flex flex-col items-center justify-center gap-1.5 bg-[#C5A059] text-white h-full hover:bg-[#b09028] transition-colors">
            <Calendar className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Book Now</span>
          </button>
          
          <a href="https://wa.me/919372284069" className="flex-1 flex flex-col items-center justify-center gap-1.5 text-[#0B422B] hover:text-[#C5A059] transition-colors h-full">
            <Phone className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-semibold uppercase tracking-widest">WhatsApp</span>
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
