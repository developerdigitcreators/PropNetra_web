"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, Clock, ChevronRight, List } from "lucide-react";
import "../blogs.css";

export default function BlogDetailPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />

            <main className="article-container">
                {/* ===== LEFT: ARTICLE CONTENT ===== */}
                <div className="article-main">
                    <header className="article-header">
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest mb-4">
                            <span>Investment</span>
                            <ChevronRight size={12} />
                            <span>Guides</span>
                        </div>
                        <h1 className="article-title" style={{ fontFamily: "WastedVindey, serif" }}>
                            Here are <span className="text-orange-500">five compelling</span> reasons why 2026 is the right time to invest in luxury real estate!
                        </h1>
                        <div className="article-meta">
                            <span className="flex items-center gap-2"><Calendar size={14}/> 18 Jan 2026</span>
                            <span className="flex items-center gap-2"><User size={14}/> Admin</span>
                            <span className="flex items-center gap-2"><Clock size={14}/> 8 Min Read</span>
                        </div>
                    </header>

                    <div className="featured-image-box">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000" alt="Luxury Real Estate" />
                    </div>

                    {/* Table of Contents */}
                    <div className="toc-box">
                        <div className="toc-title">
                            <span>Table of Content</span>
                            <List size={18} className="text-orange-500" />
                        </div>
                        <ul className="toc-list">
                            <li><span>1.</span> High capital appreciation</li>
                            <li><span>2.</span> Exceptional Lifestyle Benefits</li>
                            <li><span>3.</span> Rental Income Potential</li>
                            <li><span>4.</span> Hedge against inflation</li>
                            <li><span>5.</span> Tangible Asset Security</li>
                        </ul>
                    </div>

                    <div className="article-body">
                        <p>
                            Gurgaon’s real estate market has undergone a significant transformation in recent years, shifting from a primarily commercial hub to one of the most sought-after luxury residential destinations in the country. As we move into 2026, the momentum is stronger than ever.
                        </p>

                        <h2>1. High Capital Appreciation</h2>
                        <p>
                            One of the primary drivers for luxury real estate investment is the consistent capital appreciation. Premium properties in prime locations like <b>Sector 88A</b> and <b>Golf Course Extension Road</b> have seen double-digit growth year-over-year. Investors who enter the market now are positioned to benefit from the ongoing infrastructure projects and the influx of multinational corporations.
                        </p>

                        <div className="highlight-box">
                            "Luxury real estate isn't just a home; it's a strategic asset that preserves wealth while providing an unmatched living experience."
                        </div>

                        <h2>2. Exceptional Lifestyle Benefits</h2>
                        <p>
                            Modern luxury residential projects are no longer just about four walls. They offer a comprehensive lifestyle ecosystem including private clubhouses, temperature-controlled pools, smart home automation, and dedicated concierge services. In 2026, the demand for "wellness-centric" homes is at an all-time high.
                        </p>

                        <h2>3. Rental Income Potential</h2>
                        <p>
                            With the return-to-office mandates and the expansion of the tech corridor, high-net-worth professionals are looking for premium rentals. Luxury apartments in Gurgaon can command significant rental yields, often outperforming traditional investment avenues.
                        </p>

                        <img className="w-full rounded-2xl my-8" src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000" alt="Luxury Interior" />

                        <h2>4. Hedge Against Inflation</h2>
                        <p>
                            Real estate has historically been a reliable hedge against inflation. As the cost of living and construction materials rises, the value of existing luxury inventory tends to escalate, protecting the investor's purchasing power.
                        </p>

                        <h2>5. Tangible Asset Security</h2>
                        <p>
                            Unlike volatile stock markets, real estate is a physical, tangible asset. The security of owning land and premium construction in a high-demand zone provides peace of mind that digital assets simply cannot match.
                        </p>
                    </div>
                </div>

                {/* ===== RIGHT: SIDEBAR ===== */}
                <aside className="article-sidebar">
                    <div className="recent-posts-widget sticky top-24">
                        <h4 className="widget-title">On the Journals</h4>
                        
                        <div className="mini-post-card">
                            <div className="mini-thumb">
                                <img src="/images/city-skyline.png" alt="Recent 1" />
                            </div>
                            <div className="mini-content">
                                <h5>Why Sector 88A is the Next Investment Goldmine</h5>
                                <span>12 May 2026</span>
                            </div>
                        </div>

                        <div className="mini-post-card">
                            <div className="mini-thumb">
                                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400" alt="Recent 2" />
                            </div>
                            <div className="mini-content">
                                <h5>Interior Design Trends for Modern Builder Floors</h5>
                                <span>10 May 2026</span>
                            </div>
                        </div>

                        <div className="mini-post-card">
                            <div className="mini-thumb">
                                <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400" alt="Recent 3" />
                            </div>
                            <div className="mini-content">
                                <h5>Understanding the New RERA Guidelines</h5>
                                <span>08 May 2026</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <Footer />
        </div>
    );
}
