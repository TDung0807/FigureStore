import React from 'react';
import styles from './SimilarProducts.module.css'; // Create CSS module for styles

const SimilarProducts = ({ products }) => {
  return (
    <div className={styles.similarProductsContainer}>
      <h2>Similar Products</h2>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.image_url}
              alt={product.name}
              className={styles.cardImg}
            />
            <h3 className={styles.cardTitle}>{product.title}</h3>
            <p className={styles.cardPrice}>{product.price.toLocaleString('vi-VN')} VND</p>
            <div className={styles.cardButtons}>
              <button className={styles.btnBuy}>Buy Now</button>
              <button className={styles.btnAddToCart}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
