// import { useState, useEffect } from "react";
// import {
//   User, Edit2, Save, ShoppingCart, X,
//   Heart, AlertCircle, CheckCircle, Package,
//   ChevronDown, ChevronUp, CreditCard, Settings,
//   MapPin, Clock, Truck, RotateCcw,
// } from "lucide-react";
// import { useAuth, useWishlist } from "@/contexts/AppContext";
// import axios from "axios";
// const API_URL = import.meta.env.VITE_API_URL;

// type Tab = "profile" | "orders" | "favorites" | "shipping";

// const ProfilePage = () => {
//   const { user } = useAuth();
//   const { wishlistCount } = useWishlist();
//   const [activeTab, setActiveTab] = useState<Tab>("profile");
//   const [savedAddresses, setSavedAddresses] = useState(0);
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [orders, setOrders] = useState<any[]>([]);
//   const [ordersLoading, setOrdersLoading] = useState(false);
//   const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [addressType, setAddressType] = useState<"domestic" | "international">("domestic");
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", email: "", phone: "",
//     houseNumber: "", streetArea: "", landmark: "", city: "", state: "",
//     pinCode: "", country: "India", gstNumber: "",
//     apartmentSuite: "", streetName: "", cityInternational: "",
//     stateProvince: "", postalZipCode: "", countryInternational: "",
//     billingDifferent: false, billingAddress: "",
//   });

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/user/details`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         const data = res.data;
//         const [firstName, ...lastParts] = (data.user.name || "").split(" ");
//         const lastName = lastParts.join(" ");
//         const country = data.details?.address?.country || "India";
//         const isDomestic = country === "India";
//         setAddressType(isDomestic ? "domestic" : "international");
//         setFormData({
//           firstName, lastName,
//           email: data.user.email,
//           phone: data.user.phoneNumber,
//           houseNumber: data.details?.address?.houseNumber || "",
//           streetArea: data.details?.address?.streetArea || "",
//           landmark: data.details?.address?.landmark || "",
//           city: data.details?.address?.city || "",
//           state: data.details?.address?.state || "",
//           pinCode: data.details?.address?.pinCode || "",
//           country: isDomestic ? country : "India",
//           gstNumber: data.details?.address?.gstNumber || "",
//           apartmentSuite: data.details?.address?.apartmentSuite || "",
//           streetName: data.details?.address?.streetName || "",
//           cityInternational: data.details?.address?.cityInternational || "",
//           stateProvince: data.details?.address?.stateProvince || "",
//           postalZipCode: data.details?.address?.postalZipCode || "",
//           countryInternational: !isDomestic ? country : "",
//           billingDifferent: data.details?.address?.billingDifferent || false,
//           billingAddress: data.details?.address?.billingAddress || "",
//         });
//         const address = data.details?.address;
//         setSavedAddresses(address && (address.houseNumber || address.streetArea || address.apartmentSuite || address.streetName) ? 1 : 0);
//       } catch (err: any) {
//         console.error("❌ Failed to load profile:", err.response?.data || err.message);
//       }
//     };
//     if (user && user.isLoggedIn) fetchUserDetails();
//   }, [user]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setOrdersLoading(true);
//       try {
//         const res = await axios.get(`${API_URL}/api/orders/my`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setOrders(res.data.orders || []);
//       } catch (err: any) {
//         console.error("❌ Failed to load orders:", err.response?.data || err.message);
//       } finally {
//         setOrdersLoading(false);
//       }
//     };
//     if (user && user.isLoggedIn) fetchOrders();
//   }, [user]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       if (addressType === "domestic") {
//         const required = [
//           { field: "firstName", label: "First Name" }, { field: "lastName", label: "Last Name" },
//           { field: "email", label: "Email" }, { field: "phone", label: "Phone" },
//           { field: "houseNumber", label: "House/Flat Number" }, { field: "streetArea", label: "Street/Area" },
//           { field: "city", label: "City" }, { field: "state", label: "State" }, { field: "pinCode", label: "PIN Code" },
//         ];
//         const missing = required.filter(({ field }) => {
//           const v = formData[field as keyof typeof formData];
//           return typeof v === "string" ? v.trim() === "" : !v;
//         });
//         if (missing.length > 0) {
//           setErrorMessage(`Missing required domestic address fields: ${missing.map(f => f.label).join(", ")}`);
//           setShowErrorModal(true); return;
//         }
//       }
//       if (addressType === "international") {
//         const required = [
//           { field: "firstName", label: "First Name" }, { field: "lastName", label: "Last Name" },
//           { field: "email", label: "Email" }, { field: "phone", label: "Phone" },
//           { field: "apartmentSuite", label: "Apartment/Suite Number" }, { field: "streetName", label: "Street Name" },
//           { field: "cityInternational", label: "City" }, { field: "stateProvince", label: "State/Province" },
//           { field: "postalZipCode", label: "Postal/ZIP Code" }, { field: "countryInternational", label: "Country" },
//         ];
//         const missing = required.filter(({ field }) => {
//           const v = formData[field as keyof typeof formData];
//           return typeof v === "string" ? v.trim() === "" : !v;
//         });
//         if (missing.length > 0) {
//           setErrorMessage(`Missing required international address fields: ${missing.map(f => f.label).join(", ")}`);
//           setShowErrorModal(true); return;
//         }
//       }
//       const addressData = addressType === "domestic"
//         ? { type: "domestic", houseNumber: formData.houseNumber, streetArea: formData.streetArea, landmark: formData.landmark, city: formData.city, state: formData.state, pinCode: formData.pinCode, country: formData.country, gstNumber: formData.gstNumber, billingDifferent: formData.billingDifferent, billingAddress: formData.billingAddress }
//         : { type: "international", apartmentSuite: formData.apartmentSuite, streetName: formData.streetName, cityInternational: formData.cityInternational, stateProvince: formData.stateProvince, postalZipCode: formData.postalZipCode, countryInternational: formData.countryInternational };
//       const res = await axios.post(`${API_URL}/api/user/details`, {
//         userId: user.id, firstName: formData.firstName, lastName: formData.lastName,
//         email: formData.email, phoneNumber: formData.phone, address: addressData,
//       }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
//       setIsEditing(false);
//       setShowSuccessModal(true);
//       localStorage.setItem("userDetails", JSON.stringify(res.data));
//     } catch (err: any) {
//       setErrorMessage(err.response?.data?.message || "Failed to update profile");
//       setShowErrorModal(true);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: user?.firstName || "", lastName: user?.lastName || "",
//       email: user?.email || "", phone: user?.phoneNumber || "",
//       houseNumber: "", streetArea: "", landmark: "", city: user?.city || "",
//       state: user?.state || "", pinCode: user?.zipCode || "", country: user?.country || "India",
//       gstNumber: "", apartmentSuite: "", streetName: "", cityInternational: "",
//       stateProvince: "", postalZipCode: "", countryInternational: "",
//       billingDifferent: false, billingAddress: "",
//     });
//     setIsEditing(false);
//   };

//   useEffect(() => {
//     const handleEscKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") { setShowErrorModal(false); setShowSuccessModal(false); }
//     };
//     if (showErrorModal || showSuccessModal) {
//       document.addEventListener("keydown", handleEscKey);
//       document.body.style.overflow = "hidden";
//     }
//     return () => { document.removeEventListener("keydown", handleEscKey); document.body.style.overflow = "unset"; };
//   }, [showErrorModal, showSuccessModal]);

//   if (!user || !user.isLoggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please log in to view your profile</h2>
//           <a href="/login" className="text-[#9a8457] hover:text-[#7d6b47] font-medium">Go to Login</a>
//         </div>
//       </div>
//     );
//   }

//   const inputCls = (editing: boolean) =>
//     `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9a8457] transition-all ${editing ? "bg-white border-gray-300" : "bg-gray-50 border-gray-200 cursor-not-allowed text-gray-600"}`;

//   const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
//     { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
//     { id: "orders", label: "Orders", icon: <ShoppingCart className="w-4 h-4" /> },
//     { id: "favorites", label: "Favorites", icon: <Heart className="w-4 h-4" /> },
//     { id: "shipping", label: "Shipping T&C", icon: <CreditCard className="w-4 h-4" /> },
//   ];

//   const displayAddress = () => {
//     if (addressType === "domestic") {
//       const parts = [formData.houseNumber, formData.streetArea, formData.city, formData.state, formData.pinCode].filter(Boolean);
//       return parts.length ? parts.join(", ") : "No default address set.";
//     }
//     const parts = [formData.apartmentSuite, formData.streetName, formData.cityInternational, formData.stateProvince, formData.postalZipCode, formData.countryInternational].filter(Boolean);
//     return parts.length ? parts.join(", ") : "No default address set.";
//   };

//   // Order status config
//   const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
//     pending:    { label: "Pending",    color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",   icon: <Clock className="w-3.5 h-3.5" /> },
//     processing: { label: "Processing", color: "text-blue-700",   bg: "bg-blue-50 border-blue-200",     icon: <Package className="w-3.5 h-3.5" /> },
//     shipped:    { label: "Shipped",    color: "text-violet-700", bg: "bg-violet-50 border-violet-200", icon: <Truck className="w-3.5 h-3.5" /> },
//     delivered:  { label: "Delivered",  color: "text-green-700",  bg: "bg-green-50 border-green-200",   icon: <CheckCircle className="w-3.5 h-3.5" /> },
//     cancelled:  { label: "Cancelled",  color: "text-red-700",    bg: "bg-red-50 border-red-200",       icon: <X className="w-3.5 h-3.5" /> },
//     returned:   { label: "Returned",   color: "text-gray-600",   bg: "bg-gray-50 border-gray-200",     icon: <RotateCcw className="w-3.5 h-3.5" /> },
//   };
//   const paymentConfig: Record<string, { color: string; bg: string }> = {
//     Paid:     { color: "text-green-700",  bg: "bg-green-50 border-green-200" },
//     Pending:  { color: "text-amber-700",  bg: "bg-amber-50 border-amber-200" },
//     Failed:   { color: "text-red-700",    bg: "bg-red-50 border-red-200" },
//     Refunded: { color: "text-gray-600",   bg: "bg-gray-50 border-gray-200" },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-28 pb-16 px-4">
//       <div className="max-w-6xl sm:mt-32 mx-auto flex flex-col md:flex-row gap-6 items-start">

//         {/* ── Sidebar ── */}
//         <aside className="w-full md:w-56 shrink-0">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             <div className="flex items-center gap-3 p-4 border-b border-gray-100">
//               <div className="w-10 h-10 rounded-full bg-[#f9f5ef] flex items-center justify-center shrink-0">
//                 <User className="w-5 h-5 text-[#9a8457]" />
//               </div>
//               <div className="min-w-0">
//                 <p className="font-semibold text-gray-800 text-sm truncate">{formData.firstName} {formData.lastName}</p>
//                 <p className="text-xs text-gray-500 truncate">{formData.email}</p>
//               </div>
//             </div>
//             <nav className="p-2">
//               {navItems.map((item) => (
//                 <button key={item.id} onClick={() => setActiveTab(item.id)}
//                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${activeTab === item.id ? "bg-[#f9f5ef] text-[#9a8457]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"}`}>
//                   {item.icon}{item.label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//           <div className="mt-4 grid grid-cols-3 md:grid-cols-1 gap-2">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
//               <p className="text-xl font-bold text-[#9a8457]">{orders.length}</p>
//               <p className="text-xs text-gray-500 mt-0.5">Orders</p>
//             </div>
//             <div onClick={() => window.location.href = "/favorites"} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center cursor-pointer hover:bg-[#f9f5ef] transition">
//               <p className="text-xl font-bold text-[#9a8457]">{wishlistCount}</p>
//               <p className="text-xs text-gray-500 mt-0.5">Wishlist</p>
//             </div>
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
//               <p className="text-xl font-bold text-[#9a8457]">{savedAddresses}</p>
//               <p className="text-xs text-gray-500 mt-0.5">Addresses</p>
//             </div>
//           </div>
//         </aside>

//         {/* ── Main content ── */}
//         <main className="flex-1 min-w-0">
//           {/* <h1 className="text-2xl font-semibold text-gray-800 mb-4">{formData.firstName} {formData.lastName}</h1> */}

//           {/* ── PROFILE TAB ── */}
//           {activeTab === "profile" && (
//             <div className="space-y-4">
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                 <div className="flex items-center justify-between mb-5">
//                   <h2 className="flex items-center gap-2 text-base font-semibold text-gray-800">
//                     <User className="w-4 h-4 text-[#9a8457]" /> Personal Information
//                   </h2>
//                   {!isEditing ? (
//                     <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-sm text-[#9a8457] hover:text-[#7d6b47] font-medium">
//                       <Edit2 className="w-3.5 h-3.5" /> Edit
//                     </button>
//                   ) : (
//                     <div className="flex gap-2">
//                       <button onClick={handleSave} className="flex items-center gap-1.5 text-sm bg-[#9a8457] text-white px-3 py-1.5 rounded-lg hover:bg-[#8a7547]">
//                         <Save className="w-3.5 h-3.5" /> Save
//                       </button>
//                       <button onClick={handleCancel} className="flex items-center gap-1.5 text-sm border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50">
//                         <X className="w-3.5 h-3.5" /> Cancel
//                       </button>
//                     </div>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div className="border border-gray-100 rounded-xl p-4">
//                     <p className="text-xs text-gray-400 mb-1">Email Address</p>
//                     {isEditing ? <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputCls(true)} /> : <p className="text-sm font-medium text-gray-800">{formData.email || "—"}</p>}
//                   </div>
//                   <div className="border border-gray-100 rounded-xl p-4">
//                     <p className="text-xs text-gray-400 mb-1">Customer ID</p>
//                     <p className="text-sm font-medium text-gray-800">{(user as any)?.uId || "—"}</p>
//                   </div>
//                   <div className="border border-gray-100 rounded-xl p-4">
//                     <p className="text-xs text-gray-400 mb-1">{addressType === "domestic" ? "First Name (as per Govt ID)" : "First Name (as per Passport)"}</p>
//                     {isEditing ? <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={inputCls(true)} /> : <p className="text-sm font-medium text-gray-800">{formData.firstName || "—"}</p>}
//                   </div>
//                   <div className="border border-gray-100 rounded-xl p-4">
//                     <p className="text-xs text-gray-400 mb-1">{addressType === "domestic" ? "Last Name (as per Govt ID)" : "Last Name (as per Passport)"}</p>
//                     {isEditing ? <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={inputCls(true)} /> : <p className="text-sm font-medium text-gray-800">{formData.lastName || "—"}</p>}
//                   </div>
//                   <div className="border border-gray-100 rounded-xl p-4">
//                     <p className="text-xs text-gray-400 mb-1">{addressType === "domestic" ? "Mobile Number" : "Contact Number (with country code)"}</p>
//                     {isEditing ? <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={addressType === "domestic" ? "+91 XXXXX XXXXX" : "+1 XXX XXX XXXX"} className={inputCls(true)} /> : <p className="text-sm font-medium text-gray-800">{formData.phone || <span className="text-[#9a8457] text-xs">Add</span>}</p>}
//                   </div>
//                   <div className="border border-gray-100 rounded-xl p-4">
//                     <p className="text-xs text-gray-400 mb-1">Address</p>
//                     <p className="text-sm text-gray-700">{displayAddress()}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-4">
//                   <Settings className="w-4 h-4 text-[#9a8457]" /> Manage Addresses
//                 </h2>
//                 {!isEditing && (
//                   <div className="bg-[#fffbf0] border border-[#f0e6c8] rounded-lg px-4 py-3 mb-4 text-sm text-gray-600">
//                     <span className="font-semibold text-[#9a8457]">Note:</span> Click <span className="font-medium">Edit</span> in Personal Information above to update your address details.
//                   </div>
//                 )}
//                 <div className="flex gap-2 mb-4">
//                   {(["domestic", "international"] as const).map((t) => (
//                     <button key={t} type="button" onClick={() => isEditing && setAddressType(t)}
//                       className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${addressType === t ? "bg-[#9a8457] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}>
//                       {t === "domestic" ? "Domestic (India)" : "International"}
//                     </button>
//                   ))}
//                 </div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">My Addresses</h3>
//                 {addressType === "domestic" && (
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       {[
//                         { name: "houseNumber", label: "House / Flat Number *", placeholder: "e.g., 502, 5th Floor" },
//                         { name: "streetArea", label: "Street / Area *", placeholder: "e.g., MG Road" },
//                         { name: "landmark", label: "Landmark", placeholder: "e.g., Near City Mall" },
//                         { name: "city", label: "City *", placeholder: "e.g., Bangalore" },
//                         { name: "state", label: "State *", placeholder: "e.g., Karnataka" },
//                         { name: "pinCode", label: "PIN Code *", placeholder: "e.g., 560001" },
//                         { name: "gstNumber", label: "GST Number (business >₹2L)", placeholder: "e.g., 22AAAAA0000A1Z5" },
//                       ].map(f => (
//                         <div key={f.name}>
//                           <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
//                           <input type="text" name={f.name} value={formData[f.name as keyof typeof formData] as string} onChange={handleInputChange} disabled={!isEditing} placeholder={f.placeholder} className={inputCls(isEditing)} />
//                         </div>
//                       ))}
//                       <div>
//                         <label className="block text-xs text-gray-500 mb-1">Country</label>
//                         <input type="text" name="country" value={formData.country} disabled className={inputCls(false)} />
//                       </div>
//                     </div>
//                     <div className="border-t pt-3">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input type="checkbox" checked={formData.billingDifferent} onChange={(e) => setFormData({ ...formData, billingDifferent: e.target.checked })} disabled={!isEditing} className="w-4 h-4 text-[#9a8457] border-gray-300 rounded focus:ring-[#9a8457]" />
//                         <span className="text-sm text-gray-700">Billing address is different from shipping address</span>
//                       </label>
//                     </div>
//                     {formData.billingDifferent && (
//                       <div>
//                         <label className="block text-xs text-gray-500 mb-1">Billing Address *</label>
//                         <textarea value={formData.billingAddress} onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })} disabled={!isEditing} rows={3} placeholder="Enter complete billing address" className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9a8457] transition-all ${isEditing ? "bg-white border-gray-300" : "bg-gray-50 border-gray-200 cursor-not-allowed"}`} />
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 {addressType === "international" && (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {[
//                       { name: "apartmentSuite", label: "Apartment / Suite Number *", placeholder: "e.g., Apt 502" },
//                       { name: "streetName", label: "Street Name *", placeholder: "e.g., 123 Main Street" },
//                       { name: "cityInternational", label: "City *", placeholder: "Enter your city" },
//                       { name: "stateProvince", label: "State / Province *", placeholder: "Enter state/province" },
//                       { name: "postalZipCode", label: "Postal / ZIP Code *", placeholder: "e.g., 10001" },
//                       { name: "countryInternational", label: "Country *", placeholder: "e.g., United States" },
//                     ].map(f => (
//                       <div key={f.name}>
//                         <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
//                         <input type="text" name={f.name} value={formData[f.name as keyof typeof formData] as string} onChange={handleInputChange} disabled={!isEditing} placeholder={f.placeholder} className={inputCls(isEditing)} />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* ── ORDERS TAB ── */}
//           {activeTab === "orders" && (
//             <div className="space-y-4">
//               {/* Summary bar */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                 {[
//                   { label: "Total Orders", value: orders.length, color: "text-[#9a8457]" },
//                   { label: "Delivered", value: orders.filter(o => o.status === "delivered").length, color: "text-green-600" },
//                   { label: "Processing", value: orders.filter(o => ["pending","processing","shipped"].includes(o.status)).length, color: "text-blue-600" },
//                   { label: "Cancelled", value: orders.filter(o => o.status === "cancelled").length, color: "text-red-500" },
//                 ].map(s => (
//                   <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
//                     <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
//                     <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Orders list */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
//                   <Package className="w-4 h-4 text-[#9a8457]" />
//                   <h2 className="text-base font-semibold text-gray-800">Order History</h2>
//                 </div>

//                 {ordersLoading ? (
//                   <div className="flex flex-col items-center justify-center py-16 gap-3">
//                     <div className="w-8 h-8 border-4 border-[#9a8457] border-t-transparent rounded-full animate-spin" />
//                     <p className="text-sm text-gray-400">Loading your orders…</p>
//                   </div>
//                 ) : orders.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center py-16 text-center px-6">
//                     <div className="w-16 h-16 rounded-full bg-[#f9f5ef] flex items-center justify-center mb-4">
//                       <ShoppingCart className="w-7 h-7 text-[#9a8457]" />
//                     </div>
//                     <p className="font-semibold text-gray-700 mb-1">No orders yet</p>
//                     <p className="text-sm text-gray-400 max-w-xs">Your past orders will appear here once you make a purchase.</p>
//                     <a href="/products" className="mt-5 inline-block bg-[#9a8457] text-white text-sm px-5 py-2.5 rounded-lg hover:bg-[#8a7547] transition-colors">Start Shopping</a>
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-gray-50">
//                     {orders.map((order) => {
//                       const isExpanded = expandedOrder === order.oId;
//                       const sc = statusConfig[order.status] || { label: order.status, color: "text-gray-600", bg: "bg-gray-50 border-gray-200", icon: null };
//                       const pc = paymentConfig[order.paymentStatus] || { color: "text-gray-600", bg: "bg-gray-50 border-gray-200" };
//                       const orderDate = new Date(order.orderDate || order.createdAt);

//                       return (
//                         <div key={order.oId}>
//                           {/* Order row */}
//                           <button
//                             onClick={() => setExpandedOrder(isExpanded ? null : order.oId)}
//                             className="w-full text-left px-6 py-4 hover:bg-gray-50/70 transition-colors"
//                           >
//                             <div className="flex items-start justify-between gap-4">
//                               {/* Left: order meta */}
//                               <div className="flex items-start gap-4 min-w-0">
//                                 {/* Icon circle */}
//                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${sc.bg}`}>
//                                   <span className={sc.color}>{sc.icon}</span>
//                                 </div>
//                                 <div className="min-w-0">
//                                   <div className="flex flex-wrap items-center gap-2 mb-1">
//                                     <span className="text-sm font-semibold text-gray-800">{order.oId}</span>
//                                     <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${sc.bg} ${sc.color}`}>
//                                       {sc.icon}<span>{sc.label}</span>
//                                     </span>
//                                     <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${pc.bg} ${pc.color}`}>
//                                       {order.paymentStatus}
//                                     </span>
//                                   </div>
//                                   <p className="text-xs text-gray-400 flex items-center gap-1">
//                                     <Clock className="w-3 h-3" />
//                                     {orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
//                                   </p>
//                                   {/* Product names preview */}
//                                   <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">
//                                     {order.products?.slice(0, 2).map((p: any) => p.productId?.name || "Product").join(", ")}
//                                     {order.products?.length > 2 && ` +${order.products.length - 2} more`}
//                                   </p>
//                                 </div>
//                               </div>
//                               {/* Right: total + chevron */}
//                               <div className="flex items-center gap-3 shrink-0">
//                                 <div className="text-right">
//                                   <p className="text-sm font-bold text-gray-800">
//                                     {order.totalAmount?.symbol}{order.totalAmount?.amount?.toLocaleString()}
//                                   </p>
//                                   <p className="text-xs text-gray-400">{order.products?.length} item{order.products?.length !== 1 ? "s" : ""}</p>
//                                 </div>
//                                 <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isExpanded ? "bg-[#9a8457] text-white" : "bg-gray-100 text-gray-500"}`}>
//                                   {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
//                                 </div>
//                               </div>
//                             </div>
//                           </button>

//                           {/* Expanded details */}
//                           {isExpanded && (
//                             <div className="bg-gray-50/60 border-t border-gray-100 px-6 py-5 space-y-5">
//                               {/* Items */}
//                               <div>
//                                 <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Items Ordered</p>
//                                 <div className="space-y-2">
//                                   {order.products?.map((item: any, idx: number) => (
//                                     <div key={idx} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
//                                       {item.productId?.coverImage ? (
//                                         <img src={item.productId.coverImage} alt={item.productId?.name || "Product"} className="w-12 h-12 object-cover rounded-lg shrink-0" />
//                                       ) : (
//                                         <div className="w-12 h-12 rounded-lg bg-[#f9f5ef] flex items-center justify-center shrink-0">
//                                           <Package className="w-5 h-5 text-[#9a8457]" />
//                                         </div>
//                                       )}
//                                       <div className="flex-1 min-w-0">
//                                         <p className="text-sm font-medium text-gray-800 truncate">{item.productId?.name || "Product"}</p>
//                                         <p className="text-xs text-gray-400 mt-0.5">
//                                           {item.variant && <span className="mr-2">{item.variant}</span>}
//                                           Qty: {item.quantity}
//                                         </p>
//                                       </div>
//                                       {item.price?.amount > 0 && (
//                                         <p className="text-sm font-semibold text-gray-700 shrink-0">
//                                           {item.price.symbol}{item.price.amount?.toLocaleString()}
//                                         </p>
//                                       )}
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>

//                               {/* Total row */}
//                               <div className="flex justify-end">
//                                 <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 text-right shadow-sm">
//                                   <p className="text-xs text-gray-400 mb-0.5">Order Total</p>
//                                   <p className="text-lg font-bold text-[#9a8457]">{order.totalAmount?.symbol}{order.totalAmount?.amount?.toLocaleString()}</p>
//                                 </div>
//                               </div>

//                               {/* Delivery address */}
//                               {order.deliveryAddress && (
//                                 <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
//                                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
//                                     <MapPin className="w-3.5 h-3.5 text-[#9a8457]" /> Delivery Address
//                                   </p>
//                                   <p className="text-sm font-medium text-gray-800">{order.deliveryAddress.name}</p>
//                                   <p className="text-sm text-gray-500">{order.deliveryAddress.phone}</p>
//                                   <p className="text-sm text-gray-600 mt-1">
//                                     {order.deliveryAddress.addressLine1}
//                                     {order.deliveryAddress.addressLine2 && `, ${order.deliveryAddress.addressLine2}`}
//                                     {`, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`}
//                                   </p>
//                                 </div>
//                               )}

//                               {/* Track button */}
//                               {order.deliveryLink && (
//                                 <a href={order.deliveryLink} target="_blank" rel="noopener noreferrer"
//                                   className="inline-flex items-center gap-2 bg-[#9a8457] text-white text-sm px-4 py-2.5 rounded-lg hover:bg-[#8a7547] transition-colors font-medium">
//                                   <Truck className="w-4 h-4" /> Track your order
//                                 </a>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* ── FAVORITES TAB ── */}
//           {activeTab === "favorites" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h2 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-5">
//                 <Heart className="w-4 h-4 text-[#9a8457]" /> Favorites
//               </h2>
//               <div className="text-center py-12">
//                 <Heart className="mx-auto mb-3 text-gray-200 w-12 h-12" />
//                 <p className="text-gray-600 font-medium mb-3">You have {wishlistCount} item{wishlistCount !== 1 ? "s" : ""} in your wishlist</p>
//                 <a href="/favorites" className="inline-block bg-[#9a8457] text-white px-5 py-2.5 rounded-lg text-sm hover:bg-[#8a7547] transition-colors">View Wishlist</a>
//               </div>
//             </div>
//           )}

//           {/* ── SHIPPING T&C TAB ── */}
//           {activeTab === "shipping" && (
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h2 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-5">
//                 <CreditCard className="w-4 h-4 text-[#9a8457]" /> Shipping Terms & Conditions
//               </h2>
//               <div className="space-y-3">
//                 {[
//                   "All shipments are fully insured until delivery.",
//                   "Signature upon delivery may be needed for high-value orders.",
//                   "Nymara Jewels is not responsible for delays caused by customs authorities or unforeseen circumstances.",
//                   "All domestic and international orders are shipped through secure and insured courier partners.",
//                   "Full payment must be received before dispatch of any order.",
//                   "Orders are typically dispatched within the estimated processing timeline mentioned on the product page.",
//                   "Customers must provide accurate and complete shipping details. Nymara Jewels is not responsible for delays caused by incorrect address information.",
//                   "Risk of loss or damage transfers to the customer upon successful delivery confirmation.",
//                   "Nymara Jewels reserves the right to request identity verification for high-value transactions if required by law or courier compliance.",
//                   "Customs authorities may require additional identification or documentation from the recipient. Any delays caused by customs clearance are beyond the control of Nymara Jewels.",
//                   "Orders cannot be redirected once shipped internationally.",
//                   "Refusal to accept delivery may result in return shipping charges, customs penalties, or non-refundable fees being deducted from any eligible refund.",
//                   "Nymara Jewels is not responsible for delays caused by customs inspections, regulatory authorities, or force majeure events.",
//                   "P.O. Box addresses may not be accepted for high-value shipments.",
//                   "Estimated delivery timelines are indicative and not guaranteed.",
//                   "Customers will receive tracking details once the order is dispatched.",
//                   "Nymara Jewels reserves the right to cancel or hold shipments in case of suspected fraudulent activity or payment issues.",
//                 ].map((text, i) => (
//                   <div key={i} className="flex items-start gap-3">
//                     <span className="text-[#9a8457] font-semibold text-sm shrink-0 mt-0.5">{i + 1}.</span>
//                     <p className="text-sm text-gray-700">{text}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-5 p-4 bg-[#f9f5ef] rounded-lg border-l-4 border-[#9a8457]">
//                 <p className="text-sm text-gray-700"><span className="font-semibold text-[#9a8457]">Important:</span> By placing an order, you acknowledge and agree to these shipping terms and conditions.</p>
//               </div>
//             </div>
//           )}

//         </main>
//       </div>

//       {/* Error Modal */}
//       {showErrorModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowErrorModal(false); }}>
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
//             <div className="relative p-6 pb-4">
//               <button onClick={() => setShowErrorModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
//               <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-red-100 rounded-full"><AlertCircle className="w-7 h-7 text-red-600" /></div>
//               <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Validation Error</h3>
//               <div className="text-gray-600 text-center text-sm">
//                 <p className="mb-2">{errorMessage.includes("Missing required") ? "Please fill in the following required fields:" : errorMessage}</p>
//                 {errorMessage.includes("Missing required") && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
//                     <p className="text-red-700 text-sm font-medium">{errorMessage.split(": ")[1]}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="p-6 pt-2">
//               <button onClick={() => setShowErrorModal(false)} className="w-full px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors">Got it</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowSuccessModal(false); }}>
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
//             <div className="relative p-6 pb-4">
//               <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
//               <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full"><CheckCircle className="w-7 h-7 text-green-600" /></div>
//               <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Profile Updated!</h3>
//               <p className="text-gray-600 text-center text-sm">Your profile information has been successfully updated and saved.</p>
//             </div>
//             <div className="p-6 pt-2">
//               <button onClick={() => setShowSuccessModal(false)} className="w-full px-4 py-2.5 text-white bg-green-600 hover:bg-green-700 rounded-xl font-medium transition-colors">Great!</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

import { useState, useEffect } from "react";
import {
  User,
  Edit2,
  Save,
  ShoppingCart,
  X,
  Heart,
  AlertCircle,
  CheckCircle,
  Package,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Settings,
  MapPin,
  Clock,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useAuth, useWishlist } from "@/contexts/AppContext";
import axios from "axios";
import ProductLoader from "@/components/ui/ProductLoader";
const API_URL = import.meta.env.VITE_API_URL;

type Tab = "profile" | "orders" | "favorites" | "shipping";

const ProfilePage = () => {
  const { user } = useAuth();
  const { wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [savedAddresses, setSavedAddresses] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [addressType, setAddressType] = useState<"domestic" | "international">(
    "domestic",
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    houseNumber: "",
    streetArea: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      setProfileLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/user/details`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = res.data;
        const [firstName, ...lastParts] = (data.user.name || "").split(" ");
        const lastName = lastParts.join(" ");
        const country = data.details?.address?.country || "India";
        const isDomestic = country === "India";
        setAddressType(isDomestic ? "domestic" : "international");
        setFormData({
          firstName,
          lastName,
          email: data.user.email,
          phone: data.user.phoneNumber,
          houseNumber: data.details?.address?.houseNumber || "",
          streetArea: data.details?.address?.streetArea || "",
          landmark: data.details?.address?.landmark || "",
          city: data.details?.address?.city || "",
          state: data.details?.address?.state || "",
          pinCode: data.details?.address?.pinCode || "",
          country: isDomestic ? country : "India",
          gstNumber: data.details?.address?.gstNumber || "",
          apartmentSuite: data.details?.address?.apartmentSuite || "",
          streetName: data.details?.address?.streetName || "",
          cityInternational: data.details?.address?.cityInternational || "",
          stateProvince: data.details?.address?.stateProvince || "",
          postalZipCode: data.details?.address?.postalZipCode || "",
          countryInternational: !isDomestic ? country : "",
          billingDifferent: data.details?.address?.billingDifferent || false,
          billingAddress: data.details?.address?.billingAddress || "",
        });
        const address = data.details?.address;
        setSavedAddresses(
          address &&
            (address.houseNumber ||
              address.streetArea ||
              address.apartmentSuite ||
              address.streetName)
            ? 1
            : 0,
        );
      } catch (err: any) {
        console.error(
          "❌ Failed to load profile:",
          err.response?.data || err.message,
        );
      } finally {
        setProfileLoading(false);
      }
    };
    if (user && user.isLoggedIn) fetchUserDetails();
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const token = localStorage.getItem("token");
        console.log("🔑 Token being sent:", token);
        console.log("👤 user object:", JSON.stringify(user));

        const res = await axios.get(`${API_URL}/api/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📦 Raw API response:", res.data);
        console.log(
          "📦 Response type:",
          typeof res.data,
          Array.isArray(res.data),
        );

        const data = Array.isArray(res.data) ? res.data : res.data.orders || [];
        console.log("✅ Orders set:", data.length);
        setOrders(data);
      } catch (err: any) {
        console.error(
          "❌ Failed to load orders:",
          err.response?.status,
          err.response?.data || err.message,
        );
      } finally {
        setOrdersLoading(false);
      }
    };
    if (user && user.isLoggedIn) fetchOrders();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (addressType === "domestic") {
        const required = [
          { field: "firstName", label: "First Name" },
          { field: "lastName", label: "Last Name" },
          { field: "email", label: "Email" },
          { field: "phone", label: "Phone" },
          { field: "houseNumber", label: "House/Flat Number" },
          { field: "streetArea", label: "Street/Area" },
          { field: "city", label: "City" },
          { field: "state", label: "State" },
          { field: "pinCode", label: "PIN Code" },
        ];
        const missing = required.filter(({ field }) => {
          const v = formData[field as keyof typeof formData];
          return typeof v === "string" ? v.trim() === "" : !v;
        });
        if (missing.length > 0) {
          setErrorMessage(
            `Missing required domestic address fields: ${missing.map((f) => f.label).join(", ")}`,
          );
          setShowErrorModal(true);
          return;
        }
      }
      if (addressType === "international") {
        const required = [
          { field: "firstName", label: "First Name" },
          { field: "lastName", label: "Last Name" },
          { field: "email", label: "Email" },
          { field: "phone", label: "Phone" },
          { field: "apartmentSuite", label: "Apartment/Suite Number" },
          { field: "streetName", label: "Street Name" },
          { field: "cityInternational", label: "City" },
          { field: "stateProvince", label: "State/Province" },
          { field: "postalZipCode", label: "Postal/ZIP Code" },
          { field: "countryInternational", label: "Country" },
        ];
        const missing = required.filter(({ field }) => {
          const v = formData[field as keyof typeof formData];
          return typeof v === "string" ? v.trim() === "" : !v;
        });
        if (missing.length > 0) {
          setErrorMessage(
            `Missing required international address fields: ${missing.map((f) => f.label).join(", ")}`,
          );
          setShowErrorModal(true);
          return;
        }
      }
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
      setIsEditing(false);
      setShowSuccessModal(true);
      localStorage.setItem("userDetails", JSON.stringify(res.data));
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed to update profile",
      );
      setShowErrorModal(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phoneNumber || "",
      houseNumber: "",
      streetArea: "",
      landmark: "",
      city: user?.city || "",
      state: user?.state || "",
      pinCode: user?.zipCode || "",
      country: user?.country || "India",
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
    setIsEditing(false);
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowErrorModal(false);
        setShowSuccessModal(false);
      }
    };
    if (showErrorModal || showSuccessModal) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [showErrorModal, showSuccessModal]);

  if (profileLoading) {
    return <ProductLoader />;
  }

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

  const inputCls = (editing: boolean) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9a8457] transition-all ${editing ? "bg-white border-gray-300" : "bg-gray-50 border-gray-200 cursor-not-allowed text-gray-600"}`;

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingCart className="w-4 h-4" />,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: <Heart className="w-4 h-4" />,
    },
    {
      id: "shipping",
      label: "Shipping T&C",
      icon: <CreditCard className="w-4 h-4" />,
    },
  ];

  const displayAddress = () => {
    if (addressType === "domestic") {
      const parts = [
        formData.houseNumber,
        formData.streetArea,
        formData.city,
        formData.state,
        formData.pinCode,
      ].filter(Boolean);
      return parts.length ? parts.join(", ") : "No default address set.";
    }
    const parts = [
      formData.apartmentSuite,
      formData.streetName,
      formData.cityInternational,
      formData.stateProvince,
      formData.postalZipCode,
      formData.countryInternational,
    ].filter(Boolean);
    return parts.length ? parts.join(", ") : "No default address set.";
  };

  // Order status config
  const statusConfig: Record<
    string,
    { label: string; color: string; bg: string; icon: React.ReactNode }
  > = {
    pending: {
      label: "Pending",
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-200",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    processing: {
      label: "Processing",
      color: "text-blue-700",
      bg: "bg-blue-50 border-blue-200",
      icon: <Package className="w-3.5 h-3.5" />,
    },
    shipped: {
      label: "Shipped",
      color: "text-violet-700",
      bg: "bg-violet-50 border-violet-200",
      icon: <Truck className="w-3.5 h-3.5" />,
    },
    delivered: {
      label: "Delivered",
      color: "text-green-700",
      bg: "bg-green-50 border-green-200",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    cancelled: {
      label: "Cancelled",
      color: "text-red-700",
      bg: "bg-red-50 border-red-200",
      icon: <X className="w-3.5 h-3.5" />,
    },
    returned: {
      label: "Returned",
      color: "text-gray-600",
      bg: "bg-gray-50 border-gray-200",
      icon: <RotateCcw className="w-3.5 h-3.5" />,
    },
  };
  const paymentConfig: Record<string, { color: string; bg: string }> = {
    Paid: { color: "text-green-700", bg: "bg-green-50 border-green-200" },
    Pending: { color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
    Failed: { color: "text-red-700", bg: "bg-red-50 border-red-200" },
    Refunded: { color: "text-gray-600", bg: "bg-gray-50 border-gray-200" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-28 pb-16 px-4 overflow-x-hidden">
      <div className="max-w-6xl sm:mt-32 mx-auto flex flex-col md:flex-row gap-6 items-start w-full min-w-0">
        {/* ── Sidebar ── */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#f9f5ef] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-[#9a8457]" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {formData.email}
                </p>
              </div>
            </div>
            <nav className="p-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${activeTab === item.id ? "bg-[#f9f5ef] text-[#9a8457]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-4 grid grid-cols-3 md:grid-cols-1 gap-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
              <p className="text-xl font-bold text-[#9a8457]">
                {orders.length}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Orders</p>
            </div>
            <div
              onClick={() => (window.location.href = "/favorites")}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center cursor-pointer hover:bg-[#f9f5ef] transition"
            >
              <p className="text-xl font-bold text-[#9a8457]">
                {wishlistCount}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Wishlist</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
              <p className="text-xl font-bold text-[#9a8457]">
                {savedAddresses}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Addresses</p>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 overflow-x-hidden w-full">
          {/* <h1 className="text-2xl font-semibold text-gray-800 mb-4">{formData.firstName} {formData.lastName}</h1> */}

          {/* ── PROFILE TAB ── */}
          {activeTab === "profile" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="flex items-center gap-2 text-base font-semibold text-gray-800">
                    <User className="w-4 h-4 text-[#9a8457]" /> Personal
                    Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 text-sm text-[#9a8457] hover:text-[#7d6b47] font-medium"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1.5 text-sm bg-[#9a8457] text-white px-3 py-1.5 rounded-lg hover:bg-[#8a7547]"
                      >
                        <Save className="w-3.5 h-3.5" /> Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-1.5 text-sm border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50"
                      >
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border border-gray-100 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Email Address</p>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputCls(true)}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        {formData.email || "—"}
                      </p>
                    )}
                  </div>
                  {/* <div className="border border-gray-100 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Customer ID</p>
                    <p className="text-sm font-medium text-gray-800">
                      {(user as any)?.uId || "—"}
                    </p>
                  </div> */}
                  <div className="border border-gray-100 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      {addressType === "domestic"
                        ? "First Name (as per Govt ID)"
                        : "First Name (as per Passport)"}
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={inputCls(true)}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        {formData.firstName || "—"}
                      </p>
                    )}
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      {addressType === "domestic"
                        ? "Last Name (as per Govt ID)"
                        : "Last Name (as per Passport)"}
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={inputCls(true)}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        {formData.lastName || "—"}
                      </p>
                    )}
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      {addressType === "domestic"
                        ? "Mobile Number"
                        : "Contact Number (with country code)"}
                    </p>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={
                          addressType === "domestic"
                            ? "+91 XXXXX XXXXX"
                            : "+1 XXX XXX XXXX"
                        }
                        className={inputCls(true)}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        {formData.phone || (
                          <span className="text-[#9a8457] text-xs">Add</span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Address</p>
                    <p className="text-sm text-gray-700">{displayAddress()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-4">
                  <Settings className="w-4 h-4 text-[#9a8457]" /> Manage
                  Addresses
                </h2>
                {!isEditing && (
                  <div className="bg-[#fffbf0] border border-[#f0e6c8] rounded-lg px-4 py-3 mb-4 text-sm text-gray-600">
                    <span className="font-semibold text-[#9a8457]">Note:</span>{" "}
                    Click <span className="font-medium">Edit</span> in Personal
                    Information above to update your address details.
                  </div>
                )}
                <div className="flex gap-2 mb-4">
                  {(["domestic", "international"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => isEditing && setAddressType(t)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${addressType === t ? "bg-[#9a8457] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      {t === "domestic" ? "Domestic (India)" : "International"}
                    </button>
                  ))}
                </div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  My Addresses
                </h3>
                {addressType === "domestic" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          name: "houseNumber",
                          label: "House / Flat Number *",
                          placeholder: "e.g., 502, 5th Floor",
                        },
                        {
                          name: "streetArea",
                          label: "Street / Area *",
                          placeholder: "e.g., MG Road",
                        },
                        {
                          name: "landmark",
                          label: "Landmark",
                          placeholder: "e.g., Near City Mall",
                        },
                        {
                          name: "city",
                          label: "City *",
                          placeholder: "e.g., Bangalore",
                        },
                        {
                          name: "state",
                          label: "State *",
                          placeholder: "e.g., Karnataka",
                        },
                        {
                          name: "pinCode",
                          label: "PIN Code *",
                          placeholder: "e.g., 560001",
                        },
                        {
                          name: "gstNumber",
                          label: "GST Number (business >₹2L)",
                          placeholder: "e.g., 22AAAAA0000A1Z5",
                        },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="block text-xs text-gray-500 mb-1">
                            {f.label}
                          </label>
                          <input
                            type="text"
                            name={f.name}
                            value={
                              formData[
                                f.name as keyof typeof formData
                              ] as string
                            }
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder={f.placeholder}
                            className={inputCls(isEditing)}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          disabled
                          className={inputCls(false)}
                        />
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.billingDifferent}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              billingDifferent: e.target.checked,
                            })
                          }
                          disabled={!isEditing}
                          className="w-4 h-4 text-[#9a8457] border-gray-300 rounded focus:ring-[#9a8457]"
                        />
                        <span className="text-sm text-gray-700">
                          Billing address is different from shipping address
                        </span>
                      </label>
                    </div>
                    {formData.billingDifferent && (
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Billing Address *
                        </label>
                        <textarea
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
                          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9a8457] transition-all ${isEditing ? "bg-white border-gray-300" : "bg-gray-50 border-gray-200 cursor-not-allowed"}`}
                        />
                      </div>
                    )}
                  </div>
                )}
                {addressType === "international" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        name: "apartmentSuite",
                        label: "Apartment / Suite Number *",
                        placeholder: "e.g., Apt 502",
                      },
                      {
                        name: "streetName",
                        label: "Street Name *",
                        placeholder: "e.g., 123 Main Street",
                      },
                      {
                        name: "cityInternational",
                        label: "City *",
                        placeholder: "Enter your city",
                      },
                      {
                        name: "stateProvince",
                        label: "State / Province *",
                        placeholder: "Enter state/province",
                      },
                      {
                        name: "postalZipCode",
                        label: "Postal / ZIP Code *",
                        placeholder: "e.g., 10001",
                      },
                      {
                        name: "countryInternational",
                        label: "Country *",
                        placeholder: "e.g., United States",
                      },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-xs text-gray-500 mb-1">
                          {f.label}
                        </label>
                        <input
                          type="text"
                          name={f.name}
                          value={
                            formData[f.name as keyof typeof formData] as string
                          }
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder={f.placeholder}
                          className={inputCls(isEditing)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── ORDERS TAB ── */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {/* Summary bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    label: "Total Orders",
                    value: orders.length,
                    color: "text-[#9a8457]",
                  },
                  {
                    label: "Delivered",
                    value: orders.filter((o) => o.status === "delivered")
                      .length,
                    color: "text-green-600",
                  },
                  {
                    label: "Processing",
                    value: orders.filter((o) =>
                      ["pending", "processing", "shipped"].includes(o.status),
                    ).length,
                    color: "text-blue-600",
                  },
                  {
                    label: "Cancelled",
                    value: orders.filter((o) => o.status === "cancelled")
                      .length,
                    color: "text-red-500",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center"
                  >
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Orders list */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
                  <Package className="w-4 h-4 text-[#9a8457]" />
                  <h2 className="text-base font-semibold text-gray-800">
                    Order History
                  </h2>
                </div>

                {ordersLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="w-8 h-8 border-4 border-[#9a8457] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-400">
                      Loading your orders…
                    </p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                    <div className="w-16 h-16 rounded-full bg-[#f9f5ef] flex items-center justify-center mb-4">
                      <ShoppingCart className="w-7 h-7 text-[#9a8457]" />
                    </div>
                    <p className="font-semibold text-gray-700 mb-1">
                      No orders yet
                    </p>
                    <p className="text-sm text-gray-400 max-w-xs">
                      Your past orders will appear here once you make a
                      purchase.
                    </p>
                    <a
                      href="/products"
                      className="mt-5 inline-block bg-[#9a8457] text-white text-sm px-5 py-2.5 rounded-lg hover:bg-[#8a7547] transition-colors"
                    >
                      Start Shopping
                    </a>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {orders.map((order) => {
                      const isExpanded = expandedOrder === order.oId;
                      const sc = statusConfig[order.status] || {
                        label: order.status,
                        color: "text-gray-600",
                        bg: "bg-gray-50 border-gray-200",
                        icon: null,
                      };
                      const pc = paymentConfig[order.paymentStatus] || {
                        color: "text-gray-600",
                        bg: "bg-gray-50 border-gray-200",
                      };
                      const orderDate = new Date(
                        order.orderDate || order.createdAt,
                      );

                      return (
                        <div key={order.oId}>
                          {/* Order row */}
                          <button
                            onClick={() =>
                              setExpandedOrder(isExpanded ? null : order.oId)
                            }
                            className="w-full text-left px-6 py-4 hover:bg-gray-50/70 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                              {/* Left: order meta */}
                              <div className="flex items-start flex-col sm:flex-row gap-4 min-w-0">
                                {/* Icon circle */}
                                {/* <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${sc.bg}`}
                                >
                                  <span className={sc.color}>{sc.icon}</span>
                                </div> */}
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <div
                                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${sc.bg}`}
                                    >
                                      <span className={sc.color}>
                                        {sc.icon}
                                      </span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">
                                      {order.oId}
                                    </span>
                                    <span
                                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${sc.bg} ${sc.color}`}
                                    >
                                      {/* {sc.icon} */}
                                      <span>Product Status : {sc.label}</span>
                                    </span>
                                    <span
                                      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${pc.bg} ${pc.color}`}
                                    >
                                      Payment : {order.paymentStatus}
                                    </span>
                                    {order.deliveryLink && (
                                      <p>
                                        <span className="font-medium text-sm text-gray-800">
                                          Delivery Link :
                                        </span>{" "}
                                        <a
                                          href={order.deliveryLink}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-400 text-sm underline"
                                        >
                                          Track Package
                                        </a>
                                      </p>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {orderDate.toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </p>
                                  {/* Product names preview */}
                                  <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                                    {order.products
                                      ?.slice(0, 2)
                                      .map(
                                        (p: any) =>
                                          p.productId?.name ||
                                          p.productId?.toString?.() ||
                                          "Product",
                                      )
                                      .join(", ")}
                                    {order.products?.length > 2 &&
                                      ` +${order.products.length - 2} more`}
                                  </p>
                                </div>
                              </div>
                              {/* Right: total + chevron */}
                              <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                  <p className="text-sm font-bold text-gray-800">
                                    {order.totalAmount?.symbol}
                                    {order.totalAmount?.amount?.toLocaleString()}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {order.products?.length} item
                                    {order.products?.length !== 1 ? "s" : ""}
                                  </p>
                                </div>
                                <div
                                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isExpanded ? "bg-[#9a8457] text-white" : "bg-gray-100 text-gray-500"}`}
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>

                          {/* Expanded details */}
                          {isExpanded && (
                            <div className="bg-gray-50/60 border-t border-gray-100 px-6 py-5 space-y-5">
                              {/* Items */}
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                  Items Ordered
                                </p>
                                <div className="space-y-2">
                                  {order.products?.map(
                                    (item: any, idx: number) => (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm"
                                      >
                                        {item.productId?.coverImage ? (
                                          <img
                                            src={item.productId.coverImage}
                                            alt={
                                              item.productId?.name || "Product"
                                            }
                                            className="w-12 h-12 object-cover rounded-lg shrink-0"
                                          />
                                        ) : (
                                          <div className="w-12 h-12 rounded-lg bg-[#f9f5ef] flex items-center justify-center shrink-0">
                                            <Package className="w-5 h-5 text-[#9a8457]" />
                                          </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium text-gray-800 truncate">
                                            {item.productId?.name || "Product"}
                                          </p>
                                          <p className="text-xs text-gray-400 mt-0.5">
                                            {item.productId?.sku && (
                                              <span className="mr-2 font-mono">
                                                SKU: {item.productId.sku}
                                              </span>
                                            )}
                                            {item.variant && (
                                              <span className="mr-2">
                                                {item.variant}
                                              </span>
                                            )}
                                            Qty: {item.quantity}
                                          </p>
                                        </div>
                                        {item.price?.amount > 0 && (
                                          <p className="text-sm font-semibold text-gray-700 shrink-0">
                                            {item.price.symbol}
                                            {item.price.amount?.toLocaleString()}
                                          </p>
                                        )}
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>

                              {/* Total row */}
                              <div className="flex justify-end">
                                <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 text-right shadow-sm">
                                  <p className="text-xs text-gray-400 mb-0.5">
                                    Order Total
                                  </p>
                                  <p className="text-lg font-bold text-[#9a8457]">
                                    {order.totalAmount?.symbol}
                                    {order.totalAmount?.amount?.toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              {/* Delivery address */}
                              {order.deliveryAddress && (
                                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#9a8457]" />{" "}
                                    Delivery Address
                                  </p>
                                  <p className="text-sm font-medium text-gray-800">
                                    {order.deliveryAddress.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {order.deliveryAddress.phone}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {order.deliveryAddress.addressLine1}
                                    {order.deliveryAddress.addressLine2 &&
                                      `, ${order.deliveryAddress.addressLine2}`}
                                    {`, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`}
                                  </p>
                                </div>
                              )}

                              {/* Track button */}
                              {order.deliveryLink && (
                                <a
                                  href={order.deliveryLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-[#9a8457] text-white text-sm px-4 py-2.5 rounded-lg hover:bg-[#8a7547] transition-colors font-medium"
                                >
                                  <Truck className="w-4 h-4" /> Track your order
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── FAVORITES TAB ── */}
          {activeTab === "favorites" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-5">
                <Heart className="w-4 h-4 text-[#9a8457]" /> Favorites
              </h2>
              <div className="text-center py-12">
                <Heart className="mx-auto mb-3 text-gray-200 w-12 h-12" />
                <p className="text-gray-600 font-medium mb-3">
                  You have {wishlistCount} item{wishlistCount !== 1 ? "s" : ""}{" "}
                  in your wishlist
                </p>
                <a
                  href="/favorites"
                  className="inline-block bg-[#9a8457] text-white px-5 py-2.5 rounded-lg text-sm hover:bg-[#8a7547] transition-colors"
                >
                  View Wishlist
                </a>
              </div>
            </div>
          )}

          {/* ── SHIPPING T&C TAB ── */}
          {activeTab === "shipping" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-5">
                <CreditCard className="w-4 h-4 text-[#9a8457]" /> Shipping Terms
                & Conditions
              </h2>
              <div className="space-y-3">
                {[
                  "All shipments are fully insured until delivery.",
                  "Signature upon delivery may be needed for high-value orders.",
                  "Nymara Jewels is not responsible for delays caused by customs authorities or unforeseen circumstances.",
                  "All domestic and international orders are shipped through secure and insured courier partners.",
                  "Full payment must be received before dispatch of any order.",
                  "Orders are typically dispatched within the estimated processing timeline mentioned on the product page.",
                  "Customers must provide accurate and complete shipping details. Nymara Jewels is not responsible for delays caused by incorrect address information.",
                  "Risk of loss or damage transfers to the customer upon successful delivery confirmation.",
                  "Nymara Jewels reserves the right to request identity verification for high-value transactions if required by law or courier compliance.",
                  "Customs authorities may require additional identification or documentation from the recipient. Any delays caused by customs clearance are beyond the control of Nymara Jewels.",
                  "Orders cannot be redirected once shipped internationally.",
                  "Refusal to accept delivery may result in return shipping charges, customs penalties, or non-refundable fees being deducted from any eligible refund.",
                  "Nymara Jewels is not responsible for delays caused by customs inspections, regulatory authorities, or force majeure events.",
                  "P.O. Box addresses may not be accepted for high-value shipments.",
                  "Estimated delivery timelines are indicative and not guaranteed.",
                  "Customers will receive tracking details once the order is dispatched.",
                  "Nymara Jewels reserves the right to cancel or hold shipments in case of suspected fraudulent activity or payment issues.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#9a8457] font-semibold text-sm shrink-0 mt-0.5">
                      {i + 1}.
                    </span>
                    <p className="text-sm text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 bg-[#f9f5ef] rounded-lg border-l-4 border-[#9a8457]">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-[#9a8457]">
                    Important:
                  </span>{" "}
                  By placing an order, you acknowledge and agree to these
                  shipping terms and conditions.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowErrorModal(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="relative p-6 pb-4">
              <button
                onClick={() => setShowErrorModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-red-100 rounded-full">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Validation Error
              </h3>
              <div className="text-gray-600 text-center text-sm">
                <p className="mb-2">
                  {errorMessage.includes("Missing required")
                    ? "Please fill in the following required fields:"
                    : errorMessage}
                </p>
                {errorMessage.includes("Missing required") && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                    <p className="text-red-700 text-sm font-medium">
                      {errorMessage.split(": ")[1]}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 pt-2">
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSuccessModal(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="relative p-6 pb-4">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Profile Updated!
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Your profile information has been successfully updated and
                saved.
              </p>
            </div>
            <div className="p-6 pt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-4 py-2.5 text-white bg-green-600 hover:bg-green-700 rounded-xl font-medium transition-colors"
              >
                Great!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
