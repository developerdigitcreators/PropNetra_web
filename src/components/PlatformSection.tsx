"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    role: "For Agents",
    title: "Brokerage Accelerator",
    desc: "Earn the highest commission slabs, manage leads, and oversee your entire portfolio from a unified dashboard.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    color: "blue"
  },
  {
    role: "For Builders",
    title: "Project Showcase",
    desc: "Connect your developments with high-intent buyers and thousands of certified agents to accelerate sales.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    color: "orange"
  },
  {
    role: "For Developers",
    title: "Market Insights",
    desc: "Leverage advanced analytics to track market trends and maximize the ROI of your upcoming projects.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    color: "yellow"
  }
];

const PlatformSection = () => {
  const containerRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        ".reveal-text",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" }
      )
        .fromTo(
          ".feature-item",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".visual-main",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" },
          "-=1"
        )
        .fromTo(
          ".floating-card",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)" },
          "-=0.5"
        );

      // Floating animations
      gsap.to(".float-1", { y: -15, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".float-2", { y: 15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
      gsap.to(".float-3", { x: 10, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="blueprint-grid bg-white section-py section-padding overflow-hidden relative">
      {/* Background Decorative Element */}


      <div className="container-max relative z-10">
        <div className="grid-split">

          {/* Left Column: Content */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex flex-col gap-medium">
              <span className="reveal-text eyebrow-gold">The Ecosystem</span>
              <h2 className="reveal-text title-reveal-large">
                One Platform. <br />
                <span className="gradent_text_color">Total Solutions.</span>
              </h2>
              <p className="reveal-text text-zinc-description max-w-md">
                PropNetra bridges the gap between agents, builders, and developers with a unified digital ecosystem designed for maximum growth and sales acceleration.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              {features.map((feat, idx) => (
                <div key={idx} className="feature-item group flex items-start gap-medium p-6 rounded-3xl transition-all duration-300 hover:bg-zinc-50 hover:shadow-sm cursor-default">
                  <div className={`p-4 rounded-2xl bg-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-dark text-zinc-400`}>
                    {feat.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{feat.role}</span>
                    <h4 className="text-xl font-bold text-dark">{feat.title}</h4>
                    <p className="text-sm text-zinc-400 max-w-xs">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal-text flex items-center gap-4 flex-wrap">
              {/* Google Play Badge */}
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                }}
              >
                {/* Google Play SVG */}
                <svg width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gp1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00C6FF" />
                      <stop offset="100%" stopColor="#00B4FF" />
                    </linearGradient>
                    <linearGradient id="gp2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FF8C00" />
                    </linearGradient>
                    <linearGradient id="gp3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FF4444" />
                      <stop offset="100%" stopColor="#C8000A" />
                    </linearGradient>
                    <linearGradient id="gp4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E676" />
                      <stop offset="100%" stopColor="#00796B" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#gp1)" d="M64 44.4C64 24.9 85.1 12.3 102.6 22.1l337.5 195.1c17.3 10 17.3 34.8 0 44.8L102.6 457.1C85.1 466.9 64 454.3 64 434.8V44.4z" opacity="0.95" />
                  <path fill="url(#gp3)" d="M64 44.4L275.5 256 64 434.8V44.4z" opacity="0.9" />
                  <path fill="url(#gp4)" d="M64 434.8l211.5-178.8L440.1 357l-337.5 100.1C85.1 466.9 64 454.3 64 434.8z" opacity="0.95" />
                  <path fill="url(#gp2)" d="M64 44.4l211.5 211.6L440.1 157 102.6 22.1C85.1 12.3 64 24.9 64 44.4z" opacity="0.95" />
                </svg>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.55)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Get it on</span>
                  <span style={{ fontSize: "17px", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.01em" }}>Google Play</span>
                </div>
              </a>

              {/* App Store Badge */}
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                }}
              >
                {/* Apple Logo SVG */}
                <svg width="26" height="26" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#ffffff"
                    d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.4 0 669.3 0 553.7c0-207.2 136.8-316.9 270.8-316.9 99.8 0 182.5 66.3 245.6 66.3 60.3 0 154.7-70.5 270.2-70.5zM546.7 149.9c22.7-29 38.2-69.5 38.2-110 0-5.6-.5-11.3-1.6-15.9-36.1 1.4-79.6 24.1-105.6 54.4-22.2 26.6-41.5 67.1-41.5 108.1 0 6 1 12 1.6 14.1 2.5.5 6.6 1.1 10.6 1.1 32.3 0 73.8-21.6 98.3-51.8z"
                  />
                </svg>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.55)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Download on the</span>
                  <span style={{ fontSize: "17px", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.01em" }}>App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div ref={visualRef} className="relative h-[650px] flex items-center justify-center lg:col-span-7">
            {/* Main Phone Visual */}
            <div className="visual-main relative z-20 w-[300px] h-[600px] bg-dark rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[8px] border-zinc-900">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-20"></div>
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent"></div>
                <Image src="/app-screen-1.png" alt="Platform UI" fill className="object-cover opacity-90" />
              </div>
            </div>

            {/* Floating Elements Around Phone */}
            <div className="floating-card float-1 absolute top-10 -right-4 z-30 badge-floating">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase">Status</p>
                <p className="text-sm font-bold text-dark">Lead Qualified</p>
              </div>
            </div>

            <div className="floating-card float-2 absolute bottom-20 -left-10 z-30 badge-floating">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase">Commission</p>
                <p className="text-sm font-bold text-dark">₹ 1,25,000 Earned</p>
              </div>
            </div>

            <div className="floating-card float-3 absolute top-1/2 -right-12 z-10 bg-dark p-4 rounded-2xl shadow-2xl text-white transform -translate-y-1/2">
              <div className="flex flex-col gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </div>
                <p className="text-[10px] opacity-60">Interested Leads</p>
                <p className="text-lg font-bold">482+</p>
              </div>
            </div>

            {/* Decorative soft blurs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
