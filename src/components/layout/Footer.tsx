import { Phone, Mail, Clock, Shield,MapPin, Award, Heart } from "lucide-react";
import logo from "../../assets/logo_main1.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold mb-4">
              <img
                src={logo}
                alt="Nymara Jewels"
                className="w-16 sm:w-20 bg-white"
              />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining luxury with lab-grown diamonds and ethical gemstones.
              Every creation is a testament to sustainability, craftsmanship,
              and timeless elegance.
            </p>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">
                Made with Love & Integrity
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">Certified Jewellery</span>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4 ml-0 md:ml-5">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              About
            </h4>
            <div className="space-y-2">
              <a
                href="/about#story"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Our Story
              </a>
              <a
                href="/about#mission"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Our Mission
              </a>
              <a
                href="#responsible-sourcing"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Responsible Sourcing
              </a>
              <a
                href="/about#sustainability"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Sustainability Goals
              </a>
              <a
                href="#reviews"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Customer Reviews
              </a>
              <a
                href="#blog"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Blog
              </a>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Education
            </h4>
            <div className="space-y-2">
              <a
                href="/education#4cs"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                4 C's of Diamond Guide
              </a>
              <a
                href="/education#lab-grown"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Lab Grown Diamonds
              </a>
              <a
                href="/education#gemstones"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Lab Grown Gemstones
              </a>
              <a
                href="/education#shapes"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Diamond Shapes Guide
              </a>
              <a
                href="/ring-size"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Ring Size Guide
              </a>
              <a
                href="/necklace-size"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Necklace Size Guide
              </a>
              <a
                href="/bracelet-size"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Bracelet Size Guide
              </a>
              <a
                href="/education#faq"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Customer Service
            </h4>
            <div className="space-y-2">
              <a
                href="/shippingpolicy"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Shipping Policy
              </a>
              <a
                href="/returnpolicy"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                15 Day Return Policy
              </a>
              <a
                href="/buyback"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Lifetime Buy-Back Policy
              </a>
              <a
                href="/warrantypolicy"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Lifetime Warranty
              </a>
              <a
                href="/termsandconditions"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Terms and Conditions
              </a>
              <a
                href="#track-order"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Track Your Order
              </a>
              <a
                href="#custom-jewelry"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Custom Jewelry
              </a>
              <a
                href="#loose-diamonds"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Loose Diamonds
              </a>
              
              <a
                href="/privacy-policy"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Privacy Policy
              </a>


            </div>
          </div>

          {/* Contact & Services */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-pink-400 flex-shrink-0" />
                <a
                  href="mailto:business@nymarajewels.com"
                  className="text-sm text-gray-400 hover:text-[#9a8457] transition-colors break-all"
                >
                  business@nymarajewels.com
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-[#25D366] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <a
                  href="https://wa.me/447867089659"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-[#9a8457] transition-colors"
                >
                  WhatsApp:
                  <br /> +44 7867089659
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#9a8457] flex-shrink-0" />
                <span className="text-sm">+44 7867089659</span>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#9a8457] mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-gray-200">Business Hours:</p>
                  <p>Mon-Sat: 11:00 AM - 5:00 PM IST</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#9a8457] mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-gray-200">Address:</p>
                  <p className="text-gray-400">
                    5th Floor, 502, Pooja Abhishek Apartment,
                    <br />
                    Dumas Road, Mahavir Association,
                    <br />
                    Athwa, Surat, Gujarat 395001
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <h5 className="text-sm font-medium text-gray-200">Services:</h5>
              <a
                href="#corporate-gifting"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Corporate Gifting
              </a>
              <a
                href="#franchise"
                className="block text-gray-400 text-sm hover:text-[#9a8457] transition-colors"
              >
                Franchise Opportunities
              </a>
            </div>

            <div className="pt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-200">
                  Certifications
                </span>
              </div>
              <p className="text-xs text-gray-400">
                IGI Certified Lab Diamonds
                <br />
                Ethically Sourced Materials
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Stay Connected
            </h4>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 px-4">
              Subscribe to receive updates on new collections and exclusive
              offers
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20"
              />
              <button className="px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#9a8457] to-[#726140] text-white text-sm font-medium rounded-lg hover:from-[#726140] hover:to-[#9a8457] transition-all duration-200 transform hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Bottom Bar */}
      <div className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              <p>&copy; 2025 Nymara Jewels. All rights reserved.</p>
              <div className="flex flex-wrap justify-center space-x-3 sm:space-x-4">
                <a
                  href="#privacy-policy"
                  className="hover:text-[#9a8457] text-gray-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms-conditions"
                  className="hover:text-[#9a8457] text-gray-400 transition-colors"
                >
                  Terms & Conditions
                </a>
                <a
                  href="#accessibility"
                  className="hover:text-[#9a8457] text-gray-400 transition-colors"
                >
                  Accessibility
                </a>
              </div>
            </div>

            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors"
                aria-label="Pinterest"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9a8457] transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center pt-4 sm:pt-6 border-t border-gray-800 mt-4 sm:mt-6">
            <p className="text-xs text-gray-500 px-4">
              Crafting dreams with lab-grown diamonds • Sustainable luxury •
              Conflict-free beauty
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
