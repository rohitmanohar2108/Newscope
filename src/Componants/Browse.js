import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Shimmer from './Shimmer'; // Import Shimmer component
import { HiMoon, HiSun } from 'react-icons/hi'; // Import icons for dark/light mode toggle
import Footer from './Footer';
import { FaArrowUp } from 'react-icons/fa';


const Browse = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await axios.get(
          'https://newsapi.org/v2/everything?q=india&apiKey=ea8156fa512e49ddae5f4360b29947f0'
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black  text-white' : 'bg-white text-black'}`}>
      <div className={`container mx-auto p-6 pt-20 ${darkMode ? 'dark' : ''}`}>
        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-black z-50">
          <Header />
        </div>
          <div className="flex items-center justify-between mb-5 p-4">
            <h1 className={`text-3xl font-serif font-bold flex-grow text-center ${darkMode ? 'text-white' : 'text-black'}`}>
              Top Headlines
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full flex items-center ml-auto ${darkMode ? 'bg-violet-900 text-white' : 'bg-violet-900 text-white'}`}
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? (
                <HiSun className="w-6 h-6" />
              ) : (
                <HiMoon className="w-6 h-6" />
              )}
            </button>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
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
                className={`rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 ${darkMode ? 'bg-violet-800 bg-gradient-to-t from-black' : 'bg-violet-600  bg-gradient-to-t from-black'}`}
                onClick={() => handleCardClick(article)}
              >
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h2 className={`text-xl font-bold font-serif ${darkMode ? 'text-gray-100' : 'text-white'}`}>{article.title}</h2>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-32 right-4 p-3 bg-white text-black rounded-full hover:bg-violet-900  transition-colors"
        >
          <FaArrowUp />
        </button>
      )}
      <Footer />
    </div>
  );
};

export default Browse;
