import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiMoon, HiSun } from 'react-icons/hi'; // Icons for back, light mode, and dark mode
import Header from './Header';
import Footer from './Footer';

const Article = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state;
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`container mx-auto p-6 ${darkMode ? 'dark' : ''}`}>
        <Header />
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 my-3 rounded-full flex items-center bg-gray-200 text-gray-800"
            title="Back to Browse"
          >
            <HiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className={`text-3xl font-bold flex-grow text-center font-serif ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Article</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full flex items-center ml-auto ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? (
              <HiSun className="w-6 h-6" />
            ) : (
              <HiMoon className="w-6 h-6" />
            )}
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-105 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className={`text-3xl font-bold font-serif ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{article.title}</h1>
            <p className={`text-gray-600 mt-2 font-serif ${darkMode ? 'dark:text-gray-400' : ''}`}>By {article.author || 'Unknown'}</p>
            <p className={`text-gray-600 mt-2  font-serif ${darkMode ? 'dark:text-gray-400' : ''}`}>
              Published at: {new Date(article.publishedAt).toLocaleString()}
            </p>
            <p className={` font-serif mt-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{article.description}</p>
            
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-blue-500 font-serif font-bold mt-4 block ${darkMode ? 'dark:text-blue-300' : ''}`}
              >
                Read the full article
              </a>
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Article;
