import React, { useState } from "react";
import { X, Calendar, Clock, Video, User, Mail, Phone, MessageSquare } from "lucide-react";

interface VirtualAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VirtualAppointmentModal: React.FC<VirtualAppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    appointmentType: "consultation",
    message: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Appointment request:", formData);
    
    // Show success step
    setCurrentStep(3);
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        appointmentType: "consultation",
        message: "",
      });
      setCurrentStep(1);
      onClose();
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#9a8457]/10 rounded-lg">
              <Video className="w-5 h-5 text-[#9a8457]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Book Virtual Appointment
              </h2>
              <p className="text-sm text-gray-500">
                Schedule a personalized consultation with our jewelry experts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 1 ? "text-[#9a8457]" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1
                    ? "bg-[#9a8457] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                1
              </div>
              <span className="text-sm font-medium">Contact Info</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300">
              <div
                className={`h-full transition-all duration-300 ${
                  currentStep >= 2 ? "bg-[#9a8457]" : "bg-gray-300"
                }`}
              ></div>
            </div>
            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 2 ? "text-[#9a8457]" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2
                    ? "bg-[#9a8457] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                2
              </div>
              <span className="text-sm font-medium">Schedule</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] outline-none transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] outline-none transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>How can we help you?</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] outline-none transition-all resize-none"
                    placeholder="Tell us about your jewelry needs or questions..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Schedule Appointment */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Video className="w-4 h-4" />
                    <span>Appointment Type *</span>
                  </label>
                  <select
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] outline-none transition-all"
                  >
                    <option value="consultation">General Consultation</option>
                    <option value="engagement">Engagement Ring Consultation</option>
                    <option value="custom">Custom Design Session</option>
                    <option value="education">Diamond Education</option>
                    <option value="appraisal">Jewelry Appraisal</option>
                    <option value="repair">Repair Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Preferred Date *</span>
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4" />
                      <span>Preferred Time *</span>
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] outline-none transition-all"
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#9a8457]/5 border border-[#9a8457]/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-[#9a8457]/10 rounded">
                      <Video className="w-4 h-4 text-[#9a8457]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#9a8457] mb-1">
                        Virtual Appointment Details
                      </h4>
                      <p className="text-sm text-gray-700">
                        You'll receive a Microsoft Teams meeting link via email 24 hours before your appointment. 
                        Our expert will guide you through our jewelry collection and answer all your questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Success Message */}
            {currentStep === 3 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Appointment Request Submitted!
                </h3>
                <p className="text-gray-600 mb-4">
                  Thank you for booking a virtual appointment with us. We'll contact you within 24 hours to confirm your appointment details.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Next Steps:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You'll receive a confirmation email shortly</li>
                    <li>• We'll send you the Teams meeting link 24 hours before</li>
                    <li>• Our jewelry expert will contact you if we need to reschedule</li>
                  </ul>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        {currentStep < 3 && (
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={currentStep === 1 ? onClose : prevStep}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>
            
            <div className="flex items-center space-x-3">
              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.name || !formData.email}
                  className="px-6 py-2 bg-[#9a8457] text-white rounded-lg font-medium hover:bg-[#8a7547] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                </button>
              )}
              
              {currentStep === 2 && (
                <button
                  type="submit"
                  disabled={!formData.preferredDate || !formData.preferredTime}
                  className="px-6 py-2 bg-[#9a8457] text-white rounded-lg font-medium hover:bg-[#8a7547] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualAppointmentModal;