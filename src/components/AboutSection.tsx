"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure layout is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      // First reveal: Title and Paragraph
      gsap.fromTo(".about-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );

      // Second reveal: Highlight Boxes
      gsap.fromTo(".highlight-box",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".highlight-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  const highlights = [
    {
      title: "Apartments",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    },
    {
      title: "Builder Floors",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    },
    {
      title: "Plots",
      icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    },
    {
      title: "Retails Shops",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    },
    {
      title: "Offices",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    {
      title: "Pre-Leased",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative top mt-[80px] max-[1440px]:mt-[100px] max-[1199px]:mt-[100px] bg-white overflow-hidden">
      {/* Background Skyline Silhouette */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] flex items-end">
        <div className="relative w-full h-full">
          <Image
            src="/bg.jpg"
            alt="City Skyline"
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>

      <div className="container-max p-l-r relative z-10">
        {/* Title with Lines */}
        <div className="flex items-start justify-center gap-2 about-reveal">
          {/* <div className="flex-1 h-[1px] bg-zinc-100 hidden md:block"></div> */}
          {/* <span className="banner-reveal block text-zinc-400 text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-2">
            Welcome to Propnetra
          </span> */}
          <div className="w-1/2 pr-[54px]">
            <div className="headingBox flex flex-col gap-small  text-left mb-0 ">
              <span className="luxury-reveal eyebrow-gold text-left" style={{ width: 'fit-content' }}>About Us</span>
              <h2 className="title-reveal-large">
                Welcome to <span className="gradent_text_color">Propnetra</span>
              </h2>
            </div>
            {/* <div className="flex-1 h-[1px] bg-zinc-100 hidden md:block"></div> */}
            <div className="text-left mb-16 about-reveal mt-[20px]">
              <p className="text-zinc-500text-dark  text-justify  leading-relaxed ">
                PropNetra is India’s premium broker platform designed exclusively for professional real estate agents across India, helping you find leads faster, close deals efficiently, and grow your property business all with a smart, premium platform built for success.
              </p>
            </div>
          </div>
          <div className="w-1/2 pl-[54px]">
            {/* Highlight Grid */}
            <div className="highlight-grid grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="highlight-box group border bg-white/80 border-orange-300/80 rounded-[10px] px-4 py-[21px] text-left transition-all duration-700 hover:bg-white/40 hover:border-orange-300/50 hover:shadow-[0_20px_50px_rgba(234,179,8,0.1)] hover:-translate-y-2 cursor-default relative overflow-hidden"
                >
                  <div className="relative z-10 flex items-center gap-3">
                    {/* SVG Icon */}
                    <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200/60 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-orange-500 group-hover:border-orange-500">
                      <svg
                        className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <h4 className="text-[12px] font-black uppercase tracking-widest text-[#1a1b2e] leading-tight group-hover:text-orange-600 transition-colors duration-500">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Content Paragraph */}

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
