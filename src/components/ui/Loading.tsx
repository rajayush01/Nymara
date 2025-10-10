import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type SizeType = 'sm' | 'md' | 'lg';

interface DPSLoadingProps {
	size?: SizeType;
	duration?: number;
	onLoadingComplete?: () => void;
	mode?: 'timed' | 'suspense';
}

const Loading: React.FC<DPSLoadingProps> = ({
	size = 'md',
	duration = 4000,
	onLoadingComplete,
	mode = 'timed',
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const letterRefs = useRef<HTMLSpanElement[]>([]);
	const backgroundRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	const sizeClasses: Record<SizeType, { container: string }> = {
		sm: { container: 'text-4xl md:text-5xl' },
		md: { container: 'text-6xl md:text-7xl lg:text-8xl' },
		lg: { container: 'text-7xl md:text-8xl lg:text-9xl' },
	};

	const currentSize = sizeClasses[size];

	useEffect(() => {
		if (!containerRef.current || !textRef.current) return;

		// Create master timeline
		const masterTL = gsap.timeline({
			onComplete: () => {
				setTimeout(() => {
					onLoadingComplete?.();
				}, 200);
			}
		});

		// Set initial states
		gsap.set(containerRef.current, { opacity: 1 });
		gsap.set(backgroundRef.current, { 
			scale: 0.8, 
			opacity: 0,
			rotation: -5 
		});
		gsap.set(overlayRef.current, { opacity: 0 });

		// Set initial state for letters
		letterRefs.current.forEach((letter, index) => {
			gsap.set(letter, {
				y: 150,
				opacity: 0,
				scale: 0.3,
				rotation: gsap.utils.random(-15, 15),
				transformOrigin: "center center"
			});
		});

		// Background animation
		masterTL.to(backgroundRef.current, {
			scale: 1.2,
			opacity: 0.08,
			rotation: 0,
			duration: 1.5,
			ease: "power2.out"
		}, 0);

		// Letters entrance animation
		masterTL.to(letterRefs.current, {
			y: 0,
			opacity: 1,
			scale: 1,
			rotation: 0,
			duration: 1.2,
			stagger: {
				amount: 0.6,
				from: "start",
				ease: "back.out(1.7)"
			},
			ease: "back.out(1.7)"
		}, 0.5);

		// Text glow and pulse effect
		masterTL.to(textRef.current, {
			textShadow: "0 0 20px rgba(12, 17, 94, 0.6), 0 0 40px rgba(12, 17, 94, 0.4), 0 0 60px rgba(12, 17, 94, 0.2)",
			duration: 0.8,
			ease: "power2.inOut"
		}, 2.0)
		.to(textRef.current, {
			scale: 1.05,
			duration: 0.4,
			ease: "power2.inOut",
			yoyo: true,
			repeat: 1
		}, 2.2);

		// Hold the text for a moment
		masterTL.to({}, { duration: 0.8 }, 2.8);

		// Exit animation sequence
		masterTL.to(overlayRef.current, {
			opacity: 0.3,
			duration: 0.6,
			ease: "power2.inOut"
		}, 3.6)
		.to(letterRefs.current, {
			y: -100,
			opacity: 0,
			scale: 0.8,
			rotation: (index) => gsap.utils.random(-20, 20),
			duration: 0.8,
			stagger: {
				amount: 0.3,
				from: "end",
				ease: "power2.in"
			},
			ease: "power2.in"
		}, 3.6)
		.to(backgroundRef.current, {
			scale: 1.5,
			opacity: 0,
			duration: 0.8,
			ease: "power2.in"
		}, 3.8)
		.to(containerRef.current, {
			opacity: 0,
			duration: 0.4,
			ease: "power2.inOut"
		}, 4.2);

		return () => {
			masterTL.kill();
		};
	}, [duration, onLoadingComplete, mode]);

	// Create letter refs
	const createLetterRefs = (text: string) => {
		letterRefs.current = [];
		return text.split('').map((letter, index) => (
			<span
				key={index}
				ref={(el) => el && (letterRefs.current[index] = el)}
				className="inline-block"
				style={{ 
					marginRight: letter === ' ' ? '0.3em' : '0',
					color: '#0C115E'
				}}
			>
				{letter === ' ' ? '\u00A0' : letter}
			</span>
		));
	};

	return (
		<div 
			ref={containerRef}
			className="fixed inset-0 w-full h-full bg-white flex items-center justify-center overflow-hidden z-50"
		>
			{/* Animated Background Elements */}
			<div
				ref={backgroundRef}
				className="absolute inset-0 pointer-events-none"
				style={{
					background: `
						radial-gradient(circle at 30% 20%, rgba(12, 17, 94, 0.03) 0%, transparent 50%),
						radial-gradient(circle at 70% 80%, rgba(76, 90, 163, 0.02) 0%, transparent 50%),
						radial-gradient(circle at 50% 50%, rgba(12, 17, 94, 0.01) 0%, transparent 70%)
					`,
				}}
			/>

			{/* Subtle overlay for exit transition */}
			<div
				ref={overlayRef}
				className="absolute inset-0 bg-white pointer-events-none"
			/>

			{/* Main Content Container */}
			<div className="relative z-10 flex flex-col items-center justify-center">
				{/* Main Text Animation */}
				<div
					ref={textRef}
					className={`${currentSize.container} font-bold tracking-wider relative select-none`}
					style={{
						fontFamily: '"Playfair Display", "Georgia", serif',
						textShadow: '0 2px 4px rgba(12, 17, 94, 0.1)',
						letterSpacing: '0.1em'
					}}
				>
					{createLetterRefs('Nymara')}
				</div>

				{/* Subtle underline decoration */}
				<div
					className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-blue-900 to-transparent opacity-0"
					style={{ width: '200px' }}
					ref={(el) => {
						if (el) {
							gsap.set(el, { scaleX: 0, opacity: 0 });
							gsap.to(el, {
								scaleX: 1,
								opacity: 0.3,
								duration: 1.2,
								ease: "power2.out",
								delay: 2.0
							});
							gsap.to(el, {
								opacity: 0,
								duration: 0.6,
								ease: "power2.in",
								delay: 3.6
							});
						}
					}}
				/>
			</div>

			{/* Ambient floating elements */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{[...Array(12)].map((_, i) => (
					<div
						key={i}
						className="absolute rounded-full opacity-0"
						style={{
							width: `${Math.random() * 4 + 2}px`,
							height: `${Math.random() * 4 + 2}px`,
							backgroundColor: '#0C115E',
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						ref={(el) => {
							if (el) {
								gsap.set(el, { 
									opacity: 0, 
									scale: 0,
									y: 50 
								});
								gsap.to(el, {
									opacity: Math.random() * 0.3 + 0.1,
									scale: 1,
									y: -50,
									duration: Math.random() * 3 + 2,
									delay: Math.random() * 2,
									ease: "none",
									repeat: -1,
									yoyo: true
								});
							}
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default Loading;