'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AdvanceSearchModal({ isOpen, onClose }) {
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const toggleFeature = (feat) => {
        setSelectedFeatures(prev => 
            prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
        );
    };

    if (!isOpen) return null;

    return (
        <div className="absolute top-full mt-4 right-0 w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Header */}
                <div className="shrink-0 flex items-center justify-between p-8 border-b border-slate-100">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Advance Search</h2>
                    <button onClick={onClose} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                        <X size={24} />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* Locality */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Locality *</label>
                            <select className="w-full h-14 px-6 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-slate-900/5 transition-all">
                                <option>Select option</option>
                                <option>Gurgaon</option>
                                <option>Delhi</option>
                            </select>
                        </div>

                        {/* BHK Type */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">BHK Type</label>
                            <select className="w-full h-14 px-6 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-slate-900/5 transition-all">
                                <option>Select option</option>
                                <option>1 BHK</option>
                                <option>2 BHK</option>
                                <option>3 BHK</option>
                                <option>4 BHK</option>
                            </select>
                        </div>

                        {/* Plot Size */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Plot Size</label>
                            <select className="w-full h-14 px-6 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-slate-900/5 transition-all">
                                <option>Select option</option>
                            </select>
                        </div>

                        {/* Plot Num */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Plot Num</label>
                            <input type="text" placeholder="Enter plot number" className="w-full h-14 px-6 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-slate-900/5 transition-all" />
                        </div>

                        {/* Road */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Road</label>
                            <select className="w-full h-14 px-6 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-slate-900/5 transition-all">
                                <option>Enter road in meter</option>
                            </select>
                        </div>

                        {/* Builder Number */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Builder Number</label>
                            <input type="text" placeholder="Enter builder number" className="w-full h-14 px-6 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-slate-900/5 transition-all" />
                        </div>
                    </div>

                    {/* Budget Slider */}
                    <div className="mb-12">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 block">Budget</label>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-1 h-14 px-6 bg-slate-50 rounded-2xl flex items-center text-sm font-black text-slate-900">₹ 2 Cr</div>
                            <div className="w-12 h-0.5 bg-slate-200"></div>
                            <div className="flex-1 h-14 px-6 bg-slate-50 rounded-2xl flex items-center text-sm font-black text-slate-900">₹ 25 Cr</div>
                        </div>
                        <div className="relative h-2 bg-slate-100 rounded-full">
                            <div className="absolute left-[10%] right-[30%] h-full bg-slate-900 rounded-full"></div>
                            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-slate-900 rounded-full shadow-lg cursor-pointer"></div>
                            <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-slate-900 rounded-full shadow-lg cursor-pointer"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* Floors */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Floors</label>
                            <select className="w-full h-14 px-6 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none appearance-none cursor-pointer">
                                <option>Select option</option>
                            </select>
                        </div>

                        {/* Facing */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Facing</label>
                            <select className="w-full h-14 px-6 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none appearance-none cursor-pointer">
                                <option>Select option</option>
                            </select>
                        </div>

                        {/* Construction Status */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Builder floor Construction Status</label>
                            <select className="w-full h-14 px-6 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none appearance-none cursor-pointer">
                                <option>Select option</option>
                            </select>
                        </div>
                    </div>

                    {/* Features Checkboxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                        {['Corner', 'Park Facing', 'Gated', 'Duplex'].map((feat) => {
                            const isSelected = selectedFeatures.includes(feat);
                            return (
                                <label 
                                    key={feat} 
                                    className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all group ${isSelected ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:bg-slate-50'}`}
                                    onClick={() => toggleFeature(feat)}
                                >
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected ? 'border-slate-900' : 'border-slate-200 group-hover:border-slate-400'}`}>
                                        <div className={`w-2.5 h-2.5 bg-slate-900 rounded-sm transition-all ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${isSelected ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{feat}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="shrink-0 p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
                    <button onClick={onClose} className="px-12 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Cancel</button>
                    <button className="px-16 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">Apply</button>
                </div>
            </div>
    );
}
