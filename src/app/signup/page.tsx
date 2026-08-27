'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import './signup.css';
import Testimonials from '@/components/Testimonials';
import DeveloperLogos from '@/components/DeveloperLogos';
import MiniBanner from '@/components/MiniBanner';
import { readReferralCodeFromBrowser, persistReferralCode } from '@/lib/referral';

const PLAY_STORE =
    process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
    'https://play.google.com/store/apps/details?id=com.propnetra';
const APP_STORE =
    process.env.NEXT_PUBLIC_APP_STORE_URL ||
    'https://apps.apple.com/app/propnetra/id0000000000';

export default function SignUpPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [otpSent, setOtpSent] = useState(false);
    const [done, setDone] = useState(false);
    /** Hidden referral — never shown in UI; sent as referId on auth step2 when wired. */
    const [referId, setReferId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        otp: ['', '', '', ''],
        companyName: '',
        city: '',
        role: '',
        hasRera: 'no',
        reraNumber: '',
        reraDoc: null,
        kycDocument: 'Aadhar Card',
        nameOnId: '',
        idNumber: '',
        dob: '',
        gender: '',
        idDocFrontBack: null,
        livePhoto: null,
        password: '',
        confirmPassword: ''
    });

    const router = useRouter();
    const cardRef = useRef(null);
    const visualRef = useRef(null);

    useEffect(() => {
        const code = readReferralCodeFromBrowser();
        if (code) {
            setReferId(code);
            persistReferralCode(code);
        }
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(cardRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        ).fromTo(".signup-visual > *",
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
        );
    }, []);

    useEffect(() => {
        gsap.fromTo(".step-content",
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
    }, [currentStep, otpSent, done]);

    const handleNext = () => {
        if (currentStep < 5) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleComplete = () => {
        if (referId) persistReferralCode(referId);
        setDone(true);
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...formData.otp];
        newOtp[index] = value;
        updateFormData('otp', newOtp);

        // Auto focus next
        if (value && index < 3) {
            const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
            if (nextInput instanceof HTMLInputElement) nextInput.focus();
        }
    };

    const renderProgressBar = () => {
        return (
            <div className="multi-step-progress">
                {[1, 2, 3, 4, 5].map((step) => (
                    <React.Fragment key={step}>
                        <div className={`progress-circle ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                            {currentStep > step ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : step}
                        </div>
                        {step < 5 && <div className={`progress-line ${currentStep > step ? 'completed' : ''}`}></div>}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="step-content">
                        <h2 className="step-title">Let's Get Started</h2>
                        <p className="step-desc">Create your PropNetra account</p>

                        <div className="form-group">
                            <label>Full Name *</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => updateFormData('fullName', e.target.value)}
                                    disabled={otpSent}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email Address *</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    placeholder="example@mail.com"
                                    value={formData.email}
                                    onChange={(e) => updateFormData('email', e.target.value)}
                                    disabled={otpSent}
                                />
                            </div>
                        </div>

                        {otpSent && (
                            <div className="form-group mt-6">
                                <label>Enter OTP *</label>
                                <div className="otp-input-group">
                                    {formData.otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            name={`otp-${idx}`}
                                            type="text"
                                            maxLength={1}
                                            className="otp-box"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                            placeholder="*"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8">
                            {!otpSent ? (
                                <>
                                    <button className="primary-auth-btn" onClick={() => setOtpSent(true)}>
                                        Send OTP
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
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
                                        Sign up with Google
                                    </button>
                                </>
                            ) : (
                                <button className="primary-auth-btn" onClick={handleNext}>
                                    Verify & Continue
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="step-content">
                        <h2 className="step-title">Complete Profile</h2>
                        <p className="step-desc">Tell us more about your business</p>
                        <div className="form-group">
                            <label>Company Name</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="16" height="16" x="4" y="4" rx="2" /><path d="M9 22V12h6v10M15 2v4M9 2v4" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="PropNetra Pvt Ltd"
                                    value={formData.companyName}
                                    onChange={(e) => updateFormData('companyName', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>City *</label>
                                <select
                                    value={formData.city}
                                    onChange={(e) => updateFormData('city', e.target.value)}
                                    className="custom-select"
                                >
                                    <option value="">Select your city</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Bangalore">Bangalore</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Role *</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => updateFormData('role', e.target.value)}
                                    className="custom-select"
                                >
                                    <option value="">Select your role</option>
                                    <option value="Agent">Real Estate Agent</option>
                                    <option value="Developer">Property Developer</option>
                                    <option value="Individual">Individual Seller</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="step-content">
                        <h2 className="step-title">KYC Verification</h2>
                        <p className="step-desc">Please provide your identification details</p>

                        <div className="form-group">
                            <label>Do you have a RERA Number? *</label>
                            <div className="radio-group-simple">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="rera"
                                        value="yes"
                                        checked={formData.hasRera === 'yes'}
                                        onChange={(e) => updateFormData('hasRera', e.target.value)}
                                    />
                                    <span className="radio-custom"></span>
                                    Yes
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="rera"
                                        value="no"
                                        checked={formData.hasRera === 'no'}
                                        onChange={(e) => updateFormData('hasRera', e.target.value)}
                                    />
                                    <span className="radio-custom"></span>
                                    No
                                </label>
                            </div>
                        </div>

                        {formData.hasRera === 'yes' && (
                            <div className="form-group">
                                <label>Upload RERA Document *</label>
                                <div className="upload-area-dashed" style={{ padding: '16px' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 15V3m0 0l-4 4m4-4l4 4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p style={{ fontSize: '12px' }}>Tap to upload PDF/Image</p>
                                </div>
                            </div>
                        )}

                        <div className="form-group mt-4">
                            <label>Select KYC Document *</label>
                            <div className="doc-tabs-premium">
                                {['Aadhar Card', 'PAN Card', 'Dealer Licence'].map(doc => (
                                    <button
                                        key={doc}
                                        className={`doc-tab-btn ${formData.kycDocument === doc ? 'active' : ''}`}
                                        onClick={() => updateFormData('kycDocument', doc)}
                                    >
                                        {doc}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Name on {formData.kycDocument} *</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.nameOnId}
                                        onChange={(e) => updateFormData('nameOnId', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>{formData.kycDocument} Number *</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder={formData.kycDocument === 'PAN Card' ? 'ABCDE1234F' : '0000 0000 0000'}
                                        value={formData.idNumber}
                                        onChange={(e) => updateFormData('idNumber', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {formData.hasRera === 'yes' && (
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date of Birth *</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="DD/MM/YYYY"
                                            value={formData.dob}
                                            onChange={(e) => updateFormData('dob', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Gender *</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </span>
                                        <select
                                            value={formData.gender}
                                            onChange={(e) => updateFormData('gender', e.target.value)}
                                            className="custom-select"
                                        >
                                            <option value="">Select your gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Upload {formData.kycDocument} *</label>
                            <div className="upload-area-dashed" style={{ padding: '16px' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 15V3m0 0l-4 4m4-4l4 4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p style={{ fontSize: '12px' }}>Tap to upload {formData.hasRera === 'yes' ? 'Front & Back' : 'Image/PDF'}</p>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="step-content">
                        <h2 className="step-title">Live Photo</h2>
                        <p className="step-desc">Take a clear selfie to verify your identity</p>

                        <div className="camera-container">
                            <div className="camera-preview">
                                <div className="face-guide"></div>
                                <div className="camera-icon-large">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
                                    </svg>
                                </div>
                                <p>Face the camera</p>
                            </div>
                            <button className="camera-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
                                </svg>
                                Open Camera
                            </button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="step-content">
                        <h2 className="step-title">Create Password</h2>
                        <p className="step-desc">Secure your account with a strong password</p>

                        <div className="form-group">
                            <label>New Password *</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => updateFormData('password', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password *</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                                />
                            </div>
                        </div>

                        <label className="terms-checkbox mt-4">
                            <input type="checkbox" required />
                            I agree to the <Link href="#">Terms & Conditions</Link>
                        </label>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="signup-wrapper">
            <main className="signup-main-content">
                <MiniBanner
                    eyebrow="Join the Elite"
                    title="Let's Build Your"
                    highlight="Future Together"
                    subtitle="Create your professional account and start building your real estate empire today."
                />

                <div className="signup-page-container p-l-r-1 top bottom">
                    <div className="signup-card-split" ref={cardRef}>
                        {/* Left Section: Form Stepper */}
                        <div className="signup-left-section">
                            <div className="stepper-header">
                                {renderProgressBar()}
                            </div>

                            <div className="stepper-body">
                                {/* Hidden refer id — never visible; mirrors app silent capture */}
                                <input type="hidden" name="referId" value={referId || ''} readOnly />
                                {done ? (
                                    <div className="step-content" style={{ textAlign: 'center', padding: '24px 8px' }}>
                                        <h2 style={{ marginBottom: 12 }}>You&apos;re almost there</h2>
                                        <p style={{ opacity: 0.8, marginBottom: 20 }}>
                                            Download the PropNetra app to finish onboarding
                                            {referId ? ' — your invite stays saved on this device.' : '.'}
                                        </p>
                                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                                            <a className="next-step-btn" href={PLAY_STORE} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                                                Google Play
                                            </a>
                                            <a className="next-step-btn" href={APP_STORE} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                                                App Store
                                            </a>
                                        </div>
                                        <p style={{ marginTop: 16, fontSize: 14 }}>
                                            <Link href="/signin">Or sign in on web</Link>
                                        </p>
                                    </div>
                                ) : (
                                    renderStep()
                                )}
                            </div>

                            {/* Standard Footer for Steps 2-5 */}
                            {currentStep > 1 && !done && (
                                <div className="stepper-footer">
                                    <button
                                        className="back-step-btn"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </button>

                                    {currentStep < 5 ? (
                                        <button className="next-step-btn" onClick={handleNext}>
                                            Continue
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button className="complete-step-btn" onClick={handleComplete}>
                                            Complete Registration
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="stepper-auth-link">
                                Already have an account? <Link href="/signin">Sign in</Link>
                            </div>
                        </div>

                        {/* Right Section: Visual Design */}
                        <div className="signup-right-section" ref={visualRef}>
                            <div className="visual-grid-overlay"></div>
                            <div className="visual-orb v-orb-1"></div>
                            <div className="visual-orb v-orb-2"></div>

                            <div className="visual-inner">
                                <div className="visual-logo-box">
                                    <img src="/logo-cropped.png" alt="PropNetra" className="visual-logo-large" />
                                </div>

                                <h2 className="visual-heading">Join <span className="highlight">PropNetra</span></h2>
                                <p className="visual-subheading">
                                    Start managing your premium property portfolio with the world's most advanced platform.
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
