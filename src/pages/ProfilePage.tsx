import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Edit2, Save, X,Heart,Home } from "lucide-react";
import { useAuth, useWishlist } from '@/contexts/AppContext';
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const { user } = useAuth();
  const { wishlist, wishlistCount } = useWishlist();
const [savedAddresses, setSavedAddresses] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
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

      setFormData({
        firstName,
        lastName,
        email: data.user.email,
        phone: data.user.phoneNumber,
        address: data.details?.address?.street || "",
        city: data.details?.address?.city || "",
        state: data.details?.address?.state || "",
        zipCode: data.details?.address?.postalCode || "",
        country: data.details?.address?.country || "India",
      });
    } catch (err: any) {
      console.error("❌ Failed to load profile:", err.response?.data || err.message);
    }
  };

  if (user && user.isLoggedIn) {
    fetchUserDetails();
  }
}, [user]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const handleSave = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/api/user/details`,
      {
        userId: user.id,  // must include
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          country: formData.country,
        },
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // ✅ fix here
      }
    );

    console.log("✅ Profile updated:", res.data);
    setIsEditing(false);

    // Optionally store fresh details
    localStorage.setItem("userDetails", JSON.stringify(res.data));
  } catch (err: any) {
    console.error("❌ Failed to update profile:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to update profile");
  }
};



  const handleCancel = () => {
    // Reset to original values
    if (user && user.isLoggedIn) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        country: user.country || 'India'
      });
    }
    setIsEditing(false);
  };

  if (!user || !user.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please log in to view your profile</h2>
          <a href="/login" className="text-[#9a8457] hover:text-[#7d6b47] font-medium">
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
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
                    !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
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
                    !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
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
                    !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
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
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                    !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your street address"
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                    !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your city"
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                  !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                }`}
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your state"
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                  !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                }`}
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your zip code"
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                  !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                }`}
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all ${
                  !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-[#9a8457] mb-2">0</div>
            <div className="text-gray-600">Total Orders</div>
          </div>
          <div
    onClick={() => (window.location.href = "/favorites")}
    className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:bg-[#f9f5ef] transition"
  >
    <Heart className="mx-auto text-[#9a8457] mb-2" />
    <div className="text-3xl font-bold text-[#9a8457] mb-2">{wishlistCount}</div>
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