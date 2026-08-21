"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactCTA = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content Reveal
      gsap.from(".cta-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%"
        }
      });

      // Infinite Marquee
      gsap.to(".marquee-text", {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section bottom bg-white overflow-hidden relative">
      <div className="">
        <div className="relative bg-[#1a1b2e]  py-16 max-[1440px]:py-12 max-[1024px]:py-8 px-8 overflow-hidden flex flex-col items-center text-center group">

          {/* Background Elements */}
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
            <div className="marquee-text flex gap-10 items-center">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-[15vw] font-black text-white uppercase italic">PropNetra • Growth • Network • Scale • </span>
              ))}
            </div>
          </div>

          {/* CTA Content */}
          <div className="relative z-10 flex justify-between items-center gap-6 ">
            <div className="w-1/2">
              <div className="cta-reveal text-white luxury-reveal eyebrow-goldy">Join the elite</div>
              <h2 className="title-reveal-large !text-white cta-reveal  text-left">
                Ready to accelerate <span className="gradent_text_color">your sales network?</span>
              </h2>
              <p className="cta-reveal text-left mt-6 text-zinc-400 text-sm md:text-base max-w-lg">
                Join India’s fastest-growing ecosystem of agents, builders, and developers. Build your high-performance network today.
              </p>
            </div>

            <div className="w-1/2 flex justify-center items-center">
              <div className="cta-reveal bg-white/15 backdrop-blur-xl p-10 rounded-xl w-full">
                <button className="group relative w-full flex items-center justify-between gap-4 bg-[#FF8A00] text-white px-10 py-5 max-[1440px]:px-8 max-[1440px]:py-4 max-[1024px]:px-6 max-[1024px]:py-3 max-[768px]:px-4 max-[768px]:py-2 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-dark transition-all duration-500 shadow-2xl shadow-orange-500/20">
                  Join the network
                  <div className="w-8 h-8 rounded-full bg-dark/10 flex items-center justify-center group-hover:bg-[#FF8A00] group-hover:text-white transition-all duration-500">
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
      </div>
    </section>
  );
};

export default ContactCTA;
