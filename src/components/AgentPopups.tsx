'use client';

import React, { useEffect } from 'react';
import { X, Phone, MessageSquare, Image as ImageIcon, User, Coins, AlertCircle, ShieldCheck, ChevronRight, MapPinHouse, MessageCircle } from 'lucide-react';

export function CreditConsumptionPopup({ isOpen, onClose, onConfirm }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop with stronger blur */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-[420px] rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in fade-in duration-300">
                {/* Top Accent Bar */}
                <div className="h-2 w-full bg-gradient-to-r from-primary via-amber-500 to-primary"></div>

                <div className="p-8 md:p-10 pt-12 text-center">
                    {/* Icon Header */}
                    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
                        <Coins size={36} className="text-primary" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Confirm Action</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed px-4">
                        This action will consume <span className="text-primary font-black">1 CREDIT</span> from your daily allowance.
                    </p>

                    {/* Credit Status Card */}
                    <div className="bg-slate-50 rounded-3xl p-6 mt-8 mb-8 border border-slate-100">
                        <div className="flex items-center justify-center gap-10">
                            <div className="text-center">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Daily Search</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-2xl font-black text-slate-900">2</span>
                                    <span className="text-[10px] font-bold text-slate-300 uppercase">Left</span>
                                </div>
                            </div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <div className="text-center">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Daily Contact</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-2xl font-black text-slate-900">2</span>
                                    <span className="text-[10px] font-bold text-slate-300 uppercase">Left</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            className="cursor-pointer w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-slate-900/10 group flex items-center justify-center gap-2"
                        >
                            <ShieldCheck size={14} className="text-primary group-hover:text-white" />
                            USE 1 CREDIT
                        </button>
                        <button
                            onClick={onClose}
                            className="cursor-pointer w-full py-5 bg-transparent text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-all"
                        >
                            Wait, Take me back
                        </button>
                    </div>
                </div>

                {/* Secure Footer Note */}
                <div className="bg-slate-50 py-4 border-t border-slate-100 flex items-center justify-center gap-2">
                    <AlertCircle size={10} className="text-slate-400" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Secure Transaction</span>
                </div>
            </div>
        </div>
    );
}

export function ContactViewForm({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-xl rounded-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden animate-in zoom-in fade-in duration-500">
                <button onClick={onClose} className="cursor-pointer absolute top-1 right-1 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/10">
                    <X size={20} />
                </button>

                {/* Hero Header Section */}
                <div className="h-72 relative bg-slate-900 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000" className="w-full h-full object-cover opacity-80" alt="Handshake" />
                </div>

                {/* Bottom Information Section */}
                <div className="bg-slate-50 p-8 border-t border-slate-100">
                    <div className="flex items-center gap-8">
                        {/* Details Column */}
                        <div className="flex-1 grid grid-cols-2 gap-y-6 gap-x-8">
                            <div className="group">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <User size={12} className="text-primary" />
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Builder Name</p>
                                </div>
                                <p className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">VINOD</p>
                            </div>

                            <div className="group">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <ImageIcon size={12} className="text-primary" />
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Plot Number</p>
                                </div>
                                <p className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">L31/5</p>
                            </div>

                            <div className="col-span-1 group">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Phone size={12} className="text-primary" />
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Mobile Number</p>
                                </div>
                                <p className="text-xl font-black text-primary tracking-tighter leading-none">+91 9810993048</p>
                            </div>
                            <div className="col-span-1 group">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <MapPinHouse size={12} className="text-primary" />
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit Number</p>
                                </div>
                                <p className="text-xl font-black text-primary tracking-tighter leading-none">A-0501</p>
                            </div>
                            <div className="col-span-1 group">
                                <button
                                    // onClick={onConfirm}
                                    className="cursor-pointer w-full py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-slate-900/10 group flex items-center justify-center gap-2"
                                >
                                    <MessageCircle size={14} className="text-primary group-hover:text-white" />
                                    Chat
                                </button>
                            </div>
                            <div className="col-span-1 group">
                                <button
                                    // onClick={onConfirm}
                                    className="cursor-pointer w-full py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-slate-900/10 group flex items-center justify-center gap-2"
                                >
                                    <Phone size={14} className="text-primary group-hover:text-white" />
                                    Call Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Security Footer */}
                    <div className="mt-3 pt-6 border-t border-slate-200/60 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Verified Contact Information</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-[9px] font-black text-slate-900 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                            Close Details <X size={10} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
