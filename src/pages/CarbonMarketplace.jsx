import { useState, useEffect } from 'react';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ScaleIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon, ChartBarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

function CarbonMarketplace() {
  const [selectedType, setSelectedType] = useState('all');
  const [marketStats, setMarketStats] = useState(null);
  const [carbonCredits, setCarbonCredits] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetchMarketData();
    fetchCommunityPosts();
  }, [selectedType]);

  const fetchMarketData = async () => {
    try {
      // Fetch market statistics
      // Expected Response:
      // {
      //   data: {
      //     average_price: number,
      //     market_volume: number,
      //     total_impact: number
      //   }
      // }
      const statsResponse = await fetch('http://localhost:5000/api/carbon-market/stats');
      const statsJson = await statsResponse.json();
      setMarketStats(statsJson.data);

      // Fetch available carbon credits
      // Expected Response:
      // {
      //   data: [
      //     {
      //       id: string,
      //       name: string,
      //       price: number,
      //       available: number,
      //       type: string,
      //       location: string,
      //       verified: boolean,
      //       impact: string,
      //       provider: string,
      //       rating: number
      //     }
      //   ]
      // }
      const creditsResponse = await fetch(`http://localhost:5000/api/carbon-market/credits?type=${selectedType}`);
      const creditsJson = await creditsResponse.json();
      setCarbonCredits(creditsJson.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const fetchCommunityPosts = async () => {
    try {
      // Fetch community posts
      // Expected Response:
      // {
      //   data: [
      //     {
      //       id: string,
      //       author: string,
      //       avatar: string,
      //       type: "company" | "individual",
      //       content: string,
      //       image?: string,
      //       likes: number,
      //       comments: number,
      //       timestamp: string,
      //       liked: boolean
      //     }
      //   ]
      // }
      const response = await fetch('http://localhost:5000/api/carbon-market/community');
      const json = await response.json();
      setPosts(json.data);
    } catch (error) {
      console.error('Error fetching community posts:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      // Toggle like status
      // Expected Request:
      // POST /api/carbon-market/community/like
      // Body: { post_id: string }
      // Expected Response:
      // {
      //   data: {
      //     liked: boolean,
      //     likes: number
      //   }
      // }
      const response = await fetch('http://localhost:5000/api/carbon-market/community/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: postId }),
      });
      const json = await response.json();
      
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked: json.data.liked,
            likes: json.data.likes
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      // Submit new post
      // Expected Request:
      // POST /api/carbon-market/community/post
      // Body: { content: string }
      // Expected Response:
      // {
      //   data: {
      //     id: string,
      //     author: string,
      //     avatar: string,
      //     type: "individual",
      //     content: string,
      //     likes: number,
      //     comments: number,
      //     timestamp: string,
      //     liked: boolean
      //   }
      // }
      const response = await fetch('http://localhost:5000/api/carbon-market/community/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newPost }),
      });
      const json = await response.json();
      setPosts([json.data, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  if (!marketStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-success-500/10 via-success-500/5 to-transparent p-6 rounded-2xl">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-success-600 to-success-800 dark:from-success-400 dark:to-success-600 mb-6">
          Carbon Credit Marketplace
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-xl">
                <CurrencyDollarIcon className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Price</p>
                <p className="text-2xl font-bold text-success-600 dark:text-success-400">${marketStats.average_price}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <ChartBarIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Market Volume</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{marketStats.market_volume}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <GlobeAmericasIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Impact</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{marketStats.total_impact}t</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Available Credits</h3>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              <option value="solar">Solar</option>
              <option value="wind">Wind</option>
              <option value="forestry">Forestry</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>

          <div className="grid gap-6">
            {carbonCredits.map((credit) => (
              <div
                key={credit.id}
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-semibold">{credit.name}</h4>
                        {credit.verified && (
                          <span className="px-2 py-1 text-xs bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        by {credit.provider}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                        <p className="font-medium">{credit.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                        <p className="font-medium">{credit.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Impact</p>
                        <p className="font-medium">{credit.impact}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-3xl font-bold text-success-600 dark:text-success-400">
                      ${credit.price}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {credit.available.toLocaleString()} available
                    </p>
                    <button className="mt-4 px-6 py-2 bg-success-600 hover:bg-success-700 dark:bg-success-500 dark:hover:bg-success-600 text-white rounded-lg transition-colors">
                      Purchase Credits
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Community Updates</h3>
          
          <form onSubmit={handleSubmitPost} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your sustainability achievement..."
              className="w-full p-3 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-lg resize-none focus:ring-2 focus:ring-success-500"
              rows="3"
            />
            <button type="submit" className="mt-3 w-full px-4 py-2 bg-success-600 hover:bg-success-700 dark:bg-success-500 dark:hover:bg-success-600 text-white rounded-lg transition-colors">
              Share Update
            </button>
          </form>

          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{post.author}</h4>
                      {post.type === 'company' && (
                        <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                          Company
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{post.timestamp}</p>
                    <p className="mt-2">{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="" className="mt-3 rounded-lg w-full object-cover h-48" />
                    )}
                    <div className="flex items-center gap-6 mt-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-success-600"
                      >
                        {post.liked ? (
                          <HeartIconSolid className="h-5 w-5 text-success-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5" />
                        )}
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600">
                        <ChatBubbleLeftIcon className="h-5 w-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600">
                        <ShareIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonMarketplace;