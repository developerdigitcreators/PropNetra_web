'use client';

import React from 'react';
import { X } from 'lucide-react';

export default function FeedbackPage() {
    const options = [
        "Price - Incorrect",
        "Builder Detail - Incorrect",
        "Location - Incorrect",
        "Sold Status - Incorrect"
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 selection:bg-primary/10">
            <div className="bg-white/90 backdrop-blur-2xl w-full max-w-xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden p-12 md:p-16 border border-white/20">
                <div className="flex justify-between items-center mb-16">
                    <h1 className="agent-h2 font-black text-slate-900 tracking-tighter">Feedback <span className="gradent_text_color">Form</span></h1>
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <X size={24} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-12">
                    {options.map((opt) => (
                        <div key={opt} className="flex flex-col gap-4">
                            <label className="agent-small font-black text-slate-400 uppercase tracking-[0.2em]">{opt}</label>
                            <label className="relative flex items-center cursor-pointer group">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="w-14 h-14 rounded-2xl border-2 border-slate-100 flex items-center justify-center transition-all peer-checked:border-primary peer-checked:bg-primary/5 group-hover:border-slate-300 shadow-sm">
                                    <div className="w-4 h-4 bg-primary rounded-sm opacity-0 scale-50 transition-all peer-checked:opacity-100 peer-checked:scale-100 shadow-[0_0_15px_rgba(var(--primary),0.3)]"></div>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4 mb-16">
                    <label className="agent-small font-black text-slate-400 uppercase tracking-[0.2em]">Remarks</label>
                    <textarea 
                        placeholder="Please describe the issue in detail..."
                        className="w-full h-48 p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white agent-body font-medium resize-none transition-all placeholder:text-slate-300"
                    ></textarea>
                </div>

                <button 
                    className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black agent-small uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-primary/30 active:scale-[0.98]"
                >
                    SUBMIT FEEDBACK
                </button>
            </div>
        </div>
    );
}
