"use client";
import React, { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contact.css";
import Image from "next/image";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Local registration for robustness
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 1. Initial State (Hidden)
            gsap.set(".contact-hero-content > *, .contact-info-card, .contact-form-card", {
                y: 40,
                opacity: 0
            });

            // 2. Hero Entrance (Immediate)
            gsap.to(".contact-hero-content > *", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power4.out"
            });

            // 3. Info Cards Reveal
            gsap.to(".contact-info-card", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-main-grid",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            // 4. Form Card Reveal
            gsap.to(".contact-form-card", {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".contact-main-grid",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            // Floating Animation for Hero Orbs
            gsap.to(".contact-orb", {
                y: "20px",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5
            });
        }, containerRef);

        // Safety refresh
        const timer = setTimeout(() => ScrollTrigger.refresh(), 1000);
        window.addEventListener("load", () => ScrollTrigger.refresh());

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <main ref={containerRef} className="contact-page">

            {/* Hero Section */}
            <section className="contact-hero">
                {/* <div className="contact-hero-overlay" /> */}

                {/* Floating Orbs */}
                {/* <div className="contact-orb orb-1" />
                <div className="contact-orb orb-2" /> */}

                <div className="p-l-r">
                    <div className="contact-hero-content">
                        <div className="luxury-reveal eyebrow-gold mx-auto mb-4" style={{ width: 'fit-content' }}>Get in Touch</div>
                        <h1 className="title-reveal-large !text-dark leading-[0.9] lowercase first-letter:uppercase mb-6">
                            Let's Build Your <span className="gradent_text_color">Future Together</span>
                        </h1>

                    </div>
                </div>
            </section>

            {/* Reference Design Section */}
            <section className="contact-main p-l-r section top bottom">
                <div className="contact-intro-grid">

                    {/* Left Side: Large Image */}
                    <div className="contact-intro-image">
                        <Image
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2600&auto=format&fit=crop"
                            alt="Modern Architecture"
                            width={800}
                            height={1000}
                            className="object-cover h-full w-full rounded-[2rem]"
                        />
                    </div>

                    {/* Right Side: Content + Cards */}
                    <div className="contact-intro-content">
                        <div className="headingBox flex flex-col gap-small  text-left mb-0 ">
                            <span className="luxury-reveal eyebrow-gold text-left" style={{ width: 'fit-content' }}>Contact Us</span>
                            <h2 className="title-reveal-large">
                                Have questions or ideas to share? We're just a message away feel free to reach out anytime.
                            </h2>
                        </div>
                        <div className="contact-intro-cards mt-[30px]">
                            {/* Email Card */}
                            <div className="intro-card">
                                <div className="intro-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M3 8L10.89 13.26C11.57 13.71 12.43 13.71 13.11 13.26L21 8M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Email</h3>
                                <p>hello@example.com</p>
                                <p>info@example.com</p>
                            </div>

                            {/* Phone Card */}
                            <div className="intro-card">
                                <div className="intro-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M3 5.5C3 14.06 9.94 21 18.5 21C19.88 21 21 19.88 21 18.5V15.72C21 15.27 20.72 14.87 20.31 14.66L17.76 13.39C17.34 13.18 16.83 13.28 16.51 13.6L14.71 15.4C12.31 14.18 10.32 12.19 9.1 9.79L10.9 7.99C11.22 7.67 11.32 7.16 11.11 6.74L9.84 4.19C9.63 3.78 9.23 3.5 8.78 3.5H6C4.34 3.5 3 4.84 3 6.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Phone</h3>
                                <p>+880-164 824 594</p>
                                <p>+990-324 126 824</p>
                            </div>

                            {/* Location Card */}
                            <div className="intro-card">
                                <div className="intro-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Location</h3>
                                <p>Canada City, Office:02,</p>
                                <p>Road:11, House:3B/B,</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form + Map Section */}
            <section className="contact-form-section p-l-r section bottom">
                <div className="contact-form-map-grid">

                    {/* Left: Form */}
                    <div className="contact-form-area">
                        <div className="headingBox flex flex-col gap-small  text-left mb-0 ">
                            <span className="luxury-reveal eyebrow-gold text-left" style={{ width: 'fit-content' }}>Get in Touch</span>
                            <h2 className="title-reveal-large">
                                Leave a <span className="gradent_text_color" >message</span>
                            </h2>
                        </div>
                        <form className="message-form mt-[30px]" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" placeholder="Your name*" className="msg-input" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Your email*" className="msg-input" required />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" placeholder="Phone number*" className="msg-input" required />
                                </div>
                                <div className="form-group">
                                    <select className="msg-input" defaultValue="">
                                        <option value="" disabled>Inquiry about...</option>
                                        <option value="subscription">Subscription</option>
                                        <option value="technical">Technical Support</option>
                                        <option value="partnership">Partnership</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <textarea placeholder="Write your message..." className="msg-input msg-textarea" required />
                            </div>

                            <button type="submit" className="msg-submit-btn">
                                Submit Now
                            </button>
                        </form>
                    </div>

                    {/* Right: Map */}
                    <div className="contact-map-area">
                        <div className="map-frame">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112235.345!2d77.06!3d28.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5b4851083974c!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(1) contrast(1.2) opacity(0.8)" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                </div>
            </section>
            <HowItWorks isTrue={true} />
            <Testimonials />
        </main>
    );
};

export default ContactPage;
