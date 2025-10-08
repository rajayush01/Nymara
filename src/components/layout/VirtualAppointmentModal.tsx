import React, { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Video,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import axios from "axios";

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

  // Auto-scroll to input when keyboard opens on mobile
  useEffect(() => {
    const handleFocus = (event: Event) => {
      const target = event.target as HTMLElement;
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    };

    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((el) => el.addEventListener("focus", handleFocus));

    return () => {
      inputs.forEach((el) => el.removeEventListener("focus", handleFocus));
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", formData);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setCurrentStep(3);
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
      } else {
        alert(result.message || "Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const nextStep = () => currentStep < 2 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-2 sm:px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col"
        style={{
          height: "90vh",
          maxHeight: "700px",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#9a8457]/10 rounded-lg">
              <Video className="w-5 h-5 text-[#9a8457]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Book Virtual Appointment
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
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

        {/* Progress Bar */}
        <div className="px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-4 text-xs sm:text-sm">
            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 1 ? "text-[#9a8457]" : "text-gray-400"
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                  currentStep >= 1
                    ? "bg-[#9a8457] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                1
              </div>
              <span>Contact Info</span>
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
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                  currentStep >= 2
                    ? "bg-[#9a8457] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                2
              </div>
              <span>Schedule</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-4 pb-24 sm:pb-0">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] outline-none text-sm sm:text-base"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] outline-none text-sm sm:text-base"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] outline-none text-sm sm:text-base"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] outline-none text-sm sm:text-base resize-none"
                    placeholder="Tell us about your jewelry needs..."
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-4 pb-24 sm:pb-0">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] outline-none text-sm sm:text-base"
                  >
                    <option value="consultation">General Consultation</option>
                    <option value="engagement">
                      Engagement Ring Consultation
                    </option>
                    <option value="custom">Custom Design Session</option>
                    <option value="education">Diamond Education</option>
                    <option value="appraisal">Jewelry Appraisal</option>
                    <option value="repair">Repair Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] outline-none text-sm sm:text-base"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9a8457] outline-none text-sm sm:text-base"
                    >
                      <option value="">Select a time</option>
                      {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(
                        (time) => (
                          <option key={time} value={time}>
                            {parseInt(time) % 12 || 12}:00{" "}
                            {parseInt(time) >= 12 ? "PM" : "AM"}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="bg-[#9a8457]/5 border border-[#9a8457]/20 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-[#9a8457]/10 rounded">
                      <Video className="w-4 h-4 text-[#9a8457]" />
                    </div>
                    <div className="flex-1 text-sm text-gray-700">
                      <h4 className="font-medium text-[#9a8457] mb-1">
                        Virtual Appointment Details
                      </h4>
                      <p>
                        You’ll receive a Teams meeting link via email 24 hours
                        before your appointment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Appointment Request Submitted!
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  Thank you for booking a virtual appointment. We’ll contact you
                  soon to confirm the details.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Sticky Footer */}
        {currentStep < 3 && (
          <div className="sticky bottom-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6 border-t border-gray-200 bg-white z-20">
            <button
              type="button"
              onClick={currentStep === 1 ? onClose : prevStep}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm sm:text-base"
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>

            <button
              type={currentStep === 2 ? "submit" : "button"}
              onClick={currentStep === 1 ? nextStep : undefined}
              disabled={
                (currentStep === 1 && (!formData.name || !formData.email)) ||
                (currentStep === 2 &&
                  (!formData.preferredDate || !formData.preferredTime))
              }
              className="px-5 sm:px-6 py-2 bg-[#9a8457] text-white rounded-lg font-medium hover:bg-[#8a7547] disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {currentStep === 1 ? "Next Step" : "Book Appointment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualAppointmentModal;
