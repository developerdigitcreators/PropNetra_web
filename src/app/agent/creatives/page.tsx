'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
    Search, MapPin, ArrowUpRight, Building2, Sparkles, Palette, Brush, LayoutGrid
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../../../components/Footer';
import ReferFooter from '@/components/ReferFooter';

gsap.registerPlugin(ScrollTrigger);

export default function CustomizedCreativesMainPage() {
    const containerRef = useRef(null);

    const projects = [
        {
            id: 1,
            name: "M3M Crown",
            developer: "M3M India",
            location: "Sector 111, Gurgaon",
            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
            creativesCount: 12,
            category: "Launch"
        },
        {
            id: 2,
            name: "Smartworld One DXP",
            developer: "Smartworld",
            location: "Sector 113, Gurgaon",
            img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
            creativesCount: 8,
            category: "Launch"
        },
        {
            id: 3,
            name: "DLF The Arbour",
            developer: "DLF Luxury",
            location: "Sector 63, Gurgaon",
            img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
            creativesCount: 15,
            category: "Branding"
        },
        {
            id: 4,
            name: "Emaar DigiHomes",
            developer: "Emaar India",
            location: "Sector 62, Gurgaon",
            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
            creativesCount: 10,
            category: "Listing"
        }
    ];

    const categories = [
        { name: 'All', icon: <LayoutGrid size={18} /> },
        { name: 'Launch', icon: <Sparkles size={18} /> },
        { name: 'Festive', icon: <Palette size={18} /> },
        { name: 'Branding', icon: <Brush size={18} /> },
        { name: 'Listing', icon: <Building2 size={18} /> }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".project-card",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8,
                    stagger: 0.1, ease: "power2.out"
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-white">
            {/* Page Banner */}
            <div className="relative h-[220px] w-full overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
                <div className="absolute inset-0 opacity-[0.15]">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000" className="w-full h-full object-cover" alt="Banner" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-900/5 to-white"></div>

                <div className="relative z-10 text-center px-6">
                    <h1 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-slate-900 leading-[0.9] mb-3" style={{ fontFamily: "WastedVindey, serif" }}>
                        Customised <span className="gradent_text_color">Creatives</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-px bg-slate-200"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Select Project Studio</p>
                        <div className="w-10 h-px bg-slate-200"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto flex min-h-screen">
                <aside className="w-[240px] border-r border-slate-100 p-6 hidden lg:block sticky top-[80px] h-screen">
                    <div className="space-y-1">
                        <p className="text-[14px] font-black text-slate-900 uppercase tracking-[0.2em] mb-3 ml-2">Categories</p>
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                className="w-full flex items-center justify-between px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-400 group-hover:text-slate-900">
                                        {cat.icon}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                <div className="flex-1 p-6 lg:p-10">
                    <div className="mb-10">
                        <div className="relative w-full md:w-[320px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-[11px] font-bold focus:outline-none focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {projects.map((proj) => (
                            <Link
                                href={`/agent/creatives/${proj.id}`}
                                key={proj.id}
                                className="project-card group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 block"
                            >
                                <div className="aspect-[16/10] relative overflow-hidden">
                                    <img src={proj.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" alt={proj.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                    <div className="absolute top-6 right-6">
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg agent-tiny font-black uppercase tracking-widest">
                                            {proj.creativesCount} Assets
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="agent-tiny font-black text-primary uppercase tracking-[0.2em] mb-1">{proj.developer}</p>
                                    <h4 className="agent-h4 font-normal text-slate-900 leading-tight mb-3" style={{ fontFamily: "WastedVindey, serif" }}>{proj.name}</h4>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <MapPin size={12} />
                                        <span className="agent-tiny font-bold uppercase tracking-widest">{proj.location}</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <ReferFooter />
        </main>
    );
}
