'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import './login.css';

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState('login');
    const loginFormRef = useRef(null);
    const registerFormRef = useRef(null);
    const cardRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        // Initial 3D entrance animation
        gsap.set(cardRef.current, { 
            rotateX: 45, 
            rotateY: -30, 
            z: -1000, 
            opacity: 0,
            transformOrigin: "center center -500px"
        });

        const tl = gsap.timeline();
        
        tl.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            opacity: 1,
            duration: 2,
            ease: "expo.out"
        });

        gsap.from('.grid-item', {
            scale: 0.5,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.5
        });

        // Mouse tilt effect
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            const card = cardRef.current;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cardRef.current, {
                rotateX: 0,
                rotateY: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        cardRef.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (activeTab === 'login') {
            gsap.to(registerFormRef.current, { opacity: 0, x: 20, display: 'none', duration: 0.3 });
            gsap.fromTo(loginFormRef.current, 
                { opacity: 0, x: -20, display: 'block' },
                { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
            );
        } else {
            gsap.to(loginFormRef.current, { opacity: 0, x: -20, display: 'none', duration: 0.3 });
            gsap.fromTo(registerFormRef.current, 
                { opacity: 0, x: 20, display: 'block' },
                { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    }, [activeTab]);

    return (
        <div className="login-page-container">
            <button className="back-btn" onClick={() => router.push('/')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Home
            </button>
            <div className="login-card" ref={cardRef}>
                {/* Left Section: Visual Grid */}
                <div className="login-image-section">
                    <div className="image-floating-label">
                        <h2>PropNetra</h2>
                    </div>
                    <div className="grid-item grid-item-1">
                        <img src="/images/login-bg.png" alt="Luxury Interior" />
                        <div className="grid-overlay"><span>Luxury Interiors</span></div>
                    </div>
                    <div className="grid-item grid-item-2">
                        <img src="/images/login-grid-2.png" alt="Modern Kitchen" />
                        <div className="grid-overlay"><span>Modern Kitchens</span></div>
                    </div>
                    <div className="grid-item grid-item-3">
                        <img src="/images/modal-property.png" alt="Architecture" />
                        <div className="grid-overlay"><span>Architectural Excellence</span></div>
                    </div>
                </div>

                {/* Right Section: Form */}
                <div className="login-form-section">
                    <div className="tab-switcher">
                        <button
                            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => setActiveTab('register')}
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="form-container">
                        {/* Login Form */}
                        <div className="form-wrapper" ref={loginFormRef}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="name@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" placeholder="••••••••" required />
                                </div>
                                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                                    <a href="#" style={{ color: '#bfa37c', fontSize: '0.85rem', fontWeight: '500' }}>Forgot Password?</a>
                                </div>
                                <button className="submit-btn" type="submit">Sign In</button>
                            </form>
                            
                            <div className="social-login">
                                <div className="social-divider">Or continue with</div>
                                <div className="social-btns">
                                    <button className="social-btn">Google</button>
                                    <button className="social-btn">Apple</button>
                                </div>
                            </div>
                        </div>

                        {/* Register Form */}
                        <div className="form-wrapper" ref={registerFormRef}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="John Doe" required />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="name@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" placeholder="••••••••" required />
                                </div>
                                <button className="submit-btn" type="submit">Create Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
