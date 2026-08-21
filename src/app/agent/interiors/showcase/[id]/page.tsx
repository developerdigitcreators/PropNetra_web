'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, MapPin, ChevronRight, Share2, Download, 
    ArrowRight, CheckCircle2, Building2, Layout, Award,
    Clock, ShieldCheck, BadgeCheck
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../../../../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const developerData = {
    "m3m": {
        name: "M3M India",
        fullName: "Magnificence in the Trinity of Men, Materials & Money",
        logo: "https://www.m3m-india.com/assets/images/logo.png",
        banner: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
        description: "M3M India is one of the fastest-growing real estate developers in the country, known for speed, quality, and luxury. Our collaboration focuses on delivering premium interiors that match their 'Smart City' vision.",
        stats: [
            { label: "Projects Completed", value: "30+" },
            { label: "Ongoing Developments", value: "15+" },
            { label: "Total Area Delivered", value: "20M+ Sq.Ft" }
        ],
        projects: {
            "Completed": [
                { name: "M3M Golfestate", location: "Sector 65, Gurgaon", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800", units: "50+ Interior Units", tags: ["Ultra Luxury", "Golf Facing"] },
                { name: "M3M Merlin", location: "Sector 67, Gurgaon", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800", units: "35+ Interior Units", tags: ["Modern Living", "Family Focus"] }
            ],
            "Under Construction": [
                { name: "M3M Crown", location: "Sector 111, Gurgaon", img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800", units: "Entire Tower Fit-out", tags: ["Upcoming", "Premium"] },
                { name: "M3M Capital", location: "Sector 113, Gurgaon", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800", units: "Show Flats Ready", tags: ["New Launch", "Strategic"] }
            ],
            "Ready to Move": [
                { name: "M3M Woodshire", location: "Sector 107, Gurgaon", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800", units: "15+ Units Available", tags: ["Immediate Possession", "Luxury"] }
            ]
        }
    },
    "dlf": {
        name: "DLF Limited",
        fullName: "Delhi Land & Finance",
        logo: "https://www.dlf.in/images/dlf-logo.png",
        banner: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000",
        description: "DLF is India's largest publicly listed real estate company. Our association with DLF spans across their most prestigious addresses, providing end-to-end interior solutions for the elite.",
        stats: [
            { label: "Years of Legacy", value: "75+" },
            { label: "Residential Townships", value: "22+" },
            { label: "Commercial Space", value: "32M+ Sq.Ft" }
        ],
        projects: {
            "Completed": [
                { name: "DLF The Ultima", location: "Sector 81, Gurgaon", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800", units: "40+ Interior Units", tags: ["Eco Friendly", "Spacious"] }
            ],
            "Under Construction": [
                { name: "DLF One Midtown", location: "Moti Nagar, Delhi", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800", units: "Sample Units Delivered", tags: ["Central Delhi", "Luxury"] }
            ],
            "Ready to Move": [
                { name: "DLF Crest", location: "DLF Phase 5, Gurgaon", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800", units: "Bespoke Units", tags: ["Iconic", "Gated"] }
            ]
        }
    }
};

export default function DeveloperShowcasePage({ params }) {
    const devId = params.id || "m3m";
    const developer = developerData[devId] || developerData["m3m"];
    const [activeTab, setActiveTab] = useState("Completed");
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-in-up", 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            );

            gsap.fromTo(".stats-card", 
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)", scrollTrigger: ".stats-container" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="pt-20 pb-20 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="fade-in-up">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-center">
                                    <Building2 className="text-primary" size={32} />
                                </div>
                                <div>
                                    <h1 className="title-reveal-large font-normal leading-tight mb-2 text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>
                                        {developer.name.split(' ')[0]} <span className="gradent_text_color">{developer.name.split(' ').slice(1).join(' ')}</span>
                                    </h1>
                                    <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">{developer.fullName}</p>
                                </div>
                            </div>
                            <p className="agent-h3 font-light text-slate-600 leading-relaxed mb-10 font-roboto">
                                {developer.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stats-container">
                                {developer.stats.map((stat, i) => (
                                    <div key={i} className="stats-card bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                                        <p className="agent-tiny font-black text-primary uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="agent-h2 font-normal text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative fade-in-up">
                            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                                <img src={developer.banner} className="w-full h-full object-cover" alt={developer.name} />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl max-w-[280px]">
                                <BadgeCheck className="text-primary mb-4" size={40} />
                                <h4 className="agent-h4 font-normal mb-2" style={{ fontFamily: "WastedVindey, serif" }}>Strategic Partner</h4>
                                <p className="agent-tiny font-light text-white/60 font-roboto">PropNetra is the authorized interior partner for {developer.name} projects.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Showcase */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                        <div>
                            <h2 className="title-reveal-large font-normal text-slate-900 mb-4" style={{ fontFamily: "WastedVindey, serif" }}>
                                Project <span className="gradent_text_color">Portfolio</span>
                            </h2>
                            <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4">FILTER BY DEVELOPMENT STAGE</p>
                        </div>
                        
                        <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                            {["Completed", "Under Construction", "Ready to Move"].map((tab) => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-3 rounded-xl agent-tiny font-black uppercase tracking-widest transition-all ${
                                        activeTab === tab 
                                        ? 'bg-slate-900 text-white shadow-lg' 
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {developer.projects[activeTab].map((project, i) => (
                            <div key={i} className="bg-white rounded-[1.5rem] overflow-hidden border border-slate-200 hover:border-primary/40 transition-all duration-700 group hover:-translate-y-2 shadow-sm hover:shadow-xl">
                                <div className="h-[200px] relative overflow-hidden">
                                    <img src={project.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={project.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {project.tags.map((tag, j) => (
                                                <span key={j} className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white border border-white/20">{tag}</span>
                                            ))}
                                        </div>
                                        <h3 className="agent-h2 font-normal text-white leading-tight" style={{ fontFamily: "WastedVindey, serif" }}>{project.name}</h3>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-slate-500 mb-4">
                                        <MapPin size={14} />
                                        <span className="agent-small font-bold uppercase tracking-widest">{project.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                                        <div>
                                            <p className="agent-tiny font-black text-slate-500 uppercase mb-0.5 tracking-wider">Scope</p>
                                            <p className="agent-small font-bold text-slate-900">{project.units}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                                            <Layout size={14} />
                                        </div>
                                    </div>
                                    <button className="w-full group/btn flex items-center justify-center gap-3 px-4 py-4 bg-slate-900 text-white rounded-xl agent-small font-black uppercase tracking-widest hover:bg-primary transition-all duration-500 shadow-lg shadow-slate-900/10">
                                        Explore Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Partner with us */}
            <section className="py-20 px-6 bg-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-12 translate-x-24 -z-10"></div>
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="mb-12">
                        <h2 className="title-reveal-large font-normal mb-6 text-slate-900" style={{ fontFamily: "WastedVindey, serif" }}>
                            Developer <br />
                            <span className="gradent_text_color">Collaboration</span>
                        </h2>
                        <p className="agent-small font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-900 pl-4 mb-8">WHY PARTNER WITH US</p>
                        <div className="space-y-6">
                            {[
                                { title: "Rapid Deployment", desc: "Our standardized modules allow us to deliver multiple units in record time without compromising quality.", icon: <Clock /> },
                                { title: "Brand Alignment", desc: "We ensure our designs perfectly complement the architectural language of the developer's project.", icon: <Award /> },
                                { title: "Quality Assurance", desc: "Rigorous 140+ point quality checks ensure every unit meets the developer's premium standards.", icon: <ShieldCheck /> }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all">{item.icon}</div>
                                    <div>
                                        <h4 className="agent-meta font-black text-slate-900 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="agent-body font-light text-slate-500 font-roboto">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000" className="w-full h-full object-cover" alt="Partnership" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
