import React from 'react';
import styles from './CardItem.module.css'; // Use CSS module
import { FaShoppingCart } from 'react-icons/fa'; // Importing the cart icon

const CardItem = (props) => {
  const { title, image, price, alt } = props;

  return (
    <div className={styles.card}>
      <img src={image} alt={alt} className={styles.cardImg} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardPrice}>${price.toFixed(2)}</p>
      <div className={styles.cardButtons}>
        <button className={styles.btnBuy}>Buy</button>
        <button className={styles.btnAddToCart}>
          <FaShoppingCart className={styles.cartIcon} />
        </button>
      </div>
    </div>
  );
};

export default CardItem;
