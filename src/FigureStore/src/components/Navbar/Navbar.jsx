import React, { useState } from 'react';
import styles from './Navbar.module.css'; // Use CSS module
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownSearchOpen, setIsDropdownSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  // Sample product data (you can replace this with actual data)
  const products = [
    {
      id: 1,
      title: 'Product 1',
      imageUrl: '//bizweb.dktcdn.net/thumb/large/100/477/898/products/21-1725976263359.jpg?v=1725976267223',
    },
    {
      id: 2,
      title: 'Product 2',
      imageUrl: '//bizweb.dktcdn.net/thumb/large/100/477/898/products/21-1725976263359.jpg?v=1725976267223',
    },
    {
      id: 3,
      title: 'Product 3',
      imageUrl: '//bizweb.dktcdn.net/thumb/large/100/477/898/products/21-1725976263359.jpg?v=1725976267223',
    },
    // Add more products as needed
  ];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleClick = (id) => {
    navigate(`/figure/${id}`);
    setIsDropdownSearchOpen(false);
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownSearchOpen(e.target.value.length > 0); 
  };

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>Logo</a>
      <div className={styles.inputWrapper}>
        {/* <div className={styles.searchIcon}>
          <FaSearch />
        </div> */}
        <input 
          className={styles.searchInput} 
          placeholder="Type to search..." 
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Product dropdown will be centered below the search input */}
        {isDropdownSearchOpen && filteredProducts.length > 0 && (
          <div className={styles.productDropdown}>
            {filteredProducts.map(product => (
              <div key={product.id} className={styles.productItem} onClick={handleClick(product.id)}>
                <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
                <span>{product.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <nav className={styles.navbar}>
        <div className={styles.navItem} onClick={toggleDropdown}>
          <strong>Menu</strong>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <a href="/" className={styles.dropdownItem}>Home</a>
              <a href="/" className={styles.dropdownItem}>Contact</a>
              <a href="/auth" className={styles.dropdownItem}>Sign In</a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
  
};

export default Navbar;
