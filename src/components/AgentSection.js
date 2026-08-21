"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const agentData = [
  { label: "Active Brokers", value: "11K", desc: "Top-producing agents worldwide" },
  { label: "Builder Partners", value: "150", desc: "Top-tier developers & builders" },
  { label: "Deal Volume", value: "₹2C", desc: "Successfully closed transactions" },
  { label: "Capital Partners", value: "100", desc: "Institutional funding access" },
];

const AgentSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo(
        ".agent-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Card hover glow effect
      const cards = document.querySelectorAll(".agent-card");
      cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding section-py text-white overflow-hidden relative" style={{ background: "#08070a" }}>

      {/* ── Layer 1: image texture ── */}
      <Image
        src="/modern-bg.png"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover object-center pointer-events-none select-none"
        style={{ opacity: 0.18, mixBlendMode: "luminosity" }}
        priority={false}
      />

      {/* ── Layer 2: light gold overlay gradient ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,210,60,0.18) 0%, rgba(255,185,20,0.10) 30%, rgba(20,14,5,0.65) 60%, rgba(8,6,2,0.80) 100%)",
        }}
      />

      {/* ── Layer 3: center radial warm glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 35%, rgba(255,200,40,0.11) 0%, transparent 65%)",
        }}
      />

      {/* ── Layer 4: corner accent blobs ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
        style={{ background: "rgba(255,205,0,0.12)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none"
        style={{ background: "rgba(255,170,0,0.08)" }}
      />

      <div className="container-max relative z-10">
        <div className="grid-split">

          {/* Header & Intro */}
          <div className="lg:col-span-12 mb-20 text-center flex flex-col items-center">
            <div className="agent-reveal section-eyebrow !text-primary mx-auto">Global Network</div>
            <h2
              className="agent-reveal heading-1 lowercase first-letter:uppercase max-w-4xl tracking-tighter"
              style={{ color: "#f0dfa0" }}
            >
              A partnership built on <br />
              <span className="gradent_text_color italic">trust and excellence.</span>
            </h2>
            <p
              className="agent-reveal paragraph max-w-2xl mt-6"
              style={{ color: "rgba(235,215,150,0.60)" }}
            >
              Connect with over 11,000 verified professionals who bring deep market expertise, bulk inventory, and exclusive deals to scale your portfolio.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-medium">
            {agentData.map((item, idx) => (
              <div
                key={idx}
                className="agent-reveal agent-card relative p-10 rounded-[2.5rem] overflow-hidden group transition-all duration-500"
                style={{
                  background: "rgba(255,210,60,0.05)",
                  border: "1px solid rgba(255,210,60,0.15)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255,210,60,0.10)";
                  e.currentTarget.style.border = "1px solid rgba(255,210,60,0.40)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,210,60,0.05)";
                  e.currentTarget.style.border = "1px solid rgba(255,210,60,0.15)";
                }}
              >
                {/* Mouse-follow glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(480px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,215,0,0.14), transparent 40%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col gap-small">
                  <div
                    className="text-5xl font-black transition-colors duration-300"
                    style={{ color: "#f0dfa0" }}
                  >
                    {item.value}
                    <span style={{ color: "#FFD700" }} className="italic">+</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-sm font-bold uppercase tracking-widest"
                      style={{ color: "rgba(240,223,160,0.90)" }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="text-xs font-medium tracking-tight"
                      style={{ color: "rgba(235,215,150,0.45)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Ghost background number */}
                <div
                  className="absolute -right-3 -bottom-4 text-9xl font-black select-none transition-all duration-700"
                  style={{ color: "rgba(255,215,0,0.05)" }}
                >
                  0{idx + 1}
                </div>
              </div>
            ))}
          </div>

          {/* CTA / Partnership Banner */}
          <div className="agent-reveal lg:col-span-12 mt-20">
            <div
              className="relative p-px rounded-[3rem] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,215,0,0.55) 0%, rgba(255,255,255,0.08) 50%, rgba(255,215,0,0.55) 100%)",
              }}
            >
              <div
                className="rounded-[2.95rem] p-8 md:p-16 flex flex-col md:flex-row justify-between items-center gap-large relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(18,12,2,0.97) 0%, rgba(10,8,2,0.98) 60%, rgba(15,10,2,0.97) 100%)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Watermark */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black pointer-events-none whitespace-nowrap select-none"
                  style={{ color: "rgba(255,215,0,0.03)" }}
                >
                  NETWORK PRO
                </div>

                {/* Inner warm glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 55% 80% at 15% 50%, rgba(255,210,40,0.08), transparent 60%)",
                  }}
                />

                <div className="flex flex-col gap-small relative z-10 text-center md:text-left">
                  <h3
                    className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none"
                    style={{ color: "#f0dfa0" }}
                  >
                    Ready to scale <br />
                    <span
                      style={{ color: "#FFD700" }}
                      className="italic text-2xl md:text-4xl"
                    >
                      your real estate business?
                    </span>
                  </h3>
                  <p
                    className="text-sm max-w-md"
                    style={{ color: "rgba(235,215,150,0.50)" }}
                  >
                    Join our elite ecosystem of high-performing agents, builders, and developers today.
                  </p>
                </div>

                <button
                  className="relative z-10 px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-300 overflow-hidden"
                  style={{ background: "#FFD700", color: "#08070a" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#FFD700";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Join The Elite
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AgentSection;
