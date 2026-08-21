'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
    Search, ChevronDown, MapPin, Grid, PlusCircle, Heart, Share2, Phone, Star, Filter, Calendar, Maximize2, Layers, Compass, Eye, Road, Info, ChevronRight, ArrowRight,
    Bookmark, ChevronUp, Droplets, Zap, Wind, ShieldCheck, ParkingCircle, Trees, Waves, Box, Wifi, Trash2, Users, CheckCircle, Tag, Activity, Home, Lock, Key, FileCheck, CornerUpRight,
    ArrowUpCircle
} from 'lucide-react';
import { CreditConsumptionPopup, ContactViewForm } from '@/components/AgentPopups';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ResalePage() {
    const [selectedLocation, setSelectedLocation] = useState('Gurgaon');
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCreditPopupOpen, setIsCreditPopupOpen] = useState(false);
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);
    const [expandedListings, setExpandedListings] = useState(new Set());
    const containerRef = useRef(null);

    const toggleListingExpansion = (id) => {
        setExpandedListings(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    useLayoutEffect(() => {
        // Small delay to ensure layout is fully rendered
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        const ctx = gsap.context(() => {
            // Search bar reveal
            gsap.fromTo(".search-bar-reveal",
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    clearProps: "all"
                }
            );

            // Tabs reveal
            gsap.fromTo(".tabs-reveal",
                { y: 20, opacity: 0, scale: 0.98 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    delay: 0.4,
                    ease: "power3.out",
                    clearProps: "all"
                }
            );

            // Listing cards reveal
            gsap.fromTo(".listing-card-reveal",
                { y: 80, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power4.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".listings-grid-container",
                        start: "top 85%",
                    }
                }
            );
        }, containerRef);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    const banners = [
        { title: "Rental Opportunities", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000" },
        { title: "Premium Rentals", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const listings = Array(18).fill(null).map((_, i) => ({
        id: i,
        title: 'Smartworld One Dxp, Sector 65',
        location: 'Gurgaon',
        price: '₹ 3.40 Cr',
        area: '2500 sqft',
        status: 'Ready to Move',
        floor: '4 out of 24',
        facing: 'North-East',
        overlooking: 'Park & Pool',
        road: '24 meter',
        furnishing: 'Semi-Furnished',
        age: '0-1 Years',
        water: '24/7 Available',
        electricity: '100% Backup',
        security: '3-Tier Security',
        parking: '2 Covered',
        balconies: '3 Balconies',
        bathrooms: '3 Baths',
        lift: '3 High-speed',
        maintenance: '₹ 5,000/mo',
        gated: 'Yes',
        corner: 'No',
        possession: 'Immediate',
        authority: 'HSVP Approved',
        isPremium: true,
        type: 'Apartment',
        bhk: '3BHK',
        brokerage: '1%',
        updatedAt: 'Apr 16, 2025'
    }));

    return (
        <div ref={containerRef} className="min-h-screen bg-white font-sans selection:bg-primary/10">
            {/* Hero Slider */}
            <section className="relative h-[400px] md:h-[450px] overflow-hidden bg-slate-900">
                <div
                    className="flex h-full transition-transform duration-1000 ease-out"
                    style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                    {banners.map((banner, idx) => (
                        <div key={idx} className="min-w-full h-full relative">
                            <img src={banner.img} className="w-full h-full object-cover brightness-[0.7] scale-105" alt={banner.title} />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/60"></div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-start text-left p-12 md:p-24 transition-all duration-1000 ${idx === currentBanner ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
                                <h1 className="agent-hero font-normal tracking-tight mb-6 max-w-4xl drop-shadow-2xl text-white leading-[1.1]" style={{ fontFamily: "WastedVindey, serif" }}>
                                    {banner.title}
                                </h1>
                                <p className="agent-small text-white/50 font-light max-w-2xl mb-10 uppercase tracking-[0.2em] border-l-2 border-white/20 pl-6">Premium Rental Market</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Overlaid Search Bar & Breadcrumbs */}
            <div className="relative -mt-16 z-40 px-4 search-bar-reveal">
                <div className="max-w-[1100px] mx-auto">
                    {/* Breadcrumbs Above Search Bar */}
                    <nav className="flex items-center justify-center gap-3 agent-tiny font-light uppercase tracking-[0.3em] mb-6">
                        <Link href="/agent" className="text-white/40 hover:text-white transition-colors">Agent Portal</Link>
                        <ChevronRight size={12} className="text-white/20" />
                        <span className="text-white/90">Resale Listings</span>
                    </nav>
                    <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-3 flex flex-col md:flex-row items-center gap-3 border border-white/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]">
                        <div className="w-full md:w-56 relative group">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-primary transition-transform group-hover:scale-110" size={18} />
                            <select className="w-full h-16 pl-14 pr-6 bg-slate-50 rounded-2xl agent-small font-black border-none outline-none appearance-none hover:bg-slate-100 transition-colors cursor-pointer">
                                <option>Gurgaon</option>
                                <option>Delhi</option>
                            </select>
                        </div>
                        <div className="flex-1 w-full relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Type Developer name to start search..."
                                className="w-full h-16 pl-14 pr-6 bg-slate-50 rounded-2xl agent-body font-bold outline-none focus:bg-white transition-all border border-transparent focus:border-primary/20"
                            />
                        </div>
                        <div
                            className="w-full md:w-auto px-8 h-16 flex items-center justify-between gap-6 cursor-pointer hover:bg-slate-50 rounded-2xl transition-all group"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <span className="agent-small font-black uppercase tracking-widest text-slate-900 group-hover:text-primary">Filters</span>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-500 ${isSearchOpen ? 'rotate-180 text-primary' : ''}`} />
                        </div>
                        <button className="w-full md:w-auto px-12 h-16 bg-slate-800/60 backdrop-blur-xl text-white rounded-2xl font-bold font-roboto agent-body uppercase tracking-[0.2em] hover:bg-slate-800/80 transition-all active:scale-95 border border-white/20 shadow-2xl">SEARCH</button>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-4 pb-24 relative z-30 pt-12">

                {/* Tab Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 tabs-reveal">
                    <div className="flex items-center gap-1 p-1.5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm w-full md:w-auto">
                        <button className="px-8 py-2.5 bg-white text-slate-900 rounded-xl agent-small font-black shadow-sm flex items-center gap-2"><Grid size={14} /> All Posts</button>
                        <button className="px-8 py-2.5 text-slate-400 agent-small font-bold hover:text-slate-600 transition-all">Requirements</button>
                        <button className="px-8 py-2.5 text-slate-400 agent-small font-bold hover:text-slate-600 transition-all">My Listings</button>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-xl agent-small font-black text-slate-900 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group"><PlusCircle size={14} className="text-slate-400 group-hover:text-white" /> Post Your Inventory</button>
                        <button className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-xl agent-small font-black text-slate-900 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group"><PlusCircle size={14} className="text-slate-400 group-hover:text-white" /> Post Your Requirement</button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start listings-grid-container">
                    <div className="flex-1">
                        <div className="flex flex-col gap-6">
                            {listings.map((item, i) => (
                                <div key={i} className="bg-white rounded-3xl border-2 border-slate-100 hover:border-[#D4AF37]/50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col p-4 listing-card-reveal relative overflow-hidden group">
                                    {/* Top Golden Gradient */}
                                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#D4AF37]/15 via-[#D4AF37]/5 to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-[#D4AF37]/25"></div>
                                    {/* Top Metadata Bar */}
                                    <div className="flex items-center justify-between gap-4 mb-0 border-b border-slate-400/50 mb-3 pb-2 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                                {/* <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"> */}
                                                <Maximize2 size={16} />
                                                {/* </div> */}
                                                <span className="agent-small font-black text-slate-900">{item.type}</span>
                                            </div>
                                            <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 agent-small font-black text-slate-900 uppercase tracking-widest">{item.bhk}</div>
                                            <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 agent-small font-black text-slate-900 uppercase tracking-widest">{item.price}</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <button className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 bg-white hover:bg-primary/5 hover:text-primary transition-all"><Bookmark size={18} /></button>
                                                <button className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 bg-white hover:bg-primary/5 hover:text-primary transition-all"><Share2 size={18} /></button>
                                            </div>
                                            {item.isPremium && (
                                                <div className="px-5 py-2 bg-slate-900 text-white rounded-xl agent-tiny font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-slate-900/20">
                                                    <Star size={12} className="text-amber-400" fill="currentColor" /> Premium Member
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Title Row */}
                                    <div className="flex items-baseline gap-3 mb-4">
                                        <h3 className="agent-body font-black text-slate-900 tracking-tighter leading-none">{item.title}</h3>
                                        <span className="agent-body font-bold text-slate-400 tracking-widest">{item.location}</span>
                                    </div>

                                    {/* Stats Grid - Integrated Sidebar Toggle */}
                                    <div className="flex border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/30 relative">
                                        <div className={`grid flex-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 transition-all duration-500`}>
                                            {[
                                                { icon: <Maximize2 size={18} />, label: 'Carpet Area', value: item.area },
                                                { icon: <Info size={18} />, label: 'Status', value: item.status },
                                                { icon: <Layers size={18} />, label: 'Floor', value: item.floor },
                                                { icon: <Compass size={18} />, label: 'Facing', value: item.facing },
                                                { icon: <Eye size={18} />, label: 'Overlooking', value: item.overlooking },
                                                { icon: <Road size={18} />, label: 'Road Width', value: item.road },
                                                { icon: <Home size={18} />, label: 'Furnishing', value: item.furnishing },
                                                { icon: <Calendar size={18} />, label: 'Property Age', value: item.age },
                                                { icon: <Droplets size={18} />, label: 'Water Supply', value: item.water },
                                                { icon: <Zap size={18} />, label: 'Power Backup', value: item.electricity },
                                                { icon: <ShieldCheck size={18} />, label: 'Security', value: item.security },
                                                { icon: <ParkingCircle size={18} />, label: 'Parking', value: item.parking },
                                                { icon: <Wind size={18} />, label: 'Balconies', value: item.balconies },
                                                { icon: <Users size={18} />, label: 'Bathrooms', value: item.bathrooms },
                                                { icon: <ArrowUpCircle size={18} />, label: 'Lifts', value: item.lift },
                                                { icon: <Tag size={18} />, label: 'Maintenance', value: item.maintenance },
                                                { icon: <Lock size={18} />, label: 'Gated', value: item.gated },
                                                { icon: <CornerUpRight size={18} />, label: 'Corner', value: item.corner },
                                                { icon: <Key size={18} />, label: 'Possession', value: item.possession },
                                                { icon: <FileCheck size={18} />, label: 'Approval', value: item.authority }
                                            ].slice(0, expandedListings.has(item.id) ? 20 : 5).map((stat, idx) => (
                                                <div key={idx} className={`flex items-center justify-start gap-3 py-3 px-3 bg-white/50 hover:bg-white transition-colors border-r border-slate-200 overflow-hidden ${idx >= 4 ? 'border-t border-slate-200' : ''}`}>
                                                    <div className="text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
                                                        {stat.icon}
                                                    </div>
                                                    <div className="flex flex-col items-start min-w-0 flex-1">
                                                        <span className="agent-tiny font-black uppercase tracking-tight text-slate-400 leading-none mb-1 truncate w-full">{stat.label}</span>
                                                        <span className="text-[12px] font-black text-slate-900 leading-none tracking-tight truncate w-full">{stat.value}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Expand Toggle Sidebar */}
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleListingExpansion(item.id);
                                            }}
                                            className="w-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-l border-slate-200 group/expand"
                                        >
                                            <div className={`${!expandedListings.has(item.id) ? 'animate-bounce-subtle' : ''}`}>
                                                {expandedListings.has(item.id) ?
                                                    <ChevronUp size={16} className="text-primary" /> :
                                                    <ChevronDown size={16} className="text-primary" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border border-dashed border-slate-200 w-full mt-5 mb-5'></div>
                                    {/* Bottom Info Bar */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap px-3 py-1.5 border border-slate-100 rounded-lg bg-slate-50">Last Updated: {item.updatedAt}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></div>
                                                <span className="agent-tiny font-black uppercase tracking-widest">Mandate Deal</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl border border-green-100">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></div>
                                                <span className="agent-tiny font-black uppercase tracking-widest">Brokerage Share {item.brokerage}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsCreditPopupOpen(true)}
                                            className="px-8 py-3 bg-indigo-600 text-white rounded-xl agent-small font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/20 active:scale-95"
                                        >
                                            <Phone size={14} /> Contact Agent
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-12 flex justify-center">
                            <button className="px-12 py-4 border border-slate-200 rounded-2xl agent-small font-black text-slate-900 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Load More ...</button>
                        </div>
                    </div>

                    {/* Sidebar Ad */}
                    <aside className="hidden lg:block w-[320px] sticky top-22">
                        <div className="overflow-hidden shadow-2xl relative group bg-slate-900 aspect-[3/5]">
                            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000" className="w-full h-full object-cover opacity-60" alt="Ad" />
                            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white bg-gradient-to-t from-slate-900 via-transparent to-transparent">
                                <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded agent-tiny font-black uppercase tracking-widest mb-4 inline-block">SS GROUP</span>
                                <h4 className="agent-h2 font-black uppercase mb-2">SS CAMANZA</h4>
                                <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black agent-small uppercase tracking-widest mt-4">Enquire Now</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Modals & Popups */}
            <CreditConsumptionPopup
                isOpen={isCreditPopupOpen}
                onClose={() => setIsCreditPopupOpen(false)}
                onConfirm={() => {
                    setIsCreditPopupOpen(false);
                    setIsContactFormOpen(true);
                }}
            />
            <ContactViewForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
                .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
            `}} />
        </div>
    );
}
