// pages/ProductDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { useProducts, useCart, useWishlist } from "@/contexts/AppContext";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductReviews from "./ProductReviews";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id || "0");

  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = getProductById(productId);

  const [selectedMetal, setSelectedMetal] = useState("18K");
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showEngravingForm, setShowEngravingForm] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

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
  const productImages = [
    product.image,
    product.image.replace("photo-1605100804763", "photo-1603561596112"),
    product.image.replace("photo-1605100804763", "photo-1599643478518"),
    product.image.replace("photo-1605100804763", "photo-1611652022419"),
  ];

  const metalOptions = [
    { value: "14K", label: "14K Yellow Gold", price: -5000 },
    { value: "18K", label: "18K White Gold", price: 0 },
    { value: "18K-Rose", label: "18K Rose Gold", price: 2000 },
    { value: "Platinum", label: "Platinum", price: 8000 },
  ];

  const sizeOptions =
    product.size.length > 0 && !product.size.includes("One Size")
      ? product.size
      : [
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

  const features = [
    {
      icon: MessageCircle,
      title: "Drop a Hint",
      description: "Share with someone special",
      action: () => setShowShareModal(true),
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

  const calculatePrice = () => {
    const basePrice = product.price;
    const metalAdjustment =
      metalOptions.find((m) => m.value === selectedMetal)?.price || 0;
    return basePrice + metalAdjustment;
  };

  const handleAddToCart = () => {
    if (sizeOptions.length > 1 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(product, quantity, {
      selectedMetal,
      selectedSize: selectedSize || sizeOptions[0],
      engraving: engravingText,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
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
    { label: "SKU", value: `JW${product.id.toString().padStart(5, "0")}` },
    { label: "Category", value: product.category || "Jewelry" },
    { label: "Style", value: product.style },
    { label: "Metal Type", value: product.metalType },
    { label: "Stone Type", value: product.stoneType },
    { label: "Color", value: product.color },
    {
      label: "Rating",
      value: `${product.rating}/5 (${product.reviews} reviews)`,
    },
    {
      label: "Availability",
      value: product.inStock ? "In Stock" : "Out of Stock",
    },
  ];

  // Get related products
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.style === product.style ||
          p.stoneType === product.stoneType)
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                onClick={() =>
                  navigate(`/products/${product.category?.toLowerCase()}`)
                }
                className="hover:text-gray-900 transition-colors"
              >
                {product.category}
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
                {product.discount > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

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
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
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
                SKU: JW{product.id.toString().padStart(5, "0")}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{calculatePrice().toLocaleString()}
                  </span>
                  {product.originalPrice > calculatePrice() && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="text-lg font-medium text-green-600">
                      Save {product.discount}%
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
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} Reviews)
                </span>
                <button className="text-sm text-[#9a8457] hover:text-[#8a7547] underline">
                  See all reviews
                </button>
              </div>

              {/* Stock status */}
              <div className="flex items-center space-x-2 mb-6">
                {product.inStock ? (
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

            {/* Metal Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Metal:{" "}
                {metalOptions.find((m) => m.value === selectedMetal)?.label}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {metalOptions.map((metal) => (
                  <button
                    key={metal.value}
                    onClick={() => setSelectedMetal(metal.value)}
                    className={`p-3 rounded-lg border-2 font-medium transition-all text-left ${
                      selectedMetal === metal.value
                        ? "border-[#9a8457] bg-[#9a8457]/5 text-[#9a8457]"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{metal.label}</span>
                      {/* {metal.price !== 0 && (
                        <span className="text-xs">
                          {metal.price > 0 ? "+" : ""}₹
                          {metal.price.toLocaleString()}
                        </span>
                      )} */}
                    </div>
                  </button>
                ))}
              </div>
            </div>

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
                <div className="grid grid-cols-5 gap-2">
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
              </div>
            )}

            {/* Add Engraving */}
            <div>
              <button
                onClick={() => setShowEngravingForm(!showEngravingForm)}
                className="flex items-center space-x-2 text-[#9a8457] hover:text-[#8a7547] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Personal Engraving (+₹2,000)</span>
              </button>
              {showEngravingForm && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="Enter engraving text (max 20 characters)"
                    maxLength={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {engravingText.length}/20 characters • Font: Script
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
                    !product.inStock ||
                    (!selectedSize && sizeOptions.length > 1)
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
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 border rounded-lg transition-all ${
                    isInWishlist(product.id)
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-gray-300 hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`}
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
              <div className="px-8 pb-8 bg-gradient-to-b from-white to-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b-2 border-[#9a8457]">
                      SPECIFICATIONS
                    </h3>
                    <div className="space-y-3">
                      {itemDetails.map((detail, index) => (
                        <div
                          key={index}
                          className="flex justify-between py-2 border-b border-gray-100 hover:bg-gray-50 px-2 rounded transition-colors"
                        >
                          <span className="text-gray-600">{detail.label}</span>
                          <span className="font-medium text-[#9a8457]">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b-2 border-[#9a8457]">
                        CARE INSTRUCTIONS
                      </h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p className="flex items-start">
                          <span className="text-[#9a8457] font-bold mr-2">•</span>
                          <span>Store in provided jewelry box or soft pouch</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-[#9a8457] font-bold mr-2">•</span>
                          <span>Clean with soft, lint-free cloth after each wear</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-[#9a8457] font-bold mr-2">•</span>
                          <span>Avoid contact with perfumes, lotions, and chemicals</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-[#9a8457] font-bold mr-2">•</span>
                          <span>Remove before swimming, exercising, or sleeping</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-[#9a8457] font-bold mr-2">•</span>
                          <span>Have professionally cleaned and inspected annually</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-[#9a8457] font-bold mr-2">•</span>
                          <span>Keep away from extreme temperatures</span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#9a8457] to-[#b39968] p-6 rounded-lg shadow-md text-white">
                      <h3 className="text-lg font-semibold mb-4 pb-3 border-b-2 border-white/30">
                        WARRANTY & RETURNS
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Lifetime warranty against manufacturing defects</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>30-day return policy for full refund</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Free resizing within 60 days of purchase</span>
                        </p>
                        <p className="flex items-start">
                          <span className="font-bold mr-2">•</span>
                          <span>Complimentary professional cleaning service</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Reviews */}
        {/* <div className="mt-16">
          <ProductReviews productId={product.id} />
        </div> */}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Ring Size Guide</h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Find your perfect ring size using one of these methods:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">
                    Size Chart (Inner Circumference):
                  </h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Size 4:</span>
                      <span>46.8mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size 5:</span>
                      <span>49.3mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size 6:</span>
                      <span>51.9mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size 7:</span>
                      <span>54.4mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size 8:</span>
                      <span>57.0mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size 9:</span>
                      <span>59.5mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size 10:</span>
                      <span>62.1mm</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-2">Measuring Tips:</p>
                  <ul className="space-y-1">
                    <li>• Measure your finger at the end of the day</li>
                    <li>• Consider the width of the band</li>
                    <li>• Account for seasonal finger size changes</li>
                    <li>• When in doubt, size up rather than down</li>
                  </ul>
                </div>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="w-full bg-[#9a8457] text-white py-2 rounded-lg hover:bg-[#8a7547] transition-colors"
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
      </div>
    </div>
  );
};

export default ProductDetail;
