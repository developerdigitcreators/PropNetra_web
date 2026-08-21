"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsletterSection = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on background
      gsap.to(bgRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content reveal
      gsap.fromTo(
        ".news-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="news-section-wrap bottom p-l-r">
      <div className="news-box">
        {/* Background Image with Parallax and Overlay */}
        <div ref={bgRef} className="news-bg-parallax">
          <Image
            src="/newsletter-bg.png"
            alt="Modern Houses"
            fill
            className="object-cover"
          />
          <div className="news-overlay" />
        </div>

        {/* Content Container */}
        <div className="news-content-area">
          <div className="flex flex-col gap-4">
            <h2 className="news-reveal news-title-text">
              Subscribe To Our Newsletter
            </h2>
            <p className="news-reveal news-subtitle-text">
              Stay updated with the latest in real estate technology, architectural trends, and exclusive property launches.
            </p>
          </div>

          <form className="news-reveal news-form-glass">
            <div className="news-input-field-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="news-input-tag"
                required
              />
            </div>
            <button type="submit" className="news-submit-btn">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
