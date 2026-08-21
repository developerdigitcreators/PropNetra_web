'use client';

import React, { useLayoutEffect, useRef } from 'react';
import {
    MessageSquare, Phone, Mail, HelpCircle,
    Send, MapPin, Globe, Clock, ShieldCheck,
    ChevronRight, ExternalLink, MessageCircle
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../../../components/Footer';
import ReferFooter from '@/components/ReferFooter';

gsap.registerPlugin(ScrollTrigger);

export default function SupportPage() {
    const containerRef = useRef(null);

    const faqs = [
        { q: "How do I update my agent profile?", a: "Go to Profile Settings > Identity where you can update your branding, logo, and contact details." },
        { q: "Can I share comparison reports directly?", a: "Yes, use the 'Download Report' or 'Quick Share' buttons on any comparison dashboard." },
        { q: "How does the AI ROI prediction work?", a: "Our AI analyzes 10 years of historical data, sector growth trends, and builder track records to predict future appreciation." },
        { q: "What is the 'Direct Builder Floor' ID?", a: "It is a unique 8-digit secure code provided to authorized PropNetra agents for verified scheduling." }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".reveal-up",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-white">
            {/* Header Banner (Compact) */}
            <div className="relative h-48 w-full overflow-hidden flex items-center justify-center bg-white border-b border-slate-100">
                <div className="absolute inset-0 opacity-[0.05] grayscale">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" className="w-full h-full object-cover" alt="Background" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>

                <div className="relative z-10 text-center px-6 mt-10">
                    <h1 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-slate-900 leading-[0.9] mb-3 reveal-up" style={{ fontFamily: "WastedVindey, serif" }}>
                        Agent <span className="gradent_text_color">Support</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3 reveal-up">
                        <div className="w-10 h-px bg-slate-200"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">PropNetra Help Center</p>
                        <div className="w-10 h-px bg-slate-200"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Direct Contact */}
                    <div className="lg:col-span-1 space-y-1">
                        <div className="bg-slate-900 p-8 rounded-[2rem] text-white reveal-up relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <h3 className="agent-h3 font-normal mb-6" style={{ fontFamily: "WastedVindey, serif" }}>Live <span className="text-primary">Concierge</span></h3>

                            <div className="space-y-6 relative z-10">
                                <a href="https://wa.me/919999999999" className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-primary transition-all group">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-white group-hover:text-primary">
                                        <MessageCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-60">WhatsApp Support</p>
                                        <p className="text-sm font-bold">+91 98765 43210</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Direct Helpline</p>
                                        <p className="text-sm font-bold">1800-PN-AGENT</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Email Inquiries</p>
                                        <p className="text-sm font-bold">support@propnetra.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 reveal-up">
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-4">Office Location</h4>
                            <div className="flex gap-4">
                                <MapPin size={18} className="text-primary shrink-0" />
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase">
                                    Level 14, Skyview Tower,<br />
                                    Golf Course Extension,<br />
                                    Gurugram, Haryana 122018
                                </p>
                            </div>
                            <div className="mt-6 flex items-center gap-4">
                                <Clock size={16} className="text-slate-400" />
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mon - Sat: 10 AM - 7 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle & Right Column: Ticket Form & FAQ */}
                    <div className="lg:col-span-2 space-y-1">
                        {/* Support Form */}
                        <div className="bg-white p-10 py-3 rounded-[2.5rem] border border-slate-200 shadow-sm reveal-up">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="agent-h3 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>Submit a <span className="gradent_text_color">Ticket</span></h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Our team typically responds within 2 hours</p>
                                </div>
                                <div className="px-4 py-2 bg-primary/10 rounded-lg flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-primary" />
                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">Priority Support</span>
                                </div>
                            </div>

                            <form className="space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                        <input type="text" value="Abhisek Goldy" disabled className="w-full h-12 px-6 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Agent ID</label>
                                        <input type="text" value="AGENT-123456" disabled className="w-full h-12 px-6 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Issue Category</label>
                                        <select className="w-full h-12 px-6 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                                            <option>Property Intelligence Query</option>
                                            <option>Schedule Visit Issue</option>
                                            <option>Creative Customization</option>
                                            <option>Technical Support</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Method</label>
                                        <select className="w-full h-12 px-6 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                                            <option>Email</option>
                                            <option>Chat</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Detailed Message</label>
                                    <textarea placeholder="Describe your inquiry in detail..." className="w-full h-32 p-6 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all resize-none"></textarea>
                                </div>

                                <button className="w-full py-5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-[0.4em] hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-4">
                                    Send Inquiry <Send size={18} />
                                </button>
                            </form>
                        </div>

                        {/* FAQ Section */}
                        <div className="reveal-up mt-3">
                            <div className="flex items-center gap-4 mb-3">
                                <HelpCircle className="text-primary" size={24} />
                                <h3 className="agent-h3 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>Knowledge <span className="gradent_text_color">Base</span></h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="p-6 bg-white border border-slate-100 rounded-2xl hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{faq.q}</h4>
                                            <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReferFooter />
        </main>
    );
}
