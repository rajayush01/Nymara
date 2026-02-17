import React from 'react';
import { Shield, Lock, Eye, UserCheck, Globe, Mail, Phone, MapPin, Cookie, AlertCircle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(154,132,87,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-full mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white my-12 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            At Nymara Jewels, we respect your privacy and are committed to protecting your personal information.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          
          {/* Section A */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">A. Information We Collect</h2>
                <p className="text-gray-400">We may collect the following types of information:</p>
              </div>
            </div>
            <div className="ml-16 space-y-4">
              <div className="border-l-2 border-[#9a8457] pl-6 py-2">
                <h3 className="font-semibold text-white mb-2">Personal Information:</h3>
                <p className="text-gray-300">Name, email address, phone number, billing/shipping address, and payment details.</p>
              </div>
              <div className="border-l-2 border-gray-600 pl-6 py-2">
                <h3 className="font-semibold text-white mb-2">Non-Personal Information:</h3>
                <p className="text-gray-300">Browser type, device information, IP address, and website usage data.</p>
              </div>
            </div>
          </section>

          {/* Section B */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">B. How We Use Your Information</h2>
                <p className="text-gray-400">We use the information collected for purposes including:</p>
              </div>
            </div>
            <div className="ml-16">
              <ul className="space-y-3">
                {[
                  'Processing and fulfilling your orders.',
                  'Communicating with you regarding your purchases, returns, or inquiries.',
                  'Improving our website, products, and services.',
                  'Sending promotional offers or updates (only if you have opted in).'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-[#9a8457] rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section C */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">C. Sharing of Information</h2>
              </div>
            </div>
            <div className="ml-16">
              <ul className="space-y-3">
                {[
                  'We do not sell or rent your personal information to third parties.',
                  'We may share your information with trusted service providers (e.g., payment gateways, delivery partners) strictly for the purpose of fulfilling your order.',
                  'We may disclose information if required by law, regulation, or legal process.'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-[#9a8457] rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section D */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">D. Data Security</h2>
              </div>
            </div>
            <div className="ml-16 space-y-3">
              <p className="text-gray-300">We implement reasonable security measures to protect your data from unauthorized access, alteration, or disclosure.</p>
              <p className="text-gray-400 italic">However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            </div>
          </section>

          {/* Section E */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">E. Cookies & Tracking Technologies</h2>
              </div>
            </div>
            <div className="ml-16">
              <ul className="space-y-3">
                {[
                  'Our website may use cookies and similar technologies to enhance your browsing experience.',
                  'You can manage or disable cookies through your browser settings, but some features of the site may not function properly without them.'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-[#9a8457] rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section F */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">F. Your Rights</h2>
                <p className="text-gray-400">You have the right to:</p>
              </div>
            </div>
            <div className="ml-16">
              <ul className="space-y-3">
                {[
                  'Access, update, or correct your personal information.',
                  'Request deletion of your data, subject to legal or contractual obligations.',
                  'Opt out of receiving marketing communications at any time.'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-[#9a8457] rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section G */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">G. Third-Party Links</h2>
              </div>
            </div>
            <div className="ml-16">
              <p className="text-gray-300">Our website may contain links to third-party sites. Nymara Jewels is not responsible for the privacy practices or content of such websites.</p>
            </div>
          </section>

          {/* Section H */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">H. Changes to This Policy</h2>
              </div>
            </div>
            <div className="ml-16">
              <p className="text-gray-300">We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. Continued use of our services after changes indicates acceptance.</p>
            </div>
          </section>

          {/* Section I */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">I. Advertising Partners Privacy Policies</h2>
              </div>
            </div>
            <div className="ml-16 space-y-4">
              <ul className="space-y-3">
                {[
                  'You may consult this list to find the Privacy Policy for each of the advertising partners of Nymara Jewels.',
                  'Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Nymara Jewels, which are sent directly to users\' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.',
                  'Note that Nymara Jewels has no access to or control over these cookies that are used by third-party advertisers.'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-[#9a8457] rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-l-2 border-[#9a8457] pl-6 py-2">
                <h3 className="font-semibold text-white mb-2">Third Party Privacy Policies</h3>
                <p className="text-gray-300 mb-2">Nymara Jewels Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
                <p className="text-gray-300">You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
              </div>
            </div>
          </section>

          {/* CCPA Section */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                <p className="text-gray-400">Under the CCPA, among other rights, California consumers have the right to:</p>
              </div>
            </div>
            <div className="ml-16">
              <ul className="space-y-3">
                {[
                  'Request that a business that collects a consumer\'s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.',
                  'Request that a business delete any personal data about the consumer that a business has collected.',
                  'Request that a business that sells a consumer\'s personal data, not sell the consumer\'s personal data.'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-[#9a8457] rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-300 mt-4">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            </div>
          </section>

          {/* Section J - GDPR */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">J. GDPR Data Protection Rights</h2>
                <p className="text-gray-400">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
              </div>
            </div>
            <div className="ml-16 space-y-4">
              {[
                { title: 'The right to access', desc: 'You have the right to request copies of your personal data. We may charge you a small fee for this service.' },
                { title: 'The right to rectification', desc: 'You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.' },
                { title: 'The right to erasure', desc: 'You have the right to request that we erase your personal data, under certain conditions.' },
                { title: 'The right to restrict processing', desc: 'You have the right to request that we restrict the processing of your personal data, under certain conditions.' },
                { title: 'The right to object to processing', desc: 'You have the right to object to our processing of your personal data, under certain conditions.' },
                { title: 'The right to data portability', desc: 'You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.' }
              ].map((item, index) => (
                <div key={index} className="border-l-2 border-[#9a8457] pl-6 py-2">
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              ))}
              <p className="text-gray-300 mt-4">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            </div>
          </section>

          {/* Section K */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#9a8457]/30 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">K. Children's Information</h2>
              </div>
            </div>
            <div className="ml-16 space-y-3">
              <p className="text-gray-300">Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
              <p className="text-gray-300">Nymara Jewels does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-br from-[#9a8457]/20 to-[#7a6847]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#9a8457]/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">L. Contact Us</h2>
              <p className="text-lg text-gray-300">Nymara Jewels Customer Support</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center space-x-4 bg-gray-800/50 rounded-xl p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <a href="mailto:business@nymarajewels.com" className="text-white hover:text-[#9a8457] transition-colors">
                    business@nymarajewels.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-gray-800/50 rounded-xl p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9a8457] to-[#7a6847] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Phone</p>
                  <a href="tel:+447867089659" className="text-white hover:text-[#9a8457] transition-colors">
                    +44 7867089659
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Last Updated */}
        <div className="text-center mt-16 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;