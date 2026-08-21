"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

const CreativeBanner = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial Image Reveal
      tl.fromTo(
        ".slider-img-container",
        { clipPath: "inset(0 100% 0 0)", scale: 1.2 },
        { clipPath: "inset(0 0% 0 0)", scale: 1.05, duration: 1.8, ease: "expo.inOut" }
      );

      tl.fromTo(
        ".banner-reveal",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
        "-=0.8"
      )
        .fromTo(
          ".stat-reveal",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        );

      // Continuous Ken Burns effect for active slide
      gsap.to(".swiper-slide-active img", {
        scale: 1.15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const sliderImages = [
    "https://images.unsplash.com/photo-1590079262566-76237bc41229?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1776255076699-d2dc33434b16?q=80&w=1160&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1700114804921-953a3c4e5d82?q=80&w=1171&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1776445602573-0cc8680b4d0a?q=80&w=1170&auto=format&fit=crop"
  ];

  return (
    <section id="home" ref={containerRef} className="relative banner-section w-full bg-black flex items-center justify-center ">
      {/* Background Slider */}
      <div className="absolute slider_box_banner inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full w-full"
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full slider-img-container overflow-hidden">
                <Image
                  src={img}
                  alt={`Luxury Real Estate ${index + 1}`}
                  fill
                  className="object-cover banner-img"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50 z-10" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-20" />
      </div>

      {/* Centered Fixed Content */}
      <div className="relative z-30 container-max px-8 lg:px-16 text-center">
        <div className="overflow-hidden mb-4">

        </div>
        <h1 className="text-center text-white font-semibold  banner_heading relative z-10">
          <span className="champ">I</span>ndia’s <span className="champ">L</span>eading <span className="champ">P</span>latform <br />For Real Estate Professionals

        </h1>
      </div>

      {/* Floating Bottom Section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 w-[70%] max-[1440px]:w-[80%] max-[1199px]:w-[90%]">
        <div className="bg-white rounded-[20px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] p-6 max-[1440px]:p-2 border-white">
          {/* Features — flex row with dot connectors */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            {[
              { label: "Verified Builders", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", tagline: 'Precision. Quality. Verified.' },
              { label: "Exclusive Listings", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.383-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", tagline: 'Precision. Quality. Verified.' },
              { label: "Trusted Network", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", tagline: 'Precision. Quality. Verified.' },
              { label: "Fastest Closures", icon: "M13 10V3L4 14h7v7l9-11h-7z", tagline: 'Precision. Quality. Verified.' }
            ].map((item, i, arr) => (
              <React.Fragment key={i}>
                {/* Card */}
                <div className="flex flex-col text-center items-center justify-center gap-2 px-5 py-3 group flex-shrink-0">
                  <div className="w-14 h-14 mb-4 bg-zinc-50 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-[#FF8A00] group-hover:scale-110 shadow-sm">
                    <svg className="w-7 h-7 text-dark group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon}></path>
                    </svg>
                  </div>
                  <span className="text-dark text-center font-black text-xs lg:text-sm uppercase tracking-tight leading-tight">
                    {item.label}
                  </span>
                  <span className="text-[#555] font-semibold text-xs text-center leading-tight">
                    {item.tagline}
                  </span>
                </div>

                {/* Connector — hidden on last card & on mobile */}
                {i < arr.length - 1 && (
                  <div className="hidden md:flex items-center flex-1 mx-2 relative" aria-hidden="true">
                    {/* Dashed track */}
                    <div className="w-full h-px border-t-2 border-dashed border-zinc-200" />
                    {/* Traveling dot */}
                    <span className="banner-dot absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeBanner;
