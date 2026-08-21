"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);

  const testimonials = [
    {
      name: "Rajesh Malhotra",
      role: "Property Investor",
      text: "Propnetra has completely transformed how I manage my real estate portfolio. The verified listings and seamless connections have saved me months of research.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      rating: 5
    },
    {
      name: "Anjali Sharma",
      role: "Real Estate Agent",
      text: "As an agent, trust is everything. The 'Verified Builder' badge on Propnetra gives my clients the confidence they need to close deals faster.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "First-time Homebuyer",
      text: "The platform's interface is incredibly intuitive. I found my dream home and secured a loan through their partner network in record time.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      rating: 4
    },
    {
      name: "Rajesh Malhotra",
      role: "Property Investor",
      text: "Propnetra has completely transformed how I manage my real estate portfolio. The verified listings and seamless connections have saved me months of research.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      rating: 5
    },
    {
      name: "Anjali Sharma",
      role: "Real Estate Agent",
      text: "As an agent, trust is everything. The 'Verified Builder' badge on Propnetra gives my clients the confidence they need to close deals faster.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "First-time Homebuyer",
      text: "The platform's interface is incredibly intuitive. I found my dream home and secured a loan through their partner network in record time.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      rating: 4
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-header",
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="top bottom bg-white relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02]">
        <h2 className="text-[20vw] font-black uppercase whitespace-nowrap">PropNetra</h2>
      </div>

      <div className="container-max px-8 relative z-10">
        <div className="flex flex-col gap-small mb-10 text-center">
          <div className="luxury-reveal eyebrow-gold" style={{ width: 'fit-content', margin: 'auto' }}>Voices of Success</div>
          <h2 className="luxury-reveal title-reveal-large text-dark leading-[0.9] lowercase first-letter:uppercase">
            What Our <span className="gradent_text_color">Clients Say</span>
          </h2>
        </div>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            grabCursor={true}
            loop={true}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="testimonial-swiper "
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#fcfcfd] border border-zinc-100 p-10 rounded-[10px] max-[1440px]:p-5 h-full flex flex-col justify-between group hover:bg-black transition-all duration-700 relative overflow-hidden">
                  {/* Decorative Quote Icon */}
                  <div className="absolute top-10 right-10 opacity-[0.05] group-hover:opacity-20 transition-opacity">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.01703 8.44772 5.01703 9V12C5.01703 12.5523 4.56931 13 4.01703 13H2.01703V21H5.017Z" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < item.rating ? 'text-orange-500' : 'text-zinc-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-zinc-500 text-[20px] max-[1440px]:text-[14px] leading-relaxed group-hover:text-zinc-300 transition-colors duration-500 mb-10 font-medium">
                      "{item.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-8 max-[1440px]:pt-4 border-t border-zinc-100 group-hover:border-zinc-800 transition-colors duration-500">
                    <div className="w-14 h-14 max-[1440px]:w-10 max-[1440px]:h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-dark font-black uppercase text-sm group-hover:text-white transition-colors duration-500 tracking-tight">{item.name}</h4>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{item.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          {/* <div className="flex items-center justify-center gap-10 mt-4">
            <button className="swiper-button-prev-custom w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center text-dark hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="custom-pagination !w-auto flex gap-2"></div>
            <button className="swiper-button-next-custom w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center text-dark hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
