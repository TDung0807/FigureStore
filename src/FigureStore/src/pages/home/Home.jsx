import React, { useState, useEffect } from 'react';
import CardItem from '../../components/CardItem/CardItem';
import Pagination from '../../components/Pagination/Pagination';
import axios from 'axios';
import styles from './HomePage.module.css'; // Sử dụng CSS module

const ITEMS_PER_PAGE = 8; // Số lượng sản phẩm mỗi trang

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]); // Trạng thái để giữ dữ liệu sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái quản lý tình trạng tải
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/figures');
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Mảng phụ thuộc rỗng có nghĩa là hiệu ứng này chạy một lần khi component mount

  const currentItems = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return <div className={styles.loading}>Loading...</div>; // Hiển thị thông báo tải khi dữ liệu đang được lấy
  }

  return (
    <div>
      <div className={styles.container}>
        {currentItems.map((item, index) => (
          <CardItem
            key={index}
            id={item.id}
            title={item.title}
            image={item.image_url}
            price={item.price}
            alt={item.title}
            onCardClick={() => console.log('Card clicked!')}
            onBuyClick={() => console.log('Buy button clicked!')}
            onAddToCartClick={() => console.log('Added to cart!')}
          />
        ))}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default HomePage;
