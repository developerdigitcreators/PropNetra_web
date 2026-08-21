'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Grid, PlusCircle, Share2, Phone, Search, ChevronRight, MapPin, MessageSquare, Bookmark, Building2, Crown
} from 'lucide-react';
import { CreditConsumptionPopup, ContactViewForm } from '@/components/AgentPopups';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeedbackModal from '@/components/FeedbackModal';

gsap.registerPlugin(ScrollTrigger);

export default function BuyerRequirementsPage() {
    const [selectedLocation, setSelectedLocation] = useState('Gurgaon');
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [isCreditPopupOpen, setIsCreditPopupOpen] = useState(false);
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);

    const banners = [
        { title: "Exclusive Properties", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000" },
        { title: "Premium Projects", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000" }
    ];

    const containerRef = React.useRef(null);

    React.useLayoutEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        const ctx = gsap.context(() => {
            // Hero Reveal
            gsap.fromTo(".hero-reveal",
                { y: 60, opacity: 0, scale: 1.1 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    stagger: 0.3,
                    clearProps: "all"
                }
            );

            // Search Bar Reveal
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

            // Title reveals
            gsap.fromTo(".title-reveal-large span",
                { y: 60, opacity: 0, skewY: 5 },
                {
                    y: 0,
                    opacity: 1,
                    skewY: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".title-reveal-large",
                        start: "top 90%",
                    }
                }
            );

            // Grid items
            gsap.fromTo(".requirement-card-reveal",
                { y: 80, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power4.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".requirements-grid-container",
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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const builders = [
        { name: 'SIGNATURE GLOBAL', logo: '/dev/7.png' },
        { name: 'M3M', logo: '/dev/4.png' },
        { name: 'SMART WORLD', logo: '/dev/10.png' },
        { name: 'DLF', logo: '/dev/11.png' },
        { name: 'EMAAR', logo: '/dev/12.png' },
        { name: 'ADANI', logo: '/dev/13.png' },
        { name: 'WHITESPACE', logo: '/dev/14.jpg' },
        { name: 'EMPERIUM', logo: '/dev/1.png' },
        { name: 'GANGA', logo: '/dev/2.png' },
        { name: 'KRISUMI', logo: '/dev/3.png' }
    ];

    const trendingProjects = [
        { name: 'MVN Aero One', badge: "Exclusive", price: '₹19.6 - 42.1 Cr', loc: 'Sector 37D', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600' },
        { name: 'Oberoi Sixty North', badge: "Exclusive", price: '₹23.1 - 35.7 Cr', loc: 'Golf Course', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600' },
        { name: 'SmartWorld Saab', badge: "Exclusive", price: '₹1.81 - 11.05 Cr', loc: 'Noida Express', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600' },
        { name: 'Whiteland Westin', badge: "Exclusive", price: '₹6.68 - 11.25 Cr', loc: 'Sector 103', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600' },
        { name: 'Whiteland Westin', badge: "Exclusive", price: '₹6.68 - 11.25 Cr', loc: 'Sector 103', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600' },
        { name: 'Whiteland Westin', badge: "Exclusive", price: '₹6.68 - 11.25 Cr', loc: 'Sector 103', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600' }
    ];

    const requirements = Array(9).fill({
        location: 'DLF Phase 2, Block J, Gurgaon',
        posted: '25 March 2024',
        price: '3.50 Cr',
        area: '215 Sq. Yd',
        isPremium: true,
        tag: 'Apartment'
    });

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
                                <p className="agent-small text-white/50 font-light max-w-2xl mb-10 uppercase tracking-[0.2em] border-l-2 border-white/20 pl-6">Requirements By Channel</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Repositioned Search Bar & Breadcrumbs */}
            <div className="relative -mt-21 z-40 px-4 search-bar-reveal">
                <div className="max-w-[1100px] mx-auto">
                    {/* Breadcrumbs Above Search Bar */}
                    <nav className="flex items-center justify-center gap-3 agent-tiny font-light uppercase tracking-[0.3em] mb-6">
                        <Link href="/agent" className="text-white/40 hover:text-white transition-colors">Agent Portal</Link>
                        <ChevronRight size={12} className="text-white/20" />
                        <span className="text-white/90">Buyer Requirements</span>
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

                        <button className="w-full md:w-auto px-12 h-16 bg-slate-800/60 backdrop-blur-xl text-white rounded-2xl font-bold font-roboto agent-body uppercase tracking-[0.2em] hover:bg-slate-800/80 transition-all active:scale-95 border border-white/20 shadow-2xl">SEARCH</button>
                    </div>
                </div>
            </div>
            <main className="max-w-[1400px] mx-auto px-4 pb-12 relative z-30 pt-12">
                {/* Tab Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 tabs-reveal">
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

                {/* Top Builder Marquee */}
                <div className="mb-10">
                    <h2 className="agent-h2 font-normal mb-6" style={{ fontFamily: "WastedVindey, serif" }}>
                        Top Builders <span className="gradent_text_color pr-2">in {selectedLocation}</span>
                    </h2>
                    <div className="flex gap-8 overflow-hidden py-4">
                        <div className="flex gap-6 animate-marquee whitespace-nowrap">
                            {[...builders, ...builders].map((builder, i) => (
                                <Link key={i} href={`/agent/developers/${builder.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col items-center gap-4 shrink-0 group transition-transform hover:-translate-y-2">
                                    <div className="w-28 h-28 rounded-3xl border-2 border-[#D4AF37]/40 flex items-center justify-center bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden p-6 group-hover:border-[#D4AF37] group-hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.2)] transition-all duration-500 relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img src={builder.logo} className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" alt={builder.name} />
                                    </div>
                                    <span className="agent-meta font-black text-slate-500 uppercase group-hover:text-primary transition-colors">{builder.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trending Projects */}
                <div className="mb-6">
                    <div className="flex flex-col items-start gap-4 mb-12">
                        <h2 className="agent-h2 font-normal" style={{ fontFamily: "WastedVindey, serif" }}>
                            Trending Projects <span className="gradent_text_color pr-2">in {selectedLocation}</span>
                        </h2>
                    </div>
                    <div className="flex gap-5 overflow-x-auto pb-10 px-4 scrollbar-hide snap-x snap-mandatory -mx-4">
                        {trendingProjects.map((proj, i) => (
                            <div key={i} className="min-w-[300px] md:min-w-[280px] lg:min-w-[320px] snap-start group bg-white rounded-[1.8rem] overflow-hidden border-2 border-slate-900/10 hover:border-primary hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 flex flex-col trending-card-reveal">
                                <div className="h-[180px] relative overflow-hidden">
                                    <img src={proj.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={proj.name} />
                                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg agent-tiny font-black text-slate-900 uppercase flex items-center gap-2 border-2 border-slate-900/5 shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                        {proj.badge}
                                    </div>
                                </div>
                                <div className="p-5 py-3 flex-1 flex flex-col">
                                    <div className="mb-3">
                                        <h4 className="agent-h3 font-normal text-slate-900 mb-1 leading-tight tracking-wide group-hover:text-primary transition-colors line-clamp-1" style={{ fontFamily: "WastedVindey, serif" }}>{proj.name}</h4>
                                        <div className="h-[2px] w-12 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full"></div>
                                    </div>
                                    <div className="agent-h3 font-black text-slate-900 mb-2 font-roboto tracking-tight">{proj.price}</div>

                                    <div className="flex flex-col gap-0.5 mb-3">
                                        <div className="text-slate-600 agent-meta font-bold tracking-tight leading-tight">{proj.loc}</div>
                                        <div className="text-slate-400 agent-meta font-medium tracking-tight leading-tight">{proj.city}</div>
                                    </div>

                                    <button className="w-full py-2 bg-slate-900 text-white rounded-xl font-black agent-tiny uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-xl">
                                        VIEW DETAILS
                                    </button>
                                    <div className="mt-3 border-t border-slate-50 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <button onClick={() => setFeedbackOpen(true)} className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-black/10 transition-all">
                                                {/* <MessageSquare size={14} className="" /> */}
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Feedback</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <button className="cursor-pointer w-9 h-9 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                                                <Share2 size={16} />
                                            </button>
                                            <button className="cursor-pointer px-3 py-2 rounded-lg border border-primary/40 text-primary text-[10px] font-black uppercase hover:bg-primary/10 transition-all whitespace-nowrap">
                                                Contact Agent
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        ))}
                    </div>
                </div>

                {/* Heading for Requirements */}
                <div className="mb-10 border-b border-slate-100 pb-4">
                    <h2 className="agent-h2 font-normal" style={{ fontFamily: "WastedVindey, serif" }}>
                        Agent Buyer Requirements <span className="gradent_text_color pr-2">in {selectedLocation}</span>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start requirements-grid-container">
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {requirements.map((req, i) => (
                                <div key={i} className="bg-white rounded-[1.8rem] border border-slate-100 p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 group relative requirement-card-reveal hover:-translate-y-2">
                                    {/* Top Badge Row */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
                                            <Building2 size={12} className="text-primary" />
                                            <span className="text-[10px] font-black text-slate-900">{req.tag}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg shadow-lg">
                                            <Crown size={12} className="text-amber-400 fill-amber-400" />
                                            <span className="text-[9px] font-black text-white">Premium Member</span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="mb-1">
                                        <h3 className="agent-body font-black text-slate-900 mb-3 leading-tight tracking-tight">{req.location}</h3>
                                        <p className="text-[12px] font-bold text-slate-500 mb-3">Sector 65, Gurugram</p>
                                        <div className="flex items-center justify-between">
                                            <span className="agent-meta font-black text-slate-700 ">3BHK</span>
                                            <span className="text-[10px] font-bold text-slate-400">Posted on: <span className="text-slate-600 font-black">{req.posted}</span></span>
                                        </div>
                                    </div>

                                    {/* Dashed Separator */}
                                    <div className="border-t-2 border-dashed border-slate-200 mb-3"></div>

                                    {/* Price & Area Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="bg-white border border-slate-200 p-4 py-2 rounded-xl text-center group-hover:border-primary/30 transition-colors shadow-sm">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</p>
                                            <p className="text-[15px] font-black text-slate-900 tracking-tight">₹ {req.price}</p>
                                        </div>
                                        <div className="bg-white border border-slate-200 p-4 py-2 rounded-xl text-center group-hover:border-primary/30 transition-colors shadow-sm">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Plot Size</p>
                                            <p className="text-[15px] font-black text-slate-900 tracking-tight">{req.area}</p>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="flex items-center gap-1">
                                        <button className="cursor-pointer w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-all shadow-sm">
                                            <Bookmark size={18} />
                                        </button>
                                        <button className="cursor-pointer w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-all shadow-sm">
                                            <Share2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => setIsCreditPopupOpen(true)}
                                            className="cursor-pointer flex-1 h-12 bg-[#5D3FD3] text-white rounded-xl agent-small font-black uppercase hover:bg-[#4B32A8] transition-all flex items-center justify-center gap-1 shadow-lg shadow-indigo-200 active:scale-95"
                                        >
                                            <Phone size={14} className="fill-white/20" />
                                            Contact Agent
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-3 flex justify-center">
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
            <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { display: flex; animation: marquee 40s linear infinite; }
                .animate-marquee:hover { animation-play-state: paused; }
            `}} />
        </div>
    );
}
