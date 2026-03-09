import { Link } from "react-router-dom";
import { Clock, User, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogData";

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-white text-black py-16  sm:mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blogs</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights, trends, and stories from the world of fine jewelry
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
  <Link
    key={post.id}
    to={`/blog/${post.id}`}
    className="group block"
  >
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/400x300?text=Blog+Image";
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#9a8457] text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Meta */}
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#9a8457] transition-colors">
          {post.title}
        </h2>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{post.date}</span>

          <span className="flex items-center text-[#9a8457] font-medium">
            Read More
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  </Link>
))}
        </div>
      </div>
    </div>
  );
}
