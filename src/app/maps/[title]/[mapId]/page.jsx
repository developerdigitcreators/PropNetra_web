"use client";

import React, { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "../../maps.css";
import BookDemo from "@/components/BookDemo";

const MapViewerPage = () => {
    const { title, mapId } = useParams();
    const containerRef = useRef(null);
    const [zoom, setZoom] = useState(1);

    const cityName = title ? title.charAt(0).toUpperCase() + title.slice(1) : "Gurugram";
    const mapName = mapId ? mapId.replace(/-/g, " ").toUpperCase() : "MAP VIEW";

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".viewer-header", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" });
            gsap.from(".viewer-main", { scale: 0.95, opacity: 0, duration: 1, delay: 0.2, ease: "expo.out" });
            gsap.from(".viewer-side", { x: 40, opacity: 0, duration: 0.8, delay: 0.4, ease: "power3.out" });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="city-detail-page bg-white min-h-screen">
            <Header />

            {/* Section 1: Dynamic Content Hero */}
            <section className="city-hero-section pt-40 pb-20 p-l-r bg-white">
                <div className="max-w-7xl">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href={`/maps/${title}`} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all group">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:-translate-x-0.5 transition-transform"><path d="m15 18-6-6 6-6" /></svg>
                        </Link>
                        <div className="h-px w-12 bg-zinc-200"></div>
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">{cityName} Phase 1 Plot Map {cityName} | Master Plan</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h1 className="text-4xl md:text-7xl font-black text-dark mb-8 leading-[0.85] tracking-tighter">
                                Explore <span className="gradent_text_color uppercase">{mapName}</span> <br />
                                <span className="text-zinc-200">In {cityName}</span>
                            </h1>
                        </div>

                        <div className="flex flex-col gap-8">
                            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                                Investigate the comprehensive map of <span className="text-dark font-bold underline decoration-primary/30 decoration-4 underline-offset-4">{mapName} in {cityName}</span>, which includes a detailed plot map displaying both residential and commercial areas. This verified layout acts as a guide to every nook and cranny of the metropolis.
                            </p>

                            {/* <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-150"></div>
                                <p className="text-xs font-black text-dark uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-6 h-px bg-primary"></span>
                                    Key Facilities Nearby
                                </p>
                                <ul className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    {[
                                        { label: "Schools", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                                        { label: "Hospitals", icon: "M19 14c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" },
                                        { label: "Shopping Malls", icon: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" },
                                        { label: "Transit Points", icon: "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 group/item">
                                            <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-150 transition-transform"></div>
                                            <span className="text-sm font-bold text-zinc-600 group-hover/item:text-dark transition-colors">{item.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Spotlight Map Card */}
            <section className="section p-l-r mt-[-20px] relative z-20">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Property Details Card */}
                    <div className="w-full lg:w-[400px] bg-white rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-50 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Verified GIS Map</span>
                            </div>

                            <div className="space-y-8">
                                <div className="group">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Location Name</p>
                                    <p className="text-lg font-bold text-dark">{cityName} Phase 1, {cityName}</p>
                                </div>
                                <div className="group">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Alternate Name</p>
                                    <p className="text-lg font-bold text-dark">{cityName} Central Hub</p>
                                </div>
                                <div className="group">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Demand</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-black text-dark">13,645</span>
                                        <span className="text-xs font-bold text-zinc-400">Views this month</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="mt-12 w-full bg-[#0070E0] text-white rounded-2xl py-5 flex items-center justify-center gap-4 font-black tracking-tight shadow-[0_20px_40px_rgba(0,112,224,0.3)] hover:-translate-y-1 transition-all group">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-12 transition-transform">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            +91 93 55 66 88 33
                        </button>
                    </div>

                    {/* Main Spotlight Image with Zoom Controls */}
                    <div className="flex-1 relative rounded-[2.5rem] overflow-hidden group shadow-2xl border-4 border-white bg-zinc-100">
                        <div className="absolute top-8 left-8 z-30 flex flex-col gap-2">
                            <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))} className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>
                            </button>
                            <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14" /></svg>
                            </button>
                            <button onClick={() => setZoom(1)} className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 12h18M12 3v18" /></svg>
                            </button>
                        </div>

                        <div className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out" style={{ transform: `scale(${zoom})` }}>
                            <div className="relative w-full h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=2000&auto=format&fit=crop"
                                    fill
                                    className="object-cover"
                                    alt="Main Plot Map"
                                />
                            </div>
                        </div>
                        <div className="absolute bottom-8 right-8 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-dark shadow-xl">
                            Zoom: {Math.round(zoom * 100)}%
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Related Maps Directory */}
            <section className="section top bottom p-l-r bg-[#fafafa]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div className="headingBox flex flex-col gap-small text-left mb-0">
                        <span className="luxury-reveal eyebrow-gold text-left mb-0" style={{ width: 'fit-content' }}>Explore More</span>
                        <h2 className="text-3xl md:text-5xl font-semibold text-dark tracking-tighter leading-none lowercase first-letter:uppercase">
                            {cityName} Maps - <span className="gradent_text_color">Related & Recent</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sort By</span>
                        <select className="bg-white border border-zinc-200 rounded-full px-8 py-3 font-black text-dark text-[10px] uppercase tracking-widest outline-none focus:border-primary transition-colors cursor-pointer shadow-sm">
                            <option>Most Viewed</option>
                            <option>Recently Added</option>
                            <option>Verified Only</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group bg-white rounded-[2.5rem] p-4 border border-zinc-100 hover:border-primary/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all duration-700">
                            <div className="relative aspect-[16/11] rounded-[2rem] overflow-hidden mb-6">
                                <Image
                                    src={`https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=800&auto=format&fit=crop`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    alt="Related Map"
                                />
                                {/* Black Header Bar Reveal */}
                                <div className="absolute top-0 left-0 w-full bg-zinc-950/95 backdrop-blur-md py-4 px-8 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] text-center">{cityName} Sector {i * 15} Map</p>
                                </div>

                                <div className="absolute inset-0 bg-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 pb-4 flex flex-col items-center">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{8000 + i * 1200} Views</span>
                                </div>
                                <h3 className="text-xl font-bold text-dark text-center leading-tight mb-6">Detailed Sector <br />Development Plan</h3>
                                <Link href={`/maps/${title}/map-${i}`} className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2 group/link">
                                    Explore Map
                                    <div className="w-6 h-px bg-primary/30 group-hover/link:w-10 transition-all"></div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <BookDemo />
        </main>
    );
};

export default MapViewerPage;
