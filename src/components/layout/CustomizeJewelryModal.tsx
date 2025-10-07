import React, { useState, useEffect } from 'react';
import { X, Diamond, ArrowRight, Upload, MessageCircle } from 'lucide-react';

interface CustomizeJewelryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomizeJewelryModal: React.FC<CustomizeJewelryModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);

  const [customOptions, setCustomOptions] = useState({
    name: '',
    email: '',
    phone: '',
    inspiration: '',
    specialRequests: ''
  });

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = () => {
    console.log('Custom jewelry request:', customOptions);
    setShowThankYou(true);
    // Here you would typically send this data to your backend
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep === 2) {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#9a8457] to-[#b8a069] text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Diamond className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Craft Your Model</h2>
              <p className="text-white/90">Create your perfect piece with our experts</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? 'bg-white text-[#9a8457]' : 'bg-white/20 text-white'
                  }`}
                >
                  {step}
                </div>
                {step < 2 && (
                  <div className={`w-8 h-0.5 ${currentStep > step ? 'bg-white' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-[calc(90vh-200px)] overflow-y-auto">
          {/* Step 1: Final Details (previously step 4) */}
          {currentStep === 1 && !showThankYou && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Vision</h3>
                <p className="text-gray-600">
                  Share your inspiration and any special requests
                </p>
              </div>

              <div className="space-y-6">
                {/* Inspiration */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Inspiration & Vision</h4>
                  <textarea
                    value={customOptions.inspiration}
                    onChange={(e) =>
                      setCustomOptions({ ...customOptions, inspiration: e.target.value })
                    }
                    placeholder="Describe your vision, inspiration images, or story behind this piece..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Special Requests</h4>
                  <textarea
                    value={customOptions.specialRequests}
                    onChange={(e) =>
                      setCustomOptions({ ...customOptions, specialRequests: e.target.value })
                    }
                    placeholder="Any engravings, modifications, or specific requirements..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                  />
                </div>

                {/* Upload Images */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Reference Images (Optional)</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#9a8457] transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">Upload inspiration images or sketches</p>
                    <button className="text-[#9a8457] hover:text-[#8a7547] font-medium">
                      Choose Files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: User Details */}
          {currentStep === 2 && !showThankYou && (
            <div onKeyDown={handleKeyPress}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Details</h3>
                <p className="text-gray-600">
                  Please share your contact information so our team can reach out
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="font-medium text-gray-900 mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={customOptions.name}
                    onChange={(e) => setCustomOptions({ ...customOptions, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457]"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-900 mb-2 block">Email</label>
                  <input
                    type="email"
                    value={customOptions.email}
                    onChange={(e) => setCustomOptions({ ...customOptions, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457]"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-900 mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    value={customOptions.phone}
                    onChange={(e) => setCustomOptions({ ...customOptions, phone: e.target.value })}
                    placeholder="Your contact number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Thank You Message */}
          {showThankYou && (
            <div className="text-center py-20">
              <Diamond className="w-12 h-12 text-[#9a8457] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Our jewelry experts will reach out to you shortly to discuss your dream design.
              </p>
              <button
                onClick={onClose}
                className="bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!showThankYou && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                )}
              </div>

              <div>
                {currentStep === 1 ? (
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center space-x-2 bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 border border-[#9a8457] text-[#9a8457] px-6 py-3 rounded-lg hover:bg-[#9a8457]/5 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat with Expert</span>
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex items-center space-x-2 bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors"
                    >
                      <Diamond className="w-4 h-4" />
                      <span>Submit Request</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizeJewelryModal;
