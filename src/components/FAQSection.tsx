"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How does the platform accelerate sales for developers?",
      answer: "Our platform provides real-time analytics, direct access to a network of 11,000+ active brokers, and targeted marketing tools built to close builder inventory faster."
    },
    {
      question: "How are commissions structured for partner agents?",
      answer: "We offer the industry's highest brokerage slabs. Our transparent dashboard lets you track leads, manage your pipeline, and claim commissions seamlessly."
    },
    {
      question: "How do I gain access to exclusive bulk deals?",
      answer: "Verified network partners automatically unlock access to pre-launch offerings, bulk allotments, and off-market commercial deals not available to the public."
    },
    {
      question: "What CRM and integration capabilities are available?",
      answer: "We offer full-suite digital tools with API access for enterprise users, allowing you to sync leads directly to your existing CRM and automate your workflow."
    },
    {
      question: "Is there a vetting process to join the network?",
      answer: "Yes, to maintain a high-quality ecosystem, we verify all agents, builders, and developers before granting access to our premium deals."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="top bottom bg-white overflow-hidden">
      <div className="container-max px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Content - Accordions */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            <div className="faq-reveal flex flex-col gap-2">
              <span className="eyebrow-gold">Platform Support</span>
              <h2 className="title-reveal-large ">
                Everything you <br />need to <span className="gradent_text_color">scale</span>
              </h2>
            </div>

            <div className="faq-reveal flex flex-col gap-3 mt-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`group border transition-all duration-500 rounded-2xl overflow-hidden ${activeIndex === index ? "border-primary shadow-lg shadow-primary/5 bg-zinc-50/50" : "border-zinc-100 hover:border-zinc-200"
                    }`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors cursor-pointer"
                  >
                    <span className="text-base font-bold text-dark">
                      {faq.question}
                    </span>
                    <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-500 ${activeIndex === index ? "rotate-180 text-primary" : "text-zinc-400"
                      }`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                  </button>

                  <div className={`transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                    }`}>
                    <div className="px-5 md:px-6 pb-6">
                      <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="faq-reveal relative h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden lg:col-span-5 shadow-2xl border border-zinc-100">
            <Image
              src="/faq-luxury-building.png"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              alt="Professional Network Support FAQ"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
