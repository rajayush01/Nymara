import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/AppContext';

export default function JewelryCollage() {
  const navigate = useNavigate();
  const { setFilters } = useProducts();

  const collections = [
    {
      title: "Him",
      description: "Classic pieces that never go out of style",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      span: "col-span-2 row-span-2",
      filterType: "gender",
      filterValue: "Men"
    },
    {
      title: "Rings",
      description: "Sparkle with our finest diamonds",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
      span: "col-span-1 row-span-1",
      filterType: "category",
      filterValue: "rings"
    },
    {
      title: "Her",
      description: "Luxurious gold collections",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      span: "col-span-1 row-span-2",
      filterType: "gender",
      filterValue: "Women"
    },
    {
      title: "Necklaces",
      description: "Contemporary designs for today",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      span: "col-span-1 row-span-1",
      filterType: "category",
      filterValue: "necklaces"
    },
  ];

  const handleCollectionClick = (filterType: string, filterValue: string) => {
    if (filterType === "gender") {
      // For gender filters, go to products page with gender filter
      navigate('/products');
      // Set filter after navigation
      setTimeout(() => {
        setFilters({ 
          gender: [filterValue],
          category: [],
          metalType: [],
          stoneType: [],
          style: [],
          size: [],
          color: [],
          subCategory: [],
          sortBy: 'best-seller'
        });
      }, 100);
    } else {
      // For category filters, use the category route
      navigate(`/products/${filterValue}`);
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-neutral-900 mb-3 sm:mb-4">
            Exclusive Collections
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
            Discover exquisite pieces crafted with passion and precision. Each design tells a story of elegance and luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:h-[800px] auto-rows-[250px] sm:auto-rows-[300px] lg:auto-rows-auto">
          {collections.map((collection, index) => (
            <div
              key={index}
              onClick={() => handleCollectionClick(collection.filterType, collection.filterValue)}
              className={`${index === 0 ? 'sm:col-span-2 sm:row-span-2' : index === 2 ? 'sm:col-span-1 sm:row-span-2' : ''} ${collection.span.replace('col-span-', 'lg:col-span-').replace('row-span-', 'lg:row-span-')} group relative overflow-hidden rounded-lg cursor-pointer`}
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-serif mb-1 sm:mb-2">{collection.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {collection.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <button 
            onClick={() => navigate('/products')}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-neutral-900 text-white text-sm sm:text-base rounded-full hover:bg-neutral-800 transition-colors duration-300"
          >
            Explore All Collections
          </button>
        </div>
      </div>
    </section>
  );
}