'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Download, Users, Share2, Phone, X, MapPin,
    Coffee, Zap, ArrowUpCircle, Dumbbell, Wind, Shield,
    Home, Baby, TreePalm, FileText, ChevronRight, ArrowRight, Star, Maximize2,
    ChevronLeft, ZoomIn, Eye, GraduationCap, Train, Hospital, Globe, ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
    const [activeTab, setActiveTab] = useState('1BHK');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [activeLocationTab, setActiveLocationTab] = useState('Education');
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    const projectName = "M3M Residencies By Elie Saab";

    const projectFaqs = [
        { q: "What is the construction status of the project?", a: "The project is currently under construction with a projected possession date of December 2026. Major structural work is complete and interior finishing for Phase 1 has commenced." },
        { q: "What are the configuration options available?", a: "We offer luxury 3BHK, 4BHK, and exclusive Penthouse configurations, each designed with double-height ceilings, private elevator lobbies, and expansive wraparound balconies." },
        { q: "Is the project RERA registered?", a: "Yes, the project is fully compliant and RERA registered under number RC/REP/HARERA/GGM/1054/786/2026/28. All project documentation is available for verification." },
        { q: "What amenities are included in the clubhouse?", a: "The 75,000 sq. ft. clubhouse includes a temperature-controlled infinity pool, private theater, state-of-the-art gym, luxury spa, and a multi-cuisine fine dining restaurant." }
    ];

    const locationData = {
        'Education': [
            { name: 'GD Goenka Public School', time: '05 Mins' },
            { name: 'Delhi Public School', time: '08 Mins' },
            { name: 'St. Xaviers High School', time: '12 Mins' },
            { name: 'Amity University', time: '15 Mins' }
        ],
        'Transport': [
            { name: 'IGI Airport', time: '25 Mins' },
            { name: 'Huda City Metro', time: '15 Mins' },
            { name: 'Dwarka Expressway', time: '02 Mins' }
        ],
        'Hospital': [
            { name: 'Medanta Medicity', time: '15 Mins' },
            { name: 'Artemis Hospital', time: '12 Mins' },
            { name: 'Fortis Hospital', time: '18 Mins' }
        ],
        'Connectivity': [
            { name: 'Cyber City', time: '20 Mins' },
            { name: 'Golf Course Road', time: '15 Mins' },
            { name: 'Ambience Mall', time: '18 Mins' }
        ]
    };

    const floorPlansData = {
        '1BHK': {
            images: [
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200",
                "https://images.unsplash.com/photo-1580587767526-cf3671a1768a?q=80&w=1200",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200"
            ],
            specs: { beds: '1 + Utility', price: '₹ 2.5 Cr*', area: '1200 Sq. Ft' }
        },
        '2BHK': {
            images: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200"
            ],
            specs: { beds: '2 + Utility', price: '₹ 4.2 Cr*', area: '1800 Sq. Ft' }
        },
        '3BHK': {
            images: [
                "https://images.unsplash.com/photo-1600607687940-c52af0a4372c?q=80&w=1200",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200"
            ],
            specs: { beds: '3 + Utility', price: '₹ 8.5 Cr*', area: '2800 Sq. Ft' }
        },
        '4BHK': {
            images: [
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
                "https://images.unsplash.com/photo-1600607687940-c52af0a4372c?q=80&w=1200"
            ],
            specs: { beds: '4 + Utility', price: '₹ 17.22 Cr*', area: '4055 Sq. Ft' }
        }
    };

    const containerRef = React.useRef(null);
    const modalRef = React.useRef(null);
    const overlayRef = React.useRef(null);

    // Lightbox Animation Logic
    React.useEffect(() => {
        if (isLightboxOpen && modalRef.current) {
            const tl = gsap.timeline();
            gsap.set(overlayRef.current, { opacity: 0 });
            gsap.set(modalRef.current, {
                rotateX: 90,
                rotateY: 20,
                z: -500,
                opacity: 0,
                transformOrigin: "center center -150px"
            });

            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            })
                .to(modalRef.current, {
                    rotateX: 0,
                    rotateY: 0,
                    z: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'expo.out'
                }, '-=0.4');
        }
    }, [isLightboxOpen]);

    const closeLightbox = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsLightboxOpen(false);
                setCurrentImgIndex(0);
            }
        });

        tl.to(modalRef.current, {
            rotateX: -90,
            rotateY: -20,
            z: -500,
            opacity: 0,
            duration: 0.8,
            ease: 'expo.in'
        })
            .to(overlayRef.current, {
                opacity: 0,
                duration: 0.5
            }, '-=0.5');
    };

    React.useLayoutEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        const ctx = gsap.context(() => {
            // Hero info reveal
            gsap.fromTo(".hero-info-reveal",
                { x: -100, opacity: 0, scale: 0.9 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    clearProps: "all"
                }
            );

            // Section reveals
            gsap.fromTo("section",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: "main",
                        start: "top 80%",
                    }
                }
            );

            // Stats grid reveal
            gsap.fromTo(".stat-card",
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: ".stats-grid-reveal",
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

    const stats = [
        { label: 'Category', value: 'Apartment' },
        { label: 'Unit Types', value: '4 BHK' },
        { label: 'Super Area', value: 'Starting 4205 Sq. Ft' },
        { label: 'Status', value: 'Under Construction' },
        { label: 'Land Area (Acres)', value: '2.75' },
        { label: 'Total Units', value: '336' },
        { label: 'Launched on', value: 'Oct, 2029' },
        { label: 'Possession by', value: 'Oct, 2032' }
    ];

    const amenities = [
        { icon: <Coffee size={18} />, label: 'Cafeteria / Food Court' },
        { icon: <Zap size={18} />, label: 'Power Backup' },
        { icon: <ArrowUpCircle size={18} />, label: 'Lift' },
        { icon: <Baby size={18} />, label: 'Service / Goods Lift' },
        { icon: <Users size={18} />, label: 'Visitor Parking' },
        { icon: <Dumbbell size={18} />, label: 'Gymnasium' },
        { icon: <Wind size={18} />, label: 'Air Conditioned' },
        { icon: <Wind size={18} />, label: 'Earthquake Resistant' },
        { icon: <Shield size={18} />, label: 'Fire Fighting System' },
        { icon: <Home size={18} />, label: 'Grand Entrance Lobby' },
        { icon: <Baby size={18} />, label: 'Kids Play Area' },
        { icon: <TreePalm size={18} />, label: 'Event Space & Amphitheatre' }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-white font-sans  selection:bg-primary/10">


            {/* Hero Image Section */}
            <div className="relative h-[650px] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s] brightness-[0.6]" alt="Project Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* BOTTOM LEFT: ALL DETAILS DIRECT ON BANNER */}
                <div className="absolute bottom-16 left-12 md:left-24 z-20 flex flex-col gap-8 max-w-5xl">

                    {/* Project Main Info */}
                    <div className="flex flex-col gap-4">

                        <h1 className="agent-hero font-black text-white tracking-tighter leading-[0.85] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                            {projectName}
                        </h1>

                        <div className="flex flex-wrap items-center gap-10 mt-4">
                            <div className="flex items-center gap-3 text-white/90">
                                <MapPin size={24} className="text-primary" />
                                <p className="agent-h3 font-black uppercase tracking-[0.4em] drop-shadow-md">Sector 111, Gurgaon</p>
                            </div>

                            <div className="flex items-end gap-3 text-white">
                                <div className="agent-hero font-black tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">₹ 15.56 Cr - 17.22 Cr</div>
                                <p className="agent-small font-bold text-white/40 uppercase tracking-widest mb-3">*Starting Price</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation & Regulatory */}
                    <div className="flex flex-col gap-4 mt-4">


                        <div className="px-6 py-3.5 bg-black/40 backdrop-blur-md rounded-2xl agent-meta font-black text-white/50 uppercase tracking-[0.3em] border border-white/5 w-fit shadow-2xl">
                            HARERA: RC/REP/HARERA/GGM/1054/786/2026/28
                        </div>

                        <nav className="flex items-center gap-2 agent-meta font-bold uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/10 w-fit">
                            <Link href="/agent" className="hover:text-primary transition-colors">Agent</Link>
                            <ChevronRight size={10} className="text-white/40" />
                            <Link href="/agent/projects" className="hover:text-primary transition-colors">Projects</Link>
                            <ChevronRight size={10} className="text-white/40" />
                            <span className="text-primary">{projectName}</span>
                        </nav>
                    </div>
                </div>

                {/* Top Dates Info */}
                <div className="absolute bottom-12 right-12 flex gap-4 text-white">
                    <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl agent-small font-black uppercase tracking-widest border border-white/10">
                        Posted: Jan 28, 2026
                    </div>
                    <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl agent-small font-black uppercase tracking-widest border border-white/10">
                        Last Updated: Apr 10, 2026
                    </div>
                </div>
            </div>

            <main className="max-w-[1500px] mx-auto px-8 py-12 flex flex-col lg:flex-row gap-20 relative">
                <div className="flex-1">
                    {/* About Section */}
                    <section className="mb-32">
                        <div className="flex flex-col items-start gap-6 mb-12">
                            <h2 className="agent-h2 font-normal text-slate-900 tracking-tighter" style={{ fontFamily: "WastedVindey, serif" }}>
                                About <span className="gradent_text_color">{projectName}</span>
                            </h2>
                            <p className="agent-meta font-bold text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">PROJECT OVERVIEW & HERITAGE</p>
                        </div>
                        <div className="text-slate-500 agent-body leading-relaxed space-y-8 max-w-5xl">
                            <p>Nestled against the backdrop of the majestic Aravalli Hills, SOBHA... than a residential address — It is a sanctuary crafted for those who... without compromising on peace. Launched on the prestigious Golf Course Extension Road, this landmark development brings together generously proportioned... world-class indulgences, embodying SOBHA's philosophy of Master of Art and Perfection.</p>
                        </div>
                    </section>

                    {/* Property Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden mb-32 shadow-2xl shadow-slate-900/5 stats-grid-reveal">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-10 text-center hover:bg-slate-50 transition-all cursor-default group stat-card">
                                <p className="agent-small font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-hover:text-primary transition-colors">{stat.label}</p>
                                <p className="agent-small font-black text-slate-900 uppercase tracking-tight">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Amenities Section */}
                    <section className="mb-32">
                        <div className="flex flex-col items-start gap-6 mb-16">
                            <h2 className="agent-h2 font-normal text-slate-900 tracking-tighter" style={{ fontFamily: "WastedVindey, serif" }}>
                                Premium <span className="gradent_text_color">Lifestyle Features</span>
                            </h2>
                            <p className="agent-meta font-bold text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">WORLD-CLASS AMENITIES</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {amenities.slice(0, 10).map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-5 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all group cursor-default shadow-sm hover:shadow-lg hover:shadow-primary/5 bg-white">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-primary transition-all shadow-sm mb-4">
                                        {React.cloneElement(item.icon, { size: 16 })}
                                    </div>
                                    <span className="agent-tiny font-black text-slate-900 uppercase tracking-tight mb-1 group-hover:text-primary transition-colors leading-tight">{item.label}</span>
                                    <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">Premium Service</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Floor Plans */}
                    <section className="mb-12">
                        <div className="flex flex-col items-start gap-6 mb-16">
                            <h2 className="agent-h2 font-normal text-slate-900 tracking-tighter" style={{ fontFamily: "WastedVindey, serif" }}>
                                Explore <span className="gradent_text_color">Floor Plans</span>
                            </h2>
                            <p className="agent-meta font-bold text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">DETAILED ARCHITECTURAL LAYOUTS</p>
                        </div>
                        <div className="flex gap-3 mb-10 bg-slate-100/50 p-1.5 rounded-2xl w-fit border border-slate-200/50">
                            {['1BHK', '2BHK', '3BHK', '4BHK'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-10 py-4 rounded-xl agent-meta font-black uppercase tracking-widest transition-all duration-300 border-2 ${activeTab === tab
                                        ? 'bg-amber-500 text-white border-amber-500 shadow-xl shadow-amber-500/20 scale-105'
                                        : 'bg-white text-slate-400 border-slate-100 hover:border-amber-500 hover:text-amber-500 shadow-sm'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="bg-slate-50 rounded-[3.5rem] p-16 border-2 border-slate-200 flex flex-col xl:flex-row gap-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[10rem] -mr-32 -mt-32"></div>

                            {/* Main Floor Plan Preview */}
                            <div
                                className="w-full xl:w-2/3 aspect-video bg-white rounded-[3rem] overflow-hidden shadow-2xl border-2 border-slate-200 relative group cursor-zoom-in"
                                onClick={() => setIsLightboxOpen(true)}
                            >
                                <img
                                    src={floorPlansData[activeTab].images[0]}
                                    className="w-full h-full object-contain p-12 group-hover:scale-105 transition-all duration-1000"
                                    alt={`${activeTab} Floor Plan`}
                                />
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-all flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl flex items-center gap-3">
                                        <Eye size={18} className="text-primary" />
                                        <span className="agent-meta font-black uppercase tracking-widest text-slate-900">View All Plans</span>
                                    </div>
                                </div>
                                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl agent-small font-black uppercase tracking-widest border border-slate-100 shadow-sm">
                                    {floorPlansData[activeTab].images.length} Views
                                </div>
                                <button className="absolute bottom-8 left-8 px-8 py-4 bg-white/90 backdrop-blur-md rounded-2xl agent-meta font-black uppercase tracking-[0.2em] flex items-center gap-3 border border-slate-200 shadow-xl hover:bg-white transition-all">
                                    <FileText size={18} className="text-primary" /> DOWNLOAD PDF
                                </button>
                            </div>

                            <div className="w-full xl:w-1/3 flex flex-col justify-center">
                                <h4 className="agent-h3 font-black text-slate-900 mb-8 tracking-tighter uppercase">{activeTab} Premium Layout</h4>
                                <div className="grid grid-cols-1 gap-6">
                                    {[
                                        { label: 'Bedroom', value: floorPlansData[activeTab].specs.beds, icon: <Home size={14} /> },
                                        { label: 'Estimated Price', value: floorPlansData[activeTab].specs.price, icon: <Zap size={14} /> },
                                        { label: 'Super Area', value: floorPlansData[activeTab].specs.area, icon: <Maximize2 size={14} /> }
                                    ].map((spec, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">{spec.icon}</div>
                                                <span className="agent-meta font-black text-slate-400 uppercase tracking-widest">{spec.label}</span>
                                            </div>
                                            <span className="agent-body font-black text-slate-900">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-10 w-full py-5 bg-slate-900 text-white rounded-2xl font-black agent-meta uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-slate-900/10">
                                    REQUEST SITE VISIT <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Location Section */}
                    <section className="mb-5">
                        <div className="flex flex-col items-start gap-3 mb-3">
                            <h2 className="agent-h2 font-normal text-slate-900 tracking-tighter" style={{ fontFamily: "WastedVindey, serif" }}>
                                Location <span className="gradent_text_color">Advantages</span>
                            </h2>
                            <p className="agent-meta font-bold text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">STRATEGIC CONNECTIVITY & AMENITIES</p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-10 rounded-[4rem] p-10 py-3">
                            {/* Left: Map */}
                            <div className="lg:w-[60%] h-[500px] rounded-[3rem] overflow-hidden border border-slate-200 relative group shadow-inner">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s]" alt="Location Map" />
                                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-all"></div>
                                <button className="absolute bottom-8 left-8 px-10 py-4 bg-white/90 backdrop-blur-md text-slate-900 rounded-2xl agent-small font-black uppercase tracking-widest border border-slate-200 shadow-xl hover:bg-white transition-all active:scale-95">
                                    VIEW ON GOOGLE MAPS
                                </button>
                            </div>

                            {/* Right: Advantages */}
                            <div className="lg:w-[40%] flex flex-col">
                                {/* <div className="flex bg-slate-50 p-2 rounded-2xl mb-8 border-2 border-slate-200/50">
                                    {Object.keys(locationData).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveLocationTab(tab)}
                                            className={`flex-1 py-3.5 rounded-xl agent-tiny font-black uppercase tracking-widest transition-all border-2 ${activeLocationTab === tab
                                                ? 'bg-white text-primary shadow-md border-primary scale-105'
                                                : 'text-slate-400 border-transparent hover:text-slate-600'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex-1 space-y-4">
                                    {locationData[activeLocationTab].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border-2 border-slate-100 hover:border-primary/30 hover:bg-white transition-all group animate-in fade-in slide-in-from-right-4 duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5" style={{ animationDelay: `${i * 100}ms` }}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                    {activeLocationTab === 'Education' && <GraduationCap size={16} />}
                                                    {activeLocationTab === 'Transport' && <Train size={16} />}
                                                    {activeLocationTab === 'Hospital' && <Hospital size={16} />}
                                                    {activeLocationTab === 'Connectivity' && <Globe size={16} />}
                                                </div>
                                                <span className="agent-small font-black text-slate-900 uppercase tracking-widest">{item.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border-2 border-slate-100 shadow-sm group-hover:border-primary/20 transition-all">
                                                <Zap size={10} className="text-primary" />
                                                <span className="agent-tiny font-bold text-slate-500 uppercase tracking-tighter">{item.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}

                                <div className="p-8 bg-slate-900 rounded-[2.5rem] relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <p className="agent-small font-black text-white/40 uppercase tracking-widest mb-2">Project Address</p>
                                        <h4 className="agent-h3 font-black text-white uppercase tracking-tighter mb-6 leading-tight">Sector 111, <br />Smart City Delhi Airport, Gurgaon</h4>
                                        <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-xl agent-tiny font-black uppercase tracking-widest transition-all border border-white/10 active:scale-95">
                                            GET DIRECTIONS
                                        </button>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ & Support Section - Wide Layout */}
                    <section className="py-14 bg-slate-50 relative overflow-hidden border-t border-slate-100">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/5 blur-[100px] rounded-full -ml-32 -mb-32"></div>

                        <div className="w-[95%] mx-auto relative z-10">
                            <div className="text-center mb-24">
                                <h2 className="agent-hero font-normal text-slate-900 mb-8 py-2 leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>
                                    Frequently Asked <span className="gradent_text_color px-2">Questions</span>
                                </h2>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="h-[1px] w-12 bg-primary/30"></div>
                                    <p className="agent-meta font-black text-slate-400 uppercase tracking-[0.5em]">QUICK ANSWERS FOR SMART INVESTORS</p>
                                    <div className="h-[1px] w-12 bg-primary/30"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-[1700px] mx-auto">
                                {/* FAQ List */}
                                <div className="lg:col-span-12 space-y-5">
                                    {projectFaqs.map((faq, i) => (
                                        <div
                                            key={i}
                                            className={`group border-2 transition-all duration-500 rounded-[2.5rem] overflow-hidden ${openFaqIndex === i
                                                ? 'border-primary/30 bg-white shadow-2xl shadow-primary/5'
                                                : 'border-white bg-white/50 hover:bg-white hover:border-slate-200 shadow-sm'
                                                }`}
                                        >
                                            <button
                                                onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                                                className="w-full flex justify-between items-center p-4 md:p-5 cursor-pointer text-left"
                                            >
                                                <span className={`agent-small font-black uppercase tracking-widest transition-colors duration-300 ${openFaqIndex === i ? 'text-primary' : 'text-slate-800'}`}>
                                                    {faq.q}
                                                </span>
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${openFaqIndex === i ? 'bg-primary text-white rotate-180 shadow-md shadow-primary/20' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                                                    }`}>
                                                    <ChevronDown size={14} />
                                                </div>
                                            </button>
                                            <div
                                                className={`transition-all duration-700 ease-in-out overflow-hidden ${openFaqIndex === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                                                    }`}
                                            >
                                                <div className="px-5 pb-6 agent-body font-medium text-slate-500 font-roboto leading-relaxed">
                                                    <div className="w-full h-px bg-slate-100 mb-4"></div>
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>


                            </div>
                        </div>
                    </section>
                </div>

                {/* Sticky Right Sidebar Ads */}
                <aside className="hidden lg:block w-[350px] shrink-0">
                    <div className="sticky top-22">
                        <div className="overflow-hidden shadow-2xl relative aspect-[3/5] group bg-slate-900 border border-white/10">
                            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[3000ms]" alt="Ad Sidebar" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex flex-col justify-end p-10">
                                <div className="w-12 h-12 bg-white rounded-xl p-2 mb-6 shadow-xl">
                                    <img src="/dev/logo-placeholder.png" className="w-full h-full object-contain" alt="Ad Logo" />
                                </div>
                                <h3 className="agent-h2 font-black text-white uppercase mb-4 tracking-tighter">SS CAMASA</h3>
                                <p className="text-white/60 agent-small font-black uppercase tracking-widest mb-8 leading-relaxed">Sector 83, New Gurgaon<br />Starting @ ₹ 3.61 Cr*</p>
                                <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black agent-small uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-3">
                                    <Phone size={14} /> 977 342 236
                                </button>
                                <p className="mt-6 agent-tiny font-black text-white/30 uppercase tracking-[0.2em] text-center">Freeze Panel for Ads</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Bottom Action Panel - Now a Full-Width Section */}
            <section className="w-full fixed bottom-0 z-10">
                <div className="max-w-[1500px] mx-auto px-24">
                    <div className="bg-slate-900 backdrop-blur-2xl rounded-[3.5rem] p-10 py-2 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
                        <div className="flex-1 w-full flex flex-col md:flex-row gap-4">
                            <button className="flex-1 py-6 bg-primary text-white rounded-2xl font-black agent-tiny uppercase tracking-[0.1em] hover:bg-primary/90 transition-all flex items-center justify-center gap-4 shadow-xl shadow-primary/20 group active:scale-95">
                                <Download size={20} className="group-hover:translate-y-1 transition-transform" /> DOWNLOAD PROJECT BROCHURE
                            </button>
                            <button className="flex items-center justify-center gap-4 px-12 py-6 bg-white/5 rounded-2xl agent-tiny font-black text-white uppercase tracking-[0.1em] hover:bg-white/10 transition-all border border-white/10 active:scale-95">
                                <Users size={20} className="text-white/40" /> MANAGE CLIENTS
                            </button>
                            <button className="flex items-center justify-center gap-4 px-12 py-6 bg-white/5 rounded-2xl agent-tiny font-black text-white uppercase tracking-[0.1em] hover:bg-white/10 transition-all border border-white/10 active:scale-95">
                                <Share2 size={20} className="text-white/40" /> SHARE PROJECT
                            </button>
                        </div>
                        <button className="w-full lg:w-80 py-6 bg-white text-slate-900 rounded-2xl font-black agent-tiny uppercase tracking-[0.1em] hover:bg-slate-100 transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95">
                            <Phone size={20} /> CONTACT SALES TEAM
                        </button>
                    </div>
                </div>
            </section>

            {/* Premium 3D Floor Plan Lightbox */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden" style={{ perspective: '2000px' }}>
                    {/* Backdrop */}
                    <div
                        ref={overlayRef}
                        onClick={closeLightbox}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <div
                        ref={modalRef}
                        className="relative w-[90%] max-w-[1200px] aspect-[16/10] bg-black rounded-[2rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Header Controls */}
                        <div className="absolute top-0 left-0 right-0 p-8 flex justify-end items-start z-50 pointer-events-none">
                            <button
                                onClick={closeLightbox}
                                className="w-14 h-14 bg-white/5 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-500 border border-white/10 pointer-events-auto active:scale-90"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Image Viewer */}
                        <div className="absolute inset-0 flex items-center justify-center bg-white p-4 md:p-12">
                            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                {floorPlansData[activeTab].images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${idx === currentImgIndex ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-105 invisible'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                            alt={`View ${idx + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Front/Back Navigation Buttons */}
                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-8 pointer-events-none z-50">
                            <button
                                onClick={() => setCurrentImgIndex(prev => (prev - 1 + floorPlansData[activeTab].images.length) % floorPlansData[activeTab].images.length)}
                                className="w-16 h-16 rounded-full bg-black/10 hover:bg-black/80 text-black hover:text-white backdrop-blur-sm border border-black/5 hover:border-white/20 flex items-center justify-center transition-all duration-500 pointer-events-auto group active:scale-90"
                            >
                                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => setCurrentImgIndex(prev => (prev + 1) % floorPlansData[activeTab].images.length)}
                                className="w-16 h-16 rounded-full bg-black/10 hover:bg-black/80 text-black hover:text-white backdrop-blur-sm border border-black/5 hover:border-white/20 flex items-center justify-center transition-all duration-500 pointer-events-auto group active:scale-90"
                            >
                                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Bottom Bar Controls */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-black/40 backdrop-blur-xl px-10 py-5 rounded-[2rem] border border-white/10 z-50">
                            <div className="flex gap-3">
                                {floorPlansData[activeTab].images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImgIndex(idx)}
                                        className={`h-1.5  transition-all duration-500 rounded-full ${idx === currentImgIndex ? 'w-12 bg-primary' : 'w-3 bg-white/20 hover:bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
