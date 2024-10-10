import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/home/Home';
import AuthPage from './pages/auth/AuthPage';
import ProductDetail from './pages/detail_pro/Detail_Product';
const App = () => {
  return (
    <Router>
      <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          
          <Route
            path="*"
            element={
              <div id="wrapper">
                <div id="header">
                  <Navbar />
                </div>
                <div id="main">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/figure/:id" element={<ProductDetail />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
                <div id="footer">
                  <Footer />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
