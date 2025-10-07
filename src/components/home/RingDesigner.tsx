import React, { useState, useEffect } from "react";
import ring from "@/assets/design.jpg";
import CustomizeJewelryModal from "@/components/layout/CustomizeJewelryModal";

const CraftMyVision = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      number: 1,
      title: "Share Your Vision",
      description:
        "Write what you’re looking for or simply upload an image of your inspiration. Solitaire ring? Tennis bracelet? Something unique? Any type of jewellery and design.",
    },
    {
      number: 2,
      title: "Tell Us How to Reach You",
      description:
        "Provide your name, email, and phone number so our concierge team can prepare your personalized quotation and designs.",
    },
    {
      number: 3,
      title: "Receive Your Quotation in 48 Hours",
      description:
        "Within 48 hours, our team will send you curated images, design options, and transparent pricing. From there, we’ll craft your piece with certified stones and premium metals.",
    },
  ];

  return (
    <>
      {/* Modal */}
      <CustomizeJewelryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Section */}
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-slate-50 to-purple-50 items-center justify-center p-8">
        
        {/* 🌟 Heading on top */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 leading-tight cinzel">
            One-of-a-Kind,{" "}
            <span className="bg-gradient-to-r from-[#9a8457] to-[#b8a069] bg-clip-text text-transparent font-medium">
              Just Like You.
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium mt-3">
            Imagine It Today, See It Within 48 Hours.
          </p>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT - Image with footer title */}
          <div className="flex flex-col justify-center items-center order-2 lg:order-1 text-center">
            <img
              src={ring}
              alt="Craft My Vision"
              className="w-full max-w-sm md:max-w-md mx-auto rounded-xl shadow-lg"
              style={{
                objectFit: "contain",
                backgroundColor: "transparent",
              }}
            />
            <h2 className="text-xl md:text-2xl text-gray-800 font-semibold cinzel tracking-wide mt-6">
              Craft My Vision
            </h2>
          </div>

          {/* RIGHT - Steps + Button */}
          <div className="space-y-8 order-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 alta">
                Three-Step Process
            </h2>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative transition-all duration-700 ease-out ${
                    activeStep === index ? "transform scale-[1.03]" : "opacity-70"
                  }`}
                >
                  <div className="flex items-start space-x-6">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base transition-all duration-500 ${
                          activeStep === index
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg scale-110"
                            : "bg-white text-gray-600 border-2 border-gray-200"
                        }`}
                      >
                        {step.number}
                      </div>
                      {activeStep === index && (
                        <div className="absolute inset-0 rounded-full border-2 border-yellow-300 animate-ping"></div>
                      )}
                    </div>

                    <div className="flex-1 transition-all duration-500">
                      <h3
                        className={`text-lg font-bold mb-1 ${
                          activeStep === index
                            ? "text-gray-800"
                            : "text-gray-600"
                        }`}
                      >
                        Step {step.number} – {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Button - slightly right-aligned */}
             {/* Button - centered */}
<div className="pt-4 flex justify-center">
  <button
    onClick={() => setIsModalOpen(true)}
    className="group relative overflow-hidden px-8 py-3 border border-black text-black font-light text-sm tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white uppercase"
  >
    <span className="relative z-10">Start Designing</span>
    <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  </button>
</div>



          </div>
        </div>
      </div>
    </>
  );
};

export default CraftMyVision;
