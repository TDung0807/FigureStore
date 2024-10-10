import React, { useState } from 'react';
import styles from './Navbar.module.css'; // Use CSS module

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>Logo</a>
      <div className={styles.inputWrapper}>
        <div className={styles.searchIcon}>
          <img src="src/assets/Image/search-icon.png" alt="Search" />
        </div>
        <input 
          className={styles.searchInput} 
          placeholder="Type to search..." 
        />
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
