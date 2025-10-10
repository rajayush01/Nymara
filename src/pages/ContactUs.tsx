import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  Variants,
} from "framer-motion";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const SocialIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconStyles = "h-6 w-6 fill-current";
  const icons: Record<string, string> = {
    instagram: "i",
    facebook: "f",
    youtube: "y",
    pinterest: "p",
  };
  return <div className={iconStyles}>{icons[type] || "?"}</div>;
};

const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const heroControls = useAnimation();
  const infoControls = useAnimation();
  const formControls = useAnimation();

  const heroInView = useInView(heroRef, { once: true });
  const infoInView = useInView(infoRef, { once: true });
  const formInView = useInView(formRef, { once: true });

  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (infoInView) infoControls.start("visible");
    if (formInView) formControls.start("visible");
  }, [heroInView, infoInView, formInView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      setFeedback("Please fill in all required fields ✨");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/contact/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, message }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback("✅ Thank you! Our concierge will reach out soon.");
        setName("");
        setEmail("");
        setPhone("");
        setService("");
        setMessage("");
      } else {
        setFeedback("⚠️ Could not send message. Try again.");
      }
    } catch {
      setFeedback("❌ Server error. Please try later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-[#f9f7f3] to-[#fff9f0] min-h-screen font-[Poppins]">
      <motion.div
        className="fixed w-6 h-6 bg-[#b8a069] rounded-full mix-blend-difference pointer-events-none z-50"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      />

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={fadeInUp}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#9a8457] to-[#b8a069]">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-32 mt-20 text-center">
          <motion.div className="flex justify-center mb-8">
            <SparklesIcon className="h-16 w-16 text-[#f9f7f3]" />
          </motion.div>

          <motion.h1 className="text-5xl md:text-6xl font-light text-white mb-6 font-serif">
            Contact{" "}
            <span className="bg-gradient-to-r from-[#fef6d0] to-white bg-clip-text text-transparent font-medium">
              Nymara Jewels
            </span>
          </motion.h1>

          <p className="text-lg md:text-xl text-[#fefefe] max-w-3xl mx-auto leading-relaxed">
            Let’s create timeless elegance together. Our jewelry experts are here to guide your vision from dream to design.
          </p>
        </div>
      </motion.div>

      {/* Form Section */}
      <div className="max-w-5xl mx-auto py-20 px-4">
        <div className="bg-white/80 border border-[#e8e0c5] rounded-3xl shadow-xl p-10">
          <h3 className="text-3xl font-bold text-[#3a3a3a] mb-6">
            Get in Touch
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e0c5] rounded-lg focus:ring-2 focus:ring-[#b8a069]"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e0c5] rounded-lg focus:ring-2 focus:ring-[#b8a069]"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e0c5] rounded-lg focus:ring-2 focus:ring-[#b8a069]"
            />
            <textarea
              rows={5}
              placeholder="Tell us about your idea or request..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e0c5] rounded-lg focus:ring-2 focus:ring-[#b8a069]"
            />
            {feedback && (
              <div className="p-3 bg-[#fff8e5] border border-[#e8e0c5] text-[#6a5a3f] rounded-lg">
                {feedback}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#9a8457] to-[#b8a069] text-white py-3 rounded-lg font-semibold hover:from-[#8a7547] hover:to-[#a68d5d] transition-all"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
