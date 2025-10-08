import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ringImage from "@/assets/home-img.png";

const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState("title");
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;

    gsap.set(titleRef.current, { scale: 0.5, opacity: 0 });
    gsap.set(subtitleRef.current, { scale: 0.5, opacity: 0 });
    gsap.set(ringRef.current, { y: "80vh", scale: 0.3, opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 40 });

    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      duration: 1.2,
      scale: 1.1,
      opacity: 1,
      ease: "power3.out",
    })
      .to(titleRef.current, { duration: 0.3, scale: 1, ease: "power2.out" }, "-=0.4")
      .to(subtitleRef.current, {
        duration: 1.1,
        scale: 1.05,
        opacity: 1,
        ease: "power3.out",
      }, "-=0.8")
      .to(subtitleRef.current, { duration: 0.3, scale: 1, ease: "power2.out" }, "-=0.4")
      .to(
        titleRef.current,
        {
          duration: 1.5,
          opacity: 0.15,
          scale: isMobile ? 1.8 : 2.3,
          y: isMobile ? -10 : -30,
          ease: "power2.inOut",
        },
        "+=0.8"
      )
      .to(
        subtitleRef.current,
        {
          duration: 1.5,
          opacity: 0.15,
          scale: isMobile ? 1.8 : 2.3,
          y: isMobile ? 10 : 30,
          ease: "power2.inOut",
          onComplete: () => setAnimationPhase("image"),
        },
        "-=1.5"
      )
      .to(
        ringRef.current,
        {
          duration: 2,
          y: 0,
          opacity: 1,
          scale: isMobile ? 0.9 : 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(ringRef.current, {
        duration: 1,
        scale: isMobile ? 1 : 1.05,
        ease: "power2.out",
        onComplete: () => setAnimationPhase("content"),
      })
      .to(
        contentRef.current,
        {
          duration: 1.1,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          onComplete: () => setAnimationPhase("complete"),
        },
        "-=0.6"
      );

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
    floatTl.to(ringRef.current, {
      duration: 4,
      y: -6,
      rotation: 2,
      scale: 1.01,
      ease: "sine.inOut",
    });

    tl.call(() => {
      floatTl.play();
    });

    return () => {
      tl.kill();
      floatTl.kill();
    };
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden flex flex-col justify-center items-center px-3 sm:px-6">
      {/* Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Alta:wght@400;700&display=swap');
          .cinzel { font-family: 'Cinzel', serif; }
          .alta { font-family: 'Alta', serif; }
        `}
      </style>

      {/* Title & Subtitle */}
      <div className="absolute inset-0 flex items-center justify-center pt-12 sm:pt-16 md:pt-24 z-5">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="alta text-[36px] sm:text-[72px] md:text-[110px] font-light tracking-wide select-none text-[#9a8457]"
            style={{
              textShadow: "0 0 40px rgba(255,255,255,0.8)",
              filter: "blur(0.5px)",
              transformOrigin: "center center",
              marginBottom: "0.25em",
            }}
          >
            NYMARA
          </h1>
          <p
            ref={subtitleRef}
            className="alta text-lg sm:text-2xl md:text-3xl font-light text-[#9a8457] tracking-widest uppercase select-none"
            style={{
              textShadow: "0 0 30px rgba(255,255,255,0.8)",
              filter: "blur(0.3px)",
              transformOrigin: "center center",
              letterSpacing: "0.15em",
            }}
          >
            JEWELS
          </p>
        </div>
      </div>

      {/* Ring Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div ref={ringRef}>
          <img
            src={ringImage}
            alt="Nymara Ring"
            className="w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))",
            }}
          />
        </div>
      </div>

      {/* Content Below */}
      <div
        className="absolute left-0 right-0 z-20 px-4 sm:px-6"
        style={{ top: "72%" }}
      >
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-[#9a8457] tracking-wider uppercase">
              Made to Order • Lab-Grown Diamonds
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              <span className="cinzel">Where Love Meets</span>
              <span className="cinzel block text-[#AC9362] font-normal mt-2 sm:mt-3">
                Conscious Luxury
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/10 pointer-events-none" />
    </div>
  );
};

export default HeroSection;
