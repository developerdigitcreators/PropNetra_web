"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: "Luxury Projects",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z" />
        <path d="M9 21v-4a3 3 0 016 0v4" />
      </svg>
    )
  },
  {
    name: "Land Parcels",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    name: "Pre-Leased Assets",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4M8 6h2M14 6h2M8 10h2M14 10h2M8 14h2M14 14h2" />
      </svg>
    )
  },
  {
    name: "Bulk Allotments",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20h20M4 20V4a2 2 0 012-2h12a2 2 0 012 2v16M8 6h8M8 10h8M8 14h8" />
      </svg>
    )
  },
  {
    name: "Retail Spaces",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path d="M9 22V12h6v10" />
      </svg>
    )
  },
  {
    name: "Office Parks",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h1M9 11h1M9 15h1M14 7h1M14 11h1M14 15h1" />
      </svg>
    )
  },
];

const deals = [
  {
    id: "residential",
    title: "Residential Deals",
    subtitle: "Premium Living Spaces",
    desc: "From sky-high penthouses to tranquil suburban villas, find the home that matches your ambition.",
    tag: "95% Occupied",
    stats: ["Luxury Condos", "Family Villas", "Eco-Homes"]
  },
  {
    id: "commercial",
    title: "Commercial Deals",
    subtitle: "High-Yield Investments",
    desc: "Strategically located office spaces and retail hubs designed for maximum business growth.",
    tag: "High ROI",
    stats: ["Corporate Hubs", "Retail Spaces", "Tech Parks"]
  }
];

const DealsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".deal-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark section-py section-padding overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />

      <div className="container-max relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-medium">
          <div className="flex flex-col gap-small max-w-2xl">
            <div className="deal-reveal eyebrow-goldy">Expand Your Portfolio</div>
            <h2 className="deal-reveal title-reveal-large text-white! font-black tracking-tighter">
              Exclusive Inventory & <br />
              <span className="text-white opacity-80">Bulk Deals</span>
            </h2>
          </div>
          <div className="deal-reveal">
            <button className="btn-primary-base bg-primary text-white px-10 font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
              Access The Network
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="deal-reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-[1440px]:gap-small max-[1024px]:gap-small">
          {categories.map((cat, idx) => (
            <div key={idx} className="group flex flex-col items-center gap-medium p-8 rounded-[1rem] bg-white/5 border border-primary/40 transition-all duration-500 hover:bg-white/10 hover:border-primary/50 cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-zinc-100 group-hover:text-primary group-hover:scale-110 transition-all duration-500 shadow-sm">
                {cat.icon}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-white group-hover:text-primary transition-colors duration-300">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DealsSection;
