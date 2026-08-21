'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    GitCompare, Search, Plus, X, ArrowRight,
    CheckCircle2, Info, Building2, MapPin,
    DollarSign, Home, Layout, ShieldCheck,
    TrendingUp, Star, ChevronDown, Trash2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../../../components/Footer';
import ReferFooter from '@/components/ReferFooter';

gsap.registerPlugin(ScrollTrigger);

export default function CompareProjectsPage() {
    const availableProjects = [
        {
            id: 1,
            name: "M3M Crown",
            developer: "M3M India",
            location: "Sector 111, Gurgaon",
            price: "₹ 2.50 Cr Onwards",
            status: "New Launch",
            amenities: ["Smart Home", "Olympic Pool", "Private Theatre", "Luxury Spa"],
            roi: "12.5%",
            possession: "Dec 2026",
            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
        },
        {
            id: 2,
            name: "Smartworld One DXP",
            developer: "Smartworld",
            location: "Sector 113, Gurgaon",
            price: "₹ 2.10 Cr Onwards",
            status: "Under Construction",
            amenities: ["Social Club", "Kids Area", "Gymnasium", "Co-working"],
            roi: "10.8%",
            possession: "June 2025",
            img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800"
        },
        {
            id: 3,
            name: "DLF The Arbour",
            developer: "DLF Luxury",
            location: "Sector 63, Gurgaon",
            price: "₹ 7.50 Cr Onwards",
            status: "Sold Out",
            amenities: ["Private Lift", "Butler Service", "Golf Course", "Sky Lounge"],
            roi: "15.2%",
            possession: "Ready to Move",
            img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"
        }
    ];

    const [selectedProjects, setSelectedProjects] = useState(availableProjects);
    const containerRef = useRef(null);

    const toggleProject = (project) => {
        if (selectedProjects.find(p => p.id === project.id)) {
            setSelectedProjects(selectedProjects.filter(p => p.id !== project.id));
        } else if (selectedProjects.length < 3) {
            setSelectedProjects([...selectedProjects, project]);
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".reveal-up",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#F8F9FA]">
            {/* Header Banner (Compact) */}
            <div className="relative h-48 w-full overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
                <div className="absolute inset-0 opacity-[0.05] grayscale">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" className="w-full h-full object-cover" alt="Background" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>

                <div className="relative z-10 text-center px-6 mt-10">
                    <h1 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-slate-900 leading-[0.9] mb-3 reveal-up" style={{ fontFamily: "WastedVindey, serif" }}>
                        Project <span className="gradent_text_color">Comparison</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3 reveal-up">
                        <div className="w-10 h-px bg-slate-200"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Side-by-Side Builder Intelligence</p>
                        <div className="w-10 h-px bg-slate-200"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-12">
                {/* Selection Bar (Compact) */}
                <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm mb-8 reveal-up">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="agent-h2 font-normal text-slate-900 mb-1" style={{ fontFamily: "WastedVindey, serif" }}>Selected Projects</h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Compare up to 3 luxury developments</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            {availableProjects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => toggleProject(project)}
                                    className={`px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${selectedProjects.find(p => p.id === project.id)
                                            ? 'bg-slate-900 border-slate-900 text-white shadow-xl'
                                            : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                                        }`}
                                >
                                    {selectedProjects.find(p => p.id === project.id) ? <X size={14} /> : <Plus size={14} />}
                                    {project.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Comparison Table (Sleek) */}
                {selectedProjects.length > 0 ? (
                    <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-lg overflow-hidden reveal-up">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-4 text-left w-1/4 border-r border-slate-200 bg-slate-50/50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
                                                    <GitCompare size={16} />
                                                </div>
                                                <p className="agent-tiny font-black text-slate-900 uppercase tracking-widest">Parameter</p>
                                            </div>
                                        </th>
                                        {selectedProjects.map((project) => (
                                            <th key={project.id} className="p-4 text-left w-1/4 border-r border-slate-200 min-w-[220px]">
                                                <div className="relative h-24 w-full rounded-xl overflow-hidden mb-3 group border border-slate-100">
                                                    <img src={project.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={project.name} />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                                </div>
                                                <p className="agent-tiny font-black text-primary uppercase tracking-widest mb-0.5 text-[8px]">{project.developer}</p>
                                                <h4 className="agent-h4 font-normal text-slate-900 leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>{project.name}</h4>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {[
                                        { label: "Location", key: "location", icon: <MapPin size={14} /> },
                                        { label: "Price", key: "price", icon: <DollarSign size={14} /> },
                                        { label: "Status", key: "status", icon: <ShieldCheck size={14} /> },
                                        { label: "Possession", key: "possession", icon: <CheckCircle2 size={14} /> },
                                        { label: "AI ROI", key: "roi", icon: <TrendingUp size={14} /> }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors border-b border-slate-200">
                                            <td className="p-3 border-r border-slate-200 bg-slate-50/50">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm">
                                                        {row.icon}
                                                    </div>
                                                    <span className="agent-tiny font-black text-slate-500 uppercase tracking-widest text-[8px]">{row.label}</span>
                                                </div>
                                            </td>
                                            {selectedProjects.map((project) => (
                                                <td key={project.id} className="p-3 border-r border-slate-200">
                                                    <span className="agent-meta font-bold text-slate-900 tracking-tight">{project[row.key]}</span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 border-r border-slate-200 bg-slate-50/50">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm">
                                                    <Star size={14} />
                                                </div>
                                                <span className="agent-tiny font-black text-slate-500 uppercase tracking-widest text-[8px]">Amenities</span>
                                            </div>
                                        </td>
                                        {selectedProjects.map((project) => (
                                            <td key={project.id} className="p-3 border-r border-slate-200">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.amenities.slice(0, 3).map((item, k) => (
                                                        <span key={k} className="bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg agent-tiny font-black uppercase text-slate-400 tracking-widest text-[7px] leading-none">{item}</span>
                                                    ))}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-slate-900 text-center">

                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] border border-slate-200 border-dashed p-20 text-center reveal-up">
                        <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-8 border-2 border-dashed border-slate-200">
                            <Layout size={48} />
                        </div>
                        <h2 className="agent-h2 font-normal text-slate-900 mb-4" style={{ fontFamily: "WastedVindey, serif" }}>Comparison <span className="gradent_text_color">Dashboard</span></h2>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-widest mb-10">Select up to 3 projects from the bar above to begin analysis</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
                            {[
                                { title: "Price Mapping", desc: "Real-time cost comparison across builders." },
                                { title: "ROI Intelligence", desc: "AI-driven growth predictions for each sector." },
                                { title: "Timeline Analysis", desc: "Possession tracking and delay monitoring." }
                            ].map((info, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                                    <h4 className="agent-meta font-black text-slate-900 uppercase mb-2 tracking-widest">{info.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase">{info.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ReferFooter />
        </main>
    );
}
