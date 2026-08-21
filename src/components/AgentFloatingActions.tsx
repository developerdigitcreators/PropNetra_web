"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Phone, MessageSquare } from "lucide-react";

const AgentFloatingActions = () => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isVisible) {
      gsap.to(".fab-button", {
        x: 0,
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
      gsap.to(".back-to-top", {
        x: 0,
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(".fab-button", {
        x: 100,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in",
      });
      gsap.to(".back-to-top", {
        x: -100,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  return (
    <>
      {/* Back to Top - Left Side */}
      <button
        onClick={scrollToTop}
        className="back-to-top fixed bottom-8 left-8 z-[100] w-14 h-14 bg-white text-dark rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group border border-zinc-100 opacity-0 -translate-x-[100px] pointer-events-none"
        title="Back to Top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="absolute left-16 bg-[#1a1b2e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
          Scroll to Top
        </span>
      </button>

      {/* Right Side Actions */}
      <div ref={containerRef} className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        
        {/* Developer Chat Button */}
        <button
          className="fab-button w-14 h-14 bg-slate-900 text-white rounded-full flex items-center cursor-pointer justify-center shadow-2xl hover:scale-110 transition-transform group relative border border-white/10 opacity-0 translate-x-[100px] pointer-events-none"
          title="Developer Chat"
        >
          <MessageSquare size={24}  />
          <span className="absolute right-16 bg-[#1a1b2e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
            Developer Chat
          </span>
        </button>

        {/* Call Button */}
        <a
          href="tel:+919876543210"
          className="fab-button w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative border border-white/10 opacity-0 translate-x-[100px] pointer-events-none"
          title="Call Us"
        >
          <Image src={'/icons8-call.gif'} alt="call icon" className="object-contain rounded-full brightness-0 invert" width={30} height={30} />
          <span className="absolute right-16 bg-[#1a1b2e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
            Call Experts
          </span>
        </a>

      </div>
    </>
  );
};

export default AgentFloatingActions;
