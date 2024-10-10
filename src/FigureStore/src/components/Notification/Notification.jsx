import React, { useEffect } from 'react';
import styles from './Notification.module.css';

// eslint-disable-next-line react/prop-types
const Notification = ({ message, isVisible, duration = 5000, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer); 
    }
  }, [isVisible, duration, onClose]);

  return (
    <div className={`${styles.notification} ${isVisible ? styles.show : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
