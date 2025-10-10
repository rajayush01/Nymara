import { Phone, Mail, Clock, Shield, Award, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company Information */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Nymara Jewels
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining luxury with lab-grown diamonds and ethical gemstones. 
              Every creation is a testament to sustainability, craftsmanship, and timeless elegance.
            </p>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="text-sm text-gray-400">Made with Love & Integrity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Certified Jewellery</span>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">About</h4>
            <div className="space-y-2 ">
              <a href="#our-story" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Our Story
              </a>
              <a href="#our-mission" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Our Mission
              </a>
              <a href="#responsible-sourcing" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Responsible Sourcing
              </a>
              <a href="#sustainability" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Sustainability Goals
              </a>
              <a href="#reviews" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Customer Reviews
              </a>
              <a href="#blog" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Blog
              </a>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Education</h4>
            <div className="space-y-2">
              <a href="#diamond-4cs" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                4 C's of Diamond Guide
              </a>
              <a href="#lab-grown-diamonds" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Lab Grown Diamonds
              </a>
              <a href="#lab-grown-gemstones" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Lab Grown Gemstones
              </a>
              <a href="#diamond-shapes" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Diamond Shapes Guide
              </a>
              <a href="#ring-size-guide" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Ring Size Guide
              </a>
              <a href="#necklace-size-guide" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Necklace Size Guide
              </a>
              <a href="#bracelet-size-guide" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Bracelet Size Guide
              </a>
              <a href="#faq" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                FAQ
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
            <div className="space-y-2">
              <a href="#shipping-policy" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Shipping Policy
              </a>
              <a href="#15-day-return" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                15 Day Return Policy
              </a>
              <a href="#lifetime-buyback" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Lifetime Buy-Back Policy
              </a>
              <a href="#lifetime-warranty" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Lifetime Warranty
              </a>
              <a href="#virtual-appointment" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Virtual Appointment
              </a>
              <a href="#track-order" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Track Your Order
              </a>
              <a href="#custom-jewelry" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Custom Jewelry
              </a>
              <a href="#loose-diamonds" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Loose Diamonds
              </a>
            </div>
          </div>

          {/* Contact & Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pink-400" />
                <a href="mailto:business@nymarajewels.com" className="text-sm text-gray-400 hover:text-[#9a8457] transition-colors">
                  business@nymarajewels.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#9a8457]" />
                <span className="text-sm">+91 94248 27503</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#9a8457] mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-gray-200">Business Hours:</p>
                  <p>Mon-Sat: 11:00 AM - 5:00 PM IST</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-4">
              <h5 className="text-sm font-medium text-gray-200">Services:</h5>
              <a href="#corporate-gifting" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Corporate Gifting
              </a>
              <a href="#franchise" className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors">
                Franchise Opportunities
              </a>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-gray-200">Certifications</span>
              </div>
              <p className="text-xs text-gray-400">
                IGI Certified Lab Diamonds<br />
                GIA Grading Standards<br />
                Ethically Sourced Materials
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-white mb-2">Stay Connected</h4>
            <p className="text-gray-400 mb-6">Subscribe to receive updates on new collections and exclusive offers</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#9a8457] to-[#726140] text-white font-medium rounded-lg hover:from-[#726140] hover:to-[#9a8457] transition-all duration-200 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Bottom Bar */}
      <div className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <p>&copy; 2025 Nymara Jewels. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#privacy-policy" className="hover:text-[#9a8457] text-gray-400 transition-colors">Privacy Policy</a>
                <a href="#terms-conditions" className="hover:text-[#9a8457] text-gray-400 transition-colors">Terms & Conditions</a>
                <a href="#accessibility" className="hover:text-[#9a8457] text-gray-400 transition-colors">Accessibility</a>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="text-center pt-6 border-t border-gray-800 mt-6">
            <p className="text-xs text-gray-500">
              Crafting dreams with lab-grown diamonds • Sustainable luxury • Conflict-free beauty
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}