// // components/product/ProductInfo.tsx
// import React from "react";
// import { Star, ArrowLeft } from "lucide-react";
// import { Product } from "@/contexts/AppContext";

// interface ProductInfoProps {
//   product: Product;
//   amount: number;
//   symbol: string;
//   selectedCountry: any;
//   baseProduct: Product | null;
//   setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
//   setActiveImageIndex: (index: number) => void;
// }

// const ProductInfo: React.FC<ProductInfoProps> = ({
//   product,
//   amount,
//   symbol,
//   selectedCountry,
//   baseProduct,
//   setProduct,
//   setActiveImageIndex,
// }) => {
//   return (
//     <div>
//       {/* Header */}
//       <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
//         {product.name}
//       </h1>
//       <div className="text-sm text-gray-600 mb-4">SKU: {product.sku}</div>

//       {/* Price */}
//       <div className="flex items-center space-x-4 mb-4">
//         <div className="flex items-center space-x-3">
//           <span className="text-3xl font-bold text-gray-900">
//             {symbol}
//             {amount.toLocaleString()}
//           </span>

//           {selectedCountry.currency === "INR" &&
//             (product.originalPrice ?? 0) > (product.price ?? 0) && (
//               <span className="text-xl text-gray-500 line-through">
//                 ₹{(product.originalPrice ?? 0).toLocaleString()}
//               </span>
//             )}

//           {product.makingChargesByCountry &&
//             product.makingChargesByCountry[selectedCountry.currency] && (
//               <div className="mt-2 text-sm text-gray-700">
//                 <span className="font-medium">Making Charges:</span>{" "}
//                 {product.makingChargesByCountry[selectedCountry.currency]
//                   .symbol || (selectedCountry.currency === "INR" ? "₹" : "$")}
//                 {product.makingChargesByCountry[
//                   selectedCountry.currency
//                 ].amount.toLocaleString()}
//               </div>
//             )}

//           {selectedCountry.currency === "INR" &&
//             (product.discount ?? 0) > 0 && (
//               <span className="text-lg font-medium text-green-600">
//                 Save {product.discount ?? 0}%
//               </span>
//             )}
//         </div>
//       </div>

//       {/* Rating */}
//       <div className="flex items-center space-x-2 mb-4">
//         <div className="flex items-center">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               className={`w-4 h-4 ${
//                 i < Math.floor(product.rating ?? 0)
//                   ? "text-yellow-400 fill-current"
//                   : "text-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//         <span className="text-sm text-gray-600">
//           {product.rating} ({product.reviews} Reviews)
//         </span>
//       </div>

//       {/* Stock status */}
//       <div className="flex items-center space-x-2 mb-6">
//         {product.stock ? (
//           <>
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-green-600 text-sm font-medium">
//               In Stock - Ready to Ship
//             </span>
//           </>
//         ) : (
//           <>
//             <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//             <span className="text-red-600 text-sm font-medium">
//               Currently Out of Stock
//             </span>
//           </>
//         )}
//       </div>

//       {/* Back to Base Product Button */}
//       {baseProduct && product._id !== baseProduct._id && (
//   <button
//     onClick={async () => {
//       console.log("🟡 Back to base product clicked");
//       console.log("➡ Current product:", product._id);
//       console.log("➡ Base product:", baseProduct._id);

//       try {
//         const url = `${import.meta.env.VITE_API_URL}/api/user/ornaments/${baseProduct._id}?currency=${selectedCountry.currency}`;

//         console.log("🌐 Fetching base product from:", url);

//         const res = await fetch(url);
//         const data = await res.json();

//         console.log("📦 Backend response for base product:", data);

//         if (!data.success) {
//           console.error("❌ Backend returned error:", data.message);
//           return;
//         }

//         const fullBase = data.ornament;

//         console.log("🔍 Full Base Product Received:", fullBase);

       
//       if (
//   fullBase.metalTotal === undefined ||
//   fullBase.mainDiamondTotal === undefined
// ) {
//   console.warn("⚠ Missing totals on base product!", {
//     metal: fullBase.metalTotal,
//     main: fullBase.mainDiamondTotal,
//     side: fullBase.sideDiamondTotal,
//     gems: fullBase.gemstonesTotal,
//   });
// }

//         // Update product in UI
//         setProduct({
//           ...fullBase,
//           images: [
//             fullBase.coverImage,
//             ...(fullBase.images || []),
//           ].filter(Boolean),
//         });

//         console.log("✅ Base product set successfully in UI");

//         setActiveImageIndex(0);
//         window.scrollTo(0, 0);
//       } catch (err) {
//         console.error("❌ Error loading base product:", err);
//       }
//     }}
//     className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium flex items-center space-x-2"
//   >
//     <ArrowLeft className="w-4 h-4" />
//     <span>Back to Base Product</span>
//   </button>
// )}


//       {/* Price Breakdown */}
//       <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-3 mt-6">
//         <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
//           Price Breakdown
//         </h3>

//         <div className="flex justify-between text-sm py-1">
//           <span className="text-gray-600">Gold Value</span>
//           <span className="font-semibold">
//             {product.currency}{product.metalTotal?.toLocaleString()}
//           </span>
//         </div>

//         <div className="flex justify-between text-sm py-1">
//           <span className="text-gray-600">Main Diamond</span>
//           <span className="font-semibold">
//             {product.currency}{product.mainDiamondTotal?.toLocaleString()}
//           </span>
//         </div>

//         <div className="flex justify-between text-sm py-1">
//           <span className="text-gray-600">Side Diamonds</span>
//           <span className="font-semibold">
//             {product.currency}{product.sideDiamondTotal?.toLocaleString()}
//           </span>
//         </div>

//         <div className="flex justify-between text-sm py-1">
//           <span className="text-gray-600">Gemstones</span>
//           <span className="font-semibold">
//             {product.currency}{product.gemstonesTotal?.toLocaleString()}
//           </span>
//         </div>

//         /* {product.convertedMakingCharge !== undefined && (
//           <div className="flex justify-between text-sm py-1">
//             <span className="text-gray-600">Making Charges</span>
//             <span className="font-semibold">
//               {product.currency}{product.convertedMakingCharge?.toLocaleString()}
//             </span>
//           </div>
//         )} */

//          <div className="flex justify-between text-sm py-1">
//     <span>Making Charges</span>
//     <span>
//       {product?.currency}
//       {product?.convertedMakingCharge?.toLocaleString()}
//     </span>
//   </div>

//         <div className="border-t mt-2 pt-2 flex justify-between text-base font-bold">
//           <span>Total Price</span>
//           <span>
//             {product.currency}{product.totalConvertedPrice?.toLocaleString()}
//           </span>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="bg-gray-50 p-4 rounded-lg mt-6">
//         <p className="text-gray-700 leading-relaxed">{product.description}</p>
//       </div>
//     </div>
//   );




import React, { useEffect } from "react";
import { Star, ArrowLeft } from "lucide-react";
import { Product } from "@/contexts/AppContext";

interface ProductInfoProps {
  product: Product;
  amount: number;
  symbol: string;
  selectedCountry: any;
  baseProduct: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  setActiveImageIndex: (index: number) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  amount,
  symbol,
  selectedCountry,
  baseProduct,
  setProduct,
  setActiveImageIndex,
}) => {

 

 

  useEffect(() => {
    console.log(" ProductInfo mounted or updated");
  }, [product, baseProduct]);

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {product?.name}
      </h1>
      <div className="text-sm text-gray-600 mb-4">
        SKU: {product?.sku}
      </div>

      {/* Price */}
    <div className="flex items-center space-x-4 mb-4">
  <div className="flex items-center space-x-3">
    {/* <span className="text-3xl font-bold text-gray-900">
      {product?.currency}
      {product?.totalConvertedPrice?.toLocaleString()}
    </span> */}

         <span className="text-3xl font-bold text-gray-900">
  {product?.currency}
  {Number(
    product?.currency === "₹"
      ? product?.totalConvertedPrice
      : product?.displayPrice
  ).toLocaleString()}
</span>
  </div>
</div>

      {/* Back to Base Product Button */}
      {baseProduct && product?._id !== baseProduct?._id && (
        <button
          onClick={async () => {
           

            try {
              if (!baseProduct?._id) {
                console.error(" Base product ID missing!");
                return;
              }

              const url = `${import.meta.env.VITE_API_URL}/api/user/ornaments/${baseProduct._id}?currency=${selectedCountry.currency}`;

            ;

              const res = await fetch(url);

            

              if (!res.ok) {
                const text = await res.text();
                console.error("❌ Non-200 response:", text);
                return;
              }

              const data = await res.json();

              console.log(" Backend full response:", data);

              if (!data.success) {
                console.error(" Backend success=false:", data.message);
                return;
              }

              const fullBase = data.ornament;

              console.log(" Received ornament object:", fullBase);

              if (
                fullBase.metalTotal === undefined ||
                fullBase.mainDiamondTotal === undefined
              ) {
                console.warn("⚠ Missing breakdown totals!", {
                  metal: fullBase.metalTotal,
                  main: fullBase.mainDiamondTotal,
                  side: fullBase.sideDiamondTotal,
                  gems: fullBase.gemstonesTotal,
                });
              }

              console.log(" Updating UI with base product...");

              setProduct({
                ...fullBase,
                images: [
                  fullBase.coverImage,
                  ...(fullBase.images || []),
                ].filter(Boolean),
              });

              setActiveImageIndex(0);
              window.scrollTo(0, 0);

              console.log(" UI updated successfully");
            } catch (err) {
              console.error(" Fetch crashed:", err);
            }

            console.log("======================================");
          }}
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Base Product</span>
        </button>
      )}

      {/* Price Breakdown */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-3 mt-6">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
          Price Breakdown
        </h3>

        {/* <div className="flex justify-between text-sm py-1">
          <span>Gold Value</span>
          <span>
            {product?.currency}
            {product?.metalTotal?.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm py-1">
          <span>Main Diamond</span>
          <span>
            {product?.currency}
            {product?.mainDiamondTotal?.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm py-1">
          <span>Side Diamonds</span>
          <span>
            {product?.currency}
            {product?.sideDiamondTotal?.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm py-1">
          <span>Gemstones</span>
          <span>
            {product?.currency}
            {product?.gemstonesTotal?.toLocaleString()}
          </span>
        </div>


         
  <div className="flex justify-between text-sm py-1">
    <span>Making Charges</span>
    <span>
      {product?.currency}
      {product?.convertedMakingCharge?.toLocaleString()}
    </span>
  </div> */}

             {selectedCountry.currency === "INR" && (
  <>
    <div className="flex justify-between text-sm py-1">
      <span>Gold Value</span>
      <span>
        {product?.currency}
        {Number(product?.metalTotal ?? 0).toLocaleString()}
      </span>
    </div>

    <div className="flex justify-between text-sm py-1">
      <span>Main Diamond</span>
      <span>
        {product?.currency}
        {Number(product?.mainDiamondTotal ?? 0).toLocaleString()}
      </span>
    </div>

    <div className="flex justify-between text-sm py-1">
      <span>Side Diamonds</span>
      <span>
        {product?.currency}
        {Number(product?.sideDiamondTotal ?? 0).toLocaleString()}
      </span>
    </div>

    <div className="flex justify-between text-sm py-1">
      <span>Gemstones</span>
      <span>
        {product?.currency}
        {Number(product?.gemstonesTotal ?? 0).toLocaleString()}
      </span>
    </div>

    <div className="flex justify-between text-sm py-1">
      <span>Making Charges</span>
      <span>
        {product?.currency}
        {Number(product?.convertedMakingCharge ?? 0).toLocaleString()}
      </span>
    </div>
  </>
)}

          <div className="flex justify-between text-base font-bold border-t pt-2">
          <span>Total Price</span>
          <span>
  {product?.currency}
  {Number(
    selectedCountry.currency === "INR"
      ? product?.totalConvertedPrice
      : product?.displayPrice
  ).toLocaleString()}
</span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;

// };

// export default ProductInfo;
