import { useState } from 'react';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ScaleIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const carbonCredits = [
  {
    id: 1,
    name: 'Renewable Energy Credits',
    price: 25.50,
    available: 1000,
    type: 'Solar',
    location: 'California, USA',
    verified: true,
  },
  {
    id: 2,
    name: 'Forest Conservation Credits',
    price: 18.75,
    available: 500,
    type: 'Forestry',
    location: 'Amazon, Brazil',
    verified: true,
  },
  {
    id: 3,
    name: 'Methane Capture Credits',
    price: 15.25,
    available: 750,
    type: 'Industrial',
    location: 'Texas, USA',
    verified: true,
  },
];

const achievements = [
  {
    id: 1,
    author: 'Green Energy Corp',
    avatar: 'https://ui-avatars.com/api/?name=Green+Energy&background=0D9488&color=fff',
    type: 'company',
    content: "Proud to announce we've reduced our carbon emissions by 40% this year through implementing new solar technology!",
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    likes: 245,
    comments: 28,
    timestamp: '2h ago',
    liked: false,
  },
  {
    id: 2,
    author: 'EcoTech Solutions',
    avatar: 'https://ui-avatars.com/api/?name=EcoTech+Solutions&background=2563EB&color=fff',
    type: 'company',
    content: "Just completed our largest carbon credit trade to date - 1000 credits from wind energy projects! 🌱",
    likes: 189,
    comments: 15,
    timestamp: '4h ago',
    liked: false,
  },
  {
    id: 3,
    author: 'Sarah Chen',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=DB2777&color=fff',
    type: 'individual',
    content: "Excited to share that our community initiative has helped plant 10,000 trees this month! Together we can make a difference. 🌳",
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    likes: 423,
    comments: 45,
    timestamp: '6h ago',
    liked: false,
  },
];

function CarbonMarketplace() {
  const [selectedType, setSelectedType] = useState('all');
  const [posts, setPosts] = useState(achievements);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const newAchievement = {
      id: posts.length + 1,
      author: 'You',
      avatar: 'https://ui-avatars.com/api/?name=You&background=9333EA&color=fff',
      type: 'individual',
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      liked: false,
    };

    setPosts([newAchievement, ...posts]);
    setNewPost('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Carbon Credit Marketplace</h2>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="input"
        >
          <option value="all">All Types</option>
          <option value="solar">Solar</option>
          <option value="wind">Wind</option>
          <option value="forestry">Forestry</option>
          <option value="industrial">Industrial</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Average Price</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">$19.83</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Volume</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2,250 Credits</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <ScaleIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Trades</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">156</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Available Credits</h3>
            <div className="grid gap-6">
              {carbonCredits.map((credit) => (
                <div key={credit.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{credit.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{credit.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{credit.type}</span>
                      {credit.verified && (
                        <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${credit.price}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{credit.available} available</p>
                    <button className="mt-2 btn-primary">
                      Purchase Credits
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Community Achievements</h3>
            
            <form onSubmit={handleSubmitPost} className="mb-6">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your sustainability achievement..."
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="3"
              />
              <button type="submit" className="mt-2 btn-primary w-full">
                Post Achievement
              </button>
            </form>

            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                  <div className="flex items-start gap-3">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{post.author}</h4>
                        {post.type === 'company' && (
                          <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full">
                            Company
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                      <p className="mt-2 text-gray-900 dark:text-white">{post.content}</p>
                      {post.image && (
                        <img src={post.image} alt="" className="mt-3 rounded-lg w-full object-cover h-48" />
                      )}
                      <div className="flex items-center gap-6 mt-3">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {post.liked ? (
                            <HeartIconSolid className="h-5 w-5 text-red-500" />
                          ) : (
                            <HeartIcon className="h-5 w-5" />
                          )}
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <ChatBubbleLeftIcon className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
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
    </div>
  );
}

export default CarbonMarketplace;