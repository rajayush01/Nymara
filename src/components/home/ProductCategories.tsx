import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Crown,
  Shield,
  Award,
  Zap,
} from "lucide-react";

const ProductCategories = () => {
const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "rings",
      title: "Rings",
      subtitle: "Engagement • Wedding • Fashion",
      description:
        "From timeless solitaires to bold cocktail rings, each piece tells your unique story",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-rose-400 to-pink-500",
      hoverGradient: "from-rose-500 to-pink-600",
      count: "250+ Designs",
    },
    {
      id: "earrings",
      title: "Earrings",
      subtitle: "Studs • Hoops • Fashion",
      description:
        "Elegant studs to statement hoops that frame your face beautifully",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-blue-400 to-indigo-500",
      hoverGradient: "from-blue-500 to-indigo-600",
      count: "180+ Designs",
    },
    {
      id: "necklaces",
      title: "Necklaces",
      subtitle: "Tennis • Pendant • Fashion",
      description:
        "Delicate chains to bold statement pieces for every neckline",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-emerald-400 to-teal-500",
      hoverGradient: "from-emerald-500 to-teal-600",
      count: "120+ Designs",
    },
    {
      id: "bracelets",
      title: "Bracelets",
      subtitle: "Tennis • Bangles • Fashion",
      description:
        "Graceful tennis bracelets to bold bangles that adorn your wrists",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-amber-400 to-orange-500",
      hoverGradient: "from-amber-500 to-orange-600",
      count: "95+ Designs",
    },
  ];

  const handleSeeMore = (categoryId:string) => {
    console.log(`Navigate to category: ${categoryId}`);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-rose-100/40 to-pink-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-2xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Refined Header Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Sparkles className="w-4 h-4 text-[#9a8457]" />
            <span>Handcrafted Excellence • Made to Order</span>
          </div>

          <h1 className="cinzel text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-[0.9]">
            Discover
            <span className="cinzel block bg-[#9a8457] bg-clip-text text-transparent font-normal italic">
              Timeless Elegance
            </span>
          </h1>

          <p className="alta text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
            Each piece is meticulously crafted with lab-grown diamonds and
            ethically sourced materials, celebrating life's precious moments
            with sustainable luxury.
          </p>
        </div>

        {/* Elegant Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border border-white/50 flex flex-col"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              {/* Image Container with Refined Overlay */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Elegant Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
                    hoveredCategory === category.id
                      ? "opacity-70"
                      : "opacity-50"
                  }`}
                ></div>

                {/* Subtle Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1 tracking-wide">
                    {category.title}
                  </h3>
                  <p className="text-sm opacity-90 font-light">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light flex-grow">
                  {category.description}
                </p>

                {/* Elegant CTA Button */}
                <button
                  onClick={() => handleSeeMore(category.id)}
                  className="group/btn relative overflow-hidden px-2 py-3 rounded-xl border border-black text-black font-light text-sm tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white uppercase flex items-center gap-2 w-full justify-center mt-auto"
                >
                  <span className="relative z-20 transition-colors duration-300">
                    Explore Collection
                  </span>
                  <ArrowRight className="w-4 h-4 relative z-20 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left z-10"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Refined Men's Collection Section */}
        <div className="relative mb-20">
          <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="black"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-800 text-sm font-medium mb-8 border border-gray-300/50 shadow-sm">
                <Crown className="w-4 h-4 text-[#9a8457]" />
                <span>Exclusively for Him</span>
              </div>

              <h2 className="cinzel text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
                Masculine
                <span className="cinzel block bg-[#9a8457] bg-clip-text text-transparent font-normal italic">
                  Sophistication
                </span>
              </h2>

              <p className="alta text-gray-600 mb-12 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto">
                Bold and refined pieces crafted for the discerning gentleman.
                Discover jewelry that embodies strength, elegance, and timeless
                appeal.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12 max-w-4xl mx-auto">
                {[
                  "Statement Rings",
                  "Designer Earrings",
                  "Chain Necklaces",
                  "Luxury Bracelets",
                  "Premium Cufflinks",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-gray-800 text-sm font-light border border-gray-200/50 hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSeeMore("mens")}
                className="inline-flex items-center space-x-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
              >
                <span>Explore Men's Collection</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Refined Trust Indicators */}
        <div className="text-center">
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-white/50 max-w-5xl mx-auto">
            {[
              {
                icon: <Shield className="w-5 h-5" />,
                text: "100% Conflict-Free Diamonds",
                color: "from-emerald-400 to-teal-500",
              },
              {
                icon: <Award className="w-5 h-5" />,
                text: "IGI/GIA Certified",
                color: "from-blue-400 to-indigo-500",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                text: "Lifetime Buy-Back Guarantee",
                color: "from-purple-400 to-pink-500",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 group">
                <div
                  className={`p-3 bg-gradient-to-r ${item.color} rounded-2xl text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  {item.icon}
                </div>
                <span className="text-gray-800 font-medium text-base group-hover:text-gray-600 transition-colors duration-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ProductCategories;