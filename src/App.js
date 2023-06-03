import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyPage from './pages/MyPage';
import SalePage from './pages/SalePage';
import AllProductPage from './pages/AllProductPage';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './apis/user';
import { init } from './store/modules/user';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ManProductPage from './pages/ManProductPage';
import WomanProductPage from './pages/WomanProductPage';
import LoginRequire from './pages/LoginRequire';
import ScrollReset from './components/ScrollReset';

function App() {
  // 로그인 상태
  const isLogin = sessionStorage.getItem('userId') !== null;

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const storedUserId = sessionStorage.getItem('userId');
      if (storedUserId) {
        try {
          const resUser = await getUser(storedUserId);
          const dbUserId = resUser.data.userInfo.userEmail;
          if (storedUserId !== dbUserId) {
            alert('잘못된 로그인입니다.');
            // 로그아웃
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkLoggedInUser();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/mypage"
          element={isLogin ? <MyPage /> : <LoginRequire />}
        />
        <Route
          path="/sale"
          element={isLogin ? <SalePage /> : <LoginRequire />}
        />
        <Route path="/all_product" element={<AllProductPage />} />
        <Route path="/man_product" element={<ManProductPage />} />
        <Route path="/woman_product" element={<WomanProductPage />} />
        <Route
          path="/productdetails/:itemID"
          element={<ProductDetailsPage />}
        />
      </Routes>
      {/* <LoginRequire /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
