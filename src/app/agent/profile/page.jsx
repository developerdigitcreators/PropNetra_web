'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search, Bell, User, MapPin, Grid, List,
    Filter, Share2, Heart, ExternalLink, Calendar,
    Maximize2, Info, ArrowRight, Phone, MessageSquare,
    Compass, Home, Layers, Eye, PlusCircle, Star, ChevronRight,
    Settings, ShieldCheck, Mail, LogOut, Edit3, Award,
    CheckCircle2, Clock, Zap, Crown, Rocket, Target, Users,
    AlertCircle, Gift, Globe, Send, Camera, Play, CircleCheck
} from 'lucide-react';
import ReferFooter from '@/components/ReferFooter';

export default function ProfilePage() {
    const reviews = [
        { name: "Rahul Sharma", rating: 5, date: "2 days ago", comment: "Abhishek is truly an expert in the Gurgaon luxury market. He helped us secure our dream home at DLF Crest with incredible professional insight." },
        { name: "Priya Mehta", rating: 5, date: "1 week ago", comment: "The most transparent and data-driven agent I have worked with. His knowledge of SPR Road sectors is unmatched." },
        { name: "Vikram Singh", rating: 4, date: "1 month ago", comment: "Excellent service and attention to detail. Made the entire documentation process seamless." }
    ];

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary/10">
            {/* Nav Space Holder */}
            <div className="h-24 bg-white"></div>

            <main className="w-full section-padding py-12 space-y-12">
                {/* Hero Header Card - Top Section */}
                <div className="relative bg-white rounded-[3.5rem] border-4 border-slate-900 p-8 md:p-12 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>

                    {/* Profile Score Badge - Top Right on Desktop, Flow on Mobile */}
                    <div className="md:absolute top-10 right-10 flex flex-col items-center gap-2 mb-8 md:mb-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative bg-white shadow-xl border-2 border-slate-900/5">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="34" className="stroke-slate-100 fill-none" strokeWidth="6" />
                                <circle
                                    cx="40" cy="40" r="34"
                                    className="stroke-primary fill-none transition-all duration-1000 ease-out"
                                    strokeWidth="6"
                                    strokeDasharray="213.6"
                                    strokeDashoffset="32"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="absolute agent-body font-black text-slate-900 tracking-tighter">85%</span>
                        </div>
                        <p className="agent-tiny font-black uppercase tracking-[0.3em] text-slate-400">Profile Score</p>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        {/* Profile Image with verification badge */}
                        <div className="relative group">
                            <div className="w-44 h-44 md:w-56 md:h-56 rounded-[3rem] overflow-hidden border-4 border-slate-900 shadow-2xl relative">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400" className="w-full h-full object-cover" alt="Abhishek Goldy" />
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-900/10">
                                    <span className="agent-tiny font-black uppercase tracking-widest text-slate-900 whitespace-nowrap">For ID Verification only</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                                <Edit3 size={16} />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                                <h1 className="agent-hero font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>
                                    Abhishek <span className="text-primary italic">Goldy</span>
                                </h1>
                                <div className="px-6 py-2.5 bg-slate-900 text-white rounded-full agent-small font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-2xl border border-white/10">
                                    <ShieldCheck size={16} className="text-primary" />
                                    Elite Partner
                                </div>
                            </div>
                            <p className="text-slate-500 agent-body font-medium mb-10 max-w-2xl leading-relaxed">
                                Senior Property Consultant & Strategic Investment Advisor with 12+ years of expertise in Gurgaon's premium luxury markets.
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
                                <Link href="/agent/listings" className="px-10 py-4 bg-slate-900 text-white rounded-2xl agent-small font-black uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center gap-3 shadow-2xl">
                                    <List size={18} /> My Listings
                                </Link>
                                <Link href="/agent/team" className="px-10 py-4 bg-white border-2 border-slate-900/10 text-slate-900 rounded-2xl agent-small font-black uppercase tracking-[0.2em] hover:border-slate-900 transition-all flex items-center gap-3">
                                    <Users size={18} /> Manage Team
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sign Out - Bottom Right of Card on Desktop, Bottom Center on Mobile */}
                    <button className="md:absolute bottom-10 right-12 mt-12 md:mt-0 flex items-center justify-center gap-2 agent-tiny font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors group w-full md:w-auto">
                        <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" /> Sign Out Account
                    </button>
                </div>

                {/* Middle Section: Contact, Stats, Membership */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                    {/* Contact Details Card */}
                    <div className="h-min bg-white rounded-[2.5rem] border-2 border-slate-900/5 p-8 py-3 shadow-xl hover:border-primary transition-all relative group">
                        <div className='flex items-center justify-between mb-3'>
                            <h3 className="agent-h2 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>Contact Details</h3>
                            <button className="cursor-pointer px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg agent-tiny font-black uppercase tracking-widest text-slate-500 hover:bg-white hover:border-slate-900 hover:text-slate-900 transition-all">Edit</button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-slate-100">
                                    <Mail size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Official Email</p>
                                        <span className="flex items-center gap-1 agent-tiny font-black uppercase text-green-500 bg-green-50 px-2 py-0.5 rounded-full border border-green-100"><CheckCircle2 size={10} /> Verified</span>
                                    </div>
                                    <p className="agent-body font-bold text-slate-900">abhishek@propnetra.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-slate-100">
                                    <Phone size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                                        <span className="flex items-center gap-1 agent-tiny font-black uppercase text-green-500 bg-green-50 px-2 py-0.5 rounded-full border border-green-100"><CheckCircle2 size={10} /> Verified</span>
                                    </div>
                                    <p className="agent-body font-bold text-slate-900">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-slate-100">
                                    <MapPin size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-1">Office Address</p>
                                    <p className="agent-body font-bold text-slate-900">Cyber Hub, Phase 2, Gurgaon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid - Transparent background layout */}
                    <div className="bg-white rounded-[2.5rem] flex flex-col justify-between border-2 border-slate-900/5 p-8 py-4 shadow-xl hover:border-primary transition-all relative group">
                        {[
                            { label: 'Member Since', value: '8th May 2026', color: 'text-slate-900' },
                            { label: 'Active Listings', value: '42', color: 'text-blue-600' },
                            { label: 'Experience', value: '12 Yrs', color: 'text-green-600' },
                            { label: 'Rating', value: '4.9/5', color: 'text-purple-600' }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center text-center pb-3 border-b-2 border-slate-900/5 last:border-b-0 last:pb-0 group">
                                <p className="agent-small font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">{stat.label}</p>
                                <h3 className={`agent-body font-black ${stat.color} tracking-tight`}>{stat.value}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Membership Card */}
                    <div className="bg-white rounded-[2.5rem] border-2 border-slate-900/5 p-8 py-3 shadow-xl hover:border-primary transition-all relative group">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="agent-h2 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>Membership <span className="text-primary italic">Expiring On</span></h3>
                                <Clock size={24} className="text-primary/40 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-3 text-center border-2 border-slate-900/5 mb-3">
                                <p className="agent-h2 font-black text-slate-900 tracking-tighter">8th May 2026</p>
                            </div>
                        </div>
                        <Link href="/agent/subscription" className='cursor-pointer'>
                            <button className="cursor-pointer w-full py-5 bg-red-500 text-white rounded-2xl font-black agent-meta uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl shadow-red-500/20">
                                Renew Now
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Bottom Section: Category Table & Verification Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-10">
                        {/* Partner Category Comparison Section */}
                        <div className="bg-white rounded-[2.5rem] border-2 border-slate-900/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">

                            {/* Tier Selector / Header */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 relative">
                                {[
                                    { name: 'Network Partner', status: 'idle' },
                                    { name: 'Verified Partner', status: 'active' },
                                    { name: 'Elite Partner', status: 'idle', recommended: true }
                                ].map((tier, idx) => (
                                    <div key={idx} className="relative flex-1 w-full sm:w-auto">
                                        {tier.recommended && (
                                            <div className="absolute -top-6 right-0 bg-[#f3af02] text-slate-900 px-3 py-1 rounded-lg agent-tiny font-black uppercase tracking-widest shadow-lg z-20">
                                                Recommended
                                            </div>
                                        )}
                                        <div className={`h-12 rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-500 relative ${tier.status === 'active'
                                            ? 'bg-[#008F6D] border-[#008F6D] shadow-xl shadow-[#008F6D]/20'
                                            : 'bg-white border-slate-100 hover:border-slate-200'
                                            }`}>
                                            <span className={`agent-tiny font-black uppercase tracking-widest text-center ${tier.status === 'active' ? 'text-white' : 'text-slate-400'
                                                }`}>
                                                {tier.name}
                                            </span>
                                            {tier.status === 'active' && (
                                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#008F6D] rotate-45 rounded-sm"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Comparison Data */}
                            <div className="space-y-3">
                                {[
                                    {
                                        label: 'Live Listings',
                                        values: ['10', '25', '50']
                                    },
                                    {
                                        label: 'Listing Position',
                                        values: ['Standard', 'Preferred', 'Priority']
                                    },
                                    {
                                        label: 'Channel Contacts Unlock',
                                        values: ['50', '100', '150']
                                    },
                                    {
                                        label: 'Monthly Customised Creatives',
                                        values: ['10 Posts', '15 Posts', '25 Posts']
                                    }
                                ].map((feature, fIdx) => (
                                    <div key={fIdx} className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <h4 className="agent-body font-black text-slate-800 tracking-tight">{feature.label}</h4>
                                            <div className="w-6 h-6 rounded-full bg-[#008F6D]/10 flex items-center justify-center text-[#008F6D]">
                                                <CircleCheck size={14} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 bg-slate-50 rounded-[1.5rem] overflow-hidden border border-slate-100">
                                            {feature.values.map((val, vIdx) => (
                                                <div
                                                    key={vIdx}
                                                    className={`py-5 text-center agent-small font-black uppercase tracking-widest transition-all duration-500 border-r last:border-0 border-slate-200/50 ${vIdx === 1 ? 'bg-[#008F6D]/5 text-[#008F6D]' : 'text-slate-500'
                                                        }`}
                                                >
                                                    {val}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Info Footer */}
                            <div className="mt-3 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                    <Info size={20} />
                                </div>
                                <p className="agent-meta font-bold text-slate-600 uppercase tracking-widest leading-relaxed">
                                    Complete Your KYC profile and Unlock <span className="text-slate-900 font-black">TOP Partner Badges + more benefits..</span>
                                </p>
                            </div>
                        </div>

                        {/* Badge Requirements Box */}

                    </div>
                    <div className="h-min sticky top-24 bg-white rounded-[2rem] border-2 border-slate-900/10 p-8 flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-lg">
                        <div className="flex-1 space-y-4">
                            <h4 className="agent-small font-black text-black uppercase tracking-widest border-b border-slate-100 pb-2">For Verified Partner Badge</h4>
                            <ul className="space-y-2 agent-small font-bold text-slate-600 uppercase tracking-widest">
                                <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1 h-1 bg-primary rounded-full"></div> 1. Upload Profile Photo</li>
                                <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1 h-1 bg-primary rounded-full"></div> 2. Adhaar Card Number & Photo</li>
                            </ul>
                            {/* </div>
                        <div className="shrink-0 text-slate-300 font-black agent-h1">+</div>
                        <div className="flex-1 space-y-4"> */}
                            <h4 className="mt-12 agent-small font-black text-black uppercase tracking-widest border-b border-slate-100 pb-2">For Elite Partner Badge (Additional)</h4>
                            <ul className="space-y-2 agent-small font-bold text-slate-600 uppercase tracking-widest">
                                <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1 h-1 bg-primary rounded-full"></div> 1. Rera License</li>
                                <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1 h-1 bg-primary rounded-full"></div> 2. GST Certificate</li>
                                <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1 h-1 bg-primary rounded-full"></div> 3. Visiting Card</li>
                            </ul>
                        </div>
                    </div>
                    {/* NetraCoins Promo Card */}
                    {/* <div className="bg-slate-950 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-50"></div>
                        <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>

                        <div className="relative z-10">
                            <span className="text-primary font-black uppercase tracking-[0.3em] agent-small mb-4 block">Refer & Earn</span>
                            <h2 className="agent-hero font-normal text-white mb-6" style={{ fontFamily: "WastedVindey, serif" }}>Netra<span className="text-primary">Coins</span></h2>
                            <p className="text-white/60 agent-body font-light mb-10 max-w-xs leading-relaxed">
                                Invite brokers and <br />earn amazing rewards
                            </p>
                            <button className="px-10 py-4 bg-[#FFB000] text-slate-950 rounded-2xl font-black agent-small uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl">
                                Know More
                            </button>
                        </div>

                        <div className="hidden sm:flex absolute bottom-10 right-10 items-center gap-6 opacity-80 pointer-events-none">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl animate-bounce duration-[3s]">
                                <Gift size={32} className="text-[#FFB000]" />
                            </div>
                            <div className="w-28 h-28 md:w-32 md:h-32 bg-primary/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/5 shadow-2xl transform rotate-12">
                                <Award size={48} className="text-white" />
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* Unified Refer and Earn Partner Banner */}
                {/* <div className="pt-8">
                    <div className="bg-white rounded-[3rem] border-4 border-slate-900 overflow-hidden group hover:shadow-2xl transition-all">
                        <div className="flex flex-col lg:flex-row divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-slate-900">
                            <div className="flex-1 p-10 md:p-14 relative overflow-hidden group/item hover:bg-slate-50 transition-all">
                                <div className="absolute top-0 right-0 p-8 text-slate-50 transition-colors group-hover/item:text-primary/10">
                                    <Compass size={120} strokeWidth={1} />
                                </div>
                                <div className="relative z-10">
                                    <span className="agent-small font-black uppercase tracking-[0.3em] text-primary mb-4 block">Partner Opportunity</span>
                                    <h3 className="agent-h1 font-normal text-slate-900 mb-6" style={{ fontFamily: "WastedVindey, serif" }}>Premium <span className="italic">Interiors</span></h3>
                                    <p className="text-slate-500 agent-body font-medium leading-relaxed max-w-sm mb-10 uppercase tracking-tight">
                                        Refer your clients for world-class architectural interiors and earn lucrative commission on every conversion.
                                    </p>
                                    <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl agent-small font-black uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center gap-3 shadow-xl">
                                        Refer Interior Lead <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 p-10 md:p-14 relative overflow-hidden group/item hover:bg-slate-50 transition-all">
                                <div className="absolute top-0 right-0 p-8 text-slate-50 transition-colors group-hover/item:text-primary/10">
                                    <Layers size={120} strokeWidth={1} />
                                </div>
                                <div className="relative z-10">
                                    <span className="agent-small font-black uppercase tracking-[0.3em] text-primary mb-4 block">Financial Services</span>
                                    <h3 className="agent-h1 font-normal text-slate-900 mb-6" style={{ fontFamily: "WastedVindey, serif" }}>Easy <span className="italic">Home Loans</span></h3>
                                    <p className="text-slate-500 agent-body font-medium leading-relaxed max-w-sm mb-10 uppercase tracking-tight">
                                        Help your buyers secure the best mortgage rates through our banking partners and grow your referral earnings.
                                    </p>
                                    <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl agent-small font-black uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center gap-3 shadow-xl">
                                        Refer Loan Lead <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </main>
            <ReferFooter />
        </div>
    );
}
