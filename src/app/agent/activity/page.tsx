'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Search, Bell, MapPin, Filter, Bookmark, ChevronRight,
    Clock, CheckCircle2, AlertCircle, TrendingUp, User
} from 'lucide-react';

export default function ActivityPage() {
    const activities = [
        {
            id: 1,
            type: 'Plot',
            title: 'South City 1, Gurgaon',
            size: '360 SQ. YD',
            price: '₹ 14.40 CR',
            badge: 'RA',
            badgeColor: 'bg-[#4CAF50]', // green
            owner: 'By Owner',
            image: '/images/modal-property.png'
        },
        {
            id: 2,
            type: 'Plot',
            title: 'BPTP Astaire Gardens, Gurgaon',
            size: '347 SQ. YD',
            price: '₹ 9.54 CR',
            badge: 'D',
            badgeColor: 'bg-[#D2C6B6]', // beige/brown
            owner: 'By Owner',
            image: '/images/luxury_banner.png'
        },
        {
            id: 3,
            type: 'Plot',
            title: 'G99, Gurgaon',
            size: '426 SQ. YD',
            price: '₹ 10.65 CR',
            badge: 'V',
            badgeColor: 'bg-[#D32F2F]', // red
            owner: 'By Owner',
            image: '/images/city-skyline.png'
        },
        {
            id: 4,
            type: 'Plot',
            title: 'DLF Phase 3, Gurgaon',
            size: '60 SQ. YD',
            price: '₹ 2.25 CR',
            badge: 'V',
            badgeColor: 'bg-[#D32F2F]', // red
            owner: 'By Owner',
            image: '/images/login-bg.png'
        }
    ];

    const [activeTab, setActiveTab] = useState('views');
    const [activeFilter, setActiveFilter] = useState('All');

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans selection:bg-primary/10">
            {/* Page Banner */}
            <div className="relative h-60 w-full overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
                <Image
                    src="/images/luxury_banner.png"
                    alt="Banner"
                    fill
                    className="object-cover opacity-[0.10] grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>

                <div className="relative z-10 text-center px-10 mt-10">
                    <h2 className="agent-hero font-normal text-slate-900 mb-2" style={{ fontFamily: "WastedVindey, serif" }}>
                        Recent <span className="gradent_text_color">Activities</span>
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-px bg-slate-200"></div>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-[0.4em]">Explore your recent history</p>
                        <div className="w-12 h-px bg-slate-200"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-10">

                {/* Top Status Bar (Requested from Red Text) */}
                <div className="flex flex-wrap items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 mb-8 shadow-sm">
                    <div className="flex flex-wrap gap-8">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-slate-400" />
                            <span className="agent-meta font-bold text-slate-500 uppercase tracking-widest">Last Login:</span>
                            <span className="agent-meta font-black text-slate-900">Today, 09:42 AM</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-slate-400" />
                            <span className="agent-meta font-bold text-slate-500 uppercase tracking-widest">Active Region:</span>
                            <span className="agent-meta font-black text-slate-900">Gurgaon</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-slate-400" />
                            <span className="agent-meta font-bold text-slate-500 uppercase tracking-widest">Profile Status:</span>
                            <span className="agent-meta font-black text-green-600">Verified</span>
                        </div>
                    </div>
                </div>



                {/* Filters & Tabs */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm mb-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Left Side: Search & Tabs */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 agent-meta font-bold text-slate-700 focus:outline-none focus:border-slate-900 transition-colors w-full md:min-w-48"
                                />
                            </div>
                            <button
                                onClick={() => setActiveTab('views')}
                                className={`cursor-pointer px-5 py-2 rounded-xl border agent-small font-black uppercase tracking-widest transition-all ${activeTab === 'views' ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'}`}
                            >
                                Views (37)
                            </button>
                            <button
                                onClick={() => setActiveTab('contacted')}
                                className={`cursor-pointer px-5 py-2 rounded-xl border agent-small font-black uppercase tracking-widest transition-all ${activeTab === 'contacted' ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'}`}
                            >
                                Contacted (7)
                            </button>
                        </div>

                        {/* Right Side: Detailed Filter Selection */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pr-2">
                            {[
                                "All", "Resale Listing", "Direct Builder Floors",
                                "Mandate Listing", "Buyer Requirement", "Developer Project"
                            ].map((filter) => (
                                <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="activityFilter"
                                            className="peer sr-only"
                                            checked={activeFilter === filter}
                                            onChange={() => setActiveFilter(filter)}
                                        />
                                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 peer-checked:border-slate-900 transition-colors"></div>
                                        <div className="w-2 h-2 rounded-full bg-slate-900 absolute opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                    </div>
                                    <span className={`agent-meta uppercase tracking-widest transition-colors ${activeFilter === filter
                                        ? 'font-black text-slate-900'
                                        : 'font-bold text-slate-400 group-hover:text-slate-600'
                                        }`}>
                                        {filter}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activities.map((card) => (
                        <div key={card.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Card Image Area */}
                            <div className="relative h-48 bg-slate-200 overflow-hidden">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                                {/* Top Badges */}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md shadow-sm">
                                    <span className="agent-small font-black text-slate-800 uppercase tracking-wider">{card.type}</span>
                                </div>
                                <div className="absolute top-4 right-4 text-red-600 bg-white/90 backdrop-blur-md p-1.5 rounded-md shadow-sm cursor-pointer hover:bg-white transition-colors">
                                    <Bookmark size={16} fill="currentColor" />
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 pt-8 flex-1 flex flex-col bg-[#FDFDFD] relative">
                                {/* Circular overlapping badge */}
                                <div className={`absolute -top-6 right-6 w-12 h-12 rounded-full border-[3px] border-white flex items-center justify-center text-white font-black agent-body shadow-md z-20 ${card.badgeColor}`}>
                                    {card.badge}
                                </div>
                                <h4 className="font-bold text-slate-800 agent-body leading-snug mb-1">{card.title}</h4>
                                <p className="agent-meta font-bold text-slate-400 uppercase tracking-wider mb-3">{card.size}</p>
                                <p className="agent-h3 font-black text-slate-900 mb-6">{card.price}</p>

                                <div className="mt-auto border-t border-dashed border-slate-200 pt-4 flex justify-end">
                                    <span className="agent-tiny font-black text-slate-400 uppercase tracking-widest">{card.owner}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
