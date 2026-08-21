'use client';
import React, { useState, useEffect } from 'react';
import {
    Calculator,
    ChevronRight,
    CheckCircle2,
    HelpCircle,
    DollarSign,
    Percent,
    Calendar,
    ArrowRight,
    Home,
    ShieldCheck,
    FileText,
    TrendingUp,
    ChevronDown,
    ChevronLeft,
    Phone,
    Mail,
    User,
    Check
} from 'lucide-react';

export default function HomeLoansPage() {
    const [amount, setAmount] = useState(5000000);
    const [interest, setInterest] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [emi, setEmi] = useState(0);
    const [selectedYear, setSelectedYear] = useState(2026);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        const r = interest / (12 * 100);
        const n = tenure * 12;
        const emiValue = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setEmi(Math.round(emiValue));
    }, [amount, interest, tenure]);

    const bankLogos = [
        '/images/bank1.png',
        '/images/bank2.jpg',
        '/images/bank3.png',
        '/images/bank1.png',
        '/images/bank2.jpg',
        '/images/bank3.png',
    ];

    const procedures = [
        {
            title: "Application Submission",
            desc: "Complete documentation and initial application fee submission to our 40+ banking partners.",
            icon: <FileText className="text-blue-500" />
        },
        {
            title: "Verification Process",
            desc: "On-site property appraisal and personal financial background checks by bank officials.",
            icon: <ShieldCheck className="text-green-500" />
        },
        {
            title: "Technical Analysis",
            desc: "Final property assessment and legal vetting of the property documents.",
            icon: <Home className="text-orange-500" />
        },
        {
            title: "Sanction & Disbursal",
            desc: "Approval of loan amount and final funds transfer to the seller or developer.",
            icon: <CheckCircle2 className="text-primary" />
        }
    ];

    const faqs = [
        {
            q: "What is the maximum loan amount I can avail?",
            a: "Typically, banks provide up to 80-90% of the property's market value, depending on your income profile and credit score."
        },
        {
            q: "How long does the approval process take?",
            a: "With PropNetra's fast-track channel, pre-approval usually takes 48-72 hours, while final disbursal takes 7-10 working days."
        },
        {
            q: "Are there any hidden charges?",
            a: "PropNetra ensures 100% transparency. Standard charges include processing fees, legal valuation, and stamp duty as per bank norms."
        }
    ];

    const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

    return (
        <div className="min-h-screen bg-white">
            {/* 1. Hero Section */}
            <div className="relative h-[400px] pt-24 md:pt-32 overflow-hidden bg-slate-900 border-b border-slate-800">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row justify-between items-start">
                    <div className="max-w-4xl">
                        <h1 className="agent-hero font-normal text-white mb-6 pr-4 md:pr-10 leading-[0.85]" style={{ fontFamily: "WastedVindey, serif" }}>
                            Seamless <br />
                            <span className="gradent_text_color">Home Loans</span>
                        </h1>
                        <p className="agent-body text-slate-400 max-w-xl font-light leading-relaxed mb-8 hidden md:block">
                            Navigate the complex landscape of real estate finance with our elite banking network.
                            Institutional-grade advisory for your residential investments.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <span className="agent-tiny font-black text-slate-400 uppercase tracking-widest mb-1">powered by</span>
                        <div className="flex items-center gap-2 opacity-70">
                            <span className="agent-h2 font-black tracking-tighter text-white">MAGIC</span>
                            <span className="agent-h2 font-black tracking-tighter text-red-600">LOANS</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. EMI Calculator & Sidebar */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-12 -mt-10 md:-mt-20 relative z-20 pb-20 border-b border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* EMI Calculator */}
                    <div className="lg:col-span-8 bg-white rounded-[2rem] md:rounded-[3rem] p-5 md:p-10 shadow-2xl border border-slate-100">
                        <div className="flex items-center justify-between mb-6 md:mb-10">
                            <div>
                                <h2 className="agent-h2 font-normal text-slate-900 py-2" style={{ fontFamily: "WastedVindey, serif" }}>EMI <span className="gradent_text_color">Architect</span></h2>
                                <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">Precision Mortgage Calculator</p>
                            </div>
                            <div className="p-2 md:p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <FileText className="text-slate-300" size={20} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="space-y-6 md:space-y-8">
                                {/* Loan Amount Slider */}
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex justify-between items-end">
                                        <label className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Loan Amount</label>
                                        <span className="agent-h3 font-black text-slate-900">₹{(amount / 100000).toFixed(1)}L</span>
                                    </div>
                                    <input
                                        type="range" min="500000" max="50000000" step="100000" value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                {/* Interest Slider */}
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex justify-between items-end">
                                        <label className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Interest Rate (%)</label>
                                        <span className="agent-h3 font-black text-slate-900">{interest}%</span>
                                    </div>
                                    <input
                                        type="range" min="6" max="15" step="0.1" value={interest}
                                        onChange={(e) => setInterest(Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                {/* Tenure Slider */}
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex justify-between items-end">
                                        <label className="agent-tiny font-black text-slate-400 uppercase tracking-widest">Tenure (Years)</label>
                                        <span className="agent-h3 font-black text-slate-900">{tenure}Y</span>
                                    </div>
                                    <input
                                        type="range" min="5" max="30" step="1" value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-primary/10 rounded-full blur-[40px] md:blur-[60px]"></div>
                                <div className="relative z-10">
                                    <p className="agent-tiny font-black text-primary uppercase tracking-[0.3em] mb-2 md:mb-4">Monthly Commitment</p>
                                    <h3 className="agent-h1 font-black tracking-tighter mb-1">₹{emi.toLocaleString()}</h3>
                                    <p className="text-slate-400 agent-tiny font-medium uppercase tracking-widest">Calculated EMI</p>
                                </div>

                                <div className="relative z-10 pt-4 md:pt-6 border-t border-white/5 mt-4 md:mt-6 grid grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <p className="agent-tiny font-black text-slate-500 uppercase tracking-widest mb-1">Total Interest</p>
                                        <p className="agent-body font-bold">₹{((emi * tenure * 12) - amount).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="agent-tiny font-black text-slate-500 uppercase tracking-widest mb-1">Total Payable</p>
                                        <p className="agent-body font-bold">₹{(emi * tenure * 12).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-8 agent-meta text-slate-400 leading-relaxed max-w-3xl">
                            <span className="font-bold text-slate-600 uppercase tracking-widest mr-2">Disclaimer:</span> These calculators are only for illustrative purposes. These figures may or may not be applicable to your particular situation. Users must confirm all calculations and terms directly with the bank. Rates and charges may be revised at any time. Magicbricks will not be responsible for any loss or liability arising from the use of these calculators.
                        </p>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-5 md:p-7 shadow-2xl border border-slate-100 flex flex-col h-full">
                            <div className="mb-4 md:mb-6">
                                <h3 className="agent-body font-bold text-slate-600 px-4 pt-2 inline-block rounded-lg mb-4 leading-tight">Boost Your Income With Every Loan Closure</h3>
                                <div className="space-y-4 mt-3">
                                    {[
                                        { label: "40+ Banking Partners", desc: "Access to private & public sectors" },
                                        { label: "Secure Processing", desc: "Direct disbursal into builder accounts" },
                                        { label: "Best ROI Guarantee", desc: "Pre-negotiated interest rates" },
                                        { label: "Get Highest Payout", desc: "Earn up to ₹25,000 per loan" },
                                        { label: "Quick And Higher Earnings", desc: "No hidden charges for agents" },
                                        { label: "Channel Partner Recognition", desc: "Get Certified From Banks" }

                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <div>
                                                <p className="agent-meta font-black text-slate-900 uppercase tracking-tight">{item.label}</p>
                                                <p className="agent-tiny text-slate-400 uppercase tracking-widest">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-0 mt-auto">
                                <div className="pt-6 flex flex-col justify-center items-center gap-1 opacity-80">
                                    <span className="agent-tiny font-black tracking-tighter text-slate-400 uppercase">Powered by</span>
                                    <div className="flex items-center gap-2 opacity-70">
                                        <span className="agent-h2 font-black tracking-tighter text-primary">MAGIC</span>
                                        <span className="agent-h2 font-black tracking-tighter text-red-600">LOANS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Bank Tie-Ups */}
                <div className="mt-4 md:mt-6 pt-4 md:pt-12 border-t border-slate-100">
                    <div className="flex flex-col items-start mb-8 md:mb-12">
                        <h2 className="agent-h2 font-normal text-slate-900 py-2 mb-2" style={{ fontFamily: "WastedVindey, serif" }}>Bank <span className="gradent_text_color">Tie-Ups</span></h2>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">To Serve Your Screened Customer Requirements</p>
                    </div>

                    <div className="relative overflow-hidden group py-2 md:py-6 px-4 border-y border-slate-100">
                        <div className="flex gap-6 md:gap-12 animate-marquee whitespace-nowrap">
                            {[...bankLogos, ...bankLogos].map((logo, i) => (
                                <div key={i} className="w-28 h-14 md:w-40 md:h-20 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center p-3 md:p-4 hover:border-primary transition-all group/logo shrink-0">
                                    <img src={logo} alt="Bank" className="h-full w-full object-contain filter transition-all" />
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 bg-white -mt-2 agent-tiny font-black text-slate-300 uppercase tracking-[0.5em]">Logo Auto Scroll</div>
                    </div>
                </div>

                {/* 4. Amortization Table */}
                <div className="mt-4 md:mt-4 pt-4 md:pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 md:gap-4 border-b border-slate-100 mb-0 md:mb-0 overflow-x-auto no-scrollbar pb-1">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-4 md:px-8 py-3 md:py-4 agent-meta font-black uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${selectedYear === year ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 overflow-x-auto shadow-xl no-scrollbar">
                        <table className="w-full text-left min-w-[800px]">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    {['Month', 'Beginning Loan Balance', 'EMI', 'Principal', 'Monthly Interest', 'Outstanding Balances'].map((head) => (
                                        <th key={head} className="px-6 py-4 md:py-6 agent-small font-black text-slate-500 uppercase tracking-widest">{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="agent-body font-bold text-slate-600">
                                {['January', 'February', 'March', 'April', 'May', 'June'].map((month, idx) => (
                                    <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 md:py-6 font-black text-slate-900 md:text-base">{month}</td>
                                        <td className="px-6 py-4 md:py-6">₹{amount.toLocaleString()}</td>
                                        <td className="px-6 py-4 md:py-6">₹{emi.toLocaleString()}</td>
                                        <td className="px-6 py-4 md:py-6">₹{Math.round(emi * 0.4).toLocaleString()}</td>
                                        <td className="px-6 py-4 md:py-6">₹{Math.round(emi * 0.6).toLocaleString()}</td>
                                        <td className="px-6 py-4 md:py-6">₹{(amount - (emi * 0.4)).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 5. Apply Now Section */}
                <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-slate-100">
                    <div className=" rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl max-w-6xl mx-auto">
                        <div className="lg:w-1/2 relative min-h-[200px] md:min-h-[300px]">
                            <img src="/images/loan1.jpg" alt="Apply Now" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute top-6 left-6 md:top-8 md:left-8 text-white drop-shadow-lg">
                                <h2 className="agent-h2 font-normal leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>Apply for <br /> Home loan</h2>
                            </div>
                        </div>
                        <div className="lg:w-1/2 p-4 md:p-6 lg:p-8 bg-white m-1 md:m-2 rounded-[1.5rem] md:rounded-[2rem] shadow-xl">
                            <div className="max-w-md mx-auto">
                                <h3 className="agent-h3 font-bold text-slate-900 mb-1">Get Your Best Home Loan offer!</h3>
                                <p className="agent-small text-slate-400 mb-3 md:mb-4">Enter your details to check eligible offers from 40+ banks</p>

                                <form className="space-y-2 md:space-y-3">
                                    <div className="space-y-1 md:space-y-1.5">
                                        <label className="agent-meta font-black text-slate-400 uppercase tracking-widest">Enter Loan Amount</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                            <input type="number" placeholder="50,00,000" className="w-full h-10 md:h-11 bg-slate-50 rounded-xl px-12 agent-meta font-bold outline-none border border-slate-100 focus:border-primary transition-all" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                            <input type="text" placeholder="Full Name" className="w-full h-10 md:h-11 bg-slate-50 rounded-xl px-12 agent-meta font-bold outline-none border border-slate-100 focus:border-primary transition-all" />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                            <input type="email" placeholder="Email" className="w-full h-10 md:h-11 bg-slate-50 rounded-xl px-12 agent-meta font-bold outline-none border border-slate-100 focus:border-primary transition-all" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                        <input type="tel" placeholder="Mobile Number" className="w-full h-10 md:h-11 bg-slate-50 rounded-xl px-12 agent-meta font-bold outline-none border border-slate-100 focus:border-primary transition-all" />
                                    </div>
                                    <button className="cursor-pointer w-full h-11 md:h-12 gradent_bg_color text-white rounded-xl font-black agent-small uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-red-600/10 active:scale-[0.98]">
                                        Check Offers
                                    </button>
                                    <p className="agent-small text-center text-slate-400 uppercase tracking-widest">By continuing, I agree to <span className="text-primary font-bold">Propnetra T&C</span></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. Disbursal Pathway */}
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-100">
                    <div className="flex flex-col items-start mb-8 md:mb-8">
                        <h2 className="agent-h2 font-normal text-slate-900 py-2 mb-2" style={{ fontFamily: "WastedVindey, serif" }}>Disbursal <span className="gradent_text_color">Pathway</span></h2>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-[0.4em] border-l-4 border-slate-900 pl-4">Everything you need to know about mortgage logistics</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {procedures.map((item, i) => (
                            <div key={i} className="group p-8 md:p-10 rounded-[2.5rem] border border-slate-100 hover:border-primary transition-all duration-500 bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-left flex flex-col">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center mb-8 md:mb-12 group-hover:scale-110 transition-transform shadow-inner">
                                    <div className="text-blue-600">
                                        {React.cloneElement(item.icon, { size: 28, className: "" })}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-6 md:mb-8">
                                    <span className="agent-h3 opacity-20 font-black gradent_text_color leading-none">0{i + 1}</span>
                                    <h4 className="agent-small font-black text-slate-900 uppercase tracking-tighter leading-tight">{item.title}</h4>
                                </div>

                                <p className="agent-meta font-medium text-slate-500 leading-relaxed pr-4">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. FAQ Section */}
                <div className="mt-0 md:mt-6 pt-4 md:pt-6 border-t border-slate-100">
                    <div className="flex flex-col items-start mb-8 md:mb-12">
                        <h2 className="agent-h2 font-normal text-slate-900 py-2 mb-2" style={{ fontFamily: "WastedVindey, serif" }}>Financial Intelligence <span className="gradent_text_color">FAQ</span></h2>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-[0.4em] border-l-4 border-slate-900 pl-4">Everything you need to know about mortgage logistics</p>
                    </div>

                    <div className="space-y-3 md:space-y-4 mx-auto">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`group border rounded-[1.5rem] md:rounded-xl bg-white transition-all duration-300 ${openFaq === i ? 'border-primary shadow-xl ring-1 ring-primary/20' : 'border-slate-100 hover:shadow-lg'}`}>
                                <div
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="p-5 md:px-12 flex items-center justify-between cursor-pointer"
                                >
                                    <div className="flex items-center gap-4 md:gap-8">
                                        <span className={`agent-h3 font-black transition-colors ${openFaq === i ? 'text-primary' : 'text-slate-200 group-hover:text-primary/40'}`}>0{i + 1}</span>
                                        <h4 className="agent-tiny font-black text-slate-600 uppercase tracking-widest">{faq.q}</h4>
                                    </div>
                                    <ChevronDown className={`text-slate-300 transition-all duration-300 ${openFaq === i ? 'text-primary rotate-180' : 'group-hover:text-primary'}`} size={18} />
                                </div>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-10 md:px-24 pb-8 agent-body font-medium text-slate-500 leading-relaxed">
                                        <div className="pt-2 border-t border-slate-50">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { display: flex; animation: marquee 30s linear infinite; }
                .animate-marquee:hover { animation-play-state: paused; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
}
