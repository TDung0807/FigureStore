import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './detailproduct.module.css';
import SimilarProducts from '../../components/SimilarProduct/SimilarProduct';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const productData = {
    // Current product data
    name: "Nendoroid #2593 Days with My Stepsister Saki Ayase(Good Smile Company)",
    brand: "Good Smile Company ( Chính Hãng Nhật Bản )",
    material: "PVC, ABS",
    price: 1450000,
    height: 100,
    release_date: "2025-01-30",
    title: "[Pre Order] MÔ HÌNH Nendoroid #2593 Days with My Stepsister Saki Ayase(Good Smile Company) FIGURE CHÍNH HÃNG",
    image_url: "//bizweb.dktcdn.net/thumb/large/100/477/898/products/21-1725976263359.jpg?v=1725976267223"
  };

  const generateSimilarProducts = (numberOfProducts) => {
    const baseImageUrl = "//bizweb.dktcdn.net/thumb/large/100/477/898/products/21-1725976263359.jpg?v=1725976267223";
    
    const products = [];
    
    for (let i = 1; i <= numberOfProducts; i++) {
      products.push({
        id: i.toString(), // Convert to string to match your format
        name: `Product ${i}`,
        title: `Similar Product ${i}`,
        image_url: baseImageUrl,
        price: 1200000 + i * 100000, // Increment price for variety
      });
    }
    
    return products;
  };
  
  // Generate 10 similar products
  const similarProductsData = generateSimilarProducts(10);
  

  useEffect(() => {
    const fetchProduct = async () => {
      setProduct(productData);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleBuy = () => {
    alert(`You have purchased ${quantity} items.`);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} items to the cart.`);
  };

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.row1}>
        <div className={styles.infoContainer}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.productPrice}>Price: {product.price.toLocaleString('vi-VN')} VND</p>
          <div className={styles.quantityContainer}>
            <label htmlFor="quantity">Quantity:</label>
            <input 
              type="number" 
              id="quantity" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1" 
              className={styles.quantityInput} 
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.btnBuy} onClick={handleBuy}>Buy Now</button>
            <button className={styles.btnAddToCart} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={product.image_url} alt={product.name} className={styles.productImage} />
        </div>
      </div>

      <div className={styles.row2}>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Material:</strong> {product.material}</p>
        <p><strong>Height:</strong> {product.height} mm</p>
        <p><strong>Release Date:</strong> {product.release_date}</p>
      </div>

      {/* Similar Products Section */}
      <SimilarProducts products={similarProductsData} />
    </div>
  );
};

export default ProductDetail;
