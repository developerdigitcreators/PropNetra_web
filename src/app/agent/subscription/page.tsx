'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Crown, CheckCircle2, Download, TrendingUp, Info,
    Users, MapPin, Zap, Award, Gift, ArrowRight,
    CreditCard, ShieldCheck, Clock, Filter, Mail,
    Phone, Database, Shield, Lock, ChevronRight,
    Search, Bell, UserCircle, PlusCircle, LayoutGrid
} from 'lucide-react';
import ReferFooter from '@/components/ReferFooter';

export default function SubscriptionPage() {
    const benefits = [
        { icon: <Users size={18} />, text: "150 Customer Contacts / month" },
        { icon: <Filter size={18} />, text: "Advanced Filters Access" },
        { icon: <Mail size={18} />, text: "Email, Phone & Address Access" },
        { icon: <Shield size={18} />, text: "Priority Support" },
        { icon: <Award size={18} />, text: "NetraCoins on Every Referral" },
        { icon: <CheckCircle2 size={18} />, text: "Verified Property Owner Leads" },
        { icon: <Database size={18} />, text: "Accurate & Updated Data" },
        { icon: <Lock size={18} />, text: "Secure & Reliable Platform" }
    ];

    const addOns = [
        {
            title: "Resale Channel Listings",
            subtitle: "Get 50 contacts",
            price: "50 NetraCoins Credit",
            limit: "MONTHLY LIMIT: UPTO 300 CONTACTS PER USER",
            icon: <LayoutGrid size={24} className="text-orange-500" />
        },
        {
            title: "Builder Listing Connect",
            subtitle: "Get 25 Contacts",
            price: "125 NetraCoins Credit",
            limit: "MONTHLY LIMIT: UPTO 150 CONTACTS",
            icon: <Database size={24} className="text-blue-500" />
        },
        {
            title: "Team GEO Tagging",
            subtitle: "No Team Limit",
            price: "Contact Sales Team",
            limit: "FOR EXISTING SUBSCRIBED PARTNERS",
            icon: <MapPin size={24} className="text-purple-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/30 font-sans selection:bg-primary/10 pt-24">
            <main className="w-full section-padding space-y-10">
                {/* Hero Subscription Card */}
                <div className="relative bg-[#140F36] rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-2xl min-h-[360px] flex items-center">
                    {/* Full Banner Image Background */}
                    <Image src="/images/topgrapgh.png" alt="Subscription Banner" fill className="object-cotain object-right z-0 pointer-events-none" quality={100} unoptimized />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
                        <div className="flex-1 space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-white backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl">
                                    <Crown size={40} className="text-[#FFB000]" />
                                </div>
                                <div className='max-w-1/3'>
                                    <h1 className="agent-h2 font-normal text-white mb-2" style={{ fontFamily: "WastedVindey, serif" }}>Your <span className="text-primary italic">Subscription</span></h1>
                                    <p className="text-white agent-meta font-bold tracking-widest drop-shadow-md">Empowering your real estate growth with smarter leads.</p>
                                </div>
                            </div>

                            <div className="max-w-2/3 grid grid-cols-1 md:grid-cols-3 pt-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-white/40 uppercase agent-small font-black tracking-widest drop-shadow-md">
                                        <ShieldCheck size={14} /> Plan
                                    </div>
                                    <p className="text-white agent-body font-black drop-shadow-md">Growth Plan</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-white/40 uppercase agent-small font-black tracking-widest drop-shadow-md">
                                        <Clock size={14} /> Status
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <p className="text-white agent-body font-black tracking-tight drop-shadow-md">Active</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-white/40 uppercase agent-small font-black tracking-widest drop-shadow-md">
                                        <TrendingUp size={14} /> Renewal Date
                                    </div>
                                    <p className="text-white agent-body font-black drop-shadow-md">12 Jun, 2025</p>
                                </div>
                            </div>
                        </div>

                        <div className="shrink-0 text-center lg:text-right space-y-6">
                            <div className="space-y-1">
                                <h2 className="agent-hero font-black text-white tracking-tighter drop-shadow-md">₹999<span className="tracking-widest agent-body font-bold text-white/40 ml-2">/month</span></h2>
                                <p className="text-white agent-small font-black uppercase tracking-[0.2em] drop-shadow-md">150 Customer Contacts</p>
                            </div>
                            <button className="px-12 py-5 bg-[#5D5FEF]/90 backdrop-blur-md text-white rounded-2xl font-black agent-small uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl shadow-indigo-500/20 w-full lg:w-auto z-10 relative border border-white/10">
                                Manage Plan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status and Invoice Bar */}
                <div className="bg-white rounded-[2rem] p-6 border-2 border-slate-900/5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6 px-4">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 border border-green-100">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="agent-body font-black text-slate-900 tracking-tight">Your plan is active</p>
                            <p className="agent-small font-bold text-slate-400 tracking-widest mt-2">Next renewal on 12 Jun, 2025</p>
                        </div>
                    </div>

                    <div className="h-12 w-px bg-slate-100 hidden md:block"></div>

                    <div className="flex items-center gap-6 px-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                            <Download size={24} />
                        </div>
                        <div>
                            <p className="agent-body font-black text-slate-900 tracking-tight">Invoice for 12 May, 2025</p>
                            <p className="agent-small font-bold text-slate-400 tracking-widest mt-2">Amount: ₹999</p>
                        </div>
                    </div>

                    <button className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black agent-small uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3">
                        <Download size={16} /> Download Invoice
                    </button>
                </div>

                {/* Main Content Grid: Usage vs Benefits */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Usage Overview Section */}
                    <div className="lg:col-span-2 bg-white rounded-[3rem] border-2 border-slate-900/5 p-10 shadow-xl space-y-3">
                        <h3 className="agent-hbody font-black text-slate-900 tracking-tight">Your Free Customer Contacts – Usage Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100 relative group overflow-hidden">
                                <div className="relative z-10">
                                    <p className="agent-small font-black text-slate-400 uppercase tracking-widest mb-6">Utilised <span className="text-slate-900">(This Month)</span></p>
                                    <div className="flex items-baseline gap-2 mb-8">
                                        <span className="agent-hero font-black text-slate-900 tracking-tighter">32</span>
                                        <span className="agent-h3 font-bold text-slate-300">/ 50</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-2">
                                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: '64%' }}></div>
                                    </div>
                                    <p className="text-right agent-small font-black text-indigo-500 uppercase tracking-widest">64%</p>
                                </div>
                            </div>

                            <div className="bg-[#F0FFF4] rounded-[2.5rem] p-10 border border-green-100 relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-10 right-10 text-green-200">
                                    <Lock size={48} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="agent-small font-black text-green-700/50 uppercase tracking-widest mb-2">Balance Contacts to Unlock</p>
                                    <h4 className="agent-hero font-black text-green-600 tracking-tighter mb-6">18</h4>
                                    <p className="agent-small font-bold text-green-700/60 uppercase tracking-widest leading-relaxed max-w-[150px]">Upgrade your plan to unlock more high-quality customer contacts.</p>
                                </div>
                                <button className="mt-8 py-3 px-6 bg-white border border-green-200 text-green-600 rounded-xl font-black agent-small uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all shadow-sm">
                                    Upgrade Plan
                                </button>
                            </div>
                        </div>

                        {/* Usage History Mock Chart */}
                        <div className="space-y-3 pt-4">
                            <div className="flex items-center justify-between">
                                <h4 className="agent-body font-black text-slate-900 tracking-widest">Usage History</h4>
                                <div className="flex gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                                        <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">Contacts Utilised</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                                        <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">Free Limit (50)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-48 w-full relative flex items-end justify-between px-4 pb-8 border-b-2 border-slate-100">
                                {/* Simple SVG-like representation for the line chart */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <TrendingUp size={100} />
                                </div>
                                {[18, 26, 34, 41, 28, 32].map((h, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 group relative h-full justify-end">
                                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white agent-meta font-black px-2 py-1 rounded-lg pointer-events-none">{h}</div>
                                        <div
                                            className="w-4 bg-indigo-500/20 rounded-t-lg group-hover:bg-indigo-500 transition-all cursor-pointer relative"
                                            style={{ height: `${(h / 50) * 100}%` }}
                                        >
                                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white shadow-lg"></div>
                                        </div>
                                        <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest">
                                            {['Dec \'24', 'Jan \'25', 'Feb \'25', 'Mar \'25', 'Apr \'25', 'May \'25'][i]}
                                        </p>
                                    </div>
                                ))}
                                {/* Connection lines would go here in a real implementation */}
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <Info size={14} className="text-indigo-500" />
                                <p className="agent-tiny font-bold text-slate-500 uppercase tracking-widest">Free limit of 50 contacts refreshes every month.</p>
                            </div>
                        </div>
                    </div>

                    {/* Plan Benefits Sidebar */}
                    <div className="bg-white rounded-[3rem] border-2 border-slate-900/5 p-10 shadow-xl">
                        <h3 className="agent-h3 font-black text-slate-900 tracking-tight mb-3">Plan Benefits</h3>
                        <div className="space-y-3">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-5 group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all border border-slate-100">
                                        {benefit.icon}
                                    </div>
                                    <p className="agent-meta font-bold text-slate-600 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{benefit.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add-Ons Section */}
                <div className="space-y-8 relative mb-12">
                    <div className="flex items-center justify-between relative z-10 bg-[#F8F7FD] p-8 rounded-[2.5rem] border-2 border-slate-900/5 shadow-sm overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="agent-h2 font-black text-slate-900 tracking-tight mb-1">Add-Ons — <span className="text-indigo-500">Flexible Credit Pack</span></h3>
                            <p className="agent-small font-bold text-slate-400 uppercase tracking-[0.2em]">Just Pay when you need, Free from paying Yearly</p>
                        </div>
                        <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 h-40 w-56 pointer-events-none">
                            <img src="/images/credit.png" alt="Credit Pack" className="w-full h-full object-contain mix-blend-normal opacity-90" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {addOns.map((addon, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] border-2 border-slate-900/5 p-8 shadow-xl hover:border-slate-900 transition-all group relative overflow-hidden z-10">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-primary/5 transition-colors"></div>
                                <div className="relative z-10 space-y-3">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                                            {addon.icon}
                                        </div>
                                        <div>
                                            <h4 className="agent-body font-black text-slate-900 tracking-tight mb-1">{addon.title}</h4>
                                            <p className="agent-tiny font-bold text-slate-400 tracking-widest">{addon.subtitle}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="agent-tiny font-black text-slate-300 tracking-widest mb-1">Buy At</p>
                                        <p className="agent-body font-black text-slate-900 tracking-tight">{addon.price}</p>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="agent-tiny font-black text-slate-400 leading-relaxed tracking-widest">{addon.limit}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Refer & Earn Banner */}
                {/* <div className=" rounded-[3rem]   p-10 md:p-14 relative overflow-hidden group mt-16  min-h-[360px] flex items-center">
                    <Image src="/images/bottomgift.png" alt="Refer and Earn Banner" fill className="object-cover object-left z-0 pointer-events-none" quality={100} unoptimized />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 w-full">
                        <div className="shrink-0 relative z-10 w-64 md:w-[350px] hidden md:block pointer-events-none"></div>

                        <div className="flex-1 space-y-6 md:pl-12">
                            <h3 className="agent-h2 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>Refer & Earn with <span className="text-primary italic">PropNetra</span></h3>
                            <p className="text-slate-500 agent-body font-medium leading-relaxed max-w-xl">
                                Invite your real estate friends to join PropNetra and earn NetraCoins when they subscribe.
                            </p>

                            <div className="flex flex-wrap gap-6 pt-4">
                                <div className="bg-white px-8 py-4 rounded-2xl border-2 border-slate-900/5 shadow-xl flex flex-col items-center gap-1 min-w-[160px]">
                                    <p className="agent-small font-black text-slate-400 uppercase tracking-widest">You Earn</p>
                                    <p className="agent-h3 font-black text-slate-900">Upto 100%</p>
                                </div>
                                <div className="bg-white px-8 py-4 rounded-2xl border-2 border-slate-900/5 shadow-xl flex flex-col items-center gap-1 min-w-[160px]">
                                    <p className="agent-small font-black text-slate-400 uppercase tracking-widest">Friend Gets</p>
                                    <p className="agent-h3 font-black text-slate-900">Flat 10%</p>
                                </div>
                            </div>

                            <button className="px-12 py-5 bg-[#3B82F6] text-white rounded-2xl font-black agent-small uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl shadow-blue-500/20 flex items-center gap-3 mt-8">
                                Refer Now <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div> */}
            </main>
            <ReferFooter />
        </div>
    );
}
