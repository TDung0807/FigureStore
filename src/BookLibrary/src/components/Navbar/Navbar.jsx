import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
        <header className='header'>
            <a href="/" className="logo">Logo</a>
            <div className="input-wrapper">
                <div className='searchIcon'>
                    <img src='src\assets\search-icon.png'></img>
                </div>
                <div className="searchInput">
                    <input placeholder='Type to search...'></input>
                </div>
            </div>
            <nav className="navbar">
                <a href="/">Home</a>
                <a href="/">Contact</a>
                <a href="/">Sign In</a>
            </nav>
        </header>
  )
}

export default Navbar