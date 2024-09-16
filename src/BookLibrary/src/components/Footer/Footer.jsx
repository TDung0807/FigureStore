import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <footer class="footer">
        <div className="footer">
            <div className="sb__footer">
                <div className="sb__footer-links">
                    <div className="sb__footer-links-div">
                        <h4>Description</h4>
                        <p>Once all references to Tailwind are removed, test your project to ensure it works correctly without Tailwind.
                            After these steps, Tailwind should be fully removed from your React project. You can now implement another CSS framework or use custom styles as needed.</p>
                    </div>
                    <div className="sb__footer-links-div">
                        <h4>Product</h4>
                        <a href="/">
                            <p>Book Library</p>
                        </a>
                    </div>
                    <div className="sb__footer-links-div">
                        <h4>Link</h4>
                        <a href="/">
                            <p>Facebook</p>
                        </a>
                        <a href="/">
                            <p>Linkedin</p>
                        </a>
                        <a href="/">
                            <p>Github</p>
                        </a>
                        <a href="/">
                            <p>Instagram</p>
                        </a>
                    </div>
                    <div className="sb__footer-links-div">
                        <h4>Contact</h4>
                        <a href="/">
                            <p>Address</p>
                        </a>
                        <a href="/">
                            <p>trungdungg0807@gmail.com</p>
                        </a>
                        <a href="/">
                            <p>+84 0377 485 395</p>
                        </a>
                    </div>
                </div>
                <hr></hr>
                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p>
                            @{new Date().getFullYear} Ehe. All right reserved.
                        </p>
                    </div>
                    <div className="sb__footer-below-links">
                        <a href="/" className="Terms"><p>Terms</p></a>
                        <a href="/" className="Privacy"><p>Privacy</p></a>
                        <a href="/" className="Security"><p>Security</p></a>
                        <a href="/" className="Cookie Delaration"><p>Cookie Delaration</p></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer