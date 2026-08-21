'use client';

import React, { useState, useEffect } from 'react';
import Footer from '../../../components/Footer';
import { 
    CheckCircle2, ShieldCheck, Clock, BadgeCheck, 
    ArrowRight, Star, Settings, Award, Home, Play, Users, Calendar, DollarSign
} from 'lucide-react';
import Link from 'next/link';

export default function InteriorsPage() {
    const [activeTab, setActiveTab] = useState("Bedroom");
    const [activeImage, setActiveImage] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    const [activeShowcaseTab, setActiveShowcaseTab] = useState("Completed");

    // Reset active image when tab changes
    useEffect(() => {
        setActiveImage(portfolioCategories[activeTab].mainImg);
    }, [activeTab]);

    const portfolioCategories = {
        "Bedroom": {
            title: "Serene & Sophisticated Retreats",
            mainImg: "/images/login-bg.png",
            thumbs: [
                "/images/login-bg.png",
                "/images/modal-property.png",
                "/images/login-grid-2.png",
                "/modern-bg.png",
                "/pricing-hero-bg.png",
                "/referral-bg.png"
            ]
        },
        "Hall": {
            title: "Grand Halls for Grand Moments",
            mainImg: "/images/luxury_banner.png",
            thumbs: [
                "/images/luxury_banner.png",
                "/images/login-full-bg.png",
                "/images/city-skyline.png",
                "/modern-bg.png",
                "/newsletter-bg.png",
                "/faq-luxury-building.png"
            ]
        },
        "Dining Area": {
            title: "Exquisite Dining Experiences",
            mainImg: "/images/login-grid-2.png",
            thumbs: [
                "/images/login-grid-2.png",
                "/images/login-bg.png",
                "/images/modal-property.png",
                "/modern-bg.png",
                "/pricing-hero-bg.png",
                "/referral-bg.png"
            ]
        }
    };

    const showcaseData = {
        "Completed": [
            { id: "m3m", name: "M3M Golfestate", builder: "M3M India", location: "Sector 65, Gurgaon", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800", howWeWorked: "Complete interior fit-out for 50+ luxury apartments.", status: "Delivered", units: "50+ Units" },
            { id: "dlf", name: "DLF The Ultima", builder: "DLF Ltd", location: "Sector 81, Gurgaon", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800", howWeWorked: "Premium modular kitchens and wardrobe systems.", status: "Delivered", units: "35+ Units" },
            { id: "emaar", name: "Emaar Palm Hills", builder: "Emaar", location: "Sector 77, Gurgaon", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800", howWeWorked: "End-to-end design for clubhouse and villas.", status: "Delivered", units: "20+ Units" }
        ],
        "Under Construction": [
            { id: "smartworld", name: "SmartWorld One DXP", builder: "SmartWorld", location: "Sector 113, Gurgaon", img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800", howWeWorked: "Executing show apartment and lounge interiors.", status: "Ongoing", units: "Show Flat" },
            { id: "m3m-crown", name: "M3M Crown", builder: "M3M India", location: "Sector 111, Gurgaon", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800", howWeWorked: "Developing modular templates for rapid deployment.", status: "Planning", units: "Entire Tower" }
        ],
        "Ready to Move": [
            { id: "godrej", name: "Godrej Aria", builder: "Godrej Properties", location: "Sector 79, Gurgaon", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800", howWeWorked: "Ready-to-fit packages for immediate move-in.", status: "Active", units: "12+ Units" },
            { id: "signature", name: "Signature Global City", builder: "Signature Global", location: "Sector 92, Gurgaon", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800", howWeWorked: "Specialized compact luxury designs.", status: "Active", units: "25+ Units" }
        ]
    };
    return (
        <main className="bg-white min-h-screen">
            {/* 1. Hero Section */}
            <section className="relative h-[600px] overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Home Interiors" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent"></div>
                
                <div className="max-w-[1400px] mx-auto px-4 h-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 py-12">
                    <div className="flex-1 text-left text-white">
                        <span className="agent-small font-black uppercase tracking-[0.4em] text-primary mb-4 block">PropNetra Home Services</span>
                        <h1 className="agent-hero font-normal leading-tight mb-6" style={{ fontFamily: "WastedVindey, serif" }}>
                            Transform Your Home <br />
                            <span className="gradent_text_color">Hassle-Free</span>
                        </h1>
                        <p className="agent-h2 font-light mb-8 font-roboto tracking-wide text-white/90">
                            Home Interiors from <span className="font-bold text-white">₹3Lac*</span>
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {[
                                { title: 'Trusted Quality', icon: <ShieldCheck className="text-primary" size={20} /> },
                                { title: 'Transparent Price', icon: <BadgeCheck className="text-primary" size={20} /> },
                                { title: 'Timely Delivery', icon: <Clock className="text-primary" size={20} /> }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                    {item.icon}
                                    <span className="agent-meta font-bold uppercase tracking-widest">{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="px-6 py-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-2">
                                <Home className="text-primary" size={14} />
                                <span className="agent-small font-black uppercase tracking-widest text-white">10,000+ Homes Delivered</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-2xl p-8 border border-slate-100 mt-20">
                        <div className="text-center mb-8">
                            <h2 className="agent-h2 font-normal text-slate-900 mb-2" style={{ fontFamily: "WastedVindey, serif" }}>Design your dream <span className="gradent_text_color">space here</span></h2>
                            <p className="agent-small font-bold text-slate-400 uppercase tracking-widest">Get a free consultation today</p>
                        </div>
                        <form className="space-y-4 ">
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl agent-body focus:outline-none focus:border-primary transition-all"
                            />
                            <input 
                                type="tel" 
                                placeholder="Mobile Number" 
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl agent-body focus:outline-none focus:border-primary transition-all"
                            />
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl agent-body focus:outline-none focus:border-primary transition-all"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="Pincode" 
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl agent-body focus:outline-none focus:border-primary transition-all"
                                />
                                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl agent-body focus:outline-none focus:border-primary transition-all text-slate-400">
                                    <option>City</option>
                                    <option>Gurgaon</option>
                                    <option>Noida</option>
                                    <option>Delhi</option>
                                </select>
                            </div>
                            <button className="w-full py-4 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl agent-meta font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all mt-4">
                                Book Your Free Consultation
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* 2. Features Strip */}
            <div className="bg-slate-900 py-6 overflow-hidden">
                <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                    {[
                        "Bespoke Interior Designs", "Timely Delivery", "Premium Material Quality", 
                        "Transparent Pricing", "Expert Designers", "3D Visualization Available",
                        "Bespoke Interior Designs", "Timely Delivery", "Premium Material Quality", 
                        "Transparent Pricing", "Expert Designers", "3D Visualization Available"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span className="agent-small font-black text-white/60 uppercase tracking-[0.3em]">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. The PropNetra Promise Section */}
            <section className="py-12 px-4 bg-slate-50">
                <div className="max-w-[1200px] mx-auto text-center">
                    <div className="mb-10">
                        <h2 className="agent-hero font-normal text-slate-900 mb-4 py-2 leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>
                            Our <span className="gradent_text_color">Signature Promise</span>
                        </h2>
                        <p className="agent-meta font-bold text-slate-400 uppercase tracking-[0.4em]">EXCELLENCE IN EVERY DETAIL</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {[
                            { title: "Transparent Pricing", icon: <BadgeCheck size={40} /> },
                            { title: "Unmatched Quality", icon: <Award size={40} /> },
                            { title: "Dedicated PM", icon: <Settings size={40} /> },
                            { title: "On-time Delivery", icon: <Clock size={40} /> },
                            { title: "No Hidden Costs", icon: <DollarSign size={40} strokeWidth={2} /> },
                            { title: "Premium Materials", icon: <CheckCircle2 size={40} /> }
                        ].map((promise, i) => (
                            <div key={i} className="flex flex-col items-center gap-6 group">
                                <div className="w-28 h-28 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:shadow-primary/10 group-hover:-translate-y-2 transition-all duration-500">
                                    {promise.icon}
                                </div>
                                <span className="agent-small font-light text-slate-500 uppercase tracking-[0.2em] leading-tight font-roboto">{promise.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Portfolio Showcase Section */}
            <section className="py-12 px-4 bg-white overflow-hidden">
                <div className="w-[97.5%] mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="agent-hero font-normal text-slate-900 mb-4" style={{ fontFamily: "WastedVindey, serif" }}>
                            We Don't Just Design Homes, <br />
                            <span className="gradent_text_color">We Shape Your Life</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            {Object.keys(portfolioCategories).map((tab) => (
                                <button 
                                    key={tab} 
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-3 rounded-full text-base transition-all duration-500 border-2 ${
                                        activeTab === tab 
                                        ? 'bg-slate-900 text-white border-[#D4AF37] shadow-[0_15px_35px_rgba(212,175,55,0.3)] scale-105 agent-h3' 
                                        : 'bg-white text-slate-500 border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:bg-slate-50 agent-h3'
                                    }`}
                                    style={{ fontFamily: "WastedVindey, serif" }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Large Portfolio Image - Expanded to 95% width */}
                <div className="w-[97.5%] mx-auto relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden group shadow-2xl border-[3px] border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(212,175,55,0.2)]">
                    <img 
                        key={activeTab + "_" + activeImage}
                        src={activeImage || portfolioCategories[activeTab].mainImg} 
                        className="absolute inset-0 w-full h-full object-cover animate-fade-in" 
                        alt={activeTab} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-12 md:left-20 text-white text-left max-w-2xl">
                        <h3 className="agent-hero font-normal mb-3 animate-slide-up" style={{ fontFamily: "WastedVindey, serif" }}>
                            "{portfolioCategories[activeTab].title}"
                        </h3>
                        <p className="agent-body font-light text-white/70 font-roboto tracking-wide uppercase">{activeTab} Collection Concept</p>
                    </div>
                </div>

                <div className="w-[97.5%] mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-10 max-w-[1200px] mx-auto">
                        {portfolioCategories[activeTab].thumbs.map((img, i) => (
                            <div 
                                key={activeTab + "_thumb_" + i} 
                                onClick={() => setActiveImage(img)}
                                className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-500 cursor-pointer shadow-[0_10px_30px_rgba(212,175,55,0.12)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] group bg-slate-100 flex items-center justify-center relative ${
                                    activeImage === img ? 'border-[#D4AF37] scale-105 z-20 shadow-xl' : 'border-[#D4AF37]/30 hover:border-[#D4AF37]'
                                }`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                    <Home size={20} />
                                </div>
                                <img 
                                    src={img} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10" 
                                    alt={`Thumbnail ${i}`} 
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Real Homes Section */}
            <section className=" py-20 px-4 relative overflow-hidden bg-white">
                {/* More Visible Square Design Grid Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.08]" 
                    style={{ 
                        backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}>
                </div>
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent z-0"></div>
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-0"></div>

                <div className="w-[97.5%] mx-auto text-center relative z-10">
                    <div className="mb-20">
                        <h2 className="agent-hero font-normal text-slate-900 mb-6 py-2 leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>
                            Real <span className="gradent_text_color">Homes</span>, Real Stories
                        </h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-[1px] w-12 bg-primary/30"></div>
                            <p className="agent-meta font-black text-slate-400 uppercase tracking-[0.5em]">HOW PROPNETRA TRANSFORMED LIVES</p>
                            <div className="h-[1px] w-12 bg-primary/30"></div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden w-full py-10">
                        <div className="flex animate-marquee hover:pause gap-6 whitespace-nowrap">
                            {[
                                { id: "m3m", name: "Ankit & Sneha", city: "M3M Golfestate", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800", desc: "Laminate finish Kitchen & Living room" },
                                { id: "dlf", name: "Megha Gupta", city: "DLF Ultima", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800", desc: "Premium Modular Kitchen" },
                                { id: "emaar", name: "Vikram Rathore", city: "Emaar Palm Hills", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800", desc: "Full Home Transformation" },
                                { id: "smartworld", name: "Rajesh & Priya", city: "Smart World Gems", img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800", desc: "Bespoke Dining Setup" },
                                { id: "godrej", name: "Sunita Singh", city: "Godrej Aria", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800", desc: "Elegant Master Bedroom" },
                                // Duplicating for seamless loop
                                { id: "m3m", name: "Ankit & Sneha", city: "M3M Golfestate", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800", desc: "Laminate finish Kitchen & Living room" },
                                { id: "dlf", name: "Megha Gupta", city: "DLF Ultima", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800", desc: "Premium Modular Kitchen" },
                                { id: "emaar", name: "Vikram Rathore", city: "Emaar Palm Hills", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800", desc: "Full Home Transformation" },
                                { id: "smartworld", name: "Rajesh & Priya", city: "Smart World Gems", img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800", desc: "Bespoke Dining Setup" },
                                { id: "godrej", name: "Sunita Singh", city: "Godrej Aria", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800", desc: "Elegant Master Bedroom" }
                            ].map((story, i) => (
                                <Link key={i} href={`/agent/interiors/showcase/${story.id}`} className="inline-block w-[350px] h-[450px] bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-white/20 group shrink-0 relative">
                                    {/* Full Card Image */}
                                    <img src={story.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={story.name} />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                                    
                                    {/* Location Badge */}
                                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                                        <p className="agent-small font-black uppercase text-white tracking-[0.2em]">{story.city}</p>
                                    </div>
                                    
                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 text-left whitespace-normal">
                                        <div className="flex items-center gap-1 text-primary mb-3">
                                            {[1, 2, 3, 4, 5].map(star => <Star key={star} size={12} fill="currentColor" />)}
                                        </div>
                                        <h3 className="agent-h2 font-normal text-white mb-2" style={{ fontFamily: "WastedVindey, serif" }}>{story.name}</h3>
                                        <p className="agent-meta font-medium text-white/70 uppercase tracking-widest mb-6 line-clamp-2 leading-relaxed">{story.desc}</p>
                                        
                                        <div className="group/btn flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white agent-small font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-500">
                                            View Story <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        display: flex;
                        animation: marquee 40s linear infinite;
                        width: max-content;
                    }
                    .pause:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </section>

            {/* 6. Simple Steps Process Section */}
            <section className="py-12 px-4 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-24 -z-10"></div>
                
                <div className="w-[97.5%] mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-left">
                        <div className="mb-12">
                            <h2 className="agent-hero font-normal text-slate-900 mb-4" style={{ fontFamily: "WastedVindey, serif" }}>
                                Turn Your Vision <br />
                                <span className="gradent_text_color">Into Reality</span>
                            </h2>
                            <p className="agent-meta font-bold text-slate-400 uppercase tracking-[0.4em]">IN JUST A FEW SIMPLE STEPS</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { step: "01", title: "Book Consultation", desc: "Speak with our experts for free" },
                                { step: "02", title: "Meet Designer", icon: "🤝", desc: "Collaborate on your dream vision" },
                                { step: "03", title: "Share Requirements", desc: "Tell us exactly what you need" },
                                { step: "04", title: "Compare & Finalize", desc: "Pick the perfect plan & quotes" },
                                { step: "05", title: "Quality Check", desc: "Strict inspections at every stage" },
                                { step: "06", title: "Move In Beautifully", desc: "Handover of your dream home" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-2xl bg-slate-50 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-white hover:shadow-xl transition-all group">
                                    <span className="agent-h2 font-normal text-slate-200 group-hover:text-primary transition-colors" style={{ fontFamily: "WastedVindey, serif" }}>{item.step}</span>
                                    <div>
                                        <h4 className="agent-meta font-bold text-slate-900 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="agent-meta font-light text-slate-400 font-roboto">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full relative">
                        <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative">
                            <img 
                                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000" 
                                className="w-full h-full object-cover" 
                                alt="Process Overview" 
                            />
                            <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-2xl">
                                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" stroke="none"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl text-left">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="agent-small font-black text-primary uppercase tracking-widest mb-2">Process Video</p>
                                        <h4 className="agent-h4 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>How we deliver excellence</h4>
                                    </div>
                                    <div className="flex -space-x-4">
                                        {[1,2,3].map(j => (
                                            <div key={j} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                                                <img src={`https://i.pravatar.cc/100?u=${j}`} alt="Client" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Why Choose Us Section - Commented Out
            <section className="py-12 px-4 bg-slate-900 text-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="text-left">
                            <p className="agent-small font-black text-primary uppercase tracking-[0.4em] mb-4">The PropNetra Edge</p>
                            <h2 className="agent-hero font-normal" style={{ fontFamily: "WastedVindey, serif" }}>
                                Why Homeowners <br />
                                <span className="gradent_text_color">Trust Us</span>
                            </h2>
                        </div>
                        <div className="text-left md:text-right max-w-md">
                            <p className="text-sm font-light text-slate-400 font-roboto leading-relaxed">
                                We combine world-class design aesthetics with rigorous quality standards to deliver homes that are as durable as they are beautiful.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Bespoke Designs", desc: "Every corner crafted to reflect your unique personality and lifestyle", icon: <Settings size={32} /> },
                            { title: "45-Day Delivery", desc: "We value your time. Guaranteed move-in within 45 days or we pay you", icon: <Clock size={32} /> },
                            { title: "Price Match", desc: "Premium interiors at competitive rates. No hidden surprises", icon: <BadgeCheck size={32} /> },
                            { title: "100% Quality", icon: <Award size={32} />, desc: "Over 140 quality checks across materials and installation" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                                <h4 className="text-lg font-normal mb-3" style={{ fontFamily: "WastedVindey, serif" }}>{item.title}</h4>
                                <p className="agent-body font-light text-slate-500 font-roboto">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            */}

            {/* 8. Locations Section */}
            <section className="py-20 px-4 bg-white relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                <div className="w-[97.5%] mx-auto">
                    <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] rounded-full"></div>
                        
                        <div className="flex-1 text-left relative z-10">
                            <p className="agent-small font-black text-primary uppercase tracking-[0.4em] mb-6">Nationwide Presence</p>
                            <h2 className="agent-hero font-normal text-white mb-6 leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>
                                Now Designing <br />
                                <span className="gradent_text_color">Across India</span>
                            </h2>
                            <p className="agent-body font-light text-slate-400 font-roboto mb-12 max-w-md leading-relaxed">
                                Experience PropNetra's signature luxury in your city. From initial concept to final handover, we are redefining interiors across major Indian hubs.
                            </p>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                                {["Gurgaon", "Delhi", "Noida", "Bangalore", "Mumbai", "Pune"].map((city, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl group hover:bg-primary/20 hover:border-primary/30 transition-all cursor-default">
                                        <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform"></div>
                                        <span className="agent-small font-bold text-white uppercase tracking-widest">{city}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="px-10 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white rounded-full agent-meta font-black uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(255,107,0,0.4)] hover:scale-105 transition-all">
                                Book a Site Visit
                            </button>
                        </div>

                        <div className="flex-1 w-full relative h-[400px] md:h-[500px]">
                            <div className="absolute top-0 right-0 w-4/5 aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 z-20 hover:scale-[1.02] transition-transform duration-700">
                                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" className="w-full h-full object-cover" alt="Luxury Living Room" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-3/5 aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 z-10 hover:scale-[1.02] transition-transform duration-700 delay-100">
                                <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800" className="w-full h-full object-cover" alt="Bespoke Kitchen" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. FAQ Section */}
            <section className="py-16 px-4 bg-white">
                <div className="w-[97.5%] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="agent-hero font-normal text-slate-900 mb-4 uppercase tracking-wider" style={{ fontFamily: "WastedVindey, serif" }}>
                            Frequently Asked <br />
                            <span className="text-center gradent_text_color px-2 py-1">Questions</span>
                        </h2>
                    </div>

                    <div className="max-w-[1200px] mx-auto space-y-4">
                        {[
                            { q: "What is the typical design timeline?", a: "A full home interior project typically takes 45 days from design finalization to move-in. This includes 15 days for design and 30 days for execution and installation." },
                            { q: "Do you charge for the first consultation?", a: "No, your first consultation with our expert design team is completely free. We will discuss your vision, provide initial concepts, and give you a rough estimate." },
                            { q: "What materials do you use for modular kitchens?", a: "We use premium water-resistant plywood and high-grade laminates/acrylics from top brands. All our hardware is sourced from international brands like Hafele or Hettich." },
                            { q: "Do you offer EMIs?", a: "Yes, we have easy EMI options available with our banking partners to help you build your dream home without any financial burden." }
                        ].map((faq, i) => (
                            <div 
                                key={i} 
                                className={`text-left border-2 transition-all duration-500 rounded-[1.5rem] overflow-hidden ${
                                    openFaq === i 
                                    ? 'border-primary/40 bg-slate-50 shadow-lg' 
                                    : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                                }`}
                            >
                                <button 
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-6 cursor-pointer text-left"
                                >
                                    <span className={`agent-h3 font-normal transition-colors duration-300 ${openFaq === i ? 'text-primary' : 'text-slate-800'}`} style={{ fontFamily: "WastedVindey, serif" }}>
                                        {faq.q}
                                    </span>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                                        openFaq === i ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                        <ArrowRight size={18} className="rotate-90" />
                                    </div>
                                </button>
                                <div 
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                        openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-6 pb-6 agent-body font-light text-slate-500 font-roboto leading-relaxed max-w-3xl">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

