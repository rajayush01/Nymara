import React from "react";
import blog2 from '../../assets/blog2.png';
const DiamondComparisonGuide: React.FC = () => {
  return (
    <div className="bg-neutral-50 min-h-screen py-12 my-48 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Hero Image */}
        <div className="w-full flex justify-center items-center bg-black">
          <img
            src={blog2}
            alt="Lab Grown vs Natural Diamonds"
            className="w-full h-[420px] object-contain bg-white"
          />
        </div>

        {/* Content */}
        <div className="p-10">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            🇮🇳 Lab-Grown vs Natural Diamonds in India
          </h1>

          <p className="text-lg text-gray-500 mb-8">
            Price, Quality & Value Explained (2026 Guide)
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Diamonds have always held a special place in India. From wedding jewellery
            to engagement rings and milestone celebrations, diamonds symbolise
            prosperity, permanence, and pride. But in 2026, Indian buyers are asking
            informed questions instead of choosing blindly.
          </p>

          <div className="bg-gray-100 border-l-4 border-black p-4 italic text-lg mb-10">
            What is the real difference between lab-grown and natural diamonds?
            Is there a quality compromise? Are lab-grown diamonds worth buying in India?
          </div>

          {/* Section */}
          <h2 className="text-2xl font-semibold mb-4">
            What Is the Difference Between Lab-Grown and Natural Diamonds?
          </h2>

          <p className="text-gray-700 mb-4">
            The biggest misunderstanding in India is thinking lab-grown diamonds
            are “fake.” They are not. Both lab-grown and natural diamonds are made
            of pure carbon and have identical physical and chemical properties.
          </p>

          <p className="text-gray-700 mb-6">
            They share the same hardness (10 on the Mohs scale), brilliance,
            durability, and sparkle. The only difference lies in how they are formed.
          </p>

          <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-10">
            <li>Natural diamonds form deep within the Earth over billions of years.</li>
            <li>Lab-grown diamonds are created using advanced technology in controlled environments.</li>
            <li>Visually and structurally they are identical.</li>
          </ul>

          {/* Price Comparison */}
          <h2 className="text-2xl font-semibold mb-4">
            Lab-Grown Diamond Price in India vs Natural Diamond Price
          </h2>

          <p className="text-gray-700 mb-4">
            One of the biggest reasons buyers compare these diamonds is price.
            Natural diamonds include mining costs, global supply chains, and
            traditional mark-ups.
          </p>

          <div className="bg-gray-50 border rounded-xl p-6 mb-10">
            <ul className="space-y-3 text-gray-700">
              <li>• A 1-carat natural diamond can cost significantly higher.</li>
              <li>• A 1-carat IGI-certified lab-grown diamond usually costs 30–40% less.</li>
              <li>• Buyers can choose larger carat sizes within the same budget.</li>
              <li>• Better clarity grades become more accessible.</li>
              <li>• More refined jewellery designs are possible.</li>
            </ul>
          </div>

          {/* Quality */}
          <h2 className="text-2xl font-semibold mb-4">
            Quality Comparison: Is There Any Compromise?
          </h2>

          <p className="text-gray-700 mb-6">
            Lab-grown diamonds match natural diamonds in hardness, durability,
            sparkle, clarity grading, and colour grading. Both are evaluated using
            the globally recognised 4Cs:
          </p>

          <div className="bg-neutral-100 p-5 rounded-lg mb-10 font-medium text-gray-800">
            Cut • Colour • Clarity • Carat
          </div>

          <p className="text-gray-700 mb-8">
            The most important factor when buying diamond jewellery in India is
            certification. Always choose diamonds certified by IGI (International
            Gemological Institute).
          </p>

          {/* Emotional Value */}
          <h2 className="text-2xl font-semibold mb-4">
            Emotional Value: Does Origin Matter?
          </h2>

          <p className="text-gray-700 mb-6">
            For traditional buyers, natural diamonds carry emotional significance.
            However, modern Indian professionals increasingly value responsible
            sourcing, transparent pricing, and practical decision-making.
          </p>

          <div className="bg-gray-100 p-5 rounded-lg italic mb-10">
            The emotional value of a diamond does not come from where it was
            formed. It comes from the moment it represents.
          </div>

          {/* Sustainability */}
          <h2 className="text-2xl font-semibold mb-4">
            Sustainability & Ethical Considerations in India
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-10">
            <li>No large-scale mining</li>
            <li>Reduced ecological disruption</li>
            <li>Traceable production</li>
          </ul>

          {/* Resale */}
          <h2 className="text-2xl font-semibold mb-4">
            Resale & Investment Value in India
          </h2>

          <p className="text-gray-700 mb-10">
            Diamonds are rarely strong financial investments unless extremely
            rare. Their real value lies in wearability, craftsmanship,
            sentimental meaning, and long-term use.
          </p>

          {/* BIS */}
          <h2 className="text-2xl font-semibold mb-4">
            BIS Hallmarking & Gold Purity
          </h2>

          <div className="bg-gray-50 border rounded-xl p-6 mb-10">
            <ul className="space-y-3 text-gray-700">
              <li>✔ Confirms purity of gold (14K or 18K)</li>
              <li>✔ Compliance with Indian standards</li>
              <li>✔ Authenticity of metal quality</li>
            </ul>
          </div>

          {/* Who Should Buy */}
          <h2 className="text-2xl font-semibold mb-4">
            Who Should Choose Lab-Grown Diamonds?
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-10">
            <li>First-time premium jewellery buyers</li>
            <li>Couples planning engagement rings</li>
            <li>Buyers wanting larger carat sizes</li>
            <li>Professionals who value modern luxury</li>
            <li>Conscious consumers seeking transparency</li>
          </ul>

          {/* Final CTA */}
          <div className="bg-black text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-semibold mb-3">
              Modern Luxury, Crafted with Precision
            </h3>
            <p className="opacity-80 mb-4">
              At Nymara Jewels, we craft IGI-certified lab-grown diamond jewellery
              set in hallmarked gold, designed for discerning Indian buyers.
            </p>

            <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
              Explore Collection
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DiamondComparisonGuide;