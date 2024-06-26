import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Browse from './Componants/Browse';
import Article from './Componants/Article';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/article/:title" element={<Article />} />
      </Routes>
    </Router>
  );
};

export default App;