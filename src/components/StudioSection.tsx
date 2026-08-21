"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StudioSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure layout is fully rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(".luxury-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );

      // Cards reveal
      gsap.fromTo(".studio-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".studio-grid",
            start: "top 95%",
            toggleActions: "play none none none",
          }
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  const items = [
    {
      title: "Brokers",
      desc: "Connect with verified agents & close deals 2x faster.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <path d="M12 11l2 2" stroke="#f97316" />
        </svg>
      )
    },
    {
      title: "Builders",
      desc: "List projects and reach active brokers across India.",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&auto=format&fit=crop",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
          <path d="M9 10h6" stroke="#f97316" />
        </svg>
      )
    },
    {
      title: "Developers",
      desc: "Expand your network with premium data insights.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10l-9-7-9 7M4 10v11h16V10" />
          <path d="M12 21v-4" stroke="#f97316" />
        </svg>
      )
    },
    {
      title: "Interiors",
      desc: "Get quality leads from verified premium projects.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          <path d="M12 4v16" stroke="#f97316" />
        </svg>
      )
    },
    {
      title: "Home Loans",
      desc: "Connect with deal-stage clients seamlessly.",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&auto=format&fit=crop",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3L2 12h3v8h14v-8h3L12 3z" />
          <path d="M12 12v4" stroke="#f97316" />
        </svg>
      )
    }
  ];

  return (
    <section ref={containerRef} className="section top bottom bg-white overflow-hidden">
      <div className="p-l-r">
        <div className="flex flex-col gap-2 text-center mb-10">
          <div className="luxury-reveal eyebrow-gold mx-auto">Who is it for?</div>
          <h2 className="luxury-reveal title-reveal-large text-dark leading-[0.9] lowercase first-letter:uppercase">
            Built for Every <span className="gradent_text_color">Professional</span>
          </h2>
        </div>

        <div className="studio-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="studio-card group relative bg-white overflow-hidden rounded-[1.5rem] p-6 lg:p-8 flex flex-col justify-between aspect-[4/5] sm:aspect-auto sm:h-[280px] border border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:scale-[1.06] hover:-translate-y-2 hover:z-20 transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 mb-8 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl max-[1440px]:text-lg font-medium text-[#1a1b2e] uppercase tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-500 max-[1440px]:text-sm text-xs leading-snug font-medium transition-colors">
                  {item.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-auto">
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-orange-500 transition-all flex items-center gap-2 group/btn">
                  Explore
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <span className="text-3xl font-black text-black/5 group-hover:text-orange-500/10 transition-colors select-none">
                  0{index + 1}
                </span>
              </div>

              {/* Bottom Animated Border */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-20" />
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default StudioSection;
