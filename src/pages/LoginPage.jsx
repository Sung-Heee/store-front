import React from 'react';
import '../style/login.scss';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../store/modules/user';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const loginIdInput = useRef();
  const loginPwInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!loginIdInput.current.value || !loginPwInput.current.value)
      return alert('값을 입력 하세요');

    try {
      const resLogin = await axios.post('/login', {
        id: loginIdInput.current.value,
        password: loginPwInput.current.value,
      });

      console.log(resLogin.data);
      // 로그인이 성공하면 응답 데이터 token 프로퍼티에 accessToken 이 전달 되어 오므로
      // 로컬 스토리지에 로그인 정보가 저장 된 토큰을 저장
      // 해당 정보를 통하여 리액트 실행 시, 토큰을 백엔드 서버에 검증하여 자동 로그인을 처리

      if (resLogin.status === 200) {
        dispatch(
          login({
            id: loginIdInput.current.value,
            // password: loginPwInput.current.value,
          }),
        );
        loginIdInput.current.value = '';
        loginPwInput.current.value = '';

        // const data = await resLogin.json();
        const token = resLogin.data.token;
        window.localStorage.setItem('token', token);
        alert(resLogin.data); // 로그인 성공 하였습니다 라는 값 받아왔음.
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

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
            <input type="text" ref={loginIdInput} placeholder="ID" />
          </div>
          <div className="login_password_input">
            <input type="text" ref={loginPwInput} placeholder="PASSWORD" />
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
