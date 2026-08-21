'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
    Search, ChevronDown, Bell, User, MapPin, Grid, List,
    Filter, Share2, Heart, ExternalLink, Calendar,
    Maximize2, Info, ArrowRight, Phone, MessageSquare,
    Compass, Home, Layers, Eye, Road, PlusCircle, ChevronRight, ChevronLeft,
    DollarSign, LayoutDashboard,
    ChevronUp
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReferFooter from '@/components/ReferFooter';

gsap.registerPlugin(ScrollTrigger);

export default function PropNetraAgentsPage() {
    const [currentView, setCurrentView] = useState('main'); // 'main' or 'catalogue'
    const [searchVal, setSearchVal] = useState('');
    const [activeSearchTab, setActiveSearchTab] = useState('All Posts');
    const [selectedLocation, setSelectedLocation] = useState('Gurgaon');
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef(null);
    const trendingRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useLayoutEffect(() => {
        // Small delay to ensure layout is fully rendered
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        const ctx = gsap.context(() => {
            // Hero content reveal
            gsap.fromTo(".hero-content-reveal",
                { x: -100, opacity: 0, scale: 0.95 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    clearProps: "all"
                }
            );

            // Search bar reveal
            gsap.fromTo(".search-bar-reveal",
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    delay: 0.6,
                    ease: "power4.out",
                    clearProps: "all"
                }
            );

            // Categories reveal
            gsap.fromTo(".category-card-reveal",
                { y: 40, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power2.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".categories-container",
                        start: "top 95%",
                    }
                }
            );

            // Builder marquee reveal
            gsap.fromTo(".developer-marquee-reveal",
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".developer-marquee-container",
                        start: "top 85%",
                    }
                }
            );

            // Property types reveal
            gsap.fromTo(".property-type-card",
                { y: 60, opacity: 0, scale: 0.8 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".property-types-container",
                        start: "top 95%",
                    }
                }
            );

            // Senior Living Banner reveal
            gsap.fromTo(".senior-living-reveal",
                { y: 100, opacity: 0, scale: 1 },
                {
                    y: 0,
                    opacity: 1,
                    skewY: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".title-reveal-large",
                        start: "top 95%",
                    }
                }
            );

            // Trending projects reveal
            gsap.fromTo(".trending-card-reveal",
                { y: 80, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power2.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".trending-grid-container",
                        start: "top 95%",
                    }
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
        }, containerRef);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    const categories = [
        {
            id: 'exclusive', title: 'PropNetra', subtitle: 'Exclusive', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            )
        },
        {
            id: 'developer', title: 'Developer', subtitle: 'Projects', link: '/agent/new-projects', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2" /><path d="M7 2v20M17 2v20M2 12h20M2 7h20M2 17h20" /></svg>
            )
        },
        {
            id: 'builder', title: 'Direct', subtitle: 'Builder Floors', link: '/agent/builder', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            )
        },
        {
            id: 'resale', title: 'Resale', subtitle: 'Channel Listings', link: '/agent/resale', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
            )
        },
        {
            id: 'requirements', title: 'Requirements', subtitle: 'By Channel', link: '/agent/requirements', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>
            )
        },
        {
            id: 'requirements', title: 'Rent', subtitle: 'By Channel', link: '/agent/rent', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
            )
        },
    ];

    const propertyTypes = [
        { name: 'Apartments', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400', count: '1,250+', startPrice: '₹45L' },
        { name: 'Builder Floors', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400', count: '850+', startPrice: '₹1.2Cr' },
        { name: 'Villas', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400', count: '320+', startPrice: '₹3.5Cr' },
        { name: 'Plots', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400', count: '450+', startPrice: '₹80L' },
        { name: 'Retail Shops', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400', count: '180+', startPrice: '₹1.5Cr' },
        { name: 'Pre Leased Offices', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400', count: '120+', startPrice: '₹2.8Cr' },
        { name: 'Rent', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400', count: '2,100+', startPrice: '₹25K' },
    ];

    const mandateDeals = [
        {
            id: 1,
            title: "2 BHK, Huda, Sector 57, Gurgaon",
            updatedOn: "25 March 2026",
            plotArea: "200 Sq. Yds.",
            status: "Ready to Move",
            floor: "1 out of 4",
            facing: "West",
            overlooking: "Park",
            road: "10 meter",
            img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
            prices: {
                "1st Floor": "1.47 Cr",
                "2nd Floor": "1.45 Cr",
                "3rd Floor": "1.45 Cr",
                "4th Floor": "1.55 Cr"
            },
            isPremium: true,
            type: "Mandate"
        },
        {
            id: 2,
            title: "3 BHK, Smartworld One DXP, Sector 113",
            updatedOn: "26 March 2026",
            plotArea: "250 Sq. Yds.",
            status: "Under Construction",
            floor: "12 out of 30",
            facing: "East",
            overlooking: "Pool",
            road: "60 meter",
            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
            prices: {
                "Typical": "2.85 Cr"
            },
            isPremium: true,
            type: "Mandate"
        },
        {
            id: 3,
            title: "4 BHK, M3M Crown, Sector 111",
            updatedOn: "27 March 2026",
            plotArea: "350 Sq. Yds.",
            status: "Ready to Move",
            floor: "5 out of 15",
            facing: "North-East",
            overlooking: "Greenery",
            road: "24 meter",
            img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
            prices: {
                "Standard": "4.12 Cr"
            },
            isPremium: true,
            type: "Mandate"
        },
        {
            id: 4,
            title: "3 BHK, Krisumi Waterfall Residences, Sector 36A",
            updatedOn: "28 March 2026",
            plotArea: "280 Sq. Yds.",
            status: "Ready to Move",
            floor: "8 out of 20",
            facing: "East",
            overlooking: "Aravalli",
            road: "18 meter",
            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
            prices: {
                "Premium": "3.45 Cr"
            },
            isPremium: true,
            type: "Mandate"
        }
    ];

    const banners = [
        {
            title: "LAMBORGHINI BRANDED RESIDENCES",
            subtitle: "3 BHK PREMIUM RESIDENCES AT SECTOR 71, SPR ROAD GURUGRAM. STARTING FROM ₹4.8 CR",
            tag: "Luxury Living",
            brand: "Signature Global x Lamborghini",
            img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000"
        },
        {
            title: "M3M CROWN SECTOR 113",
            subtitle: "Premium 3 & 4 BHK residences with world-class amenities and 5.5 acres of central greens.",
            tag: "Trending",
            brand: "M3M Crown",
            img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000"
        }
    ];

    React.useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused, banners.length]);

    // Trending Projects Auto-scroll
    React.useEffect(() => {
        const scrollContainer = trendingRef.current;
        if (!scrollContainer) return;

        let animationFrameId;
        let isHovered = false;

        const scroll = () => {
            if (!isHovered && scrollContainer) {
                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 1;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        const onMouseEnter = () => { isHovered = true; };
        const onMouseLeave = () => { isHovered = false; };

        scrollContainer.addEventListener('mouseenter', onMouseEnter);
        scrollContainer.addEventListener('mouseleave', onMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            scrollContainer.removeEventListener('mouseenter', onMouseEnter);
            scrollContainer.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    const builders = [
        { name: 'EMPERIUM', logo: '/dev/1.png' },
        { name: 'GANGA', logo: '/dev/2.png' },
        { name: 'KRISUMI', logo: '/dev/3.png' },
        { name: 'M3M', logo: '/dev/4.png' },
        { name: 'MAX ESTATES', logo: '/dev/5.png' },
        { name: 'ANANT RAJ', logo: '/dev/6.png' },
        { name: 'AARIZE', logo: '/dev/7.png' },
        { name: 'AURA', logo: '/dev/8.png' }
    ];

    const builderFloors = [
        {
            id: 1,
            title: "2 BHK Builder Floor, Huda, Sector 57, Gurgaon",
            updatedOn: "25 March 2026",
            plotArea: "200 Sq. Yds.",
            status: "Ready to Move",
            floor: "1 out of 4",
            facing: "West",
            overlooking: "Park",
            road: "10 meter",
            img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
            prices: {
                "1st Floor": "1.85 Cr",
                "2nd Floor": "1.75 Cr",
                "3rd Floor": "1.75 Cr",
                "4th Floor": "1.9 Cr"
            },
            isPremium: true
        },
        {
            id: 2,
            title: "3 BHK Builder Floor, Sushant Lok 1, Gurgaon",
            updatedOn: "28 March 2026",
            plotArea: "300 Sq. Yds.",
            status: "Under Construction",
            floor: "G out of 4",
            facing: "East",
            overlooking: "Main Road",
            road: "12 meter",
            img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
            prices: {
                "1st Floor": "2.85 Cr",
                "2nd Floor": "2.75 Cr",
                "3rd Floor": "2.75 Cr",
                "4th Floor": "3.1 Cr"
            },
            isPremium: true
        },
        {
            id: 3,
            title: "4 BHK Builder Floor, DLF Phase 2, Gurgaon",
            updatedOn: "29 March 2026",
            plotArea: "500 Sq. Yds.",
            status: "Ready to Move",
            floor: "2 out of 4",
            facing: "North",
            overlooking: "Garden",
            road: "18 meter",
            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
            prices: {
                "1st Floor": "5.85 Cr",
                "2nd Floor": "5.75 Cr",
                "3rd Floor": "5.75 Cr",
                "4th Floor": "6.2 Cr"
            },
            isPremium: true
        },
        {
            id: 4,
            title: "3 BHK Builder Floor, Sector 45, Gurgaon",
            updatedOn: "30 March 2026",
            plotArea: "250 Sq. Yds.",
            status: "Ready to Move",
            floor: "3 out of 4",
            facing: "South",
            overlooking: "Park",
            road: "10 meter",
            img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
            prices: {
                "1st Floor": "2.25 Cr",
                "2nd Floor": "2.15 Cr",
                "3rd Floor": "2.15 Cr",
                "4th Floor": "2.4 Cr"
            },
            isPremium: false
        }
    ];

    const developers = [
        { name: 'EMPERIUM', sector: 'Sector 88A', brand: '/dev/1.png' },
        { name: 'AARIZE', sector: 'Sector 49', brand: '/dev/7.png' },
        { name: 'AURA', sector: 'Sector 48', brand: '/dev/8.png' },
        { name: 'GANGA', sector: 'Sector 90', brand: '/dev/2.png' },
        { name: 'M3M', sector: 'Sector 113', brand: '/dev/4.png' },
        { name: 'KRISUMI', sector: 'Sector 36A', brand: '/dev/3.png' },
        { name: 'MAX ESTATES', sector: 'Sector 36A', brand: '/dev/5.png' },
        { name: 'ANANT RAJ', sector: 'Sector 63A', brand: '/dev/6.png' }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-white font-sans selection:bg-primary/10 overflow-x-hidden">
            {/* Common Hero Section */}
            <section className="relative h-[450px] md:h-[500px] lg:h-[60vh] xl:h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-slate-900">


                <div
                    className="flex h-full transition-transform duration-1000 ease-out"
                    style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                    {banners.map((banner, idx) => (
                        <div key={idx} className="min-w-full h-full relative">
                            <img
                                src={banner.img}
                                className={`w-full h-full object-cover transition-transform duration-[15s] ease-linear brightness-[0.65] ${idx === currentBanner ? 'scale-110' : 'scale-100'}`}
                                alt={banner.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80"></div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-start text-left p-12 md:p-24 text-white transition-all duration-1000 z-10 ${idx === currentBanner ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
                                <div className="max-w-3xl hero-content-reveal">
                                    <h1 className="agent-hero font-normal tracking-tight mb-8 max-w-4xl drop-shadow-2xl leading-[1.1]" style={{ fontFamily: "WastedVindey, serif" }}>
                                        {banner.title}
                                    </h1>
                                    <p className="agent-body text-white/60 font-light max-w-xl leading-loose border-l-2 border-primary/30 pl-6 uppercase tracking-[0.2em]">
                                        {banner.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Banner Controls */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
                    {banners.map((_, i) => (
                        <div key={i} onClick={() => setCurrentBanner(i)} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === currentBanner ? 'h-8 bg-primary' : 'bg-white/30'}`}></div>
                    ))}
                </div>
            </section>

            <div className="animate-in fade-in duration-700">
                {/* Simplified Search */}
                <div className="relative -mt-10 z-40 px-4 max-w-[1100px] mx-auto search-bar-reveal">
                    {/* Breadcrumbs Above Search Bar */}
                    {/* <nav className="flex items-center justify-center gap-3 text-[10px] font-light uppercase tracking-[0.3em] mb-6">
                            <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={12} className="text-white/20" />
                            <span className="text-white/90">Agent Portal</span>
                        </nav> */}
                    <div className="bg-white/95 backdrop-blur-3xl rounded-[2.2rem] p-3 flex flex-col md:flex-row items-center gap-4 border-2 border-slate-900/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
                        <div className="w-full md:w-60 relative group">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 group-hover:scale-110 transition-transform" size={18} />
                            <select
                                className="w-full h-14 pl-14 pr-6 bg-white rounded-xl agent-small font-black uppercase tracking-widest border-2 border-slate-900/10 focus:border-slate-900 outline-none appearance-none hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="Sector 37D">Sector 37D</option>
                                <option value="sector 66,Golf Course Extension road">sector 66,Golf Course Extension road</option>
                                <option value="Dwarka Expressway">Dwarka Exp.</option>
                                <option value="Sohna Road">Sohna Road</option>
                                <option value="MG Road">MG Road</option>
                                <option value="New Gurgaon">New Gurgaon</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-900">
                                <ChevronDown size={16} />
                            </div>
                        </div>

                        <div className="flex-1 w-full relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Type developer name to start search..."
                                className="w-full h-14 pl-14 pr-6 bg-white rounded-xl agent-small font-bold placeholder:text-slate-400 outline-none focus:border-slate-900 transition-all border-2 border-slate-900/10 shadow-sm"
                            />
                        </div>

                        <button className="w-full md:w-auto px-12 h-14 bg-slate-900 text-white rounded-xl font-black agent-small uppercase tracking-[0.3em] hover:bg-primary transition-all active:scale-95 shadow-xl">
                            SEARCH
                        </button>
                    </div>
                </div>

                {/* Coming Soon Projects (Developer Marquee) */}
                <section className="py-12 overflow-hidden developer-marquee-container">
                    <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-8 flex flex-col items-start gap-4">
                        <h2 className="title-reveal-large py-2 leading-tight overflow-hidden mr-[-20]" style={{ fontFamily: "WastedVindey, serif" }}>
                            <span className="inline-block">Coming Soon</span> <span className="gradent_text_color pr-2 inline-block">Projects</span>
                        </h2>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">Top Developer Launches</p>
                    </div>
                    <div className="w-[95%] mx-auto overflow-hidden relative">
                        <div className="flex gap-8 animate-marquee developer-marquee-reveal w-max">
                            {[...developers, ...developers, ...developers].map((dev, i) => (
                                <Link key={i} href={`/agent/developers/${dev.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col items-center gap-4 shrink-0 group cursor-pointer">
                                    <div className="w-24 h-26 rounded-full border-2 border-slate-900/5 flex items-center justify-center bg-white group-hover:border-primary transition-all p-2 shadow-sm group-hover:shadow-xl group-hover:-translate-y-0">
                                        <img src={dev.brand} className="w-full h-full object-contain transition-all" alt={dev.name} />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="agent-small font-black text-slate-900 uppercase tracking-widest font-roboto opacity-40 group-hover:opacity-100 transition-opacity">{dev.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
                            .animate-marquee { display: flex; animation: marquee 30s linear infinite; }
                            .animate-marquee:hover { animation-play-state: paused; }
                            .category-gradient-border {
                                border: 1px solid transparent;
                                background: linear-gradient(white, white) padding-box,
                                            linear-gradient(to bottom right, rgba(255, 138, 0, 0.3), rgba(255, 90, 0, 0.3)) border-box;
                            }
                            .category-gradient-border:hover {
                                background: linear-gradient(white, white) padding-box,
                                            linear-gradient(to bottom right, #FF8A00, #FF5A00) border-box;
                            }
                        `}} />
                </section>

                <section className="py-2 px-4 md:px-8 max-w-[1600px] mx-auto categories-container">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
                        {categories.map((cat, idx) => (
                            <Link
                                href={cat.link || '#'}
                                key={cat.id}
                                className="p-5 md:p-6 bg-white rounded-[1.8rem] md:rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] cursor-pointer transition-all hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] hover:-translate-y-2 group relative overflow-hidden flex flex-col items-start gap-3 category-card-reveal category-gradient-border"
                            >
                                <div className="absolute top-0 right-0 p-3 transition-all duration-500 translate-x-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white transition-all duration-700 shadow-inner mb-1">
                                    {React.cloneElement(cat.icon, { size: 28 })}
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="agent-h3 font-normal gradent_text_color transition-colors tracking-widest" style={{ fontFamily: "WastedVindey, serif" }}>{cat.title}</h4>
                                    <p className="agent-tiny font-light text-slate-600 uppercase tracking-[0.2em] leading-tight transition-colors font-roboto">{cat.subtitle}</p>
                                </div>
                                <div className="w-full mt-auto flex items-center justify-between pt-3">
                                    <div className="flex items-center gap-2 group/btn">
                                        <span className="agent-tiny font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Explore</span>
                                        <ArrowRight size={12} className="text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
                                    </div>
                                    <span className="agent-h1 font-black text-slate-100 transition-all font-roboto group-hover:text-primary/10 select-none">{idx + 1}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Trending Projects in Gurugram */}
                <section className="px-4 pt-10 md:px-8 pt-5 relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" className="w-full h-full object-cover" alt="Background" />
                    </div>
                    <div className="max-w-[1600px] mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-8">
                            <div className="flex flex-col items-start gap-4">
                                <h2 className="title-reveal-large py-2 overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                                    <span className="inline-block text-slate-900">Trending Projects</span> <span className="gradent_text_color pr-2 inline-block">in {selectedLocation}</span>
                                </h2>
                                <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">CURATED SELECTION OF TOP PERFORMING PROJECTS</p>
                            </div>

                        </div>
                        <div ref={trendingRef} className="flex overflow-x-auto gap-6 pb-12 no-scrollbar trending-grid-container">
                            {[
                                { id: 1, name: 'MVN Aero One', price: '₹19.6 - 42.1 Cr', loc: 'Sector 37D, Dwarka Exp.', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600', badge: 'EXCLUSIVE' },
                                { id: 2, name: 'Oberoi Sixty North', price: '₹23.1 - 35.7 Cr', loc: 'Sector 66, Golf Course Extn Road', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600', badge: 'NEW LAUNCH' },
                                { id: 3, name: 'SmartWorld Saab', price: '₹1.81 - 11.05 Cr', loc: 'Noida Express Highway', city: 'Noida, Uttar Pradesh', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600', badge: 'BEST SELLER' },
                                { id: 4, name: 'Whiteland Westin', price: '₹6.68 - 11.25 Cr', loc: 'Sector 103, Near Airport', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600', badge: 'READY TO MOVE' },
                                { id: 5, name: 'M3M Altitude', price: '₹5.5 - 9.8 Cr', loc: 'Sector 66, Golf Course Extn Road', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600', badge: 'LIMITED EDITION' },
                                { id: 6, name: 'Ganga Nandaka', price: '₹3.4 - 7.2 Cr', loc: 'Sector 84, NH-8', city: 'Gurugram, Haryana', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600', badge: 'TOP RATED' }
                            ].map((proj, i) => (
                                <Link href={`/agent/projects/${proj?.name}`} key={`trending${proj?.id}`} className="min-w-[300px] md:min-w-[280px] lg:min-w-[320px] snap-start group bg-white rounded-[1.8rem] overflow-hidden border-2 border-slate-900/10 hover:border-primary hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 flex flex-col trending-card-reveal">
                                    <div className="h-[180px] relative overflow-hidden">
                                        <img src={proj.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={proj.name} />
                                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg agent-tiny font-black text-slate-900 uppercase flex items-center gap-2 border-2 border-slate-900/5 shadow-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                            {proj.badge}
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="mb-3">
                                            <h4 className="agent-h3 font-normal text-slate-900 mb-1 leading-tight tracking-wide group-hover:text-primary transition-colors line-clamp-1" style={{ fontFamily: "WastedVindey, serif" }}>{proj.name}</h4>
                                            <div className="h-[2px] w-12 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full"></div>
                                        </div>
                                        <div className="agent-h3 font-black text-slate-900 mb-2 font-roboto tracking-tight">{proj.price}</div>

                                        <div className="flex flex-col gap-0.5 mb-5">
                                            <div className="text-slate-600 agent-meta font-bold tracking-tight leading-tight">{proj.loc}</div>
                                            <div className="text-slate-400 agent-meta font-medium tracking-tight leading-tight">{proj.city}</div>
                                        </div>

                                        <button className="w-full py-2 bg-slate-900 text-white rounded-xl font-black agent-tiny uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-xl mt-auto">
                                            VIEW DETAILS
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                                .no-scrollbar::-webkit-scrollbar { display: none; }
                                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                            `}} />
                    </div>
                </section>


                {/* Resale Channel Property Listings (7 Icons) */}
                <section className="py-0 pb-13 relative overflow-hidden bg-slate-50/50">
                    <div className="absolute inset-0 z-0 opacity-[0.03]">
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" className="w-full h-full object-cover" alt="Background" />
                    </div>
                    <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 property-types-container">
                        <div className="flex flex-col items-start gap-4 mb-6">
                            <h2 className="title-reveal-large py-2 overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                                <span className="inline-block">Explore</span> <span className="gradent_text_color pr-2 inline-block">Property Types</span>
                            </h2>
                            <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">Resale Channel Property Listings</p>
                        </div>
                        <div className="flex w-full h-[280px] gap-0 overflow-hidden rounded-[2.5rem] border-2 border-slate-900/10 shadow-2xl">
                            {propertyTypes.map((type, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedImage({ url: type.img, title: type.name })}
                                    className="flex-1 hover:flex-[1.5] relative h-full group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border-r border-white/10 last:border-r-0"
                                >
                                    <img
                                        src={type.img}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                        alt={type.name}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                                    <div className="absolute inset-0 p-4 flex flex-col justify-end pointer-events-none">
                                        {/* Centered Label - Adaptive Sizing */}
                                        <div className="flex flex-col items-center transition-all duration-500 group-hover:translate-y-[-40px]">
                                            <span className="agent-small group-hover:agent-small font-light text-white uppercase tracking-[0.2em] text-center whitespace-nowrap drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] px-1">
                                                {type.name}
                                            </span>
                                        </div>

                                        {/* Lower Side Text (Inventories) */}
                                        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center transition-all duration-700 opacity-0 group-hover:opacity-100">
                                            <span className="agent-meta font-medium text-primary uppercase tracking-[0.15em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                                {type.count} INVENTORIES
                                            </span>
                                            {/* <button className="mt-6 px-5 py-1.5 bg-white text-slate-900 rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl pointer-events-auto">
                                                    EXPLORE MORE
                                                </button> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Senior Living Banner Ad */}
                <section className="relative pt-0 md:pt-0 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] senior-living-reveal overflow-hidden">
                    <div className="relative group shadow-2xl">
                        <div className="h-[180px] md:h-[220px] lg:h-[240px] relative">
                            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[3000ms]" alt="Max Antara" />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12 lg:px-20">
                                <div className="flex flex-col justify-center text-left max-w-xl">
                                    <h3 className="agent-h2 font-light text-white mb-1 tracking-widest font-roboto uppercase">MAX ANTARA SENIOR LIVING</h3>
                                    <p className="agent-body font-thin text-white/70 mb-2 font-roboto tracking-[0.2em]">Antara Pillars of Wellness</p>
                                    <button className="inline-block self-start px-10 py-3 bg-gradient-to-r from-primary to-orange-600 text-white rounded-full agent-meta font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all font-roboto">
                                        Explore Residences
                                    </button>
                                </div>

                                <div className="hidden md:flex flex-col items-end text-right">
                                    <div className="mb-4">
                                        <span className="agent-small font-black text-white/40 uppercase tracking-[0.3em] block mb-1">Location</span>
                                        <span className="agent-h3 font-light text-white tracking-widest font-roboto uppercase">Sector 150, Noida</span>
                                    </div>
                                    <div>
                                        <span className="agent-small font-black text-white/40 uppercase tracking-[0.3em] block mb-1">Pricing</span>
                                        <span className="agent-h3 font-light text-white tracking-widest font-roboto uppercase">Starts at ₹2.5 Cr*</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Everything You Need for Your Home Section */}
                <section className="py-6 pb-10 pt-8 px-4 md:px-8 max-w-[1600px] mx-auto home-services-reveal">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                        <div className="flex flex-col items-start gap-4">
                            <h2 className="title-reveal-large py-2 overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                                <span className="inline-block text-slate-900">Everything You Need</span> <span className="gradent_text_color pr-2 inline-block">for Your Home</span>
                            </h2>
                            <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">Premium Ecosystem of Services</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-10 cursor-pointer hover:scale-105 transition-transform" alt="Play Store" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-10 cursor-pointer hover:scale-105 transition-transform" alt="App Store" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[380px] lg:min-h-[480px]">
                        {/* Left: Interior Card */}
                        <div className="lg:col-span-7 relative group rounded-[2.5rem] overflow-hidden border-2 border-slate-100 shadow-2xl bg-slate-900">
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] opacity-80"
                                alt="Interior Design"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-slate-900/60"></div>

                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center items-end text-right z-10">
                                <div className="w-16 md:w-20 h-1 bg-gradient-to-l from-primary to-transparent mb-4 md:mb-5"></div>
                                <h3 className="agent-hero font-normal text-white mb-2 md:mb-3 leading-tight drop-shadow-2xl" style={{ fontFamily: "WastedVindey, serif" }}>
                                    Exquisite <br /> <span className="gradent_text_color">Interior Design</span>
                                </h3>
                                <p className="agent-body text-white/90 max-w-sm leading-relaxed mb-6 drop-shadow-lg" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>
                                    Transform your space with PropNetra's curated panel of luxury designers and bespoke furniture solutions.
                                </p>
                                <Link href="/agent/interiors" className="px-8 py-3.5 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl agent-tiny font-black uppercase tracking-widest hover:scale-105 hover:shadow-primary/20 transition-all shadow-2xl inline-block text-center">
                                    Explore More
                                </Link>
                            </div>
                        </div>

                        {/* Right Stack */}
                        <div className="lg:col-span-5 flex flex-col gap-3">
                            {/* Top: Home Loans */}
                            <div className="flex-1 relative group rounded-[2.5rem] overflow-hidden border-2 border-slate-100 shadow-xl bg-slate-50 p-6 md:p-7 flex flex-col justify-between cursor-pointer" onClick={() => window.location.href = '/agent/loans'}>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-primary">
                                            <DollarSign size={16} />
                                        </div>
                                        <span className="agent-small font-black text-slate-400 uppercase tracking-widest">Financial Services</span>
                                    </div>
                                    <h3 className="agent-h2 font-normal text-slate-900 mb-1 leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>
                                        Seamless <span className="gradent_text_color">Home Loans</span>
                                    </h3>
                                    <p className="agent-meta font-normal text-slate-500 max-w-xs font-roboto leading-relaxed">
                                        Access the best interest rates from 40+ banking partners with PropNetra's dedicated advisors.
                                    </p>
                                </div>
                                <div className="flex items-end justify-between">
                                    <button className="agent-tiny font-black text-slate-900 uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-all">
                                        Check Eligibility
                                    </button>
                                    <div className="w-14 h-14 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" stroke="currentColor" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Property Management */}
                            <div className="flex-1 relative group rounded-[2.5rem] overflow-hidden border-2 border-slate-900 bg-slate-900 p-6 md:p-7 flex flex-col justify-between shadow-2xl">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                                            <LayoutDashboard size={16} />
                                        </div>
                                        <span className="agent-small font-black text-white/40 uppercase tracking-widest">Asset Management</span>
                                    </div>
                                    <h3 className="agent-h2 font-normal text-white mb-1 leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>
                                        Hassle-Free <span className="gradent_text_color">Property Mgmt</span>
                                    </h3>
                                    <p className="agent-body font-normal text-white/60 max-w-xs font-roboto leading-relaxed">
                                        From tenant onboarding to maintenance, let PropNetra manage your investment.
                                    </p>
                                </div>
                                <div className="flex items-end justify-between">
                                    <button className="agent-tiny font-black text-white uppercase tracking-widest border-b-2 border-white/20 pb-1 hover:border-primary transition-all">
                                        Explore Services
                                    </button>
                                    <div className="w-14 h-14 opacity-10 group-hover:opacity-30 transition-opacity">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Refer & Earn Section - Full Width Banner (Edge to Edge) */}
                <ReferFooter />
                {/* Fullscreen Image Preview Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl animate-fade-in"></div>

                        {/* Close Button */}
                        <button
                            className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-20 group"
                            onClick={() => setSelectedImage(null)}
                        >
                            <div className="relative w-6 h-6">
                                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current rotate-45 transition-transform group-hover:scale-110"></span>
                                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current -rotate-45 transition-transform group-hover:scale-110"></span>
                            </div>
                        </button>

                        <div
                            className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center gap-8 animate-zoom-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10">
                                <img
                                    src={selectedImage.url}
                                    className="w-full h-full object-cover"
                                    alt={selectedImage.title}
                                />
                                <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent">
                                    <h3 className="agent-hero font-normal text-white mb-2" style={{ fontFamily: "WastedVindey, serif" }}>{selectedImage.title}</h3>
                                    <p className="agent-small group-hover:agent-small font-light text-white/50 uppercase tracking-[0.4em] font-roboto">PropNetra Premium Asset Showcase</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoom-in {
                    from { transform: scale(1); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.4s ease-out; }
                .animate-zoom-in { animation: zoom-in 0.4s cubic-bezier(1); }
            `}</style>

            </div>
        </div>
    );
}
