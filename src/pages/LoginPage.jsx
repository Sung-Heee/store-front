import React, { useEffect } from 'react';
import '../style/login.scss';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Login } from '../apis/user';
import CryptoJS, { SHA256 } from 'crypto-js';
import { HmacSHA256 } from 'crypto-js';

export default function LoginPage() {
  const [password, setPassword] = useState('');

  const loginIdInput = useRef();
  const loginPwInput = useRef();
  const navigate = useNavigate();

  // 아이디 암호화
  const aes128Encode = (secretKey, Iv, data) => {
    const cipher = CryptoJS.AES.encrypt(
      data,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: CryptoJS.enc.Utf8.parse(Iv), // [Enter IV (Optional) 지정 방식]
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC, // [cbc 모드 선택]
      },
    );
    return cipher.toString();
  };

  // 비밀번호 암호화
  const onChangePwd = (e) => {
    setPassword(
      SHA256(
        e.target.value,
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_PASSWORD_SHA_SECRET_KEY,
      ).toString(),
    );
  };

  const loginUser = async () => {
    if (!loginIdInput.current.value || !loginPwInput.current.value)
      return alert('값을 입력 하세요');

    const account = {
      id: aes128Encode(
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_EMAIL_AES_SECRET_KEY,
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_AES_SECRET_IV,
        loginIdInput.current.value,
      ),
      password: password,
    };

    try {
      const resLogin = await Login(account);
      const message = resLogin.data.message;
      const userId = resLogin.data.userId;

      if (resLogin.data.status === '200') {
        // 백에서 온 아이디 세션스토리지에 저장
        sessionStorage.setItem('userId', userId);
        loginIdInput.current.value = '';
        loginPwInput.current.value = '';
        // alert(message); // 로그인 성공 메시지 생략

        navigate('/');
        window.location.reload();
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

  return (
    <>
      <div className="login_container minMax">
        <div className="login_part">
          <p className="login_title">LOGIN</p>
          <div className="login_id_input">
            <input type="email" ref={loginIdInput} placeholder="ID" />
          </div>
          <div className="login_password_input">
            <input
              type="password"
              ref={loginPwInput}
              onChange={onChangePwd}
              placeholder="PASSWORD"
            />
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
