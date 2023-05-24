import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SalePage from './pages/SalePage';
import AllProductPage from './pages/AllProductPage';
import { useSelector } from 'react-redux';

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/allproduct/:product" element={<AllProductPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
