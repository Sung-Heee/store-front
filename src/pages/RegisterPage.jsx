import React, { useEffect, useRef, useState } from 'react';
import '../style/register.scss';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { EmailCheck, NickNameCheck, Register } from '../apis/user';
import CryptoJS, { SHA256 } from 'crypto-js';

export default function RegisterPage() {
  const [password, setPassword] = useState('');
  const [emailCheck, setEmailCheck] = useState();
  const [nickNameCheck, setNickNameCheck] = useState();

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

  // 비밀번호 체크 8자 이상 그리고 일치하는지
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

  // 이름에 한글만 입력 가능하게
  const checkName = () => {
    if (/\d/.test(userNameInput.current.value)) {
      alert('이름에는 숫자가 들어갈 수 없습니다.');
      return false;
    }
    return true;
  };

  // 전화번호 형식
  const checkPhoneNumber = () => {
    const phoneValue = phoneNumberInput.current.value;
    if (!/^\d{11}$/.test(phoneValue)) {
      alert('전화번호는 11자리 숫자여야 합니다.');
      return false;
    }
    return true;
  };

  // id 중복 확인.
  const checkEmail = async (e) => {
    e.preventDefault(); // 자동 새로고침 방지
    if (!registerIdInput.current.value) return alert('이메일을 입력 하세요');

    const email = {
      id: aes128Encode(
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_AES_SECRET_KEY,
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_AES_SECRET_IV,
        registerIdInput.current.value,
      ),
    };

    try {
      // '/checkEmail'로 post 요청
      const resCheckEmail = await EmailCheck(email);
      // 성공 : status 200 / 실패 : status 500
      console.log('백엔드에서 넘어온 데이터 : ', resCheckEmail.data);

      //성희 코드 <message 값을 먼저 지정해두기>
      const message = resCheckEmail.data.message;

      if (resCheckEmail.data.status === '200') {
        setEmailCheck('이메일확인');
        alert(message); // 사용 가능한 아이디
      } else {
        registerIdInput.current.value = '';
        setEmailCheck('이메일확인안함');
        return alert(message); // 실패. 사용 불가능한 아이디
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  // NickName 중복 확인.
  const checkNickName = async (e) => {
    console.log(password);
    e.preventDefault(); // 자동 새로고침 방지
    if (!nickNameInput.current.value) return alert('닉네임을 입력 하세요');

    const nickName = {
      nickName: nickNameInput.current.value,
    };

    try {
      const resCheckNickName = await NickNameCheck(nickName);

      // 어떤 데이터값이 넘어왔는지 확인
      console.log('백엔드에서 넘어온 데이터 : ', resCheckNickName.data);

      const message = resCheckNickName.data.message;

      if (resCheckNickName.data.status === '200') {
        setNickNameCheck('닉네임확인');
        alert(message); // 사용 가능한 닉네임
      } else {
        setNickNameCheck('닉네임확인안함');
        return alert(message); // 실패. 사용 불가능한 닉네임
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault(); // 자동 새로고침 방지

    if (
      !registerIdInput.current.value ||
      !registerPwInput.current.value ||
      !registerPwCheckInput.current.value ||
      !phoneNumberInput.current.value ||
      !userNameInput.current.value ||
      !nickNameInput.current.value ||
      !userGenderInput.current.props.value.value
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

    if (emailCheck !== '이메일확인') {
      alert('이메일 중복 체크를 확인해주세요.');
      return;
    }
    if (nickNameCheck !== '닉네임확인') {
      alert('닉네임 중복 체크를 확인해주세요.');
      return;
    }

    const userInfo = {
      id: aes128Encode(
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_EMAIL_AES_SECRET_KEY,
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_AES_SECRET_IV,
        registerIdInput.current.value,
      ),
      password: password,
      gender: userGenderInput.current.props.value.value,
      name: userNameInput.current.value,
      phone: phoneNumberInput.current.value,
      nickName: nickNameInput.current.value,
    };

    try {
      const resRegister = await Register(userInfo);

      const message = resRegister.data.message; // 객체에 있는 message
      if (resRegister.data.status === '200') {
        alert(message + `\n로그인을 진행해주세요.`);
        navigate('/login');
      } else {
        return alert(message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  // 이미 로그인 되어있으면 회원가입 페이지로 못 가게
  useEffect(() => {
    if (sessionStorage.getItem('userId') !== null) {
      navigate('/');
    }
  });

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
              <button onClick={checkEmail}>중복확인</button>
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
                onChange={onChangePwd}
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
              <button onClick={checkNickName}>중복확인</button>
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
