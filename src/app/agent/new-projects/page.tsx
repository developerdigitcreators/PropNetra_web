'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronRight, ArrowRight, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NewProjectsPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        const ctx = gsap.context(() => {
            // Hero Content Reveal
            gsap.fromTo(".hero-content-reveal",
                { y: 80, opacity: 0, scale: 1.1 },
                { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out", stagger: 0.3, clearProps: "all" }
            );

            // Search Bar Reveal
            gsap.fromTo(".search-bar-reveal",
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.6, ease: "power4.out", clearProps: "all" }
            );

            // Section Headlines Reveal
            gsap.fromTo(".title-reveal-large span",
                { y: 100, opacity: 0, skewY: 10 },
                {
                    y: 0, opacity: 1, skewY: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", clearProps: "all",
                    scrollTrigger: {
                        trigger: ".title-reveal-large",
                        start: "top 95%",
                    }
                }
            );

            // Project Cards Staggered Reveal
            gsap.fromTo(".project-card-reveal",
                { y: 100, opacity: 0, scale: 0.9 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", clearProps: "all",
                    scrollTrigger: {
                        trigger: ".project-grid-container",
                        start: "top 95%",
                    }
                }
            );
        }, containerRef);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    const slides = [
        {
            title: "LAMBORGHINI",
            subtitle: "BRANDED RESIDENCES",
            price: "₹ 4.8 CR",
            loc: "Sector 42, Gurugram",
            bg: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000"
        }
    ];

    const comingSoon = [
        { name: 'EMPERIUM', logo: '/dev/1.png' },
        { name: 'AARIZE', logo: '/dev/7.png' },
        { name: 'AURA', logo: '/dev/10.png' },
        { name: 'GANGA', logo: '/dev/2.png' },
        { name: 'M3M', logo: '/dev/4.png' },
        { name: 'KRISUMI', logo: '/dev/3.png' },
        { name: 'MAX ESTATES', logo: '/dev/11.png' }
    ];

    const projects = Array(16).fill({
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000',
        logo: '/dev/4.png'
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            {/* 1. Hero Section */}
            <section className="relative h-[450px] md:h-[500px] lg:h-[60vh] xl:h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-slate-900">
                <div
                    className="flex h-full transition-transform duration-1000 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, idx) => (
                        <div key={idx} className="min-w-full h-full relative">
                            <img
                                src={slide.bg}
                                className={`w-full h-full object-cover transition-transform duration-[15s] ease-linear brightness-[0.65] ${idx === currentSlide ? 'scale-110' : 'scale-100'}`}
                                alt={slide.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80"></div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-start text-left p-12 md:p-24 text-white transition-all duration-1000 z-10 ${idx === currentSlide ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
                                <div className="max-w-3xl hero-content-reveal">
                                    <h1 className="agent-hero font-normal tracking-tight mb-0 max-w-4xl drop-shadow-2xl leading-[1.1]" style={{ fontFamily: "WastedVindey, serif" }}>
                                        {slide.title} <span className="text-white">{slide.subtitle}</span>
                                    </h1>
                                    <p className="agent-body text-white/60 font-light max-w-xl leading-loose border-l-2 border-primary/30 pl-6 uppercase tracking-[0.2em]">
                                        {slide.loc}
                                    </p>
                                </div>
                                <div className="flex items-center gap-8 hero-content-reveal mt-10 mb-10">
                                    <div className="px-2 py-1 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                                        <span className="agent-tiny font-bold text-white/30 uppercase tracking-[0.4em] block mb-1 text-center font-roboto">Price Starts From</span>
                                        <span className="agent-h3 font-light text-white tracking-widest font-roboto">{slide.price}</span>
                                    </div>
                                </div>

                                <nav className="flex items-center gap-3 agent-tiny font-light uppercase tracking-[0.3em] hero-content-reveal bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10">
                                    <Link href="/agent" className="text-white/40 hover:text-white transition-colors">Agent Portal</Link>
                                    <ChevronRight size={10} className="text-white/20" />
                                    <span className="text-white/90">New Projects</span>
                                </nav>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
                    {slides.map((_, i) => (
                        <div key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === currentSlide ? 'h-8 bg-primary' : 'bg-white/30'}`}></div>
                    ))}
                </div>
            </section>

            {/* 2. Search Bar */}
            <div className="relative -mt-10 z-40 px-4 max-w-[1100px] mx-auto search-bar-reveal">
                <div className="bg-white/95 backdrop-blur-3xl rounded-[2.2rem] p-3 flex flex-col md:flex-row items-center gap-4 border-2 border-slate-900/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
                    <div className="w-full md:w-64 relative group">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 group-hover:scale-110 transition-transform" size={18} />
                        <select className="w-full h-14 pl-14 pr-6 bg-white rounded-xl agent-small font-normal text-slate-400 uppercase tracking-widest border-2 border-slate-300/10 focus:border-slate-300 outline-none appearance-none hover:bg-slate-50 transition-all cursor-pointer shadow-sm">
                            <option>Select Area</option>
                            <option>Golf Course Road</option>
                            <option>Golf Course Ext.</option>
                            <option>Sohna Road</option>
                            <option>New Gurgaon</option>
                            <option>Dwarka Expressway</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-900">
                            <ChevronDown size={16} />
                        </div>
                    </div>

                    <div className="flex-1 w-full relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-300 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Type Developer name to start search..."
                            className="w-full h-14 pl-14 pr-6 bg-white rounded-xl agent-small font-bold placeholder:text-slate-300 outline-none focus:border-slate-100 transition-all border-2 border-slate-600/10 shadow-sm"
                        />
                    </div>

                    <button className="w-full md:w-auto px-12 h-14 bg-slate-900 text-white rounded-xl font-black agent-small uppercase tracking-[0.3em] hover:bg-primary transition-all active:scale-95 shadow-xl">
                        SEARCH
                    </button>
                </div>
            </div>

            <main className="w-full px-4 md:px-8 py-12 relative">
                {/* 3. Coming Soon Section */}
                <div className="mb-10">
                    <div className="mb-7 flex flex-col items-start gap-4">
                        <h2 className="title-reveal-large py-2 leading-tight overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                            <span className="inline-block text-slate-900">Coming Soon</span> <span className="gradent_text_color pr-2 inline-block">Projects</span>
                        </h2>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">Top Developer Launches</p>
                    </div>

                    <div className="w-[100%] mx-auto overflow-hidden relative py-0">
                        <div className="flex gap-10 animate-marquee w-max">
                            {[...comingSoon, ...comingSoon, ...comingSoon].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-6 shrink-0 group cursor-pointer coming-soon-item transition-transform duration-500">
                                    <div className="p-[1px] rounded-[2.8rem] bg-gradient-to-br from-orange-400/60 to-primary/60 transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(255,107,0,0.10)] group-hover:shadow-primary/30">
                                        <div className="w-[126px] h-[126px] rounded-[2.7rem] p-5 bg-white flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent transition-opacity"></div>
                                            <img src={item.logo} className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" alt={item.name} />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="agent-small font-bold gradent_text_color uppercase tracking-[0.2em] mb-1 transition-all duration-300">{item.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Portfolio Header (Outside for Sticky Precision) */}
                <div className="mb-8 flex flex-col items-start gap-4 title-reveal-large">
                    <h2 className="title-reveal-large py-2 leading-tight overflow-hidden" style={{ fontFamily: "WastedVindey, serif" }}>
                        <span className="inline-block text-slate-900">Exclusive</span> <span className="gradent_text_color pr-2 inline-block">New Projects</span>
                    </h2>
                    <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">Premium Residential & Commercial</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-9 items-start project-grid-container">
                    {/* Project Grid */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                        {projects.map((proj, i) => (
                            <div key={i} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border-2 border-slate-900/10 hover:border-primary/50 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 project-card-reveal cursor-pointer relative">
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <img src={proj.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" alt="Project" />

                                    {/* Traveling Shine/Shadow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full skew-x-[-25deg] group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out z-10"></div>

                                    {/* <div className="absolute top-0 left-0 z-20">
                                        <div className="px-3 py-2 bg-white/95 backdrop-blur-md rounded-br-3xl agent-tiny font-black text-slate-900 uppercase tracking-[0.2em] border-b-2 border-r-2 border-slate-900/5 shadow-sm">
                                            12 PROJECTS 
                                        </div>
                                    </div> */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                <div className="p-6 flex items-center justify-center bg-white border-t border-slate-900/5 h-24 relative overflow-hidden">
                                    <img src={proj.logo} className="h-12 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Dev Logo" />

                                    {/* Flowing Golden Line at Bottom */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-1000 ease-out group-hover:w-full"></div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#D4AF37] blur-[2px] transition-all duration-1000 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Ad (Moved back to Right & Kept Adjusted Height) */}
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
                                <p className="agent-small font-medium opacity-80 uppercase tracking-[0.2em] mb-8 leading-relaxed">
                                    Share Your #PataBadloLifeBadlo story and WIN vouchers worth ₹5000
                                </p>

                            </div>
                        </div>
                    </aside>
                </div>

                {/* Load More (Outside container for precise sticky release) */}
                <div className="mt-20 flex justify-center">
                    <button className="px-16 py-4 border-2 border-slate-900/10 rounded-2xl agent-small font-black text-slate-900 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">Load More ....</button>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
                .animate-marquee { display: flex; animation: marquee 35s linear infinite; }
                .animate-marquee:hover { animation-play-state: paused; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
}
