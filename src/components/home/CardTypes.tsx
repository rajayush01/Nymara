import React, { useState, useEffect } from 'react';
import { motion, TargetAndTransition, VariantLabels, Variants } from 'framer-motion';

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
    coverImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=1000&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop',
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

export default function ImageFanDynamic() {
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
	}, []);

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
			className="relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"
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
							className={`absolute rounded-xl overflow-hidden bg-white cursor-pointer group ${
								showWhiteBg ? '' : ''
							}`}
							style={{
								zIndex: currentSlotConfig.zIndex,
								transformStyle: 'preserve-3d',
								width: currentSlotConfig.width,
								height: currentSlotConfig.height,
								marginTop: currentSlotConfig.marginTop,
								boxShadow: isCenterCard 
									? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
									: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
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
								{/* Image Section - 70% of height */}
								<div className="relative h-[70%] overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50">
									<img
										src={product.coverImage}
										className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
										alt={product.name}
										loading="lazy"
										style={{
											aspectRatio: imageDimensions[product._id]
												? `${imageDimensions[product._id].width}/${imageDimensions[product._id].height}`
												: 'auto',
										}}
									/>
									{/* Gradient Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									
									{/* Category Badge */}
									<div className="absolute top-3 right-3">
										<span className={`inline-block backdrop-blur-md bg-white/90 text-slate-700 px-3 py-1.5 rounded-full font-semibold shadow-lg border border-white/20 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
											{product.category}
										</span>
									</div>
								</div>

								{/* Content Section - 25% of height */}
								<div className={`flex flex-col justify-between bg-white ${isMobile ? 'px-3 py-2' : 'px-4 py-3'} h-[25%]`}>
									{/* Product Name */}
									<h3
										className={`font-bold text-slate-900 leading-tight tracking-tight line-clamp-2 ${isMobile ? 'text-xs' : 'text-sm'}`}
									>
										{product.name}
									</h3>

									{/* Bottom Row */}
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-1.5">
											<svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-amber-400 fill-current`} viewBox="0 0 20 20">
												<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
											</svg>
											<span className={`font-semibold text-slate-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>
												{product.rating}
											</span>
										</div>
										<span className={`text-slate-400 font-medium group-hover:text-blue-600 transition-colors duration-300 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
											{isMobile ? 'Tap →' : 'View Details →'}
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
}