import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Shimmer from './Shimmer'; // Import Shimmer component
import { HiMoon, HiSun } from 'react-icons/hi'; // Import icons for dark/light mode toggle
import Footer from './Footer';

const Browse = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`container mx-auto p-6 ${darkMode ? 'dark' : ''}`}>
        <Header />
        <div className="flex items-center justify-between mb-5">
          <h1 className={`text-3xl font-serif font-bold flex-grow text-center ml-8 mt-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Top Headlines
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full flex items-center ml-auto mt-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? (
              <HiSun className="w-6 h-6" />
            ) : (
              <HiMoon className="w-6 h-6" />
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Render shimmer effect while loading
            Array.from({ length: 6 }).map((_, index) => (
              <Shimmer key={index} darkMode={darkMode} />
            ))
          ) : (
            // Render actual articles
            articles.map((article, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                onClick={() => handleCardClick(article)}
              >
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h2 className={`text-xl font-bold font-serif ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{article.title}</h2>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
      <Footer />
      </div>
    </div>
  );
};

export default Browse;
