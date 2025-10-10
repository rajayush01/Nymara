import React, { useState } from "react";
import {
  Heart,
  Award,
  Shield,
  Leaf,
  Globe,
  ChevronRight,
  Diamond,
  Sparkles,
} from "lucide-react";
import video from "../assets/bracelets-video.gif";

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState("story");

  const sections = [
    { id: "story", title: "Our Story", icon: <Heart className="w-5 h-5" /> },
    {
      id: "mission",
      title: "Our Mission",
      icon: <Award className="w-5 h-5" />,
    },
    { id: "values", title: "Our Values", icon: <Shield className="w-5 h-5" /> },
    {
      id: "process",
      title: "Our Process",
      icon: <Diamond className="w-5 h-5" />,
    },
  ];

  const missionPoints = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Clarity & Trust",
      description:
        "Complete transparency in product descriptions, exact weight specifications, and verified IGI or GIA certification for every creation.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Transparency",
      description:
        "Full clarity in sourcing and manufacturing - from gemstone origins to the hands of craftsmen who perfect each piece.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description:
        "Protecting the planet through repurposed materials, energy-efficient practices, and continuous carbon footprint reduction.",
    },
  ];

  const values = [
    {
      title: "Ditching Mined Diamonds",
      description:
        "Every diamond is lab-grown, 100% conflict-free, requiring no mining while maintaining the same brilliance and strength.",
      icon: <Diamond className="w-6 h-6" />,
    },
    {
      title: "Using Recycled Gold",
      description:
        "All jewelry crafted with 100% recycled gold, reducing reliance on destructive mining practices.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Sustainable Packaging",
      description:
        "100% recyclable and biodegradable materials designed to protect jewelry and environment simultaneously.",
      icon: <Leaf className="w-6 h-6" />,
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Ethical Sourcing",
      description:
        "Lab-grown diamonds and recycled precious metals sourced with complete transparency",
    },
    {
      step: "02",
      title: "Master Craftsmanship",
      description:
        "Created in our Surat workshop by master craftsmen embodying generations of expertise",
    },
    {
      step: "03",
      title: "Quality Certification",
      description:
        "Every piece independently certified by IGI or GIA for authenticity and quality assurance",
    },
    {
      step: "04",
      title: "Sustainable Delivery",
      description:
        "Packaged in eco-friendly materials and delivered with lifetime buy-back guarantee",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      {/* Hero Section */}
      <section
        className="relative py-24 overflow-hidden bg-cover bg-center mt-10"
        style={{ backgroundImage: `url(${video})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-gray-900/10 to-[#9a8457] opacity-80"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#9a8457]/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-8 text-center">
          <div className="mb-8 mt-20">
            <div className="inline-flex items-center space-x-2 bg-[#9a8457]/20 backdrop-blur-sm rounded-full px-6 py-2 border border-black text-black text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-black">Est. with Love • Crafted with Conscience</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
              Our Story of
              <span className="block text-[#9a8457] font-normal">
                Conscious Luxury
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Born from a heartfelt dream to gift love without compromise,
              Nymara Jewels redefines luxury through sustainability and ethical
              craftsmanship.
            </p>
          </div>

          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-[#9a8457] text-white shadow-lg shadow-[#9a8457]/50"
                    : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-[#9a8457]/20 hover:border-[#9a8457]"
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-8 -mt-16 relative z-10">
        {/* Our Story Section */}
        {activeSection === "story" && (
          <section
            id="story"
            className="bg-white rounded-3xl shadow-2xl p-12 mb-16 border border-gray-100"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-[#9a8457]/10 rounded-full px-4 py-2 text-[#9a8457] text-sm font-medium mb-6 border border-[#9a8457]/30">
                  <Heart className="w-4 h-4" />
                  <span>The Beginning</span>
                </div>
                <h2 className="text-4xl font-light text-gray-900 mb-6">
                  A Dream Born from Love
                </h2>
              </div>

              <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
                <p className="text-xl text-center text-gray-700 italic mb-8">
                  "When our founder, Nimay Agrawal, received his very first
                  paycheck, he wished to do something truly special: to gift a
                  diamond to the woman who had given him everything, his
                  mother."
                </p>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <p>
                      What should have been a joyous moment revealed a difficult
                      truth. Diamonds were either impossibly expensive or
                      burdened with ethical concerns that could not be ignored.
                      Why should the act of expressing love carry such a heavy
                      cost, whether financial or environmental?
                    </p>

                    <p>
                      From this question emerged a vision. Luxury should be
                      meaningful, sustainable, and accessible. It should be a
                      celebration of love, never a privilege.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-[#9a8457]/10 to-[#9a8457]/20 rounded-2xl flex items-center justify-center border-2 border-[#9a8457]/30">
                      <div className="text-center">
                        <Heart className="w-16 h-16 text-[#9a8457] mx-auto mb-4" />
                        <p className="text-[#9a8457] font-medium">
                          A Son's Love
                        </p>
                        <p className="text-sm text-gray-600">
                          The spark that started it all
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#9a8457]/5 via-white to-[#9a8457]/5 rounded-2xl p-8 mt-8 border border-[#9a8457]/20">
                  <p className="text-center text-gray-700 font-medium text-xl leading-relaxed">
                    And so, Nymara Jewels came to life. A brand founded on the
                    belief that every precious moment deserves elegance without
                    compromise. From our own workshop in Surat, the diamond
                    capital of India, we create jewels of exquisite beauty,
                    crafted with lab-grown diamonds and ethically sourced
                    gemstones, polished to perfection by master craftsmen who
                    embody generations of expertise.
                  </p>
                </div>

                <p className="text-center text-2xl font-light text-gray-800 mt-12">
                  <span className="text-[#9a8457] font-normal">
                    Each design tells a story,
                  </span>{" "}
                  carrying within it the essence of that first dream — the dream
                  of a son wishing to bring joy to his mother.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Our Mission Section */}
        {activeSection === "mission" && (
          <section
            id="mission"
            className="bg-white rounded-3xl shadow-2xl p-12 mb-16 border border-gray-100"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-[#9a8457]/10 rounded-full px-4 py-2 text-[#9a8457] text-sm font-medium mb-6 border border-[#9a8457]/30">
                <Award className="w-4 h-4" />
                <span>Our Purpose</span>
              </div>
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Redefining Luxury Through Responsibility
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every choice we make is guided by our commitment to
                transparency, sustainability, and ethical craftsmanship.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {missionPoints.map((point, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9a8457] to-[#b39968] text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#9a8457]/30">
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-[#9a8457] to-[#b39968] rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">
                  Our Clear Mission
                </h3>
                <p className="text-lg opacity-95 max-w-4xl mx-auto">
                  To create jewelry that honors the Earth, respects people, and
                  redefines luxury for a conscious generation. True luxury is
                  built on honesty, integrity, and the promise of a sustainable
                  future.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Our Values Section */}
        {activeSection === "values" && (
          <section
            id="values"
            className="bg-white rounded-3xl shadow-2xl p-12 mb-16 border border-gray-100"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-[#9a8457]/10 rounded-full px-4 py-2 text-[#9a8457] text-sm font-medium mb-6 border border-[#9a8457]/30">
                <Shield className="w-4 h-4" />
                <span>Our Principles</span>
              </div>
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Beyond Conflict Diamonds
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We knew there had to be a better way. Our commitment to ethical
                practices goes far beyond industry standards.
              </p>
            </div>

            <div className="space-y-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-6 p-8 rounded-2xl hover:bg-[#9a8457]/5 transition-all duration-300 border border-transparent hover:border-[#9a8457]/30"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#9a8457]/10 flex items-center justify-center text-[#9a8457] border border-[#9a8457]/30">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-br from-black via-gray-900 to-[#9a8457] rounded-2xl p-8 text-center shadow-xl">
              <h3 className="text-2xl font-semibold text-white mb-4">
                At Nymara Jewels
              </h3>
              <p className="text-lg text-white/90">
                Responsibility isn't an option — it is our standard. We
                celebrate color and beauty in their purest form, with stones
                that shine with integrity as much as with elegance.
              </p>
            </div>
          </section>
        )}

        {/* Our Process Section */}
        {activeSection === "process" && (
          <section
            id="process"
            className="bg-white rounded-3xl shadow-2xl p-12 mb-16 border border-gray-100"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-[#9a8457]/10 rounded-full px-4 py-2 text-[#9a8457] text-sm font-medium mb-6 border border-[#9a8457]/30">
                <Diamond className="w-4 h-4" />
                <span>Our Craft</span>
              </div>
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                From Vision to Reality
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every Nymara creation follows a meticulous process that ensures
                the highest standards of quality and ethics.
              </p>
            </div>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-8 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9a8457] to-[#b39968] flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#9a8457]/30">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-[#9a8457] transition-colors" />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-[#9a8457] to-[#b39968]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-light text-white mb-6">
            Ready to Be Part of Our Story?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Discover jewelry that celebrates love, legacy, and luxury — with
            integrity at its core.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-white text-[#9a8457] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Explore Collections
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#9a8457] transition-colors duration-200">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
