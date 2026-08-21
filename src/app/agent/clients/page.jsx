'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { 
    Search, ArrowLeft, Home, MoreVertical, 
    Bookmark, Plus, Share2, X, ChevronRight,
    MapPin, Calendar, Heart, Share, ExternalLink,
    Zap, Eye, PhoneCall, LayoutGrid, List
} from 'lucide-react';

export default function SavedListingsPage() {
    const [activeView, setActiveView] = useState('collections'); // 'collections' or 'detail'
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const gridRef = useRef(null);

    const collections = [
        { id: 1, name: 'All Saved Posts', count: 24, image: '/images/modal-property.png', isGeneric: true },
        { id: 2, name: 'Rajesh', count: 5, image: '/images/luxury_banner.png', isGeneric: false },
        { id: 3, name: 'Vikram Portfolio', count: 8, image: '/images/city-skyline.png', isGeneric: false },
        { id: 4, name: 'Amit Kumar', count: 3, image: '/images/modal-property.png', isGeneric: false },
        { id: 5, name: 'Luxury Seekers', count: 12, image: '/images/luxury_banner.png', isGeneric: false },
        { id: 6, name: 'Golf Course Plots', count: 7, image: '/images/city-skyline.png', isGeneric: false },
    ];

    const properties = [
        { 
            id: 101, 
            title: "Spiti Homes Sector 99A, Gurgaon", 
            price: "₹ 2.10 - 2.30 CR", 
            details: "3BHK, 160 SQ. YD",
            floors: "Floors - 1st,2nd,3rd,4th",
            location: "Sector 99A, Gurgaon",
            image: "/images/modal-property.png",
            tag: "Floor",
        },
        { 
            id: 102, 
            title: "BPTP Astaire Gardens", 
            price: "₹ 9.54 CR", 
            details: "4BHK + Utility, 350 SQ. YD",
            floors: "Floors - Ground, 1st, 2nd",
            location: "Sector 70A, Gurgaon",
            image: "/images/luxury_banner.png",
            tag: "Luxury",
        }
    ];

    useEffect(() => {
        if (activeView === 'collections' && gridRef.current) {
            gsap.fromTo(".collection-card", 
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
        }
    }, [activeView]);

    const handleCardClick = (col) => {
        setSelectedCollection(col);
        setActiveView('detail');
    };

    const handleBack = () => {
        if (activeView === 'detail') {
            setActiveView('collections');
            setSelectedCollection(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/30 selection:bg-primary/10">
            {/* Page Banner */}
            <div className="relative h-48 w-full overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
                <Image 
                    src="/images/luxury_banner.png" 
                    alt="Banner" 
                    fill 
                    className="object-cover opacity-[0.03] grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
                
                <div className="relative mt-20 z-10 text-center px-10">
                    <h2 className="agent-hero font-normal text-slate-900 mb-2" style={{ fontFamily: "WastedVindey, serif" }}>
                        Saved <span className="gradent_text_color">Listings</span>
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-px bg-slate-200"></div>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-[0.4em]">Curate & Share</p>
                        <div className="w-12 h-px bg-slate-200"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {activeView === 'collections' ? (
                    <div ref={gridRef}>
                        {/* Top Actions Row */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
                            <button 
                                onClick={() => setIsNewModalOpen(true)}
                                className="flex items-center gap-4 px-10 py-5 bg-white border border-slate-100 rounded-2xl shadow-md hover:shadow-2xl transition-all group active:scale-95"
                            >
                                <div className="bg-red-500 text-white p-3 rounded-xl group-hover:rotate-12 transition-transform">
                                    <Bookmark size={20} fill="currentColor" />
                                </div>
                                <span className="agent-meta font-black text-slate-900 uppercase tracking-widest">Make A New Client List</span>
                            </button>

                            {/* Dashboard Stats */}
                            <div className="flex items-center gap-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-md transition-all hover:shadow-lg">
                                <div className="flex items-center gap-4 px-6 py-2 hover:bg-slate-50 rounded-xl transition-colors cursor-help group">
                                    <Zap size={18} className="text-amber-500 group-hover:scale-125 transition-transform" fill="currentColor" />
                                    <div className="flex flex-col">
                                        <span className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Search</span>
                                        <span className="agent-body font-black text-slate-900 italic">02</span>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-slate-100"></div>
                                <div className="flex items-center gap-4 px-6 py-2 hover:bg-slate-50 rounded-xl transition-colors cursor-help group">
                                    <Eye size={18} className="text-blue-500 group-hover:scale-125 transition-transform" />
                                    <div className="flex flex-col">
                                        <span className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Views</span>
                                        <span className="agent-body font-black text-slate-900 italic">02</span>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-slate-100"></div>
                                <div className="flex items-center gap-4 px-6 py-2 hover:bg-slate-50 rounded-xl transition-colors cursor-help group">
                                    <PhoneCall size={18} className="text-green-500 group-hover:scale-125 transition-transform" fill="currentColor" />
                                    <div className="flex flex-col">
                                        <span className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Contact</span>
                                        <span className="agent-body font-black text-slate-900 italic">02</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Collections Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {collections.map((col) => (
                                <div 
                                    key={col.id}
                                    onClick={() => handleCardClick(col)}
                                    className="collection-card bg-white rounded-2xl border border-slate-100 p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex items-center gap-5 relative overflow-hidden"
                                >
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-50">
                                        <Image src={col.image} alt={col.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="agent-h4 font-black text-slate-900 truncate tracking-tight mb-1">{col.name}</h3>
                                        <p className="agent-small font-bold text-slate-400 uppercase tracking-widest">{col.count} Items Saved</p>
                                    </div>
                                    
                                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Detailed View - REDESIGNED PROPERTY CARDS */
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-12 pb-8 border-b border-slate-100">
                            <div className="flex items-center gap-6">
                                <button onClick={handleBack} className="p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-md">
                                    <ArrowLeft size={20} />
                                </button>
                                <div>
                                    <h2 className="agent-h1 font-black text-slate-900 tracking-tight">{selectedCollection?.name}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {properties.map((prop) => (
                                <div key={prop.id} className="bg-white rounded-2xl shadow-md border border-slate-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden flex flex-col relative">
                                    {/* Top Image Section */}
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <Image src={prop.image} alt={prop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        
                                        {/* Tag */}
                                        <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-md shadow-sm">
                                            <span className="agent-meta font-black text-white uppercase tracking-widest">{prop.tag}</span>
                                        </div>

                                        {/* Bookmark */}
                                        <div className="absolute top-0 right-4 h-12 w-8 bg-red-500 flex items-center justify-center rounded-b-md shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                                            <Bookmark size={16} className="text-white" fill="currentColor" />
                                        </div>

                                        {/* Platinum Club Badge */}
                                        {prop.isPlatinum && (
                                            <div className="absolute bottom-[-30px] right-4 w-24 h-24 bg-white rounded-full p-1.5 shadow-xl border border-amber-400/30 z-10 flex items-center justify-center">
                                                <div className="w-full h-full rounded-full border border-amber-400 flex flex-col items-center justify-center text-center p-2">
                                                    <span className="agent-tiny font-black text-slate-900 leading-none mb-0.5 tracking-tighter">PLATINUM</span>
                                                    <span className="agent-tiny font-black text-slate-900 leading-none tracking-tighter">CLUB</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 pt-10 flex-1 flex flex-col">
                                        <h4 className="agent-h4 font-bold text-slate-900 leading-tight mb-3 pr-8">{prop.title}</h4>
                                        
                                        <div className="flex flex-col gap-1 mb-4">
                                            <p className="agent-meta font-medium text-slate-500">{prop.details}</p>
                                            <p className="agent-meta font-medium text-slate-600">{prop.floors}</p>
                                        </div>

                                        <p className="agent-h3 font-bold text-slate-900 mb-6">{prop.price}</p>

                                        {/* Dashed Separator */}
                                        <div className="border-t border-dashed border-slate-200 mt-auto pt-3 flex justify-end">
                                            <span className="agent-meta font-medium text-slate-400 italic">By Builder</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* New Collection Modal */}
            {isNewModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsNewModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 p-10 border border-slate-100">
                        <button onClick={() => setIsNewModalOpen(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors">
                            <X size={20} />
                        </button>
                        <h2 className="agent-h4 font-black text-slate-900 text-center mb-8 uppercase tracking-widest">New collection</h2>
                        <div className="flex flex-col gap-3 mb-10">
                            <label className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Collection name</label>
                            <input 
                                type="text" 
                                value={newCollectionName}
                                onChange={(e) => setNewCollectionName(e.target.value)}
                                placeholder="Enter collection name"
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl agent-meta font-bold outline-none focus:border-slate-900 transition-all"
                            />
                        </div>
                        <button 
                            onClick={() => setIsNewModalOpen(false)}
                            className="w-full py-4 bg-slate-900 text-white rounded-xl agent-small font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                        >
                            Save Collection
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
