// components/HeroSection.tsx
import React from "react";
import { Sparkles, Star } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  productCount: number;
  isLoaded: boolean;
}

const ProductHeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, productCount, isLoaded }) => {
  return (
    <div className={`relative pt-32 pb-16 ${isLoaded ? 'elegant-fade-in' : 'opacity-0'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute gentle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-[#9a8457]" />
          </div>
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-8 text-center mt-10">
        <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-6 tracking-wide">
          <span className="bg-gradient-to-r from-[#9a8457] to-[#b8a069] bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-slate-500">
          <span className="flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-[#9a8457]" />
            {productCount} Masterpieces
          </span>
          <span className="flex items-center">
            <Star className="w-4 h-4 mr-2 text-[#9a8457]" />
            Premium Quality
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductHeroSection;