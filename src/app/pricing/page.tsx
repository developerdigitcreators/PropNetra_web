"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./pricing.css";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPage() {
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const containerRef = useRef(null);
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const refCallbacks = useRef<{
        onMouseMoveBox1?: (e: React.MouseEvent) => void;
        onMouseLeaveBox1?: () => void;
        onMouseMoveBox2?: (e: React.MouseEvent) => void;
        onMouseLeaveBox2?: () => void;
    }>({});

    const plans = [
        {
            id: "max",
            name: "Lite Plan",
            badge: "Most Popular",
            price: "₹2,988",
            originalPrice: "₹2,376",
            savePercent: "50%",
            perMonth: "Rs. 99 Per Liser Monthly / Device",
            builderFloor: "Incl 50 Contacts (Per Month / User)",
            features: [
                "Unlimited Connections",
                "1000 SMS Monthly",
                "200 Lead Capture Forms",
            ],
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            highlight: true,
            color: { pill: "linear-gradient(135deg,#7c3aed,#a855f7)", badge: "linear-gradient(135deg,#9333ea,#c084fc)", icon: "#c084fc" },
        },
    ];

    const addOns = [
        {
            name: "Resale Channel Lisings",
            contacts: "Get s0 contacts",
            price: "50 NetraCoins Credit",
            limit: "Monthly Limit: Upto 300 contacts per User",
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            name: "Builder Listing Connect",
            contacts: "Get 25 Contacts",
            price: "125 NetraCoins Credit",
            limit: "Monthly Limit: Upto 150 Contacts",
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            name: "Team GEO Tagging",
            contacts: "No Team Limit",
            price: "Contact Sales Team",
            limit: "For Existing Subscribed Partners",
            icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
    ];

    const referralBenefits = [
        { referrals: "1 Reference", credits: "25%" },
        { referrals: "2 References", credits: "40%" },
        { referrals: "3 References", credits: "60%" },
        { referrals: "4 References", credits: "100%" },
    ];

    const referralNotes = [
        "1) NetraCoins can be used only for purchasing add-on benefits within the platform (1 NetraCoin = ₹1 in value)",
        "2) NetraCoins cannot be used to pay for subscription plans.",
        "3) NetraCoins are non-transferable and cannot be redeemed for cash or account credit.",
        "4) Get a one-time 15% discount on subscription by like and subscribe PropNetra social media pages.",
        "5) If user unfollow or unsubscribe after availing the discount, the discounted amount will be charged back to your account.",
        "6) NetraCoins credits for both Referrer and Referee shall be awarded only when the Referee registers using the Referrer's valid PropNetra ID at the time of sign-up and successfully purchases an eligible subscription.",
        "7) The Referee shall be entitled to receive NetraCoins equivalent to 10% of the amount paid towards an eligible subscription.",
        "8) All NetraCoins credits issued under this program shall remain valid for a period not exceeding 365 days from the date of issuance, after which they shall automatically expire without prior notice.",
    ];

    const mainFeatures = [
        {
            category: "Property Listing & Contacts (Each Agent)",
            items: [
                {
                    name: "Property Listing (Resale, Buy, Rent, Pre-Leased)",
                    detail: "Verified Agent - 100 Listings (Per Months) | Others Agents - 25 Listings (Per Month)",
                    subDetail: "Limit - Upto 40 Listings weekly | Limit - Upto 10 Listings weekly"
                },
                {
                    name: "Contact Resale Lisitngs",
                    detail: "Free 100 Contacts"
                },
            ],
        },
        {
            category: "Add-ons To Accelerate Your Business",
            items: [
                { name: "Resale Channel Listings", detail: "Monthly Limit upto 300 Contacts" },
                { name: "Builder Floor (Direct Inventory)", detail: "Monthly Limit upto 150 Contacts" },
                { name: "Team Attendance via GEOLocation Punching + Live Location", detail: "No Limit" },
            ],
        },
        {
            category: "PropNetra Exclusive Features",
            items: [
                { name: "Unified Notification Chatbot for Instant New Listing Alert" },
                { name: "AI Smart Buyer & Seller Property Matching" },
                { name: "Customizable Property Creatives" },
                { name: "Competetion Project campare To close deal faster" },
                { name: "Team Attendance & Geo Location Tagging | Live Location Tracking (Add-on)" },
                { name: "Direct Connect for Builder Floors (Add-on)" },
                { name: "Shorlisted Inventory Share via WhatsApp link" },
                { name: "Schedule client visit for builder floor" },
                { name: "Verified and Trusted Partner Badge" },
                { name: "Developer Corner - Ongoing & New Launch Projects" },
                { name: "Share Developer Project Details via Customised WhatsApp link" },
                { name: "Home EMI Calculator" },
                { name: "CRM Dashboard To Shorlist inventory as per client name & WhatApp later" },
            ],
        },
        {
            category: "Refer, Connect & Close (To Multiply YOUR Earnings)",
            items: [
                { name: "Exclusive Projects By PropNetra - Coming Soon" },
                { name: "Exclusive Interior Company Tie-Ups" },
                { name: "Exclusive Home Loan Tie-Ups (Mostly Public & Private Banks)" },
                { name: "Refer Friend, OnBoard & Earn" },
                { name: "Support Chat & Email" },
                { name: "Mandate Deals & File-In-Hand" },
                { name: "Property Requirement Section" },
            ],
        },
    ];

    const faqItems = [
        {
            question: "What's included in my plan?",
            answer: "Each plan includes property listings, SMS communications, lead capture forms, and access to our platform. Max plan includes Direct Builder Floor inventory with 50 contacts per month.",
        },
        {
            question: "Can I change my plan anytime?",
            answer: "Yes! You can upgrade from Lite to Max at any time. Changes take effect immediately.",
        },
        {
            question: "What is the Limited Period Offer?",
            answer: "Buy Subscription Now and GET FREE usage till 31st Dec 2026. Paid subscription charges are Non-Refundable.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, digital wallets, and bank transfers. GST is applicable as mentioned.",
        },
        {
            question: "How do NetraCoins work?",
            answer: "NetraCoins can be earned through referrals and used for purchasing add-on benefits. 1 NetraCoin = ₹1 in value. They are valid for 365 days from issuance.",
        },
        {
            question: "How do I get support?",
            answer: "Our support team is available via chat and email. You can also connect through WhatsApp for quick assistance.",
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                const animateIn = (selector, trigger, fromVars) => {
                    gsap.fromTo(selector,
                        { ...fromVars, immediateRender: false },
                        {
                            y: 0, x: 0, opacity: 1,
                            duration: 0.8,
                            stagger: 0.12,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger,
                                start: "top 85%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                };
                animateIn(".plan-card-new", ".plans-section", { y: 60, opacity: 0 });
                animateIn(".feature-group", ".comparison-section", { y: 40, opacity: 0 });
                animateIn(".addon-card-new", ".addons-section", { y: 40, opacity: 0 });
                animateIn(".ref-social, .ref-table, .ref-earning", ".referral-section", { y: 50, opacity: 0 });
                animateIn(".faq-item", ".pricing-faq", { y: 30, opacity: 0 });
                ScrollTrigger.refresh();
            }, containerRef);
            return () => ctx.revert();
        }, 500);
        return () => clearTimeout(timer);
    }, []);



    useEffect(() => {
        const ctx = gsap.context(() => {
            // Step entrance animation
            gsap.from(".step-item", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".step-container",
                    start: "top 80%",
                }
            });

            // Floating background blobs
            gsap.to(".blob", {
                y: "random(-40, 40)",
                x: "random(-40, 40)",
                duration: "random(4, 8)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5
            });

            gsap.to(".orbit-dot", {
                rotation: 360,
                duration: 8,
                repeat: -1,
                ease: "none"
            });

            // Arrow flow animation
            gsap.to(".flow-arrow", {
                x: 15,
                repeat: -1,
                duration: 1.2,
                yoyo: true,
                ease: "power2.inOut",
                stagger: 0.2
            });

            // Removed GSAP counter to use react-countup
            // gsap.from(".metric-value", { ... });

            // 3D Tilt Effect for cards
            const handleTilt = (e, ref, intensity = 10) => {
                const { clientX, clientY } = e;
                const rect = ref.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const xPos = ((clientX - centerX) / rect.width) * intensity;
                const yPos = ((clientY - centerY) / rect.height) * intensity;

                gsap.to(ref.current, {
                    rotateY: xPos,
                    rotateX: -yPos,
                    duration: 0.5,
                    ease: "power2.out",
                    transformPerspective: 1000
                });
            };

            const resetTilt = (ref) => {
                gsap.to(ref.current, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            };

            // Apply tilt to Box 1
            const onMouseMoveBox1 = (e) => handleTilt(e, box1Ref);
            const onMouseLeaveBox1 = () => resetTilt(box1Ref);

            // Apply tilt to Box 2
            const onMouseMoveBox2 = (e) => handleTilt(e, box2Ref, 15);
            const onMouseLeaveBox2 = () => resetTilt(box2Ref);

            // We'll attach these to the elements in JSX
            refCallbacks.current = {
                onMouseMoveBox1,
                onMouseLeaveBox1,
                onMouseMoveBox2,
                onMouseLeaveBox2
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);
    const steps = [
        {
            number: "1",
            title: "Buy Today",
            desc: "Lock in today's price and save more.",
            icon: (
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            number: "2",
            title: "Use Free Till 31 Dec 2026",
            desc: "Enjoy 100% access to all premium features.",
            icon: (
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
        {
            number: "3",
            title: "Starts From Jan 1, 2027",
            desc: "Your subscription starts automatically.",
            icon: (
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },

    ];

    const metrics = [
        { value: "45", unit: "Days", label: "Avg. Time to Close" },
        { value: "60%", unit: "", label: "More Deal Opportunities" },
        { value: "2X", unit: "", label: "Business Growth" },
        { value: "98%", unit: "", label: "User Satisfaction" },
    ];

    const CheckIcon = () => (
        <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );

    return (
        <>

            <main ref={containerRef} style={{ background: "#fff", minHeight: "100vh", overflow: "hidden" }}>

                {/* ===== HERO ===== */}
                <section className="pricing-hero ">
                    <div className="grid-bg" />
                    <div className="pricing-hero-content">
                        {/* LEFT — text content */}
                        <div className="pricing-hero-left flex flex-col items-start w-full">
                            <div className="flex items-end gap-4 md:gap-6 mb-0">
                                <div className="number-text font-black text-slate-100 hover:text-slate-300 transition-all duration-500 cursor-default leading-[0.75] font-sans" style={{ textShadow: 'none' }}>
                                    1
                                </div>
                                <div className="flex flex-col gap-1 pt-2 md:pt-4 pb-10 -ml-10">
                                    <h1 className="text-[2rem] md:text-[3.2rem] font-bold text-white leading-tight m-0 text-left">
                                        Refer & Earn<br />
                                        Up to <span className="text-[#D6BA81]">100%</span> Back 🎉
                                    </h1>
                                    <p className="text-[#e2e8f0] text-[18px] leading-[1.4] m-0 text-left  ml-7 opacity-90">
                                        Invite brokers. Earn NetraCoins.<br />
                                        Reduce your subscription cost.
                                    </p>
                                </div>
                            </div>

                            <div className="pl-2 md:pl-[0px]">
                                <button className="bg-[#FF8A00] hover:bg-[#e67a00] text-white transition-colors duration-300 py-3 px-8 rounded-[24px] text-[1.1rem] font-semibold flex items-center gap-2">
                                    Contact Sales <span className="text-sm ml-1 tracking-widest">{`> >`}</span>
                                </button>
                            </div>
                        </div>

                        {/* RIGHT — stat cards */}
                        <div className="pricing-hero-right">
                            {[
                                {
                                    val: "2", label: "Flexible Plans", icon: (
                                        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                    )
                                },
                                {
                                    val: "FREE", label: "Till Dec 2026", icon: (
                                        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                                    )
                                },
                                {
                                    val: "100%", label: "Referral Earn Back", icon: (
                                        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    )
                                },
                            ].map((stat, i) => (
                                <div key={i} className="pricing-stat-card">
                                    <div className="pricing-stat-icon">{stat.icon}</div>
                                    <div>
                                        <div className="pricing-stat-val">{stat.val}</div>
                                        <div className="pricing-stat-label">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== OVERLAPPING LIMITED OFFER BANNER ===== */}
                <div className="relative z-20 w-full max-w-[1100px] mx-auto px-4 flex items-center justify-center gap-8 -mt-[8rem] md:-mt-[7rem] mb-16">
                    {/* The Offer Box */}
                    <div className="flex-1 bg-[#231a15] border border-[#d88a3b]/40 rounded-[20px] py-6 px-8 flex flex-col md:flex-row md:items-center shadow-2xl relative max-w-[800px]">
                        <div className="flex items-center gap-4 md:pr-8 md:border-r border-[#d88a3b]/30 md:mr-8 mb-4 md:mb-0 shrink-0">
                            <span className="text-2xl">🔥</span>
                            <span className="text-[#d88a3b] font-bold uppercase tracking-[0.1em] text-[15px]">Limited Period Offer</span>
                        </div>
                        <div className="flex flex-col text-[#e2e8f0] font-medium text-[17px] leading-relaxed">
                            <span>Buy Subscription Now — GET FREE</span>
                            <span className="text-white/60 text-[15px]">usage till 31st Dec 2026</span>
                        </div>
                    </div>

                    {/* The Big '2' */}
                    <div className="number-text  font-black text-slate-100 hover:text-slate-300 transition-all duration-500 cursor-default leading-[0.75] shrink-0" style={{ textShadow: 'none' }}>
                        2
                    </div>
                </div>

                <section className=" bg-white  top bottom relative overflow-hidden p-l-r-1">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-20 -left-20 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl blob" />
                    <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl blob" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.08] pointer-events-none">
                        <svg width="100%" height="100%" className="text-dark">
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-16 max-[1440px]:gap-10 relative z-10">
                        {/* How It Works Box */}
                        <div
                            ref={box1Ref}
                            onMouseMove={(e) => refCallbacks.current.onMouseMoveBox1?.(e)}
                            onMouseLeave={() => refCallbacks.current.onMouseLeaveBox1?.()}
                            className="bg-white/40 backdrop-blur-xl border border-[#dcdcdc]  rounded-[48px] p-8 max-[1440px]:px-4 shadow-[0_32px_80px_rgba(0,0,0,0.04)] step-container"
                        >
                            <div className="flex flex-col gap-small  text-center mb-20 ">
                                <span className="luxury-reveal eyebrow-gold text-center" style={{ width: 'fit-content', margin: 'auto' }}>Process Flow</span>
                                <h2 className="title-reveal-large">
                                    How It <span className="gradent_text_color">Works</span>
                                </h2>
                            </div>

                            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-4">
                                {steps.map((step, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex flex-col items-center text-center gap-8 flex-1 max-w-sm step-item group">
                                            <div className="relative">
                                                {/* Advanced Orbital Ring */}
                                                <svg className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] orbit-dot pointer-events-none" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad1)" strokeWidth="0.5" strokeDasharray="2 6" className="opacity-80" />
                                                    <defs>
                                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                                                            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                                                        </linearGradient>
                                                    </defs>
                                                    <circle cx="50" cy="5" r="4" fill="#f97316" className="shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
                                                </svg>

                                                <div className="w-24 h-24 max-[1440px]:w-20 max-[1440px]:h-20 rounded-3xl bg-white shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-zinc-100 flex items-center justify-center relative z-10 transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(249,115,22,0.15)] group-hover:-translate-y-2">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    {step.icon}
                                                </div>
                                                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#1a1b2e] text-white text-sm font-black rounded-2xl flex items-center justify-center border-4 border-white z-20 shadow-lg">
                                                    {step.number}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <h3 className="text-lg font-semibold text-[#1a1b2e] tracking-tight max-[1440px]:text-base">{step.title}</h3>
                                                <p className="text-zinc-500 text-sm leading-relaxed px-4 max-[1440px]:text-xs">{step.desc}</p>
                                            </div>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className="hidden lg:block flow-arrow">
                                                <svg className="w-12 h-12 max-[1440px]:w-8 max-[1440px]:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" className="opacity-50" />
                                                </svg>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Metrics Box */}

                    </div>
                </section>
                {/* ===== PLANS ===== */}
                <section className="plans-section p-l-r top bottom">
                    <div className="flex flex-col gap-small  text-center mb-10 ">
                        <span className="luxury-reveal eyebrow-gold text-center" style={{ width: 'fit-content', margin: 'auto' }}>Tranparent Pricing</span>
                        <h2 className="title-reveal-large">
                            Choose Your <span className="gradent_text_color">Perfect Plan</span>
                        </h2>
                    </div>
                    <div className="plans-grid" style={{ gridTemplateColumns: "repeat(2,1fr)", maxWidth: "1060px", }}>
                        <div className="feature-group-items grid-view">
                            <div className="feature-row">
                                <div className="feat-name">
                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <div className="feat-text">
                                        <span className="feat-title">Verified & Updated Inventories</span>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-row">
                                <div className="feat-name">
                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <div className="feat-text">
                                        <span className="feat-title">Citywise Inventory Access Sell and Buy Postings</span>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-row">
                                <div className="feat-name">
                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <div className="feat-text">
                                        <span className="feat-title">Unified Notification ChatBOT</span>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-row">
                                <div className="feat-name">
                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <div className="feat-text">
                                        <span className="feat-title">Smart Al Property Matching Customised Property Creatives</span>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-row">
                                <div className="feat-name">
                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <div className="feat-text">
                                        <span className="feat-title">Get 150 Channel Listing Contacts (Per Month)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {plans.map((plan) => (
                            <div key={plan.id} className={`plan-card-new ${plan.highlight ? "highlighted" : ""}`}>
                                <div className="number-text absolute z-20 left-[40%] top-[30%] translate-y-[-50%]  font-black text-slate-100 hover:text-slate-300 transition-all duration-500 cursor-default leading-[0.75] shrink-0" style={{ textShadow: 'none' }}>
                                    3
                                </div>
                                {/* SAVE badge */}
                                <div className="plan-save-badge" style={{ background: plan.color.badge }}>
                                    <span className="plan-save-badge__label">SAVE</span>
                                    <span className="plan-save-badge__percent">{plan.savePercent}</span>
                                    <span className="plan-save-badge__sub">with Yearly</span>
                                    <svg className="plan-save-badge__icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 21V11h3v10M13 21V11h3v10" />
                                    </svg>
                                </div>

                                {/* Header */}
                                <div className="plan-card-header">
                                    <div>
                                        <div className="plan-name">{plan.name}</div>
                                        <p className="plan-gst">Inclusive of GST</p>
                                    </div>
                                    <div className="plan-card-icon">{plan.icon}</div>
                                </div>

                                {/* Price row */}
                                <div className="plan-price-row">
                                    <div className="plan-price-pill" >
                                        <span className="plan-price-pill__amount">{plan.price} <span className="text-[14px]">Yearly</span></span>
                                        <span className="plan-price-pill__per-month">{plan.perMonth}</span>
                                    </div>
                                    <div className="plan-original-price">
                                        <span>{plan.originalPrice}/-</span>
                                    </div>
                                </div>

                                {/* Additional In-Built Feature */}
                                <div className="plan-extra-feature">
                                    <span className="plan-extra-feature__label mb-0">Paid Subscription charges are Non-Refundable</span>
                                    {/* <span className="plan-extra-feature__value">{plan.builderFloor}</span> */}
                                </div>

                                {/* Subscribe */}
                                <button className="plan-cta-subscribe">Subscribe</button>
                            </div>
                        ))}
                    </div>
                    {/* <p className="plans-terms">
                        Terms &amp; Condition — Paid Subscription charges are Non-Refundable
                    </p> */}
                </section>

                {/* ===== ADD-ONS — Flexible Credit Pack ===== */}
                <section className="addons-section p-l-r-1 top bottom">
                    <div className="addons-wrap">
                        <div className="flex flex-col gap-small  text-center mb-10 ">
                            <span className="luxury-reveal eyebrow-gold text-center" style={{ width: 'fit-content', margin: 'auto' }}>Process Flow</span>
                            <h2 className="title-reveal-large flex items-center justify-center gap-4">
                                <div className="number-text  font-black text-slate-100 hover:text-slate-300 transition-all duration-500 cursor-default leading-[0.75] shrink-0" style={{ textShadow: 'none' }}>
                                    4
                                </div>
                                Add-Ons — <span className="gradent_text_color">Flexible Credit Pack</span>
                            </h2>
                        </div>
                        <div className="addons-header">
                            {/* <h2 className="title-reveal-large">Add-Ons — <span className="gradent_text_color">Flexible Credit Pack</span></h2> */}
                            <p className="agent-reveal text-reveal">
                                Just Pay when you need, Free from paying Yearly
                            </p>
                        </div>

                        <div className="addons-grid">
                            {addOns.map((addon, idx) => (
                                <div key={idx} className="addon-card-new">
                                    <div className="addon-icon-box">{addon.icon}</div>
                                    <div className="addon-name">{addon.name}</div>
                                    <div className="addon-note">
                                        <div className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>{addon.contacts}</span>
                                        </div>
                                    </div>

                                    <div className="addon-price-tag">
                                        <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1 font-bold">Buy at</span>
                                        {addon.price}
                                    </div>

                                    <div className="addon-limit-box">
                                        {/* <span>Limit</span> */}
                                        <span>{addon.limit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <p className="addon-note-foot">
                            The unused contacts are neither transferable and not allowed to carry forward
                        </p> */}
                    </div>
                </section>

                <HowItWorks isTrue={true} />
                <Testimonials />
            </main>

        </>
    );
}
