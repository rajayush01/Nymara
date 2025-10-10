import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import logomain from "@/assets/logo_main1.png";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

type LoginPageProps = {
  onSwitchToSignup: () => void;
}

type Ripple = {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
};


const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
const [ripples, setRipples] = useState<Ripple[]>([]);
const [focusField, setFocusField] = useState<"email" | "password" | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Sophisticated mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.querySelector('.login-container')?.getBoundingClientRect();
      if (rect) {
        setMousePos({ 
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ripple effect system
  const createRipple = (x: number, y: number) => {
    const newRipple = {
      id: Date.now(),
      x,
      y,
      scale: 0,
      opacity: 1
    };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 2000);
  };

  const [showForgotModal, setShowForgotModal] = useState(false);
const [forgotEmail, setForgotEmail] = useState("");

const handleForgotPassword = async () => {
  if (!forgotEmail) {
    alert("Please enter your email");
    return;
  }
  try {
    await axios.post(`${API_URL}/api/user/forgetpassword`, { email: forgotEmail });
    alert("✅ Reset link sent to your email!");
    setShowForgotModal(false);
  } catch (err: any) {
    console.error("❌ Error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Something went wrong");
  }
};

const handleClick = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    createRipple(e.clientX - rect.left, e.clientY - rect.top);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);

      const { token, user } = res.data;

      // Store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ ...user, isLoggedIn: true }));

      console.log("✅ Login successful:", res.data);

      // Navigate to profile
      window.location.href = "/profile";
    } catch (err: any) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

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

      {/* Sophisticated background */}
      <div className="absolute inset-0 bg-luxury"></div>
      
      {/* Floating elegant diamonds */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute diamond-sparkle"
          style={{
            left: `${15 + (i * 12)}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`
          }}
        >
          <Sparkles 
            className="w-3 h-3"
            style={{
              color: 'rgba(154, 132, 87, 0.3)',
              filter: 'blur(0.5px)'
            }}
          />
        </div>
      ))}

      {/* Main container */}
      <div className={`login-container relative w-full max-w-md mt-40 ${isLoaded ? 'elegant-entrance' : 'opacity-0'}`}>
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50
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
                  boxShadow: '0 8px 25px rgba(154, 132, 87, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                <img src={logomain} alt="" />
              </div>
              
              <h1 className="text-3xl font-light text-slate-800 mb-2 tracking-wide">
                <span className="bg-[#9a8457] bg-clip-text text-transparent">
                  Welcome
                </span>
              </h1>
              <p className="text-slate-500 text-sm font-light">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
            
            {/* Email field */}
            <div className="relative group">
              <label className="block text-slate-700 text-sm mb-2 font-medium">
                Email
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 mt-8">
                <Mail 
                  className="h-4 w-4 text-slate-400 transition-colors duration-300"
                  style={{
                    color: focusField === 'email' ? '#9a8457' : undefined
                  }}
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusField('email')}
                onBlur={() => setFocusField(null)}
                placeholder="your@email.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl focus:outline-none text-slate-800 placeholder-slate-400 text-sm input-pristine ${
                  focusField === 'email' ? 'field-focus' : ''
                }`}
                required
              />
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
                    color: focusField === 'password' ? '#9a8457' : undefined
                  }}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusField('password')}
                onBlur={() => setFocusField(null)}
                placeholder="Enter your password"
                className={`w-full pl-11 pr-11 py-3 rounded-xl focus:outline-none text-slate-800 placeholder-slate-400 text-sm input-pristine ${
                  focusField === 'password' ? 'field-focus' : ''
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="sr-only peer" />
                <div 
                  className="w-4 h-4 bg-white border border-slate-300 rounded flex items-center justify-center mr-3 peer-checked:border-[#9a8457] transition-all duration-200 hover-lift"
                  style={{
                    backgroundColor: 'white'
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"
                    style={{
                      backgroundColor: '#9a8457'
                    }}
                  ></div>
                </div>
                <span className="text-slate-600 text-sm">Remember me</span>
              </label>

              <button
  type="button"
  onClick={() => setShowForgotModal(true)}
  className="text-sm text-[#9a8457] hover:text-[#7d6b47] transition-colors hover-lift"
>
  Forgot password?
</button>

{showForgotModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-3">Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border rounded-lg px-3 py-2 mb-3"
        value={forgotEmail}
        onChange={(e) => setForgotEmail(e.target.value)}
      />
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setShowForgotModal(false)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleForgotPassword}
          className="px-4 py-2 bg-[#9a8457] text-white rounded-lg hover:bg-[#7d6b47]"
        >
          Send Link
        </button>
      </div>
    </div>
  </div>
)}

              
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full text-white bg-[#9a8457] font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden hover-lift"
              style={{
                boxShadow: '0 8px 25px rgba(154, 132, 87, 0.3)'
              }}
            >
              <div className="absolute inset-0 energy-sweep opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Sign In</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>

            {/* Sign up */}
            <div className="text-center pt-4">
              <p className="text-slate-600 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-[#9a8457] hover:text-[#7d6b47] font-medium transition-colors hover-lift"
                >
                  Sign up
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

export default LoginPage;