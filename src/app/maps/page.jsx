"use client";

import React, { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import "./maps.css";

const locations = [
    {
        id: "gurugram",
        name: "Gurugram Global HQ",
        region: "India",
        address: "PropNetra Tower, Sector 44, Gurugram, Haryana 122003",
        phone: "+91 124 456 7890",
        email: "india@propnetra.com",
        img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=800",
        status: "Flagship Office",
        coords: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112235.345!2d77.06!3d28.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5b4851083974c!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    },
    {
        id: "dubai",
        name: "Dubai Skyline Center",
        region: "UAE",
        address: "Level 42, Emirates Towers, Sheikh Zayed Rd, Dubai, UAE",
        phone: "+971 4 123 4567",
        email: "uae@propnetra.com",
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800",
        status: "Operational Hub",
        coords: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.123!2d55.27!3d25.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e247%3A0x83d640973954602!2sEmirates%20Towers!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
    },
    {
        id: "london",
        name: "London Canary Wharf",
        region: "UK",
        address: "1 Canada Square, Canary Wharf, London E14 5AB, UK",
        phone: "+44 20 7123 4567",
        email: "uk@propnetra.com",
        img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800",
        status: "Investment Desk",
        coords: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.54!2d-0.02!3d51.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487602b76e3d5555%3A0x2c6b555555555555!2sOne%20Canada%20Square!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
    },
    {
        id: "mumbai",
        name: "Mumbai BKC Square",
        region: "India",
        address: "The Capital, BKC, G Block Rd, Mumbai, Maharashtra 400051",
        phone: "+91 22 9876 5432",
        email: "mumbai@propnetra.com",
        img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=800",
        status: "South Asia Hub",
        coords: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.77!2d72.86!3d19.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e6a5555555%3A0x23d5555555555555!2sBandra%20Kurla%20Complex!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    }
];

const MapsPage = () => {
    const router = useRouter();
    const [activeLoc, setActiveLoc] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);

    const handleViewOnMap = (loc) => {
        router.push(`/maps/${loc.id}`);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Hero Entrance
            gsap.from(".maps-hero-content > *", {
                y: 40,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power4.out"
            });

            // Directory Grid - Animation fixed with fromTo for visibility
            gsap.fromTo(".location-bento-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".location-directory-grid",
                        start: "top 90%",
                        once: true
                    }
                }
            );
        }, containerRef);

        // Force a refresh of ScrollTrigger positions
        const timeoutId = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        return () => {
            ctx.revert();
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <main ref={containerRef} className="maps-page-v3">

            {/* Banner Section */}
            <section className="maps-hero-v3 top">
                <div className="maps-hero-bg-v3"></div>
                <div className="maps-hero-overlay-v3"></div>

                <div className="p-l-r relative z-10 text-center maps-hero-content">
                    <span className="eyebrow-v3 mx-auto mb-4">Our Global Footprint</span>
                    <h1 className="title-reveal-large !text-white leading-[0.9] lowercase first-letter:uppercase mb-6">
                        Explore Our <span className="gradent_text_color">Centers</span>
                    </h1>
                    <p className="maps-hero-sub-v3 mx-auto">
                        Experience the gold standard in real estate consulting at our boutique offices worldwide.
                    </p>
                </div>
            </section>

            {/* Location Directory Section */}
            <section className="location-directory-section top bottom section p-l-r">
                <div className="headingBox flex flex-col gap-small  text-center mb-10">
                    <span className="luxury-reveal eyebrow-gold text-center mx-auto mb-0" style={{ width: 'fit-content' }}>Our Global Footprint</span>
                    <h2 className="title-reveal-large">
                        Explore Our <span className="gradent_text_color">Centers</span>
                    </h2>
                </div>

                <div className="location-spotlight-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                    {locations.slice(0, 3).map((loc) => (
                        <div key={loc.id} className="location-spotlight-card group" onClick={() => handleViewOnMap(loc)}>
                            <div className="spotlight-img-wrapper">
                                <img src={loc.img} alt={loc.name} className="spotlight-img" />
                                <div className="spotlight-overlay"></div>
                            </div>
                            
                            <div className="spotlight-content">
                                <div className="spotlight-top">
                                    <span className="spotlight-region">{loc.region}</span>
                                    <div className="spotlight-line"></div>
                                </div>
                                
                                <div className="spotlight-main">
                                    <h3 className="spotlight-city">
                                        {loc.id.toUpperCase()}
                                    </h3>
                                    <p className="spotlight-name">{loc.name}</p>
                                </div>
                                
                                <div className="spotlight-footer">
                                    <span className="view-link">Explore Office</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spotlight-arrow">
                                        <path d="M5 12h14m-7-7 7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            
                            <div className="spotlight-glow"></div>
                        </div>
                    ))}
                </div>

                {/* Additional Directory List (Compact) */}
                <div className="location-compact-list mt-24">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-[1px] flex-1 bg-zinc-200"></div>
                        <h4 className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em]">Full Global Network</h4>
                        <div className="h-[1px] flex-1 bg-zinc-200"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {locations.map((loc) => (
                            <div key={loc.id} className="location-minimal-item group" onClick={() => handleViewOnMap(loc)}>
                                <div className="flex justify-between items-center p-6 bg-white border border-zinc-100 rounded-2xl hover:border-primary transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1">
                                    <div>
                                        <h5 className="font-bold text-dark mb-1">{loc.name}</h5>
                                        <p className="text-xs text-zinc-500">{loc.region} • {loc.status}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Modal Overlay */}
            {isModalOpen && activeLoc && (
                <div className="map-modal-overlay" onClick={closeModal}>
                    <div className="map-modal-container" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>

                        <div className="modal-map-wrapper">
                            <iframe
                                src={activeLoc.coords}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            />

                            <div className="modal-info-panel">
                                <div className="mi-header">
                                    <span className="mi-tag">Operational</span>
                                    <h3>{activeLoc.name}</h3>
                                    <p>{activeLoc.address}</p>
                                </div>
                                <div className="mi-body">
                                    <div className="mi-contact">
                                        <div className="mi-item">
                                            <span className="label">Phone</span>
                                            <p>{activeLoc.phone}</p>
                                        </div>
                                        <div className="mi-item">
                                            <span className="label">Email</span>
                                            <p>{activeLoc.email}</p>
                                        </div>
                                    </div>
                                    <button className="mi-book-btn">Get Directions</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </main>
    );
};

export default MapsPage;
