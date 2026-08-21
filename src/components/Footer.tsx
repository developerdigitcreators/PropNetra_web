"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into characters
    const split = new SplitType(textRef.current, { types: "chars" });

    // Animation
    gsap.fromTo(split.chars,
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 0.8, // Matching the opacity in CSS
        duration: 0.8,
        stagger: 0.05,
        ease: "bounce.out", // Stronger bounce
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 95%",
        }
      }
    );

    return () => {
      split.revert();
    };
  }, []);
  return (
    <footer className="footer-wrap relative">
      <div className="footer-main-card">
        <div className="footer-grid-container">

          {/* Brand & Social Section */}
          <div className="footer-brand-segment">
            <h2 className="footer-main-title">
              The ultimate growth engine and network ecosystem for elite real estate professionals, builders, and developers.
            </h2>

            <div className="footer-social-wrapper">
              <a href="#" className="footer-icon-pill">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="#" className="footer-icon-pill">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="#" className="footer-icon-pill">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              <a href="#" className="footer-icon-pill">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col-wrap">
            <h4 className="footer-col-head">Quick Links</h4>
            <Link href="/" className="footer-link-tag">About</Link>
            <Link href="/" className="footer-link-tag">App Features</Link>
            <Link href="/" className="footer-link-tag">Pricing</Link>
            <Link href="/" className="footer-link-tag">Book Demo</Link>
          </div>

          {/* Resources */}
          <div className="footer-links-col-wrap">
            <h4 className="footer-col-head">Resources</h4>
            <Link href="/careers" className="footer-link-tag">Career</Link>
            <Link href="/contact" className="footer-link-tag">Contact Us</Link>
            <Link href="/blogs" className="footer-link-tag">Blogs</Link>
            <Link href="/faqs" className="footer-link-tag">FAQs</Link>
            <Link href="/maps" className="footer-link-tag">Maps</Link>
          </div>

          {/* Contact Info */}
          <div className="footer-links-col-wrap">
            <h4 className="footer-col-head">Contact Us</h4>
            <div className="footer-links-col-wrap">

              <a href="tel:+880164824594" className="footer-link-tag">+880 164 824 594</a>
              <a href="mailto:hello@example.com" className="footer-link-tag">hello@example.com</a>
            </div>

            <div className="mt-10 max-[1440px]:mt-4  p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
              {/* Overlay to ensure readability on background image */}
              <div className="absolute inset-0  transition-colors duration-500" />

              <div className="relative z-10">
                <span className="footer-col-head !text-[10px] !mb-4 opacity-70">Get the App</span>

                <div className="flex items-center gap-4">
                  {/* QR Code Section */}
                  <div className="bg-white p-2 rounded-xl shrink-0 shadow-lg">
                    <img
                      src="/qr-code.svg"
                      alt="Download App QR"
                      className="w-16 h-16 object-contain"
                    />
                  </div>

                  {/* Buttons Section */}
                  <div className="flex flex-col gap-2 flex-1">
                    <a href="#" className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/20 hover:border-white/40 transition-all group/btn">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 384 512" fill="currentColor">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-83.6-20.2-41.2.6-86.4 25.6-112.5 73.1-41.8 74.3-10.7 185.1 29 242.9 19.3 27.9 45.4 58.9 76 58.7 29.8-.2 41-18.3 77.2-18.3s46.2 18.3 77.8 18.1c31.6-.2 54.4-27.9 73.5-56 22.3-32.1 31.4-63.3 31.7-64.9-.7-.2-61.1-23.4-61.3-92.4zM286.9 104.2c16-19.3 26.8-46.1 23.8-73-23.1 1-51.1 15.5-67.7 35.1-14.8 17.5-27.8 44.9-24.3 71 25.6 2 52.3-13.8 68.2-33.1z" />
                      </svg>
                      <div className="flex flex-col leading-none">
                        <span className="text-[7px] text-white uppercase opacity-60 mb-0.5">Download for</span>
                        <span className="text-[10px] font-bold text-white">App Store</span>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/20 hover:border-white/40 transition-all group/btn">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.7 60.7L104.6 499z" />
                      </svg>
                      <div className="flex flex-col leading-none">
                        <span className="text-[7px] text-white uppercase opacity-60 mb-0.5">Get it on</span>
                        <span className="text-[10px] font-bold text-white">Google Play</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <a href="/" className="footer-vastin-bg-text " ref={textRef}>
          PROPNETRA
        </a>
        {/* Bottom copyright bar */}
        <div className="footer-bottom-copyright flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm">© All rights reserved. PropNetra | Developed by <a href="https://devsol.in" style={{ color: "#008236" }} className="font-bold">Devsol</a></p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="text-zinc-400 text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-use" className="text-zinc-400 text-sm hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>

        {/* Massive Background Text */}

      </div>

    </footer>
  );
};

export default Footer;
