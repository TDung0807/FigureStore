import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CardItem from './components/CardItem/CardItem';
import Product from './assets/Product/product.json';
import Pagination from './components/Pagination/Pagination';
import './index.css';

const ITEMS_PER_PAGE = 8; // Number of items per page

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Product.length / ITEMS_PER_PAGE);
  const currentItems = Product.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div id="wrapper">
      <div id="header">
        <Navbar />
      </div>
      <div id="main">
        <div className="container">
          {currentItems.map((item, index) => (
            <CardItem
              key={index}
              title={item.Title}
              image={item.ImageURL}
              price={item.Price}
              alt={item.Title}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
