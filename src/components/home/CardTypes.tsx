import React, { useState, useEffect } from 'react';
import { motion, TargetAndTransition, VariantLabels, Variants } from 'framer-motion';
import p1 from '@/assets/ring1.jpg';
import p2 from '@/assets/ring2.jpg';
import p3 from '@/assets/ring3.jpg';
import p5 from '@/assets/ring4.jpg';
import p4 from '@/assets/home1.png';

interface Product {
	_id: string;
	name: string;
	productId: string;
	description: string;
	price: number;
	originalPrice?: number;
	onSale?: boolean;
	salePercentage?: number;
	isOutOfStock?: boolean;
	coverImage: string;
	images?: string[];

	category: string;
	rating?: number;
	url?: string;
}

interface CardConfig {
	x: string | number;
	y: string | number;
	rotate: number;
	rotateY?: number;
	scale: number;
	zIndex: number;
	width: string;
	height: string;
	marginTop?: string;
	opacity?: number;
}

interface ImageDimensions {
	width: number;
	height: number;
}

// Hardcoded product data
const HARDCODED_PRODUCTS: Product[] = [
  {
    _id: '1',
    name: 'Elegant Diamond Solitaire Ring',
    productId: 'RING001',
    description: 'A timeless symbol of love and elegance. This stunning solitaire features a brilliant-cut diamond set in 18K white gold.',
    price: 45999,
    originalPrice: 52999,
    onSale: true,
    isOutOfStock: false,
    coverImage: p1,
    category: 'Rings',
    rating: 4.8,
    url: '/products',
  },
  {
    _id: '2',
    name: 'Rose Gold Tennis Bracelet',
    productId: 'BRAC001',
    description: 'Sophisticated sparkle for every occasion. Adorned with precision-set cubic zirconia stones in lustrous rose gold.',
    price: 12999,
    originalPrice: 15999,
    onSale: true,
    isOutOfStock: false,
    coverImage: p2,
    category: 'Bracelets',
    rating: 4.7,
    url: '/products',
  },
  {
    _id: '3',
    name: 'Sterling Silver Wheat Chain',
    productId: 'CHAIN001',
    description: 'Classic elegance meets modern craftsmanship. This versatile chain complements any pendant or stands beautifully alone.',
    price: 8999,
    originalPrice: 11999,
    isOutOfStock: false,
    coverImage: p3,
    category: 'Chains',
    rating: 4.5,
    url: '/products',
  },
  {
    _id: '4',
    name: 'Vintage Emerald Cocktail Ring',
    productId: 'RING002',
    description: 'Make a bold statement with this exquisite piece. A vibrant emerald surrounded by delicate filigree work in yellow gold.',
    price: 38999,
    originalPrice: 42999,
    onSale: true,
    isOutOfStock: false,
    coverImage: p4,
    category: 'Rings',
    rating: 4.9,
    url: '/products',
  },
  {
    _id: '5',
    name: 'Minimalist Bangle Set',
    productId: 'BRAC002',
    description: 'Understated luxury for the modern woman. Three sleek bangles in mixed metals that stack beautifully together.',
    price: 6999,
    originalPrice: 9499,
    isOutOfStock: false,
    coverImage: p5,
    category: 'Bracelets',
    rating: 4.6,
    url: '/products',
  },
];

// Mobile and desktop configurations
const CARD_WIDTH_DESKTOP = 350;
const CARD_HEIGHT_DESKTOP = 520;
const CARD_WIDTH_MOBILE = 200;
const CARD_HEIGHT_MOBILE = 300;

// Function to get responsive card dimensions
const getCardDimensions = () => {
	const isMobile = window.innerWidth < 768;
	return {
		width: isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP,
		height: isMobile ? CARD_HEIGHT_MOBILE : CARD_HEIGHT_DESKTOP,
	};
};

// Function to create slot configuration based on screen size
const createSlotConfig = (cardWidth: number, cardHeight: number): CardConfig[] => {
	const isMobile = window.innerWidth < 768;
	const leftMultiplier1 = isMobile ? -1.4 : -2.1;
	const leftMultiplier2 = isMobile ? -0.7 : -1.05;
	const rightMultiplier1 = isMobile ? 0.7 : 1.05;
	const rightMultiplier2 = isMobile ? 1.4 : 2.1;

	return [
		{
			x: cardWidth * leftMultiplier1,
			y: isMobile ? -15 : -25,
			width: `${cardWidth - (isMobile ? 20 : 40)}px`,
			rotate: 0,
			rotateY: isMobile ? 15 : 20,
			scale: isMobile ? 0.8 : 0.75,
			zIndex: 10,
			height: `${cardHeight - (isMobile ? 30 : 60)}px`,
			marginTop: isMobile ? '15px' : '25px',
		},
		{
			x: cardWidth * leftMultiplier2,
			y: isMobile ? 10 : 15,
			width: `${cardWidth - (isMobile ? 15 : 25)}px`,
			rotate: 0,
			rotateY: isMobile ? 20 : 25,
			scale: isMobile ? 0.9 : 0.85,
			zIndex: 15,
			height: `${cardHeight - (isMobile ? 20 : 40)}px`,
			marginTop: isMobile ? '10px' : '15px',
		},
		{
			x: 0,
			y: isMobile ? 30 : 50,
			width: `${cardWidth}px`,
			height: `${cardHeight}px`,
			rotate: 0,
			rotateY: 0,
			scale: 1,
			zIndex: 20,
			marginTop: '0px',
		},
		{
			x: cardWidth * rightMultiplier1,
			y: isMobile ? 10 : 15,
			width: `${cardWidth - (isMobile ? 15 : 25)}px`,
			rotate: 0,
			rotateY: isMobile ? -20 : -25,
			scale: isMobile ? 0.9 : 0.85,
			zIndex: 15,
			height: `${cardHeight - (isMobile ? 20 : 40)}px`,
			marginTop: isMobile ? '10px' : '15px',
		},
		{
			x: cardWidth * rightMultiplier2,
			y: isMobile ? -15 : -25,
			width: `${cardWidth - (isMobile ? 20 : 40)}px`,
			rotate: 0,
			rotateY: isMobile ? -15 : -20,
			scale: isMobile ? 0.8 : 0.75,
			zIndex: 10,
			height: `${cardHeight - (isMobile ? 30 : 60)}px`,
			marginTop: isMobile ? '15px' : '25px',
		},
	];
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 170 },
	centerIntro: {
		opacity: 1,
		y: 0,
		transition: { duration: 1.2, ease: 'easeOut' },
	},
	spreadOut: (custom: CardConfig & { delay?: number }) => ({
		x: custom.x,
		y: custom.y,
		rotateY: custom.rotateY,
		scale: custom.scale,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 20,
			when: 'beforeChildren',
			delay: custom.delay || 0,
		},
	}),
	carousel: (custom: CardConfig) => ({
		x: custom.x,
		y: custom.y,
		rotate: custom.rotate,
		rotateY: custom.rotateY || 0,
		scale: custom.scale,
		opacity: 1,
		transition: { type: 'spring', stiffness: 100, damping: 20 },
	}),
	still: { x: 0, transition: { duration: 0 } },
};

export const ImageFanDynamic = () => {
	const [products] = useState<Product[]>(HARDCODED_PRODUCTS);
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [animationPhase, setAnimationPhase] = useState<
		'initial' | 'spread' | 'carousel' | 'revealSecond' | 'centerIntro'
	>('initial');
	const [showWhiteBg, setShowWhiteBg] = useState(false);
	const [spreadComplete, setSpreadComplete] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [imageDimensions, setImageDimensions] = useState<{ [key: string]: ImageDimensions }>({});

	// Initialize slotConfig with default values to prevent undefined errors
	const [slotConfig, setSlotConfig] = useState<CardConfig[]>(() => {
		const { width, height } = getCardDimensions();
		return createSlotConfig(width, height);
	});


	// Check if mobile on mount and resize - this should be first
	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);

			// Update slot config when screen size changes
			const { width, height } = getCardDimensions();
			setSlotConfig(createSlotConfig(width, height));
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Function to get image dimensions
	const getImageDimensions = (imageSrc: string, productId: string): Promise<ImageDimensions> => {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				const dimensions = { width: img.naturalWidth, height: img.naturalHeight };
				setImageDimensions((prev) => ({ ...prev, [productId]: dimensions }));
				resolve(dimensions);
			};
			img.onerror = () => {
				const { width } = getCardDimensions();
				const fallbackDimensions = { width, height: 400 };
				setImageDimensions((prev) => ({ ...prev, [productId]: fallbackDimensions }));
				resolve(fallbackDimensions);
			};
			img.src = imageSrc;
		});
	};

	// Load image dimensions for all products
	useEffect(() => {
		if (products.length > 0) {
			const loadAllImageDimensions = async () => {
				const dimensionPromises = products.map((product) =>
					getImageDimensions(product.coverImage, product._id),
				);
				await Promise.all(dimensionPromises);
			};
			loadAllImageDimensions();
		}
	}, [products]);

	// Animation sequence - start immediately with hardcoded data
	useEffect(() => {
		setAnimationPhase('initial');

		const centerTimer = setTimeout(() => {
			const spreadTimer = setTimeout(() => {
				setAnimationPhase('spread');
				setTimeout(() => setSpreadComplete(true), 2000);

				const bgTimer = setTimeout(() => {
					setShowWhiteBg(true);

					const revealTimer = setTimeout(() => {
						setAnimationPhase('revealSecond');

						const carouselTimer = setTimeout(() => {
							setAnimationPhase('carousel');
						}, 1000);

						return () => clearTimeout(carouselTimer);
					}, 1000);

					return () => clearTimeout(revealTimer);
				}, 2000);

				return () => clearTimeout(bgTimer);
			}, 1200);

			return () => clearTimeout(spreadTimer);
		}, 800);

		return () => clearTimeout(centerTimer);
	}, []); // Remove dependency on products

	// Carousel rotation effect
	useEffect(() => {
		if (animationPhase === 'carousel' && !paused && products.length > 0) {
			const interval = setInterval(() => {
				setIndex((prev) => (prev + 1) % products.length);
			}, 1800);

			return () => clearInterval(interval);
		}
	}, [animationPhase, paused, products.length]);

	function truncateWords(text: string, maxWords: number): string {
		const words = text.trim().split(/\s+/);
		if (words.length <= maxWords) {
			return text;
		}
		return words.slice(0, maxWords).join(' ') + '...';
	}

	// Get container dimensions based on screen size
	const getContainerDimensions = () => {
		if (isMobile) {
			return {
				width: '100%',
				height: '500px',
				overflowX: 'visible' as const,
				padding: '8px 0',
			};
		}
		return {
			width: '100%',
			height: '750px',
			padding: '8px',
		};
	};

	const containerStyle = getContainerDimensions();

	return (
		<div
			className="relative flex flex-col items-center justify-center"
			style={{
				zIndex: 1,
				width: containerStyle.width,
				height: containerStyle.height,
				overflowX: containerStyle.overflowX,
				padding: containerStyle.padding,
				overflow: isMobile ? 'visible' : 'visible',
			}}
		>
			{/* Main image carousel container */}
			<motion.div
				animate={animationPhase === 'revealSecond' ? { y: -40 } : { y: 0 }}
				transition={{ duration: 1, ease: 'easeInOut' }}
				className="relative"
				style={{
					perspective: '1000px',
					zIndex: 2,
					width: isMobile ? '100vw' : '380px',
					height: isMobile ? '350px' : '600px',
					overflow: 'visible',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{products.map((product, i) => {
					const relative = (i - index + products.length) % products.length;
					if (relative >= slotConfig.length) return null;

					const currentSlotConfig = slotConfig[relative];
					if (!currentSlotConfig) return null;

					const isCenterCard = relative === 2;

					let animateVariant: VariantLabels | TargetAndTransition = 'hidden';
					if (animationPhase === 'initial' && isCenterCard) {
						animateVariant = 'centerIntro';
					} else if (animationPhase === 'spread' && !spreadComplete) {
						animateVariant = 'spreadOut';
					} else if (animationPhase === 'carousel') {
						animateVariant = 'carousel';
					} else if (spreadComplete) {
						animateVariant = {
							x: currentSlotConfig.x,
							y: currentSlotConfig.y,
							rotateY: currentSlotConfig.rotateY,
							scale: currentSlotConfig.scale,
							opacity: 1,
						};
					}

					const DELAY_STEP = 0.8;
					let delay = 0;
					if (relative === 1 || relative === 3) delay = DELAY_STEP * 1;
					else if (relative === 0 || relative === 4) delay = DELAY_STEP * 2;

					return (
						<motion.div
							key={`${product._id}-${i}`}
							className={`absolute rounded-2xl shadow-2xl overflow-hidden bg-white cursor-pointer border border-gray-200 ${
								showWhiteBg ? '' : ''
							}`}
							style={{
								zIndex: currentSlotConfig.zIndex,
								transformStyle: 'preserve-3d',
								width: currentSlotConfig.width,
								height: currentSlotConfig.height,
								marginTop: currentSlotConfig.marginTop,
							}}
							variants={cardVariants}
							initial="hidden"
							animate={animateVariant}
							custom={{ ...currentSlotConfig, delay }}
							transition={spreadComplete ? { duration: 0 } : undefined}
							onMouseEnter={() => setPaused(true)}
							onMouseLeave={() => setPaused(false)}
						>
							{/* Product Card Layout */}
							<div className="flex flex-col h-full">
								{/* Image Section - 65% of height */}
								<div className="relative h-[65%] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
									<img
										src={product.coverImage}
										className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
										alt={product.name}
										loading="lazy"
										style={{
											aspectRatio: imageDimensions[product._id]
												? `${imageDimensions[product._id].width}/${imageDimensions[product._id].height}`
												: 'auto',
										}}
									/>
								</div>

								{/* Content Section - 35% of height */}
								<div className="px-3 py-2 md:p-3 h-[35%] flex flex-col justify-between bg-white">
									{/* Product Name */}
									<h3
										className={`font-bold text-gray-900 leading-tight md:text-base mb-1 md:-mb-4 line-clamp-2 ${isMobile ? 'text-xs mb-1' : 'text-sm'}`}
									>
										{product.name}
									</h3>

									{/* Price Section */}
									{/* <div className="flex items-center gap-2 mb-2">
										<span className={`font-bold text-gray-900 ${isMobile ? 'text-lg' : 'text-xl'}`}>
											₹{product.originalPrice}
										</span>
										 {product.onSale && product.originalPrice && (
											<span
												className={`line-through text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}
											>
												₹{product.originalPrice}
											</span>
										)}
									</div> */}

									{/* Description */}
									{/* <p
										className={`text-gray-600 leading-relaxed mb-2 md:-mb-2 md:text-base line-clamp-2 ${isMobile ? 'text-xs' : 'text-sm'}`}
									>
										{truncateWords(product.description, isMobile ? 8 : 10)}
									</p> */}

									{/* Bottom Row */}
									<div className="flex justify-between items-center -mb-2 md:mb-2">
										<span
											className={`inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium ${isMobile ? 'text-xs' : 'text-xs'}`}
										>
											{product.category}
										</span>
										<span className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-xs'}`}>
											{isMobile ? 'Tap to view' : 'Click to view'}
										</span>
									</div>
								</div>
							</div>
						</motion.div>
					);
				})}
			</motion.div>
		</div>
	);
};
