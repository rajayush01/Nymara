import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function NecklaceSizeGuide() {
const [selectedLength, setSelectedLength] = useState<string | null>(null);

  const necklaceSizes = [
    {
      length: '12"',
      cm: '30.5 cm',
      name: 'Collar Length',
      description: 'Fits snugly around the neck. A chic choice for showcasing elegance with off-shoulder, V-neck, or strapless outfits.',
      style: 'Bold & Statement',
      occasions: 'Evening wear, special occasions'
    },
    {
      length: '14"',
      cm: '35.6 cm',
      name: 'Short Choker',
      description: 'Rests closely at the base of the neck. Enhances slender necklines and adds a refined, modern edge.',
      style: 'Modern & Chic',
      occasions: 'Cocktail parties, date nights'
    },
    {
      length: '16"',
      cm: '40.6 cm',
      name: 'Choker Length',
      description: 'Sits right at the collarbone. Universally flattering and one of the most versatile lengths.',
      style: 'Versatile Classic',
      occasions: 'Everyday wear, office'
    },
    {
      length: '18"',
      cm: '45.7 cm',
      name: 'Princess Length',
      description: 'Falls just below the collarbone. The classic choice for pendants and the most popular everyday length.',
      style: 'Timeless Elegance',
      occasions: 'Daily wear, all occasions'
    },
    {
      length: '20"',
      cm: '50.8 cm',
      name: 'Matinee Length',
      description: 'Rests a few inches below the collarbone. Perfect for higher necklines and professional attire, offering understated elegance.',
      style: 'Professional Grace',
      occasions: 'Business, formal events'
    },
    {
      length: '22"',
      cm: '55.9 cm',
      name: 'Longer Matinee',
      description: 'Sits just above the bust line. A dramatic yet versatile option that works beautifully with eveningwear.',
      style: 'Dramatic & Layerable',
      occasions: 'Evening events, layering'
    },
    {
      length: '24"',
      cm: '61.0 cm',
      name: 'Opera Length',
      description: 'Falls gracefully below the bust. Ideal for layering, creating a bold statement, or elevating formal looks.',
      style: 'Statement Luxury',
      occasions: 'Formal galas, special events'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 mt-40">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Necklace Size Guide</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The length of your necklace determines how it sits, how it frames your neckline, and how it complements your overall look. 
            At Nymara Jewels, we measure from one end of the chain to the other, including the clasp (which may add up to 0.75 inches).
          </p>
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12 max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-2">Measurement includes clasp</p>
              <p>Our necklace lengths are measured from end to end, including the clasp which may add up to 0.75 inches. Each length carries its own character, from timeless classics to bold statements.</p>
            </div>
          </div>
        </div>

        {/* Necklace Length Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {necklaceSizes.map((size, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedLength(size.length)}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedLength === size.length ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-2xl font-bold text-gray-900">{size.length}</h3>
                <span className="text-sm text-gray-500">{size.cm}</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{size.name}</h4>
              <p className="text-gray-600 text-sm mb-4">{size.description}</p>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Style:</span>
                  <span className="text-gray-700 font-medium">{size.style}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Best for:</span>
                  <span className="text-gray-700 font-medium text-right">{size.occasions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Size Chart */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Necklace Length Reference Chart</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Length (inches)</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Length (cm)</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                {necklaceSizes.map((size, idx) => (
                  <tr 
                    key={idx}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      selectedLength === size.length ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedLength(size.length)}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{size.length}</td>
                    <td className="px-6 py-4 text-gray-700">{size.cm}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{size.name}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{size.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Styling Tips */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Styling Tips by Neckline</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Crew Neck / High Neck</h3>
              <p className="text-sm text-gray-600 mb-2">Best with longer lengths</p>
              <p className="text-xs text-gray-500">20" - 24" Opera</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">V-Neck</h3>
              <p className="text-sm text-gray-600 mb-2">Versatile with most lengths</p>
              <p className="text-xs text-gray-500">16" - 20" Princess to Matinee</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Strapless / Off-Shoulder</h3>
              <p className="text-sm text-gray-600 mb-2">Stunning with shorter styles</p>
              <p className="text-xs text-gray-500">12" - 16" Collar to Choker</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Scoop Neck</h3>
              <p className="text-sm text-gray-600 mb-2">Classic mid-lengths work best</p>
              <p className="text-xs text-gray-500">16" - 18" Princess</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Button-Down / Collared</h3>
              <p className="text-sm text-gray-600 mb-2">Layer with longer pieces</p>
              <p className="text-xs text-gray-500">20" - 24" Matinee to Opera</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Sweetheart Neckline</h3>
              <p className="text-sm text-gray-600 mb-2">Beautiful with statement pieces</p>
              <p className="text-xs text-gray-500">14" - 18" Choker to Princess</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need assistance? Contact us at{' '}
            <a href="mailto:business@nymarajewels.com" className="text-blue-600 hover:underline">
              business@nymarajewels.com
            </a>
            {' '}or call{' '}
            <a href="tel:+919424827503" className="text-blue-600 hover:underline">
              +91 94248 27503
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}