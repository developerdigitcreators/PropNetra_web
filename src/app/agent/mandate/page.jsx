'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
    Search, ChevronDown, Bell, User, MapPin, Grid, List,
    Filter, Share2, Bookmark, ExternalLink, Calendar,
    Maximize2, Info, ArrowRight, Phone, MessageSquare,
    Compass, Home, Layers, Eye, Road, PlusCircle, ChevronRight, Star
} from 'lucide-react';
import { CreditConsumptionPopup, ContactViewForm } from '@/components/AgentPopups';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MandateDealsPage() {
    const [selectedLocation, setSelectedLocation] = useState('Gurgaon');
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isCreditPopupOpen, setIsCreditPopupOpen] = useState(false);
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState("Select Area");
    const [showAreaDropdown, setShowAreaDropdown] = useState(false);
    const [expandedDeals, setExpandedDeals] = useState(new Set());
    const containerRef = useRef(null);

    const toggleDealExpansion = (id) => {
        setExpandedDeals(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const areas = ["Sector 57", "Sector 88A", "Sector 102", "Golf Course Road", "Sohna Road", "New Gurgaon"];

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

            // Headings reveal
            gsap.fromTo(".title-reveal-large span",
                { y: 100, opacity: 0, skewY: 10 },
                {
                    y: 0,
                    opacity: 1,
                    skewY: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power4.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".title-reveal-large",
                        start: "top 90%",
                    }
                }
            );

            // Trending projects reveal
            gsap.fromTo(".trending-project-card",
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power4.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".trending-projects-grid",
                        start: "top 85%",
                    }
                }
            );

            // Mandate deals reveal
            gsap.fromTo(".mandate-deal-card",
                { x: 100, opacity: 0, scale: 0.95 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "power4.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".mandate-deals-container",
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
        {
            title: "LAMBORGHINI BRANDED RESIDENCES",
            subtitle: "3 BHK PREMIUM RESIDENCES AT SECTOR 71, SPR ROAD GURUGRAM. STARTING FROM ₹4.8 CR",
            brand: "Signature Global x Lamborghini",
            img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000"
        },
        {
            title: "M3M CROWN SECTOR 113",
            subtitle: "Premium 3 & 4 BHK residences with world-class amenities and 5.5 acres of central greens.",
            brand: "M3M Crown",
            img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000"
        },
        {
            title: "MAX ANTARA SENIOR LIVING",
            subtitle: "Redefining retirement with world-class medical care and luxury lifestyle at Sector 36A.",
            brand: "Max Estates",
            img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const deals = [
        {
            id: 1,
            type: 'Builder Floor',
            updated: '25 March 2024',
            title: '2 BHK, Huda, Sector 57, Gurgaon',
            area: '200 Sq. Yds.',
            status: 'Ready to Move',
            floor: '1 out of 4',
            facing: 'West',
            overlooking: 'Park',
            road: '10 meter',
            price: '₹1.47 Cr',
            isNegotiable: true,
            isPremium: true,
            isMandate: true
        },
        {
            id: 2,
            type: 'Apartment',
            updated: '25 March 2024',
            title: '3 BHK, Smartworld One DXP, Sector 65',
            area: '200 Sq. Yds.',
            status: 'Ready to Move',
            floor: '1 out of 4',
            facing: 'West',
            overlooking: 'Park',
            road: '10 meter',
            price: '₹1.47 Cr',
            isNegotiable: true,
            isPremium: true,
            brokerage: '1%',
            isMandate: false
        },
        {
            id: 3,
            type: 'Builder Floor',
            updated: '25 March 2024',
            title: '2 BHK, Huda, Sector 57, Gurgaon',
            area: '200 Sq. Yds.',
            status: 'Ready to Move',
            floor: '1 out of 4',
            facing: 'West',
            overlooking: 'Park',
            road: '10 meter',
            price: '₹1.47 Cr',
            isNegotiable: true,
            isPremium: true,
            isMandate: true
        },
        {
            id: 4,
            type: 'Builder Floor',
            updated: '25 March 2024',
            title: '2 BHK, Huda, Sector 57, Gurgaon',
            area: '200 Sq. Yds.',
            status: 'Ready to Move',
            floor: '1 out of 4',
            facing: 'West',
            overlooking: 'Park',
            road: '10 meter',
            price: '₹1.47 Cr',
            isNegotiable: true,
            isPremium: true,
            isMandate: false
        },
        {
            id: 5,
            type: 'Apartment',
            updated: '25 March 2024',
            title: '3 BHK, Smartworld One DXP, Sector 65',
            area: '200 Sq. Yds.',
            status: 'Ready to Move',
            floor: '1 out of 4',
            facing: 'West',
            overlooking: 'Park',
            road: '10 meter',
            price: '₹1.47 Cr',
            isNegotiable: true,
            isPremium: true,
            brokerage: '1%',
            isMandate: true
        }
    ];

    const trendingProjects = [
        { name: 'MVN Aero One', price: '₹19.6 - 42.1 Cr', loc: 'Sector 37D', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600' },
        { name: 'Oberoi Sixty North', price: '₹23.1 - 35.7 Cr', loc: 'Golf Course', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600' },
        { name: 'SmartWorld Saab', price: '₹1.81 - 11.05 Cr', loc: 'Noida Express', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600' },
        { name: 'Whiteland Westin', price: '₹6.68 - 11.25 Cr', loc: 'Sector 103', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600' },
        { name: 'Godrej Zenith', price: '₹4.25 - 8.90 Cr', loc: 'Sector 89', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=600' },
        { name: 'M3M Crown', price: '₹2.85 - 5.50 Cr', loc: 'Sector 113', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600' },
        { name: 'DLF Privana', price: '₹3.95 - 7.20 Cr', loc: 'Sector 76', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600' },
        { name: 'AIPL Joy Central', price: '₹1.15 - 4.80 Cr', loc: 'Sector 65', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600' }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-white font-sans selection:bg-primary/10">
            {/* Sliding Hero Section */}
            <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-slate-900">
                <div
                    className="flex h-full transition-transform duration-1000 ease-out"
                    style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                    {banners.map((banner, idx) => (
                        <div key={idx} className="min-w-full h-full relative">
                            <img
                                src={banner.img}
                                className={`w-full h-full object-cover transition-transform duration-[15s] ease-linear brightness-[0.5] ${idx === currentBanner ? 'scale-110' : 'scale-100'}`}
                                alt={banner.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80"></div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-center text-center p-8 md:p-16 text-white transition-all duration-1000 z-10 ${idx === currentBanner ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
                                <h1 className="agent-hero font-normal tracking-tight mb-6 max-w-4xl drop-shadow-2xl hero-reveal uppercase leading-none" style={{ fontFamily: "WastedVindey, serif" }}>
                                    {banner.title.split(' ').map((word, i) => (
                                        <span key={i} className={i % 2 === 1 ? 'text-primary' : ''}>{word} </span>
                                    ))}
                                </h1>
                                <p className="agent-body text-white/80 font-normal max-w-xl mb-10 hero-reveal leading-relaxed uppercase tracking-widest" style={{ fontFamily: "WastedVindey, serif" }}>{banner.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Breadcrumbs - Integrated Left Bottom (Standardized) */}
                <div className="absolute bottom-16 left-12 z-40 hidden md:block hero-reveal">
                    <nav className="flex items-center gap-3 agent-small font-black uppercase tracking-widest text-white/90 bg-black/20 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 shadow-2xl">
                        <Link href="/agent" className="hover:text-primary transition-colors">Agent Portal</Link>
                        <ChevronRight size={12} className="text-white/40" />
                        <span className="text-white">Mandate Deals</span>
                    </nav>
                </div>

                {/* Banner Controls */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
                    {banners.map((_, i) => (
                        <div key={i} onClick={() => setCurrentBanner(i)} className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${i === currentBanner ? 'h-8 bg-primary' : 'bg-white/30'}`}></div>
                    ))}
                </div>
            </section>

            {/* Main Content Area */}
            <main className="max-w-[1600px] mx-auto px-4 md:px-8 pb-24 relative z-30 pt-12">
                {/* Breadcrumbs */}




                {/* Tab Bar Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-1 p-1.5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm w-full md:w-auto">
                        <button className="px-8 py-2.5 bg-white text-slate-900 rounded-xl agent-small font-black shadow-sm flex items-center gap-2">
                            <Grid size={14} /> All Posts
                        </button>
                        <button className="px-8 py-2.5 text-slate-400 agent-small font-bold hover:text-slate-600 transition-all">Requirements</button>
                        <button className="px-8 py-2.5 text-slate-400 agent-small font-bold hover:text-slate-600 transition-all">My Listings</button>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-xl agent-small font-black text-slate-900 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group">
                            <PlusCircle size={14} className="text-slate-400 group-hover:text-white" /> Post Your Inventory
                        </button>
                        <button className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-xl agent-small font-black text-slate-900 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group">
                            <PlusCircle size={14} className="text-slate-400 group-hover:text-white" /> Post Your Requirement
                        </button>
                    </div>
                </div>

                {/* Trending Projects Section */}
                <div className="mb-12 trending-projects-grid">
                    <div className="flex flex-row items-center justify-between mb-12">
                        <div className="flex flex-col items-start">
                            <h2 className="title-reveal-large py-2 overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                                Trending Projects <span className="gradent_text_color pr-2">in {selectedLocation}</span>
                            </h2>
                            <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">CURATED SELECTION OF TOP PERFORMING PROJECTS</p>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={() => {
                                    const container = document.getElementById('trending-carousel');
                                    container.scrollBy({ left: -400, behavior: 'smooth' });
                                }}
                                className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                            >
                                <ArrowRight size={20} className="rotate-180" />
                            </button>
                            <button
                                onClick={() => {
                                    const container = document.getElementById('trending-carousel');
                                    container.scrollBy({ left: 400, behavior: 'smooth' });
                                }}
                                className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                    <div
                        id="trending-carousel"
                        className="flex overflow-x-auto gap-8 snap-x snap-mandatory no-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {trendingProjects.map((proj, i) => (
                            <Link
                                key={i}
                                href={`/agent/projects/${proj.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="min-w-[260px] md:min-w-[290px] group bg-white rounded-lg overflow-hidden border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-[border-color,box-shadow,transform] duration-500 flex flex-col trending-project-card hover:-translate-y-3 relative snap-start"
                            >
                                <div className="h-[200px] relative overflow-hidden">
                                    <img src={proj.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={proj.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg agent-tiny font-black text-slate-900 uppercase flex items-center gap-2 border border-white/20 shadow-xl">
                                        <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div> RERA Verified
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h4 className="agent-h3 font-normal text-slate-900 mb-2 leading-tight group-hover:text-primary transition-colors" style={{ fontFamily: "WastedVindey, serif" }}>{proj.name}</h4>
                                    <p className="agent-meta font-bold text-slate-400 flex items-center gap-1.5 mb-6">
                                        <MapPin size={12} className="text-primary" /> {proj.loc}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-0.5">Starting At</span>
                                            <span className="agent-h3 font-black gradent_text_color tracking-tighter">{proj.price}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-[360deg] duration-700">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mandate Deals Section */}
                <div className="mb-12 border-b border-slate-100 pb-4">
                    <h2 className="title-reveal-large py-2 overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                        Mandate Deals <span className="gradent_text_color pr-2">in {selectedLocation}</span>
                    </h2>
                    <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">EXCLUSIVE DIRECT AGENT LISTINGS</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start mandate-deals-container">
                    <div className="flex-1">
                        <div className="flex flex-col gap-6 relative">
                            {/* Subtle Watermark inside section */}
                            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" className="w-full" alt="Watermark" />
                            </div>

                            <div className="relative z-10 flex flex-col gap-6">
                                {deals.map((deal) => (
                                    <div key={deal.id} className="bg-white rounded-[2.5rem] border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.12)] transition-all duration-700 p-2 flex flex-col md:flex-row gap-0 relative group mandate-deal-card hover:-translate-y-1 overflow-hidden">
                                        {deal.isMandate && (
                                            <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-40 pointer-events-none">
                                                <div className="absolute top-0 right-0 bg-slate-900 text-white agent-tiny font-black uppercase tracking-[0.2em] py-2 w-[180px] text-center rotate-45 translate-x-[55px] translate-y-[20px] shadow-2xl border-b border-white/20">
                                                    Direct Mandate
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1 p-8 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-[5rem] -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>

                                            <div className="flex items-center justify-between mb-6 relative z-10">
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-4 py-1.5 agent-tiny font-black uppercase tracking-[0.2em] rounded-xl shadow-sm border border-transparent group-hover:border-primary/20 ${deal.type === 'Builder Floor' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                                        {deal.type}
                                                    </span>
                                                    {deal.isPremium && (
                                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                                                            <Star size={12} fill="currentColor" />
                                                            <span className="agent-tiny font-black uppercase tracking-tighter">ELITE</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <span className="agent-small font-black text-slate-400 uppercase tracking-widest">Updated {deal.updated}</span>
                                                    <div className="flex gap-3">
                                                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer">
                                                            <Share2 size={14} />
                                                        </div>
                                                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer">
                                                            <Bookmark size={14} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="agent-h3 font-black text-slate-900 mb-6 group-hover:text-primary transition-colors cursor-pointer tracking-tighter leading-tight">{deal.title}</h3>

                                            {/* Expandable Stats Grid */}
                                            <div className="flex border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/30 relative z-10">
                                                <div className={`grid flex-1 transition-all duration-500 grid-cols-2 sm:grid-cols-3`}>
                                                    {[
                                                        { icon: <Maximize2 size={14} />, label: 'Plot Area', value: deal.area },
                                                        { icon: <Info size={14} />, label: 'Status', value: deal.status },
                                                        { icon: <Layers size={14} />, label: 'Floor', value: deal.floor },
                                                        { icon: <Compass size={14} />, label: 'Facing', value: deal.facing },
                                                        { icon: <Eye size={14} />, label: 'Overlooking', value: deal.overlooking },
                                                        { icon: <Road size={14} />, label: 'Road', value: deal.road }
                                                    ].slice(0, expandedDeals.has(deal.id) ? 6 : 3).map((item, idx) => (
                                                        <div key={idx} className={`flex flex-col gap-1.5 p-3 bg-white/50 hover:bg-white transition-colors border-r border-slate-200 last:border-r-0 ${idx > 2 ? 'border-t border-slate-200' : ''}`}>
                                                            <div className="flex items-center gap-2">
                                                                <div className="text-primary group-hover:scale-110 transition-transform">
                                                                    {item.icon}
                                                                </div>
                                                                <span className="agent-tiny font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                                                            </div>
                                                            <span className="agent-small font-black text-slate-700 truncate pl-5">{item.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div
                                                    onClick={() => toggleDealExpansion(deal.id)}
                                                    className="w-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-l border-slate-200 group/expand"
                                                >
                                                    <ChevronDown size={16} className={`text-slate-400 group-hover:text-primary transition-transform ${expandedDeals.has(deal.id) ? 'rotate-180' : ''}`} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-[240px] bg-slate-50/80 backdrop-blur-sm rounded-r-[2.5rem] p-8 flex flex-col justify-center items-center text-center border-l border-slate-100 group-hover:bg-white transition-all duration-700">
                                            <div className="mb-6">
                                                <p className="agent-h2 font-black text-slate-900 tracking-tighter mb-1">{deal.price}</p>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-lg shadow-sm mb-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span className="agent-tiny font-black text-slate-500 uppercase tracking-widest">Negotiable</span>
                                                </div>
                                                {deal.brokerage && (
                                                    <div className="p-2.5 bg-red-50 rounded-xl border border-red-100">
                                                        <p className="agent-small font-black text-red-600 uppercase tracking-tighter">Shared Brokerage: {deal.brokerage}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => setIsCreditPopupOpen(true)}
                                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black agent-small uppercase tracking-[0.2em] hover:bg-primary hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                                            >
                                                ENQUIRE AGENT <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-2 mt-16 pb-12">
                            <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-900 transition-all">&lt;</button>
                            {[1, 2, 3, 4, '...', 100].map((page, i) => (
                                <button key={i} className={`w-10 h-10 rounded-xl border flex items-center justify-center agent-small font-black transition-all ${page === 1 ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}>
                                    {page}
                                </button>
                            ))}
                            <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-900 transition-all">&gt;</button>
                        </div>
                    </div>
                    {/* Sidebar Vertical Ad */}
                    <aside className="hidden lg:block w-[320px] sticky top-22">
                        <div className="overflow-hidden shadow-2xl relative group bg-slate-900 aspect-[3/5]">
                            <img
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000"
                                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-[8000ms]"
                                alt="SS Camanza Ad"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white bg-gradient-to-t from-slate-900 via-transparent to-transparent">
                                <div className="mb-4">
                                    <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded agent-tiny font-black uppercase tracking-widest mb-4 inline-block">SS GROUP</span>
                                    <h4 className="agent-h2 font-black uppercase tracking-tighter italic leading-none mb-2">SS CAMANZA</h4>
                                    <p className="agent-small font-bold text-white/60 uppercase tracking-widest mb-4 italic">Luxury Meets Nature</p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <p className="agent-small font-bold uppercase tracking-widest mb-1">Starting ₹3.61 CR*</p>
                                    <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black agent-small uppercase tracking-widest hover:bg-slate-800 transition-all">Enquire Now</button>
                                </div>
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
            <ContactViewForm
                isOpen={isContactFormOpen}
                onClose={() => setIsContactFormOpen(false)}
            />

            {/* Fixed Bottom Search Pill - Always Visible */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[850px] px-4">
                <div className="bg-white/95 backdrop-blur-xl rounded-full flex items-center p-2 border border-slate-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                    {/* Area Selector */}
                    <div className="relative group">
                        <div
                            onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                            className="flex items-center gap-4 px-8 border-r border-slate-100 cursor-pointer h-14"
                        >
                            <MapPin size={18} className="text-primary group-hover:scale-110 transition-transform" />
                            <span className="agent-meta font-black text-slate-700 whitespace-nowrap uppercase tracking-widest">
                                {selectedArea}
                            </span>
                            <ChevronDown size={14} className={`text-slate-400 transition-transform ${showAreaDropdown ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Dropdown Menu */}
                        {showAreaDropdown && (
                            <div className="absolute border-2 border-slate-200 bottom-full mb-4 left-0 bg-white rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-2 w-[220px] z-[110] animate-in fade-in slide-in-from-bottom-4 duration-300">
                                {areas.map((area) => (
                                    <div
                                        key={area}
                                        onClick={() => {
                                            setSelectedArea(area);
                                            setShowAreaDropdown(false);
                                        }}
                                        className="px-4 py-3 rounded-xl agent-small font-black text-slate-600 hover:bg-slate-50 hover:text-primary transition-all cursor-pointer uppercase tracking-widest"
                                    >
                                        {area}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Input */}
                    <div className="flex-1 px-6">
                        <div className="flex items-center gap-4">
                            <Search className="text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search Mandates..."
                                className="w-full h-14 bg-transparent agent-small font-bold outline-none placeholder:text-slate-400 uppercase tracking-widest"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-primary transition-all shadow-lg active:scale-95">
                        <Search size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
