import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/home/Home';
import AuthPage from './pages/auth/AuthPage';
import ProductDetail from './pages/detail_pro/Detail_Product';
import CartPage from './pages/cart/CartPage';

const App = () => {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      {location.pathname !== '/auth' && <Navbar />}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/figure/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      {location.pathname !== '/auth' && <Footer />}
    </div>
  );
};

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
