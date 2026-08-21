"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar, User, Search } from "lucide-react";
import "./blogs.css";

export default function BlogsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const blogs = [
        {
            id: 1,
            slug: "future-of-luxury-real-estate-gurgaon-2026",
            title: "The Future of Luxury Real Estate in Gurgaon 2026",
            excerpt: "Explore how emerging technologies and sustainable architecture are reshaping the high-end residential market.",
            category: "Market Trends",
            date: "May 15, 2026",
            author: "Admin",
            image: "/images/luxury_banner.png"
        },
        {
            id: 2,
            slug: "sector-88a-next-investment-goldmine",
            title: "Why Sector 88A is the Next Investment Goldmine",
            excerpt: "A deep dive into the infrastructure developments that make Sector 88A the most promising location for investors.",
            category: "Investment",
            date: "May 12, 2026",
            author: "Admin",
            image: "/images/city-skyline.png"
        },
        {
            id: 3,
            slug: "interior-design-trends-modern-builder-floors",
            title: "Interior Design Trends for Modern Builder Floors",
            excerpt: "Discover what premium homeowners are looking for in their interior layouts and smart home integrations.",
            category: "Interiors",
            date: "May 10, 2026",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 4,
            slug: "understanding-new-rera-guidelines-2026",
            title: "Understanding the New RERA Guidelines for 2026",
            excerpt: "Stay updated with the latest regulatory changes ensuring transparency and protecting buyer interests.",
            category: "Legal",
            date: "May 08, 2026",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 5,
            slug: "rise-of-eco-friendly-penthouse-living",
            title: "The Rise of Eco-Friendly Penthouse Living",
            excerpt: "How luxury developers are integrating vertical gardens and solar technology into penthouses.",
            category: "Architecture",
            date: "May 05, 2026",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 6,
            slug: "effective-networking-modern-real-estate-agents",
            title: "Effective Networking for Modern Real Estate Agents",
            excerpt: "Learn the secrets of building a professional network that consistently delivers high-quality leads.",
            category: "Agent Tips",
            date: "May 01, 2026",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
        }
    ];

    const categories = ["All", ...new Set(blogs.map(b => b.category))];
    const filteredBlogs = activeCategory === "All" ? blogs : blogs.filter(b => b.category === activeCategory);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                <section className="blogs-hero">
                    <div className="max-w-[1200px] w-full text-center px-4">
                        <h1 className="text-[2.5rem] md:text-[4rem] font-bold text-white leading-tight mb-4" style={{ fontFamily: "WastedVindey, serif" }}>
                            PropNetra <span className="text-orange-500">Journals</span>
                        </h1>
                        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
                            Curated insights for luxury real estate investors.
                        </p>
                    </div>
                </section>

                <section className="pt-8 pb-24 px-4">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 items-start">
                        {/* ===== LEFT: BLOG GRID ===== */}
                        <div className="flex-1 order-2 md:order-1">
                            <div className="mb-6 text-left">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "WastedVindey, serif" }}>
                                    Explore More <span className="text-orange-500">Stories</span>
                                </h2>
                                <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed">
                                    Dive deeper into the world of real estate with our curated collection of insights, trends, and expert advice.
                                </p>
                            </div>

                            <div className="blog-grid">
                                {filteredBlogs.map((blog) => (
                                    <Link href={`/blogs/${blog.slug}`} key={blog.id} className="blog-card block">
                                        <div className="blog-image-wrap">
                                            <img src={blog.image} alt={blog.title} />
                                        </div>
                                        
                                        <div className="blog-content">
                                            <span className="blog-category">{blog.category}</span>
                                            <h3 className="blog-title">{blog.title}</h3>
                                            <p className="blog-excerpt">{blog.excerpt}</p>

                                            <div className="blog-footer">
                                                <span className="flex items-center gap-1"><Calendar size={12}/> {blog.date}</span>
                                                <div className="text-orange-500 font-bold hover:underline flex items-center gap-1">
                                                    Read More <ArrowRight size={14}/>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* ===== RIGHT: SIDEBAR FILTERS ===== */}
                        <aside className="w-full md:w-80 order-1 md:order-2 sticky top-24">
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8 border-l-4 border-orange-500 pl-4">
                                    Browse Categories
                                </h4>
                                <div className="flex flex-col gap-3">
                                    {categories.map((cat) => (
                                        <button 
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`w-full text-left px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-between group ${
                                                activeCategory === cat 
                                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                                                : "bg-white text-slate-500 hover:bg-white hover:text-orange-500 border border-slate-100"
                                            }`}
                                        >
                                            {cat}
                                            {activeCategory === cat && <ArrowRight size={14} />}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-12 pt-12 border-top border-slate-200">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Search</h4>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="Find articles..." 
                                            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
