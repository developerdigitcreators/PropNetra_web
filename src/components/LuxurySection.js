"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

const LuxurySection = () => {
   const sectionRef = useRef(null);
   const swiperRef = useRef(null);

   const luxurySlides = [
      {
         title: "Scale Your Agency To Unprecedented Heights.",
         desc: "Access premium listings, advanced lead generation, and tools built specifically for top-tier real estate agents and brokers.",
         img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
         price: "+300%",
         label: "For Agents",
         statLabel: "Growth Potential"
      },
      {
         title: "Showcase Your Projects To The Right Audience.",
         desc: "Connect your developments with high-intent buyers and streamline your sales pipeline with our builder-first platform.",
         img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
         price: "3x",
         label: "For Builders",
         statLabel: "Sales Velocity"
      },
      {
         title: "Data-Driven Insights For Your Next Big Pivot.",
         desc: "Leverage cutting-edge market analytics and a network of professionals to ensure your next development maximizes ROI.",
         img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
         price: "+85%",
         label: "For Developers",
         statLabel: "ROI Increase"
      }
   ];

   useEffect(() => {
      const ctx = gsap.context(() => {
         // Entrance reveal
         gsap.fromTo(
            ".luxury-reveal",
            { y: 60, opacity: 0 },
            {
               y: 0,
               opacity: 1,
               duration: 1.2,
               stagger: 0.1,
               ease: "expo.out",
               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 75%",
               },
            }
         );
      }, sectionRef);

      return () => ctx.revert();
   }, []);

   const handleSlideChange = (swiper) => {
      const activeSlide = swiper.slides[swiper.activeIndex];
      const reveals = activeSlide.querySelectorAll(".slide-reveal");

      gsap.fromTo(reveals,
         { y: 40, opacity: 0 },
         { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
      );
   };

   return (
      <section ref={sectionRef} className="bg-white section-py section-padding overflow-hidden relative">
         <div className="container-max">
            {/* Header Layout */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-large">
               <div className="flex flex-col gap-small max-w-2xl">
                  <div className="luxury-reveal eyebrow-gold">Built For The Visionaries.</div>
                  <h2 className="luxury-reveal title-reveal-large text-dark leading-[0.9] lowercase first-letter:uppercase">
                     Where Professionals <br />
                     <span className="gradent_text_color">Drive Growth.</span>
                  </h2>
               </div>

               <div className="luxury-reveal flex gap-small">
                  <button id="luxury-prev" className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-dark hover:text-dark transition-all">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>
                  </button>
                  <button id="luxury-next" className="w-14 h-14 rounded-full border border-dark bg-dark text-white flex items-center justify-center hover:bg-primary hover:text-dark hover:border-primary transition-all shadow-xl shadow-primary/20">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7l7 7-7 7" /></svg>
                  </button>
               </div>
            </div>

            {/* Swiper Slider */}
            <div className="luxury-reveal rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5 border border-zinc-100">
               <Swiper
                  modules={[Navigation, Autoplay, EffectFade]}
                  navigation={{ prevEl: "#luxury-prev", nextEl: "#luxury-next" }}
                  autoplay={{ delay: 5000 }}
                  effect="fade"
                  onSlideChange={handleSlideChange}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  className="h-[600px] md:h-[700px]"
               >
                  {luxurySlides.map((slide, idx) => (
                     <SwiperSlide key={idx}>
                        <div className="relative w-full h-full flex items-end">
                           <div className="absolute inset-0 z-0 scale-105">
                              <Image src={slide.img} fill className="object-cover" alt={slide.label} />
                              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                           </div>

                           <div className="relative z-10 w-full p-8 md:p-20 grid grid-cols-1 md:grid-cols-12 items-end gap-large">
                              <div className="md:col-span-8 flex flex-col gap-medium">
                                 <div className="slide-reveal px-4 py-1 border border-primary/50 text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.2em] w-fit">
                                    {slide.label}
                                 </div>
                                 <h3 className="slide-reveal text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                                    {slide.title}
                                 </h3>
                                 <p className="slide-reveal text-zinc-400 max-w-md text-sm md:text-base leading-relaxed">
                                    {slide.desc}
                                 </p>
                              </div>
                              <div className="md:col-span-4 flex flex-col md:items-end gap-medium">
                                 <div className="slide-reveal text-left md:text-right">
                                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-2">{slide.statLabel || "Market Estimate"}</span>
                                    <span className="text-5xl md:text-7xl font-black text-primary tracking-tighter">{slide.price}</span>
                                 </div>
                                 <button className="slide-reveal btn-primary-base bg-white text-dark px-12 font-bold hover:bg-primary transition-all">
                                    Explore Platform
                                 </button>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>

            {/* Floating Narrative Footer */}
            <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-medium border-t border-zinc-100 pt-12 opacity-50">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-dark" />
                  <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-dark">Professional Network</p>
               </div>
               <p className="text-xs text-zinc-500 max-w-md md:text-right leading-relaxed italic">
                  "Experience a platform where every detail is designed to accelerate your success. From lead generation to sales acceleration."
               </p>
            </div>
         </div>
      </section>
   );
};

export default LuxurySection;
