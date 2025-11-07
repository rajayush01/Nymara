// App.tsx
import { Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { AppProvider } from "./contexts/AppContext";
import MainLayout from "./components/layout/MainLayout";
import AboutUs from "./pages/AboutUs";
import EducationPage from "./pages/EducationPage";
import logo from "./assets/logo_main1.png";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useNavigate } from "react-router-dom";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import ProductDetail from "./components/product/ProductDetails";
import ProfilePage from "./pages/ProfilePage";
import BespokeService from "./pages/BespokeService";
import BraceletSizeGuide from "./pages/BraceletSizeGuide";
import NecklaceSizeGuide from "./pages/NecklaceSizeGuide";
import RingSizeGuide from "./pages/RingSizeGuide";
import CorporateGifting from "./pages/CorporateGifting";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import axios from "axios";
import ContactUs from "./pages/ContactUs";
import FranchiseOpportunity from "./pages/FranchiseOpportunity";
import { TrackingProvider } from "./contexts/TrackingContext";

const Home = lazy(() => import("./pages/Home"));

// Chatbot Component (unchanged)
const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! 👋 I'm your AI assistant. How can I help you today?",
      isBot: true,
      time: "now",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Generate a sessionId for guests if not present
  const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substring(2, 12);
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  const sendMessage = async () => {
    if (inputText.trim()) {
      console.log("📝 Sending message:", inputText);

      const newMessage = { text: inputText, isBot: false, time: "now" };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");

      // ✅ Get user + token from localStorage
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      console.log("📦 Raw localStorage user:", storedUser);
      console.log("🔑 Raw localStorage token:", storedToken);

      const user = storedUser ? JSON.parse(storedUser) : null;
      const token = storedToken || null;

      console.log("👤 Parsed user:", user);
      console.log("🔐 Parsed token:", token);

      // If logged in and it's the first message → call backend
      if (user && token && messages.length === 1) {
        console.log("🚀 Calling backend /api/chat/welcome for first message");

        try {
          const res = await fetch("http://localhost:5000/api/chat/welcome", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ use token here
            },
          });

          console.log("📡 Backend response status:", res.status);

          const text = await res.text();
          console.log("📨 Raw backend response text:", text);

          let data;
          try {
            data = JSON.parse(text);
          } catch (err) {
            console.error("❌ Failed to parse JSON:", err);
            return;
          }

          console.log("✅ Parsed backend JSON:", data);

          if (data.success) {
            setMessages((prev) => [
              ...prev,
              { text: data.botMessage, isBot: true, time: "now" },
            ]);
          } else {
            console.error("❌ Backend error:", data.message);
          }
        } catch (err) {
          console.error("❌ Failed to send welcome mail:", err);
        }
      } else {
        console.log("💬 User not logged in OR not first message → using demo bot");

        // fallback demo bot response
        setTimeout(() => {
          const botResponse = {
            text: "Thanks for your message! I'm here to help. This is a demo response.",
            isBot: true,
            time: "now",
          };
          setMessages((prev) => [...prev, botResponse]);
        }, 1000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button with Pulsing Animation */}
      <div className="fixed bottom-[30px] right-[25px] md:bottom-[40px] md:right-[40px] z-[9999] pointer-events-auto">
        <button
          onClick={toggleChat}
          className="relative group bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-800 text-white rounded-full p-4 shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 transform"
          aria-label="Open chatbot"
        >
          {/* Pulsing Ring Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur opacity-40 group-hover:opacity-60 animate-pulse"></div>

          {/* Button Content */}
          <div className="relative">
            {isOpen ? (
              // Animated Close Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 transform transition-transform duration-300 rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Animated Chat Icon with Notification Dot
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 transform transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {/* Notification Dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Premium Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-[110px] right-[30px] md:bottom-[130px] md:right-[60px]
  w-[90vw] sm:w-[380px] md:w-[420px] max-w-[95vw]
  h-[70vh] sm:h-[32rem] max-h-[80vh]
  bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl
  transform transition-all duration-500 animate-in slide-in-from-bottom-4 z-[9998]"
        >
          {/* Header with Gradient Background */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white p-5 rounded-t-2xl relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 animate-pulse"></div>
            <div className="relative flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-white/80 text-xs flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Online & Ready to Help
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area with Custom Scrollbar */}
          <div className="h-72 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/80 backdrop-blur-sm custom-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-in slide-in-from-bottom-2`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl shadow-lg ${
                    message.isBot
                      ? "bg-white/90 text-gray-800 border border-gray-200/50 backdrop-blur-sm"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area with Glass Effect */}
          <div className="p-4 bg-white/70 backdrop-blur-xl border-t border-gray-200/50 rounded-b-2xl">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... ✨"
                className="flex-1 px-4 py-3 bg-white/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm placeholder-gray-500"
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-200 group"
              >
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8b5cf6, #3b82f6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #7c3aed, #2563eb);
        }
      `}</style>
    </>
  );
};

function App() {
  const navigate = useNavigate();

  // Geolocation tracking on app load
  useEffect(() => {
    const fetchGeolocation = async () => {
      if ("geolocation" in navigator) {
        try {
          // Get user's position
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              console.log("📍 Geolocation Data:", {
                latitude,
                longitude,
                accuracy: position.coords.accuracy,
                timestamp: new Date(position.timestamp).toISOString()
              });

              // Optional: Reverse geocode to get address details
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await response.json();
                
                console.log("🌍 Location Details:", {
                  city: data.address?.city || data.address?.town || data.address?.village,
                  state: data.address?.state,
                  country: data.address?.country,
                  countryCode: data.address?.country_code,
                  fullAddress: data.display_name
                });
              } catch (geoError) {
                console.log("ℹ️ Could not fetch location details:", geoError);
              }
            },
            (error) => {
              console.warn("⚠️ Geolocation Error:", {
                code: error.code,
                message: error.message,
                details: 
                  error.code === 1 ? "Permission denied by user" :
                  error.code === 2 ? "Position unavailable" :
                  error.code === 3 ? "Timeout" : "Unknown error"
              });
            },
            {
              enableHighAccuracy: true,
              timeout: 30000,
              maximumAge: 0
            }
          );
        } catch (error) {
          console.error("❌ Geolocation error:", error);
        }
      } else {
        console.warn("⚠️ Geolocation is not supported by this browser");
      }
    };

    fetchGeolocation();
  }, []);

  return (
    <AppProvider>
      <TrackingProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen bg-white">
              <div className="text-blue-900 text-lg animate-pulse">
                <img src={logo} alt="logo" className="h-80" />
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route
              path="/"
              element={
                <MainLayout>
                  <Outlet />
                </MainLayout>
              }
            >
              <Route index element={<Home />} />
              <Route path="/products" element={<ProductCategoryPage />} />
              <Route
                path="/products/:category"
                element={<ProductCategoryPage />}
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/login"
                element={
                  <LoginPage onSwitchToSignup={() => navigate("/signup")} />
                }
              />
              <Route
                path="/signup"
                element={
                  <SignupPage onSwitchToLogin={() => navigate("/login")} />
                }
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/bespoke" element={<BespokeService />} />
              <Route path="/bracelet-size" element={<BraceletSizeGuide />} />
              <Route path="/necklace-size" element={<NecklaceSizeGuide />} />
              <Route path="/ring-size" element={<RingSizeGuide />} />
              <Route path="/corporate-gifting" element={<CorporateGifting />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/franchise-opportunity" element={<FranchiseOpportunity />} />
            </Route>
          </Routes>

          {/* Chatbot Icon */}
          <ChatbotButton />
        </Suspense>
      </TrackingProvider>
    </AppProvider>
  );
}


export default App;
