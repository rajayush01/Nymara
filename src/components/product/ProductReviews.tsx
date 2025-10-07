// components/product/ProductReviews.tsx
import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: number;
  averageRating: number;
  totalReviews: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ 
  productId, 
  averageRating, 
  totalReviews 
}) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Sample reviews data (in real app, this would come from API)
  const reviews: Review[] = [
    {
      id: 1,
      author: "Priya S.",
      rating: 5,
      title: "Absolutely stunning piece!",
      content: "This ring exceeded my expectations. The craftsmanship is incredible and it sparkles beautifully in any light. The shipping was fast and the packaging was luxurious. I've received so many compliments!",
      date: "2024-01-15",
      verified: true,
      helpful: 12,
      images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop"]
    },
    {
      id: 2,
      author: "Rajesh K.",
      rating: 4,
      title: "Great quality, perfect gift",
      content: "Bought this as an anniversary gift for my wife. She loves it! The quality is excellent and it matches perfectly with her other jewelry. Only minor issue was the delivery took a day longer than expected.",
      date: "2024-01-10",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      author: "Meera P.",
      rating: 5,
      title: "Love the design and quality",
      content: "This is my second purchase from this brand and I'm never disappointed. The design is elegant and timeless. Great customer service too - they helped me choose the perfect size.",
      date: "2024-01-08",
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      author: "Anonymous",
      rating: 3,
      title: "Good but expected more",
      content: "The ring is nice but I expected it to be a bit larger based on the photos. The quality is good though and it arrived well-packaged. Would recommend checking the dimensions carefully.",
      date: "2024-01-05",
      verified: false,
      helpful: 3
    }
  ];

  const ratingDistribution = [
    { rating: 5, count: 45, percentage: 65 },
    { rating: 4, count: 18, percentage: 26 },
    { rating: 3, count: 4, percentage: 6 },
    { rating: 2, count: 2, percentage: 3 },
    { rating: 1, count: 0, percentage: 0 }
  ];

  const filteredReviews = reviews.filter(review => 
    filterRating === 'all' || review.rating === parseInt(filterRating)
  ).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  return (
    <div className="mt-16">
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews ({totalReviews})
        </h2>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating}
            </div>
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center space-x-3">
                  <span className="text-sm w-8">
                    {item.rating} ★
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    ({item.count})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Write Review Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Write Your Review
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <Star className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                  placeholder="Summarize your experience"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                  placeholder="Tell others about your experience with this product"
                />
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-[#9a8457] text-white px-6 py-2 rounded-lg hover:bg-[#8a7547] transition-colors">
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating-high">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {review.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {review.author}
                      </span>
                      {review.verified && (
                        <span className="flex items-center text-green-600 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">
                {review.title}
              </h4>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                {review.content}
              </p>
              
              {review.images && review.images.length > 0 && (
                <div className="flex space-x-3 mb-4">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">
                  Was this helpful?
                </span>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Yes ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    <span>No</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredReviews.length < totalReviews && (
          <div className="text-center mt-8">
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;