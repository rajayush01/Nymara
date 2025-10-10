import React from 'react';
import { BookOpen, Diamond, Gem, Shapes, HelpCircle, ArrowRight, Award, Microscope } from 'lucide-react';

const EducationHubHome = () => {
  const educationCards = [
    {
      id: '4cs',
      title: '4 C\'s of Diamonds',
      description: 'Master the fundamentals: Cut, Color, Clarity, and Carat weight that determine diamond quality and value.',
      icon: <Diamond className="w-8 h-8" />,
      gradient: 'from-purple-500 to-indigo-600',
      highlights: ['Cut Quality', 'Color Grades', 'Clarity Scale', 'Carat Weight'],
      readTime: '8 min read'
    },
    {
      id: 'lab-grown',
      title: 'Lab Grown Diamonds',
      description: 'Discover how lab-grown diamonds are created using HPHT and CVD methods with identical properties to mined diamonds.',
      icon: <Microscope className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-600',
      highlights: ['HPHT Process', 'CVD Method', 'Certification', 'Benefits'],
      readTime: '10 min read'
    },
    {
      id: 'gemstones',
      title: 'Lab Grown Gemstones',
      description: 'Explore ethically created sapphires, emeralds, and rubies with the same beauty as natural stones.',
      icon: <Gem className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-teal-600',
      highlights: ['Synthesis Process', 'Quality Comparison', 'Color Variations', 'Applications'],
      readTime: '6 min read'
    },
    {
      id: 'shapes',
      title: 'Diamond Shapes Guide',
      description: 'From classic round brilliants to unique heart cuts - find the perfect shape for your story.',
      icon: <Shapes className="w-8 h-8" />,
      gradient: 'from-pink-500 to-rose-600',
      highlights: ['Round Brilliant', 'Princess Cut', 'Emerald Cut', 'Fancy Shapes'],
      readTime: '12 min read'
    }
  ];

  const quickFacts = [
    {
      title: 'Lab-grown diamonds are real diamonds',
      description: 'Identical chemical, physical, and optical properties to mined diamonds',
      icon: <Award className="w-6 h-6 text-green-600" />
    },
    {
      title: '100% Conflict-free guarantee',
      description: 'No mining, no environmental impact, no ethical concerns',
      icon: <Award className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Same grading standards',
      description: 'IGI and GIA certify lab-grown diamonds using identical 4C criteria',
      icon: <Award className="w-6 h-6 text-purple-600" />
    }
  ];

  const handleLearnMore = (cardId:string) => {
    // Navigate to specific education page section
    console.log(`Navigate to education page: ${cardId}`);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 rounded-full px-4 py-2 text-indigo-600 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Education Hub</span>
          </div>
          
          <h2 className="text-5xl font-light text-gray-900 mb-6">
            Learn About
            <span className="block text-indigo-600 font-normal">Diamond Excellence</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Understanding diamonds and gemstones empowers you to make confident choices. 
            Explore our comprehensive guides created by certified gemologists.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {educationCards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Card Header */}
              <div className={`p-6 bg-gradient-to-br ${card.gradient} text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-8 -translate-y-8"></div>
                <div className="relative z-10">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <div className="text-sm bg-white/20 rounded-full px-3 py-1 inline-block">
                    {card.readTime}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {card.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                      <span className="text-xs text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <button
                  onClick={() => handleLearnMore(card.id)}
                  className="group/btn flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200 w-full"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Facts Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Quick Facts About Lab-Grown Diamonds
            </h3>
            <p className="text-gray-600">
              Essential knowledge every diamond buyer should know
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickFacts.map((fact, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {fact.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{fact.title}</h4>
                <p className="text-sm text-gray-600">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-3xl p-8 text-center">
          <div className="max-w-4xl mx-auto">
            <HelpCircle className="w-12 h-12 text-white mx-auto mb-6" />
            <h3 className="text-3xl font-light text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Our comprehensive FAQ section covers everything from diamond grading to 
              jewelry care, sizing guides, and our policies.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                Are lab-grown diamonds real?
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                How to determine ring size?
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                What is your return policy?
              </div>
            </div>

            <button
              onClick={() => handleLearnMore('faq')}
              className="inline-flex items-center space-x-3 bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Educational Articles</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">IGI/GIA/SGL</div>
              <div className="text-sm text-gray-600">Certified Expertise</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationHubHome;