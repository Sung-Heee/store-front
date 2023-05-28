import React, { useEffect } from 'react';
import '../style/login.scss';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Login } from '../apis/user';
import CryptoJS from 'crypto-js';
import { HmacSHA256 } from 'crypto-js';

export default function LoginPage() {
  const loginIdInput = useRef();
  const loginPwInput = useRef();
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!loginIdInput.current.value || !loginPwInput.current.value)
      return alert('값을 입력 하세요');

    // // eslint-disable-next-line no-undef
    // const AES_SECRET_KEY = process.env.REACT_APP_AES_SECRET_KEY;
    // // eslint-disable-next-line no-undef
    // const SHA_SECRET_KEY = process.env.REACT_APP_AES_SECRET_KEY;
    // // 아이디 AES-128 암호화
    // const encryptID = CryptoJS.AES.encrypt(
    //   loginIdInput.current.value,
    //   AES_SECRET_KEY,
    // ).toString();

    // 복호화
    // const bytes = CryptoJS.AES.decrypt(encryptID, AES_SECRET_KEY);
    // const originalID = bytes.toString(CryptoJS.enc.Utf8);

    // // 비밀번호 SHA-256 암호화
    // const encryptPW = HmacSHA256(
    //   loginPwInput.current.value,
    //   SHA_SECRET_KEY,
    // ).toString();

    // const account = {
    //   id: encryptID,
    //   password: encryptPW,
    // };

    const account = {
      id: loginIdInput.current.value,
      password: loginPwInput.current.value,
    };

    try {
      const resLogin = await Login(account);
      const message = resLogin.data.message; // 객체에 있는 message
      const userId = resLogin.data.userId;

      console.log(userId);
      if (resLogin.data.status === '200') {
        // 아이디 세션스토리지에 저장
        sessionStorage.setItem('userId', userId);

        loginIdInput.current.value = '';
        loginPwInput.current.value = '';

        // alert(message); 로그인 성공 메시지 생략
        window.location.reload();
        navigate('/');
      } else {
        return alert(message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  // 만약 이미 로그인 되어있으면 로그인페이지로 못 가게
  useEffect(() => {
    if (sessionStorage.getItem('userId') !== null) {
      navigate('/');
    }
  });

  // Caps Lock 표시를 위한 state 설정
  const [capsLockOn, setCapsLockOn] = useState(false);

  // 비밀번호 표시를 위한 state 설정
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="login_container minMax">
        <div className="login_part">
          <p className="login_title">LOGIN</p>
          <div className="login_id_input">
            <input type="email" ref={loginIdInput} placeholder="ID" />
          </div>
          <div className="login_password_input">
            <input type="password" ref={loginPwInput} placeholder="PASSWORD" />
          </div>
          <div className="login_btn">
            <button onClick={loginUser}>LOGIN</button>
          </div>
          <div className="register_btn">
            <Link to="/register">JOIN US</Link>
          </div>
          <div className="user_info_btn">
            <p className="id_search">아이디 찾기</p>
            <p>|</p>
            <p className="password_search">비밀번호 찾기</p>
            <p>|</p>
            <p className="order_inquiry">비회원 주문조회</p>
          </div>
          <p className="kakao_naver_login">간편 로그인</p>
          <div className="kakao_login">
            <Link to="">카카오톡으로 로그인</Link>
          </div>
          <div className="naver_login">
            <Link to="">네이버로 로그인</Link>
          </div>
        </div>
      </div>
    </>
  );
}
