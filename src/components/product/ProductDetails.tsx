// pages/ProductDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import {
  useProducts,
  useCart,
  useWishlist,
  Product,
} from "@/contexts/AppContext";
import RelatedProducts from "@/components/product/RelatedProducts";
import { useTracking } from "@/contexts/TrackingContext";
import axios from "axios";

// Import new components
import SizeGuide from "./SizeGuide";
import ProductBreadcrumb from "../productdetails/ProductBreadcrumb";
import ProductImageGallery from "../productdetails/ProductImageGallery";
import ProductInfo from "../productdetails/ProductInfo";
import ProductConfiguration from "../productdetails/ProductConfiguration";
import ProductFeatures from "../productdetails/ProductFeatures";
import ProductActions from "../productdetails/ProductActions";
import ProductDetailsSection from "../productdetails/ProductDetailsSection";
import VideoModal from "../productdetails/VideoModal";
import ShareModal from "../productdetails/ShareModal";
import QueryModal from "../productdetails/QueryModal";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Loader Component
const ProductLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#9a8457] rounded-full border-t-transparent animate-spin"></div>
          {/* Inner icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-[#9a8457]" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Loading Product...
        </h2>
        <p className="text-gray-600">Please wait while we fetch the details</p>
      </div>
    </div>
  );
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

  // State
  const [product, setProduct] = useState<Product | null>(null);
  const [baseProduct, setBaseProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("18K");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [engravingText, setEngravingText] = useState("");
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Modal states
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDropHintModal, setShowDropHintModal] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${VITE_API_URL}/api/user/ornaments/${id}?currency=${selectedCountry.currency}`,
        );

        if (res.data?.ornament) {
          const ornament = res.data.ornament;
          let normalizedVariants: any[] = [];

          if (ornament.variants && !Array.isArray(ornament.variants)) {
            normalizedVariants = Object.entries(ornament.variants).map(
              ([metalType, id]) => ({
                _id: id,
                metalType,
              }),
            );
          } else {
            normalizedVariants = ornament.variants || [];
          }

          if (!baseProduct) {
            setBaseProduct({
              ...ornament,
              variants: normalizedVariants,
            });
          }
          setProduct({
            ...ornament,
            variants: normalizedVariants,
          });
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

  // Scroll to top whenever the product ID changes (including related product clicks)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Set default size
  useEffect(() => {
    if (
      product &&
      typeof product.size === "string" &&
      STANDARD_SIZES.includes(product.size)
    ) {
      setSelectedSize(product.size);
    }
  }, [product]);

  // Show loader while loading
  if (loading) {
    return <ProductLoader />;
  }

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

  const productImages = [product.coverImage, ...(product.images || [])].filter(
    (img): img is string => Boolean(img),
  );

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
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];

  const calculatePrice = (): { amount: number; symbol: string } => {
    const currency = selectedCountry.currency;
    if (product?.prices && product.prices[currency]) {
      const { amount, symbol } = product.prices[currency];
      return {
        amount,
        symbol: symbol || (currency === "INR" ? "₹" : "$"),
      };
    }
    return {
      amount: product?.price || 0,
      symbol: currency === "INR" ? "₹" : "$",
    };
  };

  const categoryString = Array.isArray(product.category)
    ? product.category.join(" ").toLowerCase()
    : product.category?.toLowerCase?.() || "";

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart(product, quantity, {
      selectedMetal,
      selectedSize,
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

  const relatedProducts = products
    .filter(
      (p) =>
        p._id !== product._id &&
        (p.category === product.category ||
          p.style === product.style ||
          p.stoneType === product.stoneType),
    )
    .slice(0, 4);

  const { amount, symbol } = calculatePrice();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <ProductBreadcrumb product={product} navigate={navigate} />

        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[#9a8457] hover:text-[#8a7547] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery
            product={product}
            productImages={productImages}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            setShowVideoModal={setShowVideoModal}
            setShowShareModal={setShowShareModal}
            setProduct={setProduct}
            selectedCountry={selectedCountry}
            VITE_API_URL={VITE_API_URL}
            setLoading={setLoading}
          />

          <div className="space-y-6">
            <ProductInfo
              product={product}
              amount={amount}
              symbol={symbol}
              selectedCountry={selectedCountry}
              baseProduct={baseProduct}
              setProduct={setProduct}
              setActiveImageIndex={setActiveImageIndex}
            />

            {Array.isArray(product.purityOptions) &&
              product.purityOptions.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">
                    Purity:
                  </span>

                  {product.purityOptions.map((option) => (
                    <button
                      key={option.id}
                      disabled={option.purity === product.currentPurity}
                      onClick={() => navigate(`/product/${option.id}`)}
                      className={`px-4 py-2 border rounded-md text-sm transition
          ${
            option.purity === product.currentPurity
              ? "bg-[#9a8457] text-white border-[#9a8457]"
              : "border-gray-300 hover:border-[#9a8457] hover:text-[#9a8457]"
          }`}
                    >
                      {option.purity}
                    </button>
                  ))}
                </div>
              )}
            <ProductConfiguration
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              engravingText={engravingText}
              setEngravingText={setEngravingText}
              setShowSizeGuide={setShowSizeGuide}
              standardSizes={STANDARD_SIZES}
            />

            <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 my-2">
              <span className="text-orange-500 mt-0.5 shrink-0">
                {/* Ruler / Size Icon */}
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12h20M2 12l4-4M2 12l4 4M22 12l-4-4M22 12l-4 4" />
                </svg>
              </span>
              <div className="flex-1">
                <p className="text-md font-semibold text-gray-800 leading-snug">
                  Need a Specific size?
                </p>
                <p className="text-sm text-gray-500 mt-0.5 mb-2.5">
                  Contact us for custom sizing & pricing.
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/+447867089659"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 hover:shadow-md active:scale-95"
                  >
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882l6.194-1.624A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.359-.214-3.68.964.982-3.588-.234-.369A9.818 9.818 0 1112 21.818z" />
                    </svg>
                    WhatsApp
                  </a>

                  {/* Email */}

                  <div className="flex items-center gap-1.5 bg-white text-gray-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200">
                    <svg
                      className="w-3.5 h-3.5 shrink-0 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email Us on{" "}
                    <a
                      href="mailto:business@nymarajewels.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-900 hover:text-orange-600 hover:underline underline-offset-2 cursor-pointer select-all transition-colors duration-150"
                    >
                      business@nymarajewels.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ProductFeatures setShowDropHintModal={setShowDropHintModal} />

            <ProductActions
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              selectedSize={selectedSize}
              standardSizes={STANDARD_SIZES}
              handleAddToCart={handleAddToCart}
              handleWishlistToggle={handleWishlistToggle}
              isInWishlist={isInWishlist}
              addedToCart={addedToCart}
            />
          </div>
        </div>

        <ProductDetailsSection
          product={product}
          expandedDetails={expandedDetails}
          setExpandedDetails={setExpandedDetails}
        />

        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}

        {/* Modals */}
        {showVideoModal && product.videoUrl && (
          <VideoModal
            videoUrl={product.videoUrl}
            onClose={() => setShowVideoModal(false)}
          />
        )}

        {showSizeGuide && !categoryString.includes("earring") && (
          <SizeGuide
            isOpen={showSizeGuide}
            onClose={() => setShowSizeGuide(false)}
            productType={
              Array.isArray(product.category)
                ? product.category[0]
                : product.category
            }
          />
        )}

        {showShareModal && (
          <ShareModal
            product={product}
            onClose={() => setShowShareModal(false)}
          />
        )}

        {showDropHintModal && (
          <QueryModal
            product={product}
            amount={amount}
            symbol={symbol}
            onClose={() => setShowDropHintModal(false)}
            VITE_API_URL={VITE_API_URL}
          />
        )}
        {/*Product Description Section (moved from ProductInfo) */}
        {/* <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <p>{product?.description}</p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetail;
