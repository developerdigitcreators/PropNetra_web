'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
    X, Search, ChevronDown, Bell, User, MapPin, Grid, List,
    Filter, Share2, Heart, ExternalLink, Calendar,
    Maximize2, Info, ArrowRight, Phone, MessageSquare,
    Compass, Home, Layers, Eye, Route, PlusCircle, Star, ChevronRight, ChevronUp, ChevronLeft, Bookmark, Check,
    Clock, Map
} from 'lucide-react';
import { CreditConsumptionPopup, ContactViewForm } from '@/components/AgentPopups';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BuilderFloorsPage() {
    const [selectedLocation, setSelectedLocation] = useState('Gurgaon');
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedArea, setSelectedArea] = useState("Select Area");
    const [showAreaDropdown, setShowAreaDropdown] = useState(false);
    const [isCreditPopupOpen, setIsCreditPopupOpen] = useState(false);
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);
    const [expandedFloors, setExpandedFloors] = useState(new Set());
    const [floorImageIndices, setFloorImageIndices] = useState({});
    const [lightbox, setLightbox] = useState({ isOpen: false, images: [], currentIndex: 0 });

    // Auto-change images for each property card
    useEffect(() => {
        const interval = setInterval(() => {
            setFloorImageIndices(prev => {
                const next = { ...prev };
                builderFloors.forEach(floor => {
                    const currentIndex = prev[floor.id] || 0;
                    next[floor.id] = (currentIndex + 1) % (floor.images?.length || 1);
                });
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const openLightbox = (images, index) => {
        setLightbox({ isOpen: true, images, currentIndex: index });
    };

    const closeLightbox = () => {
        setLightbox({ ...lightbox, isOpen: false });
    };

    const nextLightboxImage = () => {
        setLightbox(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.images.length
        }));
    };

    const prevLightboxImage = () => {
        setLightbox(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
        }));
    };

    const toggleFloorExpansion = (id) => {
        setExpandedFloors(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const nextFloorImage = (id, max) => {
        setFloorImageIndices(prev => ({
            ...prev,
            [id]: ((prev[id] || 0) + 1) % max
        }));
    };

    const prevFloorImage = (id, max) => {
        setFloorImageIndices(prev => ({
            ...prev,
            [id]: ((prev[id] || 0) - 1 + max) % max
        }));
    };
    const containerRef = useRef(null);

    const areas = ["Sector 88A", "Sector 102", "Golf Course Ext", "Sohna Road", "New Gurgaon"];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowSearch(true);
            } else {
                setShowSearch(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        const ctx = gsap.context(() => {
            // Headings reveal
            gsap.fromTo(".title-reveal-large span",
                { y: 80, opacity: 0, rotateX: 45 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
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

            // Builder marquee reveal
            gsap.fromTo(".builder-marquee-reveal",
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".builder-marquee-container",
                        start: "top 85%",
                    }
                }
            );

            // Trending projects reveal
            gsap.fromTo(".trending-project-card",
                { y: 80, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power4.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".trending-projects-grid",
                        start: "top 85%",
                    }
                }
            );

            // Builder floors reveal
            gsap.fromTo(".builder-floor-card",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".builder-floors-container",
                        start: "top 85%",
                    }
                }
            );
        }, containerRef);

        return () => {
            ctx.revert();
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const banners = [
        { title: "LAMBORGHINI BRANDED RESIDENCES", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000" },
        { title: "M3M CROWN SECTOR 113", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000" },
        { title: "MAX ANTARA SENIOR LIVING", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000" }
    ];

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
        { name: 'MVN Aero One', price: '₹19.6 - 42.1 Cr', loc: 'Sector 37D', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600', badge: 'EXCLUSIVE' },
        { name: 'Oberoi Sixty North', price: '₹23.1 - 35.7 Cr', loc: 'sector 66', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600', badge: 'NEW LAUNCH' },
        { name: 'SmartWorld Saab', price: '₹1.81 - 11.05 Cr', loc: 'Noida Express', city: 'Noida, Uttar Pradesh', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600', badge: 'BEST SELLER' },
        { name: 'Whiteland Westin', price: '₹6.68 - 11.25 Cr', loc: 'Sector 103', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600', badge: 'READY TO MOVE' },
        { name: 'Godrej Zenith', price: '₹4.25 - 8.90 Cr', loc: 'Sector 89', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=600', badge: 'TOP RATED' },
        { name: 'M3M Crown', price: '₹2.85 - 5.50 Cr', loc: 'Sector 113', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600', badge: 'LIMITED EDITION' },
        { name: 'DLF Privana', price: '₹3.95 - 7.20 Cr', loc: 'Sector 76', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600', badge: 'NEW LAUNCH' },
        { name: 'AIPL Joy Central', price: '₹1.15 - 4.80 Cr', loc: 'Sector 65', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600', badge: 'HOT DEAL' }
    ];

    const builderFloors = [
        {
            id: 1,
            title: '2 BHK Builder Floor, Huda, Sector 57, Gurgaon',
            updated: '25 March 2024',
            area: '200 Sq. Yds.',
            status: 'Under Construction',
            floor: '1 out of 4',
            facing: 'South',
            overlooking: 'Park',
            road: '10 meter',
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
            images: [
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800'
            ],
            prices: {
                "1st Floor": "1.85 Cr",
                "2nd Floor": "1.75 Cr",
                "3rd Floor": "1.75 Cr",
                "4th Floor": "1.8 Cr"
            },
            isPremium: true
        },
        {
            id: 2,
            title: '3 BHK Builder Floor, DLF Phase 1, Gurgaon',
            updated: '26 March 2024',
            area: '300 Sq. Yds.',
            status: 'Ready to Move',
            floor: '2 out of 4',
            facing: 'East',
            overlooking: 'Pool',
            road: '12 meter',
            img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800',
            images: [
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800'
            ],
            prices: {
                "1st Floor": "2.85 Cr",
                "2nd Floor": "2.75 Cr",
                "3rd Floor": "2.75 Cr",
                "4th Floor": "2.9 Cr"
            },
            isPremium: true
        },
        {
            id: 3,
            title: '4 BHK Builder Floor, Sushant Lok, Gurgaon',
            updated: '27 March 2024',
            area: '500 Sq. Yds.',
            status: 'Ready to Move',
            floor: '4 out of 4',
            facing: 'North',
            overlooking: 'Garden',
            road: '18 meter',
            img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
            images: [
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800'
            ],
            prices: {
                "1st Floor": "4.85 Cr",
                "2nd Floor": "4.75 Cr",
                "3rd Floor": "4.75 Cr",
                "4th Floor": "5.1 Cr"
            },
            isPremium: false
        },
        {
            id: 4,
            title: '3 BHK Builder Floor, Sector 45, Gurgaon',
            updated: '28 March 2024',
            area: '250 Sq. Yds.',
            status: 'Ready to Move',
            floor: '3 out of 4',
            facing: 'South',
            overlooking: 'Road',
            road: '10 meter',
            img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800',
            images: [
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800'
            ],
            prices: {
                "1st Floor": "2.25 Cr",
                "2nd Floor": "2.15 Cr",
                "3rd Floor": "2.15 Cr",
                "4th Floor": "2.4 Cr"
            },
            isPremium: true
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-white font-sans selection:bg-primary/10">
            {/* Hero Slider */}
            <section className="relative h-[450px] md:h-[500px] overflow-hidden bg-slate-900">
                <div
                    className="flex h-full transition-transform duration-1000 ease-out"
                    style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                    {banners.map((banner, idx) => (
                        <div key={idx} className="min-w-full h-full relative">
                            <img src={banner.img} className="w-full h-full object-cover brightness-75 scale-105" alt={banner.title} />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/60"></div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-center text-center p-6 md:p-8 transition-all duration-1000 ${idx === currentBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <span className="text-amber-400 agent-small font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4 drop-shadow-lg">Luxury Collections</span>
                                <h1 className="text-white agent-hero font-normal tracking-tight mb-6 max-w-4xl drop-shadow-2xl leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>{banner.title}</h1>
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="h-[1px] w-8 md:w-12 bg-amber-400/50"></div>
                                    <span className="text-white/80 agent-small font-bold tracking-widest uppercase italic">PropNetra Exclusive</span>
                                    <div className="h-[1px] w-8 md:w-12 bg-amber-400/50"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
                    {banners.map((_, i) => (
                        <div key={i} onClick={() => setCurrentBanner(i)} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === currentBanner ? 'h-8 bg-primary' : 'bg-white/30'}`}></div>
                    ))}
                </div>

                {/* Left Side Breadcrumbs Inside Hero - Standardized */}
                <div className="absolute bottom-12 left-12 z-40 hidden md:block">
                    <nav className="flex items-center gap-2 agent-small font-black uppercase tracking-widest text-white/90 bg-black/20 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10">
                        <Link href="/agent" className="hover:text-primary transition-colors">Agent Portal</Link>
                        <ChevronRight size={12} className="text-white/40" />
                        <span className="text-white">Builder Floors</span>
                    </nav>
                </div>
            </section>

            <main className="max-w-[1600px] mx-auto px-4 md:px-8 pb-24 relative z-30 pt-12">

                {/* Tab Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-5">
                    <div className="flex items-center gap-1 p-1.5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm w-full md:w-auto">
                        <button className="px-8 py-2.5 bg-white text-slate-900 rounded-xl agent-small font-black shadow-sm flex items-center gap-2"><Grid size={14} /> All Posts</button>
                        <button className="px-8 py-2.5 text-slate-400 agent-small font-bold hover:text-slate-600 transition-all">Requirements</button>
                        <button className="px-8 py-2.5 text-slate-400 agent-small font-bold hover:text-slate-600 transition-all">My Listings</button>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto bg-slate-50 ">
                        <button className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-xl agent-small font-black text-slate-500 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group"><PlusCircle size={14} className="text-slate-400 group-hover:text-white" /> Post Your Inventory</button>
                        <button className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-xl agent-small font-black text-slate-500 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group"><PlusCircle size={14} className="text-slate-400 group-hover:text-white" /> Post Your Requirement</button>
                    </div>
                </div>

                {/* Top Builder Marquee */}
                <div className="mt-0 builder-marquee-container overflow-x-hidden">
                    <h2 className="title-reveal-large py-2 mb-2 overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                        Top Builders <span className="gradent_text_color pr-2">in {selectedLocation}</span>
                    </h2>
                    <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4 mb-8">Expert Craftsmanship & Trust</p>
                    <div className="flex gap-8 overflow-hidden pb-4 builder-marquee-reveal">
                        <div className="flex gap-10 animate-marquee whitespace-nowrap py-6">
                            {[...builders, ...builders].map((builder, i) => (
                                <Link key={i} href={`/agent/developers/${builder.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col items-center gap-4 shrink-0 group transition-transform hover:-translate-y-2">
                                    <div className="w-28 h-28 rounded-3xl border-2 border-[#D4AF37]/20 flex items-center justify-center bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden p-3 group-hover:border-[#D4AF37] group-hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)] transition-all duration-500 relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img src={builder.logo} className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" alt={builder.name} />
                                    </div>
                                    <span className="agent-tiny font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">{builder.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trending Projects */}
                <div className="mb-0 trending-projects-grid">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                        <div className="flex flex-col items-start gap-2">
                            <h2 className="title-reveal-large py-2 leading-tight overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                                Trending Projects <span className="gradent_text_color pr-2">in {selectedLocation}</span>
                            </h2>
                            <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">CURATED SELECTION OF TOP PERFORMING PROJECTS</p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden group/marquee">
                        <div
                            className="flex gap-8 pt-10 pb-12 animate-marquee-slow hover:pause"
                        >
                            {[...trendingProjects, ...trendingProjects].map((proj, i) => (
                                <Link
                                    key={i}
                                    href={`/agent/projects/${proj.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="min-w-[300px] md:min-w-[280px] lg:min-w-[320px] snap-start group bg-white rounded-[1.8rem] overflow-hidden border-2 border-slate-900/10 hover:border-primary hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 flex flex-col trending-project-card hover:-translate-y-2 relative"
                                >
                                    <div className="h-[180px] relative overflow-hidden">
                                        <img src={proj.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={proj.name} />
                                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg agent-tiny font-black text-slate-900 uppercase flex items-center gap-2 border-2 border-slate-900/5 shadow-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                            {proj.badge}
                                        </div>

                                        {/* Heart Icon */}
                                        <div className="absolute top-4 right-4 text-white drop-shadow-md z-10">
                                            <Heart size={20} className="opacity-90 hover:fill-white transition-all cursor-pointer" />
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col bg-white">
                                        <div className="mb-3">
                                            <h4 className="agent-h3 font-normal text-slate-900 mb-1 leading-tight tracking-wide group-hover:text-primary transition-colors line-clamp-1" style={{ fontFamily: "WastedVindey, serif" }}>{proj.name}</h4>
                                            <div className="h-[2px] w-12 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full"></div>
                                        </div>
                                        <div className="agent-h3 font-black text-slate-900 mb-2 font-roboto tracking-tight">{proj.price}</div>

                                        <div className="flex flex-col gap-0.5 mb-5">
                                            <div className="text-slate-600 agent-body font-bold tracking-tight leading-tight">{proj.loc}</div>
                                            <div className="text-slate-400 agent-body font-medium tracking-tight leading-tight">{proj.city}</div>
                                        </div>

                                        <button className="w-full py-2 bg-slate-900 text-white rounded-xl font-black agent-tiny uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-xl mt-auto">
                                            VIEW DETAILS
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Builder Floors Section */}
                <div className="mb-8 border-b border-slate-100 pb-4">
                    <h2 className="title-reveal-large py-2 mb-2 overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                        Builder Floors <span className="gradent_text_color pr-2">in {selectedLocation}</span>
                    </h2>
                    <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">Independent Living Redefined</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-3 items-start builder-floors-container">
                    <div className="flex-1">

                        <div className="flex flex-col gap-8">
                            {builderFloors.map((floor) => (
                                <div key={floor.id} className="bg-white rounded-lg border-1 border-slate-100 hover:border-[#D4AF37] transition-all duration-500 flex flex-col md:flex-row group shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.12)] overflow-hidden min-h-[188px] builder-floor-card relative">
                                    {/* <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#D4AF37]/15 via-[#D4AF37]/5 to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-[#D4AF37]/25"></div> */}

                                    <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                                        <div className="px-2.5 py-1.5 bg-white/90 backdrop-blur-md rounded-md agent-small font-black text-slate-900 uppercase flex items-center gap-1.5 border border-slate-200 shadow-xl">
                                            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div> Sponsored
                                        </div>
                                    </div>
                                    <div className="w-full md:w-[240px] h-[240px] md:h-auto relative shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-200 group/img cursor-pointer" onClick={() => openLightbox(floor.images, floorImageIndices[floor.id] || 0)}>
                                        <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${(floorImageIndices[floor.id] || 0) * 100}%)` }}>
                                            {floor.images.map((img, i) => (
                                                <img key={i} src={img} className="w-full h-full object-cover shrink-0" alt={floor.title} />
                                            ))}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-transparent opacity-100 transition-opacity"></div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 py-2 px-3 flex flex-col justify-between overflow-hidden">
                                        <div className=" border-slate-200 pb-1.5 mb-1.5">
                                            <div className="flex items-start md:items-center justify-between mb-0.5 gap-2">
                                                <Link href={`/agent/projects/${floor.id}`}>
                                                    <h3 className="agent-body font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors cursor-pointer leading-tight">{floor.title}</h3>
                                                </Link>
                                            </div>

                                            {/* Stats Grid - Fixed 6 Sections */}
                                            <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/30 mt-3 relative">
                                                <div className={`grid flex-1 grid-cols-3 transition-all duration-500`}>
                                                    {[
                                                        { icon: <Maximize2 size={20} />, label: 'Plot Area', value: floor.area },
                                                        { icon: <Info size={20} />, label: 'Status', value: floor.status },
                                                        { icon: <Layers size={20} />, label: 'Floor', value: floor.floor },
                                                        { icon: <Compass size={20} />, label: 'Facing', value: floor.facing },
                                                        { icon: <Eye size={20} />, label: 'Overlooking', value: floor.overlooking },
                                                        { icon: <Route size={20} />, label: 'Road', value: floor.road }
                                                    ].slice(0, expandedFloors.has(floor.id) ? 6 : 3).map((item, idx) => (
                                                        <div key={idx} className={`flex items-center justify-center gap-2 py-2 px-1 bg-white/50 hover:bg-white transition-colors border-r border-slate-200 last:border-r-0 md:last:border-r-0 even:border-r-0 md:even:border-r overflow-hidden min-w-0 ${idx > 2 ? 'border-t border-slate-200' : ''}`}>
                                                            <div className="text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
                                                                {React.cloneElement(item.icon, { size: 26 })}
                                                            </div>
                                                            <div className="flex flex-col items-start min-w-0 flex-1">
                                                                <span className="agent-tiny font-bold uppercase tracking-tight text-slate-400 leading-none mb-0.5 truncate w-full">{item.label}</span>
                                                                <span className="agent-meta font-black text-slate-900 leading-none tracking-tight truncate w-full">{item.value}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Expand Toggle Sidebar */}
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFloorExpansion(floor.id);
                                                    }}
                                                    className="w-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-l border-slate-200 group/expand"
                                                >
                                                    <div className={`${!expandedFloors.has(floor.id) ? 'animate-bounce-subtle' : ''}`}>
                                                        {expandedFloors.has(floor.id) ?
                                                            <ChevronUp size={16} className="text-primary" /> :
                                                            <ChevronDown size={16} className="text-primary" />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Prices Above Feedback Section */}
                                        <div className="mt-auto">
                                            <div className="grid grid-cols-4 gap-2 mb-2 pt-2">
                                                {Object.entries(floor.prices).map(([fName, fPrice], i) => (
                                                    <div key={i} className="bg-slate-50 rounded-xl py-1 px-1.5 border border-slate-200 group/price hover:bg-white transition-all text-center">
                                                        <p className="agent-tiny font-bold text-slate-400 uppercase tracking-widest mb-0.5">{fName}</p>
                                                        <p className="agent-meta font-black text-slate-900">{fPrice}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='border border-dashed border-slate-200 w-full mt-3 mb-3'></div>

                                            <div className="flex items-center flex-wrap gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={12} className="text-slate-400" />
                                                        <span className="agent-small font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Updated: {floor.updated}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
                                                        <button className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                                            <Bookmark size={18} />
                                                        </button>
                                                        <button className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                                            <Share2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex-1"></div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setIsCreditPopupOpen(true)}
                                                        className="cursor-pointer px-4 py-2 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl agent-small font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2 group"
                                                    >
                                                        <img src="/images/map.jpg" className="w-3.5 h-3.5 object-contain rounded-sm" alt="Map" /> View Map
                                                    </button>
                                                    <button
                                                        onClick={() => setIsCreditPopupOpen(true)}
                                                        className="cursor-pointer px-6 py-2 bg-slate-900 text-white rounded-xl agent-small font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2 shadow-xl shadow-slate-900/10"
                                                    >
                                                        <Phone size={14} /> Contact Agent
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-2 mt-16 pb-12">
                            <button className="cursor-pointer w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-900 transition-all">&lt;</button>
                            {[1, 2, 3, 4, '...', 100].map((page, i) => (
                                <button key={i} className={`cursor-pointer w-10 h-10 rounded-xl border flex items-center justify-center agent-small font-black transition-all ${page === 1 ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}>
                                    {page}
                                </button>
                            ))}
                            <button className="cursor-pointer w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-900 transition-all">&gt;</button>
                        </div>
                    </div>

                    {/* Sidebar Ad (Matched with New Projects) */}
                    <aside className="hidden lg:block w-[250px] sticky top-17 self-start shrink-0 pt-0">
                        <div className="relative group rounded-[0.5rem] overflow-hidden border-2 border-slate-100 shadow-2xl bg-slate-900 h-[calc(113vh-160px)]">
                            <img
                                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] opacity-60"
                                alt="Promo"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                                <div className="w-12 h-1 bg-primary mb-6"></div>
                                <h3 className="agent-h2 font-normal uppercase tracking-tight mb-4 leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>
                                    A lot can change with <br /> <span className="gradent_text_color">a change of address</span>
                                </h3>
                                <p className="agent-tiny font-medium opacity-80 uppercase tracking-[0.2em] mb-8 leading-relaxed">
                                    Share Your #PataBadloLifeBadlo story and WIN vouchers worth ₹5000
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Image Lightbox */}
            {lightbox.isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
                    <button onClick={closeLightbox} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[210]">
                        <X size={40} strokeWidth={1} />
                    </button>

                    <button
                        onClick={prevLightboxImage}
                        className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all z-[210] border border-white/10"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={nextLightboxImage}
                        className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all z-[210] border border-white/10"
                    >
                        <ChevronRight size={32} />
                    </button>

                    <div className="relative w-full h-full p-20 flex items-center justify-center">
                        <img
                            src={lightbox.images[lightbox.currentIndex]}
                            className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in duration-500"
                            alt="Gallery"
                        />

                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
                            <span className="text-white/40 agent-small font-black uppercase tracking-widest">Property Gallery</span>
                            <div className="h-1 w-20 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${((lightbox.currentIndex + 1) / lightbox.images.length) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-white agent-small font-black">{lightbox.currentIndex + 1} / {lightbox.images.length}</span>
                        </div>
                    </div>
                </div>
            )}

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

            {/* Fixed Bottom Search Pill - Always Visible */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[50] w-full max-w-[850px] px-4">
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
                            <div className="absolute border-2 border-slate-200 rounded-xl bottom-full mb-4 left-0 bg-white rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-slate-100 p-2 w-[220px] z-[110] animate-in fade-in slide-in-from-bottom-4 duration-300">
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
                    <div className="flex-1 px-6 border-2  rounded-xl mr-2    border-slate-300">
                        <div className="flex items-center gap-4">
                            <Search className="text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by Developer or Project name..."
                                className="w-full h-14 bg-transparent agent-small font-bold outline-none placeholder:text-slate-400 uppercase tracking-widest"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="px-10 h-14 bg-slate-900 text-white rounded-full font-black agent-small uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95">
                        <Search size={20} />
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { display: flex; animation: marquee 40s linear infinite; }
                .animate-marquee:hover { animation-play-state: paused; }
                .animate-marquee-slow { display: flex; animation: marquee 35s linear infinite; }
                .animate-marquee-slow:hover { animation-play-state: paused; }
                @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
                .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
            `}} />
        </div>
    );
}
