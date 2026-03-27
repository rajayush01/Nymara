// import React, { useState, useEffect } from "react";
// import { X, Diamond, ArrowRight, Upload, MessageCircle } from "lucide-react";
// import axios from "axios";

// interface CustomizeJewelryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CustomizeJewelryModal: React.FC<CustomizeJewelryModalProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showThankYou, setShowThankYou] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const [customOptions, setCustomOptions] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     inspiration: "",
//     specialRequests: "",
//     images: [] as string[],
//   });

//   // Close modal on escape
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//       document.body.style.overflow = "hidden";
//     }
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   // Handle image uploads and convert to base64
//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     setUploading(true);

//     const base64Promises = Array.from(files).map(
//       (file) =>
//         new Promise<string>((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onload = () => resolve(reader.result as string);
//           reader.onerror = reject;
//           reader.readAsDataURL(file); // convert to base64
//         })
//     );

//     const base64Images = await Promise.all(base64Promises);

//     setCustomOptions((prev) => ({
//       ...prev,
//       images: [...prev.images, ...base64Images],
//     }));

//     setUploading(false);
//   };

//   // Handle submit → send to backend
//  const handleSubmit = async () => {
//   console.log("🚀 Submit clicked");

//   // 🔴 validation
//   if (!customOptions.name || !customOptions.email || !customOptions.phone) {
//     alert("Please fill all required fields");
//     return;
//   }

//   try {
//     const endpoint =
//       "https://lets-taxify.onrender.com/api/nymara/contact/custom";

//     const payload = {
//       name: customOptions.name,
//       email: customOptions.email,
//       phone: customOptions.phone,
//       inspiration: customOptions.inspiration,
//       specialRequests: customOptions.specialRequests,
//       images: customOptions.images,
//     };

//     console.log("📤 Sending payload:", payload);
//     console.log("🌐 Endpoint:", endpoint);

//     const res = await axios.post(endpoint, payload, {
//       timeout: 10000,
//     });

//     console.log("✅ Response:", res.data);

//     if (res.data?.success) {
//       setShowThankYou(true);
//     } else {
//       alert(res.data?.message || "Something went wrong");
//     }

//   } catch (error: any) {
//     console.error("❌ FULL ERROR:", error);

//     if (error.response) {
//       console.error("❌ Backend Error:", error.response.data);
//       alert(error.response.data?.message || "Server error");
//     } else if (error.request) {
//       console.error("❌ No response received");
//       alert("Server not reachable");
//     } else {
//       alert("Unexpected error");
//     }
//   }
// };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && currentStep === 2) {
//       handleSubmit();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
//       <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">
//         {/* Header */}
//      <div className="relative bg-gradient-to-r from-[#9a8457] to-[#b8a069] text-white p-3 sm:p-6 text-xs sm:text-base">

//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
//           >
//         <X className="w-4 h-4 sm:w-5 sm:h-5" />

//           </button>

//           <div className="flex items-center space-x-3 mb-4">
//             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
//               <Diamond className="w-5 h-5 sm:w-6 sm:h-6" />
//             </div>
//             <div>
//               <h2 className="text-xl sm:text-2xl font-bold">Craft Your Model</h2>
//               <p className="text-sm sm:text-base text-white/90">
//                 Create your perfect piece with our experts
//               </p>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="flex items-center space-x-2">
//             {[1, 2].map((step) => (
//               <div key={step} className="flex items-center">
//                 <div
//                   className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                     currentStep >= step
//                       ? "bg-white text-[#9a8457]"
//                       : "bg-white/20 text-white"
//                   }`}
//                 >
//                   {step}
//                 </div>
//                 {step < 2 && (
//                   <div
//                     className={`w-6 sm:w-8 h-0.5 ${
//                       currentStep > step ? "bg-white" : "bg-white/20"
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-3 sm:p-6 flex-1 overflow-y-auto text-xs sm:text-base leading-relaxed">

//           {/* Step 1 */}
//           {currentStep === 1 && !showThankYou && (
//             <div>
//               <div className="text-center mb-4 sm:mb-6">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
//                   Your Vision
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-600">
//                   Share your inspiration and any special requests
//                 </p>
//               </div>

//               <div className="space-y-4 sm:space-y-6">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
//                     Inspiration & Vision
//                   </h4>
//                   <textarea
//                     value={customOptions.inspiration}
//                     onChange={(e) =>
//                       setCustomOptions({
//                         ...customOptions,
//                         inspiration: e.target.value,
//                       })
//                     }
//                     placeholder="Describe your vision..."
//                     rows={4}
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457]"
//                   />
//                 </div>

//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
//                     Special Requests
//                   </h4>
//                   <textarea
//                     value={customOptions.specialRequests}
//                     onChange={(e) =>
//                       setCustomOptions({
//                         ...customOptions,
//                         specialRequests: e.target.value,
//                       })
//                     }
//                     placeholder="Any engravings or specific requirements..."
//                     rows={3}
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457]"
//                   />
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
//                     Reference Images (Optional)
//                   </h4>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center hover:border-[#9a8457] transition-colors">
//                     <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2 sm:mb-3" />
//                     <p className="text-sm sm:text-base text-gray-600 mb-2">
//                       Upload inspiration images or sketches
//                     </p>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handleFileUpload}
//                       id="upload-input"
//                       className="hidden"
//                     />
//                     <label
//                       htmlFor="upload-input"
//                       className="text-sm sm:text-base text-[#9a8457] hover:text-[#8a7547] font-medium cursor-pointer"
//                     >
//                       {uploading ? "Uploading..." : "Choose Files"}
//                     </label>

//                     {/* Preview uploaded images */}
//                     {customOptions.images.length > 0 && (
//                       <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
//                         {customOptions.images.map((img, i) => (
//                           <img
//                             key={i}
//                             src={img}
//                             alt={`upload-${i}`}
//                             className="w-full h-20 sm:h-24 object-cover rounded-lg border"
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2 */}
//           {currentStep === 2 && !showThankYou && (
//             <div onKeyDown={handleKeyPress}>
//               <div className="text-center mb-4 sm:mb-6">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
//                   Your Details
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-600">
//                   Please share your contact information so our team can reach
//                   out
//                 </p>
//               </div>

//               <div className="space-y-4 sm:space-y-6">
//                 <div>
//                   <label className="font-medium text-gray-900 mb-2 block text-sm sm:text-base">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     value={customOptions.name}
//                     onChange={(e) =>
//                       setCustomOptions({
//                         ...customOptions,
//                         name: e.target.value,
//                       })
//                     }
//                     placeholder="Your name"
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457]"
//                   />
//                 </div>

//                 <div>
//                   <label className="font-medium text-gray-900 mb-2 block text-sm sm:text-base">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value={customOptions.email}
//                     onChange={(e) =>
//                       setCustomOptions({
//                         ...customOptions,
//                         email: e.target.value,
//                       })
//                     }
//                     placeholder="you@example.com"
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457]"
//                   />
//                 </div>

//                 <div>
//                   <label className="font-medium text-gray-900 mb-2 block text-sm sm:text-base">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     value={customOptions.phone}
//                     onChange={(e) =>
//                       setCustomOptions({
//                         ...customOptions,
//                         phone: e.target.value,
//                       })
//                     }
//                     placeholder="Your contact number"
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457]"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Thank You Message */}
//           {showThankYou && (
//             <div className="text-center py-12 sm:py-20">
//               <Diamond className="w-10 h-10 sm:w-12 sm:h-12 text-[#9a8457] mx-auto mb-4" />
//               <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
//                 Thank You!
//               </h3>
//               <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
//                 Our jewelry experts will reach out to you shortly to discuss
//                 your dream design.
//               </p>
//               <button
//                 onClick={onClose}
//                 className="bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
//               >
//                 Close
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {!showThankYou && (
//         <div className="border-t border-gray-200 p-3 sm:p-6 bg-gray-50 text-xs sm:text-base">

//             <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
//               {currentStep > 1 ? (
//                 <button
//                   onClick={() => setCurrentStep(1)}
//                   className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   Back
//                 </button>
//               ) : (
//                 <div className="hidden sm:block" />
//               )}

//               {currentStep === 1 ? (
//                 <button
//                   onClick={() => setCurrentStep(2)}
//                   className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
//                 >
//                   <span>Next Step</span>
//                   <ArrowRight className="w-4 h-4" />
//                 </button>
//               ) : (
//                 <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-3">
//                   <button className="flex items-center justify-center space-x-2 border border-[#9a8457] text-[#9a8457] px-4 sm:px-6 py-3 rounded-lg hover:bg-[#9a8457]/5 transition-colors text-sm sm:text-base">
//                     <MessageCircle className="w-4 h-4" />
//                     <span>Chat with Expert</span>
//                   </button>
//                   <button
//                     onClick={handleSubmit}
//                     className="flex items-center justify-center space-x-2 bg-[#9a8457] text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
//                   >
//                     <Diamond className="w-4 h-4" />
//                     <span>Submit Request</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { X, Diamond, ArrowRight, Upload, MessageCircle } from "lucide-react";
import axios from "axios";

interface CustomizeJewelryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomizeJewelryModal: React.FC<CustomizeJewelryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [customOptions, setCustomOptions] = useState({
    name: "",
    email: "",
    phone: "",
    inspiration: "",
    specialRequests: "",
    images: [] as string[],
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setShowThankYou(false);
      setErrorMessage("");
      setCustomOptions({
        name: "",
        email: "",
        phone: "",
        inspiration: "",
        specialRequests: "",
        images: [],
      });
    }
  }, [isOpen]);

  // Close modal on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // // Handle image uploads and convert to base64
  // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (!files) return;

  //   setUploading(true);

  //   const base64Promises = Array.from(files).map(
  //     (file) =>
  //       new Promise<string>((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.onload = () => resolve(reader.result as string);
  //         reader.onerror = reject;
  //         reader.readAsDataURL(file); // convert to base64
  //       })
  //   );

  //   const base64Images = await Promise.all(base64Promises);

  //   setCustomOptions((prev) => ({
  //     ...prev,
  //     images: [...prev.images, ...base64Images],
  //   }));

  //   setUploading(false);
  // };

  const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 500; //  reduced from 800

        //  prevent upscaling
        const scale = Math.min(1, MAX_WIDTH / img.width);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        //  strong compression
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.4);

        resolve(compressedBase64);
      };

      img.onerror = reject;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  setUploading(true);
  setErrorMessage("");

  try {
    // 🚨 Limit number of images
    const totalImages = customOptions.images.length + files.length;
    if (totalImages > 4) {
      setErrorMessage("You can upload maximum 4 images");
      setUploading(false);
      return;
    }

    // 🚨 Validate + compress
    const compressedImages = await Promise.all(
      Array.from(files).map(async (file) => {
        // limit size (before compression)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Each image must be less than 5MB");
        }

        return await compressImage(file);
      })
    );

    setCustomOptions((prev) => ({
      ...prev,
      images: [...prev.images, ...compressedImages],
    }));
  } catch (error: any) {
    setErrorMessage(error.message || "Image upload failed");
  }

  setUploading(false);
};

  // Handle submit → send to backend
 const handleSubmit = async () => {
  console.log("🚀 Submit clicked");

  // 🔴 validation
 if (!customOptions.name || !customOptions.email || !customOptions.phone) {
  setErrorMessage("Please fill all required fields");
  return;
}

  try {
    const endpoint =
      "https://lets-taxify.onrender.com/api/nymara/contact/custom";

    const payload = {
      name: customOptions.name,
      email: customOptions.email,
      phone: customOptions.phone,
      inspiration: customOptions.inspiration,
      specialRequests: customOptions.specialRequests,
      images: customOptions.images,
    };

    console.log("📤 Sending payload:", payload);
    console.log("🌐 Endpoint:", endpoint);

    const res = await axios.post(endpoint, payload, {
      timeout: 10000,
    });

    console.log("✅ Response:", res.data);

    if (res.data?.success) {
      setShowThankYou(true);
    } else {
     ;
      setErrorMessage(res.data?.message || "Something went wrong");
    }

  } catch (error: any) {
    console.error("❌ FULL ERROR:", error);

    if (error.response) {
      console.error("❌ Backend Error:", error.response.data);
     
      setErrorMessage(error.response.data?.message || "Server error");
    } else if (error.request) {
      console.error("❌ No response received");
      setErrorMessage("Server not rechable");
    
    } else {
     
      setErrorMessage("unexpected error");
    }
  }
};

  const handleChatWithExpert = () => {
    const { name, email, phone, inspiration, specialRequests } = customOptions;

    const lines: string[] = ["Hi, I'd like to discuss a custom jewelry piece:"];
    if (name)            lines.push(`👤 Name: ${name}`);
    if (email)           lines.push(`📧 Email: ${email}`);
    if (phone)           lines.push(`📞 Phone: ${phone}`);
    if (inspiration)     lines.push(`💡 Vision: ${inspiration}`);
    if (specialRequests) lines.push(`✨ Special Requests: ${specialRequests}`);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/447867089659?text=${message}`, "_blank");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentStep === 2) {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
     <div className="relative bg-gradient-to-r from-[#9a8457] to-[#b8a069] text-white p-3 sm:p-6 text-xs sm:text-base">

          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />

          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Diamond className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Craft Your Model</h2>
              <p className="text-sm sm:text-base text-white/90">
                Create your perfect piece with our experts
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-white text-[#9a8457]"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {step}
                </div>
                {step < 2 && (
                  <div
                    className={`w-6 sm:w-8 h-0.5 ${
                      currentStep > step ? "bg-white" : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6 flex-1 overflow-y-auto text-xs sm:text-base leading-relaxed">

          {/* Step 1 */}
          {currentStep === 1 && !showThankYou && (
            <div>
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Your Vision
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Share your inspiration and any special requests
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                    Inspiration & Vision
                  </h4>
                  <textarea
                    value={customOptions.inspiration}
                    onChange={(e) =>
                      setCustomOptions({
                        ...customOptions,
                        inspiration: e.target.value,
                      })
                    }
                    placeholder="Describe your vision..."
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457]"
                  />
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                    Special Requests
                  </h4>
                  <textarea
                    value={customOptions.specialRequests}
                    onChange={(e) =>
                      setCustomOptions({
                        ...customOptions,
                        specialRequests: e.target.value,
                      })
                    }
                    placeholder="Any engravings or specific requirements..."
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457]"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                    Reference Images (Optional)
                  </h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center hover:border-[#9a8457] transition-colors">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2 sm:mb-3" />
                    <p className="text-sm sm:text-base text-gray-600 mb-2">
                      Upload inspiration images or sketches
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      id="upload-input"
                      className="hidden"
                    />
                    <label
                      htmlFor="upload-input"
                      className="text-sm sm:text-base text-[#9a8457] hover:text-[#8a7547] font-medium cursor-pointer"
                    >
                      {uploading ? "Uploading..." : "Choose Files"}
                    </label>

                    {/* Preview uploaded images */}
                    {/* Preview uploaded images */}
{customOptions.images.length > 0 && (
  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
    {customOptions.images.map((img, i) => (
      <div key={i} className="relative group">
        <img
          src={img}
          alt={`upload-${i}`}
          className="w-full h-20 sm:h-24 object-cover rounded-lg border"
        />

        {/* ❌ Remove button */}
        <button
          onClick={() => {
            setCustomOptions((prev) => ({
              ...prev,
              images: prev.images.filter((_, index) => index !== i),
            }));
          }}
          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    ))}
  </div>
)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && !showThankYou && (
            <div onKeyDown={handleKeyPress}>
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Your Details
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Please share your contact information so our team can reach
                  out
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="font-medium text-gray-900 mb-2 block text-sm sm:text-base">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={customOptions.name}
                    onChange={(e) =>
                      setCustomOptions({
                        ...customOptions,
                        name: e.target.value,
                      })
                    }
                    placeholder="Your name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457]"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-900 mb-2 block text-sm sm:text-base">
                    Email
                  </label>
                  <input
                    type="email"
                    value={customOptions.email}
                    onChange={(e) =>
                      setCustomOptions({
                        ...customOptions,
                        email: e.target.value,
                      })
                    }
                    placeholder="you@example.com"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457]"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-900 mb-2 block text-sm sm:text-base">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customOptions.phone}
                    onChange={(e) =>
                      setCustomOptions({
                        ...customOptions,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Your contact number"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Thank You Message */}
          {showThankYou && (
            <div className="text-center py-12 sm:py-20">
              <Diamond className="w-10 h-10 sm:w-12 sm:h-12 text-[#9a8457] mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
                Our jewelry experts will reach out to you shortly to discuss
                your dream design.
              </p>
              <button
                onClick={onClose}
                className="bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!showThankYou && (
        <div className="border-t border-gray-200 p-3 sm:p-6 bg-gray-50 text-xs sm:text-base">

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}

              {currentStep === 1 ? (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleChatWithExpert}
                    className="flex items-center justify-center space-x-2 border border-[#9a8457] text-[#9a8457] px-4 sm:px-6 py-3 rounded-lg hover:bg-[#9a8457]/5 transition-colors text-sm sm:text-base">
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat with Expert</span>
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center space-x-2 bg-[#9a8457] text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
                  >
                    <Diamond className="w-4 h-4" />
                    <span>Submit Request</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

     
{errorMessage && (
  <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6 text-center">
      
      <h3 className="text-lg font-semibold text-red-600 mb-2">
        Something went wrong
      </h3>

      <p className="text-gray-600 mb-4 text-sm">
        {errorMessage}
      </p>

      <button
        onClick={() => setErrorMessage("")}
        className="bg-[#9a8457] text-white px-5 py-2 rounded-lg hover:bg-[#8a7547]"
      >
        Okay
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default CustomizeJewelryModal;

// export default CustomizeJewelryModal;
