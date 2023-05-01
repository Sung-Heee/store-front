import React from 'react';

export default function LoginPage() {
  return (
    <div className="login-part">
      <h1>Login</h1>
      <p>
        아이디
        <input type="text" />
      </p>
      <p>
        비밀번호
        <input type="text" />
      </p>
      <button>로그인</button>
      <button>회원가입</button>
      <br />
      <span>아이디 찾기</span> | <span>비밀번호 찾기</span> |{' '}
      <span>비회원 주문조회</span>
      <div>카카오톡으로 로그인</div>
      <div>네이버로 로그인</div>
    </div>
  );
}
