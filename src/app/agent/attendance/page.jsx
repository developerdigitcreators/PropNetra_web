'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    Search, Bell, User, MapPin, Grid, List,
    Filter, Share2, Heart, ExternalLink, Calendar,
    Maximize2, Info, ArrowRight, Phone, MessageSquare,
    Compass, Home, Layers, Eye, PlusCircle, ChevronRight, Star,
    Edit3, Trash2, CheckCircle2, Clock, Map, Navigation,
    CalendarDays, History, Activity, ShieldCheck, Zap,
    X
} from 'lucide-react';

export default function AttendancePage() {
    const [selectedMonth, setSelectedMonth] = useState('May 2026');
    const [showApplyModal, setShowApplyModal] = useState(false);
    const containerRef = useRef(null);

    const employee = {
        name: "Abhisek Goldy",
        id: "AGENT-PN-1234",
        department: "Sales & Marketing",
        designation: "Senior Agent Partner",
        paidLeavesBalance: 14,
        reportingManager: "Vikram Singh (VP Sales)"
    };

    const monthlySummary = {
        totalWorkingDays: 26,
        presentDays: 22,
        paidLeaves: 2,
        unpaidLeaves: 0,
        publicHolidays: 1,
        onDuty: 1,
        halfDays: 1,
        shortLeaves: 2
    };

    const logs = [
        { id: 1, date: "May 14, 2026", in: "09:05 AM", out: "06:45 PM", status: "Present", loc: "Sector 71, SPR Road", coords: "28.4595, 77.0266" },
        { id: 2, date: "May 13, 2026", in: "09:12 AM", out: "07:15 PM", status: "Present", loc: "DLF Phase 5, Gurgaon", coords: "28.4721, 77.0850" },
        { id: 3, date: "May 12, 2026", in: "08:55 AM", out: "06:30 PM", status: "Present", loc: "Golf Course Ext Rd", coords: "28.4124, 77.0673" },
        { id: 4, date: "May 11, 2026", in: "---", out: "---", status: "Paid Leave", loc: "---", coords: null },
        { id: 5, date: "May 10, 2026", in: "10:30 AM", out: "06:30 PM", status: "Half Day", loc: "Ambience Mall", coords: "28.5033, 77.0970" },
    ];

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
                        Agent <span className="gradent_text_color">Attendance</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3 reveal-up">
                        <div className="w-10 h-px bg-slate-200"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">PropNetra Attendance</p>
                        <div className="w-10 h-px bg-slate-200"></div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-white font-sans selection:bg-primary/10 pb-3">
                <div ref={containerRef} className="max-w-[1600px] mx-auto px-6 md:px-12 mt-3">
                    {/* Employee Info Strip */}
                    <div className="bg-white rounded-xl border border-slate-200 p-8 py-5 mb-3">
                        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                            <div className="space-y-1">
                                <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none">Employee Name</p>
                                <p className="agent-meta font-black text-slate-900 leading-none mt-2">{employee.name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none">Employee ID</p>
                                <p className="agent-meta font-black text-slate-900 leading-none mt-2">{employee.id}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none">Department</p>
                                <p className="agent-meta font-black text-slate-900 uppercase tracking-widest leading-none mt-2">{employee.department}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none">Designation</p>
                                <p className="agent-meta font-black text-slate-900 uppercase tracking-widest leading-none mt-2">{employee.designation}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none">Paid Leaves Bal.</p>
                                <p className="agent-h4 font-black text-primary leading-none mt-1">{employee.paidLeavesBalance}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest leading-none">Reporting Manager</p>
                                <p className="agent-meta font-black text-slate-900 uppercase tracking-widest leading-none mt-2">{employee.reportingManager}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
                        {/* Main Content Area */}
                        <div className="xl:col-span-8 space-y-3">
                            {/* Attendance Summary Panel */}
                            <div className="bg-white rounded-xl border border-slate-200 p-10 py-3 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                    <div>
                                        <h3 className="agent-h2 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>
                                            Attendance <span className="gradent_text_color">Log</span>
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Year: 2026-27</p>
                                            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Past Month Data Enabled</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                                        <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all border border-slate-100 shadow-sm">
                                            <ChevronRight size={16} className="rotate-180" />
                                        </button>
                                        <span className="agent-small font-black text-slate-900 uppercase tracking-[0.2em] px-4">{selectedMonth}</span>
                                        <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all border border-slate-100 shadow-sm">
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-100">
                                                <th className="pb-6 text-left agent-tiny font-black text-slate-400 uppercase tracking-widest">Date</th>
                                                <th className="pb-6 text-left agent-tiny font-black text-slate-400 uppercase tracking-widest">Punch In</th>
                                                <th className="pb-6 text-left agent-tiny font-black text-slate-400 uppercase tracking-widest">Punch Out</th>
                                                <th className="pb-6 text-left agent-tiny font-black text-slate-400 uppercase tracking-widest">Status</th>
                                                <th className="pb-6 text-left agent-tiny font-black text-slate-400 uppercase tracking-widest">Live Loc</th>
                                                <th className="pb-6 text-right agent-tiny font-black text-slate-400 uppercase tracking-widest">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {logs.map((log) => (
                                                <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-6 agent-small font-black text-slate-900 uppercase tracking-tight">{log.date}</td>
                                                    <td className="py-6 agent-meta font-bold text-slate-600">{log.in}</td>
                                                    <td className="py-6 agent-meta font-bold text-slate-600">{log.out}</td>
                                                    <td className="py-6">
                                                        <span className={`px-4 py-1.5 rounded-xl agent-tiny font-black uppercase tracking-widest ${log.status === 'Present' ? 'bg-green-50 text-green-600' :
                                                            log.status === 'Half Day' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'
                                                            }`}>
                                                            {log.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-6">
                                                        {log.coords ? (
                                                            <a href={`https://maps.google.com/?q=${log.coords}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group/loc">
                                                                <MapPin size={14} className="group-hover/loc:animate-bounce" />
                                                                <span className="agent-tiny font-bold uppercase tracking-widest truncate max-w-[150px]">{log.loc}</span>
                                                            </a>
                                                        ) : <span className="text-slate-300">---</span>}
                                                    </td>
                                                    <td className="py-6 text-right">
                                                        <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                                                            <Edit3 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Summary Counts Below Table */}
                            <div className="bg-slate-900 rounded-xl p-10 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                <div className="relative z-10">
                                    <h4 className="agent-h3 font-normal mb-8" style={{ fontFamily: "WastedVindey, serif" }}>Monthly <span className="text-primary">Recap</span></h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                                        {[
                                            { label: 'Present', val: monthlySummary.presentDays, color: 'text-green-400' },
                                            { label: 'Paid Lv', val: monthlySummary.paidLeaves, color: 'text-amber-400' },
                                            { label: 'Unpaid Lv', val: monthlySummary.unpaidLeaves, color: 'text-red-400' },
                                            { label: 'Holiday', val: monthlySummary.publicHolidays, color: 'text-blue-400' },
                                            { label: 'On Duty', val: monthlySummary.onDuty, color: 'text-primary' },
                                            { label: 'Half Day', val: monthlySummary.halfDays, color: 'text-orange-400' },
                                            { label: 'Short Lv', val: monthlySummary.shortLeaves, color: 'text-purple-400' }
                                        ].map((s, i) => (
                                            <div key={i} className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                                <p className={`agent-h3 font-black ${s.color} mb-1`}>{s.val}</p>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Actions */}
                        <div className="xl:col-span-4 space-y-3">
                            {/* Working Days Visualization */}
                            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                                <h4 className="agent-h4 font-normal text-slate-900 mb-8" style={{ fontFamily: "WastedVindey, serif" }}>Effort <span className="gradent_text_color">Analytics</span></h4>
                                <div className="space-y-8">
                                    <div className="relative pt-2">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Attendance vs Target</p>
                                            <p className="agent-meta font-black text-slate-900">{monthlySummary.presentDays}/{monthlySummary.totalWorkingDays} Days</p>
                                        </div>
                                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                                            <div
                                                className="h-full bg-slate-900"
                                                style={{ width: `${(monthlySummary.presentDays / monthlySummary.totalWorkingDays) * 100}%` }}
                                            ></div>
                                            <div
                                                className="h-full bg-amber-400"
                                                style={{ width: `${(monthlySummary.paidLeaves / monthlySummary.totalWorkingDays) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex gap-4 mt-3">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Present</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Leaves</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Application Action Center */}
                            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <Zap className="text-primary" size={24} />
                                    <h4 className="agent-h4 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>Action <span className="gradent_text_color">Center</span></h4>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { label: "Compensatory Off", icon: <History size={18} /> },
                                        { label: "Half Day Request", icon: <Activity size={18} /> },
                                        { label: "Short Leave (SL)", icon: <Clock size={18} /> },
                                        { label: "Paid Leave (PL)", icon: <CalendarDays size={18} /> },
                                        { label: "Public Holiday", icon: <Star size={18} /> },
                                        { label: "On Duty Update", icon: <Navigation size={18} /> }
                                    ].map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setShowApplyModal(true)}
                                            className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-900 hover:text-white group transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="text-primary group-hover:text-white transition-colors">{action.icon}</div>
                                                <span className="agent-meta font-black uppercase tracking-widest">{action.label}</span>
                                            </div>
                                            <PlusCircle size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="agent-tiny font-bold text-slate-400 italic leading-relaxed text-center">
                                        All requests require Team Leader approval before updating salary processing records.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Application Modal (Mock) */}
                {showApplyModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowApplyModal(false)}></div>
                        <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
                            <button
                                onClick={() => setShowApplyModal(false)}
                                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="agent-h3 font-normal text-slate-900 mb-2" style={{ fontFamily: "WastedVindey, serif" }}>Submit <span className="gradent_text_color">Request</span></h3>
                            <p className="agent-small font-bold text-slate-400 uppercase tracking-widest mb-10">Application Center</p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Request Type</label>
                                    <select className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold focus:border-primary transition-all">
                                        <option>Paid Leave (PL)</option>
                                        <option>Half Day Request</option>
                                        <option>Short Leave (SL)</option>
                                        <option>On Duty Update</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">From Date</label>
                                        <input type="date" className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">To Date</label>
                                        <input type="date" className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Reason / Description</label>
                                    <textarea rows="3" className="w-full p-6 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold resize-none" placeholder="Explain your request..."></textarea>
                                </div>
                                <button className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black agent-small uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-xl shadow-slate-900/10">
                                    Submit for Approval
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
