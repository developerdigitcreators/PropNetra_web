'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    Palette, Download, Share2, Layers, Building2, MapPin,
    DollarSign, ArrowUpRight, Image as ImageIcon,
    Type, Brush, Sparkles, Wand2, DownloadCloud,
    Search, Filter, LayoutGrid, X,
    MessageCircle, Send, Link as LinkIcon
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../../../../components/Footer';
import ReferFooter from '@/components/ReferFooter';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectStudioPage({ params }) {
    const [selectedCreative, setSelectedCreative] = useState(null);
    const containerRef = useRef(null);
    const { projectId } = params;

    // In a real app, you would fetch project details based on ID
    const project = {
        name: "M3M Crown",
        developer: "M3M India",
        location: "Sector 111, Gurgaon"
    };

    const categories = [
        { name: 'All', count: 48, icon: <LayoutGrid size={18} /> },
        { name: 'Launch', count: 12, icon: <Sparkles size={18} /> },
        { name: 'Festive', count: 8, icon: <Palette size={18} /> },
        { name: 'Branding', count: 15, icon: <Brush size={18} /> },
        { name: 'Listing', count: 13, icon: <Building2 size={18} /> }
    ];

    const creatives = [
        { id: 2, title: "Festive Season Offer", category: "Festive", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800", height: "h-[450px]" },
        { id: 3, title: "Agent Brand Identity", category: "Branding", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800", height: "h-[280px]" },
        { id: 1, title: "Modern Luxury Launch", category: "Launch", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800", height: "h-[300px]" },
        { id: 5, title: "Smart Living Concept", category: "Launch", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800", height: "h-[400px]" },
        { id: 4, title: "Direct Builder Deal", category: "Listing", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800", height: "h-[500px]" },
        { id: 7, title: "Professional Profile", category: "Branding", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800", height: "h-[420px]" },
        { id: 6, title: "Diwali Special Offer", category: "Festive", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800", height: "h-[320px]" }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".creative-item",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8,
                    stagger: 0.05, ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".masonry-grid",
                        start: "top 85%"
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-white">
            {/* Header / Banner */}
            <div className="relative h-[220px] w-full overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
                <div className="absolute inset-0 opacity-[0.15]">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000" className="w-full h-full object-cover" alt="Banner" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-900/5 to-white"></div>

                <div className="relative z-10 text-center px-6 mt-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Link href="/agent/customised-creatives" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
                            <X size={18} className="text-slate-400" />
                        </Link>
                        <span className="agent-tiny font-black text-primary uppercase tracking-[0.3em]">{project.developer}</span>
                    </div>
                    <h1 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-slate-900 leading-[0.9] mb-3" style={{ fontFamily: "WastedVindey, serif" }}>
                        {project.name} <span className="gradent_text_color">Studio</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">PropNetra Marketing Assets</p>
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
                    <div className="mb-10 flex items-center justify-between">
                        <div className="relative w-full md:w-[320px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                className="w-full h-12 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-[11px] font-bold focus:outline-none focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="masonry-grid columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {creatives.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedCreative(item)}
                                className="creative-item break-inside-avoid relative group rounded-none overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer"
                            >
                                <div className={`w-full ${item.height} relative overflow-hidden`}>
                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]" alt={item.title} />

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent flex flex-col justify-end p-5">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-0.5">{item.category}</p>
                                        <h4 className="text-[14px] font-normal text-white" style={{ fontFamily: "WastedVindey, serif" }}>{item.title}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {selectedCreative && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-500"
                        onClick={() => setSelectedCreative(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col md:flex-row max-h-[90vh]">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedCreative(null)}
                            className="cursor-pointer absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-black hover:bg-black/50 hover:text-white transition-all flex items-center justify-center"
                        >
                            <X size={20} />
                        </button>

                        {/* Left: Image Preview */}
                        <div className="flex-1 bg-slate-50 flex items-center justify-center p-6 md:p-10 overflow-hidden">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={selectedCreative.img}
                                    className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                                    alt="Preview"
                                />
                            </div>
                        </div>

                        {/* Right: Actions & Info */}
                        <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col border-l border-slate-100 overflow-y-auto">
                            <div className="mb-10">
                                <p className="agent-tiny font-black text-primary uppercase tracking-[0.2em] mb-2">{selectedCreative.category}</p>
                                <h3 className="agent-h3 font-normal text-slate-900 leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>
                                    {selectedCreative.title}
                                </h3>
                                <p className="text-[12px] font-bold text-slate-400 mt-2">Ready to share professional marketing asset for {project.name}.</p>
                            </div>

                            {/* Share Section */}
                            <div className="space-y-6 mb-12">
                                <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Share to Social Media</p>
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        { icon: <MessageCircle size={20} />, label: "WhatsApp", color: "hover:bg-green-500" },
                                        { icon: <Send size={20} />, label: "Direct", color: "hover:bg-blue-500" },
                                        { icon: <Share2 size={20} />, label: "Social", color: "hover:bg-indigo-600" },
                                        { icon: <LinkIcon size={20} />, label: "Copy", color: "hover:bg-slate-900" }
                                    ].map((social, i) => (
                                        <button
                                            key={i}
                                            className={`group flex flex-col items-center gap-2`}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 ${social.color} hover:text-white hover:-translate-y-1 transition-all duration-300`}>
                                                {social.icon}
                                            </div>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{social.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Download Section */}
                            <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col gap-4">
                                <button className="w-full h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-primary transition-all active:scale-95 shadow-xl group">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                        <DownloadCloud size={18} />
                                    </div>
                                    <span className="agent-small font-black uppercase tracking-[0.2em]">Download Asset</span>
                                </button>

                                {/* <div className="flex items-center gap-4 justify-center py-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Downloaded by 24 agents today</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ReferFooter />
        </main>
    );
}
