import React, { useState } from 'react';
import { Building2, Gift, Users, Star, CheckCircle, Mail, Phone, Package } from 'lucide-react';

export default function CorporateGifting() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    quantity: '',
    occasion: '',
    budget: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { companyName, contactName, email, phone, quantity, occasion, budget, message } = formData;
    const subject = 'Corporate Gifting Inquiry - Nymara Jewels';
    const body = `Company Name: ${companyName}%0D%0AContact Person: ${contactName}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AQuantity Needed: ${quantity}%0D%0AOccasion: ${occasion}%0D%0ABudget Range: ${budget}%0D%0A%0D%0AAdditional Information:%0D%0A${message}`;
    window.location.href = `mailto:business@nymarajewels.com?subject=${subject}&body=${body}`;
  };

  const occasions = [
    'Employee Recognition',
    'Client Appreciation',
    'Corporate Anniversary',
    'Holiday Gifts',
    'Milestone Achievements',
    'Executive Gifts',
    'Business Partners',
    'Retirement Gifts',
    'Other'
  ];

  const benefits = [
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Customizable Options',
      description: 'Personalize each piece with engravings, custom packaging, and bespoke designs that reflect your brand values.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Every piece features ethically sourced lab-grown diamonds and recycled gold, certified by IGI and GIA.'
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Elegant Packaging',
      description: 'Luxury presentation boxes with sustainable materials, perfect for creating memorable gifting experiences.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Bulk Pricing',
      description: 'Competitive rates for bulk orders with transparent pricing and flexible payment terms for corporate clients.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Dedicated Support',
      description: 'Personal account manager to handle your order from concept to delivery, ensuring seamless execution.'
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Brand Integration',
      description: 'Add your company logo to packaging, include personalized cards, and create a cohesive brand experience.'
    }
  ];

  const giftCategories = [
    {
      category: 'Employee Recognition',
      items: ['Diamond Studs', 'Tennis Bracelets', 'Pendant Necklaces', 'Elegant Rings'],
      priceRange: 'Starting from $500'
    },
    {
      category: 'Client Appreciation',
      items: ['Premium Cufflinks', 'Statement Rings', 'Designer Bracelets', 'Luxury Watches'],
      priceRange: 'Starting from $1,000'
    },
    {
      category: 'Executive Gifts',
      items: ['Bespoke Jewelry', 'Large Carat Diamonds', 'Custom Creations', 'Rare Gemstones'],
      priceRange: 'Starting from $5,000'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-40">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-6">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-serif text-gray-900 mb-6">Corporate Gifting Solutions</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Elevate your corporate relationships with exquisite lab-grown diamond jewelry from Nymara Jewels. 
            Whether celebrating achievements, expressing gratitude, or marking milestones, our ethically crafted pieces 
            make a lasting impression that reflects your company's values and sophistication.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-gray-900 text-center mb-12">Why Choose Nymara Jewels for Corporate Gifting</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-900">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gift Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-gray-900 text-center mb-12">Popular Corporate Gift Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {giftCategories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{cat.category}</h3>
                <ul className="space-y-2 mb-6">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-gray-900">{cat.priceRange}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-serif text-gray-900 text-center mb-12">Our Simple Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Consultation</h3>
              <p className="text-sm text-gray-600">Share your requirements, budget, and vision with our team</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Curation</h3>
              <p className="text-sm text-gray-600">We curate personalized options tailored to your needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Approval</h3>
              <p className="text-sm text-gray-600">Review and approve designs, packaging, and timeline</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">Receive beautifully packaged gifts on schedule</p>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-md p-8 text-white">
            <h2 className="text-3xl font-serif mb-6">Make a Statement with Every Gift</h2>
            <div className="space-y-6">
              <p className="text-gray-300">
                At Nymara Jewels, we understand that corporate gifting is more than a transaction—it's an opportunity to strengthen relationships and express genuine appreciation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Sustainable Luxury</h4>
                    <p className="text-sm text-gray-300">100% lab-grown diamonds and recycled gold</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Certified Quality</h4>
                    <p className="text-sm text-gray-300">IGI and GIA certified with lifetime warranty</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Flexible Options</h4>
                    <p className="text-sm text-gray-300">From 10 to 1000+ pieces, we scale to your needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Global Delivery</h4>
                    <p className="text-sm text-gray-300">Insured shipping worldwide with tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Request a Corporate Gifting Quote</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="e.g., 50"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    {occasions.map(occ => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <input
                  type="text"
                  name="budget"
                  placeholder="e.g., $10,000 - $50,000"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your gifting needs, preferences, timeline, or any special requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Send Inquiry
              </button>

              <p className="text-xs text-gray-500 text-center">
                Our team will respond within 24 business hours with a customized proposal.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-4">Let's Create Something Extraordinary Together</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Our dedicated corporate gifting team is ready to help you create memorable experiences that leave a lasting impression.
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
        </div>
      </div>
    </div>
  );
}