import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ringImage from "@/assets/home2.png"; 

const HeroSection = () => {

  const [animationPhase, setAnimationPhase] = useState("title"); 
  
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ringRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // 1. Initial GSAP Setup (Setting the starting styles)
    // This prevents a flash of unstyled content and sets the animation start points.
    gsap.set(titleRef.current, { scale: 0.5, opacity: 0 });
    gsap.set(subtitleRef.current, { scale: 0.5, opacity: 0 });
    // Starts the ring far down the screen
    gsap.set(ringRef.current, { y: "100vh", scale: 0.3, opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 50 });

    // 2. Main Animation Timeline
    const tl = gsap.timeline();

    // --- Phase 1: Title and Subtitle Introduction (Scale-up) ---
    tl.to(titleRef.current, {
      duration: 1.5,
      scale: 1.2,
      opacity: 1,
      ease: "power3.out",
    })
      .to(titleRef.current, { duration: 0.4, scale: 1, ease: "power2.out" }, "-=0.4")
      .to(subtitleRef.current, { duration: 1.3, scale: 1.1, opacity: 1, ease: "power3.out" }, "-=1.0")
      .to(subtitleRef.current, { duration: 0.4, scale: 1, ease: "power2.out" }, "-=0.4")

    // --- Phase 2: Title and Subtitle Exit (Scale-out and Fade) ---
      .to(
        titleRef.current,
        {
          duration: 1.8,
          opacity: 0.15,
          scale: 2.5,
          y: -30,
          ease: "power2.inOut",
        },
        "+=1.2" // Wait 1.2s after the previous step
      )
      .to(
        subtitleRef.current,
        {
          duration: 1.8,
          opacity: 0.15,
          scale: 2.5,
          y: 30,
          ease: "power2.inOut",
          onComplete: () => setAnimationPhase("image"), // Update state
        },
        // Starts at the same time as the title exit
        "-=1.8" 
      )
    // --- Phase 3: Ring Introduction (Move up and scale) ---
      .to(
        ringRef.current,
        {
          duration: 2.5,
          y: 0, // Moves the ring to its final vertical position
          opacity: 1,
          scale: 0.8,
          ease: "power3.out",
        },
        // Starts slightly before the title/subtitle exit ends
        "-=0.3" 
      )
      .to(ringRef.current, {
        duration: 1.5,
        scale: 1, // Final, subtle scale-up
        ease: "power2.out",
        onComplete: () => setAnimationPhase("content"), // Update state
      })
    // --- Phase 4: Content Introduction (Fade up from below) ---
      .to(
        contentRef.current,
        {
          duration: 1.3,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          onComplete: () => setAnimationPhase("complete"), // Update state
        },
        // Starts before the ring's final scale is complete
        "-=0.7" 
      );

    // 3. Floating Animation Timeline (runs in parallel after the main TL)
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
    floatTl.to(ringRef.current, {
      duration: 4,
      y: -8, // Subtle vertical float
      rotation: 3, // Subtle rotation
      scale: 1.01, // Subtle scale change
      ease: "sine.inOut",
    });

    // 4. Start the floating animation once the main timeline is complete
    tl.call(() => {
      floatTl.play();
    });

    // 5. Cleanup function
    return () => {
      tl.kill();
      floatTl.kill();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center px-4 md:px-8 bg-white -mt-20 sm:mt-0">
      {/* NOTE: Embedding @import style like this is generally discouraged in React/Next.js 
        and should ideally be handled by a global stylesheet or a tool like 'next/font'.
        However, for a quick functional example, this works. 
      */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;700&display=swap');
          
          /* Using a common font that resembles 'Alta' for demonstration */
          .cinzel { font-family: 'Cinzel', serif; }
          .alta { font-family: 'Cormorant Garamond', serif; } 
          
          /* Fix for a common GSAP issue with Tailwind: preventing a flicker on 'scale' transitions */
          .ring-container { transform-style: preserve-3d; }
        `}
      </style>

      {/* --- Title Animation Layer (Highest Z-index during its run) --- */}
      <div className="absolute inset-0 flex items-center justify-center z-5 pt-10 md:pt-16">
        <div className="text-center px-3 md:px-6 md:mt-10">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="alta text-4xl sm:text-7xl md:text-[110px] font-light tracking-wide select-none pointer-events-none text-[#9a8457] leading-none"
            style={{
              // Custom glow/blur effect
              textShadow: "0 0 40px rgba(255,255,255,0.8)",
              filter: "blur(0.5px)",
              transformOrigin: "center center",
              marginBottom: "0.25em",
            }}
          >
            NYMARA
          </h1>
          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="alta text-2xl sm:text-2xl md:text-3xl font-light text-[#9a8457] tracking-widest uppercase mt-2 md:mt-4 select-none pointer-events-none"
            style={{
              // Custom glow/blur effect
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

      {/* --- Ring/Image Animation Layer --- */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div ref={ringRef} className="ring-container">
          <img
            src={ringImage}
            alt="Nymara Ring"
            className="w-60 h-60 sm:w-72 sm:h-72 md:w-[600px] md:h-[600px] object-contain mt-40"
            // style={{
            //   // A drop shadow for a floating effect
            //   filter: "drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))",
            // }}
          />
        </div>
      </div>

      {/* --- Content Below Ring Layer (Appears last) --- */}
      {/* Positioned using 'top: 76%' to place it lower on the screen */}
      <div className="absolute left-0 right-0 z-20" style={{ top: "76%" }}>
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <div className="space-y-6">
            {/* Tagline */}
            <div className="text-xs sm:text-sm font-medium text-[#9a8457] tracking-wider uppercase">
              Lab-Grown Luxury • Crafted with Purpose
            </div>
            {/* Main Content Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              <span className="cinzel">Where Love Meets</span>
              <span className="cinzel block text-[#AC9362] font-normal mt-3 sm:mt-4">
                Conscious Luxury
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* --- Visual Enhancement: Gradient Overlay --- */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/10 pointer-events-none" />
    </div>
  );
};

export default HeroSection;