import React, { useRef } from 'react';
import '../style/register.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/modules/user';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const genderOptions = [
    { value: '남성', label: '남성' },
    { value: '여성', label: '여성' },
  ];

  const registerIdInput = useRef();
  const registerPwInput = useRef();
  const registerPwCheckInput = useRef();
  const userGenderInput = useRef();
  const userNameInput = useRef();
  const phoneNumberInput = useRef();
  const nickNameInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkPassword = () => {
    if (registerPwInput.current.value.length < 8) {
      alert('비밀번호는 8글자 이상이어야 합니다.');
      return false;
    }
    if (registerPwInput.current.value !== registerPwCheckInput.current.value) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  const checkName = () => {
    if (/\d/.test(userNameInput.current.value)) {
      alert('이름에는 숫자가 들어갈 수 없습니다.');
      return false;
    }
    return true;
  };

  const checkPhoneNumber = () => {
    const phoneValue = phoneNumberInput.current.value;
    if (!/^\d{11}$/.test(phoneValue)) {
      alert('전화번호는 11자리 숫자여야 합니다.');
      return false;
    }
    return true;
  };

  const registerUser = async (e) => {
    e.preventDefault(); // 자동 새로고침 방지

    if (
      !registerIdInput.current.value ||
      !registerPwInput.current.value ||
      !registerPwCheckInput.current.value ||
      !phoneNumberInput.current.value ||
      !userNameInput.current.value ||
      !nickNameInput.current.value
    )
      return alert('값을 입력 하세요');

    if (!checkPassword()) {
      return;
    }

    if (!checkName()) {
      return;
    }

    if (!checkPhoneNumber()) {
      return;
    }

    try {
      const resRegister = await axios.post('/register', {
        id: registerIdInput.current.value,
        password: registerPwInput.current.value,
        gender: userGenderInput.current.value,
        name: userNameInput.current.value,
        phone: phoneNumberInput.current.value,
        nickName: nickNameInput.current.value,
      });
      if (resRegister.status === 200) {
        // 성공 했다. 라는 의미
        dispatch(
          login({
            id: registerIdInput.current.value,
            // password: registerPwInput.current.value,
            // gender: userGenderInput.current.value,
            // name: userNameInput.current.value,
            // phone: phoneNumberInput.current.value,
            // nickName: nickNameInput.current.value,
          }),
        );
        navigate('/');
        return alert(await resRegister.json());
      } else {
        return alert(await resRegister.json());
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="register">
        <div className="register-box">
          <div className="info-top">
            <p>기본정보</p>
            <p>
              <span className="required">*</span>필수입력사항
            </p>
          </div>
          <form className="register-form">
            <div className="id-info">
              <label>
                <span className="required">*</span>
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                ref={registerIdInput}
              />
            </div>
            <div className="password-info">
              <label>
                <span className="required">*</span>
                비밀번호
              </label>
              <input
                name="password"
                type="password"
                placeholder="영문/숫자 포함 8자 이상"
                ref={registerPwInput}
              />
            </div>
            <div className="password-info">
              <label>
                <span className="required">*</span>
                비밀번호 확인
              </label>
              <input
                name="passwordCheck"
                type="password"
                ref={registerPwCheckInput}
              />
            </div>
            <div className="name-info">
              <label>
                <span className="required">*</span>
                이름
              </label>
              <input id="nameInput" type="text" ref={userNameInput} />
            </div>
            <div className="gender-info">
              <label>
                <span className="required">*</span>
                성별
              </label>
              <div className="gender-input">
                <Select
                  options={genderOptions}
                  ref={userGenderInput}
                  placeholder="성별"
                />
              </div>
            </div>
            <div className="tel-info">
              <label>
                <span className="required">*</span>
                휴대폰
              </label>
              <input id="telInput" type="tel" ref={phoneNumberInput} />
            </div>

            <div className="nickName-info">
              <label>
                <span className="required">*</span>
                닉네임
              </label>
              <input
                id="nickInput"
                type="text"
                maxLength={8}
                ref={nickNameInput}
              />
            </div>
            <button className="cancel--btn btn">CANCEL</button>
            <button
              className="join--btn btn"
              type="submit"
              onClick={registerUser}
            >
              JOIN
            </button>
          </form>
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
