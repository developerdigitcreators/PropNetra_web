'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Search, ChevronDown, Bell, User, MapPin, Grid, List, 
    Filter, Share2, Heart, ExternalLink, Calendar, 
    Maximize2, Info, ArrowRight, Phone, MessageSquare,
    Compass, Home, Layers, Eye, PlusCircle, ChevronRight, Star,
    Edit3, Trash2, MoreHorizontal, CheckCircle2, Clock, AlertCircle
} from 'lucide-react';

export default function MyListingsPage() {
    const [viewType, setViewType] = useState('grid');
    const [activeTab, setActiveTab] = useState('all');

    const stats = [
        { label: 'Total Listings', value: '42', icon: <Layers size={18} />, color: 'text-slate-900' },
        { label: 'Active', value: '28', icon: <CheckCircle2 size={18} />, color: 'text-green-600' },
        { label: 'Pending', value: '8', icon: <Clock size={18} />, color: 'text-amber-600' },
        { label: 'Sold/Closed', value: '6', icon: <Award size={18} />, color: 'text-blue-600' }
    ];

    const listings = [
        {
            id: 1,
            title: "2 BHK, Huda, Sector 57, Gurgaon",
            type: "Builder Floor",
            price: "₹1.47 Cr",
            status: "Active",
            views: 1240,
            inquiries: 42,
            updated: "2 hours ago",
            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"
        },
        {
            id: 2,
            title: "3 BHK, M3M Crown, Sector 113",
            type: "Apartment",
            price: "₹3.20 Cr",
            status: "Pending",
            views: 850,
            inquiries: 15,
            updated: "5 hours ago",
            img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000"
        },
        {
            id: 3,
            title: "4 BHK, DLF Crest, Sector 54",
            type: "Penthouse",
            price: "₹12.50 Cr",
            status: "Active",
            views: 3100,
            inquiries: 89,
            updated: "1 day ago",
            img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000"
        },
        {
            id: 4,
            title: "Plot, BPTP Amstoria, Sector 102",
            type: "Residential Plot",
            price: "₹4.15 Cr",
            status: "Sold",
            views: 560,
            inquiries: 12,
            updated: "3 days ago",
            img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000"
        }
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-50 text-green-600 border-green-100';
            case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Sold': return 'bg-slate-900 text-white border-slate-900';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary/10 pb-20">
            {/* Header / Nav Space */}
            <div className="h-24 bg-white border-b border-slate-50"></div>

            {/* Hero Section */}
            <div className="relative pt-12 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/50 -z-10"></div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10"></div>
                
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Link href="/agent/profile" className="agent-small font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Profile</Link>
                                <ChevronRight size={12} className="text-slate-300" />
                                <span className="agent-small font-black text-slate-900 uppercase tracking-widest">My Listings</span>
                            </div>
                            <h1 className="agent-hero font-normal text-slate-900 leading-none mb-4" style={{ fontFamily: "WastedVindey, serif" }}>
                                Inventory <span className="gradent_text_color">Dashboard</span>
                            </h1>
                            <p className="text-slate-500 agent-body font-medium max-w-xl">Manage your active listings, track performance, and close deals faster with our advanced inventory tools.</p>
                        </div>
                        <button className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] agent-meta font-black uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center gap-4 shadow-2xl group active:scale-95">
                            <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                            Add New Listing
                        </button>
                    </div>

                    {/* Stats Grid - Constrained Width */}
                    <div className="max-w-5xl">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white rounded-[2rem] border-3 border-slate-900/10 p-6 hover:border-slate-900 transition-all shadow-sm group">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            {React.cloneElement(stat.icon, { size: 16 })}
                                        </div>
                                        <ArrowRight size={14} className="text-slate-200 group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className={`agent-h2 font-black ${stat.color} tracking-tighter`}>{stat.value}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 -mt-12 relative z-20">
                {/* Filter & Search Bar - Standardized Borders */}
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-900/10 p-4 border-2 border-slate-900/10 hover:border-slate-900 transition-all mb-12 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 relative w-full group/search">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover/search:text-primary transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search your listings by title, sector, or ID..." 
                            className="w-full pl-16 pr-8 py-4 bg-slate-50 rounded-2xl agent-body font-medium border border-slate-200 focus:border-primary/50 focus:bg-white transition-all outline-none shadow-sm"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'active', label: 'Active' },
                                { id: 'pending', label: 'Pending' },
                                { id: 'sold', label: 'Sold' }
                            ].map((tab) => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-2.5 rounded-xl agent-tiny font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                            <button 
                                onClick={() => setViewType('grid')}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${viewType === 'grid' ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-400'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button 
                                onClick={() => setViewType('list')}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${viewType === 'list' ? 'bg-white text-slate-900 shadow-md border border-slate-100' : 'text-slate-400'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Listings Display */}
                <div className={`grid gap-6 ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                    {listings.map((listing) => (
                        <div key={listing.id} className={`bg-white rounded-[2rem] border-2 border-slate-900/5 hover:border-slate-900 transition-all duration-700 overflow-hidden group shadow-sm hover:shadow-2xl hover:-translate-y-1 flex ${viewType === 'list' ? 'flex-row' : 'flex-col'}`}>
                            {/* Image Section */}
                            <div className={`relative overflow-hidden ${viewType === 'list' ? 'w-60 h-auto' : 'w-full h-44'}`}>
                                <img src={listing.img} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt={listing.title} />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className={`px-3 py-1 rounded-lg agent-tiny font-black uppercase tracking-widest border shadow-sm ${getStatusStyles(listing.status)}`}>
                                        {listing.status}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity translate-y-3 group-hover:translate-y-0 duration-500">
                                    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all cursor-pointer">
                                        <Edit3 size={14} />
                                    </div>
                                    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                                        <Trash2 size={14} />
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="agent-tiny font-black text-primary uppercase tracking-[0.2em]">{listing.type}</span>
                                        <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">ID: #PN-{listing.id}</span>
                                    </div>
                                    <h3 className="agent-h4 font-black text-slate-900 mb-1 group-hover:text-primary transition-colors cursor-pointer leading-tight tracking-tighter truncate">{listing.title}</h3>
                                    <p className="agent-h2 font-black text-slate-900 tracking-tighter mb-4">{listing.price}</p>
                                    
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 group-hover:bg-white transition-colors">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <Eye size={12} className="text-blue-500" />
                                                <span className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Views</span>
                                            </div>
                                            <p className="agent-body font-black text-slate-900">{listing.views.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 group-hover:bg-white transition-colors">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <MessageSquare size={12} className="text-amber-500" />
                                                <span className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Leads</span>
                                            </div>
                                            <p className="agent-body font-black text-slate-900">{listing.inquiries}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={10} className="text-slate-300" />
                                        <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">{listing.updated}</span>
                                    </div>
                                    <button className="flex items-center gap-1.5 agent-tiny font-black text-slate-900 uppercase tracking-widest hover:text-primary transition-colors">
                                        Stats <ArrowRight size={10} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State / Add More */}
                <div className="mt-12 py-16 bg-slate-50 border-3 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center text-center px-8">
                    <div className="w-16 h-16 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-slate-300 mb-6">
                        <PlusCircle size={32} />
                    </div>
                    <h3 className="agent-h2 font-normal text-slate-900 mb-2" style={{ fontFamily: "WastedVindey, serif" }}>Grow Your <span className="gradent_text_color">Portfolio</span></h3>
                    <p className="text-slate-500 agent-body font-medium max-w-sm mb-8">Add more properties to your dashboard to increase your visibility and attract premium buyers.</p>
                    <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl agent-small font-black uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center gap-3">
                        <PlusCircle size={16} /> Create New Listing
                    </button>
                </div>
            </div>
        </div>
    );
}

function Award({ size, className }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
    );
}
