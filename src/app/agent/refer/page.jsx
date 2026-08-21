"use client";
import React, { useState } from 'react';
import {
    Users,
    Link as LinkIcon,
    Gift,
    TrendingUp,
    Clock,
    Calendar,
    ShieldCheck,
    AlertCircle,
    ChevronDown,
    Plus,
    ArrowRight,
    CircleCheck,
    Lock,
    Globe,
    Send,
    Camera,
    Play,
    Phone,
    MessageSquare,
    FileCheck
} from 'lucide-react';
import Link from 'next/link';

const ReferAndEarn = () => {
    const [openAccordion, setOpenAccordion] = useState(0);

    const transactions = [
        { id: 1, type: 'Referral Bonus', from: 'Neha Patil', amount: '+150', date: 'Today', color: 'text-green-600', icon: <Plus size={16} /> },
        { id: 2, type: 'Listing Boost', from: '3 BHK Apartment', amount: '-200', date: 'Yesterday', color: 'text-red-500', icon: <TrendingUp size={16} /> },
        { id: 3, type: 'Deal Closed Bonus', from: 'Rahul Verma', amount: '+500', date: '2 May', color: 'text-green-600', icon: <Plus size={16} /> },
        { id: 4, type: 'Profile Verification', from: 'KYC Completed', amount: '+100', date: '1 May', color: 'text-green-600', icon: <ShieldCheck size={16} /> },
    ];

    const journeySteps = [
        { friends: 1, reward: '25%', status: 'completed' },
        { friends: 2, reward: '40%', status: 'completed' },
        { friends: 3, reward: '60%', status: 'active' },
        { friends: 4, reward: '80%', status: 'locked' },
        { friends: 5, reward: '100%', status: 'locked', label: 'FREE' },
    ];

    const faqs = [
        {
            title: "When are NetraCoins credited?",
            content: "NetraCoins are credited only when the referee registers using your PropNetra ID and successfully purchases an eligible subscription."
        },
        {
            title: "Validity of NetraCoins",
            content: "All NetraCoins credits issued under this program are valid for 365 days from the date of issuance."
        },
        {
            title: "Referral Conditions",
            content: "The referee must use your PropNetra ID during sign-up. NetraCoins cannot be used to pay for subscription plans."
        },
        {
            title: "Other Important Terms",
            content: "NetraCoins are non-transferable and cannot be redeemed for cash or account credit."
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20">
            <section className="relative overflow-hidden bg-[#0a101f] pt-32 pb-12 px-6 md:px-12">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

                <div className="max-w-[1500px] mx-auto relative z-10">
                    <div className="flex flex-col xl:flex-row justify-between gap-1 xl:gap-1">

                        {/* 1. Far Left: Refer & Earn Messaging */}
                        <div className="w-1/3 flex flex-col items-start">
                            <h1 className="text-6xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
                                Refer & Earn <br />
                                Up to <span className="text-[#f3af02]">100% Back</span>
                            </h1>
                            <p className="text-slate-400 text-lg font-medium mb-3 max-w-sm leading-relaxed">
                                Invite brokers. Earn NetraCoins. <br />
                                Reduce your subscription cost.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-12">
                                <button className="flex items-center gap-3 px-8 py-4 bg-[#f3af02] text-slate-900 rounded-xl font-black text-[12px] uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-2xl shadow-primary/20 cursor-pointer">
                                    <Users size={18} />
                                    Invite Now
                                </button>
                                <button className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 cursor-pointer">
                                    <LinkIcon size={18} />
                                    Copy Referral Link
                                </button>
                            </div>

                            {/* Bonus Strip */}
                            <div className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <div className="w-14 h-14 rounded-2xl bg-[#f3af02]/10 flex items-center justify-center text-[#f3af02] shrink-0">
                                    <Gift size={26} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-[#f3af02] uppercase tracking-[0.2em] mb-1">Bonus for you!</span>
                                    <p className="text-slate-400 text-[14px] font-medium leading-tight">
                                        Follow PropNetra on social media and get <br />
                                        <span className="text-white font-black">15% Instant Discount!</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Middle: Your Earnings Card (Compact) */}
                        <div className="w-1/3 flex h-min">
                            <div className="bg-white/5 border border-white/5 rounded-xl p-6 md:p-6 shadow-2xl relative overflow-hidden group w-full max-w-[420px]">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">Your Earnings</span>
                                        <AlertCircle size={14} className="text-slate-600 cursor-help" />
                                    </div>
                                </div>

                                <div className="flex items-end gap-3 mb-4">
                                    <span className="text-6xl font-black text-white tracking-tighter">₹ 2,450</span>
                                </div>

                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-7 h-7 rounded-full bg-[#f3af02] flex items-center justify-center text-slate-900 font-black text-[10px]">N</div>
                                    <span className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">NetraCoins Earned</span>
                                </div>

                                {/* Progress */}
                                <div className="w-[80%] space-y-5 mb-6">
                                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.1em]">
                                        <span className="text-[#f3af02] agent-meta">2 / 5 Referrals Completed</span>
                                    </div>
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div className="h-full w-[40%] bg-gradient-to-r from-[#FF8A00] to-[#f3af02] rounded-full shadow-[0_0_15px_rgba(243,175,2,0.3)]"></div>
                                    </div>
                                </div>

                                {/* Milestone */}
                                <div className="w-[85%] p-7 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group-hover:border-[#f3af02]/20 transition-all duration-500">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-[#f3af02] uppercase tracking-[0.2em] mb-1">Next Reward</span>
                                        <span className="text-white font-bold text-lg agent-meta leading-tight">3 Referrals → 60% Reward</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#f3af02] transition-all">
                                        <TrendingUp size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=''>

                        </div>

                        {/* 3. Far Right: Coin Stack Image */}
                        <div className="absolute right-10 -top-0 w-full xl:w-[25%] flex justify-center xl:justify-end">
                            <img
                                src="/images/coin.png"
                                className="h-1/2 object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
                                alt="NetraCoins Stack"
                            />
                        </div>

                    </div>
                </div>
            </section>
            <main className="pb-20 container-max mt-12">
                {/* Transactions & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 pb-24 border-b-2 border-slate-900/10">
                    <div className="lg:col-span-2">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                            <h3 className="agent-h2 font-normal" style={{ fontFamily: "WastedVindey, serif" }}>Recent Transactions</h3>
                            <div className="flex gap-4">
                                <button className="agent-tiny font-black uppercase tracking-widest text-primary border-b-2 border-primary">Transaction History</button>
                                <button className="agent-tiny font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">How to Earn?</button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {transactions.map((t) => (
                                <div key={t.id} className="bg-white border-2 border-slate-900/5 rounded-2xl p-4 md:p-5 flex items-center justify-between hover:bg-slate-50 hover:shadow-2xl transition-all hover:-translate-y-1 group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 border-slate-900/10 flex items-center justify-center shrink-0 ${t.amount.startsWith('+') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}`}>
                                            {t.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="agent-body font-black text-slate-900 mb-0.5 uppercase tracking-wide truncate">{t.type}</h4>
                                            <p className="agent-small text-slate-500 font-bold uppercase tracking-widest truncate">From {t.from}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className={`agent-body font-black ${t.color}`}>{t.amount}</p>
                                        <p className="agent-small text-slate-400 font-bold uppercase tracking-widest">{t.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="agent-h2 font-normal mb-8" style={{ fontFamily: "WastedVindey, serif" }}>Important Information</h3>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="bg-white rounded-xl border-2 border-slate-900/10 overflow-hidden shadow-lg">
                                    <button
                                        onClick={() => setOpenAccordion(openAccordion === idx ? -1 : idx)}
                                        className="w-full p-5 flex items-center justify-between text-left group"
                                    >
                                        <div className="flex items-center gap-3">
                                            {idx === 0 && <Clock size={16} className="text-primary" />}
                                            {idx === 1 && <Calendar size={16} className="text-primary" />}
                                            {idx === 2 && <Users size={16} className="text-primary" />}
                                            {idx === 3 && <AlertCircle size={16} className="text-primary" />}
                                            <span className="agent-meta font-black uppercase tracking-[0.1em] group-hover:text-primary transition-colors text-slate-900">{faq.title}</span>
                                        </div>
                                        <ChevronDown size={16} className={`transition-transform duration-300 text-slate-900 shrink-0 ${openAccordion === idx ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`transition-all duration-500 ease-in-out ${openAccordion === idx ? 'max-h-60 opacity-100 border-t-2 border-slate-900/5' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                                        <p className="p-5 agent-meta text-slate-600 font-medium leading-relaxed uppercase tracking-widest">
                                            {faq.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Earnings Journey */}
                <div className="pb-24 border-b-2 border-slate-900/10">
                    <div className="text-center mb-16 relative">
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-900/5 -z-10"></div>
                        <h2 className="agent-h1 font-normal inline-block bg-white px-6 md:px-10" style={{ fontFamily: "WastedVindey, serif" }}>Your Earnings <span className="gradent_text_color">Journey</span></h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
                        {journeySteps.map((step, idx) => (
                            <div key={idx} className={`relative group ${step.status === 'active' ? 'scale-105 md:scale-110 z-10' : ''}`}>
                                <div className={`h-full rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border-2 transition-all duration-500 flex flex-col items-center text-center ${step.status === 'completed' ? 'bg-green-50 border-green-500/30' :
                                    step.status === 'active' ? 'bg-white border-primary shadow-[0_30px_60px_-15px_rgba(255,107,0,0.25)]' :
                                        'bg-white border-slate-900/10 shadow-xl'
                                    }`}>
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center agent-meta font-black mb-4 md:mb-6 border-2 ${step.status === 'completed' ? 'bg-green-500 border-green-600 text-white' :
                                        step.status === 'active' ? 'bg-primary border-primary text-white' :
                                            'bg-slate-50 text-slate-500 border-slate-900/10'
                                        }`}>
                                        {idx + 1}
                                    </div>
                                    <Users size={24} className={`mb-4 ${step.status === 'locked' ? 'text-slate-300' : 'text-slate-900'}`} />
                                    <p className="agent-small font-black uppercase tracking-widest text-slate-500 mb-2">{step.friends} Friend{step.friends > 1 ? 's' : ''}</p>
                                    <p className={`agent-h2 font-light mb-1 ${step.status === 'locked' ? 'text-slate-400' : 'text-slate-900'}`}>{step.reward}</p>
                                    <p className={`agent-small font-black uppercase tracking-widest ${step.status === 'locked' ? 'text-slate-300' : 'text-primary'}`}>{step.label || 'Reward'}</p>

                                    <div className="mt-6 md:mt-8">
                                        {step.status === 'completed' && <CircleCheck size={20} className="text-green-500" />}
                                        {step.status === 'active' && <Lock size={20} className="text-primary" />}
                                        {step.status === 'locked' && <Lock size={20} className="text-slate-200" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="agent-small font-black text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.3em] px-4">
                            <AlertCircle size={12} className="inline mr-2 mb-0.5" /> Rewards are given in NetraCoins equivalent to % of paid amount.
                        </p>
                    </div>
                </div>

                {/* How It Works */}
                <div className="pb-5">
                    <div className="text-center mb-16 relative">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-900/5 -z-10"></div>
                        <h2 className="agent-h1 font-normal inline-block bg-white px-6 md:px-10" style={{ fontFamily: "WastedVindey, serif" }}>How It <span className="gradent_text_color">Works</span></h2>
                    </div>

                    <div className="flex flex-col xl:flex-row items-center justify-between gap-6 relative z-10">
                        {[
                            {
                                step: 1,
                                title: 'Invite Your Broker Friends',
                                desc: 'Share your referral link with your friends.',
                                icon: <Users size={32} className="text-black/80" />
                            },
                            {
                                step: 2,
                                title: 'They Sign Up & Subscribe',
                                desc: 'Your friend signs up and purchases any subscription.',
                                icon: <FileCheck size={32} className="text-black/80" />
                            },
                            {
                                step: 3,
                                title: 'You Earn NetraCoins',
                                desc: 'You earn NetraCoins instantly!',
                                icon: <img src="/images/coin.png" className="w-14 h-14 object-contain" alt="Coins" />
                            }
                        ].map((item, idx) => (
                            <React.Fragment key={idx}>
                                <div className="flex-1 w-full bg-black/5 backdrop-blur-md border border-black/10 rounded-[2rem] p-6 md:p-8 flex items-center gap-6 group hover:bg-white/[0.08] hover:border-primary transition-all duration-500">
                                    {/* Left: Icon Container */}
                                    <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:border-[#f3af02]/30 transition-colors relative">
                                        <div className="absolute inset-1.5 rounded-full border border-black/5"></div>
                                        {item.icon}
                                    </div>

                                    {/* Right: Content */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className="w-6 h-6 rounded-full bg-[#f3af02] flex items-center justify-center text-slate-900 text-[11px] font-black shrink-0">
                                                {item.step}
                                            </div>
                                            <h4 className="text-lg font-bold text-black tracking-tight leading-tight">{item.title}</h4>
                                        </div>
                                        <p className="text-slate-400 text-[13px] font-medium leading-relaxed max-w-[200px]">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow between cards (except last) */}
                                {idx < 2 && (
                                    <div className="hidden xl:flex items-center text-[#f3af02]/40">
                                        <ArrowRight size={24} />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Consolidated Footer Info Card */}
                <div className="bg-white border-2 border-slate-900/10 rounded-xl md:rounded-[2rem] p-10 md:p-3 shadow-2xl relative overflow-hidden group">
                    <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-5 relative z-10">

                        {/* Left: NetraCoins Info */}
                        <div className="flex-1 flex flex-col md:flex-row items-center gap-3">
                            <div className="shrink-0 relative">
                                <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img src="/images/coin.png" className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10" alt="NetraCoins" />
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="agent-h3 font-black text-slate-900 mb-6 tracking-tight">What are NetraCoins?</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10">
                                    {[
                                        '1 Coin = ₹1 value',
                                        'Valid for 365 days',
                                        'Use for subscriptions',
                                        'Non-transferable'
                                    ].map((info, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                                                <CircleCheck size={14} className="text-[#f3af02]" />
                                            </div>
                                            <span className="agent-meta font-bold text-slate-600 tracking-wide">{info}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="hidden xl:block w-[1px] h-32 bg-slate-900/10 self-center"></div>
                        <div className="xl:hidden w-full h-[1px] bg-slate-900/10"></div>

                        {/* Right: Bonus Info */}
                        <div className="flex-1 flex flex-col md:flex-row items-center gap-10">
                            <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-slate-50 flex items-center justify-center border-2 border-slate-900/5 shadow-xl group-hover:scale-105 transition-transform">
                                <Gift size={48} className="text-[#f3af02]" />
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="agent-h3 font-black text-[#f3af02] mb-3 tracking-tight">Get 15% Instant Discount</h4>
                                <p className="agent-meta text-slate-500 font-medium mb-3 leading-relaxed">
                                    Follow PropNetra on social media and <br />
                                    unlock your discount now!
                                </p>
                                {/* Social Icons */}
                                <div className="flex items-center justify-center md:justify-start gap-5">
                                    {[Globe, Send, Camera, Play, MessageSquare].map((Icon, idx) => (
                                        <button key={idx} className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-colors hover:scale-110 shadow-lg">
                                            <Icon size={18} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background decorative accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                </div>
            </main>
        </div>
    );
};

export default ReferAndEarn;
