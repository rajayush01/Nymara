// // components/product/ProductDetailsSection.tsx
// import React from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { Product } from "@/contexts/AppContext";

// interface ProductDetailsSectionProps {
//   product: Product;
//   expandedDetails: boolean;
//   setExpandedDetails: (expanded: boolean) => void;
// }

// const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
//   product,
//   expandedDetails,
//   setExpandedDetails,
// }) => {
//   const itemDetails = [
//     {
//       label: "SKU",
//       value:
//         product.sku || `JW${product._id.toString().slice(-5).toUpperCase()}`,
//     },
//     {
//       label: "Category",
//       value: Array.isArray(product.category)
//         ? product.category.join(", ")
//         : product.category || "Jewelry",
//     },
//     { label: "Style", value: product.style || "—" },
//     { label: "Metal Type", value: product.metalType || "—" },
//     { label: "Stone Type", value: product.stoneType || "—" },
//     { label: "Color", value: product.color || "—" },
//     {
//       label: "Rating",
//       value:
//         (product.reviews ?? 0) > 0
//           ? `${product.rating ?? 0}/5 (${product.reviews} reviews)`
//           : "No reviews yet",
//     },
//     {
//       label: "Availability",
//       value: (product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock",
//     },
//   ];

//   return (
//     <div className="mt-16 space-y-8">
//       <div className="bg-white rounded-xl border border-gray-200">
//         <button
//           onClick={() => setExpandedDetails(!expandedDetails)}
//           className="w-full flex items-center justify-between p-8 text-left"
//         >
//           <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
//           {expandedDetails ? (
//             <ChevronUp className="w-6 h-6 text-gray-600" />
//           ) : (
//             <ChevronDown className="w-6 h-6 text-gray-600" />
//           )}
//         </button>

//         {expandedDetails && (
//           <div className="px-6 md:px-8 py-8 bg-gradient-to-b from-gray-50 to-white">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
//               {/* Specifications */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
//                   SPECIFICATIONS
//                 </h3>
//                 <div className="space-y-1">
//                   {itemDetails.map((detail, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded transition-colors"
//                     >
//                       <span className="text-gray-600 text-sm font-medium">
//                         {detail.label}
//                       </span>
//                       <span className="font-semibold text-gray-900 text-sm">
//                         {detail.value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                    {product.diamondDetails && (
//   <div className="mt-6 pt-6 border-t border-gray-200">
//     <h4 className="text-lg font-bold text-gray-900 mb-4">
//       DIAMOND DETAILS
//     </h4>
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg border border-gray-200">
//       {Object.entries(product.diamondDetails)
//         .filter(([key]) => key !== "useAuto")
//         .map(([key, value]) => (
//           <div
//             key={key}
//             className="flex justify-between py-2 border-b border-gray-200 last:border-0"
//           >
//             <span className="text-gray-600 text-sm font-medium capitalize">
//               {key
//                 .replace(/([A-Z])/g, " $1")
//                 .replace(/^./, str => str.toUpperCase())}
//             </span>
//             <span className="font-semibold text-gray-900 text-sm">
//               {String(value)}
//             </span>
//           </div>
//         ))}
//     </div>
//   </div>
// )}

//          {Array.isArray(product.sideDiamondDetails) &&
//  product.sideDiamondDetails.some(diamond =>
//    Object.values(diamond).some(value => Number(value) > 0)
//  ) && (
//   <div className="mt-6 pt-6 border-t border-gray-200">
//     <h4 className="text-lg font-bold text-gray-900 mb-4">
//       SIDE DIAMOND DETAILS
//     </h4>

//     {product.sideDiamondDetails.map((diamond, index) => {
//       const hasValue = Object.values(diamond).some(
//         value => Number(value) > 0
//       );

//       if (!hasValue) return null;

//       return (
//         <div
//           key={index}
//           className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg border border-gray-200 mb-4"
//         >
//           {Object.entries(diamond)
//             .filter(([key, value]) => Number(value) > 0)
//             .map(([key, value]) => (
//               <div
//                 key={key}
//                 className="flex justify-between py-2 border-b border-gray-200 last:border-0"
//               >
//                 <span className="text-gray-600 text-sm font-medium capitalize">
//                   {key
//                     .replace(/([A-Z])/g, " $1")
//                     .replace(/^./, str => str.toUpperCase())}
//                 </span>
//                 <span className="font-semibold text-gray-900 text-sm">
//                   {String(value)}
//                 </span>
//               </div>
//             ))}
//         </div>
//       );
//     })}

//               </div>

//               {/* Care Instructions & Warranty */}
//               <div className="space-y-6">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
//                     CARE INSTRUCTIONS
//                   </h3>
//                   <div className="space-y-3">
//                     {[
//                       "Store in provided jewelry box or soft pouch",
//                       "Clean with soft, lint-free cloth after each wear",
//                       "Avoid contact with perfumes, lotions, and chemicals",
//                       "Remove before swimming, exercising, or sleeping",
//                       "Have professionally cleaned and inspected annually",
//                       "Keep away from extreme temperatures",
//                     ].map((instruction, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
//                       >
//                         <span className="text-gray-900 font-bold mt-0.5">
//                           •
//                         </span>
//                         <p className="text-sm text-gray-700 leading-relaxed">
//                           {instruction}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
//                     WARRANTY & RETURNS
//                   </h3>
//                   <div className="space-y-3">
//                     {[
//                       "Lifetime warranty against manufacturing defects",
//                       "30-day return policy for full refund",
//                       "Free resizing within 60 days of purchase",
//                       "Complimentary professional cleaning service",
//                     ].map((warranty, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
//                       >
//                         <span className="text-gray-900 font-bold mt-0.5">
//                           •
//                         </span>
//                         <p className="text-sm text-gray-700 leading-relaxed">
//                           {warranty}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsSection;

// components/product/ProductDetailsSection.tsx
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Product } from "@/contexts/AppContext";

interface ProductDetailsSectionProps {
  product: Product;
  expandedDetails: boolean;
  setExpandedDetails: (expanded: boolean) => void;
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  product,
  expandedDetails,
  setExpandedDetails,
}) => {
  // const itemDetails = [
  //   {
  //     label: "SKU",
  //     value:
  //       product.sku || `JW${product._id.toString().slice(-5).toUpperCase()}`,
  //   },
  //   {
  //     label: "Category",
  //     value: Array.isArray(product.category)
  //       ? product.category.join(", ")
  //       : product.category || "Jewelry",
  //   },
  //   { label: "Style", value: product.style || "—" },
  //   { label: "Metal Type", value: product.metalType || "—" },
  //   { label: "Stone Type", value: product.stoneType || "—" },
  //   { label: "Color", value: product.color || "—" },
  //   {
  //     label: "Rating",
  //     value:
  //       (product.reviews ?? 0) > 0
  //         ? `${product.rating ?? 0}/5 (${product.reviews} reviews)`
  //         : "No reviews yet",
  //   },
  //   {
  //     label: "Availability",
  //     value: (product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock",
  //   },
  // ];

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

    // ✅ FIXED METAL TYPE
    {
      label: "Metal Type",
      value: product.metal?.metalType || "—",
    },

    // ✅ ADD PURITY
    {
      label: "Purity",
      value: product.metal?.purity || "—",
    },

    // ✅ ADD WEIGHT
    {
      label: "Metal Weight",
      value: product.metal?.weight ? `${product.metal.weight} g` : "—",
    },

    { label: "Stone Type", value: product.stoneType || "—" },
    { label: "Color", value: product.color || "—" },

    {
      label: "Availability",
      value: (product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock",
    },
  ];

  return (
    <div className="mt-16 space-y-8">
      {/* <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <p>{product?.description}</p>
      </div> */}
      <div className="bg-white rounded-xl border border-gray-200">
        <button
          onClick={() => setExpandedDetails(!expandedDetails)}
          className="w-full flex items-center justify-between p-8 text-left"
        >
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          {expandedDetails ? (
            <ChevronUp className="w-6 h-6 text-gray-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {expandedDetails && (
          <div className="px-6 md:px-8 py-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="bg-gray-50 p-4 rounded-lg mt-1 mb-2">
                <p>{product?.description}</p>
              </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
              

              {/* Specifications */}
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

                {/* Diamond Details */}
                {product.diamondDetails && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      DIAMOND DETAILS
                    </h4>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg border border-gray-200">
                      {Object.entries(product.diamondDetails)
                        .filter(([key]) => key !== "useAuto") // 🚀 hide useAuto
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                          >
                            <span className="text-gray-600 text-sm font-medium capitalize">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </span>
                            <span className="font-semibold text-gray-900 text-sm">
                              {String(value)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Side Diamond Details */}
                {/* {product.sideDiamondDetails && (
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
                )} */}

                {/* Side Diamond Details */}
                {Array.isArray(product.sideDiamondDetails) &&
                  product.sideDiamondDetails.some((diamond) =>
                    Object.values(diamond).some((value) => Number(value) > 0),
                  ) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        SIDE DIAMOND DETAILS
                      </h4>

                      {product.sideDiamondDetails.map((diamond, index) => {
                        const hasValue = Object.values(diamond).some(
                          (value) => Number(value) > 0,
                        );

                        if (!hasValue) return null;

                        return (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg border border-gray-200 mb-4"
                          >
                            {Object.entries(diamond)
                              .filter(([key, value]) => Number(value) > 0)
                              .map(([key, value]) => (
                                <div
                                  key={key}
                                  className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                                >
                                  <span className="text-gray-600 text-sm font-medium capitalize">
                                    {key
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (str) =>
                                        str.toUpperCase(),
                                      )}
                                  </span>
                                  <span className="font-semibold text-gray-900 text-sm">
                                    {String(value)}
                                  </span>
                                </div>
                              ))}
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>

              {/* Care Instructions & Warranty */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
                    CARE INSTRUCTIONS
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Store in provided jewelry box or soft pouch",
                      "Clean with soft, lint-free cloth after each wear",
                      "Avoid contact with perfumes, lotions, and chemicals",
                      "Remove before swimming, exercising, or sleeping",
                      "Have professionally cleaned and inspected annually",
                      "Keep away from extreme temperatures",
                    ].map((instruction, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="text-gray-900 font-bold mt-0.5">
                          •
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {instruction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
                    WARRANTY & RETURNS
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Lifetime warranty against manufacturing defects",
                      "15-day return policy for full refund",
                      "All our Jewelry is crafted with Hallmarked 14KT and 18KT Gold",
                      "You will receive an IGI Certificate for all 1+ Carat Diamonds.",
                    ].map((warranty, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="text-gray-900 font-bold mt-0.5">
                          •
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {warranty}
                        </p>
                      </div>
                    ))}
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

export default ProductDetailsSection;
