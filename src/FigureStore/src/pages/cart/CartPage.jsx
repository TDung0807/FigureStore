// CartPage.jsx
import React, { useState } from 'react';
import styles from './Cart.module.css';
import { MdDelete } from "react-icons/md";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Nendoroid #2593 Days with My Stepsister Saki Ayase",
            price: 1450000,
            quantity: 2,
            imageUrl: "//bizweb.dktcdn.net/thumb/large/100/477/898/products/21-1725976263359.jpg?v=1725976267223",
        },
        // ... other items
    ]);

    const handleRemove = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const handleCheckout = () => {
        console.log("Proceeding to checkout...");
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className={styles.cartContainer}>
            {cartItems.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
                <div className={styles.itemsList}>
                    {cartItems.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <input type="checkbox" className={styles.checkbox} />
                            <img src={item.imageUrl} alt={item.title} className={styles.cartImage} />
                            <div className={styles.cartDetails}>
                                <h2 className={styles.itemTitle}>{item.title}</h2>
                                <p className={styles.priceText}>Price: {item.price.toLocaleString('vi-VN')} VND</p>
                                <div className={styles.quantityContainer}>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className={styles.quantityButton}
                                    >
                                        -
                                    </button>
                                    <span className={styles.quantityDisplay}>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        className={styles.quantityButton}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <MdDelete
                                onClick={() => handleRemove(item.id)}
                                className={styles.removeButton}
                                size={24}
                                color='red'
                            />
                        </div>
                    ))}
                </div>
            )}
            <div className={styles.totalContainer}>
                <h2>Total: {totalPrice.toLocaleString('vi-VN')} VND</h2>
                <button onClick={handleCheckout} className={styles.checkoutButton}>Checkout</button>
            </div>
        </div>
    );
};

export default CartPage;
