// components/product/QueryModal.tsx
import React, { useState } from 'react';
import { Product } from '@/contexts/AppContext';
import axios from 'axios';
import { CheckCircle, ArrowRight, X, Copy } from 'lucide-react';
import Toast from '../Toast';

interface QueryModalProps {
	product: Product;
	amount: number;
	symbol: string;
	onClose: () => void;
	VITE_API_URL: string;
}

const QueryModal: React.FC<QueryModalProps> = ({ product, amount, symbol, onClose }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [hintSize, setHintSize] = useState('');
	const [hintMessage, setHintMessage] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showCopyPopup, setShowCopyPopup] = useState(false);
	const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
	const handleNextStep = () => {
		if (!hintMessage.trim()) {
			setToast({
  message: "Please add your query or concern",
  type: "error",
});
			return;
		}
		setCurrentStep(2);
	};

	const handleSendQuery = async () => {
		if (!name.trim() || !email.trim() || !contact.trim()) {
			setToast({
  message: "Please fill all contact details",
  type: "error",
});
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			setToast({
				message: 'Please enter a valid email address',
				type: 'error',
			});
			return;
		}

		try {
			setIsSubmitting(true);
			await axios.post('https://lets-taxify.onrender.com/api/nymara/contact/send-query', {
				name: name,
				email: email,
				phone: contact,
				size: hintSize,
				message: hintMessage,
				productId: product._id,
				productName: product.name,
				productUrl: window.location.href,
			});

			setShowSuccessPopup(true);

			// Reset form and close after 3 seconds
			setTimeout(() => {
				setShowSuccessPopup(false);
				onClose();
				setHintSize('');
				setHintMessage('');
				setName('');
				setEmail('');
				setContact('');
				setCurrentStep(1);
			}, 3000);
		} catch (err) {
			console.error('❌ Error sending query:', err);
			setToast({
  message: "Failed to send query. Try again later",
  type: "error",
});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCopyDetails = () => {
		const hintText = `Product: ${product.name}\nLink: ${window.location.href}${
			hintSize ? `\nSize: ${hintSize}` : ''
		}${hintMessage ? `\nNotes: ${hintMessage}` : ''}`;
		navigator.clipboard.writeText(hintText);

		// Show copy success popup
		setShowCopyPopup(true);

		// Auto-hide popup and close modal after 2 seconds
		setTimeout(() => {
			setShowCopyPopup(false);
			onClose();
			setHintSize('');
			setHintMessage('');
		}, 2000);
	};

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
				<div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
					{/* Header */}
					<div className="bg-gradient-to-r from-[#9a8457] to-[#b8a069] text-white p-5">
						<div className="flex justify-between items-center">
							<div>
								<h3 className="text-xl font-bold">Query/Doubt</h3>
								<p className="text-sm text-white/90 mt-1">Step {currentStep} of 2</p>
							</div>
							<button
								onClick={onClose}
								className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Progress Bar */}
						<div className="mt-4 flex items-center space-x-2">
							<div
								className={`flex-1 h-2 rounded-full ${currentStep >= 1 ? 'bg-white' : 'bg-white/30'}`}
							/>
							<div
								className={`flex-1 h-2 rounded-full ${currentStep >= 2 ? 'bg-white' : 'bg-white/30'}`}
							/>
						</div>
					</div>

					{/* Content */}
					<div className="p-6 max-h-[60vh] overflow-y-auto">
						{currentStep === 1 ? (
							<div className="space-y-4">
								<p className="text-sm text-gray-600">
									Tell us your query about the size or any other concern regarding this product.
								</p>

								{/* Product Preview */}
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl flex items-center space-x-3 border border-gray-200">
									<img
										src={product.coverImage}
										alt={product.name}
										className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
									/>
									<div className="flex-1">
										<div className="font-semibold text-sm text-gray-900">{product.name}</div>
										<div className="text-sm text-[#9a8457] font-medium mt-1">
											{symbol}
											{amount.toLocaleString()}
										</div>
									</div>
								</div>

								{/* Size Input */}
								<div>
									<label className="block text-sm font-semibold text-gray-900 mb-2">
										Preferred Size (Optional)
									</label>
									<input
										type="text"
										value={hintSize}
										onChange={(e) => setHintSize(e.target.value)}
										placeholder="Enter size (e.g., 11, 12, or custom size)"
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] transition-all"
									/>
									<p className="text-xs text-gray-500 mt-2">
										Not sure about size? Leave it blank or add a note below.
									</p>
								</div>

								{/* Message Input */}
								<div>
									<label className="block text-sm font-semibold text-gray-900 mb-2">
										Your Query <span className="text-red-500">*</span>
									</label>
									<textarea
										value={hintMessage}
										onChange={(e) => setHintMessage(e.target.value)}
										placeholder="Add your query, concerns, or preferences..."
										rows={4}
										maxLength={300}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] resize-none transition-all"
									/>
									<div className="text-xs text-gray-500 mt-2 text-right">
										{hintMessage.length}/300 characters
									</div>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<p className="text-sm text-gray-600 mb-4">
									Please provide your contact details so we can get back to you.
								</p>

								{/* Name Input */}
								<div>
									<label className="block text-sm font-semibold text-gray-900 mb-2">
										Full Name <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Enter your full name"
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] transition-all"
									/>
								</div>

								{/* Email Input */}
								<div>
									<label className="block text-sm font-semibold text-gray-900 mb-2">
										Email Address <span className="text-red-500">*</span>
									</label>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email address"
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] transition-all"
									/>
								</div>

								{/* Contact Input */}
								<div>
									<label className="block text-sm font-semibold text-gray-900 mb-2">
										Contact Number <span className="text-red-500">*</span>
									</label>
									<input
										type="tel"
										value={contact}
										onChange={(e) => setContact(e.target.value)}
										placeholder="Enter your contact number"
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457] transition-all"
									/>
								</div>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className="p-6 bg-gray-50 border-t border-gray-200">
						<div className="flex space-x-3">
							{currentStep === 2 && (
								<button
									onClick={() => setCurrentStep(1)}
									className="flex-1 bg-white text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors font-medium border border-gray-300"
								>
									Back
								</button>
							)}
							{currentStep === 1 ? (
								<>
									<button
										onClick={handleCopyDetails}
										className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors font-medium shadow-md"
									>
										Copy Details
									</button>
									<button
										onClick={handleNextStep}
										disabled={!hintMessage.trim()}
										className="flex-1 bg-[#9a8457] text-white py-3 px-4 rounded-xl hover:bg-[#8a7547] transition-colors font-medium shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
									>
										<span>Next</span>
										<ArrowRight className="w-4 h-4" />
									</button>
								</>
							) : (
								<button
									onClick={handleSendQuery}
									disabled={isSubmitting || !name.trim() || !email.trim() || !contact.trim()}
									className="flex-1 bg-[#9a8457] text-white py-3 px-4 rounded-xl hover:bg-[#8a7547] transition-colors font-medium shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
								>
									{isSubmitting ? (
										<>
											<svg
												className="animate-spin h-5 w-5 text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											<span>Sending...</span>
										</>
									) : (
										<span>Send Query</span>
									)}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Success Popup */}
			{showSuccessPopup && (
				<div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60 animate-in fade-in duration-300">
					<div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95 duration-300">
						<div className="text-center">
							<div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-in zoom-in duration-500">
								<CheckCircle className="w-12 h-12 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">Query Sent Successfully!</h3>
							<p className="text-gray-600 mb-2">Thank you for reaching out to us.</p>
							<p className="text-sm text-gray-500">We'll get back to you as soon as possible.</p>
						</div>
					</div>
				</div>
			)}

			{/* Copy Success Popup */}
			{showCopyPopup && (
				<div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60 animate-in fade-in duration-200">
					<div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
						<div className="text-center">
							<div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-in zoom-in duration-300">
								<Copy className="w-12 h-12 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">Copied to Clipboard!</h3>
							<p className="text-gray-600 mb-2">Product details have been copied successfully.</p>
							<p className="text-sm text-gray-500">You can now paste them anywhere you need.</p>
						</div>
					</div>
				</div>
			)}
			{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
		</>
	);
};

export default QueryModal;
