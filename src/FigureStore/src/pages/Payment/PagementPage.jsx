import React from 'react';
import styles from './payment.module.css'; // Import CSS Module

const PaymentPage = () => {
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <img
          src="https://cdn.discordapp.com/attachments/916162750214987801/1296051275334418544/82232752.jpg?ex=6710e14f&is=670f8fcf&hm=13212c89f40f64a5955420941e5ca6161f99756965ee342b1392c916cfd61c1d&" // Thay thế bằng URL hình ảnh QR của bạn
          alt="QR Code"
          className={styles.qrCode}
        />
        <p className={styles.paymentText}>Nạp tiền để sử dụng tính năng này</p>
      </div>
    </div>
  );
};

export default PaymentPage;
