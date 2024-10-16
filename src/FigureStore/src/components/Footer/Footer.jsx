import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <div className="footer-links-section">
            <h4>Description</h4>
            <p>
              Once all references to Tailwind are removed, test your project to ensure it works correctly without Tailwind.
              After these steps, Tailwind should be fully removed from your React project. You can now implement another CSS framework or use custom styles as needed.
            </p>
          </div>
          <div className="footer-links-section">
            <h4>Product</h4>
            <a href="/">
              <p>Book Library</p>
            </a>
          </div>
          <div className="footer-links-section">
            <h4>Links</h4>
            {['Facebook', 'LinkedIn', 'Github', 'Instagram'].map((link, index) => (
              <a href="/" key={index}>
                <p>{link}</p>
              </a>
            ))}
          </div>
          <div className="footer-links-section">
            <h4>Contact</h4>
            <a href="/">
              <p>Ho Chi Minh, Vietnam</p>
            </a>
            <a href="/">
              <p>trungdungg0807@gmail.com</p>
            </a>
            <a href="/">
              <p>+84 0377 485 395</p>
            </a>
          </div>
        </div>
        <hr />
        <div className="footer-below">
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Ehe. All rights reserved.</p>
          </div>
          <div className="footer-below-links">
            {['Terms', 'Privacy', 'Security', 'Cookie Declaration'].map((link, index) => (
              <a href="/" key={index} className="footer-link">
                <p>{link}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
