"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  {
    id: "01",
    title: "Qualified Leads",
    desc: "Access our proprietary database of high-intent buyers and sellers actively looking to transact.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18M3 7v14m18-14v14M3 7l9-4 9 4M9 21v-4a3 3 0 016 0v4" />
      </svg>
    ),
    dark: true,
    size: "large"
  },
  {
    id: "02",
    title: "Secure Transactions",
    desc: "Advanced AI-driven document verification and secure contract management system.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    dark: false,
    size: "small"
  },
  {
    id: "03",
    title: "Market Intelligence",
    desc: "Stay ahead of the competition with real-time market data and neighborhood analytics.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    dark: false,
    size: "small"
  },
  {
    id: "04",
    title: "Network Slabs",
    desc: "Unlock the highest commission slabs, exclusive inventory access, and premium network events.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" />
        <path d="M12 3v12" />
        <path d="M5 21h14" />
      </svg>
    ),
    dark: true,
    size: "large"
  },
];

const PropertiesSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prop-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Card hovering parallax effect
      gsap.utils.toArray<HTMLElement>(".amenity-card").forEach((card) => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white section-py section-padding relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-zinc-400 rounded-full blur-[120px]" />
      </div>

      <div className="container-max relative z-10">
        <div className="grid-split items-start">

          {/* Text Content */}
          <div className="lg:col-span-4 flex flex-col gap-large sticky top-32">
            <div className="flex flex-col gap-small">
              <div className="prop-reveal eyebrow-gold">
                Ecosystem
              </div>
              <h3 className="prop-reveal title-reveal-large font-black ">
                Core <br />
                <span className="gradent_text_color">Capabilities</span>
              </h3>
              <p className="prop-reveal text-zinc-description max-w-sm">
                We bridge the gap between supply and demand. Every feature is precision-engineered to scale your real estate business.
              </p>
            </div>

            <div className="prop-reveal flex flex-col gap-medium">
              {/* Highlight Box */}
              <div className="group relative p-8 card-dark rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider">#1 Choice for Professionals</h4>
                  </div>
                  <p className="text-zinc-400 text-sm">Recognized as the most reliable growth partner by over 2,000+ top-tier agents and brokers.</p>
                  <div className="mt-2 w-full h-[1px] bg-white/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">TOP RATED</span>
                    <div className="flex text-primary">★★★★★</div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              </div>

              {/* Satisfaction Badge */}
              <div className="flex items-center gap-medium p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="#e4e4e7" strokeWidth="4" />
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="var(--primary)" strokeWidth="4" strokeDasharray={175} strokeDashoffset={2} />
                  </svg>
                  <span className="absolute text-xs font-black">99%</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-dark">Agent Satisfaction</p>
                  <p className="text-xs text-zinc-500">Post-delivery benchmarked success</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Content */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-medium lg:mt-0 mt-12">
            {amenities.map((item, idx) => (
              <div
                key={item.id}
                className={`prop-reveal amenity-card card-base card-hover group cursor-pointer border ${item.dark ? "card-dark border-transparent" : "card-light border-zinc-100"
                  } ${item.size === 'large' ? 'md:h-[380px]' : 'md:h-[320px]'} ${idx % 2 !== 0 ? 'md:translate-y-12' : ''}`}
                style={{ ["--accent-color" as string]: item.dark ? "var(--primary)" : "rgba(0,0,0,0.1)" } as React.CSSProperties}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),var(--accent-color)_0%,transparent_70%)]" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-dark ${item.dark ? 'bg-white/10 text-primary' : 'bg-white text-dark'}`}>
                      {item.icon}
                    </div>
                    <span className={`text-[4rem] font-black leading-none opacity-5 tracking-tighter ${item.dark ? 'text-white' : 'text-dark'}`}>
                      {item.id}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">{item.title}</h4>
                    <p className={`text-sm leading-relaxed ${item.dark ? "text-zinc-400" : "text-zinc-500"}`}>
                      {item.desc}
                    </p>
                    <div className={`mt-6 w-12 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
