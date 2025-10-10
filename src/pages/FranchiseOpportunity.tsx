import React, { useState } from 'react';
import { Store, TrendingUp, Award, Users, Heart, Mail, Phone, MapPin, DollarSign, Sparkles } from 'lucide-react';

export default function FranchiseOpportunity() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    investment: '',
    experience: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};


  const handleSubmit = async () => {
  const { fullName, email, phone, location, investment, experience, message } = formData;

  if (!fullName || !email || !phone) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/user/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phone, location, investment, experience, message }),
    });

    const data = await response.json();

    if (data.success) {
      alert("✅ Your inquiry has been sent successfully! We'll contact you soon.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        investment: "",
        experience: "",
        message: "",
      });
    } else {
      alert("❌ Failed to send. Please try again later.");
    }
  } catch (err) {
    console.error("Error submitting inquiry:", err);
    alert("⚠️ Something went wrong. Please try again later.");
  }
};


  const whyPartner = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Established Brand',
      description: 'Join a recognized name in lab-grown diamond jewelry with a compelling origin story and ethical foundation.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growing Market',
      description: 'Tap into the rapidly expanding sustainable luxury market valued at billions globally.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Offer IGI and GIA certified lab-grown diamonds with lifetime warranty and buy-back policy.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Ethical Foundation',
      description: 'Align with values your customers care about: sustainability, transparency, and conflict-free sourcing.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Comprehensive Support',
      description: 'Receive extensive training, marketing support, and ongoing operational guidance from our team.'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Attractive Margins',
      description: 'Benefit from competitive pricing, exclusive franchise territories, and strong profit potential.'
    }
  ];

  const support = [
    'Complete training program for you and your team',
    'Marketing materials and digital assets',
    'Social media and advertising support',
    'Inventory management systems',
    'Point-of-sale technology and software',
    'Grand opening assistance',
    'Ongoing product education',
    'Exclusive territory protection'
  ];

  const investmentBreakdown = [
    { item: 'Franchise Fee', range: 'Contact for details' },
    { item: 'Store Setup & Interior', range: 'Varies by location' },
    { item: 'Initial Inventory', range: 'Based on store size' },
    { item: 'Working Capital', range: '3-6 months recommended' },
    { item: 'Marketing Launch', range: 'Included in package' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-40">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-6">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-serif text-gray-900 mb-6">Franchise Opportunity</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join the Nymara Jewels family and become part of a revolutionary movement in sustainable luxury. 
            We're seeking passionate entrepreneurs who share our vision of making ethical, exquisite jewelry accessible to all.
          </p>
        </div>

        {/* Why Partner Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-gray-900 text-center mb-12">Why Partner with Nymara Jewels</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyPartner.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-900">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Story */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-md p-12 mb-16 text-white">
          <h2 className="text-3xl font-serif mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto space-y-4 text-gray-300">
            <p>
              Nymara Jewels was born from a heartfelt dream. When our founder received his first paycheck, he wished to gift a diamond to his mother—a woman who had given him everything. What should have been joyous revealed a difficult truth: diamonds were either impossibly expensive or burdened with ethical concerns.
            </p>
            <p>
              From this question emerged our vision: luxury should be meaningful, sustainable, and accessible. Today, we craft exquisite jewelry with lab-grown diamonds and ethically sourced gemstones from our workshop in Surat, the diamond capital of India.
            </p>
            <p className="text-white font-medium">
              As a franchise partner, you'll carry this story forward—bringing conscious elegance to your community while building a profitable business.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-6">What We Offer Our Franchise Partners</h2>
            <div className="space-y-3">
              {support.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Investment Overview</h2>
            <div className="space-y-4">
              {investmentBreakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">{item.item}</span>
                  <span className="text-gray-600 text-sm">{item.range}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                Contact us for a detailed franchise disclosure document and complete investment breakdown tailored to your location.
              </p>
            </div>
          </div>
        </div>

        {/* Ideal Candidate */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">Ideal Franchise Partner Profile</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">We're Looking For:</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Prime Location Access</h4>
                  <p className="text-sm text-gray-600">High-footfall areas in tier 1 or tier 2 cities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Financial Capacity</h4>
                  <p className="text-sm text-gray-600">Adequate investment capability and working capital</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Passion for Sustainability</h4>
                  <p className="text-sm text-gray-600">Belief in ethical luxury and conscious consumption</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Customer-Centric Mindset</h4>
                  <p className="text-sm text-gray-600">Commitment to exceptional service and community building</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Preferred Background:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 font-bold">•</span>
                  <span>Retail or jewelry industry experience (preferred but not required)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 font-bold">•</span>
                  <span>Entrepreneurial spirit and business acumen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 font-bold">•</span>
                  <span>Strong local market knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 font-bold">•</span>
                  <span>Team leadership capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 font-bold">•</span>
                  <span>Alignment with brand values and vision</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-serif text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form to express your interest in becoming a Nymara Jewels franchise partner. Our team will review your application and reach out within 48-72 hours.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Next Steps:</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex gap-3">
                  <span className="font-bold text-gray-900">1.</span>
                  <span>Submit your inquiry</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-gray-900">2.</span>
                  <span>Initial consultation call</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-gray-900">3.</span>
                  <span>Receive franchise disclosure document</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-gray-900">4.</span>
                  <span>Site evaluation and approval</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-gray-900">5.</span>
                  <span>Sign agreement and begin training</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-gray-900">6.</span>
                  <span>Grand opening support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-serif text-gray-900 mb-6">Franchise Inquiry Form</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location/City</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Capacity</label>
                <select
                  name="investment"
                  value={formData.investment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select Range</option>
                  <option value="under-50L">Under ₹50 Lakhs</option>
                  <option value="50L-1Cr">₹50 Lakhs - ₹1 Crore</option>
                  <option value="1Cr-2Cr">₹1 Crore - ₹2 Crores</option>
                  <option value="above-2Cr">Above ₹2 Crores</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="jewelry">Jewelry Industry</option>
                  <option value="retail">Retail Experience</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="new">New to Business</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell Us About Your Interest</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share your background, why you're interested in Nymara Jewels, and any questions you have..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Submit Franchise Inquiry
              </button>

              <p className="text-xs text-gray-500 text-center">
                All information provided will be kept confidential. Our team will contact you within 48-72 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Our franchise development team is here to answer all your questions and guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:business@nymarajewels.com" className="flex items-center gap-2 text-gray-900 hover:text-gray-700 font-medium">
              <Mail className="w-5 h-5" />
              <span>business@nymarajewels.com</span>
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a href="tel:+919424827503" className="flex items-center gap-2 text-gray-900 hover:text-gray-700 font-medium">
              <Phone className="w-5 h-5" />
              <span>+91 94248 27503</span>
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-6">Monday - Saturday, 11 AM - 5 PM IST</p>
        </div>
      </div>
    </div>
  );
}