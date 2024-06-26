import React from 'react';

const Card = ({ article, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{article.title}</h2>
      </div>
    </div>
  );
};

export default Card;