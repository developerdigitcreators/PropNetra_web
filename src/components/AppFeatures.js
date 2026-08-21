"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const AppFeatures = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".heading, .headingBox .span", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".headingBox",
          start: "top 80%",
        }
      });

      // Phone animations
      gsap.from(".front", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".centerPhone",
          start: "top 70%",
        }
      });

      gsap.from(".back", {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".centerPhone",
          start: "top 70%",
        }
      });

      // Feature boxes reveal
      const infoBoxes = gsap.utils.toArray(".appInfoBox");
      infoBoxes.forEach((box, i) => {
        const side = box.closest(".circle").classList.contains("one") ||
          box.closest(".circle").classList.contains("three") ||
          box.closest(".circle").classList.contains("five") ? -50 : 50;

        gsap.from(box, {
          x: side,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
          }
        });
      });

      // Curve arrows reveal
      gsap.from(".arrowimg", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".centerPhone",
          start: "top 60%",
        }
      });

      // Flip-down animation for Get App Box
      gsap.from(".getAppBox", {
        rotateX: -110,
        opacity: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".getAppBox",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="pt-0 bottom secondBox relative p-l-r">
      <div className="partical line absolute pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 251 38">
          <path fill="none" stroke="#ebebeb" strokeWidth="2" strokeMiterlimit="10" d="M0,9C17.93,9,17.93,29,35.85,29S53.78,9,71.71,9s17.92,20,35.85,20S125.49,9,143.42,9s17.93,20,35.86,20S197.21,9,215.14,9,233.07,29,251,29"></path>
        </svg>
      </div>
      <div className="headingBox flex flex-col gap-small  text-center mb-0 ">
        <span className="luxury-reveal eyebrow-gold text-center" style={{ width: 'fit-content', margin: 'auto' }}>Awesome Highlights</span>
        <h2 className="title-reveal-large">
          App <span className="gradent_text_color">Features</span>
        </h2>
      </div>



      <div className="appFeatureBox container-max">
        <div className="centerPhoneBox">
          <div className="centerPhone">
            <div className="centerPhoneFix">
              <div className="front">
                <Image src="/images/front.png" alt="Phone Front" width={300} height={600} className="img-responsive" priority />
              </div>
              <div className="back">
                <Image src="/images/back.png" alt="Phone Back" width={260} height={520} className="img-responsive" />
              </div>
              <div className="wheel-container">
                <Image src="/images/phone-wheel.svg" alt="Wheel" width={530} height={530} className="img-responsive wheel" />
              </div>
            </div>

            {/* Feature 1 */}
            <div className="circle one">
              <i>
                <div className="appInfoBox">
                  <figure>
                    <Image src="/images/listings-lead.svg" alt="Icon" width={40} height={40} />
                  </figure>
                  <strong>Unlimited Listings</strong>
                  <p>Stand Out from the Crowd with No Listing Limits</p>
                </div>
              </i>
              <Image className="arrowimg" src="/images/left-curve-up.svg" alt="curve" width={100} height={100} />
            </div>

            {/* Feature 2 */}
            <div className="circle two">
              <Image className="arrowimg" src="/images/right-curve-up.svg" alt="curve" width={100} height={100} />
              <i>
                <div className="appInfoBox">
                  <figure>
                    <Image src="/images/schedule.svg" alt="Icon" width={40} height={40} />
                  </figure>
                  <strong>Instant Notification Chatbot</strong>
                  <p>Stay Ahead of the Competition with Real-Time Market Alerts</p>
                </div>
              </i>
            </div>

            {/* Feature 3 */}
            <div className="circle three">
              <i>
                <div className="appInfoBox">
                  <figure>
                    <Image src="/images/list-view.svg" alt="Icon" width={40} height={40} />
                  </figure>
                  <strong>Smart AI Matching</strong>
                  <p>Receive High-Value Leads Tailored to Your Preferences</p>
                </div>
              </i>
              <Image className="arrowimg" src="/images/left-curve-center.svg" alt="curve" width={100} height={100} />
            </div>

            {/* Feature 4 */}
            <div className="circle four">
              <Image className="arrowimg" src="/images/right-curve-center.svg" alt="curve" width={100} height={100} />
              <i>
                <div className="appInfoBox">
                  <figure>
                    <Image src="/images/home-loan.svg" alt="Icon" width={40} height={40} />
                  </figure>
                  <strong>Team Attendance</strong>
                  <p>Streamline Team Management with Attendance Tracking Features</p>
                </div>
              </i>
            </div>

            {/* Feature 5 */}
            <div className="circle five">
              <i>
                <div className="appInfoBox">
                  <figure>
                    <Image src="/images/claim-lead.svg" alt="Icon" width={40} height={40} />
                  </figure>
                  <strong>Team Attendance</strong>
                  <p>Streamline Team Management with Attendance Tracking Features</p>
                </div>
              </i>
              <Image className="arrowimg" src="/images/left-curve-down.svg" alt="curve" width={100} height={100} />
            </div>

            {/* Feature 6 */}
            <div className="circle six">
              <Image className="arrowimg" src="/images/right-curve-down.svg" alt="curve" width={100} height={100} />
              <i>
                <div className="appInfoBox">
                  <figure>
                    <Image src="/images/social-select.svg" alt="Icon" width={40} height={40} />
                  </figure>
                  <strong>Mandate Deals</strong>
                  <p>Maximize Your Income with Lucrative Deals</p>
                </div>
              </i>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Download App Section */}


      <div className="container-max mt-10 max-[1440px]:mt-0" style={{ position: 'relative' }}>
        <div className="partical pEight"><img className="img-responsive lazy" data-src="/icon-11.svg" alt="" src="/icon-11.svg" /></div>
        <div className="getAppBox">

          <figure className="curvePhone">
            <Image src="/mobile-curve.png" alt="Mobile Curve" width={230} height={184} className="img-responsive desktop" />
            <Image src="/icon-11.svg" alt="Mobile Curve Mobile" width={150} height={120} className="img-responsive mobile" />
          </figure>
          <div className="getAppRegister flex-1">
            <h3 className="span text-white text-3xl mb-6 font-medium">
              Get The App <strong className="font-bold">Register Now!</strong>
            </h3>
            <div className="downloadApp flex items-center p-1.5 w-full max-w-[550px]">
              <div className="flex flex-wrap items-center gap-4 relative z-10">
                {/* iOS Button */}
                <a
                  href="#"
                  className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl transition-all duration-300 border border-white/10 group shadow-lg"
                >
                  <svg className="w-8 h-8 group-hover:scale-110 transition-transform" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-83.6-20.2-41.2.6-86.4 25.6-112.5 73.1-41.8 74.3-10.7 185.1 29 242.9 19.3 27.9 45.4 58.9 76 58.7 29.8-.2 41-18.3 77.2-18.3s46.2 18.3 77.8 18.1c31.6-.2 54.4-27.9 73.5-56 22.3-32.1 31.4-63.3 31.7-64.9-.7-.2-61.1-23.4-61.3-92.4zM286.9 104.2c16-19.3 26.8-46.1 23.8-73-23.1 1-51.1 15.5-67.7 35.1-14.8 17.5-27.8 44.9-24.3 71 25.6 2 52.3-13.8 68.2-33.1z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] font-bold uppercase opacity-60 mb-1">Download for</span>
                    <span className="text-lg font-bold">iOS</span>
                  </div>
                </a>

                {/* Android Button */}
                <a
                  href="#"
                  className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl transition-all duration-300 border border-white/10 group shadow-lg"
                >
                  <svg className="w-8 h-8 group-hover:scale-110 transition-transform" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.7 60.7L104.6 499z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] font-bold uppercase opacity-60 mb-1">Download for</span>
                    <span className="text-lg font-bold">Android</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="qrCodeBox hidden md:flex items-center gap-4  p-4 rounded-2xl ">
            <div className="qrCode bg-white p-2 rounded-lg">
              <Image src="/qr-code.svg" alt="qr-code" width={80} height={80} />
            </div>
            <div className="qrText text-white">
              <span className="text-sm opacity-70 block mb-1">Scan QR code</span>
              <strong className="text-md leading-tight block">DOWNLOAD<br />APP</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
