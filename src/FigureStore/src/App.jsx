import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/home/Home';
import AuthPage from './pages/auth/AuthPage';
import ProductDetail from './pages/detail_pro/Detail_Product';
import CartPage from './pages/cart/CartPage';
import PaymentPage from './pages/Payment/PagementPage';

const App = () => {
  const location = useLocation();
  
  // Danh sách các đường dẫn không có Navbar và Footer
  const noHeaderFooterPaths = ['/auth', '/payment'];

  return (
    <div className="app-wrapper">
      {!noHeaderFooterPaths.includes(location.pathname) && <Navbar />}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/figure/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
