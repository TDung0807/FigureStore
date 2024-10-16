import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css'; // Use CSS module
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/figures/search?query=${query}`);
      console.log(response)
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleClick = (id) => {
    navigate(`/figure/${id}`);
    // setSearchQuery('');
    // setIsSearch(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      fetchProducts(query);
    } else {
      setFilteredProducts([]);
    }
  };

  const toggleSearch = () => {
    setIsSearch(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>Logo</a>
      <div className={styles.inputWrapper}>
        <input
          className={styles.searchInput}
          placeholder="Type to search..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={toggleSearch} // Open dropdown on focus
          onBlur={() => setIsSearch(false)} // Close dropdown on blur
        />
        {isSearch && filteredProducts.length > 0 && (
          <div className={styles.productDropdown}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className={styles.productItem}
                onClick={() => handleClick(product.id)}
              >
                <img
                  src={product.imageUrl}
                  className={styles.productImage}
                />
                <span>
                  {product.title.length > 40 ? `${product.title.substring(0, 40)}...` : product.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <nav className={styles.navbar}>
        <div className={styles.navItem}>
          <a href="/" className={styles.navLink}>Home</a>
        </div>
        <div className={styles.navItem}>
          <a href="/contact" className={styles.navLink}>Contact</a>
        </div>
        <div className={styles.navItem}>
          <a href="/auth" className={styles.navLink}>Sign In</a>
        </div>
        <div className={styles.navItem}>
          <a href="/cart" className={styles.navLink}>Cart</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
