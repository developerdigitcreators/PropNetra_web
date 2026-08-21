"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./faqs.css";

const faqsData = [
  {
    id: "general",
    category: "General Information",
    icon: "✨",
    questions: [
      { q: "What is PropNetra?", a: "PropNetra is an elite real estate networking and portfolio management ecosystem designed for modern professionals. We combine high-speed analytics with a luxury interface to redefine how property portfolios are managed." },
      { q: "How do I get started?", a: "Simply select your preferred plan from our pricing page. Once registered, our concierge team will guide you through a personalized onboarding experience." },
      { q: "Can I upgrade my plan later?", a: "Absolutely. You can scale your subscription at any time. Our system automatically prorates your remaining balance for a seamless transition." }
    ]
  },
  {
    id: "platform",
    category: "Platform Features",
    icon: "🚀",
    questions: [
      { q: "Is there a mobile application?", a: "Yes, our native iOS and Android apps provide full platform functionality with biometric security and real-time push notifications for all portfolio movements." },
      { q: "What integrations are supported?", a: "We support direct synchronization with leading CRMs, accounting software like QuickBooks, and automated bank feed integrations." },
      { q: "How secure is my data?", a: "We utilize AES-256 military-grade encryption and multi-region cloud redundancy. Your privacy and data integrity are our highest priorities." }
    ]
  },
  {
    id: "billing",
    category: "Billing & Payments",
    icon: "💳",
    questions: [
      { q: "What payment methods are accepted?", a: "We accept all major global credit cards, wire transfers for enterprise accounts, and secure digital payment gateways." },
      { q: "Are there any hidden charges?", a: "Transparency is core to our values. All platform fees are clearly outlined in your plan. No hidden maintenance or setup costs apply." }
    ]
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className={`faq-lux-item ${isOpen ? "is-open" : ""}`}>
      <button className="faq-lux-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="faq-lux-q">{question}</span>
        <div className="faq-lux-plus">
          <span className="line-h"></span>
          <span className="line-v"></span>
        </div>
      </button>
      <div className="faq-lux-content" style={{ height: isOpen ? contentRef.current?.scrollHeight : 0 }}>
        <div ref={contentRef} className="faq-lux-inner">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [activeCat, setActiveCat] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Initialize states
      gsap.set(".faq-advance-hero > *, .faq-sidebar-item", { opacity: 0 });

      // Hero reveal
      gsap.to(".faq-advance-hero > *", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });

      // Sidebar reveal
      gsap.to(".faq-sidebar-item", {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="faq-advance-page">


      {/* Advanced Hero */}
      <section className="faq-advance-hero">
        {/* <div className="faq-orb orb-gold"></div>
        <div className="faq-orb orb-purple"></div> */}

        <div className="p-l-r text-center relative z-10">
          <div className="luxury-reveal eyebrow-goldy mx-auto mb-4" style={{ width: 'fit-content' }}>Support Center</div>
          <h1 className="title-reveal-large !text-white leading-tight">
            How can we <span className="gradent_text_color">help you?</span>
          </h1>

          {/* <div className="faq-search-box mx-auto mt-10">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search for questions, features, or troubleshooting..."
              className="faq-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}
        </div>
      </section>

      {/* Content Section */}
      <section className="faq-advance-main top bottom p-l-r section bottom">
        <div className="faq-advance-grid">

          {/* Left Sidebar */}
          <aside className="faq-sidebar">
            <div className="faq-sidebar-sticky">
              <h3 className="sidebar-label">Categories</h3>
              {faqsData.map(cat => (
                <button
                  key={cat.id}
                  className={`faq-sidebar-item ${activeCat === cat.id ? "active" : ""}`}
                  onClick={() => setActiveCat(cat.id)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-text">{cat.category}</span>
                </button>
              ))}

              <div className="sidebar-contact-card mt-12">
                <h4>Still need help?</h4>
                <p>Our luxury concierge is available 24/7 for premium members.</p>
                <button className="contact-small-btn">Contact Concierge</button>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="faq-content-area">
            {faqsData.map(cat => (
              <div
                key={cat.id}
                className={`faq-category-block ${activeCat === cat.id ? "visible" : "hidden"}`}
              >
                <div className="cat-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-zinc-100 relative">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-black/5 flex items-center justify-center text-2xl border border-zinc-50">
                        {cat.icon}
                      </span>
                      <div className="h-[1px] w-12 bg-primary/30"></div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Resources</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-none lowercase first-letter:uppercase">
                      {cat.category}
                    </h2>
                  </div>
                  <div className="flex flex-col items-start md:items-end relative z-10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-dark/5 tracking-tighter leading-none">{cat.questions.length}</span>
                      <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Questions</span>
                    </div>
                  </div>
                  
                  {/* Decorative faint text background */}
                  <div className="absolute -bottom-4 right-0 text-[120px] font-black text-zinc-50 opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter leading-none whitespace-nowrap">
                    {cat.id}
                  </div>
                </div>
                <div className="faq-list">
                  {cat.questions
                    .filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item, idx) => (
                      <FAQItem key={idx} question={item.q} answer={item.a} />
                    ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
};

export default FAQPage;

