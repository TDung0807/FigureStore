import React from 'react';
import styles from './CardItem.module.css'; // CSS Module import
import { FaShoppingCart } from 'react-icons/fa'; // Import Cart Icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const CardItem = ({id, title, image, price, alt, onCardClick, onBuyClick, onAddToCartClick }) => {
  const navigate = useNavigate(); 
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
  const handleCardClick = () => {
    navigate(`/figure/${id}`);
  };
  return (
    <div
      className={styles.card} onClick={handleCardClick}>
      <img src={image} alt={alt} className={styles.cardImg} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardPrice}>{formattedPrice}</p>
      <div className={styles.cardButtons}>
        <button
          className={styles.btnBuy}
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering the card click
            onBuyClick();
          }}
        >
          Buy
        </button>
        <button
          className={styles.btnAddToCart}
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering the card click
            onAddToCartClick();
          }}
        >
          <FaShoppingCart className={styles.cartIcon} />
        </button>
      </div>
    </div>
  );
};

export default CardItem;
