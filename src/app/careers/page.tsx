"use client";

import React, { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./careers.css";
import Testimonials from "@/components/Testimonials";

const jobsData = [
    {
        title: "Senior Product Designer",
        type: "Full-time",
        location: "Remote / Gurugram",
        link: "#",
        description: "We are looking for a Senior Product Designer to join our core product team. You will be responsible for defining the user experience and visual design of our platform, working closely with engineering and marketing teams to deliver world-class property search experiences.",
        requirements: [
            "5+ years of experience in product design",
            "Proficiency in Figma, Framer, and Adobe Suite",
            "Strong portfolio demonstrating both UI and UX expertise",
            "Experience with real estate or marketplace platforms is a plus"
        ]
    },
    {
        title: "Backend Engineer (Node.js)",
        type: "Full-time",
        location: "Remote",
        link: "#",
        description: "Join our core engineering team to build scalable, high-performance backend systems. You will work on architecting microservices, optimizing database queries, and ensuring the reliability of our global infrastructure.",
        requirements: [
            "Expertise in Node.js, Express, and TypeScript",
            "Strong knowledge of PostgreSQL and Redis",
            "Experience with AWS/GCP and Kubernetes",
            "Passion for building secure and scalable APIs"
        ]
    },
    {
        title: "Growth Marketing Lead",
        type: "Full-time",
        location: "Gurugram",
        link: "#",
        description: "We're seeking a data-driven Growth Marketing Lead to scale our user acquisition across India and global markets. You will lead cross-functional experiments to drive user growth and retention.",
        requirements: [
            "Proven track record of scaling consumer apps",
            "Expertise in SEO, SEM, and performance marketing",
            "Strong analytical skills and A/B testing experience",
            "Creative mindset with a focus on data-driven results"
        ]
    },
    {
        title: "Client Relations Manager",
        type: "Contract",
        location: "Dubai",
        link: "#",
        description: "Be the face of PropNetra for our high-net-worth clients and developers in the Dubai market. You will manage relationships, handle inquiries, and ensure seamless property transactions.",
        requirements: [
            "Exceptional communication and negotiation skills",
            "3+ years experience in Dubai real estate market",
            "Ability to manage luxury client expectations",
            "Strong network within the local property industry"
        ]
    }
];

const CareersPage = () => {
    const containerRef = useRef(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Initialize states
            gsap.set(".careers-hero-content > *, .reveal-up, .job-card", { opacity: 0 });

            // Hero entrance
            gsap.to(".careers-hero-content > *", {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 1,
                ease: "power4.out"
            });

            // Section reveals
            gsap.to(".reveal-up", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".careers-values",
                    start: "top 80%"
                }
            });

            // Job cards reveal
            gsap.to(".job-card", {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".careers-jobs-list",
                    start: "top 85%"
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const openApply = (job) => {
        setSelectedJob(job);
        setIsApplyOpen(true);
        setIsDetailsOpen(false);
    };

    const openDetails = (job) => {
        setSelectedJob(job);
        setIsDetailsOpen(true);
        setIsApplyOpen(false);
    };

    const closeModals = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsApplyOpen(false);
                setIsDetailsOpen(false);
                setSelectedJob(null);
            }
        });
        tl.to(".modal-content", { y: 50, opacity: 0, duration: 0.4, ease: "power2.in" })
            .to(".modal-overlay", { opacity: 0, duration: 0.3 }, "-=0.2");
    };

    useEffect(() => {
        if (isApplyOpen || isDetailsOpen) {
            gsap.fromTo(".modal-overlay", { opacity: 0 }, { opacity: 1, duration: 0.4 });
            gsap.fromTo(".modal-content",
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.1 }
            );
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isApplyOpen, isDetailsOpen]);

    return (
        <main ref={containerRef} className="careers-page">

            {/* Hero Section */}
            <section className="careers-hero top">
                <div className="careers-hero-overlay"></div>
                <div className="p-l-r relative z-10 text-center">
                    <div className="luxury-reveal eyebrow-goldy mx-auto mb-4" style={{ width: 'fit-content' }}>Join Our Team</div>
                    <h1 className="title-reveal-large !text-white leading-[0.9] lowercase first-letter:uppercase mb-8">
                        Build the <span className="gradent_text_color">Future</span> of Real Estate
                    </h1>
                </div>
            </section>

            {/* Values Section */}
            <section className="careers-values section top bottom p-l-r">
                <div className="headingBox flex flex-col gap-small text-center mb-15 reveal-up">
                    <span className="luxury-reveal eyebrow-gold mx-auto" style={{ width: 'fit-content' }}>Our Culture</span>
                    <h2 className="title-reveal-large">What drives <span className="gradent_text_color">us forward</span></h2>
                </div>

                <div className="values-grid">
                    <div className="value-card reveal-up">
                        <div className="value-icon">01</div>
                        <h3>Relentless Innovation</h3>
                        <p>We don't follow trends; we set them. We empower our team to experiment with cutting-edge tech every day.</p>
                    </div>
                    <div className="value-card reveal-up">
                        <div className="value-icon">02</div>
                        <h3>Radical Transparency</h3>
                        <p>Information flows freely here. We believe the best ideas can come from anyone, anywhere in the company.</p>
                    </div>
                    <div className="value-card reveal-up">
                        <div className="value-icon">03</div>
                        <h3>Global Impact</h3>
                        <p>With a presence in key global markets, your work at PropNetra will influence real estate on a worldwide scale.</p>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="careers-jobs top section bottom p-l-r">
                <div className="careers-jobs-container">
                    <div className="flex justify-between items-end mb-16">
                        <div className="headingBox flex flex-col gap-small text-left mb-0">
                            <span className="luxury-reveal eyebrow-gold" style={{ width: 'fit-content' }}>Current Openings</span>
                            <h2 className="title-reveal-large">Join the <span className="gradent_text_color">Elite</span></h2>
                        </div>
                        <div className="job-count-badge">{jobsData.length} Open Roles</div>
                    </div>

                    <div className="careers-jobs-list">
                        {jobsData.map((job, idx) => (
                            <div key={idx} className="job-card group">
                                <div className="job-info">
                                    <h3>{job.title}</h3>
                                    <div className="job-meta">
                                        <span>{job.type}</span>
                                        <span className="dot"></span>
                                        <span>{job.location}</span>
                                    </div>
                                </div>
                                <div className="job-actions">
                                    <button className="job-view-btn cursor-pointer" onClick={() => openDetails(job)}>
                                        View Details
                                    </button>
                                    <button className="job-apply-btn cursor-pointer" onClick={() => openApply(job)}>
                                        Apply Now
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14m-7-7 7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / Perfect Role Section */}
            <section className="careers-contact p-l-r  top mb-10">
                <div className="relative overflow-hidden rounded-[2rem] bg-[#1a1b2e] p-8 md:p-14 text-center group shadow-2xl">
                    {/* Decorative Background Element */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <Image
                            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2600&auto=format&fit=crop"
                            fill
                            className="object-cover"
                            alt="Background"
                        />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">
                            Can't Find Your <span className="gradent_text_color">Perfect Role?</span>
                        </h2>
                        <p className="text-zinc-400 text-xs md:text-base mb-10 max-w-2xl mx-auto leading-relaxed">
                            Don't see a position that matches your skills? We're always interested in connecting with passionate and talented individuals.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            {/* Email Card */}
                            <div className="flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-[#24253d] hover:bg-[#2a2b45] hover:border-white/20 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Email Us</span>
                                    <a href="mailto:hr@propnetra.com" className="text-white font-bold text-sm hover:text-primary transition-colors">hr@propnetra.com</a>
                                </div>
                            </div>

                            {/* Call Card */}
                            <div className="flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-[#24253d] hover:bg-[#2a2b45] hover:border-white/20 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Call Us</span>
                                    <a href="tel:+918500900100" className="text-white font-bold text-sm hover:text-primary transition-colors">+91-8500 900 100</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Modals */}
            {(isApplyOpen || isDetailsOpen) && (
                <div className="modal-overlay" ref={overlayRef} onClick={closeModals}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModals}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {isDetailsOpen && selectedJob && (
                            <div className="details-modal">
                                <div className="modal-header">
                                    <span className="eyebrow-goldy mb-2">{selectedJob.type} • {selectedJob.location}</span>
                                    <h2 className="text-3xl font-black text-dark mb-4">{selectedJob.title}</h2>
                                </div>
                                <div className="modal-body overflow-y-auto max-h-[60vh] pr-4">
                                    <div className="mb-8">
                                        <h4 className="text-lg font-bold text-dark mb-3">About the role</h4>
                                        <p className="text-zinc-600 leading-relaxed">{selectedJob.description}</p>
                                    </div>
                                    <div className="mb-8">
                                        <h4 className="text-lg font-bold text-dark mb-3">Requirements</h4>
                                        <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                                            {selectedJob.requirements.map((req, i) => (
                                                <li key={i}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="modal-footer pt-6 border-t border-zinc-100 flex justify-end">
                                    <button className="job-apply-btn" onClick={() => openApply(selectedJob)}>
                                        Apply for this position
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14m-7-7 7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {isApplyOpen && selectedJob && (
                            <div className="apply-modal">
                                <div className="modal-header text-center mb-8">
                                    <h2 className="text-2xl font-black text-dark mb-2">Apply for Position</h2>
                                    <p className="text-zinc-500">Submit your application and we'll get back to you soon</p>
                                </div>

                                <form className="apply-form space-y-6 overflow-y-auto max-h-[65vh] px-2 py-4 pr-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="input-group">
                                            <label className="text-xs font-bold text-dark mb-2 block">Full Name *</label>
                                            <input type="text" placeholder="Enter your full name" className="modal-input" required />
                                        </div>
                                        <div className="input-group">
                                            <label className="text-xs font-bold text-dark mb-2 block">Email Address *</label>
                                            <input type="email" placeholder="Enter your email address" className="modal-input" required />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label className="text-xs font-bold text-dark mb-2 block">Phone Number</label>
                                        <input type="tel" placeholder="Enter your phone number (optional)" className="modal-input" />
                                    </div>

                                    <div className="input-group">
                                        <label className="text-xs font-bold text-dark mb-2 block">Resume URL</label>
                                        <input type="url" placeholder="Link to your resume (Google Drive, LinkedIn, etc.)" className="modal-input" />
                                    </div>

                                    <div className="input-group">
                                        <label className="text-xs font-bold text-dark mb-2 block">Upload Resume</label>
                                        <div className="file-upload-zone">
                                            <div className="upload-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                                </svg>
                                            </div>
                                            <p className="text-sm font-bold text-dark">Click to upload <span className="font-medium text-zinc-500">or drag and drop</span></p>
                                            <p className="text-[10px] text-zinc-400 mt-1 uppercase">PDF, DOC, DOCX (MAX. 5MB)</p>
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label className="text-xs font-bold text-dark mb-2 block">Cover Letter</label>
                                        <textarea placeholder="Tell us why you're interested in this position..." className="modal-input min-h-[120px] resize-none"></textarea>
                                    </div>

                                    <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-dark transition-all duration-300 uppercase tracking-widest text-xs">
                                        Submit Application
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <Testimonials />
        </main>
    );
};

export default CareersPage;
