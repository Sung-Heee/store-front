import React from 'react';
import '../style/login.scss';
import axios from 'axios';
import React, { useRef, useState } from 'react';
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

    const resLogin = await axios.post('/login', {
      body: JSON.stringify({
        id: loginIdInput.current.value,
        password: loginPwInput.current.value,
      }),
    });

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
      const data = await resLogin.json();
      const token = data.token;
      window.localStorage.setItem('token', token);
      alert(data.message); // 로그인 성공 하였습니다 라는 값 받아왔음.
      navigate('/');
    } else {
      alert(await resLogin.json());
    }
  };

  // Caps Lock 표시를 위한 state 설정
  const [capsLockOn, setCapsLockOn] = useState(false);

  // 비밀번호 표시를 위한 state 설정
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-part">
      <h1>Login</h1>
      <p>
        아이디
        <input type="text" ref={loginIdInput} />
      </p>
      <p>
        비밀번호
        <input type="text" ref={loginPwInput} />
      </p>
      <button onClick={loginUser}>로그인</button>
      <Link to="/register">회원가입</Link>
      <br />
      <span>아이디 찾기</span> | <span>비밀번호 찾기</span> |
      <span>비회원 주문조회</span>
      <div>카카오톡으로 로그인</div>
      <div>네이버로 로그인</div>
    </div>
  );
}
