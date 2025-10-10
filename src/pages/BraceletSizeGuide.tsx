import React, { useState } from 'react';
import { Ruler, Info, ChevronRight } from 'lucide-react';

export default function BraceletSizeGuide() {
  const [measurement, setMeasurement] = useState('');
  const [recommendedSize, setRecommendedSize] = useState('');

  const sizeChart = [
    { wristIn: '5.5" to 5.9"', wristCm: '14.0 cm to 15.0 cm', braceletSize: '5.5"' },
    { wristIn: '6.0" to 6.4"', wristCm: '15.1 cm to 16.3 cm', braceletSize: '6"' },
    { wristIn: '6.5" to 6.9"', wristCm: '16.4 cm to 17.5 cm', braceletSize: '6.5"' },
    { wristIn: '7.0"', wristCm: '17.6 cm to 18.0 cm', braceletSize: '7"' }
  ];

  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMeasurement(value);
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      if (numValue >= 5.5 && numValue <= 5.9) setRecommendedSize('5.5"');
      else if (numValue >= 6.0 && numValue <= 6.4) setRecommendedSize('6"');
      else if (numValue >= 6.5 && numValue <= 6.9) setRecommendedSize('6.5"');
      else if (numValue >= 7.0 && numValue <= 7.5) setRecommendedSize('7"');
      else setRecommendedSize('');
    } else {
      setRecommendedSize('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 mt-40">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Bracelet Size Guide</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            To find your perfect fit, measure your wrist just below the wrist bone. If you prefer a relaxed fit, consider sizing up slightly.
          </p>
        </div>

        {/* How to Measure Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-serif text-gray-900">How to Measure Your Wrist</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use a flexible measuring tape</h3>
                  <p className="text-gray-600">A soft measuring tape works best for accurate results. If you don't have one, use a strip of paper or string.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Wrap it just below the wrist bone</h3>
                  <p className="text-gray-600">Position the tape where you'd normally wear a bracelet, ensuring it's snug but comfortable.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Mark and measure</h3>
                  <p className="text-gray-600">Mark where the tape overlaps, then measure with a ruler in inches or centimeters.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Pro Tips</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>For a snug fit, choose your exact wrist measurement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>For a relaxed fit, add 0.5" to 1" to your wrist measurement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Measure your wrist in the evening when it's slightly larger</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>If between sizes, size up for comfort</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Size Calculator */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Find Your Size</h2>
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your wrist measurement (inches)
            </label>
            <input
              type="number"
              step="0.1"
              value={measurement}
              onChange={handleMeasurementChange}
              placeholder="e.g., 6.2"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            {recommendedSize && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-900 font-medium">
                  Your recommended bracelet size: <span className="text-xl font-bold">{recommendedSize}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Size Chart */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Bracelet Size Conversion Chart</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Wrist Measurement (inches)</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Wrist Measurement (cm)</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Recommended Bracelet Size</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      recommendedSize === row.braceletSize ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-700">{row.wristIn}</td>
                    <td className="px-6 py-4 text-gray-700">{row.wristCm}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.braceletSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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