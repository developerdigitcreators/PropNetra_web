"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MiniBanner = ({ title, highlight, subtitle, eyebrow }) => {
  const bannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(".banner-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }
      );

      // Orb floating animation
      gsap.to(".banner-orb", {
        y: "20px",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="auth-hero top">
      <div className="auth-hero-overlay" />

      {/* Floating Orbs like Contact Page */}
      <div className="auth-orb orb-orange" />
      <div className="auth-orb orb-purple" />

      <div className="container-max px-8 lg:px-16 relative z-10">
        <div className="banner-content text-center">
          <div className="eyebrow-goldy mx-auto mb-4" style={{ width: 'fit-content' }}>
            {eyebrow || "Get Started"}
          </div>

          <h1 className="title-reveal-large !text-white leading-[1] mb-6">
            {title} <br />
            <span className="gradent_text_color">{highlight}</span>
          </h1>

          <p className="text-white/50 text-[16px] md:text-[18px] max-w-2xl mx-auto font-medium">
            {subtitle}
          </p>
        </div>
      </div>


    </section>
  );
};

export default MiniBanner;
