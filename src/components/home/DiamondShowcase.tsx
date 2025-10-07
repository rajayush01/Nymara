import React from 'react';
import { Diamond, Edit, Gift } from 'lucide-react';
import triangle from '@/assets/triangle.png'
import square from '@/assets/square.jpg'
import diamond from '@/assets/diamond.jpeg'

const DiamondShowcase = () => {
  return (
    <section className=" py-16 px-4">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Alta:wght@400;700&display=swap');

          .cinzel {
            font-family: 'Cinzel', serif;
          }
          .alta {
            font-family: 'Alta', serif;
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          <div className="text-center">
            <div className="mb-8 relative">
              <div className="w-80 h-80 mx-auto relative">
                {/* Trillion Cut Diamond */}
                <img src={triangle} alt="" />
              </div>
            </div>
            
            <div className="flex justify-center mb-4">
              <Diamond className="w-6 h-6 text-gray-700" />
            </div>
            
            <h3 className="cinzel text-2xl font-light text-[#9a8457] mb-4">NYMARA CREATED DIAMOND</h3>
            <p className="cinzel text-gray-600 underline cursor-pointer hover:text-gray-800 transition-colors">
              Why unmatched
            </p>
          </div>

          {/* Cut For You */}
          <div className="text-center">
            <div className="mb-8 relative">
              <div className="w-80 h-80 mx-auto relative">
                {/* Asscher Cut Diamond */}
                <img src={square} alt="" />
              </div>
            </div>
            
            <div className="flex justify-center mb-4">
              <Edit className="w-6 h-6 text-gray-700" />
            </div>
            
            <h3 className="cinzel text-2xl font-light text-[#9a8457] mb-4">CUT FOR YOU™</h3>
            <p className="cinzel text-gray-600 underline cursor-pointer hover:text-gray-800 transition-colors">
              Start Cut for You™
            </p>
          </div>

          {/* A Store of Value */}
          <div className="text-center">
            <div className="mb-8 relative">
              <div className="w-80 h-80 mx-auto relative">
                {/* Princess Cut Diamond */}
                <img src={diamond} alt="" />
              </div>
            </div>
            
            <div className="flex justify-center mb-4">
              <Gift className="w-6 h-6 text-gray-700" />
            </div>
            
            <h3 className="cinzel text-2xl font-light text-[#9a8457] mb-4">A STORE OF VALUE</h3>
            <p className="cinzel text-gray-600 underline cursor-pointer hover:text-gray-800 transition-colors">
              Gift a Bitcoin Diamond™
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DiamondShowcase;