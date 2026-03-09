import React from "react";
import blog1 from '../../assets/blog1.png';
const LabGrownDiamondGuide: React.FC = () => {
  return (
    <div className="bg-neutral-50 min-h-screen py-16  px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl my-40 rounded-2xl px-8">

       <div className="w-full flex justify-center items-center my-8 bg-black">
          <img
            src={blog1}
            alt="Lab Grown vs Natural Diamonds"
            className="w-full h-[420px] object-contain bg-white"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Best Lab-Grown Diamond Jewellery in India
          <span className="block text-lg text-gray-500 mt-2">
            2026 Complete Buying Guide
          </span>
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          The Indian jewellery market is evolving. For decades, diamonds symbolised
          status, celebration, and timeless commitment. But in 2026, Indian buyers —
          especially modern professionals and young couples — are asking a deeper
          question:
        </p>

        <div className="bg-gray-100 border-l-4 border-black p-4 italic text-lg mb-8">
          Can luxury also be intelligent, ethical, and value-driven?
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          That’s where lab-grown diamond jewellery in India is changing the
          conversation. If you’re considering buying lab-grown diamonds in India,
          this guide will help you understand quality, pricing, certification,
          and how to choose the right piece with confidence.
        </p>

        {/* Section */}
        <h2 className="text-2xl font-semibold mb-4">
          What Is Lab-Grown Diamond Jewellery?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Lab-grown diamonds are real diamonds. They have the same chemical
          composition, physical properties, and brilliance as natural diamonds.
          The only difference lies in their origin.
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          Instead of forming underground over millions of years, lab-grown
          diamonds are created using advanced technology that replicates the
          natural diamond-growing process.
        </p>

        {/* Benefits Section */}
        <h2 className="text-2xl font-semibold mb-6">
          Why Lab-Grown Diamond Jewellery Is Growing in India
        </h2>

        <div className="space-y-6 mb-10">

          <div>
            <h3 className="font-semibold text-lg">
              1. Better Value for Money
            </h3>
            <p className="text-gray-700">
              Lab-grown diamonds typically cost 30–40% less than mined diamonds.
              This means you can choose a larger carat weight or higher clarity
              without stretching your budget.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              2. Ethical & Sustainable Appeal
            </h3>
            <p className="text-gray-700">
              Modern Indian buyers are increasingly aware of sourcing practices.
              Lab-grown diamonds offer a responsible alternative without
              compromising luxury.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              3. Investment in Design
            </h3>
            <p className="text-gray-700">
              With cost savings on the stone itself, buyers are now focusing more
              on craftsmanship, customisation, and contemporary design.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              4. Certified Quality
            </h3>
            <p className="text-gray-700">
              Reputed lab-grown diamonds in India come with international
              certification such as IGI ensuring transparency in cut, clarity,
              colour, and carat.
            </p>
          </div>

        </div>

        {/* Buying Checklist */}
        <h2 className="text-2xl font-semibold mb-6">
          What to Check Before Buying
        </h2>

        <div className="bg-gray-50 border rounded-xl p-6 space-y-5 mb-10">

          <div>
            <h4 className="font-semibold">✔ IGI Certification</h4>
            <p className="text-gray-700">
              Ensures verified carat weight, clarity grading, colour grade and
              cut quality.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">✔ BIS Hallmarking</h4>
            <p className="text-gray-700">
              Confirms gold purity and compliance with Indian jewellery
              standards.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">✔ Metal Choice</h4>
            <p className="text-gray-700">
              18K gold offers luxury appeal while 14K gold provides better
              durability for everyday wear.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">✔ Design & Craftsmanship</h4>
            <p className="text-gray-700">
              Look for secure settings, smooth finishing, and balanced
              proportions.
            </p>
          </div>

        </div>

        {/* Trends */}
        <h2 className="text-2xl font-semibold mb-6">
          Engagement Rings & Jewellery Trends in India (2026)
        </h2>

        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-10">
          <li>Solitaire lab-grown diamond rings</li>
          <li>Oval and emerald cuts</li>
          <li>Minimalist tennis bracelets</li>
          <li>Contemporary diamond pendants</li>
          <li>Stackable rings</li>
        </ul>

        {/* CTA */}
        <div className="bg-black text-white rounded-xl p-8  text-center">
          <h3 className="text-2xl font-semibold mb-3">
            Brilliance Without Compromise
          </h3>
          <p className="opacity-80 mb-4">
            At Nymara Jewels, we craft IGI-certified lab-grown diamond jewellery
            designed for modern Indian buyers who appreciate refined luxury.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
            Explore Collection
          </button>
        </div>

      </div>
    </div>
  );
};

export default LabGrownDiamondGuide;