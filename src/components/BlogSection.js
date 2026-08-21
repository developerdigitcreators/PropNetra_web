"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
   {
      date: "23",
      month: "DEC",
      author: "admin",
      comments: "07",
      title: "Navigating bulk commercial investments in 2026",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
   },
   {
      date: "12",
      month: "DEC",
      author: "admin",
      comments: "07",
      title: "How to scale your real estate brokerage using AI tools",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
   },
   {
      date: "30",
      month: "DEC",
      author: "admin",
      comments: "07",
      title: "The developer's guide to maximizing pre-launch sales",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
   }
];

const BlogSection = () => {
   const sectionRef = useRef(null);

   // useEffect(() => {
   //    const ctx = gsap.context(() => {
   //       gsap.from(".blog-card-reveal", {
   //          y: 30,
   //          opacity: 0,
   //          duration: 0.8,
   //          stagger: 0.1,
   //          ease: "power3.out",
   //          scrollTrigger: {
   //             trigger: sectionRef.current,
   //             start: "top 85%"
   //          }
   //       });
   //    }, sectionRef);

   //    return () => ctx.revert();
   // }, []);

   return (
      <section ref={sectionRef} className="top bottom  bg-white overflow-hidden relative">
         <div className="p-l-r">

            {/* Standardized Header */}
            <div className="flex flex-col gap-small text-center mb-10">
               <div className="luxury-reveal eyebrow-gold mx-auto">Latest Insights</div>
               <h2 className="luxury-reveal title-reveal-large text-dark leading-[0.9] lowercase first-letter:uppercase">
                  PropNetra <span className="gradent_text_color">Journal</span>
               </h2>
            </div>

            {/* Compact Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {blogPosts.map((post, idx) => (
                  <a href="#"
                     key={idx}
                     className="blog-card-reveal group relative flex flex-col gap-6 bg-white p-5 rounded-[10px] border border-zinc-100 shadow-sm hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  >
                     {/* Glass Reveal Overlay — slides left → right on hover */}
                     <div className="pointer-events-none absolute inset-0 z-20 rounded-[10px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out bg-white/20  border border-white/40" />
                     {/* Compact Image Container */}
                     <div className="relative h-[220px] rounded-[10px] overflow-hidden">
                        <Image
                           src={post.img}
                           fill
                           className="object-cover group-hover:scale-110 transition-transform duration-1000"
                           alt={post.title}
                        />

                        {/* Compact Date Badge */}
                        <div className="absolute top-4 left-4 px-3.5 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center shadow-lg z-10">
                           <span className="text-[12px] font-medium text-dark leading-none">{post.date} {post.month} 2026</span>
                        </div>
                     </div>

                     {/* Optimized Content Container */}
                     <div className="flex flex-col gap-4 px-2 pb-2">
                        <h3 className="text-xl font-medium max-[1440px]:text-[16px] max-[1024px]:text-[14px] text-[#1a1b2e] leading-tight group-hover:text-orange-500 transition-colors line-clamp-2">
                           {post.title}
                        </h3>
                        <p className="text-sm text-[#1a1b2e] leading-tight line-clamp-2">
                           PropNetra is a real estate investment platform that helps investors find and purchase properties. It provides a simple, transparent way to invest in real estate, with a focus on delivering high-quality, low-risk properties.
                        </p>

                        <button className="w-fit flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-dark transition-all">
                           <span>Read Article</span>
                           <div className="w-8 h-[1px] bg-zinc-200 group-hover:w-12 group-hover:bg-dark transition-all duration-500" />
                           <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                           </svg>
                        </button>
                     </div>
                  </a>
               ))}
            </div>
         </div>
      </section>
   );
};

export default BlogSection;
