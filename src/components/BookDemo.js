"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BookDemo = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background reveal
      gsap.from(".demo-image-container", {
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // Content reveal
      gsap.from(".demo-content > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".demo-content",
          start: "top 80%",
        }
      });

      // Form reveal
      gsap.from(formRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="book-demo" className="section top bottom p-l-r bg-[#eeeeee] overflow-hidden">
      <div className="container-max ">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Side: Content & Image */}
          <div className="demo-content flex-1 flex flex-col gap-8 order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <span className="eyebrow-gold uppercase tracking-[0.3em] text-xs font-bold">Personalized Experience</span>
              <h2 className="title-reveal-large tracking-tighter ">
                See the <span className="gradent_text_color">Future</span> <br />
                of Real Estate.
              </h2>
              <p className="text-dark leading-relaxed">
                Experience a platform designed specifically for the modern real estate professional.
                Find leads faster, close deals efficiently, and scale your agency with PropNetra.
              </p>
            </div>

            <div className="demo-image-container relative w-full h-[300px] md:h-[250px] rounded-[1rem] overflow-hidden shadow-2xl border border-zinc-100">
              <Image
                src="/faq-luxury-building.png"
                alt="PropNetra Dashboard"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

          </div>

          {/* Right Side: Form */}
          <div ref={formRef} className="flex-1 w-full max-w-xl order-1 lg:order-2">
            <div className="bg-white p-8 md:p-12 rounded-[1rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100 relative">
              {/* Decorative Blur */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="mb-10 relative">
                <div className="absolute -left-8 top-0 w-1.5 h-full bg-gradient-to-b from-primary to-primary/20 rounded-full hidden md:block" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-extrabold mb-3 block">Reservation</span>
                <h3 className="text-3xl md:text-4xl font-black text-dark tracking-tighter leading-tight mb-3">
                  Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">Demo</span>
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-zinc-200" />
                  <p className="text-zinc-500 text-xs md:text-sm font-medium">
                    Fill in your details and our team will get in touch.
                  </p>
                </div>
              </div>

              <form className="demo-form space-y-2" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 group">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold ml-4 group-focus-within:text-primary transition-colors">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </span>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-zinc-50 border border-zinc-100 py-4 pl-12 pr-6 rounded-2xl outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-medium text-dark placeholder:text-zinc-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 group">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold ml-4 group-focus-within:text-primary transition-colors">Phone Number</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      </span>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full bg-zinc-50 border border-zinc-100 py-4 pl-12 pr-6 rounded-2xl outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-medium text-dark placeholder:text-zinc-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 group">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold ml-4 group-focus-within:text-primary transition-colors">Select Business</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors pointer-events-none">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    </span>
                    <select className="w-full bg-zinc-50 border border-zinc-100 py-4 pl-12 pr-12 rounded-2xl outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-medium text-dark appearance-none cursor-pointer">
                      <option>Real Estate Agent</option>
                      <option>Developer</option>
                      <option>Builder</option>
                      <option>Interior Company</option>
                      <option>Other</option>
                    </select>
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                    </span>
                  </div>
                </div>

                <button className="w-full bg-dark text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 group hover:bg-primary transition-all duration-500 shadow-xl shadow-dark/5 hover:shadow-primary/30 hover:-translate-y-1 active:scale-[0.98] mt-4 uppercase tracking-[0.2em] text-xs">
                  <span>Schedule Demo</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>

                <p className="text-[10px] text-zinc-400 text-center font-medium opacity-80">
                  By clicking "Schedule Demo", you agree to our <span className="text-dark font-bold underline cursor-pointer">Terms</span> and <span className="text-dark font-bold underline cursor-pointer">Privacy Policy</span>.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookDemo;
