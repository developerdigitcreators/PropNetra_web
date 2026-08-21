'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';

import Testimonials from '@/components/Testimonials';
import DeveloperLogos from '@/components/DeveloperLogos';
import MiniBanner from '@/components/MiniBanner';
import './signin.css';
export default function SignInPage() {
    const cardRef = useRef(null);
    const visualRef = useRef(null);
    const router = useRouter();

    // useEffect(() => {
    //     const tl = gsap.timeline();

    //     tl.fromTo(cardRef.current,
    //         { y: 30, opacity: 0 },
    //         { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    //     ).fromTo(".signin-visual > *",
    //         { x: 30, opacity: 0 },
    //         { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
    //         "-=0.5"
    //     );
    // }, []);

    return (
        <div className="signin-wrapper">
            <main className="signin-main-content">
                <MiniBanner
                    eyebrow="PropNetra Portal"
                    title="Welcome Back"
                    highlight="To Your Empire"
                    subtitle="Access your premium property dashboard and manage your portfolio with global standards."
                />

                <div className="signin-page-container p-l-r-1 top bottom">
                    <div className="signin-card-split" ref={cardRef}>
                        {/* Left Section: Login Form */}
                        <div className="signin-left-section">
                            <div className="signin-form-header">
                                <h2 className="title-reveal-large auth-title !text-black">
                                    Sign <span className="gradent_text_color">in</span>
                                </h2>
                                <p className="auth-subtitle">Access your premium property dashboard</p>
                            </div>

                            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                        </span>
                                        <input type="email" placeholder="johndoe@gmail.com" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </span>
                                        <input type="password" placeholder="••••••••" required />
                                    </div>
                                </div>

                                <div className="form-options">
                                    <label className="remember-me">
                                        <input type="checkbox" />
                                        Remember me
                                    </label>
                                    <a href="#" className="forgot-link">Forgot Password?</a>
                                </div>

                                <button className="primary-auth-btn mt-6" type="submit">
                                    Sign in
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </form>

                            <div className="auth-divider">
                                <span>OR</span>
                            </div>

                            <button className="google-auth-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Sign in with Google
                            </button>

                            <div className="stepper-auth-link mt-8">
                                Don't have an account? <Link href="/signup">Sign up</Link>
                            </div>
                        </div>

                        {/* Right Section: Visual Design */}
                        <div className="signin-right-section" ref={visualRef}>
                            <div className="visual-grid-overlay"></div>
                            <div className="visual-orb v-orb-1"></div>
                            <div className="visual-orb v-orb-2"></div>

                            <div className="visual-inner">
                                <div className="visual-logo-box">
                                    <img src="/logo-cropped.png" alt="PropNetra" className="visual-logo-large" />
                                </div>

                                <h2 className="visual-heading">Welcome <span className="highlight">Back</span></h2>
                                <p className="visual-subheading">
                                    Continue managing your premium property portfolio with the world's most advanced platform.
                                </p>

                                <div className="visual-feature-card">
                                    <h3>Premium Modules</h3>
                                    <p>Experience the easiest way to manage your luxury real estate business.</p>
                                    <div className="visual-avatars">
                                        <div className="v-avatar" style={{ background: '#FF8A00' }}></div>
                                        <div className="v-avatar" style={{ background: '#333' }}></div>
                                        <div className="v-avatar-more">+5</div>
                                    </div>
                                </div>
                            </div>

                            <div className="visual-circle circle-1"></div>
                            <div className="visual-circle circle-2"></div>
                        </div>
                    </div>
                </div>

                <div className='bg-white top'></div>
                <DeveloperLogos />
                <Testimonials />
            </main>
        </div>
    );
}
