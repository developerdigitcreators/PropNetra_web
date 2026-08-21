'use client';

import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose }) {
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

    const options = [
        "Price - Incorrect",
        "Builder Detail - Incorrect",
        "Location - Incorrect",
        "Sold Status - Incorrect"
    ];

    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOption = (opt) => {
        if (selectedOptions.includes(opt)) {
            setSelectedOptions(selectedOptions.filter(item => item !== opt));
        } else {
            setSelectedOptions([...selectedOptions, opt]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 p-10">
                <button onClick={onClose} className="cursor-pointer absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                    <X size={20} />
                </button>

                <h2 className="text-3xl font-black text-slate-900 text-center mb-10 tracking-tight">Feedback</h2>

                <div className="grid grid-cols-2 gap-x-4 gap-y-8 mb-10">
                    {options.map((opt) => (
                        <div key={opt} className="flex flex-col gap-3">
                            <label className="text-[10px] font-bold text-slate-400 tracking-widest leading-none">{opt}</label>
                            <label className="relative flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selectedOptions.includes(opt)}
                                    onChange={() => toggleOption(opt)}
                                />
                                <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200 shadow-sm ${selectedOptions.includes(opt)
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-slate-100 bg-white text-transparent group-hover:border-slate-300'
                                    }`}>
                                    <Check size={20} strokeWidth={4} className={`transition-all duration-300 ${selectedOptions.includes(opt) ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3 mb-10">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remarks</label>
                    <textarea
                        placeholder="Enter your remarks here"
                        className="w-full h-32 p-6 bg-slate-50 rounded-xl border border-slate-100 shadow outline-none focus:ring-2 focus:ring-blue-600/10 text-sm font-medium resize-none transition-all"
                    ></textarea>
                </div>

                <button
                    onClick={onClose}
                    className="cursor-pointer w-full py-3 bg-black text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
