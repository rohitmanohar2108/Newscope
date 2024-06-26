import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Shimmer from './Shimmer'; // Import Shimmer component

const Browse = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await axios.get(
          'https://newsapi.org/v2/everything?q=geopolitics&apiKey=ea8156fa512e49ddae5f4360b29947f0'
        );
        setArticles(result.data.articles);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchArticles();

    // Polling interval to fetch new articles every 5 minutes
    const interval = setInterval(() => {
      fetchArticles();
    }, 5 * 60 * 1000); // Poll every 5 minutes (5 * 60 * 1000 milliseconds)

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (article) => {
    navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold flex-grow text-center mt-4 mb-5">Top Headlines</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Render shimmer effect while loading
          <>
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </>
        ) : (
          // Render actual articles
          articles.map((article, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleCardClick(article)}
            >
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold">{article.title}</h2>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Browse;
