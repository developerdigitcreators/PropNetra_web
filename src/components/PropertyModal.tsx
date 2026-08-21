'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './PropertyModal.css';

const PropertyModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    const images = [
        '/images/modal-property.png',
        '/images/login-bg.png',
        '/images/login-full-bg.png',
        '/images/login-grid-2.png'
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isVisible && modalRef.current) {
            const tl = gsap.timeline();

            // Set initial 3D state
            gsap.set(overlayRef.current, { opacity: 0 });
            gsap.set(modalRef.current, {
                rotateX: 90,
                rotateY: 20,
                z: -500,
                opacity: 0,
                transformOrigin: "center center -150px"
            });

            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            })
                .to(modalRef.current, {
                    rotateX: 0,
                    rotateY: 0,
                    z: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'expo.out'
                }, '-=0.4');
        }
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                nextImage();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isVisible, currentIndex]);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const closeModal = () => {
        const tl = gsap.timeline({
            onComplete: () => setIsVisible(false)
        });

        tl.to(modalRef.current, {
            rotateX: -90,
            rotateY: -20,
            z: -500,
            opacity: 0,
            duration: 0.8,
            ease: 'expo.in'
        })
            .to(overlayRef.current, {
                opacity: 0,
                duration: 0.5
            }, '-=0.5');
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay" ref={overlayRef} onClick={closeModal}>
            <div className="modal-container" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeModal}>×</button>

                <div className="modal-content-wrapper">
                    {/* <div className="image-badge">Luxury Collections</div> */}

                    <div className="modal-slider">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`slider-image-container ${index === currentIndex ? 'active' : ''}`}
                            >
                                <img src={img} alt={`Property ${index + 1}`} className="modal-image" />
                            </div>
                        ))}
                    </div>

                    <div className="slider-nav">
                        <button className="nav-btn" onClick={prevImage}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button className="nav-btn" onClick={nextImage}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    <div className="slider-controls">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyModal;
