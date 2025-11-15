// pages/ProductDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  MessageCircle,
  Video,
  Mail,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Ruler,
  Award,
  Shield,
  Gift,
  Eye,
  ArrowLeft,
  Share2,
  Check,
} from "lucide-react";
import {
  useProducts,
  useCart,
  useWishlist,
  Product,
} from "@/contexts/AppContext";
import RelatedProducts from "@/components/product/RelatedProducts";
import { useTracking } from "@/contexts/TrackingContext";
import guide from "@/assets/ring_size_guide.png";

// import ProductReviews from '@/components/product/ProductReviews';
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// helpers: put after const metalcolors = { ... }
const getMetalColor = (metal: string) => {
  const m = (metal || "").toLowerCase();
  if (m.includes("yellow")) return "#FFD700";
  if (m.includes("white")) return "#E5E4E2";
  if (m.includes("rose")) return "#B76E79";
  if (m.includes("silver")) return "#C0C0C0";
  if (m.includes("platinum")) return "#E5E4E2";
  return "#d1d5db"; // fallback gray
};

const VARIANT_COLORS = {
  "Yellow Gold": "bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-600 shadow-inner",
  "White Gold": "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-inner",
  "Rose Gold": "bg-gradient-to-r from-[#b76e79] via-pink-200 to-[#b76e79] shadow-inner",
  "Silver": "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-400 shadow-inner",
  "Platinum": "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-inner",
};

// simple luminance test for readable text color
const isLightHex = (hex: string) => {
  if (!hex) return true;
  const c = hex.replace("#", "");
  if (c.length !== 6) return true;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  // perceptual luminance
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 200; // threshold: >200 => light background
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id || "0");
  const { selectedCountry } = useCurrency();

  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { logAddToCart } = useTracking();

  const [showVideoModal, setShowVideoModal] = useState(false);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log(
          "🔄 Fetching product with currency:",
          selectedCountry.currency
        );

        const res = await axios.get(
          `${VITE_API_URL}/api/user/ornaments/${id}?currency=${selectedCountry.currency}`
        );

        console.log("📦 API Response:", res.data);

        if (res.data?.ornament) {
          setProduct(res.data.ornament);
        }
      } catch (err: any) {
        console.error("❌ Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, selectedCountry.currency]);

  const [selectedMetal, setSelectedMetal] = useState("18K");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showEngravingForm, setShowEngravingForm] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showDropHintModal, setShowDropHintModal] = useState(false);
  const [hintSize, setHintSize] = useState("");
  const [hintMessage, setHintMessage] = useState("");

  const handleToggleEngravingForm = () => {
    setShowEngravingForm((prev) => !prev);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    if (
      product &&
      typeof product.size === "string" &&
      STANDARD_SIZES.includes(product.size)
    ) {
      setSelectedSize(product.size);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or may have been
            removed.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors"
          >
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  // Generate multiple images for the product (in real app, this would come from product data)
  const productImages = [product.coverImage, ...(product.images || [])].filter(
    Boolean
  ); // remove undefined/null

 

  // Standard customer-selectable sizes
  // Standard customer-selectable sizes
  const STANDARD_SIZES = [
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
  ];



  // Always use standard sizes for customers
  const sizeOptions = STANDARD_SIZES;

  const features = [
    {
      icon: MessageCircle,
      title: "Query/Doubt?",
      description: "Have a query/doubt?",
      action: () => setShowDropHintModal(true),
    },
    {
      icon: Video,
      title: "Virtual Consultation",
      description: "Book a video call",
      action: () => console.log("Book consultation"),
    },
    {
      icon: Mail,
      title: "Email Expert",
      description: "Get personalized advice",
      action: () => window.open("mailto:expert@jewelry.com"),
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with specialists",
      action: () => console.log("Open chat"),
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over ₹50,000",
      action: () => {},
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description: "Easy return policy",
      action: () => {},
    },
  ];

  type PriceResult = { amount: number; symbol: string };

  const calculatePrice = (): { amount: number; symbol: string } => {
  const currency = selectedCountry.currency;

  if (product?.prices && product.prices[currency]) {
    const { amount, symbol } = product.prices[currency];
    return {
      amount,
      symbol: symbol || (currency === "INR" ? "₹" : "$"), // fallback
    };
  }

  // Fallback to INR if no price found
  return {
    amount: product?.price || 0,
    symbol: currency === "INR" ? "₹" : "$",
  };
};


  const handleAddToCart = () => {
    // Require customer to pick a size
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart(product, quantity, {
      selectedMetal,
      selectedSize, // always the customer's chosen size
      engraving: engravingText,
    });

    logAddToCart(product._id, {
      name: product.name,
      category: product.category,
      price: product.price,
      selectedMetal,
      selectedSize,
      quantity,
      page: window.location.pathname,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const itemDetails = [
    {
      label: "SKU",
      value:
        product.sku || `JW${product._id.toString().slice(-5).toUpperCase()}`,
    },
    {
      label: "Category",
      value: Array.isArray(product.category)
        ? product.category.join(", ")
        : product.category || "Jewelry",
    },
    { label: "Style", value: product.style || "—" },
    { label: "Metal Type", value: product.metalType || "—" },
    { label: "Stone Type", value: product.stoneType || "—" },
    { label: "Color", value: product.color || "—" },
    {
      label: "Rating",
      value:
        (product.reviews ?? 0) > 0 // ✅ Safe null check
          ? `${product.rating ?? 0}/5 (${product.reviews} reviews)`
          : "No reviews yet",
    },
    {
      label: "Availability",
      value: (product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock", // ✅ Safe null check
    },
  ];

  // Get related products
  const relatedProducts = products
    .filter(
      (p) =>
        p._id !== product._id &&
        (p.category === product.category ||
          p.style === product.style ||
          p.stoneType === product.stoneType)
    )
    .slice(0, 4);

  const { amount, symbol } = calculatePrice();
  console.log("🖼 Rendering product price:", {
    amount,
    symbol,
    currency: selectedCountry.currency,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 mt-32">
          <button
            onClick={() => navigate("/")}
            className="hover:text-gray-900 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-gray-900 transition-colors"
          >
            Products
          </button>
          {product.category && (
            <>
              <span>/</span>
              <button
                onClick={() => {
                  const categoryStr = Array.isArray(product.category)
                    ? product.category[0]
                    : product.category;
                  navigate(`/products/${categoryStr?.toLowerCase() || ""}`);
                }}
                className="hover:text-gray-900 transition-colors"
              >
                {Array.isArray(product.category)
                  ? product.category[0]
                  : product.category}
              </button>
            </>
          )}
          <span>/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[#9a8457] hover:text-[#8a7547] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <div
                className={`aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 cursor-zoom-in ${
                  isZoomed ? "fixed inset-4 z-50 aspect-auto" : ""
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={productImages[activeImageIndex]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? "scale-150" : "hover:scale-105"
                  }`}
                />
              </div>

              {/* Product badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                    New
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-3 py-1 bg-[#9a8457] text-white text-xs font-medium rounded-full">
                    Best Seller
                  </span>
                )}
                {(product.discount ?? 0) > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {product.variants && product.variants.length > 0 && (
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-3">
      Metal: {product.metalType || "Select"}
    </label>

    <div className="grid grid-cols-2 gap-3">
      {product.variants.map((variant, index) => {
        const metal = (variant.metalType || "")
          .replace("18K ", "")
          .replace("14K ", "");

        const colorClass =
          VARIANT_COLORS[metal as keyof typeof VARIANT_COLORS] ||
          "bg-gray-200 shadow-inner";

        const isActive = product.metalType === variant.metalType;

        return (
          <button
            key={index}
           onClick={() => {
  setProduct(prev => {
    if (!prev) return prev;

    return {
      ...prev,
      metalType: variant.metalType,
      coverImage: variant.coverImage || prev.coverImage,
      images: variant.images && variant.images.length > 0
        ? variant.images        // ONLY variant images
        : prev.images           // fallback if variant has none
    };
  });

  setActiveImageIndex(0);
}}


            className={`p-3 rounded-lg border-2 transition-all font-medium text-left flex items-center justify-between ${
              isActive
                ? "border-[#9a8457] bg-[#9a8457]/5 text-[#9a8457]"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            }`}
          >
            <span className="text-sm">{metal}</span>
            <div className={`w-6 h-6 rounded-full border ${colorClass}`}></div>
          </button>
        );
      })}
    </div>
  </div>
)}


            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === index
                      ? "border-[#9a8457] ring-2 ring-[#9a8457]/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  if (product.videoUrl) {
                    setShowVideoModal(true);
                  } else {
                    alert("No 360° view available for this product.");
                  }
                }}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>360° View</span>
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="text-sm text-gray-600 mb-4">
                SKU: {product.sku}
              </div>

              {/* Price */}

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-3">
                  {/* Display current price */}
                  <span className="text-3xl font-bold text-gray-900">
                    {symbol}{amount.toLocaleString()}

                  </span>

                  {/* Show original price + discount ONLY for INR */}
                  {selectedCountry.currency === "INR" &&
  (product.originalPrice ?? 0) > (product.price ?? 0) && (
    <span className="text-xl text-gray-500 line-through">
      ₹{(product.originalPrice ?? 0).toLocaleString()}
    </span>
  )}

                  {/* 💰 Making Charges by Country */}
                  {product.makingChargesByCountry &&
    product.makingChargesByCountry[selectedCountry.currency] && (
      <div className="mt-2 text-sm text-gray-700">
        <span className="font-medium">Making Charges:</span>{" "}
        {
          product.makingChargesByCountry[selectedCountry.currency].symbol ||
          (selectedCountry.currency === "INR" ? "₹" : "$")
        }
        {product.makingChargesByCountry[selectedCountry.currency].amount.toLocaleString()}
      </div>
    )}

                  {selectedCountry.currency === "INR" &&
                    (product.discount ?? 0) > 0 && (
                      <span className="text-lg font-medium text-green-600">
                        Save {product.discount ?? 0}%
                      </span>
                    )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating ?? 0) // ✅ Safe null check
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} Reviews)
                </span>
                {/* <button className="text-sm text-[#9a8457] hover:text-[#8a7547] underline">
                  See all reviews
                </button> */}
              </div>

              {/* Stock status */}
              <div className="flex items-center space-x-2 mb-6">
                {product.stock ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 text-sm font-medium">
                      In Stock - Ready to Ship
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 text-sm font-medium">
                      Currently Out of Stock
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Metal Variants */}
            {product.variantLinks && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Metal: {product.metalType || "Select"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.variantLinks).map(
                    ([metal, variantId]) => (
                      <button
                        key={metal}
                        onClick={(e) => {
                          e.preventDefault();
                          // ✅ Open the variant in a new tab
                          window.open(`/product/${variantId}`, "_blank");
                        }}
                        className={`p-3 rounded-lg border-2 font-medium transition-all text-left ${
                          product.metalType
                            ?.toLowerCase()
                            .includes(metal.toLowerCase())
                            ? "border-[#9a8457] bg-[#9a8457]/5 text-[#9a8457]"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{metal}</span>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {sizeOptions.length > 1 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-900">
                    Size: {selectedSize || "Please Select"}
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-sm text-[#9a8457] hover:text-[#8a7547] flex items-center space-x-1"
                  >
                    <Ruler className="w-4 h-4" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2 text-center rounded-lg border transition-all ${
                        selectedSize === size
                          ? "border-[#9a8457] bg-[#9a8457] text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    Or enter custom size:
                  </label>
                  <input
                    type="text"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    placeholder="Enter size"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Add Engraving */}
            <div>
              <button
                onClick={handleToggleEngravingForm}
                className="flex items-center space-x-2 text-[#9a8457] hover:text-[#8a7547] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Personal Engraving</span>
              </button>

              {showEngravingForm && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="Enter engraving text (max 10 characters)"
                    maxLength={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {engravingText.length}/10 characters
                  </div>
                </div>
              )}
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={feature.action}
                  className="flex flex-col items-center space-y-2 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#9a8457] hover:shadow-sm transition-all group"
                >
                  <feature.icon className="w-5 h-5 text-gray-600 group-hover:text-[#9a8457]" />
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-[#9a8457]">
                      {feature.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {feature.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-900">
                  Quantity:
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={
                    !product.stock || (!selectedSize && sizeOptions.length > 1)
                  }
                  className="flex-1 bg-[#9a8457] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#8a7547] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 relative overflow-hidden"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>
                        {product.stock ? "Add to Cart" : "Out of Stock"}
                      </span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 border rounded-lg transition-all ${
                    isInWishlist(product._id)
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-gray-300 hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isInWishlist(product._id) ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="w-4 h-4 text-green-600" />
                <span>Certified Authentic</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Gift className="w-4 h-4 text-green-600" />
                <span>Gift Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Details */}
        <div className="mt-16 space-y-8">
          <div className="bg-white rounded-xl border border-gray-200">
            <button
              onClick={() => setExpandedDetails(!expandedDetails)}
              className="w-full flex items-center justify-between p-8 text-left"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Product Details
              </h2>
              {expandedDetails ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </button>

            {expandedDetails && (
              <div className="px-6 md:px-8 py-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
                  {/* ✅ SPECIFICATIONS */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
                      SPECIFICATIONS
                    </h3>
                    <div className="space-y-1">
                      {itemDetails.map((detail, index) => (
                        <div
                          key={index}
                          className="flex justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded transition-colors"
                        >
                          <span className="text-gray-600 text-sm font-medium">
                            {detail.label}
                          </span>
                          <span className="font-semibold text-gray-900 text-sm">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* FIX: Show DIAMOND DETAILS if available */}
                    {product.diamondDetails && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">
                          DIAMOND DETAILS
                        </h4>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg border border-gray-200">
                          {Object.entries(product.diamondDetails).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                              >
                                <span className="text-gray-600 text-sm font-medium capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </span>
                                <span className="font-semibold text-gray-900 text-sm">
                                  {String(value)}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* ✅ Optional: Include side diamond details if present */}
                    {product.sideDiamondDetails && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">
                          SIDE DIAMOND DETAILS
                        </h4>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg border border-gray-200">
                          {Object.entries(product.sideDiamondDetails).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                              >
                                <span className="text-gray-600 text-sm font-medium capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </span>
                                <span className="font-semibold text-gray-900 text-sm">
                                  {String(value)}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ✅ CARE INSTRUCTIONS + WARRANTY */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
                        CARE INSTRUCTIONS
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Store in provided jewelry box or soft pouch
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Clean with soft, lint-free cloth after each wear
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Avoid contact with perfumes, lotions, and chemicals
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Remove before swimming, exercising, or sleeping
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Have professionally cleaned and inspected annually
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Keep away from extreme temperatures
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
                        WARRANTY & RETURNS
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Lifetime warranty against manufacturing defects
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            30-day return policy for full refund
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Free resizing within 60 days of purchase
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <span className="text-gray-900 font-bold mt-0.5">
                            •
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Complimentary professional cleaning service
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}

        {/* 🔹 Video Modal (360° View) */}
        {showVideoModal && product.videoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <div className="relative bg-black rounded-xl max-w-4xl w-full shadow-2xl">
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-3 right-3 text-white hover:text-gray-300 text-2xl"
              >
                ×
              </button>
              <video
                src={product.videoUrl}
                controls
                autoPlay
                loop
                playsInline
                className="w-full h-[70vh] object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Size Guide Modal */}
        {showSizeGuide && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900">Ring Size Guide</h3>
        <button
          onClick={() => setShowSizeGuide(false)}
          className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors"
        >
          ×
        </button>
      </div>
      
      {/* Scrollable Content */}
      <div className="overflow-y-auto px-6 py-6">
        <div className="space-y-6">
          <p className="text-gray-700">
            Find your perfect ring size using one of these methods:
          </p>
          
          {/* Size Chart Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Size Chart (Inner Circumference):
            </h4>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <img 
                src={guide} 
                alt="Ring Size Conversion Chart" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          {/* Measuring Tips Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Measuring Tips:
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Measure your finger at the end of the day</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Consider the width of the band</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Account for seasonal finger size changes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>When in doubt, size up rather than down</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer Button */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={() => setShowSizeGuide(false)}
          className="w-full bg-[#9a8457] text-white py-3 rounded-lg hover:bg-[#8a7547] transition-colors font-medium text-base"
        >
          Got it
        </button>
      </div>
    </div>
  </div>
)}
        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Share This Product</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Share this beautiful piece with someone special
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={shareProduct}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Share Link
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied!");
                      setShowShareModal(false);
                    }}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drop a Hint Modal */}
        {showDropHintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Query/Doubt</h3>
                <button
                  onClick={() => {
                    setShowDropHintModal(false);
                    setHintSize("");
                    setHintMessage("");
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Tell us the query about the size or any other concern you have regarding this product. We will get back to you as soon as possible.
                </p>
                
                {/* Product Preview */}
                <div className="bg-gray-50 p-3 rounded-lg flex items-center space-x-3">
                  <img 
                    src={product.coverImage} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">
                    {symbol}{amount.toLocaleString()}

                    </div>
                  </div>
                </div>

                {/* Size Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Preferred Size
                  </label>
                  <input
                    type="text"
                    value={hintSize}
                    onChange={(e) => setHintSize(e.target.value)}
                    placeholder="Enter size (e.g., 11, 12, or custom size)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Not sure about size? Leave it blank or add a note below.
                  </p>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={hintMessage}
                    onChange={(e) => setHintMessage(e.target.value)}
                    placeholder="Add any special requests, concerns, or preferences..."
                    rows={4}
                    maxLength={300}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] resize-none"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {hintMessage.length}/300 characters
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                 {/* Action Buttons */}
<div className="flex space-x-3">
  <button
    onClick={async () => {
      try {
        // Send query email via backend API
        await axios.post(`${VITE_API_URL}/api/contact/query`, {
          name: "", // optional — can later pull from logged-in user
          email: "support@nymara.com", // or replace with user's email if logged in
          size: hintSize,
          message: hintMessage,
          productId: product._id,
          productName: product.name,
          productUrl: window.location.href,
        });

        alert("✅ Your query has been sent successfully! We’ll get back to you soon.");
        setShowDropHintModal(false);
        setHintSize("");
        setHintMessage("");
      } catch (err) {
        console.error("❌ Error sending query:", err);
        alert("Failed to send query. Please try again later.");
      }
    }}
    className="flex-1 bg-[#9a8457] text-white py-3 px-4 rounded-lg hover:bg-[#8a7547] transition-colors font-medium"
  >
    Send Query
  </button>

  <button
    onClick={() => {
      const hintText = `Product: ${product.name}\nLink: ${window.location.href}${hintSize ? `\nSize: ${hintSize}` : ""}${hintMessage ? `\nNotes: ${hintMessage}` : ""}`;
      navigator.clipboard.writeText(hintText);
      alert("Hint details copied to clipboard!");
      setShowDropHintModal(false);
      setHintSize("");
      setHintMessage("");
    }}
    className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
  >
    Copy Details
  </button>
</div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ProductDetail;
