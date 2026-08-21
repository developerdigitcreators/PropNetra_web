'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Download, ExternalLink, MapPin, ChevronRight, Search, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReferFooter from '@/components/ReferFooter';

gsap.registerPlugin(ScrollTrigger);

export default function DeveloperDetailPage() {
    const [developer] = useState({
        name: 'M3M',
        logo: '/dev/4.png',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget Suspendisse sit amet urna ullamcorper, lobortis nibh sit amet, conse consectetur adipiscing elit. Nulla vestibulum felis eget viverra rhoncu tempus sit amet nisi a, feugiat interdum leo. Sed dictum, sapien eu cor sem ornare, accumsan enim commodo, eleifend mauris. Morbi mauri scelerisque maximus.',
        stats: [
            { label: 'Years of Experience', value: '18+' },
            { label: 'Total Projects', value: '10+' },
            { label: 'Total Cities', value: '12+' }
        ]
    });
    const containerRef = useRef(null);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedType, setSelectedType] = useState('Select Type');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedArea, setSelectedArea] = useState("Select Area");
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showAreaDropdown, setShowAreaDropdown] = useState(false);

    const categories = ["Residential", "Commercial"];
    const propertyTypes = ["Apartment", "Builder Floor", "Plots", "Retail", "SCO", "Serviced Apartments"];
    const areas = ["Sector 88A", "Sector 102", "Golf Course Ext", "Sohna Road", "New Gurgaon"];

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowSearch(true);
            } else {
                setShowSearch(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Small delay to ensure layout is fully rendered
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        const ctx = gsap.context(() => {
            // Hero section reveal
            gsap.fromTo(".hero-card-reveal",
                { y: 80, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    clearProps: "all"
                }
            );

            // Floating Search reveal
            gsap.to(".floating-search-bar", {
                y: showSearch ? 0 : 100,
                opacity: showSearch ? 1 : 0,
                duration: 0.5,
                ease: "power3.out"
            });

            // Section title reveal
            gsap.fromTo(".developer-projects-title",
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    clearProps: "opacity,transform,scaleX",
                    scrollTrigger: {
                        trigger: ".developer-projects-title",
                        start: "top 90%",
                    }
                }
            );

            // Project cards reveal
            gsap.fromTo(".dev-project-card",
                { y: 100, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power4.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".dev-projects-grid",
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

    const projects = Array(9).fill({
        name: 'GODREJ RIVER ROYALE',
        loc: 'Pune, Maharashtra',
        bhk: '3 & 4 BHK',
        size: 'Sizes - 1688 Sq. Ft. Onwards',
        price: 'Starts @ 2.85 Cr* Onwards',
        img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000'
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-50 font-sans">
            <main className="max-w-[100%] mx-auto pt-0 pb-12">
                {/* ===== FULL-WIDTH SPLIT HERO SECTION ===== */}
                <div className="bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] mb-8 hero-card-reveal border-2 border-slate-200 overflow-hidden mx-4 md:mx-0">
                    <div className="flex flex-col lg:flex-row min-h-[600px]">

                        {/* LEFT: DIRECT IMAGE */}
                        <div className="w-full lg:w-1/2 relative group">
                            <img
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000"
                                className="w-full h-full object-cover"
                                alt="Developer Feature"
                            />
                            {/* Integrated Breadcrumbs */}
                            <nav className="absolute bottom-8 left-8 flex items-center gap-2 agent-small font-bold uppercase tracking-widest text-white/90 bg-black/20 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 z-20">
                                <Link href="/agent" className="hover:text-primary transition-colors">Agent</Link>
                                <ChevronRight size={10} className="text-white/40" />
                                <span className="text-white/40">Developers</span>
                                <ChevronRight size={10} className="text-white/40" />
                                <span className="text-primary">{developer.name}</span>
                            </nav>
                        </div>

                        <div className="w-full lg:w-1/2 bg-white p-10 lg:p-16 flex flex-col pt-[500px] relative">
                            {/* Floating Logo - Lowered to clear navbar */}
                            <div className="absolute top-25 left-1/2 -translate-x-1/2 bg-white px-10 py-5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 z-10">
                                <img src={developer.logo} className="h-8 object-contain" alt="Developer Logo" />
                            </div>

                            <div className="mt-32">
                                <p className="text-slate-500 agent-body leading-relaxed mb-10 font-medium">
                                    {developer.desc}
                                </p>

                                {/* Counting Numbers Section */}
                                <div className="relative">
                                    <div className="space-y-4">
                                        {developer.stats.map((stat, idx) => (
                                            <div key={idx} className="flex items-center group">
                                                <div className="min-w-[100px]">
                                                    <span className="agent-h2 font-black text-[#f3af02] leading-none tracking-tighter">
                                                        {stat.value}
                                                    </span>
                                                </div>
                                                <span className="agent-body font-black text-slate-900 tracking-tight">
                                                    {stat.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Download Button - Positioned to the right of stats */}
                                    <div className="mt-8 lg:mt-0 lg:absolute lg:bottom-0 lg:right-0">
                                        <button className="flex items-center gap-3 px-10 py-4 bg-[#f3af02] text-white rounded-lg font-black agent-small uppercase tracking-widest shadow-xl shadow-[#f3af02]/20 hover:bg-[#d69b02] transition-all active:scale-95 group">
                                            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                                            <span>Download Brochure</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Search Bar (Appears on scroll) */}
                <div
                    className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[650px] px-4 transition-all duration-700 ease-out ${showSearch ? 'translate-y-0 opacity-100 visible' : 'translate-y-20 opacity-0 invisible'
                        }`}
                >
                    <div className="bg-white rounded-full flex items-center p-1 border border-slate-200 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)]">
                        {/* Area Selector */}
                        <div className="relative">
                            <div
                                onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                                className="hidden md:flex items-center gap-3 px-6 border-r border-slate-100 cursor-pointer group h-full"
                            >
                                <span className="agent-small font-bold text-slate-700 group-hover:text-primary transition-colors whitespace-nowrap">
                                    {selectedArea}
                                </span>
                                <ChevronDown size={14} className={`text-slate-400 group-hover:text-primary transition-transform ${showAreaDropdown ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Dropdown Menu */}
                            {showAreaDropdown && (
                                <div className="absolute bottom-full mb-4 left-0 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-slate-100 p-2 w-[180px] z-[110] animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    {areas.map((area) => (
                                        <div
                                            key={area}
                                            onClick={() => {
                                                setSelectedArea(area);
                                                setShowAreaDropdown(false);
                                            }}
                                            className="px-4 py-2.5 rounded-xl agent-small font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all cursor-pointer"
                                        >
                                            {area}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Input */}
                        <div className="flex-1 px-4">
                            <input
                                type="text"
                                placeholder="Type Developer name to start search"
                                className="w-full h-10 bg-transparent agent-small font-medium outline-none placeholder:text-slate-400"
                            />
                        </div>

                        {/* Yellow Search Button - Thinner */}
                        <button className="w-11 h-11 bg-[#f3af02] text-slate-900 rounded-full flex items-center justify-center hover:bg-[#d69b02] transition-all shadow-md active:scale-95">
                            <Search size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Developer Projects Section with Sidebar Banner */}
                <div className="w-[95%] mx-auto mb-12 dev-projects-grid">
                    {/* Consolidated Filter Bar */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        {/* Filter Label */}
                        <div className="px-6 py-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Filter By:</span>
                        </div>

                        {/* All Action */}
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setSelectedType('Select Type');
                                setSelectedStatus('All');
                            }}
                            className={`px-10 py-3 rounded-full agent-small font-black uppercase tracking-widest transition-all duration-300 border ${selectedCategory === 'All' && selectedStatus === 'All'
                                ? 'bg-gradient-to-r from-[#FF8A00] to-[#E63E00] text-white border-transparent shadow-lg shadow-orange-500/20'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
                                }`}
                        >
                            All
                        </button>

                        {/* Category Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowCategoryDropdown(!showCategoryDropdown);
                                    setShowTypeDropdown(false);
                                }}
                                className={`px-8 py-3 bg-white border border-slate-200 rounded-full flex items-center gap-3 group hover:border-primary transition-all shadow-sm ${selectedCategory !== 'All' ? 'border-primary' : ''}`}
                            >
                                <span className="agent-small font-black text-slate-900 uppercase tracking-widest">
                                    {selectedCategory === 'All' ? 'Select Category' : selectedCategory}
                                </span>
                                <ChevronDown size={14} className={`text-slate-400 group-hover:text-primary transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showCategoryDropdown && (
                                <div className="absolute top-full mt-3 left-0 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-100 p-2 w-[220px] z-[50] animate-in fade-in slide-in-from-top-2 duration-300">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setShowCategoryDropdown(false);
                                            }}
                                            className="px-5 py-3 rounded-xl agent-small font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all cursor-pointer uppercase tracking-widest"
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Type Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowTypeDropdown(!showTypeDropdown);
                                    setShowCategoryDropdown(false);
                                }}
                                className={`px-8 py-3 bg-white border border-slate-200 rounded-full flex items-center gap-3 group hover:border-primary transition-all shadow-sm ${selectedType !== 'Select Type' ? 'border-primary' : ''}`}
                            >
                                <span className="agent-small font-black text-slate-900 uppercase tracking-widest">
                                    {selectedType}
                                </span>
                                <ChevronDown size={14} className={`text-slate-400 group-hover:text-primary transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showTypeDropdown && (
                                <div className="absolute top-full mt-3 left-0 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-100 p-2 w-[240px] z-[50] animate-in fade-in slide-in-from-top-2 duration-300">
                                    {propertyTypes.map((type) => (
                                        <div
                                            key={type}
                                            onClick={() => {
                                                setSelectedType(type);
                                                setShowTypeDropdown(false);
                                            }}
                                            className="px-5 py-3 rounded-xl agent-small font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all cursor-pointer uppercase tracking-widest"
                                        >
                                            {type}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Status Pills */}
                        {['New Launch', 'Ready to Move', 'Under Construction'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status === selectedStatus ? 'All' : status)}
                                className={`px-8 py-3 rounded-full agent-small font-black uppercase tracking-widest transition-all duration-300 border ${selectedStatus === status
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="w-full py-4 bg-slate-900 border border-slate-800 rounded-xl text-center mb-8 developer-projects-title">
                        <h2 className="agent-h3 font-black text-white uppercase tracking-[0.2em] shadow-sm">{developer.name} DEVELOPER PROJECTS</h2>
                    </div>
                    <div className="flex flex-col 2xl:flex-row gap-6 items-start">
                        {/* LEFT: PROJECT GRID - 3 Cards per row */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((proj, i) => (
                                <div key={i} className="group relative aspect-[3/3.8] rounded-[1.5rem] overflow-hidden shadow-xl bg-slate-900 border border-white/10 transition-all duration-700 dev-project-card hover:-translate-y-2 hover:shadow-primary/20">
                                    <img src={proj.img} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-125 group-hover:opacity-40 transition-all duration-[2s]" alt={proj.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80"></div>

                                    <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center text-white pb-24 group-hover:pb-28 transition-all duration-500">
                                        <div className="w-8 h-px bg-gradient-to-r from-[#FF8A00] via-[#FF5A00] to-[#E63E00] mb-4 origin-center transition-transform duration-500"></div>
                                        <h4 className="agent-h2 font-normal text-white mb-1 uppercase tracking-tighter leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>{proj.name}</h4>
                                        <p className="agent-tiny font-black text-white/50 uppercase tracking-[0.3em] mb-4">{proj.loc}</p>

                                        <div className="flex flex-col gap-2 items-center transition-all duration-500">
                                            <div className="flex items-center gap-3">
                                                <span className="agent-small font-black uppercase tracking-widest text-white/90 bg-white/10 px-2 py-2 rounded-md backdrop-blur-md border border-white/10">{proj.bhk}</span>
                                                <div className='flex flex-col'>
                                                    <span className="agent-small font-black gradent_text_color text-start">{proj.price}</span>
                                                    <span className="agent-small font-black gradent_text_color text-start">{proj.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
                                        <Link href={`/agent/projects/${proj.name.toLowerCase().replace(/\s+/g, '-')}`} className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-black agent-tiny uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-2">
                                            EXPLORE <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT: VERTICAL AD BANNER (CLEAR IMAGE) */}
                        <aside className="w-full 2xl:w-[320px] sticky top-20">
                            <div className=" bg-slate-200 shadow-2xl relative overflow-hidden group h-[600px] border border-slate-200">
                                {/* Background Image - Clear & Tall */}
                                <img
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000"
                                    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-[3s]"
                                    alt="Luxury Architecture"
                                />

                                {/* Subtle Inner Glow to maintain premium feel */}
                                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none"></div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <ReferFooter />
        </div>
    );
}
