"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const DeveloperLogos = () => {
  const developers = [
    { name: "DLF", logo: "/dev/1.png" },
    { name: "Godrej", logo: "/dev/2.png" },
    { name: "Lodha", logo: "/dev/3.png" },
    { name: "Tata Housing", logo: "/dev/4.png" },
    { name: "Shapoorji Pallonji", logo: "/dev/5.png" },
    { name: "Prestige", logo: "/dev/6.png" },
    { name: "Sobha", logo: "/dev/7.png" },
    { name: "Oberoi Realty", logo: "/dev/8.png" },
    { name: "Oberoi Realty", logo: "/dev/9.png" },
    { name: "Oberoi Realty", logo: "/dev/10.png" },
    { name: "Oberoi Realty", logo: "/dev/11.png" },
    { name: "Oberoi Realty", logo: "/dev/12.png" },
    { name: "Oberoi Realty", logo: "/dev/13.png" },
    { name: "Oberoi Realty", logo: "/dev/14.jpg" },
  ];

  return (
    <section className="p-l-r bg-[#fff] bottom  overflow-hidden">
      <div className="container-max">
        <div className="flex flex-col gap-small  text-center mb-10 ">
          <span className="luxury-reveal eyebrow-gold text-center" style={{ width: 'fit-content', margin: 'auto' }}>Our Partners</span>
          <h2 className="title-reveal-large">
            Curated Collaboration & <br />
            <span className="gradent_text_color">Unmatched Quality</span>
          </h2>
        </div>

        <div className="relative">
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />

          <Swiper
            modules={[Autoplay, FreeMode]}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={5000}
            slidesPerView={2}
            spaceBetween={50}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 80 },
              1024: { slidesPerView: 5, spaceBetween: 100 },
            }}
            className="logo-swiper"
          >
            {developers.map((dev, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center py-4">
                <div className="w-full h-12 relative group transition-all duration-700 flex items-center justify-center">
                  <img
                    src={dev.logo}
                    alt={dev.name}
                    className="object-contain opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </SwiperSlide>
            ))}
            {/* Duplicate for smoother loop if needed, but Swiper loop:true handles it */}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default DeveloperLogos;
