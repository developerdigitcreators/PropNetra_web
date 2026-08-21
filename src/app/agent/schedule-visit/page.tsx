'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Calendar, Clock, User, Building2, MapPin,
    ArrowRight, CheckCircle2, Search, Hash,
    UserCheck, ClipboardCheck, Phone, ShieldCheck,
    ChevronRight, Info, AlertCircle, DollarSign, Layers
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function ScheduleVisitPage() {
    const [builderId, setBuilderId] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [builderName, setBuilderName] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [customerBudget, setCustomerBudget] = useState('');
    const [floorPreference, setFloorPreference] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const containerRef = useRef(null);

    const timeSlots = [
        "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".reveal-up",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
            );

            gsap.fromTo(".step-card",
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleSearch = () => {
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            setIsVerified(true);
            setBuilderName('Abhishek Goldy / SS Group');
        }, 1200);
    };

    return (
        <main ref={containerRef} className="min-h-screen bg-[#F8F9FA]">
            {/* Header Banner */}
            {/* <div className="relative h-60 w-full overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
                <div className="absolute inset-0 opacity-[0.05] grayscale">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" className="w-full h-full object-cover" alt="Background" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
                
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-[3.5rem] lg:text-[4.5rem] font-normal text-slate-900 leading-[0.9] mb-4 reveal-up" style={{ fontFamily: "WastedVindey, serif" }}>
                        Schedule <span className="gradent_text_color">Client Visit</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3 reveal-up">
                        <div className="w-12 h-px bg-slate-200"></div>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-[0.4em]">Direct Builder Floor Authentication</p>
                        <div className="w-12 h-px bg-slate-200"></div>
                    </div>
                </div>
            </div> */}
            <div className="relative h-[220px] w-full overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
                <div className="absolute inset-0 opacity-[0.15]">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000" className="w-full h-full object-cover" alt="Banner" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-900/5 to-white"></div>

                <div className="relative top-5 z-10 text-center px-6">
                    <h1 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-slate-900 leading-[0.9] mb-3" style={{ fontFamily: "WastedVindey, serif" }}>
                        Schedule <span className="gradent_text_color">Client Visit</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-px bg-slate-200"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Direct Builder Floor Authentication</p>
                        <div className="w-10 h-px bg-slate-200"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
                    {/* Left Sidebar: Instructions & Steps */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white p-8 py-5 rounded-[2.5rem] border border-slate-200 shadow-sm reveal-up">
                            <h3 className="agent-h3 font-normal text-slate-900 mb-2" style={{ fontFamily: "WastedVindey, serif" }}>Visit Protocol</h3>
                            <div className="space-y-6">
                                {[
                                    { step: "01", title: "Authenticate ID", desc: "Enter the unique Builder ID provided in the listing." },
                                ].map((item, i) => (
                                    <div key={i} className="step-card flex gap-5">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                            <span className="agent-tiny font-black text-primary">{item.step}</span>
                                        </div>
                                        <div>
                                            <p className="agent-meta font-black text-slate-900 uppercase tracking-widest mb-1">{item.title}</p>
                                            <p className="agent-tiny font-bold text-slate-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-900 p-8 py-6 rounded-[2.5rem] text-white shadow-2xl reveal-up relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                            <ShieldCheck className="text-primary" size={40} />
                            <div>
                                <h4 className="agent-h3 font-normal mb-1" style={{ fontFamily: "WastedVindey, serif" }}>Secure Protocol</h4>
                                <p className="agent-tiny font-bold text-slate-400 leading-relaxed">Visiting a unique ID property requires verified agent status. All visits are tracked for security.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content: The Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden reveal-up">
                            <div className="bg-slate-50 p-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                    <div className='w-full'>
                                        <label className="agent-tiny font-black text-slate-500 uppercase tracking-[0.2em] ml-2 mb-1.5 block">Enter Builder Unique ID</label>
                                        <div className="relative w-full group">
                                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearching ? 'text-primary' : 'text-slate-400'}`} size={16} />
                                            <input
                                                type="text"
                                                value={builderId}
                                                onChange={(e) => setBuilderId(e.target.value)}
                                                placeholder="EX: PN-BF-4592"
                                                className="w-full h-12 pl-12 pr-28 bg-white border-2 border-slate-200 rounded-xl agent-meta font-bold focus:outline-none focus:border-slate-900 transition-all uppercase placeholder:normal-case shadow-sm"
                                            />
                                            <button
                                                onClick={handleSearch}
                                                className="absolute right-1 top-1 h-10 px-6 bg-slate-900 text-white rounded-lg agent-tiny font-black uppercase tracking-widest hover:bg-primary transition-all disabled:opacity-50 z-10"
                                                disabled={!builderId || isSearching}
                                            >
                                                {isSearching ? "Searching..." : "Verify"}
                                            </button>
                                        </div>
                                    </div>

                                    {isVerified && (
                                        <div className="relative h-12 bg-primary/5 border border-primary/20 rounded-xl px-4 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500 group/verified shadow-sm">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                                <UserCheck size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Authenticated Builder</p>
                                                <p className="text-[13px] font-black text-slate-900 leading-none truncate">{builderName}</p>
                                            </div>
                                            <button
                                                onClick={() => setIsVerified(false)}
                                                className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-[10px] font-black hover:bg-red-500 transition-colors shadow-lg"
                                            >
                                                X
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 pt-0 space-y-4">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Property Selection */}
                                    <div className="space-y-1.5">
                                        <label className="agent-tiny font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Select Property</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <select
                                                value={selectedProperty}
                                                onChange={(e) => setSelectedProperty(e.target.value)}
                                                className="w-full h-12 pl-12 pr-6 bg-slate-50 border border-slate-200 rounded-xl agent-meta font-bold focus:outline-none focus:border-primary/40 transition-all appearance-none cursor-pointer"
                                                disabled={!isVerified}
                                            >
                                                <option value="">Select Builder Property</option>
                                                <option value="leaf">The Leaf, Sector 85</option>
                                                <option value="alivio">Alivio, Sector 84</option>
                                                <option value="linden">Linden Floors</option>
                                            </select>
                                            <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={16} />
                                        </div>
                                    </div>

                                    {/* Client Details */}
                                    <div className="space-y-1.5">
                                        <label className="agent-tiny font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Customer Name</label>
                                        <div className="relative">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input
                                                type="text"
                                                value={clientName}
                                                onChange={(e) => setClientName(e.target.value)}
                                                placeholder="Enter Client Name"
                                                className="w-full h-12 pl-12 pr-6 bg-slate-50 border border-slate-200 rounded-xl agent-meta font-bold focus:outline-none focus:border-slate-900 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Budget & Floor */}
                                    <div className="space-y-1.5">
                                        <label className="agent-tiny font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Customer Budget</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input
                                                type="text"
                                                value={customerBudget}
                                                onChange={(e) => setCustomerBudget(e.target.value)}
                                                placeholder="e.g. ₹ 2.50 Cr"
                                                className="w-full h-12 pl-12 pr-6 bg-slate-50 border border-slate-200 rounded-xl agent-meta font-bold focus:outline-none focus:border-slate-900 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="agent-tiny font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Floor Preference</label>
                                        <div className="relative">
                                            <Layers className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <select
                                                value={floorPreference}
                                                onChange={(e) => setFloorPreference(e.target.value)}
                                                className="w-full h-12 pl-12 pr-6 bg-slate-50 border border-slate-200 rounded-xl agent-meta font-bold focus:outline-none focus:border-primary/40 transition-all appearance-none cursor-pointer"
                                                disabled={!isVerified}
                                            >
                                                <option value="">Select Floor Preference</option>
                                                <option value="1">Stilt + 1st Floor</option>
                                                <option value="2">2nd Floor</option>
                                                <option value="3">3rd Floor</option>
                                                <option value="4">4th Floor + Terrace</option>
                                            </select>
                                            <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="agent-tiny font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Preferred Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="w-full h-12 pl-12 pr-6 bg-slate-50 border border-slate-200 rounded-xl agent-meta font-bold focus:outline-none focus:border-slate-900 transition-all cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="agent-tiny font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Select Time Slot</label>
                                        <div className="relative">
                                            <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <select
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                                className="w-full h-12 pl-12 pr-6 bg-slate-50 border border-slate-200 rounded-xl agent-meta font-bold focus:outline-none focus:border-primary/40 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="">Select Meeting Time</option>
                                                {timeSlots.map(time => (
                                                    <option key={time} value={time}>{time}</option>
                                                ))}
                                            </select>
                                            <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Section */}
                                <div className="pt-4 border-t border-slate-100">
                                    <button
                                        className="w-full h-14 bg-slate-900 text-white rounded-xl font-black agent-small uppercase tracking-[0.3em] hover:bg-primary transition-all active:scale-[0.98] shadow-xl disabled:opacity-30 disabled:cursor-not-allowed group flex items-center justify-center gap-4"
                                        disabled={!isVerified || !selectedProperty || !clientName || !selectedDate || !selectedTime}
                                    >
                                        Schedule Meeting <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="pt-0 relative overflow-hidden bg-white left-1/2 -translate-x-1/2">
                <div className="w-full relative z-10">
                    <div className="relative bg-white border-y border-slate-100 overflow-hidden shadow-sm min-h-[250px] flex items-center">
                        {/* Full Card Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
                                className="w-full h-full object-cover opacity-80"
                                alt="Referral Rewards"
                            />
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
                        </div>

                        {/* Full Width Content Flow */}
                        <div className="relative z-10 px-6 md:px-14 py-8 w-full flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-10">
                            {/* Left: Branding & Info */}
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                <div className="text-center md:text-left border-l-0 md:border-l-4 border-primary pl-0 md:pl-8">
                                    <h2 className="title-reveal-large py-1 leading-[0.9] mb-2 overflow-hidden agent-h2" style={{ fontFamily: "WastedVindey, serif" }}>
                                        <span className="text-slate-950 inline-block">Refer & Earn</span> <span className="gradent_text_color pr-2 inline-block">Rewards</span>
                                    </h2>
                                    <p className="text-slate-950 agent-small font-black uppercase tracking-[0.2em] opacity-60">
                                        Join the Elite Circle
                                    </p>
                                </div>

                                <div className="hidden md:flex items-center gap-8">
                                    <div className="flex flex-col">
                                        <span className="agent-h1 font-black text-slate-950">₹50K+</span>
                                        <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">Earning</span>
                                    </div>
                                    <div className="w-[1px] h-10 bg-slate-200"></div>
                                    <div className="flex flex-col">
                                        <span className="agent-h1 font-black text-slate-950">1000+</span>
                                        <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">Partners</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-8">
                                <div className="hidden xl:block text-right">
                                    <p className="text-slate-900 agent-small font-bold leading-tight mb-1">Refer a colleague today</p>
                                    <p className="text-slate-500 agent-tiny font-bold uppercase tracking-widest italic">Terms & Conditions Apply</p>
                                </div>
                                <Link href="/agent/refer">
                                    <button className="px-14 py-5 bg-slate-900 text-white rounded-xl font-black agent-small uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl group flex items-center gap-3">
                                        Refer Now
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
