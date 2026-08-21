"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const FloatingActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const whatsappModalRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isVisible) {
      gsap.to(".fab-button", {
        x: 0,
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
      gsap.to(".back-to-top", {
        x: 0,
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // Auto-show WhatsApp modal after 5 seconds
      const timer = setTimeout(() => {
        setIsWhatsappModalOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      gsap.to(".fab-button", {
        x: 100,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in",
      });
      gsap.to(".back-to-top", {
        x: -100,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
        ease: "power2.in",
      });
      setIsWhatsappModalOpen(false);
    }
  }, [isVisible]);


  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        ".modal-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isWhatsappModalOpen) {
      gsap.fromTo(
        whatsappModalRef.current,
        { scale: 0.5, opacity: 0, y: 50, x: 50 },
        { scale: 1, opacity: 1, y: 0, x: 0, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [isWhatsappModalOpen]);

  const closeModal = () => {
    gsap.to(".modal-content", {
      scale: 0.8,
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => setIsModalOpen(false),
    });
  };

  const closeWhatsappModal = () => {
    gsap.to(whatsappModalRef.current, {
      scale: 0.5,
      opacity: 0,
      y: 50,
      x: 50,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setIsWhatsappModalOpen(false),
    });
  };

  return (
    <>
      {/* Back to Top - Left Side */}
      <button
        onClick={scrollToTop}
        className="back-to-top fixed bottom-8 left-8 z-[100] w-14 h-14 bg-white text-dark rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group border border-zinc-100 opacity-0 -translate-x-[100px] pointer-events-none"
        title="Back to Top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="absolute left-16 bg-[#1a1b2e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
          Scroll to Top
        </span>
      </button>

      {/* Right Side Actions */}
      <div ref={containerRef} className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">

        {/* WhatsApp Modal Popup */}
        {isWhatsappModalOpen && (
          <div
            ref={whatsappModalRef}
            className="absolute bottom-20 right-0 w-[350px] bg-white rounded-[10px] shadow-2xl overflow-hidden border border-zinc-100 z-[110]"
          >
            {/* Header */}
            <div className="bg-[#0a5f54] p-5 flex items-center gap-3 relative">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white/20">
                <Image src="/logo-512.png" alt="PropNetra Logo" width={40} height={40} className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-lg leading-tight">PropNetra</span>
                <span className="text-white/70 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
              <button
                onClick={closeWhatsappModal}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-5 bg-[#e5ddd5] relative min-h-[150px]">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.10] pointer-events-none" style={{ backgroundImage: 'url("/whatsappbg.svg")', backgroundSize: '90px' }}></div>

              <div className="relative z-10">
                <div className="bg-white p-3 rounded-[10px] rounded-tl-none  w-[85%] inline-block">
                  <p className="text-[#303030] text-sm font-medium leading-relaxed">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase block mb-1">Sales Specialist</span>
                    Hi, How can I help you ?
                  </p>
                </div>
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="p-5 bg-white border-t border-zinc-100">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#4dc247] hover:bg-[#41a63b] text-white  py-2 rounded-full transition-all duration-300 shadow-lg shadow-green-500/20 group"
              >
                {/* <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg> */}
                <span>Start chat</span>
              </a>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <span>Powered by</span>
                <span className="text-[#25D366]">PropNetra</span>
              </div>
            </div>
          </div>
        )}

        {/* Form Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fab-button w-14 h-14 bg-[#d7d7d7] text-dark rounded-full flex items-center cursor-pointer justify-center shadow-2xl hover:scale-110 transition-transform group relative border border-white/20 opacity-0 translate-x-[100px] pointer-events-none"
          title="Enquiry Form"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute right-16 bg-[#1a1b2e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
            Enquiry Form
          </span>
        </button>

        {/* Call Button */}
        <a
          href="tel:+919876543210"
          className="fab-button w-14 h-14 bg-[#d7d7d7] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative opacity-0 translate-x-[100px] pointer-events-none"
          title="Call Us"
        >
          <Image src={'/icons8-call.gif'} alt="call icon" className="object-contain rounded-full " width={30} height={30} />
          <span className="absolute right-16 bg-[#1a1b2e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
            Call Experts
          </span>
        </a>



        {/* WhatsApp Button */}
        <button
          onClick={() => setIsWhatsappModalOpen(true)}
          className="fab-button w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center cursor-pointer justify-center shadow-2xl hover:scale-110 transition-transform group relative opacity-0 translate-x-[100px] pointer-events-none"
          title="Chat on WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="absolute right-16 bg-[#1a1b2e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
            WhatsApp Chat
          </span>
        </button>

        {/* Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <div
              className="modal-backdrop absolute inset-0 bg-dark/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            <div className="modal-content relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-zinc-100">
              <button
                onClick={closeModal}
                className="absolute cursor-pointer top-6 right-6 w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all z-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 md:p-12">
                <div className="mb-10">
                  <div className="luxury-reveal eyebrow-gold mb-4">Quick Connect</div>
                  <h3 className="text-3xl font-black text-dark uppercase tracking-tight leading-none mb-4">
                    Send Your <span className="gradent_text_color">Requirement</span>
                  </h3>
                  <p className="text-zinc-400 text-sm font-medium">Our property experts will get back to you within 24 hours.</p>
                </div>

                <form className="demo-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="demo-input-grid">
                    <div className="demo-input-group">
                      <label className="demo-label">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="demo-input"
                      />
                    </div>
                    <div className="demo-input-group">
                      <label className="demo-label">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="+91"
                        className="demo-input"
                      />
                    </div>
                  </div>

                  <div className="demo-input-group">
                    <label className="demo-label">Subject</label>
                    <select className="demo-select">
                      <option>Interested in a Project</option>
                      <option>Partner with PropNetra</option>
                      <option>Support Inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>


                  <button className="demo-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingActions;
