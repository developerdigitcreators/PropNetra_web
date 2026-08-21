'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Search, ChevronDown, Bell, User, MapPin, Grid, List, 
    Filter, Share2, Heart, ExternalLink, Calendar, 
    Maximize2, Info, ArrowRight, Phone, MessageSquare,
    Compass, Home, Layers, Eye, PlusCircle, ChevronRight, Star,
    Edit3, Trash2, MoreHorizontal, CheckCircle2, Clock, 
    Users, TrendingUp, Award, Zap, Mail, Shield
} from 'lucide-react';

export default function TeamManagementPage() {
    const [activeTab, setActiveTab] = useState('all');

    const teamStats = [
        { label: 'Total Members', value: '12', icon: <Users size={16} />, color: 'text-slate-900' },
    ];

    const teamMembers = [
        {
            id: 1,
            name: "Abhishek Goldy",
            role: "Principal Partner",
            location: "Gurgaon HQ",
            sales: "₹14.2 Cr",
            listings: 42,
            status: "Online",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
        },
        {
            id: 2,
            name: "Neha Kapoor",
            role: "Sales Associate",
            location: "Golf Course Rd",
            sales: "₹6.8 Cr",
            listings: 15,
            status: "In Meeting",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000"
        },
        {
            id: 3,
            name: "Vikram Malhotra",
            role: "Luxury Specialist",
            location: "Southern Peripheral Rd",
            sales: "₹12.1 Cr",
            listings: 28,
            status: "Away",
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000"
        },
        {
            id: 4,
            name: "Riya Sharma",
            role: "Relationship Manager",
            location: "Sohna Road",
            sales: "₹3.4 Cr",
            listings: 8,
            status: "Online",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Online': return 'bg-green-500';
            case 'In Meeting': return 'bg-amber-500';
            case 'Away': return 'bg-slate-300';
            default: return 'bg-slate-300';
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary/10 pb-20">
            {/* Header Holder */}
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
                                <span className="agent-small font-black text-slate-900 uppercase tracking-widest">Team Management</span>
                            </div>
                            <h1 className="agent-hero font-normal text-slate-900 leading-none mb-4" style={{ fontFamily: "WastedVindey, serif" }}>
                                Collaborative <span className="gradent_text_color">Workforce</span>
                            </h1>
                            <p className="text-slate-500 agent-body font-medium max-w-xl">Monitor team performance, distribute leads, and scale your real estate operations with precision.</p>
                        </div>
                        {/* Invitation Code Display */}
                        <div className="flex flex-col items-end gap-3">
                            <p className="agent-small font-black text-slate-400 uppercase tracking-widest">Your Team Invite Code</p>
                            <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-white/10 shadow-2xl">
                                <div className="px-6 py-3.5 bg-white/5 rounded-xl border border-white/5">
                                    <span className="agent-h3 font-black text-white tracking-[0.3em] font-mono">PN-TEAM-7821</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid - Constrained Width */}
                    <div className="max-w-5xl">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {teamStats.map((stat, i) => (
                                <div key={i} className="bg-white rounded-[2rem] border-3 border-slate-900/10 p-6 hover:border-slate-900 transition-all shadow-sm group">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            {stat.icon}
                                        </div>
                                        <ArrowRight size={14} className="text-slate-200 group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className={`agent-h3 font-black ${stat.color} tracking-tighter`}>{stat.value}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 -mt-12 relative z-20">
                {/* Search & Filter Pill */}
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-900/10 p-4 border-2 border-slate-900/10 hover:border-slate-900 transition-all mb-12 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 relative w-full group/search">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover/search:text-primary transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search team members by name, role or expertise..." 
                            className="w-full pl-16 pr-8 py-4 bg-slate-50 rounded-2xl agent-body font-medium border border-slate-200 focus:border-primary/50 focus:bg-white transition-all outline-none shadow-sm"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                            {[
                                { id: 'all', label: 'All Members' },
                                { id: 'top', label: 'Top Performers' },
                                { id: 'new', label: 'Recently Joined' }
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
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="bg-white rounded-[2rem] border-2 border-slate-900/5 hover:border-slate-900 transition-all duration-700 overflow-hidden group shadow-sm hover:shadow-2xl hover:-translate-y-1 p-6 flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-primary transition-colors">
                                        <img src={member.img} className="w-full h-full object-cover" alt={member.name} />
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all cursor-pointer">
                                        <Mail size={14} />
                                    </div>
                                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
                                        <Edit3 size={14} />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="agent-h3 font-black text-slate-900 tracking-tighter group-hover:text-primary transition-colors">{member.name}</h3>
                                    {member.role === 'Principal Partner' && <Shield size={12} className="text-primary" />}
                                </div>
                                <p className="agent-small font-bold text-slate-400 uppercase tracking-widest mb-3">{member.role}</p>
                                <div className="flex items-center gap-2 agent-tiny font-medium text-slate-500 uppercase tracking-tighter">
                                    <MapPin size={10} /> {member.location}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 group-hover:bg-white transition-colors">
                                    <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-0.5">Sales</p>
                                    <p className="agent-body font-black text-slate-900 tracking-tight">{member.sales}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 group-hover:bg-white transition-colors">
                                    <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-0.5">Listings</p>
                                    <p className="agent-body font-black text-slate-900 tracking-tight">{member.listings}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Link href="/agent/attendance" className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl agent-tiny font-black uppercase tracking-[0.15em] hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-xl">
                                    <Calendar size={12} /> Attendance
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Invite Card */}
                   
                </div>
            </div>
        </div>
    );
}
