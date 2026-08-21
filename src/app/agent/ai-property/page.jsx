'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Search, MapPin, Filter, ArrowRight, Sparkles,
    TrendingUp, ShieldCheck, Zap, Layers, Grid, List,
    ChevronDown, Heart, Share2, Info, Building2,
    DollarSign, ArrowUpRight, Cpu, Star, Calendar,
    Shrink
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function AIPropertyPage() {
    const [activeTab, setActiveTab] = useState('Buy');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedReqId, setSelectedReqId] = useState(1); // Default to first requirement
    const containerRef = useRef(null);

    const requirements = [
        {
            id: 1,
            title: "DLF Phase 2, Block k, Gurgaon",
            location: "Gurgaon",
            budget: "₹ 3.50 Cr",
            plotSize: "215 Sq. Yd",
            type: "Buy",
            postedDate: "25 March 2024",
            category: "FLOOR",
            matches: [
                {
                    id: 101,
                    title: "Luxury Floor in DLF Phase 2",
                    location: "DLF Phase 2",
                    budget: "₹ 3.40 Cr",
                    plotSize: "215 Sq. Yd",
                    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
                    aiMatch: "98%"
                },
                {
                    id: 102,
                    title: "Modern Apartment DLF 2",
                    location: "DLF Phase 2",
                    budget: "₹ 3.10 Cr",
                    plotSize: "180 Sq. Yd",
                    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
                    aiMatch: "95%"
                },
                {
                    id: 103,
                    title: "Luxury Floor in DLF Phase 2",
                    location: "DLF Phase 2",
                    budget: "₹ 3.40 Cr",
                    plotSize: "215 Sq. Yd",
                    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
                    aiMatch: "98%"
                },
                {
                    id: 104,
                    title: "Modern Apartment DLF 2",
                    location: "DLF Phase 2",
                    budget: "₹ 3.10 Cr",
                    plotSize: "180 Sq. Yd",
                    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
                    aiMatch: "95%"
                },
                {
                    id: 105,
                    title: "Luxury Floor in DLF Phase 2",
                    location: "DLF Phase 2",
                    budget: "₹ 3.40 Cr",
                    plotSize: "215 Sq. Yd",
                    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
                    aiMatch: "98%"
                },
                {
                    id: 106,
                    title: "Modern Apartment DLF 2",
                    location: "DLF Phase 2",
                    budget: "₹ 3.10 Cr",
                    plotSize: "180 Sq. Yd",
                    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
                    aiMatch: "95%"
                }
            ]
        },
        {
            id: 2,
            title: "M3M Golfestate, Sector 65",
            location: "Gurgaon",
            budget: "₹ 8.75 Cr",
            plotSize: "450 Sq. Yd",
            type: "Buy",
            postedDate: "28 March 2024",
            category: "PENTHOUSE",
            matches: [
                {
                    id: 201,
                    title: "Sky Villa in Golfestate",
                    location: "Sector 65",
                    budget: "₹ 8.20 Cr",
                    plotSize: "420 Sq. Yd",
                    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
                    aiMatch: "94%"
                },
                {
                    id: 202,
                    title: "Premium Duplex M3M",
                    location: "Sector 65",
                    budget: "₹ 7.90 Cr",
                    plotSize: "380 Sq. Yd",
                    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
                    aiMatch: "91%"
                }
            ]
        },
        {
            id: 3,
            title: "DLF Cyber City, Phase 2",
            location: "Gurgaon",
            budget: "₹ 2.40 Cr",
            plotSize: "1200 Sq. Ft",
            type: "Sell",
            postedDate: "15 April 2024",
            category: "OFFICE",
            matches: [
                {
                    id: 301,
                    title: "Fully Furnished Office",
                    location: "Cyber City",
                    budget: "₹ 2.20 Cr",
                    plotSize: "1100 Sq. Ft",
                    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
                    aiMatch: "89%"
                }
            ]
        }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".ai-title-reveal",
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
            );

            gsap.fromTo(".ai-card",
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1,
                    duration: 0.8, stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".ai-grid-container",
                        start: "top 85%"
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [activeTab, selectedReqId]);

    // Reset selected requirement when tab changes
    React.useEffect(() => {
        const firstReq = requirements.find(r => r.type === activeTab);
        if (firstReq) setSelectedReqId(firstReq.id);
    }, [activeTab]);

    const selectedRequirement = requirements.find(req => req.id === selectedReqId);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#F8F9FA]">
            {/* AI Hero Banner */}
            <div className="relative h-80 w-full overflow-hidden flex items-center justify-center bg-slate-900">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000" className="w-full h-full object-cover grayscale" alt="AI Tech" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900 to-[#F8F9FA]"></div>

                <div className="relative z-10 text-center px-6">
                    <div className="flex items-center justify-center gap-3 mb-6 ai-title-reveal">
                        <div className="p-3 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30">
                            <Cpu className="text-primary" size={28} />
                        </div>
                        <span className="agent-small font-black text-primary uppercase tracking-[0.4em]">PropNetra AI Insights</span>
                    </div>
                    <h1 className="agent-h1 lg:text-[3.5rem] font-normal text-white leading-[0.9] mb-4 ai-title-reveal" style={{ fontFamily: "WastedVindey, serif" }}>
                        AI Property <span className="gradent_text_color">Intelligence</span>
                    </h1>
                    <p className="agent-tiny font-black text-slate-400 uppercase tracking-[0.4em] ai-title-reveal">SMART PREDICTIONS • DATA-DRIVEN DEALS</p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 -mt-10 relative z-20">
                {/* AI Stats Strip */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: "Buy Requirements", val: requirements.filter(r => r.type === 'Buy').length, icon: <TrendingUp size={20} /> },
                        { label: "Sell Requirements", val: requirements.filter(r => r.type === 'Sell').length, icon: <ShieldCheck size={20} /> },
                        { label: "Buy Matches", val: "1.2k", icon: <Zap size={20} /> },
                        { label: "Sell Matches", val: "1.1k", icon: <ArrowUpRight size={20} /> }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-2 py-3 rounded-3xl border border-slate-200 shadow-xl flex items-center gap-5 hover:-translate-y-1 transition-all duration-500">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100">{stat.icon}</div>
                            <div>
                                <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="agent-h3 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter & View Control */}
                <div className='mb-12 w-full flex flex-col md:flex-row items-center gap-6'>
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                        {['Buy', 'Sell'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`cursor-pointer px-10 py-3 rounded-xl agent-small font-black uppercase tracking-widest transition-all ${activeTab === tab
                                    ? 'bg-slate-900 text-white shadow-xl scale-105'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 w-full relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary">
                            <Layers size={18} />
                        </div>
                        <select
                            value={selectedReqId}
                            onChange={(e) => setSelectedReqId(Number(e.target.value))}
                            className="w-full h-16 pl-14 pr-12 bg-white rounded-2xl agent-body font-bold outline-none border-2 border-slate-100 focus:border-primary/40 transition-all appearance-none cursor-pointer shadow-sm hover:shadow-md"
                        >
                            {requirements.filter(req => req.type === activeTab).map((req) => (
                                <option key={req.id} value={req.id}>
                                    Requirement: {req.title} ({req.postedDate})
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-primary transition-colors">
                            <ChevronDown size={20} />
                        </div>
                    </div>
                </div>

                {/* Single Selected Requirement & Matches */}
                <div className="space-y-20 mb-20">
                    {selectedRequirement && (
                        <div key={selectedRequirement.id} className="relative">
                            {/* Sticky Requirement Header */}
                            <div className="sticky top-[80px] z-30 py-0 bg-[#F8F9FA]/80 backdrop-blur-sm">
                                <div className="w-full bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col xl:flex-row items-center gap-6 xl:gap-8 overflow-hidden">
                                    {/* Left: Identity Section */}
                                    <div className="flex items-center gap-4 shrink-0 max-w-full">
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary shadow-sm">
                                            <Layers size={20} />
                                        </div>
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="agent-h4 font-normal text-slate-900 leading-none truncate" style={{ fontFamily: "WastedVindey, serif" }}>{selectedRequirement.title}</h4>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-400 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={11} />
                                                    <span className="agent-meta font-bold uppercase tracking-tight leading-none">{selectedRequirement.postedDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle: Data Columns (Tightened) */}
                                    <div className="flex-1 flex items-center justify-center gap-6 md:gap-8 border-x border-slate-50 px-4 md:px-8">
                                        <div className="flex flex-col items-center justify-center gap-1 text-center">
                                            <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none">Budget</p>
                                            <p className="agent-h4 font-bold text-slate-900 leading-none whitespace-nowrap">{selectedRequirement.budget}</p>
                                        </div>

                                        <div className="w-px h-6 bg-slate-100 shrink-0"></div>

                                        <div className="flex flex-col items-center justify-center gap-1 text-center">
                                            <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none">Area</p>
                                            <p className="agent-h4 font-bold text-slate-900 leading-none whitespace-nowrap">{selectedRequirement.plotSize}</p>
                                        </div>

                                        <div className="w-px h-6 bg-slate-100 shrink-0"></div>

                                        <div className="flex flex-col items-center justify-center gap-1 text-center">
                                            <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none">Class</p>
                                            <p className="agent-meta font-black text-slate-900 uppercase tracking-widest leading-none whitespace-nowrap">{selectedRequirement.category}</p>
                                        </div>
                                    </div>

                                    {/* Right: Actions (Secured) */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <button className="cursor-pointer px-6 h-12 bg-slate-900 text-white rounded-xl agent-small font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center whitespace-nowrap">
                                            View Requirement
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Matched Properties Grid */}
                            <div className="mt-8">
                                <div className="flex items-center gap-4 mb-8 pl-4">
                                    <div className="h-px flex-1 bg-slate-200"></div>
                                    <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Matched Properties for this requirement</p>
                                    <div className="h-px flex-1 bg-slate-200"></div>
                                </div>

                                <div className="ai-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {selectedRequirement.matches.map((match) => (
                                        <div key={match.id} className="ai-card bg-white rounded-[1.8rem] overflow-hidden border border-slate-200 hover:border-primary/40 transition-all duration-700 group hover:-translate-y-2 shadow-sm hover:shadow-xl">
                                            <div className="h-[210px] relative overflow-hidden">
                                                <img src={match.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={match.title} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                                                <div className="absolute bottom-5 left-6 right-6">
                                                    <h3 className="agent-h3 font-normal text-white mb-0.5" style={{ fontFamily: "WastedVindey, serif" }}>{match.title}</h3>
                                                    <div className="flex items-center gap-2 text-white/70">
                                                        <MapPin size={13} />
                                                        <span className="agent-tiny font-bold uppercase tracking-widest">{match.location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div>
                                                        <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-0.5">Area</p>
                                                        <p className="agent-meta font-bold text-slate-900 flex items-center gap-2">
                                                            <Shrink size={15} className="text-green-500" />
                                                            {match.plotSize}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-0.5">Price</p>
                                                        <p className="agent-h3 font-normal text-primary" style={{ fontFamily: "WastedVindey, serif" }}>{match.budget}</p>
                                                    </div>
                                                </div>

                                                <button className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-slate-900 text-white rounded-xl agent-small font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10">
                                                    View Details <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* <Footer /> */}
            <section className="pt-0 relative overflow-hidden bg-white left-1/2 -translate-x-1/2">
                <div className="w-full relative z-10">
                    <div className="relative bg-white border-y border-slate-100 overflow-hidden shadow-sm min-h-[250px] flex items-center">
                        {/* Full Card Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
                                className="w-full h-full object-cover opacity-80"
                                alt="Referral Rewards"
                            />
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
                        </div>

                        {/* Full Width Content Flow */}
                        <div className="relative z-10 px-6 md:px-14 py-8 w-full flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-10">
                            {/* Left: Branding & Info */}
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                <div className="text-center md:text-left border-l-0 md:border-l-4 border-primary pl-0 md:pl-8">
                                    <h2 className="title-reveal-large py-1 leading-[0.9] mb-2 overflow-hidden agent-h2" style={{ fontFamily: "WastedVindey, serif" }}>
                                        <span className="text-slate-950 inline-block">Refer & Earn</span> <span className="gradent_text_color pr-2 inline-block">Rewards</span>
                                    </h2>
                                    <p className="text-slate-950 agent-small font-black uppercase tracking-[0.2em] opacity-60">
                                        Join the Elite Circle
                                    </p>
                                </div>

                                <div className="hidden md:flex items-center gap-8">
                                    <div className="flex flex-col">
                                        <span className="agent-h1 font-black text-slate-950">₹50K+</span>
                                        <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">Earning</span>
                                    </div>
                                    <div className="w-[1px] h-10 bg-slate-200"></div>
                                    <div className="flex flex-col">
                                        <span className="agent-h1 font-black text-slate-950">1000+</span>
                                        <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">Partners</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-8">
                                <div className="hidden xl:block text-right">
                                    <p className="text-slate-900 agent-small font-bold leading-tight mb-1">Refer a colleague today</p>
                                    <p className="text-slate-500 agent-tiny font-bold uppercase tracking-widest italic">Terms & Conditions Apply</p>
                                </div>
                                <Link href="/agent/refer">
                                    <button className="px-14 py-5 bg-slate-900 text-white rounded-xl font-black agent-small uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl group flex items-center gap-3">
                                        Refer Now
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
