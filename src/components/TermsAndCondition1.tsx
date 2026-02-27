import React, { useState } from 'react';
import { FileText, Shield, DollarSign, Package, Scale, ExternalLink, AlertTriangle, Gift, Tag } from 'lucide-react';

export default function TermsAndConditions() {
const [expandedSection, setExpandedSection] = useState<string | null>('use');

  const sections = [
    { id: 'use', title: 'Use of Website', icon: FileText },
    { id: 'definitions', title: 'Definitions', icon: FileText },
    { id: 'trademarks', title: 'Trademarks', icon: Shield },
    { id: 'links', title: 'External Links', icon: ExternalLink },
    { id: 'warranties', title: 'Warranties', icon: Shield },
    { id: 'pricing', title: 'Prices', icon: DollarSign },
    { id: 'info', title: 'Other Information', icon: FileText },
    { id: 'liability', title: 'Disclaimer of Liability', icon: AlertTriangle },
    { id: 'conflict', title: 'Conflict of Terms', icon: FileText },
    { id: 'severability', title: 'Severability', icon: FileText },
    { id: 'cancellation', title: 'Cancellation & Returns', icon: Package },
    { id: 'laws', title: 'Applicable Laws', icon: Scale },
    { id: 'gifts', title: 'Free Gifts', icon: Gift },
    { id: 'offers', title: 'Offer Terms', icon: Tag }
  ];

  const toggleSection = (id:string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8 px-4 mt-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-3">Nymara Jewels</h1>
          <p className="text-slate-300 text-lg">Website Terms & Conditions</p>
          <p className="text-slate-400 text-sm mt-2">Last updated: December 2024</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">Quick Navigation</h2>
              <nav className="space-y-1">
                {sections.map(section => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                        expandedSection === section.id
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Use of Website */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('use')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Use of the Website</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'use' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'use' && (
                <div className="px-6 py-5 border-t">
                  <p className="text-slate-700 leading-relaxed">
                    By accessing and using the Nymara Jewels website, you confirm, represent, and warrant to the 
                    website owner that you are legally entitled to access this website and to make use of the 
                    information, content, or services made available via this platform, our call centre, or through 
                    any other official means of communication provided by Nymara Jewels.
                  </p>
                </div>
              )}
            </section>

            {/* Definitions */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('definitions')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Definitions</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'definitions' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'definitions' && (
                <div className="px-6 py-5 border-t space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-700">
                    <h3 className="font-semibold text-slate-900 mb-2">Jewellery</h3>
                    <p className="text-slate-700">
                      All jewelry that is pre-designed or jewelry crafted with gold and/or lab-grown diamonds that 
                      are displayed for sale on the Nymara Jewels website and retail outlets. All such jewelry is 
                      sold strictly on an "as is" basis.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-700">
                    <h3 className="font-semibold text-slate-900 mb-2">Mounts</h3>
                    <p className="text-slate-700">
                      The structures or designs that hold a diamond or diamonds in place. Mounts may or may not 
                      contain diamonds. Customers can choose Mounts and individual diamonds separately to create 
                      fully customized jewelry.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-700">
                    <h3 className="font-semibold text-slate-900 mb-2">Loose Diamonds</h3>
                    <p className="text-slate-700">
                      Individual, unset diamonds that can be purchased independently without being mounted on a setting.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Trademarks */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('trademarks')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Trademarks</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'trademarks' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'trademarks' && (
                <div className="px-6 py-5 border-t">
                  <p className="text-slate-700 leading-relaxed">
                    The names, logos, trademarks, and service marks displayed on this website (collectively referred 
                    to as "Trademarks") are either registered or unregistered intellectual property owned by Nymara 
                    Jewels. Nothing contained on this website should be interpreted as granting, either explicitly or 
                    implicitly, any license or right to use such trademarks without the prior written permission of 
                    Nymara Jewels.
                  </p>
                </div>
              )}
            </section>

            {/* External Links */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('links')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">External Links</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'links' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'links' && (
                <div className="px-6 py-5 border-t">
                  <p className="text-slate-700 leading-relaxed">
                    External links, where provided, are included solely for the convenience of our customers. However, 
                    these links are beyond the control of Nymara Jewels, and the company makes no representation or 
                    warranty regarding the accuracy, content, or reliability of any external website. Accessing or 
                    relying on external links and their content is entirely at your own risk.
                  </p>
                </div>
              )}
            </section>

            {/* Warranties */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('warranties')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Warranties</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'warranties' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'warranties' && (
                <div className="px-6 py-5 border-t">
                  <p className="text-slate-700 leading-relaxed">
                    Nymara Jewels makes no express or implied warranties, representations, statements, or guarantees 
                    regarding the operation of the website, the accuracy of information provided, or the uninterrupted 
                    availability of services.
                  </p>
                </div>
              )}
            </section>

            {/* Pricing */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('pricing')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Prices</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'pricing' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'pricing' && (
                <div className="px-6 py-5 border-t space-y-3">
                  <p className="text-slate-700">
                    All prices displayed on the Nymara Jewels website are calculated using prevailing market rates 
                    of precious metals and gemstones. Since these markets are subject to fluctuation, our prices may 
                    vary accordingly.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-slate-700 font-medium mb-2">Important Pricing Information:</p>
                    <ul className="space-y-2 text-slate-700 text-sm">
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>The price of your order will be determined based on the price of the metal and 
                        diamonds on the date of purchase or on the date of advance payment, whichever applies.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Prices listed on the website are subject to change without prior notice. You will 
                        be charged the price that is applicable on the date of purchase.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Pricing variations may occur between estimates provided online and the final finished 
                        product, as differences in weight or stone measurements may arise during production. Any 
                        increase or decrease will be collected from or refunded to the customer at the time of the 
                        final sale.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Other Information */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('info')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Other Information</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'info' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'info' && (
                <div className="px-6 py-5 border-t space-y-3">
                  <p className="text-slate-700">
                    The Nymara Jewels website provides access to trading, pricing, news, and other services related 
                    to diamonds and jewelry. Some of these services are restricted to members only.
                  </p>
                  <p className="text-slate-700">
                    Services on this website are meant exclusively for individuals purchasing diamonds or jewelry 
                    for personal use, whether customized or ready-made.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-slate-700">
                      Due to screen settings and photographic techniques, some items may appear slightly larger or 
                      smaller than actual size. At times, images may be enhanced to show detail more clearly or 
                      reduced to display the entire item. Nymara Jewels will not be held liable for any disputes 
                      regarding product size or appearance resulting from such variations.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Disclaimer of Liability */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('liability')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-slate-900">Disclaimer of Liability</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'liability' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'liability' && (
                <div className="px-6 py-5 border-t space-y-3">
                  <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                    <p className="text-slate-700 mb-3">
                      Nymara Jewels disclaims all liability for any loss, damage (direct, indirect, or consequential), 
                      personal injury, or expense that you or any third party may suffer as a result of accessing, 
                      using, or relying on this website or its contents.
                    </p>
                    <p className="text-slate-700 mb-3">
                      Nymara Jewels shall not be responsible for any errors, delays, interruptions, or omissions in 
                      the transmission of information and shall not be held liable for any actions taken in reliance 
                      thereon.
                    </p>
                    <p className="text-slate-700">
                      Nymara Jewels, as a merchant, shall not be held liable for any financial loss resulting from 
                      the decline of authorization for a transaction due to the cardholder exceeding their preset 
                      limit as agreed with their acquiring bank.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Conflict of Terms */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('conflict')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Conflict of Terms</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'conflict' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'conflict' && (
                <div className="px-6 py-5 border-t">
                  <p className="text-slate-700 leading-relaxed">
                    In the event of a conflict between these website terms and any other relevant policies, terms, 
                    or notices, the provisions specifically related to a given section or service of the website 
                    shall prevail with respect to that section or service.
                  </p>
                </div>
              )}
            </section>

            {/* Severability */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('severability')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Severability</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'severability' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'severability' && (
                <div className="px-6 py-5 border-t">
                  <p className="text-slate-700 leading-relaxed">
                    If any provision of these terms, policies, or notices is found unenforceable in any jurisdiction—whether 
                    due to invalidity, illegality, or for any reason whatsoever—that provision shall be treated as void 
                    within that jurisdiction only. The remaining provisions shall continue in full force and effect.
                  </p>
                </div>
              )}
            </section>

            {/* Cancellation & Returns */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('cancellation')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Cancellation & Returns</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'cancellation' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'cancellation' && (
                <div className="px-6 py-5 border-t space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Cancellation Policy</h3>
                    <div className="space-y-2 text-slate-700">
                      <p className="flex gap-2">
                        <span className="font-bold text-green-600">✓</span>
                        <span>Orders cancelled within 24 hours of placement are eligible for a full refund, 
                        subject to deduction of a 2% payment gateway charge.</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="font-bold text-amber-600">•</span>
                        <span>Orders cancelled after 24 hours will incur a ₹1,000 processing fee, in addition 
                        to the 2% payment gateway charge.</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="font-bold text-amber-600">•</span>
                        <span>For customized or made-to-order items, making charges will be forfeited upon cancellation.</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="font-bold text-green-600">✓</span>
                        <span>Partial cancellation of an order containing multiple items is permitted.</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">Final Sale Items</h4>
                    <p className="text-slate-700">
                      All products made in 925 Sterling Silver, Platinum, and Gold-Plated Vermeil are FINAL SALE 
                      and cannot be cancelled after 24 hours, returned, exchanged, or refunded. These materials do 
                      not qualify under any return or buy-back policy due to customization, plating, and material-specific 
                      constraints.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Refund Processing</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <h4 className="font-medium text-slate-900 mb-2">Prepaid Orders</h4>
                        <p className="text-sm text-slate-700">
                          Amount will be credited back to the original payment method (Credit Card/Debit Card/Net Banking).
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <h4 className="font-medium text-slate-900 mb-2">Cash on Delivery</h4>
                        <p className="text-sm text-slate-700">
                          Refund will be transferred to your bank account.
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <h4 className="font-medium text-slate-900 mb-2">15 Day Policy Returns</h4>
                        <p className="text-sm text-slate-700">
                          Refunds will be credited back to your bank account.
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <h4 className="font-medium text-slate-900 mb-2">Gift Card Orders</h4>
                        <p className="text-sm text-slate-700">
                          Refunds will be credited back to the original gift card.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Applicable Laws */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('laws')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Applicable Laws</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'laws' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'laws' && (
                <div className="px-6 py-5 border-t space-y-3">
                  <p className="text-slate-700">
                    Use of this website and all transactions conducted through it shall be governed by the laws of 
                    India. Customers agree that the courts located in Surat, Gujarat, shall have exclusive jurisdiction 
                    over all disputes, controversies, or claims arising from the use of this website or transactions 
                    with Nymara Jewels.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-slate-700 font-medium">
                      As mandated by the Government of India, customers must provide their Permanent Account Number 
                      (PAN) for purchases exceeding INR 2,00,000 in a single day.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Free Gifts */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('gifts')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Free Gifts</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'gifts' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'gifts' && (
                <div className="px-6 py-5 border-t space-y-3">
                  <p className="text-slate-700">All free gifts offered by Nymara Jewels are treated as discounts.</p>
                  <p className="text-slate-700">
                    In the case of partial cancellation or return of an order containing a free gift, the refund 
                    will not include the discount value attributed to the free gift.
                  </p>
                </div>
              )}
            </section>

            {/* Offer Terms */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection('offers')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Offer Terms & Conditions</h2>
                </div>
                <span className="text-slate-500">{expandedSection === 'offers' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'offers' && (
                <div className="px-6 py-5 border-t space-y-3">
                  <p className="text-slate-700">
                    Special promotional offers are valid only on selected jewelry designs.
                  </p>
                  <p className="text-slate-700">
                    Nymara Jewels reserves the right to add, amend, or withdraw any special offer or its terms at 
                    any time without prior notice.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-lg p-8 mt-8 text-white">
          <h2 className="text-xl font-serif mb-3">Questions or Concerns?</h2>
          <p className="text-slate-300 mb-4">
            If you have any questions about these terms and conditions, please contact us:
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="mailto:business@nymarajewels.com" className="text-slate-300 hover:text-white transition-colors">
              📧 business@nymarajewels.com
            </a>
            
            <a href="tel:+447867089659" className="text-slate-300 hover:text-white transition-colors">
              📞 +44 7867089659
            </a>
            <div className="flex items-center gap-1">
              <svg
                className="w-5 h-5 text-slate-300 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <a
                href="https://wa.me/447867089659"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-slate-400 transition-colors"
              >
                
                
                <span className="text-md text-slate-300 hover:text-white">
                  +44 7867089659
                </span>{" "}
              </a>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}