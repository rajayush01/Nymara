import React, { useState } from 'react';
import { Sparkles, CheckCircle, Clock, Mail, Phone } from 'lucide-react';
import axios from 'axios';

export default function BespokeService() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caratWeight: '',
    shape: '',
    color: '',
    clarity: '',
    budget: '',
    message: ''
  });

  const [otherFields, setOtherFields] = useState({
    shapeOther: '',
    colorOther: '',
    clarityOther: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOtherFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtherFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        shape: formData.shape === 'Other' ? otherFields.shapeOther : formData.shape,
        color: formData.color === 'Other' ? otherFields.colorOther : formData.color,
        clarity: formData.clarity === 'Other' ? otherFields.clarityOther : formData.clarity
      };
      const res = await axios.post("http://localhost:5000/api/bespoke/request", submitData);
      if (res.data.success) {
        alert("Your request has been sent successfully!");
        setFormData({
          name: '',
          email: '',
          phone: '',
          caratWeight: '',
          shape: '',
          color: '',
          clarity: '',
          budget: '',
          message: ''
        });
        setOtherFields({
          shapeOther: '',
          colorOther: '',
          clarityOther: ''
        });
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("Failed to send request. Please try again.");
    }
  };

  const shapes = ['Round', 'Princess', 'Emerald', 'Oval', 'Cushion', 'Pear', 'Marquise', 'Radiant', 'Asscher', 'Heart'];
  const colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'Fancy Yellow', 'Fancy Pink', 'Fancy Blue'];
  const clarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mt-40">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-serif text-gray-900 mb-6">The Loose Diamond & Bespoke Experience</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Nymara Jewels, we understand that a diamond is more than a stone – it is a reflection of individuality, emotion, and timeless elegance. For those who desire to create something truly personal, we offer an exclusive service designed to bring your vision to life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Endless Selection</h3>
            <p className="text-gray-600">
              Choose from 1 to 40 carats in every shape, color, and quality. Create a single masterpiece or multiple stones for your vision.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">24-48 Hour Response</h3>
            <p className="text-gray-600">
              Our expert concierge team curates tailored options and responds with complete specifications and transparent pricing.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No Additional Cost</h3>
            <p className="text-gray-600">
              Customization comes at no extra charge. Your dream design deserves to be realized without limitation.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">An Endless Selection of Brilliance</h2>
              <p className="text-gray-700 mb-4">
                Choose from a distinguished collection of loose diamonds ranging from 1 carat to an extraordinary 40 carats, available in every shape, color, and quality your heart desires.
              </p>
              <p className="text-gray-700">
                Whether you seek a single diamond of unrivalled beauty or multiple stones to craft a masterpiece, the possibilities are limitless.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">The Custom Request Feature</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Tell us your vision</h3>
                    <p className="text-gray-600 text-sm">Share your exact requirements – from carat weight and cut, to color, clarity, and beyond.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Or upload an image</h3>
                    <p className="text-gray-600 text-sm">Simply share an image of the diamond or jewelry piece that inspires you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Receive curated options</h3>
                    <p className="text-gray-600 text-sm">Our team responds within 24–48 hours with specifications and transparent pricing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-md p-8 text-white">
              <h2 className="text-2xl font-serif mb-4">Elegance Without Compromise</h2>
              <p className="mb-4">
                At Nymara Jewels, customization comes at no additional cost. This is our promise – your dream design deserves to be realized without limitation.
              </p>
              <p className="text-gray-300 text-sm">
                From loose diamonds and precious gemstones to bespoke jewelry creations, every request is fulfilled with meticulous artistry and devotion.
              </p>
            </div>
          </div>

          {/* Right Column - Request Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Request Your Custom Diamond</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carat Weight</label>
                  <input
                    type="text"
                    name="caratWeight"
                    placeholder="e.g., 1.5"
                    value={formData.caratWeight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
                  <select
                    name="shape"
                    value={formData.shape}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    {shapes.map(shape => (
                      <option key={shape} value={shape}>{shape}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {formData.shape === 'Other' && (
                    <input
                      type="text"
                      name="shapeOther"
                      value={otherFields.shapeOther}
                      onChange={handleOtherFieldChange}
                      placeholder="Please specify shape"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent mt-2"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    {colors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {formData.color === 'Other' && (
                    <input
                      type="text"
                      name="colorOther"
                      value={otherFields.colorOther}
                      onChange={handleOtherFieldChange}
                      placeholder="Please specify color"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent mt-2"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Clarity</label>
                  <select
                    name="clarity"
                    value={formData.clarity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    {clarities.map(clarity => (
                      <option key={clarity} value={clarity}>{clarity}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {formData.clarity === 'Other' && (
                    <input
                      type="text"
                      name="clarityOther"
                      value={otherFields.clarityOther}
                      onChange={handleOtherFieldChange}
                      placeholder="Please specify clarity"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent mt-2"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (Optional)</label>
                <input
                  type="text"
                  name="budget"
                  placeholder="e.g., $5,000 - $10,000"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your vision, preferences, or any specific requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Send Email Request
              </button>

              <p className="text-xs text-gray-500 text-center">
                This will open your email client to send us your request.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-4">From Imagination to Masterpiece</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Every story deserves to be celebrated with brilliance. Share your dream with us, and our master craftsmen will transform it into a jewel of enduring beauty – a piece that is yours alone, born of your vision and perfected by our artistry.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:business@nymarajewels.com" className="flex items-center gap-2 text-gray-900 hover:text-gray-700">
              <Mail className="w-5 h-5" />
              <span>business@nymarajewels.com</span>
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a href="tel:+919424827503" className="flex items-center gap-2 text-gray-900 hover:text-gray-700">
              <Phone className="w-5 h-5" />
              <span>+91 94248 27503</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}