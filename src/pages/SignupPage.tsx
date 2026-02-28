import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import logomain from "@/assets/logo_main1.png";
import axios from "axios";
import TermsAndCondition1 from "@/components/TermsAndCondition1";
const countries = [
  { code: "IN", flag: "🇮🇳", dialCode: "+91" },
  { code: "US", flag: "🇺🇸", dialCode: "+1" },
  { code: "GB", flag: "🇬🇧", dialCode: "+44" },
  { code: "CA", flag: "🇨🇦", dialCode: "+1" },
  { code: "AE", flag: "🇦🇪", dialCode: "+971" },
  { code: "AU", flag: "🇦🇺", dialCode: "+61" },
  { code: "SG", flag: "🇸🇬", dialCode: "+65" },
  { code: "JP", flag: "🇯🇵", dialCode: "+81" },
];

const API_URL = import.meta.env.VITE_API_URL;

type SignupPageProps = {
  onSwitchToLogin: () => void;
};
type Ripple = {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
};

type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        animation: "slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(120%) scale(0.9); }
          to   { opacity: 1; transform: translateX(0)   scale(1);   }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%;   }
        }
        .toast-progress {
          animation: shrink 4s linear forwards;
        }
      `}</style>

      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.08)",
          overflow: "hidden",
          minWidth: "320px",
          maxWidth: "400px",
          border: `1px solid ${isSuccess ? "#e8f5e9" : "#fce4e4"}`,
        }}
      >
        {/* Body */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            padding: "16px 16px 14px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: isSuccess ? "#f0faf0" : "#fff0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginRight: "12px",
            }}
          >
            {isSuccess ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="#22c55e" fillOpacity="0.15" />
                <path
                  d="M5 9.5l3 3 5-6"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="#ef4444" fillOpacity="0.12" />
                <path
                  d="M9 5.5v4M9 12.5v.5"
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>

          {/* Text */}
          <div style={{ flex: 1, paddingTop: "2px" }}>
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: "14px",
                color: "#111827",
                fontFamily: "inherit",
              }}
            >
              {isSuccess ? "Welcome back!" : "Signup failed"}
            </p>
            <p
              style={{
                margin: "3px 0 0",
                fontSize: "13px",
                color: "#6b7280",
                fontFamily: "inherit",
                lineHeight: "1.4",
              }}
            >
              {message}
            </p>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              marginLeft: "8px",
              color: "#9ca3af",
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: "3px",
            background: isSuccess ? "#f0fdf4" : "#fff5f5",
          }}
        >
          <div
            className="toast-progress"
            style={{
              height: "100%",
              background: isSuccess ? "#9a8457" : "#ef4444",
              borderRadius: "0 0 14px 14px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

const SignupPage: React.FC<SignupPageProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modal, setModal] = useState<"terms" | "privacy" | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [focusField, setFocusField] = useState<
    "name" | "email" | "phone" | "password" | "confirmPassword" | null
  >(null);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Sophisticated mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document
        .querySelector(".signup-container")
        ?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Ripple effect system
  const createRipple = (x: number, y: number) => {
    const newRipple = {
      id: Date.now(),
      x,
      y,
      scale: 0,
      opacity: 1,
    };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    createRipple(e.clientX - rect.left, e.clientY - rect.top);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setToast({
        message: "Passwords do not match. Please try again.",
        type: "error",
      });
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        phoneNumber: `${selectedCountry.dialCode}${formData.phone}`,
        password: formData.password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setToast({
          message: "Account created! Redirecting you now…",
          type: "success",
        });

        setTimeout(() => {
          window.location.href = "/profile";
        }, 1500);
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Signup failed. Please try again.";
      setToast({ message, type: "error" });
      console.error("Signup error:", error);
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(`${API_URL}/api/auth/signup`, {
  //       name: formData.name,
  //       email: formData.email,
  //       phoneNumber: formData.phone, // ✅ backend expects "phoneNumber"
  //       password: formData.password,
  //     });

  //     if (res.data.token) {
  //       // Save JWT + user info
  //       localStorage.setItem("token", res.data.token);
  //       localStorage.setItem("user", JSON.stringify(res.data.user));

  //       // Redirect to profile
  //       window.location.href = "/profile";
  //     }
  //   } catch (error: any) {
  //     alert(error.response?.data?.message || "Signup failed");
  //     console.error("Signup error:", error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes gentle-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes liquid-flow {
          0%, 100% { transform: translateX(-50%) scaleY(1); }
          50% { transform: translateX(-50%) scaleY(1.1); }
        }
        
        @keyframes diamond-sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes ripple-expand {
          0% { transform: scale(0); opacity: 0.8; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes elegant-entrance {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.98);
            backdrop-filter: blur(0px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            backdrop-filter: blur(20px);
          }
        }
        
        @keyframes field-glow {
          0%, 100% { 
            box-shadow: 0 0 0 1px rgba(203, 213, 225, 0.3);
          }
          50% { 
            box-shadow: 
              0 0 0 2px rgba(154, 132, 87, 0.4),
              0 0 20px rgba(154, 132, 87, 0.1),
              0 8px 25px rgba(0, 0, 0, 0.05);
          }
        }
        
        @keyframes button-energy {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .bg-luxury {
          background: 
            radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(154, 132, 87, 0.03) 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.04),
            0 0 0 1px rgba(255, 255, 255, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        
        .gentle-breathe {
          animation: gentle-breathe 8s ease-in-out infinite;
        }
        
        .elegant-entrance {
          animation: elegant-entrance 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .diamond-sparkle {
          animation: diamond-sparkle 4s ease-in-out infinite;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(154, 132, 87, 0.3), transparent 70%);
          pointer-events: none;
          animation: ripple-expand 2s ease-out forwards;
        }
        
        .field-focus {
          animation: field-glow 3s ease-in-out infinite;
        }
        
        .liquid-line {
          background: linear-gradient(90deg, transparent, rgba(154, 132, 87, 0.6), transparent);
          animation: liquid-flow 3s ease-in-out infinite;
        }
        
        .button-shimmer {
          background: linear-gradient(
            90deg,
            rgba(154, 132, 87, 1) 0%,
            rgba(134, 115, 76, 1) 25%,
            rgba(115, 98, 65, 1) 50%,
            rgba(134, 115, 76, 1) 75%,
            rgba(154, 132, 87, 1) 100%
          );
          background-size: 300% 100%;
          animation: gradient-shift 3s ease-in-out infinite;
        }
        
        .energy-sweep {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          background-size: 200% 100%;
          animation: button-energy 2s ease-in-out infinite;
        }
        
        .input-pristine {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(203, 213, 225, 0.3);
        }
        
        .input-pristine:focus {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(154, 132, 87, 0.4);
          box-shadow: 
            0 0 0 3px rgba(154, 132, 87, 0.1),
            0 8px 25px rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        }
        
        .magnetic {
          transition: transform 0.1s ease-out;
          transform: translate(${(mousePos.x - 0.5) * 10}px, ${(mousePos.y - 0.5) * 5}px);
        }
      `}</style>
       {modal !== null && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setModal(null)}
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                <div
                  className="relative bg-white rounded-xl shadow-2xl w-full max-w-full max-h-[95vh] flex flex-col z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-end p-3 border-b border-slate-100">
                    <button
                      onClick={() => setModal(null)}
                      className="w-8 h-8 flex items-center font-bold justify-center rounded-lg text-slate-800 hover:text-slate-900 hover:bg-slate-100 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="overflow-y-auto flex-1">
                    <TermsAndCondition1 />
                  </div>
                </div>
              </div>
            )}

      {/* Sophisticated background */}
      <div className="absolute inset-0 bg-luxury"></div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Floating elegant diamonds */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute diamond-sparkle"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          <Sparkles
            className="w-3 h-3"
            style={{
              color: "rgba(154, 132, 87, 0.3)",
              filter: "blur(0.5px)",
            }}
          />
        </div>
      ))}

      {/* Main container */}
      <div
        className={`signup-container relative w-full max-w-md mt-40 ${isLoaded ? "elegant-entrance" : "opacity-0"}`}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
            }}
          />
        ))}

        <div className="glass-card rounded-3xl overflow-hidden gentle-breathe magnetic relative">
          {/* Subtle top accent */}
          <div className="absolute top-0 left-1/2 w-20 h-0.5 liquid-line transform -translate-x-1/2"></div>

          {/* Header */}
          <div className="p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent"></div>

            <div className="relative z-10">
              <div
                className="mx-auto w-32 h-32 rounded-2xl flex items-center justify-center mb-6 hover-lift cursor-pointer"
                onClick={handleClick}
                style={{
                  boxShadow:
                    "0 8px 25px rgba(154, 132, 87, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                }}
              >
                <img src={logomain} alt="" />
              </div>

              <h1 className="text-3xl font-light text-slate-800 mb-2 tracking-wide">
                <span className="bg-[#9a8457] bg-clip-text text-transparent">
                  Join Nymara
                </span>
              </h1>
              <p className="text-slate-500 text-sm font-light">
                Create your premium account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
            {/* Name field */}
            <div className="relative group">
              <label className="block text-slate-700 text-sm mb-2 font-medium">
                Full Name
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 mt-8">
                <User
                  className="h-4 w-4 text-slate-400 transition-colors duration-300"
                  style={{
                    color: focusField === "name" ? "#9a8457" : undefined,
                  }}
                />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setFocusField("name")}
                onBlur={() => setFocusField(null)}
                placeholder="Enter your full name"
                className={`w-full pl-11 pr-4 py-3 rounded-xl focus:outline-none text-slate-800 placeholder-slate-400 text-sm input-pristine ${
                  focusField === "name" ? "field-focus" : ""
                }`}
                required
              />
            </div>

            {/* Email field */}
            <div className="relative group">
              <label className="block text-slate-700 text-sm mb-2 font-medium">
                Email
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 mt-8">
                <Mail
                  className="h-4 w-4 text-slate-400 transition-colors duration-300"
                  style={{
                    color: focusField === "email" ? "#9a8457" : undefined,
                  }}
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusField("email")}
                onBlur={() => setFocusField(null)}
                placeholder="your@email.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl focus:outline-none text-slate-800 placeholder-slate-400 text-sm input-pristine ${
                  focusField === "email" ? "field-focus" : ""
                }`}
                required
              />
            </div>

            {/* Phone field */}
            {/* <div className="relative group">
              <label className="block text-slate-700 text-sm mb-2 font-medium">
                Phone Number
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 mt-8">
                <Phone
                  className="h-4 w-4 text-slate-400 transition-colors duration-300"
                  style={{
                    color: focusField === "phone" ? "#9a8457" : undefined,
                  }}
                />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => setFocusField("phone")}
                onBlur={() => setFocusField(null)}
                placeholder="Enter your phone number"
                className={`w-full pl-11 pr-4 py-3 rounded-xl focus:outline-none text-slate-800 placeholder-slate-400 text-sm input-pristine ${
                  focusField === "phone" ? "field-focus" : ""
                }`}
                required
              />
            </div> */}

            <div className="relative group">
  <label className="block text-slate-700 text-sm mb-2 font-medium">
    Phone Number
  </label>

  <div className="flex">

    {/* Country Dropdown */}
    <select
      value={selectedCountry.code}
      onChange={(e) =>
        setSelectedCountry(
          countries.find(c => c.code === e.target.value)!
        )
      }
      className="px-3 py-3 rounded-l-xl text-sm input-pristine focus:outline-none"
    >
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.flag} {country.dialCode}
        </option>
      ))}
    </select>

    {/* Phone Input */}
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Phone 
          className="h-4 w-4 text-slate-400 transition-colors duration-300"
          style={{
            color: focusField === 'phone' ? '#9a8457' : undefined
          }}
        />
      </div>

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        onFocus={() => setFocusField('phone')}
        onBlur={() => setFocusField(null)}
        placeholder="Enter your phone number"
        className={`w-full pl-11 pr-4 py-3 rounded-r-xl focus:outline-none text-slate-800 placeholder-slate-400 text-sm input-pristine ${
          focusField === 'phone' ? 'field-focus' : ''
        }`}
        required
      />
    </div>
  </div>
</div>

            {/* Password field */}
            <div className="relative group">
              <label className="block text-slate-700 text-sm mb-2 font-medium">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 mt-8">
                <Lock
                  className="h-4 w-4 text-slate-400 transition-colors duration-300"
                  style={{
                    color: focusField === "password" ? "#9a8457" : undefined,
                  }}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusField("password")}
                onBlur={() => setFocusField(null)}
                placeholder="Create a password"
                className={`w-full pl-11 pr-11 py-3 rounded-xl focus:outline-none text-slate-800 placeholder-slate-400 text-sm input-pristine ${
                  focusField === "password" ? "field-focus" : ""
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 mt-8 hover:scale-110 transition-transform"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-400 hover:text-[#9a8457] transition-colors" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400 hover:text-[#9a8457] transition-colors" />
                )}
              </button>
            </div>

            {/* Confirm Password field */}
            <div className="relative group">
              <label className="block text-slate-700 text-sm mb-2 font-medium">
                Confirm Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 mt-8">
                <Lock
                  className="h-4 w-4 text-slate-400 transition-colors duration-300"
                  style={{
                    color:
                      focusField === "confirmPassword" ? "#9a8457" : undefined,
                  }}
                />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => setFocusField("confirmPassword")}
                onBlur={() => setFocusField(null)}
                placeholder="Confirm your password"
                className={`w-full pl-11 pr-11 py-3 rounded-xl focus:outline-none text-slate-800 placeholder-slate-400 text-sm input-pristine ${
                  focusField === "confirmPassword" ? "field-focus" : ""
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 mt-8 hover:scale-110 transition-transform"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-400 hover:text-[#9a8457] transition-colors" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400 hover:text-[#9a8457] transition-colors" />
                )}
              </button>
            </div>

           

            {/* Terms checkbox */}
            <div className="flex items-start">
              <label className="flex items-start cursor-pointer">
                <input type="checkbox" className="sr-only peer" required />
                <div className="w-4 h-4 shrink-0 border border-slate-300 rounded flex items-center justify-center mr-3 mt-0.5 transition-all duration-200 bg-white peer-checked:bg-[#9a8457] peer-checked:border-[#9a8457]">
                  <svg
                    className="w-2.5 h-2.5 text-white scale-0 peer-checked:scale-100 transition-transform"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                </div>
                <span className="text-slate-600 text-sm">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setModal("terms");
                    }}
                    className="text-[#9a8457] hover:text-[#7d6b47] transition-colors font-medium"
                  >
                    Terms
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setModal("privacy");
                    }}
                    className="text-[#9a8457] hover:text-[#7d6b47] transition-colors font-medium"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full text-white bg-[#9a8457] font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden hover-lift"
              style={{
                boxShadow: "0 8px 25px rgba(154, 132, 87, 0.3)",
              }}
            >
              <div className="absolute inset-0 energy-sweep opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Create Account</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>

            {/* Switch to login */}
            <div className="text-center pt-4">
              <p className="text-slate-600 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-[#9a8457] hover:text-[#7d6b47] font-medium transition-colors hover-lift"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-1/2 w-20 h-0.5 liquid-line transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;


