import React, { useState } from 'react';
import { Ruler, Info } from 'lucide-react';

export default function RingSizeGuide() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizeChart = [
    { circumIn: '1.74', circumMm: '44.2', us: '3', uk: 'F', france: '44', germany: '14', india: '4', italy: '4' },
    { circumIn: '1.77', circumMm: '44.8', us: '3.25', uk: 'F 1/2', france: '45', germany: '14 1/4', india: '—', italy: '4 5/8' },
    { circumIn: '1.79', circumMm: '45.5', us: '3.5', uk: 'G', france: '45.5', germany: '14 1/2', india: '5', italy: '5 1/4' },
    { circumIn: '1.84', circumMm: '46.8', us: '4', uk: 'H', france: '47', germany: '15', india: '7', italy: '6 1/2' },
    { circumIn: '1.89', circumMm: '48', us: '4.5', uk: 'I', france: '48', germany: '15 1/4', india: '8', italy: '7 3/4' },
    { circumIn: '1.94', circumMm: '49.3', us: '5', uk: 'J 1/2', france: '49', germany: '15 3/4', india: '9', italy: '9' },
    { circumIn: '1.99', circumMm: '50.6', us: '5.5', uk: 'K 1/2', france: '50.5', germany: '16 1/4', india: '10', italy: '10 1/4' },
    { circumIn: '2.04', circumMm: '51.9', us: '6', uk: 'L 1/2', france: '52', germany: '16 1/2', india: '12', italy: '11 1/2' },
    { circumIn: '2.09', circumMm: '53.1', us: '6.5', uk: 'M 1/2', france: '53', germany: '17', india: '13', italy: '12 3/4' },
    { circumIn: '2.14', circumMm: '54.4', us: '7', uk: 'N 1/2', france: '54.5', germany: '17 1/4', india: '14', italy: '14' },
    { circumIn: '2.19', circumMm: '55.7', us: '7.5', uk: 'O 1/2', france: '56', germany: '17 3/4', india: '15', italy: '15 1/4' },
    { circumIn: '2.24', circumMm: '57', us: '8', uk: 'P 1/2', france: '57', germany: '—', india: '16', italy: '16 1/2' },
    { circumIn: '2.29', circumMm: '58.3', us: '8.5', uk: 'Q 1/2', france: '58.5', germany: '18 1/2', india: '17', italy: '17 3/4' },
    { circumIn: '2.34', circumMm: '59.5', us: '9', uk: 'R 1/2', france: '60', germany: '19', india: '18', italy: '19' },
    { circumIn: '2.39', circumMm: '60.8', us: '9.5', uk: 'S 1/2', france: '61', germany: '19 1/2', india: '19', italy: '20 1/4' },
    { circumIn: '2.44', circumMm: '62.1', us: '10', uk: 'T 1/2', france: '62', germany: '19 3/4', india: '20', italy: '21 1/2' },
    { circumIn: '2.49', circumMm: '63.4', us: '10.5', uk: 'U 1/2', france: '63.5', germany: '—', india: '22', italy: '22 3/4' },
    { circumIn: '2.54', circumMm: '64.6', us: '11', uk: 'V 1/2', france: '65', germany: '20 3/4', india: '23', italy: '24' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 mt-40">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Ring Size Guide</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Each of our rings is designed according to standard US sizing. Find your perfect fit using our comprehensive guide below.
          </p>
        </div>

        {/* How to Measure Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-serif text-gray-900">How to Determine Your Ring Size at Home</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Items You'll Require:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Printer and paper</li>
                <li>A piece of string, yarn, floss, or a narrow strip of paper</li>
                <li>A pen or marker</li>
                <li>A ruler</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600 ml-4">
                <li>Cut a piece of string, yarn, floss, or a slim strip of paper that is at least three inches long.</li>
                <li>Carefully wrap one end of the material around the base of the finger where you want to wear the ring.</li>
                <li>With your pen or marker, make a mark at the point where the end of the string meets and overlaps with the rest.</li>
                <li>Place the string flat on a surface and use the ruler to measure the distance from the starting end to your mark in millimeters.</li>
                <li>Finally, compare this measurement with the Ring Size Conversion Chart below to identify the ring size that corresponds to the length.</li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                For the most accurate measurement, measure your finger at the end of the day when it's at its largest. Temperature and water retention can affect ring size.
              </p>
            </div>
          </div>
        </div>

        {/* Size Chart */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Ring Size Conversion Chart</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Circumference (in)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Circumference (mm)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">US/Canada</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">UK/Australia</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">France</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Germany</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">India/China</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Italy/Spain</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      selectedSize === row.us ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedSize(row.us)}
                  >
                    <td className="px-4 py-3 text-gray-700">{row.circumIn}</td>
                    <td className="px-4 py-3 text-gray-700">{row.circumMm}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.us}</td>
                    <td className="px-4 py-3 text-gray-700">{row.uk}</td>
                    <td className="px-4 py-3 text-gray-700">{row.france}</td>
                    <td className="px-4 py-3 text-gray-700">{row.germany}</td>
                    <td className="px-4 py-3 text-gray-700">{row.india}</td>
                    <td className="px-4 py-3 text-gray-700">{row.italy}</td>
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