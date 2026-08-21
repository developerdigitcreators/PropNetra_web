"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CountUp from 'react-countup';
gsap.registerPlugin(ScrollTrigger);

const HowItWorks = ({ isTrue = false }) => {
  const containerRef = useRef(null);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const refCallbacks = useRef<{
    onMouseMoveBox1?: (e: React.MouseEvent) => void;
    onMouseLeaveBox1?: () => void;
    onMouseMoveBox2?: (e: React.MouseEvent) => void;
    onMouseLeaveBox2?: () => void;
  }>({});

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
      title: "Join & Verify",
      desc: "Create your profile and get verified to access the network.",
      icon: (
        <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Upload KYC",
      desc: "Securely upload documents for professional verification.",
      icon: (
        <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Access Inventory",
      desc: "Explore verified projects and partner inventory across India.",
      icon: (
        <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      number: "4",
      title: "Connect & Close",
      desc: "Connect with the right professionals and close deals faster.",
      icon: (
        <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
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

  return (
    <div ref={containerRef}>
      {
        !isTrue ?
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
          : null}
      <section className="network_bg ">
        <div
          className="bg-[rgba(26,27,46,0.71)] p-12 relative overflow-hidden group shadow-2xl max-[1440px]:p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="text-center mb-10 relative z-10">
            <span className="section-subheading !text-white">Proven Results</span>
            <h2 className="title-reveal-large !text-white">A Network That <span className="gradent_text_color">Delivers</span> Results</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-[1440px]:gap-6 relative z-10 metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className={`flex flex-col items-center text-center ${index < metrics.length - 1 ? 'lg:border-r border-white/10' : ''}`}>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-7xl max-[1440px]:text-5xl font-black text-white tracking-tighter metric-value">
                    <CountUp
                      start={0}
                      end={parseInt(metric.value.replace(/[^0-9]/g, ''))}
                      duration={3}
                      enableScrollSpy={true}
                      scrollSpyOnce={false}
                    />
                  </span>
                  <span className="text-xl lg:text-2xl font-black text-orange-500">{metric.value.replace(/[0-9]/g, '') || metric.unit}</span>
                </div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-tight">{metric.label}</span>
              </div>
            ))}
          </div>

          {/* Advanced Decorative Network Graphic */}
          <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none scale-150">
            <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
              <circle cx="180" cy="180" r="4" fill="#fff" />
              <circle cx="140" cy="140" r="3" fill="#fff" />
              <circle cx="160" cy="100" r="2" fill="#fff" />
              <circle cx="100" cy="160" r="3" fill="#fff" />
              <path d="M180 180 L140 140 L160 100 L180 180 M140 140 L100 160 L180 180" stroke="#fff" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
