import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ringImage from "@/assets/home-img.png";

const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState("title");
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ringRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.set(titleRef.current, { scale: 0.5, opacity: 0 });
    gsap.set(subtitleRef.current, { scale: 0.5, opacity: 0 });
    gsap.set(ringRef.current, { y: "100vh", scale: 0.3, opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 50 });

    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      duration: 1.5,
      scale: 1.2,
      opacity: 1,
      ease: "power3.out",
    })
      .to(titleRef.current, { duration: 0.4, scale: 1, ease: "power2.out" }, "-=0.4")
      .to(subtitleRef.current, { duration: 1.3, scale: 1.1, opacity: 1, ease: "power3.out" }, "-=1.0")
      .to(subtitleRef.current, { duration: 0.4, scale: 1, ease: "power2.out" }, "-=0.4")
      .to(
        titleRef.current,
        {
          duration: 1.8,
          opacity: 0.15,
          scale: 3,
          y: -50,
          z: -100,
          ease: "power2.inOut",
        },
        "+=1.2"
      )
      .to(
        subtitleRef.current,
        {
          duration: 1.8,
          opacity: 0.15,
          scale: 3,
          y: 50,
          z: -100,
          ease: "power2.inOut",
          onComplete: () => setAnimationPhase("image"),
        },
        "-=1.8"
      )
      .to(
        ringRef.current,
        {
          duration: 2.5,
          y: 0,
          opacity: 1,
          scale: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(ringRef.current, {
        duration: 1.5,
        scale: 1,
        ease: "power2.out",
        onComplete: () => setAnimationPhase("content"),
      })
      .to(
        contentRef.current,
        {
          duration: 1.3,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          onComplete: () => setAnimationPhase("complete"),
        },
        "-=0.7"
      );

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
    floatTl.to(ringRef.current, {
      duration: 4,
      y: -8,
      rotation: 3,
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
    <div className="relative w-full h-screen overflow-hidden">
          {/* <div className="relative w-full h-screen overflow-hidden bg-[#434D59]"> */}

      {/* Inject fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Alta:wght@400;700&display=swap');

          .cinzel {
            font-family: 'Cinzel', serif;
          }
          .alta {
            font-family: 'Alta', serif;
          }
        `}
      </style>

      {/* Title Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="alta text-3xl sm:text-5xl md:text-[110px] font-light tracking-wide select-none pointer-events-none text-[#9a8457]"
            style={{
              textShadow: "0 0 40px rgba(255,255,255,0.8)",
              filter: "blur(0.5px)",
              transformOrigin: "center center",
            }}
          >
            NYMARA
          </h1>
          <p
            ref={subtitleRef}
            className="alta text-2xl md:text-3xl font-light text-[#9a8457] tracking-widest uppercase mt-4 select-none pointer-events-none"
            style={{
              textShadow: "0 0 30px rgba(255,255,255,0.8)",
              filter: "blur(0.3px)",
              transformOrigin: "center center",
            }}
          >
            JEWELS
          </p>
        </div>
      </div>

      {/* Ring Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div ref={ringRef} className="ring-container">
          <img
            src={ringImage}
            alt="Nymara Ring"
            className="w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))",
            }}
          />
        </div>
      </div>

      {/* Content Below Ring */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-16">
        <div ref={contentRef} className="max-w-4xl mx-auto px-8 text-center">
          <div className="space-y-6">
            <div className="text-sm font-medium text-[#9a8457] tracking-wider uppercase">
              Made to Order • Lab-Grown Diamonds
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              <span className="cinzel">Where Love Meets</span>
              <span className="cinzel block text-[#AC9362] font-normal">
                Conscious Luxury
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10 pointer-events-none" />
    </div>
  );
};

export default HeroSection;
