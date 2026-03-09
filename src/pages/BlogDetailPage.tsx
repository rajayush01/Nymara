import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, ArrowLeft, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { useEffect, useState } from "react";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showShareMenu, setShowShareMenu] = useState(false);

  const post = blogPosts.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Blog post not found
          </h2>
          <Link
            to="/blog"
            className="text-[#9a8457] hover:text-[#7d6b47] font-medium"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShareMenu(false);
  };

  // Get related posts (exclude current post)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button - Fixed at top */}
      <div className="fixed top-24 left-4 md:left-8 z-50">
        <button
          onClick={() => navigate("/blog")}
          className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-lg border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline">Back to Blog</span>
        </button>
      </div>

      {/* Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center text-sm text-gray-600 space-x-2 mb-4">
            <span>{post.date}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-lg"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/1200x600?text=Blog+Image";
            }}
          />
        </div>

        {/* Share Button */}
        <div className="flex justify-end mb-8 relative">
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          {showShareMenu && (
            <div className="absolute top-12 right-0 bg-white shadow-xl rounded-lg p-4 z-10 border border-gray-200">
              <button
                onClick={copyLink}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors"
              >
                Copy Link
              </button>
            </div>
          )}
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div
            className="text-gray-800 leading-relaxed text-lg"
            style={{
              fontFamily: "Georgia, serif",
              lineHeight: "1.8",
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Divider */}
        <div className="border-t border-gray-200 my-16"></div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x300?text=Blog+Image";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#9a8457] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
