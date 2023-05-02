import React from 'react';
import '../style/register.scss';

export default function RegisterPage() {
  return (
    <>
      <div className="register">
        <div>
          <h1>Register</h1>
        </div>
        <div className="register-box">
          <div className="info-top">
            <p>기본정보</p>
            <p>
              <span className="required">*</span>필수입력사항
            </p>
          </div>
          <form className="register-form">
            <div className="name-info">
              <label>
                <span className="required">*</span>이름
              </label>
              <input id="idInput" type="text" required />
            </div>
            <div className="birth-info">
              <label>
                <span className="required">*</span>생년월일
              </label>
              <input id="birthInput" type="date" required />
            </div>
            <div className="gender-info">
              <label>
                <span className="required">*</span>성별
              </label>
              <div className="gender-input">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked
                />
                <label htmlFor="male">남성</label>
              </div>
              <div className="gender-input">
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">여성</label>
              </div>
            </div>
            <div className="tel-info">
              <label>
                <span className="required">*</span>휴대폰
              </label>
              <input id="telInput" type="tel" required />
            </div>
            <div className="id-info">
              <label>
                <span className="required">*</span>이메일
              </label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="password-info">
              <label>
                <span className="required">*</span>비밀번호
              </label>
              <input
                name="password"
                required
                type="password"
                placeholder="영문/숫자 포함 8자 이상"
              />
            </div>
            <div className="password-info">
              <label>
                <span className="required">*</span>비밀번호 확인
              </label>
              <input name="password" required type="password" />
            </div>
            <div className="nickName-info">
              <label>
                <span className="required">*</span>닉네임
              </label>
              <input id="nickInput" required type="text" maxLength={8} />
            </div>
            <button className="cancel--btn btn">CANCEL</button>
            <button className="join--btn btn">JOIN</button>
          </form>
        </div>
      </div>
    </>
  );
}
