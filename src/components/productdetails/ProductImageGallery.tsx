// components/product/ProductImageGallery.tsx
import React from "react";
import { Eye, Share2,ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/contexts/AppContext";
import axios from "axios";

const VARIANT_COLORS: Record<string, string> = {
  "Yellow Gold": "bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-600 shadow-inner",
  "White Gold": "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-inner",
  "Rose Gold": "bg-gradient-to-r from-[#b76e79] via-pink-200 to-[#b76e79] shadow-inner",
  Silver: "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-400 shadow-inner",
  Platinum: "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-inner",
};

const getMetalColor = (metal: string) => {
  const m = (metal || "").toLowerCase();
  if (m.includes("yellow")) return "#FFD700";
  if (m.includes("white")) return "#E5E4E2";
  if (m.includes("rose")) return "#B76E79";
  if (m.includes("silver")) return "#C0C0C0";
  if (m.includes("platinum")) return "#E5E4E2";
  return "#d1d5db";
};

const isLightHex = (hex: string) => {
  if (!hex) return true;
  const c = hex.replace("#", "");
  if (c.length !== 6) return true;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 200;
};

interface ProductImageGalleryProps {
  product: Product;
  productImages: string[];
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  isZoomed: boolean;
  setIsZoomed: (zoomed: boolean) => void;
  setShowVideoModal: (show: boolean) => void;
  setShowShareModal: (show: boolean) => void;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  selectedCountry: any;
  VITE_API_URL: string;
  setLoading: (loading: boolean) => void;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  product,
  productImages,
  activeImageIndex,
  setActiveImageIndex,
  isZoomed,
  setIsZoomed,
  setShowVideoModal,
  setShowShareModal,
  setProduct,
  selectedCountry,
  VITE_API_URL,
  setLoading,
}) => {
  // Check if this product or any of its variants has a video
  const hasVideoInFamily = React.useMemo(() => {
    const videoSKUs = ['DI-W-NEC-109', 'DI-W-NEC-121', 'DI-W-NEC-112', 'DI-W-NEC-124'];
    
    console.log('=== VIDEO CHECK DEBUG ===');
    console.log('Current Product SKU:', product.sku);
    console.log('Current Product videoUrl:', product.videoUrl);
    console.log('Variants:', product.variants);
    
    // Helper function to check if SKU matches video products (including base SKU pattern)
    const isVideoProduct = (sku: string) => {
      if (!sku) return false;
      // Check exact match
      if (videoSKUs.includes(sku)) return true;
      // Check if it's a variant of the video products (same base SKU pattern)
      const baseSKU = sku.split('-').slice(0, -1).join('-'); // Get base without last part
      return videoSKUs.some(vsku => vsku.startsWith(baseSKU) || baseSKU.startsWith(vsku.split('-').slice(0, -1).join('-')));
    };
    
    // Check current product
    if (product.videoUrl) {
      console.log('✅ Found video on current product');
      return product.videoUrl;
    }
    
    // Check if current product SKU matches video products
 if (product.sku && isVideoProduct(product.sku)) {  
      console.log('✅ Current product SKU matches video products');
      // Look for video in variants
      if (product.variants && Array.isArray(product.variants)) {
        for (const variant of product.variants) {
          // console.log('Checking variant:', variant.sku, variant.videoUrl);
          if (variant.videoUrl) {
            // console.log('✅ Found video in variant:', variant.sku);
            return variant.videoUrl;
          }
        }
      }
    }
    
    // Check variants for video
    if (product.variants && Array.isArray(product.variants)) {
      for (const variant of product.variants) {
       if (variant.videoUrl && variant.sku && isVideoProduct(variant.sku)) {
          // console.log('✅ Found video in variant (alt check):', variant.sku);
          return variant.videoUrl;
        }
      }
    }
    
    console.log('❌ No video found in family');
    return null;
  }, [product]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
<div className="relative">
  <div
    className={`aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 ${
      hasVideoInFamily ? '' : 'cursor-zoom-in'
    } ${isZoomed ? "fixed inset-4 z-50 aspect-auto" : ""}`}
    onClick={() => {
      if (!hasVideoInFamily) {
        setIsZoomed(!isZoomed);
      }
    }}
  >
    {hasVideoInFamily && activeImageIndex === 0 ? (
      <video
        src={hasVideoInFamily}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        controls
      />
    ) : (
      <img
        src={productImages[activeImageIndex]}
        alt={product.name}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          isZoomed ? "scale-150" : "hover:scale-105"
        }`}
      />
    )}
  </div>

  {/* ← Left Arrow */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setActiveImageIndex(
        activeImageIndex === 0 ? productImages.length - 1 : activeImageIndex - 1
      );
    }}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2 transition-all"
  >
    <ChevronLeft className="w-5 h-5 text-gray-700" />
  </button>

  {/* → Right Arrow */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setActiveImageIndex(
        activeImageIndex === productImages.length - 1 ? 0 : activeImageIndex + 1
      );
    }}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2 transition-all"
  >
    <ChevronRight className="w-5 h-5 text-gray-700" />
  </button>

  {/* Product badges — keep unchanged */}
  <div className="absolute top-4 left-4 flex flex-col space-y-2">
    {product.isNew && (
      <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">New</span>
    )}
    {product.isBestSeller && (
      <span className="px-3 py-1 bg-[#9a8457] text-white text-xs font-medium rounded-full">Best Seller</span>
    )}
    {(product.discount ?? 0) > 0 && (
      <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
        -{product.discount}% OFF
      </span>
    )}
  </div>
</div>

      {/* Metal Variants */}
      {product.variants && Array.isArray(product.variants) && product.variants.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Metal: {product.metal?.metalType || product.metalType || "Select"}
          </label>

          <div className="grid grid-cols-2 gap-3">
            {product.variants.map((variant, index) => {
              const metalTypeRaw = variant.metal?.metalType || variant.metalType || "";
              const metalLabel = metalTypeRaw.replace("18K ", "").replace("14K ", "");
              const hexColor = getMetalColor(metalTypeRaw);
              const gradClass = VARIANT_COLORS[metalLabel] || "bg-gray-200";
              const isActive = product._id === variant._id;

              return (
                <button
                  key={index}
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const res = await axios.get(
                        `${VITE_API_URL}/api/user/ornaments/${variant._id}?currency=${selectedCountry.currency}`
                      );
                      const child = res.data?.ornament;
                      if (!child) return;

                      // Preserve video URL from parent/sibling if current variant doesn't have it
                      const videoUrl = child.videoUrl || hasVideoInFamily || product.videoUrl;

                      setProduct({
                        ...child,
                        variants: product.variants,
                        videoUrl: videoUrl, // Ensure video URL is preserved
                        images: [...(child.images || [])].filter(img => img && img !== child.coverImage),
                      });
                      setActiveImageIndex(0);
                      window.scrollTo(0, 0);
                    } catch (err) {
                      console.error("Variant fetch failed:", err);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className={`
                    p-3 rounded-lg border-2 transition-all font-medium
                    flex items-center justify-center space-x-2
                    ${gradClass}
                    ${isActive ? "border-[#9a8457] scale-[1.03]" : "border-gray-300 hover:border-[#9a8457]"}
                  `}
                  style={{
                    color: isLightHex(hexColor) ? "#000" : "#fff",
                  }}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20"
                    style={{ backgroundColor: hexColor }}
                  ></span>
                  <span>{metalLabel}</span>
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
            className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all relative ${
              activeImageIndex === index
                ? "border-[#9a8457] ring-2 ring-[#9a8457]/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Show video thumbnail with play icon for first image if video exists in family */}
            {hasVideoInFamily && index === 0 ? (
              <>
                <video
                  src={hasVideoInFamily}
                  className="w-full h-full object-cover"
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            if (hasVideoInFamily) {
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
  );
};

export default ProductImageGallery;