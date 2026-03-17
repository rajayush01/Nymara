import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Heart,
  Home,
} from "lucide-react";
import { useAuth, useWishlist } from "@/contexts/AppContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const { user } = useAuth();
  const { wishlist, wishlistCount } = useWishlist();
  const [savedAddresses, setSavedAddresses] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [addressType, setAddressType] = useState<"domestic" | "international">(
    "domestic",
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Domestic fields
    houseNumber: "",
    streetArea: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
    gstNumber: "",
    // International fields
    apartmentSuite: "",
    streetName: "",
    cityInternational: "",
    stateProvince: "",
    postalZipCode: "",
    countryInternational: "",
    // Billing address
    billingDifferent: false,
    billingAddress: "",
  });

  // Load user data on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/details`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const data = res.data;
        const [firstName, ...lastParts] = (data.user.name || "").split(" ");
        const lastName = lastParts.join(" ");

        // Determine address type based on country
        const country = data.details?.address?.country || "India";
        const isDomestic = country === "India";
        setAddressType(isDomestic ? "domestic" : "international");

        setFormData({
          firstName,
          lastName,
          email: data.user.email,
          phone: data.user.phoneNumber,
          // Domestic fields
          houseNumber: data.details?.address?.houseNumber || "",
          streetArea: data.details?.address?.streetArea || "",
          landmark: data.details?.address?.landmark || "",
          city: data.details?.address?.city || "",
          state: data.details?.address?.state || "",
          pinCode: data.details?.address?.pinCode || "",
          country: isDomestic ? country : "India",
          gstNumber: data.details?.address?.gstNumber || "",
          // International fields
          apartmentSuite: data.details?.address?.apartmentSuite || "",
          streetName: data.details?.address?.streetName || "",
          cityInternational: data.details?.address?.cityInternational || "",
          stateProvince: data.details?.address?.stateProvince || "",
          postalZipCode: data.details?.address?.postalZipCode || "",
          countryInternational: !isDomestic ? country : "",
          // Billing address
          billingDifferent: data.details?.address?.billingDifferent || false,
          billingAddress: data.details?.address?.billingAddress || "",
        });
      } catch (err: any) {
        console.error(
          "❌ Failed to load profile:",
          err.response?.data || err.message,
        );
      }
    };

    if (user && user.isLoggedIn) {
      fetchUserDetails();
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async () => {
    try {
      const addressData =
        addressType === "domestic"
          ? {
              type: "domestic",
              houseNumber: formData.houseNumber,
              streetArea: formData.streetArea,
              landmark: formData.landmark,
              city: formData.city,
              state: formData.state,
              pinCode: formData.pinCode,
              country: formData.country,
              gstNumber: formData.gstNumber,
              billingDifferent: formData.billingDifferent,
              billingAddress: formData.billingAddress,
            }
          : {
              type: "international",
              apartmentSuite: formData.apartmentSuite,
              streetName: formData.streetName,
              cityInternational: formData.cityInternational,
              stateProvince: formData.stateProvince,
              postalZipCode: formData.postalZipCode,
              countryInternational: formData.countryInternational,
            };

      const res = await axios.post(
        `${API_URL}/api/user/details`,
        {
          userId: user.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          address: addressData,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      console.log("✅ Profile updated:", res.data);
      setIsEditing(false);

      localStorage.setItem("userDetails", JSON.stringify(res.data));
    } catch (err: any) {
      console.error(
        "❌ Failed to update profile:",
        err.response?.data || err.message,
      );
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    // Reset to original values
    if (user && user.isLoggedIn) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        houseNumber: "",
        streetArea: "",
        landmark: "",
        city: user.city || "",
        state: user.state || "",
        pinCode: user.zipCode || "",
        country: user.country || "India",
        gstNumber: "",
        apartmentSuite: "",
        streetName: "",
        cityInternational: "",
        stateProvince: "",
        postalZipCode: "",
        countryInternational: "",
        billingDifferent: false,
        billingAddress: "",
      });
    }
    setIsEditing(false);
  };

  if (!user || !user.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Please log in to view your profile
          </h2>
          <a
            href="/login"
            className="text-[#9a8457] hover:text-[#7d6b47] font-medium"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 mt-40">
          <div className="bg-gradient-to-r from-[#9a8457] to-[#7d6b47] h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex items-end -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white">
                <User className="w-16 h-16 text-[#9a8457]" />
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {formData.firstName} {formData.lastName}
                </h1>
                <p className="text-gray-500">{formData.email}</p>
              </div>
              <div className="ml-auto mb-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-[#9a8457] text-white rounded-lg hover:bg-[#8a7547] transition-colors duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {addressType === "domestic"
                  ? "First Name (as per Government ID)*"
                  : "First Name  (as per Passport)*"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {addressType === "domestic"
                  ? "Last Name (as per Government ID)*"
                  : "Last Name  (as per Passport)*"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address (order confirmation & tracking updates) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {addressType === "domestic"
                  ? "Mobile Number (for OTP & courier coordination) *"
                  : "Contact Number with Country Code *"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder={
                    addressType === "domestic"
                      ? "+91 XXXXX XXXXX"
                      : "+1 XXX XXX XXXX"
                  }
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Address Type
              </label>
              <div className="flex space-x-4 mb-6">
                <button
                  type="button"
                  onClick={() => setAddressType("domestic")}
                  disabled={!isEditing}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    addressType === "domestic"
                      ? "bg-[#9a8457] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } ${!isEditing ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  Domestic (India)
                </button>
                <button
                  type="button"
                  onClick={() => setAddressType("international")}
                  disabled={!isEditing}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    addressType === "international"
                      ? "bg-[#9a8457] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } ${!isEditing ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  International
                </button>
              </div>

              {/* Domestic Address Fields */}
              {addressType === "domestic" && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Complete Shipping Address
                  </h3>

                  {/* House/Flat Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      House / Flat Number *
                    </label>
                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="e.g., 502, 5th Floor, Pooja Abhishek Apartment"
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                        !isEditing
                          ? "bg-gray-50 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>

                  {/* Street/Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street / Area *
                    </label>
                    <input
                      type="text"
                      name="streetArea"
                      value={formData.streetArea}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="e.g., MG Road, Koramangala"
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                        !isEditing
                          ? "bg-gray-50 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landmark (optional but recommended)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="e.g., Near City Mall, Opposite Park"
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                        !isEditing
                          ? "bg-gray-50 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., Bangalore"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                          !isEditing
                            ? "bg-gray-50 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., Karnataka"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                          !isEditing
                            ? "bg-gray-50 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  {/* PIN Code and Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., 560001"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                          !isEditing
                            ? "bg-gray-50 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled={true}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Billing Address Different */}
                  <div className="border-t pt-4 mt-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="billingDifferent"
                        checked={formData.billingDifferent}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billingDifferent: e.target.checked,
                          })
                        }
                        disabled={!isEditing}
                        className="w-5 h-5 text-[#9a8457] border-gray-300 rounded focus:ring-[#9a8457]"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Billing address is different from shipping address
                      </span>
                    </label>
                  </div>

                  {/* Billing Address */}
                  {formData.billingDifferent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Billing Address *
                      </label>
                      <textarea
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billingAddress: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        rows={3}
                        placeholder="Enter complete billing address"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                          !isEditing
                            ? "bg-gray-50 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>
                  )}

                  {/* GST Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GST Number (Only for business purchase above ₹2L)
                    </label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="e.g., 22AAAAA0000A1Z5"
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                        !isEditing
                          ? "bg-gray-50 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* International Address Fields */}
              {addressType === "international" && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    International Shipping Address
                  </h3>

                  {/* Apartment/Suite Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment / Suite Number *
                    </label>
                    <input
                      type="text"
                      name="apartmentSuite"
                      value={formData.apartmentSuite}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="e.g., Apt 502, Suite 5B"
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                        !isEditing
                          ? "bg-gray-50 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>

                  {/* Street Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Name *
                    </label>
                    <input
                      type="text"
                      name="streetName"
                      value={formData.streetName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="e.g., 123 Main Street"
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                        !isEditing
                          ? "bg-gray-50 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>

                  {/* City and State/Province */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="cityInternational"
                        value={formData.cityInternational}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your city"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                          !isEditing
                            ? "bg-gray-50 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State / Province / Region *
                      </label>
                      <input
                        type="text"
                        name="stateProvince"
                        value={formData.stateProvince}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter state/province"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                          !isEditing
                            ? "bg-gray-50 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Postal/ZIP Code and Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal / ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="postalZipCode"
                        value={formData.postalZipCode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., 10001, SW1A 1AA"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                          !isEditing
                            ? "bg-gray-50 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="countryInternational"
                        value={formData.countryInternational}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., United States, United Kingdom"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                          !isEditing
                            ? "bg-gray-50 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

       

        {/* Terms & Conditions Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="bg-[#9a8457] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
              T&C
            </span>
            Shipping Terms & Conditions
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">1.</span>
              <p className="text-gray-700 text-sm">
                All shipments are fully insured until delivery.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">2.</span>
              <p className="text-gray-700 text-sm">
                Signature upon delivery may be needed for high-value orders.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">3.</span>
              <p className="text-gray-700 text-sm">
                Nymara Jewels is not responsible for delays caused by customs
                authorities or unforeseen circumstances.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">4.</span>
              <p className="text-gray-700 text-sm">
                All domestic and international orders are shipped through secure
                and insured courier partners.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">5.</span>
              <p className="text-gray-700 text-sm">
                Full payment must be received before dispatch of any order.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">6.</span>
              <p className="text-gray-700 text-sm">
                Orders are typically dispatched within the estimated processing
                timeline mentioned on the product page.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">7.</span>
              <p className="text-gray-700 text-sm">
                Customers must provide accurate and complete shipping details.
                Nymara Jewels is not responsible for delays caused by incorrect
                address information.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">8.</span>
              <p className="text-gray-700 text-sm">
                Risk of loss or damage transfers to the customer upon successful
                delivery confirmation.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">9.</span>
              <p className="text-gray-700 text-sm">
                Nymara Jewels reserves the right to request identity
                verification for high-value transactions if required by law or
                courier compliance.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">10.</span>
              <p className="text-gray-700 text-sm">
                Customs authorities may require additional identification or
                documentation from the recipient. Any delays caused by customs
                clearance are beyond the control of Nymara Jewels.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">11.</span>
              <p className="text-gray-700 text-sm">
                Orders cannot be redirected once shipped internationally.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">12.</span>
              <p className="text-gray-700 text-sm">
                Refusal to accept delivery may result in return shipping
                charges, customs penalties, or non-refundable fees being
                deducted from any eligible refund.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">13.</span>
              <p className="text-gray-700 text-sm">
                Nymara Jewels is not responsible for delays caused by customs
                inspections, regulatory authorities, or force majeure events.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">14.</span>
              <p className="text-gray-700 text-sm">
                P.O. Box addresses may not be accepted for high-value shipments.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">15.</span>
              <p className="text-gray-700 text-sm">
                Estimated delivery timelines are indicative and not guaranteed.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">16.</span>
              <p className="text-gray-700 text-sm">
                Customers will receive tracking details once the order is
                dispatched.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#9a8457] font-bold mt-1">17.</span>
              <p className="text-gray-700 text-sm">
                Nymara Jewels reserves the right to cancel or hold shipments in
                case of suspected fraudulent activity or payment issues.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#f9f5ef] rounded-lg border-l-4 border-[#9a8457]">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-[#9a8457]">Important:</span>{" "}
              By placing an order, you acknowledge and agree to these shipping
              terms and conditions. For any queries, please contact our customer
              support.
            </p>
          </div>
        </div>
         {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            {/* <Home className="mx-auto text-[#9a8457] mb-2" /> */}
            <div className="text-3xl font-bold text-[#9a8457] mt-9 mb-2">0</div>
            <div className="text-gray-600">Total Orders</div>
          </div>

          <div
            onClick={() => (window.location.href = "/favorites")}
            className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:bg-[#f9f5ef] transition"
          >
            <Heart className="mx-auto text-[#9a8457] mb-2" />
            <div className="text-3xl font-bold text-[#9a8457] mb-2">
              {wishlistCount}
            </div>
            <div className="text-gray-600">Wishlist Items</div>
          </div>

          <div
            onClick={() => (window.location.href = "/account/addresses")}
            className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:bg-[#f9f5ef] transition"
          >
            <Home className="mx-auto text-[#9a8457] mb-2" />
            <div className="text-3xl font-bold text-[#9a8457] mb-2">1</div>
            <div className="text-gray-600">Saved Addresses</div>
          </div>

        </div> 
      </div>
    </div>
  );
};

export default ProfilePage;
