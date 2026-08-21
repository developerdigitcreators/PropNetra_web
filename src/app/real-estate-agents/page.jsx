'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './agents.css';

export default function RealEstateAgents() {
    const [searchVal, setSearchVal] = useState('');
    const [activeTab, setActiveTab] = useState('Home');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Apartment');
    const [priceRange, setPriceRange] = useState([0, 1000]); // in Lacs/Cr

    const categories = [
        "Builder Floor", "Plot", "Villa", "SCO", "Apartment", "Retail & Office", "Pre-Leased Commercial"
    ];

    const navItems = [
        { label: 'Home', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></> },
        { label: 'Client List', icon: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /> },
        { label: 'Activity', icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
        { label: 'Profile', icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
        { label: 'Post', icon: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>, isSpecial: true },
    ];

    return (
        <main className="bg-[#fafafa] min-h-screen pt-32 pb-16 px-4 md:px-8 font-sans">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-8">

                {/* Advanced Search Engine Module */}
                <div className="w-full sticky top-24 z-10 transition-all duration-500">
                    <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] overflow-hidden">

                        {/* Main Search Bar (Always Visible) */}
                        <div className="p-2.5 flex flex-col lg:flex-row items-center justify-between gap-4">

                            {/* Category & Search Area */}
                            <div className="w-full lg:max-w-[650px] flex items-center gap-2 pl-2">
                                {/* Category Dropdown */}
                                <div className="relative group min-w-[140px] md:min-w-[180px]">
                                    <select
                                        className="w-full h-[50px] pl-4 pr-10 rounded-2xl border border-gray-100 bg-gray-50/50 text-[13px] font-bold text-gray-800 appearance-none cursor-pointer focus:outline-none focus:border-[#ff004f]/30 transition-all"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
                                    </div>
                                </div>

                                {/* Smart Search Bar */}
                                <div className="flex-1 relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#ff004f]">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                    </div>
                                    <input
                                        className="w-full h-[50px] pl-11 pr-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#ff004f]/30 focus:bg-white transition-all text-[14px] font-medium"
                                        type="text"
                                        placeholder='Search Locality or Property Name...'
                                        value={searchVal}
                                        onChange={e => setSearchVal(e.target.value)}
                                    />
                                </div>

                                {/* Filter Toggle */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`h-[50px] px-5 cursor-pointer flex items-center gap-2 rounded-2xl border transition-all font-bold text-[13px]
                                        ${showFilters ? 'bg-[#ff004f] border-[#ff004f] text-white shadow-lg' : 'bg-white border-gray-100 text-gray-600 hover:border-[#ff004f]/20 hover:text-[#ff004f]'}`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="2" y1="14" x2="6" y2="14" /><line x1="10" y1="8" x2="14" y2="8" /><line x1="18" y1="16" x2="22" y2="16" /></svg>
                                    <span className="hidden md:inline">Filters</span>
                                </button>
                            </div>

                            {/* Nav Tabs Area */}
                            <div className="flex items-center justify-center lg:justify-end gap-1 w-full lg:w-auto px-1">
                                {navItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveTab(item.label)}
                                        className={`flex flex-col lg:flex-row items-center gap-2 px-3.5 py-2 rounded-[1.25rem] transition-all duration-400 relative group
                                            ${activeTab === item.label
                                                ? 'text-[#ff004f] bg-[#ff004f]/5'
                                                : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <div className={`relative transition-transform duration-300 group-hover:scale-110 
                                            ${item.isSpecial ? 'bg-gradient-to-tr from-[#ff004f] to-[#ff4d8d] p-1.5 rounded-xl text-white shadow-lg shadow-[#ff004f]/20' : ''}`}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                {item.icon}
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-black tracking-tight uppercase whitespace-nowrap">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Expanded Filter Panel */}
                        {showFilters && (
                            <div className="border-t border-gray-100 bg-gray-50/30 p-6 flex flex-col gap-8 animate-in slide-in-from-top duration-300">
                                <div>
                                    <h4 className="text-[12px] font-black text-[#ff004f] uppercase tracking-[0.2em] mb-6">Filter, Search & Discover Property</h4>

                                    {/* Filters Grid Section 3 */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-8">
                                        {[
                                            { label: 'Society Name', placeholder: 'Select Society' },
                                            { label: 'Locality', placeholder: 'Select Sector' },
                                            { label: 'Price Range', isPrice: true },
                                            { label: 'Property Status', placeholder: 'Ready / Under-const' },
                                            { label: 'Property Facing', placeholder: 'North / East...' },
                                            { label: 'Agent or PropNetra', placeholder: 'Select Option' },
                                            { label: 'Plot Size', placeholder: 'Sq. Yds' },
                                            { label: 'Super Area', placeholder: 'Sq. Ft' },
                                            { label: 'BHK Type', placeholder: '1, 2, 3+ BHK' }
                                        ].map((filter, i) => (
                                            <div key={i} className="flex flex-col gap-2">
                                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{filter.label}</label>
                                                {filter.isPrice ? (
                                                    <div className="flex flex-col gap-2 pt-2">
                                                        <div className="relative h-2 w-full bg-gray-200 rounded-full">
                                                            <div
                                                                className="absolute h-full bg-[#ff004f] rounded-full"
                                                                style={{
                                                                    left: `${(priceRange[0] / 1000) * 100}%`,
                                                                    right: `${100 - (priceRange[1] / 1000) * 100}%`
                                                                }}
                                                            ></div>
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="1000"
                                                                value={priceRange[0]}
                                                                onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value), priceRange[1]), priceRange[1]])}
                                                                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-10 custom-range-slider"
                                                            />
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="1000"
                                                                value={priceRange[1]}
                                                                onChange={(e) => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value), priceRange[0])])}
                                                                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-10 custom-range-slider"
                                                            />
                                                        </div>
                                                        <div className="flex justify-between text-[10px] font-bold text-gray-600 mt-1">
                                                            <span>₹{priceRange[0] >= 100 ? (priceRange[0] / 100).toFixed(1) + ' Cr' : priceRange[0] + ' L'}</span>
                                                            <span>₹{priceRange[1] >= 100 ? (priceRange[1] / 100).toFixed(1) + ' Cr' : priceRange[1] + ' L'}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        placeholder={filter.placeholder}
                                                        className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#ff004f]/30 transition-all placeholder:text-gray-300"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Checkboxes Section 4 */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex flex-wrap gap-6 items-center">
                                        {['Corner', 'Park Facing', 'Gated', 'Duplex Unit'].map((opt) => (
                                            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                                                <div className="relative flex items-center justify-center">
                                                    <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-[#ff004f] checked:border-[#ff004f] transition-all cursor-pointer" />
                                                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>
                                                </div>
                                                <span className="text-[13px] font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{opt}</span>
                                            </label>
                                        ))}

                                        <div className="flex-1"></div>

                                        <div className="flex items-center gap-3">
                                            <button className="px-6 py-2 text-[12px] font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">Reset</button>
                                            <button className="px-8 py-2.5 bg-gray-900 text-white rounded-xl text-[12px] font-black uppercase tracking-[0.15em] hover:bg-black transition-all shadow-lg">Apply Filters</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">All Inventories</h2>
                        <div className="flex items-center gap-1.5 bg-[#ff004f]/10 text-[#ff004f] px-2.5 py-1 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff004f] animate-pulse"></div>
                            <span className="text-[10px] font-black tracking-widest uppercase">Live</span>
                        </div>
                    </div>
                </div>

                {/* Promotional Banner - Redesigned Premium Version */}
                <div className="w-full h-[220px] md:h-[260px] rounded-3xl overflow-hidden relative flex items-center justify-between px-6 md:px-16 text-white shadow-2xl mt-4 group cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                    {/* Background Image with Parallax-like effect on hover */}
                    <img
                        src="/images/luxury_banner.png"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        alt="Luxury Living"
                    />

                    {/* Multi-layered Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-[1]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-[1]" />

                    {/* Left Content: Branding with Glassmorphism */}
                    <div className="z-10 flex flex-col gap-3 max-w-[50%]">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl flex items-center gap-4 md:gap-6 transform transition-transform group-hover:translate-x-2">
                            <div className="w-12 h-12 md:w-20 md:h-20 relative flex-shrink-0">
                                <div className="absolute inset-0 bg-[#f3d370] blur-2xl opacity-20 animate-pulse"></div>
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(243,211,112,0.6)] text-[#f3d370] fill-current relative z-10">
                                    <path d="M50 0 L58 38 L95 50 L58 62 L50 100 L42 62 L5 50 L42 38 Z" />
                                    <circle cx="50" cy="50" r="18" fill="rgba(0,0,0,0.3)" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-3xl md:text-[54px] font-serif text-[#f3d370] tracking-tight leading-none drop-shadow-2xl">ONE DREAM</h2>
                                <div className="flex items-center gap-2 mt-1 md:mt-2">
                                    <span className="h-[1px] w-6 md:w-10 bg-[#f3d370]/50"></span>
                                    <p className="text-[8px] md:text-[11px] tracking-[0.35em] uppercase text-white/90 font-bold whitespace-nowrap">Space Creators</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content: Details */}
                    <div className="z-10 flex flex-col items-end text-right">
                        <div className="mb-2 space-y-1">
                            <span className="px-3 py-1 bg-[#f3d370] text-black rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-black mb-2 inline-block shadow-lg">New Launch</span>
                            <h3 className="text-xl md:text-[36px] font-light text-white leading-tight">Luxury Living</h3>
                            <h4 className="text-base md:text-[24px] font-bold text-white/80 leading-tight">Golf Course Extn.</h4>
                        </div>

                        <div className="mt-3 px-5 py-2.5 bg-[#f3d370] text-black font-black text-base md:text-2xl rounded-xl shadow-[0_10px_25px_rgba(243,211,112,0.4)] transform transition-all group-hover:scale-105 group-hover:-rotate-1">
                            3.99 Cr* <span className="text-[10px] md:text-sm font-bold uppercase opacity-70 ml-1">Onwards</span>
                        </div>
                    </div>

                    {/* Badge: Earn Up To */}
                    <div className="absolute -bottom-1 right-[40%]  bg-white text-black px-5 md:px-8 py-3 md:py-4 rounded-t-2xl font-bold z-20 flex flex-col items-center shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
                        <span className="text-[10px] md:text-[12px] uppercase font-bold leading-tight tracking-wider text-black/50">Commission</span>
                        <span className="text-xl md:text-3xl leading-none font-black text-[#ff004f]">15 Lacs*</span>
                    </div>

                    {/* Subtle light streak effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-[2]"></div>
                </div>

                {/* Categories 4-grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {[
                        { title: 'New Launches', count: '155 Projects', img: 'https://cdn-icons-png.flaticon.com/512/2605/2605202.png' },
                        { title: 'Floors & Resale', count: '26940 Properties', img: 'https://cdn-icons-png.flaticon.com/512/2558/2558066.png' },
                        { title: 'Builder Floors', count: '7193 Properties', img: 'https://cdn-icons-png.flaticon.com/512/2237/2237691.png' },
                        { title: 'Top Deals', count: '10 Projects', img: 'https://cdn-icons-png.flaticon.com/512/2956/2956820.png', badge: true }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] rounded-2xl p-5 md:p-6 flex items-start justify-between hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all cursor-pointer group">
                            <div className="flex flex-col gap-1 z-10">
                                <h4 className="font-semibold text-gray-800 text-[15px]">{item.title}</h4>
                                <p className="text-[#ff004f] text-[13px] font-bold">{item.count}</p>
                            </div>
                            <div className="relative w-12 h-12 ml-2 transition-transform duration-500 group-hover:-translate-y-1">
                                <img src={item.img} className="w-full h-full object-contain" alt="" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upcoming Projects - Custom Circular Design */}
                <div className="flex flex-col mt-6 mb-4">
                    <div className="flex justify-between items-end mb-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl md:text-[22px] font-black text-gray-900 tracking-tight">Coming Soon Projects</h3>
                            <p className="text-[12px] text-gray-500 font-medium">Get early access to premium developer projects</p>
                        </div>
                    </div>

                    <div className="flex gap-5 md:gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                        {[
                            { brand: '/dev/1.png', sector: 'Sector 88A' },
                            { brand: '/dev/2.png', sector: 'Sector 90' },
                            { brand: '/dev/3.png', sector: 'Sector 36A' },
                            { brand: '/dev/4.png', sector: 'Sector 113' },
                            { brand: '/dev/5.png', sector: 'Sector 36A' },
                            { brand: '/dev/6.png', sector: 'Sector 63A' },
                            { brand: '/dev/7.png', sector: 'Sector 49' },
                            { brand: '/dev/8.png', sector: 'Sector 48' },
                            { brand: '/dev/9.png', sector: 'Sector 103' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3 min-w-[75px] md:min-w-[85px] cursor-pointer group">
                                <div className="w-[75px] h-[75px] md:w-[85px] md:h-[85px] rounded-full p-[2px] bg-gradient-to-tr from-gray-200 to-gray-100 group-hover:from-[#ff004f] group-hover:to-[#8b5cf6] shadow-sm group-hover:shadow-lg group-hover:shadow-[#ff004f]/20 transition-all duration-500 group-hover:-translate-y-1.5">
                                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-2.5 overflow-hidden relative">
                                        <img className="w-full h-full object-contain" src={item.brand} alt={item.sector} />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-[12px] text-gray-800 font-bold truncate w-full text-center group-hover:text-[#ff004f] transition-colors">{item.sector}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Trending Projects */}
                <div className="flex flex-col gap-6 mt-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Top Trending Projects</h3>
                            <p className="text-[13px] text-gray-400 mt-1 font-medium">Hot Picks in the Market Right Now</p>
                        </div>
                        <button className="text-[#ff004f] text-xs font-bold border border-[#ff004f]/20 px-4 py-1.5 rounded-full hover:bg-[#ff004f]/5 transition-colors flex items-center gap-1">
                            View All <span>&gt;</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'AIPL Joy District', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600' },
                            { name: 'AIPL Riviera', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600' },
                            { name: 'HopUp PreLeased', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600' },
                            { name: 'M3M Altitude', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600' }
                        ].map((prop, idx) => (
                            <div key={idx} className="flex flex-col gap-3 cursor-pointer group bg-white p-3 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="rounded-2xl overflow-hidden relative h-[180px]">
                                    <img src={prop.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={prop.name} />
                                    <div className="absolute top-3 left-3 bg-[#111] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-sm">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white px-2 py-0.5 rounded text-[10px] font-black text-gray-800 shadow-sm uppercase tracking-wide">
                                        {prop.name.split(' ')[0]}
                                    </div>
                                </div>
                                <div className="font-bold text-gray-900 text-sm px-1 mb-1">{prop.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Explore Categories - Custom Design */}
                <div className="flex flex-col mt-10">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                            <span className="luxury-reveal eyebrow-gold text-left" style={{ width: 'fit-content' }}>Inventory</span>
                            <h2 className="title-reveal-large">
                                Explore <span className="gradent_text_color">Categories</span>
                            </h2>
                        </div>
                        <button className="hidden md:flex text-gray-600 text-[13px] font-bold hover:text-gray-900 transition-colors items-center gap-1 group">
                            All Categories <span className="group-hover:translate-x-1 transition-transform duration-300">-&gt;</span>
                        </button>
                    </div>

                    {/* Category Pills Row */}
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 mt-6">
                        {[
                            { name: 'Apartments', icon: <path d="M4 22V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14M8 22V12h8v10M12 12v10M8 6h8M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" /> },
                            { name: 'Builder Floors', icon: <path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18M8 22V10h8v12M12 10v12M8 6h8" /> },
                            { name: 'Luxury Villas', icon: <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" /> },
                            { name: 'Plots & Land', icon: <path d="M3 21h18M4 21V11l8-6 8 6v10M9 21v-4a3 3 0 0 1 6 0v4M9 7v4M15 7v4" /> },
                            { name: 'Commercial', icon: <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M10 22V12h4v10M12 12v10M10 6h4M10 9h4" /> }
                        ].map((cat, i) => (
                            <button key={cat.name} className={`flex items-center gap-2 px-4 py-2.5 rounded-full border whitespace-nowrap transition-all ${i === 0
                                ? 'bg-gray-900 border-gray-900 text-white shadow-md'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm'
                                }`}>
                                <svg className={i === 0 ? 'text-white' : 'text-gray-400'} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {cat.icon}
                                </svg>
                                <span className="text-[13px] font-bold">{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Premium Project Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
                        {[
                            { name: 'M3M The Cullinan', label: 'Premium', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600', logo: 'M3M' },
                            { name: 'Cloverdale by SG', label: 'New Launch', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600', logo: 'SIG. GLOBAL' },
                            { name: 'DXP Estate', label: 'Hot Deal', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600', logo: 'SIG. GLOBAL' },
                            { name: 'Godrej Alira', label: 'Luxury', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600', logo: 'GODREJ' }
                        ].map((proj, idx) => (
                            <div key={idx} className="group relative rounded-[1.5rem] overflow-hidden cursor-pointer h-[260px] shadow-sm border border-gray-100 bg-gray-50">
                                <img src={proj.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={proj.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Logo Tag Top Right */}
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 px-2.5 py-1.5 rounded-lg text-white text-[9px] font-black tracking-widest uppercase">
                                    {proj.logo}
                                </div>

                                {/* Info Bottom */}
                                <div className="absolute bottom-4 left-4 right-4 transform transition-transform duration-500 group-hover:-translate-y-1">
                                    <div className="inline-block px-2 py-1 mb-2 bg-[#ff004f]/90 text-white text-[9px] font-bold uppercase tracking-wider rounded border border-[#ff004f]/50">
                                        {proj.label}
                                    </div>
                                    <h4 className="text-white font-black text-xl leading-tight mb-1">{proj.name}</h4>
                                    <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-medium">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        View Project Details
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Explore the City - Interactive Banner */}
                <div className="relative rounded-[2rem] overflow-hidden bg-[#111] mt-12 mb-12 h-[220px] md:h-[260px] group cursor-pointer shadow-lg shadow-gray-900/10">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" alt="Map Overlay" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>

                    <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 w-max mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Smart Maps
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Gurgaon Micro-Markets</h3>
                        <p className="text-gray-300 text-sm font-medium mb-6 leading-relaxed max-w-sm">Access deep location insights and neighborhood metrics designed to help you sell faster.</p>

                        <div className="flex items-center gap-3">
                            <button className="bg-white text-gray-900 text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                                Open Map View
                            </button>
                            <div className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-white/10 transition-colors">
                                <svg className="group-hover:translate-x-0.5 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
