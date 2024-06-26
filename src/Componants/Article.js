import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HiMoon, HiSun } from 'react-icons/hi'; // Icons for light mode and dark mode
import Header from './Header';

const Article = () => {
  const location = useLocation();
  const { article } = location.state;
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`container mx-auto p-6 ${darkMode ? 'dark' : ''}`}>
        <Header />
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Article</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full flex items-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
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
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{article.title}</h1>
            <p className={`text-gray-600 mt-2 ${darkMode ? 'dark:text-gray-400' : ''}`}>By {article.author || 'Unknown'}</p>
            <p className={`text-gray-600 mt-2 ${darkMode ? 'dark:text-gray-400' : ''}`}>
              Published at: {new Date(article.publishedAt).toLocaleString()}
            </p>
            <p className={`mt-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{article.description}</p>
            <p className={`mt-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {article.content ? (
                article.content.split('[')[0] // Remove the truncated message part
              ) : (
                'Content not available. Please visit the original source for full content.'
              )}
            </p>
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-blue-500 underline mt-4 block ${darkMode ? 'dark:text-blue-300' : ''}`}
              >
                Read the full article
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;