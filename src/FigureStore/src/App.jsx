import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CardItem from './components/CardItem/CardItem';
import Pagination from './components/Pagination/Pagination';
import './index.css';
import axios from 'axios'; // Import axios if you're using it

const ITEMS_PER_PAGE = 8; // Number of items per page

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]); // State to hold product data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/figures'); 
        console.log(response.data)
        setProducts(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const currentItems = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

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
