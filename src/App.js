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

function App() {
  const dispatch = useDispatch();

  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  // 초기 로딩 시, 로그인 상태
  // 상태에 따라 isLogin true or false
  // 컴포넌트가 처음 렌더링 될 때만 실행 됨
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLogin(true); // 로컬 스토리지에 유저 아이디가 있으면 로그인 상태로 변경
    } else {
      setIsLogin(false); // 로컬 스토리지에 유저 아이디가 있으면 로그인 상태로 변경
    }
  }, []);

  // 사용자 정보 조회 함수
  const getUserInfo = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const resUser = await getUser(userId);
      const dbUserInfo = resUser.data; // 조회된 사용자 정보 반환
      dispatch(init(dbUserInfo.userInfo));
    } catch (error) {
      console.error(error);
    }
  };

  // isLogin의 상태가 변경될 때마다 실행
  // true일 때만 해당 아이디의 유저 정보를 리덕스에 넣음
  useEffect(() => {
    if (isLogin) {
      getUserInfo();
    }
  }, [isLogin]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={isLogin ? <MyPage /> : <LoginPage />} />
        <Route path="/sale" element={isLogin ? <SalePage /> : <LoginPage />} />
        <Route path="/allproduct/:product" element={<AllProductPage />} />
        <Route
          path="/productdetails/:itemID"
          element={<ProductDetailsPage />}
        />
      </Routes>
      {/* <MyPage /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
