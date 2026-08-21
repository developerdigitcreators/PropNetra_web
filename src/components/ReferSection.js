"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ReferSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Local registration for robustness
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial State (Set these immediately so they don't jump)
      gsap.set(".refer-reveal, .refer-card", {
        y: 30,
        opacity: 0,
        visibility: "visible"
      });

      // 2. Timeline for reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
          onRefresh: (self) => {
            if (self.progress > 0) tl.progress(1);
          }
        }
      });

      tl.to(".refer-reveal", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      })
        .to(".refer-card", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)"
        }, "-=0.7");

      // 3. Infinite Marquee
      gsap.to(".refer-marquee-text", {
        xPercent: -50,
        repeat: -1,
        duration: 35,
        ease: "none"
      });
    }, containerRef);

    // Final safety refresh
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);



  const referralBenefits = [
    {
      num: "01",
      title: "Share Your Link",
      description: "Send your unique referral link to friends and colleagues"
    },
    {
      num: "02",
      title: "They Join",
      description: "Your network signs up and starts using PropNetra"
    },
    {
      num: "03",
      title: "You Earn",
      description: "Get rewards for every successful referral instantly"
    }
  ];

  return (
    <section ref={containerRef} className="section bg-white overflow-hidden relative mb-[100px] refer-section-main">
      <div className="relative bg-[#1a1b2e] py-24 px-8 overflow-hidden group max-[1440px]:py-16 max-[1024px]:py-8">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2600&auto=format&fit=crop"
            fill
            className="object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-1000"
            alt="Architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1b2e] via-transparent to-[#1a1b2e]" />
        </div>

        {/* Subtle Marquee */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none opacity-[0.03] whitespace-nowrap z-0">
          <div className="refer-marquee-text flex gap-10 items-center">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[15vw] font-black text-white uppercase italic">
                PropNetra • Refer • Earn • Grow • Share •{" "}
              </span>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* LEFT — Content */}
          <div className="flex-1 flex flex-col items-start gap-6">
            <div className="refer-reveal text-white luxury-reveal eyebrow-goldy">
              Join the elite
            </div>

            <h2 className="refer-reveal title-reveal-large !text-white">
              Ready to accelerate
              <span className="gradent_text_color">your sales network?</span>
            </h2>

            <p className="refer-reveal text-zinc-400 text-sm md:text-base max-w-md">
              Join India’s fastest-growing ecosystem of agents, builders, and developers. Build your high-performance network today.
            </p>

            {/* Perks */}
            {/* <div className="refer-reveal flex flex-col gap-4 mt-2">
              {[
                { icon: "💰", label: "Instant Rewards", sub: "Credits & bonuses for every referral" },
                { icon: "🌐", label: "Unlimited Earning", sub: "No cap on referrals — scale freely" },
                { icon: "⭐", label: "Exclusive Perks", sub: "Premium features for top referrers" }
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center text-xl shrink-0">
                    {perk.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{perk.label}</p>
                    <p className="text-zinc-500 text-xs">{perk.sub}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* RIGHT — Steps + CTA */}
          <div className="flex-1 flex flex-col gap-6 w-full refer-card-grid">

            {/* Step Cards */}
            {referralBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="refer-card max-[1440px]:px-4 max-[1440px]:py-3 max-[1024px]:px-3 max-[1024px]:py-2 flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 backdrop-blur-sm hover:border-[#FF8A00]/40 hover:bg-white/8 transition-all duration-300"
              >
                {/* Number Badge */}
                <div className="w-12 h-12 rounded-full bg-[#FF8A00] flex items-center justify-center text-[#1a1b2e] font-black text-sm shrink-0">
                  {benefit.num}
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <div className="refer-reveal mt-2">
              <button className="group relative flex items-center gap-4 bg-[#FF8A00] text-white px-10 py-5 max-[1440px]:px-8 max-[1440px]:py-4 max-[1024px]:px-6 max-[1024px]:py-3 max-[768px]:px-4 max-[768px]:py-2 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-[#1a1b2e] transition-all duration-500 shadow-2xl shadow-yellow-500/20">
                Get Your Referral Link
                <div className="w-8 h-8 rounded-full bg-[#1a1b2e]/10 flex items-center justify-center group-hover:bg-[#1a1b2e] group-hover:text-white transition-all duration-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transform group-hover:rotate-45 transition-transform">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF8A00]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
      </div>
    </section>
  );
};

export default ReferSection;
