import { useState, useEffect } from 'react';
import styles from './AuthPage.module.css';
import Notification from '../../components/Notification/Notification';
import { useNavigate } from 'react-router-dom'

const images = [
  "https://bizweb.dktcdn.net/thumb/large/100/477/898/products/21-1725976263359.jpg?v=1725976267223",
  "https://bizweb.dktcdn.net/thumb/large/100/477/898/products/0-1725160211272.jpg?v=1725160215037",
  "https://bizweb.dktcdn.net/thumb/large/100/477/898/products/1-1725096605528.jpg?v=1725096610203",
  
];

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate()

  const toggleMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLoginMode((prevMode) => !prevMode);
      setIsAnimating(false);
      
      setPassword('');
      setConfirmPassword('');
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    if (isLoginMode) {
      
      console.log('Logging in...');
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      navigate('/')
      // navigate('/')
    } else {
      
      if (password === confirmPassword) {
        console.log('Registering...');
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000); 
      } else {
        alert("Passwords do not match! Please try again.");
      }
    }
    setLoading(false); 
  };
  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.authContainer}>
      <div className={styles.imageColumn}>
        {/* Slideshow */}
        <div className={styles.slideshow}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`${styles.slide} ${currentIndex === index ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.authColumn}>
        <div className={styles.authCard}>
          <h2 className={styles.title}>{isLoginMode ? 'Login' : 'Register'}</h2>
          <div className={`${styles.formContainer} ${isAnimating ? styles.slide : ''}`}>
            <form onSubmit={handleSubmit}>
              
              <div className={styles.inputGroup}>
                <label>Email:</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                    <label>Password:</label>
                    <input 
                      type="password" 
                      placeholder="Enter your password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
              {!isLoginMode && (
                <>
                 
                  <div className={styles.inputGroup}>
                    <label>Confirm Password:</label>
                    <input 
                      type="password" 
                      placeholder="Confirm your password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      required 
                    />
                  </div>
                </>
              )}
              {/* Button: Show spinner or text based on loading state */}
              <button className={styles.submitButton} type="submit" disabled={loading}>
                {loading ? (
                  <img src="src/assets/Image/giphy.webp" alt="Loading..." className={styles.spinner} />
                ) : (
                  isLoginMode ? 'Login' : 'Register'
                )}
              </button>
            </form>
          </div>
          <button className={styles.toggleButton} onClick={toggleMode} disabled={loading}>
            {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
      </div>

      <Notification 
        message="Registration Successful!" 
        isVisible={showNotification} 
        onClose={handleNotificationClose} 
      />
    </div>
  );
};

export default AuthPage;
