import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import ProductCategories from "@/components/home/ProductCategories";
// import EducationHubHome from "@/components/home/EducationHubHome";
import DiamondShowcase from "@/components/home/DiamondShowcase";
import Model from "@/components/home/Model";
import RingDesigner from "@/components/home/RingDesigner";
import ImageFanDynamic from "@/components/home/CardTypes";
import JewelryCollage from "@/components/home/JewelleryCollage";
import { Mail, MessageCircle, Phone, X } from "lucide-react";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
} as const;

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.8,
    },
  },
} as const;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 0.8,
    },
  },
} as const;

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: {
      duration: 0.2,
    }
  }
};

const SectionWrapper = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={sectionVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

// Email Popup Component
const EmailPopup = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      // Handle email submission here
      console.log("Email submitted:", email);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+1234567890"; // Replace with your phone number
  };

  const handleChat = () => {
    // Replace with your chat/WhatsApp link
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        variants={popupVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="relative h-64 md:h-auto bg-gradient-to-br from-amber-100 via-rose-50 to-purple-100">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-6xl">💎</span>
                </div>
                <h3 className="text-2xl font-serif text-gray-800 mb-2">Exquisite Jewelry</h3>
                <p className="text-gray-600 italic">Timeless Elegance</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 md:p-10">
            {!submitted ? (
              <>
                <div className="mb-6">
                  <h2 className="text-3xl font-serif text-gray-800 mb-3">
                    Discover Luxury
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Join our exclusive collection and receive special offers, new arrivals, and jewelry care tips directly to your inbox.
                  </p>
                </div>

                {/* Email Form */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-rose-600 transition-all shadow-md hover:shadow-lg"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or connect with us</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleCall}
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all group"
                  >
                    <Phone className="w-5 h-5 text-gray-600 group-hover:text-amber-600" />
                    <span className="font-medium text-gray-700 group-hover:text-amber-700">Call Us</span>
                  </button>
                  <button
                    onClick={handleChat}
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
                  >
                    <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                    <span className="font-medium text-gray-700 group-hover:text-green-700">Chat</span>
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600 text-center">
                  You're now part of our exclusive collection.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show popup after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="overflow-hidden bg-white"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Hero Section */}
        <motion.div id="hero-section" variants={fadeIn}>
          <HeroSection />
        </motion.div>

        <SectionWrapper>
          <ImageFanDynamic />
        </SectionWrapper>

        <SectionWrapper>
          <RingDesigner />
        </SectionWrapper>

        <SectionWrapper>
          <Model />
        </SectionWrapper>

        <SectionWrapper>
          <JewelryCollage />
        </SectionWrapper>

        <SectionWrapper>
          <div id="products">
            <ProductCategories />
          </div>
        </SectionWrapper>

        {/* Email Popup */}
        <AnimatePresence>
          {showPopup && <EmailPopup onClose={() => setShowPopup(false)} />}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;