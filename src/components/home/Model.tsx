import React from 'react';

const Model = () => {
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Model Image - Full screen */}
      <div className="absolute inset-0">
        <img 
          src="https://static.vecteezy.com/system/resources/thumbnails/053/704/767/small_2x/a-woman-wearing-a-diamond-necklace-and-ring-photo.jpeg" 
          alt="Model wearing elegant jewelry" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Blue lighting effects to match original */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-teal-900/20"></div>
        
        {/* Jewelry sparkle effects overlaying the image */}
        <div className="absolute inset-0">
          {/* Necklace sparkles */}
          <div className="absolute top-[45%] left-[45%] w-3 h-3 bg-white rounded-full animate-pulse opacity-90 shadow-lg"></div>
          <div className="absolute top-[47%] left-[42%] w-2 h-2 bg-cyan-200 rounded-full animate-ping opacity-80"></div>
          <div className="absolute top-[46%] left-[48%] w-1 h-1 bg-white rounded-full animate-pulse opacity-70"></div>
          
          {/* Diamond pendant center */}
          <div className="absolute top-[52%] left-[44%] w-4 h-4 bg-white rounded-sm rotate-45 animate-pulse opacity-95 shadow-xl"></div>
          <div className="absolute top-[52%] left-[44%] w-4 h-4 bg-cyan-300 rounded-sm rotate-45 blur-sm opacity-60"></div>
          
          {/* Earring sparkles */}
          <div className="absolute top-[32%] left-[38%] w-2 h-2 bg-white rounded-full animate-ping opacity-85"></div>
          <div className="absolute top-[34%] left-[52%] w-2 h-2 bg-cyan-200 rounded-full animate-pulse opacity-75"></div>
          
          {/* Ring sparkles on hands */}
          <div className="absolute top-[68%] left-[35%] w-3 h-3 bg-white rounded-full animate-pulse opacity-90"></div>
          <div className="absolute top-[70%] left-[32%] w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-70"></div>
          
          {/* Bracelet sparkles */}
          <div className="absolute top-[65%] left-[40%] w-2 h-2 bg-white rounded-full animate-pulse opacity-80"></div>
          <div className="absolute top-[67%] left-[37%] w-1 h-1 bg-cyan-200 rounded-full animate-ping opacity-60"></div>
          
          {/* Additional ambient sparkles */}
          <div className="absolute top-[40%] left-[50%] w-1 h-1 bg-white rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-[55%] left-[55%] w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-50"></div>
          <div className="absolute top-[75%] left-[45%] w-1 h-1 bg-white rounded-full animate-pulse opacity-60"></div>
        </div>
      </div>
      
      {/* Content positioned like original */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center">
          {/* Main heading matching original style */}
          <h1 className="cinzel text-7xl md:text-8xl font-thin text-white mb-4 tracking-[0.2em] leading-none">
            DARE TO
          </h1>
          
          {/* Decorative line */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-px bg-white opacity-60 mx-2"></div>
            <div className="w-8 h-px bg-white opacity-40 mx-2"></div>
          </div>
          
          {/* CTA Button matching original design */}
          <button className="group relative overflow-hidden px-8 py-3 border border-white text-white font-light text-sm tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black uppercase">
            <span className="relative z-10">Shop fine jewelry</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>
      
      {/* Floating sparkle effects throughout the scene */}
      <div className="absolute inset-0 pointer-events-none z-15">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-200 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-25"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-35"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-white rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-cyan-200 rounded-full animate-ping opacity-30"></div>
      </div>
    </section>
  );
};

export default Model;