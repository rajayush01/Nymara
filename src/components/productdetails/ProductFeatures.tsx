// // components/product/ProductFeatures.tsx
// import React from "react";
// import {
//   MessageCircle,
//   Video,
//   Mail,
//   Truck,
//   RotateCcw,
// } from "lucide-react";

// interface ProductFeaturesProps {
//   setShowDropHintModal: (show: boolean) => void;
// }

// const ProductFeatures: React.FC<ProductFeaturesProps> = ({
//   setShowDropHintModal,
// }) => {
//   const features = [
//     {
//       icon: MessageCircle,
//       title: "Query/Doubt?",
//       description: "Have a query/doubt?",
//       action: () => setShowDropHintModal(true),
//     },
//     {
//       icon: Video,
//       title: "Virtual Consultation",
//       description: "Book a video call",
//       action: () => console.log("Book consultation"),
//     },
//     {
//       icon: Mail,
//       title: "Email Expert",
//       description: "Get personalized advice",
//       action: () => window.open("mailto:expert@jewelry.com"),
//     },
//     {
//       icon: MessageCircle,
//       title: "Live Chat",
//       description: "Chat with specialists",
//       action: () => console.log("Open chat"),
//     },
//     {
//       icon: Truck,
//       title: "Free Shipping",
//       description: "On orders over ₹50,000",
//       action: () => {},
//     },
//     {
//       icon: RotateCcw,
//       title: "30-Day Returns",
//       description: "Easy return policy",
//       action: () => {},
//     },
//   ];

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
//       {features.map((feature, index) => (
//         <button
//           key={index}
//           onClick={feature.action}
//           className="flex flex-col items-center space-y-2 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#9a8457] hover:shadow-sm transition-all group"
//         >
//           <feature.icon className="w-5 h-5 text-gray-600 group-hover:text-[#9a8457]" />
//           <div className="text-center">
//             <div className="text-sm font-medium text-gray-900 group-hover:text-[#9a8457]">
//               {feature.title}
//             </div>
//             <div className="text-xs text-gray-600">{feature.description}</div>
//           </div>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default ProductFeatures;

// components/product/ProductFeatures.tsx
import React, { useState } from "react";
import {
  MessageCircle,
  Video,
  Mail,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import VirtualAppointmentModal from "../layout/VirtualAppointmentModal";

interface ProductFeaturesProps {
  setShowDropHintModal: (show: boolean) => void;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({
  setShowDropHintModal,
}) => {
  const navigate = useNavigate();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const handleVirtualAppointment = () => {
    setIsAppointmentModalOpen(true);
  };

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
      action: () => handleVirtualAppointment(),  // ✅ fixed from onClick={} syntax
    },
    {
      icon: Mail,
      title: "Email Expert",
      description: "Get personalized advice",
      action: () => window.open("mailto:business@nymarajewels.com"),
    },
   {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat on WhatsApp",
      action: () => window.open(`https://wa.me/${+447867089659}`, "_blank"),
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over ₹50,000",
      action: () => navigate("/shippingpolicy"),
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description: "Easy return policy",
      action: () => navigate("/returnpolicy"),
    },
  ];

  return (
    <>
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
              <div className="text-xs text-gray-600">{feature.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Virtual Appointment Modal */}
      <VirtualAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  );
};

export default ProductFeatures;