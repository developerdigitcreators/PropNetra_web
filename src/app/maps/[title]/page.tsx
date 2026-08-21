"use client";

import React, { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "../maps.css";

const sectorsData = {
    gurugram: [
        "DLF Phase 1", "DLF Phase 2", "DLF Phase 3", "Sushant Lok 1", "Sector 57", "Sector 23", "Pataudi Sector 1", "DLF Phase 4"
    ],
    noida: [
        "Sector 15", "Sector 18", "Sector 62", "Sector 150", "Noida Extension", "Gaur City"
    ],
    dubai: [
        "Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay", "JVC"
    ]
};

const CityDetailPage = () => {
    const { title } = useParams();
    const containerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All Maps");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const titleSlug = String(Array.isArray(title) ? title[0] : title || "").toLowerCase();
    const citySectors = sectorsData[titleSlug as keyof typeof sectorsData] || sectorsData.gurugram;
    const filteredSectors = citySectors.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const cityName = titleSlug ? titleSlug.charAt(0).toUpperCase() + titleSlug.slice(1) : "Gurugram";

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.from(".reveal-text", {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power4.out"
            });

            gsap.from(".search-container-lux", {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "expo.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="city-detail-page bg-[#fafafa] min-h-screen">


            {/* Section 1: Hero & Search */}
            <section className="city-hero-section pt-40 pb-20 p-l-r">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left: Content */}
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-5xl font-black text-dark mb-8 leading-tight reveal-text tracking-tighter">
                            Sector and Project Wise <br />
                            <span className="gradent_text_color uppercase">Maps of {cityName}</span>
                        </h1>

                        {/* <div className="max-w-2xl">
                            <h2 className="text-xl font-bold text-dark mb-3 reveal-text uppercase tracking-wide">{cityName} Detailed Maps</h2>
                            <div className={`relative transition-all duration-500 overflow-hidden ${isExpanded ? "max-h-[1000px]" : "max-h-[100px]"}`}>
                                <p className="text-zinc-500 leading-relaxed font-medium reveal-text">
                                    The ultimate gateway to investigating the complexities of {cityName}'s topography by means of our meticulously curated collection of maps. Our journey is anything but ordinary since they take a detailed look at the many industries and projects that can be found in the heart of this vibrant metropolis.
                                    <br /><br />
                                    By using {cityName} maps, you will be able to quickly navigate {cityName} while embarking on a voyage of exploration. You will find a map that acts as a guide to every nook and cranny. You are able to fluidly experience the ever-changing pattern of the {cityName} city on the maps. Our platform is designed for investors, enthusiasts, and residents alike who are interested in gaining insight into {cityName}'s ever-changing landscape.
                                </p>
                                {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#fafafa] to-transparent"></div>}
                            </div>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-4 text-primary font-bold flex items-center gap-2 group"
                            >
                                {isExpanded ? "Show Less" : "Show More"}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>
                        </div> */}
                    </div>

                    {/* Right: Search Box */}
                    <div className="w-full lg:w-[450px] search-container-lux">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100 relative">
                            <h3 className="text-sm font-black text-dark uppercase tracking-widest mb-6">Search Location / Project</h3>

                            <div className="relative">
                                <div className={`flex items-center gap-4 bg-zinc-50 border-2 transition-all duration-300 rounded-2xl px-5 py-4 ${showDropdown ? "border-primary ring-4 ring-primary/5" : "border-transparent"}`}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
                                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search sector or project..."
                                        className="bg-transparent border-none outline-none w-full font-bold text-dark placeholder:text-zinc-400"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowDropdown(true);
                                        }}
                                        onFocus={() => setShowDropdown(true)}
                                    />
                                </div>

                                {showDropdown && (
                                    <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden z-50">
                                        <div className="max-h-[300px] overflow-y-auto py-4">
                                            {filteredSectors.length > 0 ? filteredSectors.map((sector, i) => (
                                                <div key={i} className="px-6 py-4 hover:bg-zinc-50 cursor-pointer flex justify-between items-center group transition-colors">
                                                    <span className="font-bold text-zinc-600 group-hover:text-dark transition-colors">{sector}</span>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-300 group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1">
                                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                                    </svg>
                                                </div>
                                            )) : (
                                                <div className="px-6 py-8 text-center text-zinc-400 font-medium italic">No results found</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Recent Maps */}
            <section className="section top bottom p-l-r bg-white rounded-t-[4rem]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div className="headingBox flex flex-col gap-small text-left mb-0">
                        <span className="luxury-reveal eyebrow-gold text-left mb-0" style={{ width: 'fit-content' }}>Premium Directory</span>
                        <h2 className="text-3xl md:text-5xl font-black text-dark tracking-tighter leading-none lowercase first-letter:uppercase">
                            {cityName} Maps - <span className="gradent_text_color">Updated & Recent</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-4 bg-white border border-zinc-200 rounded-full px-8 py-4 font-black text-[10px] uppercase tracking-[0.2em] text-dark hover:border-primary transition-all shadow-sm group"
                        >
                            <span className="text-zinc-400 group-hover:text-primary transition-colors">Category:</span>
                            <span>{selectedFilter}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-300 text-primary ${isFilterOpen ? "rotate-180" : ""}`}>
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        {isFilterOpen && (
                            <div className="absolute top-[calc(100%+12px)] right-0 w-[240px] bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-zinc-100 py-4 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                                {["All Maps", "Residential", "Commercial", "Industrial"].map((filter) => (
                                    <div
                                        key={filter}
                                        onClick={() => {
                                            setSelectedFilter(filter);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer transition-all ${selectedFilter === filter ? "text-primary bg-primary/5" : "text-zinc-400 hover:bg-zinc-50 hover:text-dark"}`}
                                    >
                                        {filter}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="group flex flex-col h-full bg-[#f1f1f1] rounded-[10px] p-4 border border-[#dcdcdc] hover:border-zinc-100 hover:bg-white hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] transition-all duration-500">
                            <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden mb-8 shadow-inner">
                                <Image
                                    src={`https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=800&auto=format&fit=crop`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    alt="Map Preview"
                                />
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-md text-[10px] font-black text-dark px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">Updated</span>
                                    {i % 2 === 0 && <span className="bg-primary text-[10px] font-black text-white px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">New</span>}
                                </div>

                                <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary">
                                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 pb-4 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-1.5 text-dark">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">13644 views</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-dark mb-4 leading-tight group-hover:text-primary transition-colors">
                                    Detailed Development <br />Layout Plan
                                </h3>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-100">
                                    <Link href={`/maps/${title}/map-${i}`} className="text-xs font-black text-dark uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors">
                                        View Map
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6" /></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


        </main>
    );
};

export default CityDetailPage;
