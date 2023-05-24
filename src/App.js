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

function App() {
  console.log('ㅎㅇㅎㅇ');
  console.log('footer');
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
