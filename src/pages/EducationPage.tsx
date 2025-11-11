import React, { useState } from "react";
import {
  Diamond,
  Microscope,
  Gem,
  Shapes,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Shield,
  Zap,
  BookOpen,
  Eye,
} from "lucide-react";
import img1 from "../assets/4c.png";
import video from "../assets/bracelets-video.gif";

const EducationPage = () => {
  const [activeSection, setActiveSection] = useState("4cs");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const sections = [
    {
      id: "4cs",
      title: "4 C's of Diamonds",
      icon: <Diamond className="w-5 h-5" />,
    },
    {
      id: "lab-grown",
      title: "Lab Grown Diamonds",
      icon: <Microscope className="w-5 h-5" />,
    },
    {
      id: "gemstones",
      title: "Lab Grown Gemstones",
      icon: <Gem className="w-5 h-5" />,
    },
    {
      id: "shapes",
      title: "Diamond Shapes",
      icon: <Shapes className="w-5 h-5" />,
    },
    { id: "faq", title: "FAQ", icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const faqs = [
    {
      question: "Are Lab Grown Diamonds real diamonds?",
      answer:
        "Yes, absolutely. Lab Grown Diamonds are chemically, physically, and optically identical to mined diamonds. They have the same chemical composition (pure carbon in a crystal lattice structure), same physical properties (hardness of 10 on Mohs scale), and same optical brilliance.",
    },
    {
      question:
        "Can you tell the difference between Lab Grown and Natural Diamonds?",
      answer:
        "To the naked eye, no difference exists. Even trained gemologists cannot distinguish them without specialized equipment. Both shine with identical brilliance, fire, and scintillation.",
    },
    {
      question: "Do Lab Grown Diamonds cost less than mined diamonds?",
      answer:
        "Yes, they offer exceptional value - typically 60-90% less than mined diamonds while delivering the same quality, beauty, and prestige. This allows you to choose a larger or higher quality stone within your budget.",
    },
    {
      question: "Are Lab Grown Diamonds graded and certified?",
      answer:
        "Every Nymara diamond is independently graded and certified by world-renowned institutes such as IGI and GIA, ensuring complete authenticity and trust using the same 4C criteria as natural diamonds.",
    },
    {
      question: "Do Lab Grown Diamonds change color or shine over time?",
      answer:
        "Never. Their sparkle, fire, and brilliance remain eternal. Lab-grown diamonds are just as durable as mined diamonds, ensuring your jewel shines as brightly decades from now as it does today.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 15 Day Return Policy for complete satisfaction, plus a Lifetime Buy-Back Policy. You can return products within 15 days of delivery or exchange them anytime for current market value.",
    },
    {
      question: "How do I determine my ring size?",
      answer:
        "You can use our online ring size guide with printable sizer, or visit our virtual appointment service. We also offer free one-time resizing within 30 days for domestic orders.",
    },
    {
      question: "Do you offer customization?",
      answer:
        "Yes! Every piece at Nymara is made-to-order and fully customizable at no additional cost. Simply share your vision with us, and our master craftsmen will bring it to life.",
    },
  ];

  const diamondGrades = {
    cut: [
      {
        grade: "Ideal",
        description:
          "Extraordinary brilliance and perfect symmetry, engineered to exact proportions for optimal light performance",
      },
      {
        grade: "Excellent",
        description:
          "Superior sparkle with uniform patterns and exceptional fire",
      },
      {
        grade: "Very Good",
        description:
          "Strong brilliance and good symmetry with impressive light return",
      },
      {
        grade: "Good",
        description:
          "Pleasing sparkle with fair polish and symmetry, good value option",
      },
      {
        grade: "Fair",
        description: "Limited sparkle and uneven finish, often asymmetrical",
      },
      {
        grade: "Poor",
        description:
          "Lackluster appearance with visible irregularities and little brilliance",
      },
    ],
    color: [
      {
        grade: "D-F (Colorless)",
        description:
          "Appear pure white; rare and highly valuable with icy brilliance",
      },
      {
        grade: "G-J (Near Colorless)",
        description:
          "Look white when viewed from above, excellent value with slight warmth",
      },
      {
        grade: "K-M (Faint)",
        description:
          "Display subtle warmth or faint tint; budget-friendly for those who don't mind color",
      },
      {
        grade: "N-Z (Very Light/Light)",
        description:
          "Show yellow or brown hues, including champagne and cognac diamonds",
      },
    ],
    clarity: [
      {
        grade: "FL (Flawless)",
        description:
          "No inclusions or blemishes visible under 10x magnification, extremely rare",
      },
      {
        grade: "IF (Internally Flawless)",
        description:
          "No inclusions, only very slight external marks visible under magnification",
      },
      {
        grade: "VVS1/VVS2",
        description:
          "Very, very small inclusions, invisible to naked eye and difficult for experts to see",
      },
      {
        grade: "VS1/VS2",
        description:
          "Small inclusions visible only upon close inspection under magnification",
      },
      {
        grade: "SI1/SI2",
        description:
          "Noticeable inclusions, sometimes visible without magnification but still beautiful",
      },
      {
        grade: "I1/I2/I3",
        description:
          "Obvious inclusions that may affect appearance and brilliance",
      },
    ],
  };

  const labGrownProcess = [
    {
      title: "HPHT (High Pressure High Temperature)",
      description:
        "Recreates the intense conditions under which natural diamonds form beneath the Earth",
      details:
        "Diamond seed placed in specialized chamber with extreme temperatures over 2,000°C and pressures reaching 1.5 million pounds per square inch. Carbon atoms naturally bond to the seed, slowly crystallizing into a diamond.",
      icon: <Zap className="w-6 h-6" />,
      timeframe: "2-4 weeks",
      characteristics:
        "Often produces diamonds with fewer structural irregularities",
    },
    {
      title: "CVD (Chemical Vapor Deposition)",
      description:
        "Uses carbon-rich gases to build diamond layers atom by atom",
      details:
        "Diamond seed placed in vacuum chamber with methane and hydrogen gases. As gases heat up, carbon atoms settle onto seed, building layer by layer until desired size is reached.",
      icon: <Microscope className="w-6 h-6" />,
      timeframe: "3-6 weeks",
      characteristics:
        "Allows for precise control over diamond properties and can create larger stones",
    },
  ];

  const diamondShapes = [
    {
      name: "Round Brilliant",
      description:
        "Most popular cut with maximum brilliance, featuring 57-58 facets perfectly arranged for light performance",
      ratio: "1.00",
      popularity: "60%",
      bestFor: "Classic elegance, maximum sparkle",
      considerations: "Doesn't hide inclusions as well as fancy shapes",
    },
    {
      name: "Princess",
      description:
        "Square shape with brilliant-style faceting, sharp corners create contemporary appeal",
      ratio: "1.00-1.05",
      popularity: "15%",
      bestFor: "Modern style, intense fire",
      considerations:
        "Corners need protective prongs, may appear smaller per carat",
    },
    {
      name: "Emerald",
      description:
        "Rectangular step-cut with elegant hall-of-mirrors effect and clean lines",
      ratio: "1.30-1.50",
      popularity: "8%",
      bestFor: "Sophisticated elegance, vintage appeal",
      considerations: "Requires higher clarity grade due to open table",
    },
    {
      name: "Oval",
      description:
        "Elongated brilliant cut that makes fingers appear longer while maximizing sparkle",
      ratio: "1.35-1.50",
      popularity: "7%",
      bestFor: "Finger-flattering silhouette, appears larger per carat",
      considerations: "May show bow-tie effect in center",
    },
    {
      name: "Cushion",
      description:
        "Pillow-like outline with vintage romance appeal and soft, rounded corners",
      ratio: "1.00-1.20",
      popularity: "5%",
      bestFor: "Vintage charm, romantic appeal",
      considerations: "May retain more color than other shapes",
    },
    {
      name: "Pear",
      description:
        "Teardrop shape combining round and marquise elements for unique elegance",
      ratio: "1.45-1.60",
      popularity: "3%",
      bestFor: "Unique style, finger-elongating effect",
      considerations: "Point needs protection, requires good symmetry",
    },
    {
      name: "Marquise",
      description:
        "Boat-shaped with pointed ends, maximizes carat weight and creates dramatic presence",
      ratio: "1.90-2.20",
      popularity: "2%",
      bestFor: "Maximum size appearance, vintage appeal",
      considerations: "Points need protection, may show bow-tie effect",
    },
    {
      name: "Asscher",
      description:
        "Square step-cut with Art Deco allure and mesmerizing windmill pattern",
      ratio: "1.00-1.05",
      popularity: "1%",
      bestFor: "Art Deco style, architectural beauty",
      considerations: "Requires high clarity, less fiery than brilliant cuts",
    },
    {
      name: "Heart",
      description:
        "Ultimate symbol of romance with brilliant-style facets and distinctive cleft",
      ratio: "0.90-1.10",
      popularity: "1%",
      bestFor: "Romantic symbolism, unique expression",
      considerations:
        "Best in sizes above 0.50 carats for clear shape definition",
    },
  ];

  const caratWeightGuide = [
    {
      carat: "0.25",
      description: "Delicate and elegant",
      focus: "Prioritize cut and color over size",
      price: "Most accessible",
    },
    {
      carat: "0.50",
      description: "Perfect balance",
      focus: "Excellent value with good presence",
      price: "Great value point",
    },
    {
      carat: "0.75",
      description: "Noticeable presence",
      focus: "Choose SI1-SI2 clarity with excellent cut",
      price: "Popular choice",
    },
    {
      carat: "1.00",
      description: "Classic milestone",
      focus: "Prioritize Ideal or Excellent cut quality",
      price: "Premium investment",
    },
    {
      carat: "1.50",
      description: "Impressive size",
      focus: "Aim for VS2 clarity or higher",
      price: "Luxury segment",
    },
    {
      carat: "2.00+",
      description: "Statement piece",
      focus: "Require VS1+ clarity with flawless cut",
      price: "Ultimate luxury",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      <section
        className="relative py-24 overflow-hidden mt-0 md:mt-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${video})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-[#9a8457] opacity-80"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#9a8457]/50 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 2}s`,
              }}
            />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-8 text-center mt-20">
          <div className="inline-flex items-center space-x-2 bg-[#9a8457]/20 backdrop-blur-sm rounded-full px-4 py-2 border border-[#9a8457]/50 text-[#9a8457] text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Expert Knowledge • Certified Information</span>
          </div>
          <h1 className="text-6xl font-light text-white mb-6">
            Diamond & Gemstone
            <span className="block text-[#9a8457] font-normal">
              Education Center
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Master the knowledge of diamonds and gemstones with our
            comprehensive guides, created by certified gemologists and industry
            experts.
          </p>
        </div>
      </section>

      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${activeSection === section.id ? "bg-[#9a8457] text-white shadow-lg shadow-[#9a8457]/30 scale-105" : "text-gray-600 hover:bg-[#9a8457]/10 hover:text-gray-900"}`}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {activeSection === "4cs" && (
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                The 4 C's of Diamonds
              </h2>
              <img src={img1} alt="img1" className="h-" />
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Diamonds are evaluated according to four essential attributes,
                first introduced by the Gemological Institute of America (GIA).
                Understanding these helps you make confident choices.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-[#9a8457]/10 rounded-full border border-[#9a8457]/30">
                      <Diamond className="w-8 h-8 text-[#9a8457]" />
                    </div>
                    <h3 className="text-3xl font-semibold text-gray-900">
                      Cut - The Most Important C
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Cut doesn't just describe shape - it defines how effectively
                    the diamond interacts with light to produce brilliance and
                    sparkle.
                  </p>
                  <div className="space-y-3">
                    {diamondGrades.cut.map((grade, index) => (
                      <div
                        key={index}
                        className="p-4 bg-[#9a8457]/5 rounded-xl border border-[#9a8457]/10 hover:border-[#9a8457]/30 transition-colors"
                      >
                        <div className="font-semibold text-[#9a8457] mb-1">
                          {grade.grade}
                        </div>
                        <div className="text-sm text-gray-600">
                          {grade.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#9a8457]/10 to-[#b39968]/10 rounded-2xl p-8 text-center border-2 border-[#9a8457]/30">
                  <Diamond className="w-24 h-24 text-[#9a8457] mx-auto mb-6" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Light Performance Components
                  </h4>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#9a8457] rounded-full"></div>
                      <span className="text-gray-700">
                        <strong>Brilliance:</strong> White light reflection
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#b39968] rounded-full"></div>
                      <span className="text-gray-700">
                        <strong>Fire:</strong> Colorful light dispersion
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#c4aa78] rounded-full"></div>
                      <span className="text-gray-700">
                        <strong>Scintillation:</strong> Dynamic sparkle
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
                Color - The Absence of Color
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                The less color present, the more brilliant the diamond.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {diamondGrades.color.map((grade, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg hover:bg-[#9a8457]/5 transition-all border border-transparent hover:border-[#9a8457]/30"
                  >
                    <div className="font-semibold text-gray-900 mb-2">
                      {grade.grade}
                    </div>
                    <div className="text-sm text-gray-600">
                      {grade.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
                Clarity - Internal Perfection
              </h3>
              <div className="space-y-3">
                {diamondGrades.clarity.map((grade, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg hover:bg-[#9a8457]/5 transition-colors border border-transparent hover:border-[#9a8457]/30"
                  >
                    <div className="font-semibold text-gray-900 w-24 flex-shrink-0">
                      {grade.grade}
                    </div>
                    <div className="text-gray-600">{grade.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
                Carat - Weight and Size
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caratWeightGuide.map((guide, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-[#9a8457]/5 to-[#b39968]/5 rounded-xl border border-[#9a8457]/30 hover:shadow-lg transition-shadow"
                  >
                    <div className="text-2xl font-bold text-[#9a8457] mb-2">
                      {guide.carat} Carat
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      {guide.description}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {guide.focus}
                    </div>
                    <div className="text-xs text-[#9a8457] font-medium">
                      {guide.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "lab-grown" && (
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Lab Grown Diamonds Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real diamonds created in state-of-the-art laboratories.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
                What Is a Lab Grown Diamond?
              </h3>
              <div className="max-w-4xl mx-auto space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  A lab grown diamond is, in every way, a real diamond — created
                  not in the Earth's mantle over billions of years, but in a
                  state-of-the-art laboratory where time and nature's forces are
                  elegantly replicated.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {labGrownProcess.map((method, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow border border-gray-100"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-[#9a8457]/10 rounded-full text-[#9a8457] border border-[#9a8457]/30">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {method.title}
                      </h3>
                      <div className="text-sm text-[#9a8457] font-medium">
                        Timeframe: {method.timeframe}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{method.details}</p>
                  <div className="p-4 bg-[#9a8457]/5 rounded-lg border border-[#9a8457]/30">
                    <div className="text-sm font-medium text-[#9a8457] mb-1">
                      Key Characteristic:
                    </div>
                    <div className="text-sm text-gray-600">
                      {method.characteristics}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#9a8457] to-[#b39968] rounded-3xl p-12 text-white shadow-xl">
              <h3 className="text-3xl font-semibold mb-8 text-center">
                Benefits of Lab Grown Diamonds
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">100% Ethical</h4>
                  <p className="text-white/90">
                    No mining, no environmental impact, completely conflict-free
                  </p>
                </div>
                <div className="text-center">
                  <Award className="w-12 h-12 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Same Quality</h4>
                  <p className="text-white/90">
                    Identical chemical, physical, and optical properties
                  </p>
                </div>
                <div className="text-center">
                  <Star className="w-12 h-12 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Better Value</h4>
                  <p className="text-white/90">
                    60-90% savings allowing larger, higher quality stones
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
                Lab Grown Diamond Certification
              </h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    Every lab grown diamond at Nymara Jewels is certified to the
                    same rigorous standards as natural stones by IGI and GIA.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6 text-[#9a8457]" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          IGI Certification
                        </div>
                        <div className="text-sm text-gray-600">
                          First major lab to formally grade lab-grown diamonds
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6 text-[#9a8457]" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          GIA Certification
                        </div>
                        <div className="text-sm text-gray-600">
                          Gold standard in diamond grading worldwide
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Eye className="w-6 h-6 text-[#9a8457]" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          Laser Inscription
                        </div>
                        <div className="text-sm text-gray-600">
                          Microscopic marking for identification
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#9a8457]/10 to-[#b39968]/10 rounded-2xl p-8 border-2 border-[#9a8457]/30">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    Same 4C Grading
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#9a8457]/20 rounded-full flex items-center justify-center border border-[#9a8457]">
                        <span className="text-[#9a8457] font-bold text-sm">
                          C
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Cut quality assessed identically
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#9a8457]/20 rounded-full flex items-center justify-center border border-[#9a8457]">
                        <span className="text-[#9a8457] font-bold text-sm">
                          C
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Color graded on same D-Z scale
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#9a8457]/20 rounded-full flex items-center justify-center border border-[#9a8457]">
                        <span className="text-[#9a8457] font-bold text-sm">
                          C
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Clarity evaluated under 10x magnification
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#9a8457]/20 rounded-full flex items-center justify-center border border-[#9a8457]">
                        <span className="text-[#9a8457] font-bold text-sm">
                          C
                        </span>
                      </div>
                      <span className="text-gray-700">
                        Carat weight measured precisely
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "shapes" && (
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Diamond Shapes Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Every diamond shape tells a story and reflects personality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {diamondShapes.map((shape, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#9a8457]/20 to-[#b39968]/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#9a8457]/30">
                      <Shapes className="w-8 h-8 text-[#9a8457]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {shape.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {shape.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Ideal Ratio:</span>
                      <span className="font-medium text-gray-900">
                        {shape.ratio}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Popularity:</span>
                      <span className="font-medium text-gray-900">
                        {shape.popularity}
                      </span>
                    </div>
                    <div className="p-2 bg-[#9a8457]/5 rounded border border-[#9a8457]/30">
                      <div className="text-[#9a8457] font-medium mb-1">
                        Best For:
                      </div>
                      <div className="text-gray-700">{shape.bestFor}</div>
                    </div>
                    <div className="p-2 bg-amber-50 rounded">
                      <div className="text-amber-800 font-medium mb-1">
                        Consider:
                      </div>
                      <div className="text-amber-700">
                        {shape.considerations}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                How to Choose Your Perfect Shape
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-[#9a8457]/5 rounded-xl border border-[#9a8457]/30">
                  <h4 className="font-semibold text-[#9a8457] mb-3">
                    For Maximum Sparkle
                  </h4>
                  <p className="text-sm text-gray-600">
                    Choose Round Brilliant, Princess, or Oval for
                    brilliant-style faceting
                  </p>
                </div>
                <div className="text-center p-6 bg-[#9a8457]/5 rounded-xl border border-[#9a8457]/30">
                  <h4 className="font-semibold text-[#9a8457] mb-3">
                    For Vintage Appeal
                  </h4>
                  <p className="text-sm text-gray-600">
                    Consider Emerald, Asscher, or Cushion for timeless elegance
                  </p>
                </div>
                <div className="text-center p-6 bg-[#9a8457]/5 rounded-xl border border-[#9a8457]/30">
                  <h4 className="font-semibold text-[#9a8457] mb-3">
                    For Unique Style
                  </h4>
                  <p className="text-sm text-gray-600">
                    Try Pear, Marquise, or Heart for distinctive character
                  </p>
                </div>
                <div className="text-center p-6 bg-[#9a8457]/5 rounded-xl border border-[#9a8457]/30">
                  <h4 className="font-semibold text-[#9a8457] mb-3">
                    For Finger Flattering
                  </h4>
                  <p className="text-sm text-gray-600">
                    Oval, Marquise, or Pear create elongating effect
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "gemstones" && (
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Lab Grown Gemstones Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Ethically created sapphires, emeralds, and rubies with identical
                beauty and properties to natural stones.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
                What Are Lab Grown Gemstones?
              </h3>
              <div className="max-w-4xl mx-auto space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Lab grown gemstones are created by replicating the same
                  conditions under which natural gemstones form deep within the
                  Earth. In controlled laboratory settings, advanced techniques
                  simulate immense pressure, heat, and natural forces that would
                  otherwise require millions of years underground.
                </p>
                <p>
                  What emerges is a gemstone that mirrors nature's brilliance,
                  yet is born through innovation and responsibility. They can be
                  created in a wide spectrum of colors and types - from the deep
                  blue of sapphires to the vibrant green of emeralds and the
                  passionate red of rubies.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                Lab Created vs Mined Gemstones
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[#9a8457]/30">
                      <th className="text-left py-4 px-4 font-semibold text-gray-900">
                        Aspect
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-[#9a8457]">
                        Lab Created
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-600">
                        Mined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-900">
                        Formation Process
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-green-600">
                        Advanced laboratories using HPHT or CVD methods
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-red-600">
                        Natural formation over millions of years
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-900">
                        Quality
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-green-600">
                        Consistent brilliance and clarity
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-red-600">
                        Natural variations in quality
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-900">
                        Environmental Impact
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-green-600 font-medium">
                        Minimal impact
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-red-600">
                        Significant disruption
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium text-gray-900">
                        Ethical Considerations
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-green-600 font-medium">
                        100% conflict-free
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-red-600">
                        May involve ethical concerns
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">
                  Why Choose Lab Grown Gemstones?
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#9a8457]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#9a8457]">
                      <div className="w-2 h-2 bg-[#9a8457] rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Ethical Creation
                      </div>
                      <div className="text-sm text-gray-600">
                        Avoid destructive mining practices
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#9a8457]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#9a8457]">
                      <div className="w-2 h-2 bg-[#9a8457] rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Superior Quality
                      </div>
                      <div className="text-sm text-gray-600">
                        Consistent clarity and brilliance
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#9a8457]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#9a8457]">
                      <div className="w-2 h-2 bg-[#9a8457] rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Complete Transparency
                      </div>
                      <div className="text-sm text-gray-600">
                        Full traceability from creation
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#9a8457]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#9a8457]">
                      <div className="w-2 h-2 bg-[#9a8457] rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Greater Accessibility
                      </div>
                      <div className="text-sm text-gray-600">
                        More affordable pricing
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#9a8457]/10 to-[#b39968]/10 rounded-3xl p-8 border-2 border-[#9a8457]/30">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">
                  Popular Lab Grown Gemstones
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="font-semibold text-blue-900">
                        Lab Grown Sapphires
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Available in blue, pink, yellow, and white with
                      exceptional clarity
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-green-900">
                        Lab Grown Emeralds
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Vivid green color with fewer inclusions than natural
                      emeralds
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="font-semibold text-red-900">
                        Lab Grown Rubies
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Passionate red color with exceptional transparency and
                      fire
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "faq" && (
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about lab-grown diamonds, our
                processes, policies, and more.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    <button
                      onClick={() =>
                        setOpenFAQ(openFAQ === index ? null : index)
                      }
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-[#9a8457]/5 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-8">
                        {faq.question}
                      </span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-[#9a8457] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-8 pb-6 border-t border-[#9a8457]/20">
                        <p className="text-gray-600 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#9a8457] to-[#b39968] rounded-3xl p-8 text-center text-white shadow-xl">
              <HelpCircle className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">
                Still Have Questions?
              </h3>
              <p className="mb-6 text-white/90 text-lg">
                Our diamond and jewelry experts are here to help you make the
                perfect choice for your special moment.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-white/90 text-sm mb-1">
                    Email Support
                  </div>
                  <div className="text-white font-medium">
                    business@nymarajewels.com
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-white/90 text-sm mb-1">
                    Phone Support
                  </div>
                  <div className="text-white font-medium">+91 94248 27503</div>
                  <div className="text-white/70 text-xs">
                    Mon-Sat, 11 AM - 5 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="text-3xl font-light text-gray-900 mb-6">
            Ready to Find Your Perfect Diamond?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Use your newfound knowledge to explore our collection of ethically
            crafted, lab-grown diamond jewelry.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-[#9a8457] text-white px-8 py-3 rounded-full font-medium hover:bg-[#89754d] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
              Explore Collections
            </button>
            <button className="border-2 border-[#9a8457] text-[#9a8457] px-8 py-3 rounded-full font-medium hover:bg-[#9a8457] hover:text-white transition-colors duration-200">
              Book Consultation
            </button>
            <a
              href="/bespoke"
              className="bg-[#d4af37] text-white px-8 py-3 rounded-full font-medium hover:bg-[#c09b30] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
            >
              Buy Diamonds
            </a>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#9a8457] mb-2">100+</div>
              <div className="text-sm text-gray-600">Educational Resources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#9a8457] mb-2">
                IGI/GIA/SGL
              </div>
              <div className="text-sm text-gray-600">Certified Information</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#9a8457] mb-2">24/7</div>
              <div className="text-sm text-gray-600">Expert Guidance</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationPage;
