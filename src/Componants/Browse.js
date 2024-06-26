import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Browse = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=in&apiKey=ea8156fa512e49ddae5f4360b29947f0'
        );
        setArticles(result.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleCardClick = (article) => {
    navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <Header />
      <h1 className="text-3xl font-bold mb-6">Top Headlines</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(article)}
          >
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold">{article.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
