import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import '../../style/mypage/update.scss';
import { NickNameCheck } from '../../apis/user';
import { Withdrawal, update } from '../../apis/mypage';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS, { SHA256 } from 'crypto-js';
import axios from 'axios';

export default function Update() {
  const genderOptions = [
    { value: '남성', label: '남성' },
    { value: '여성', label: '여성' },
  ];
  const [userID, setUserID] = useState();
  const [password, setPassword] = useState(''); // 실제 비밀번호 입력값
  const [newPw, setNewPw] = useState(''); // 암호화된 비밀번호
  const newPwInput = useRef();
  const [newGender, setNewGender] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [nickName, setNickName] = useState('');

  // 미리 보여줄 데이터
  const [prePw, setPrePw] = useState();
  const [preName, setPreName] = useState();
  const [preGender, setPreGender] = useState();
  const [prePhoneNumber, setPhoneNumber] = useState();
  const [preNickName, setPreNickName] = useState();

  const [nickNameCheck, setNickNameCheck] = useState();

  const pwCheckInput = useRef();
  const nickNameInput = useRef();

  const navigate = useNavigate();

  const getIdInfo = async () => {
    try {
      const resUserId = await axios.get('/user/userInfo', {
        params: {
          userId: sessionStorage.getItem('userId'),
        },
      });
      const dbUserIdInfo = resUserId.data;
      setUserID(dbUserIdInfo[0].user_email);
      setPreName(dbUserIdInfo[0].user_name);
      setPreGender(dbUserIdInfo[0].user_gender);
      setPhoneNumber(dbUserIdInfo[0].user_phone);
      setPreNickName(dbUserIdInfo[0].user_nickname);
      setPrePw(dbUserIdInfo[0].user_pw);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIdInfo();
  }, []);

  // 비밀번호 암호화
  const handlePwChange = (e) => {
    setPassword(e.target.value); // 실제 비밀번호 값 설정

    setNewPw(
      SHA256(
        e.target.value,
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_PASSWORD_SHA_SECRET_KEY,
      ).toString(),
    );
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setNewGender(e.value);
  };

  const handlePhoneNumber = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  // 수정되는 데이터
  const updateUser = async () => {
    const userId = sessionStorage.getItem('userId');

    try {
      const userInfo = {
        password: newPw == '' ? prePw : newPw,
        gender: newGender == '' ? preGender : newGender,
        name: newName == '' ? preName : newName,
        phone: newPhoneNumber == '' ? prePhoneNumber : newPhoneNumber,
        nickName: nickName == '' ? preNickName : nickName,
      };
      const resUpdate = await update(userId, userInfo);
      const dbUpdateInfo = resUpdate.data;

      const message = resUpdate.message; // 객체에 있는 message

      // console.log(resUpdate.status);

      if (resUpdate.status === '200') {
        alert(message);
        window.location.reload();
        // navigate('/update');
        console.log('수정');
      } else {
        return alert(message);
      }
    } catch (error) {
      // console.log(userInfo);
      console.error(error);
    }
  };

  // NickName 중복 확인.
  const checkNickName = async (e) => {
    e.preventDefault(); // 자동 새로고침 방지

    const nickName = {
      nickName: nickNameInput.current.value,
    };

    try {
      const resCheckNickName = await NickNameCheck(nickName);
      console.log(resCheckNickName);

      // 어떤 데이터값이 넘어왔는지 확인
      console.log('백엔드에서 넘어온 데이터 : ', resCheckNickName.data);

      const message = resCheckNickName.data.message;
      console.log(message);
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

  // 취소버튼
  const handleCancel = () => {
    const isConfirmed = window.confirm('회원 정보 수정을 취소하시겠습니까?');

    if (isConfirmed) {
      // 이전 데이터를 유지
      setNewPw('');
      setNewName('');
      setNewGender('');
      setNewPhoneNumber('');
      setNickName('');

      window.location.reload();
    }
  };

  // 회원탈퇴
  const handleWd = async () => {
    const isConfirmed = window.confirm('회원 탈퇴 하시겠습니까?');
    try {
      if (isConfirmed) {
        const userId = sessionStorage.getItem('userId');
        const resUserId = await Withdrawal(userId);

        alert('탈퇴 되셨습니다');
        window.location.reload();
        console.log(resUserId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="update">
        <div className="content">
          <div className="title">
            <p>기본정보</p>
            <p className="please">
              <span className="required star">*</span>
              <p className="write">필수입력사항</p>
            </p>
          </div>
          <table className="update_form">
            <tbody>
              <tr>
                <th>이메일</th>
                <td>{userID}</td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    <p>비밀번호</p>
                  </label>
                </th>
                <td>
                  <input
                    name="password"
                    type="password"
                    placeholder="영문/숫자 포함 8자 이상"
                    // value={password}
                    ref={newPwInput}
                    onChange={handlePwChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    <p>새 비밀번호 확인</p>
                  </label>
                </th>
                <td>
                  <input
                    name="passwordCheck"
                    type="password"
                    ref={pwCheckInput}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    <p>이름</p>
                  </label>
                </th>
                <td>
                  <input
                    id="nameInput"
                    type="text"
                    // value={newName}
                    onChange={handleNameChange}
                    placeholder={preName}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    <p>성별</p>
                  </label>
                </th>
                <td>
                  <div className="gender-input">
                    <Select
                      options={genderOptions}
                      value={genderOptions.find(
                        (option) => option.value === newGender,
                      )}
                      onChange={handleGenderChange}
                      placeholder={preGender}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    <p>휴대폰</p>
                  </label>
                </th>
                <td>
                  <input
                    id="telInput"
                    type="tel"
                    // value={newPhoneNumber}
                    onChange={handlePhoneNumber}
                    placeholder={prePhoneNumber}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    <p>닉네임</p>
                  </label>
                </th>
                <td>
                  <div className="nickname">
                    <input
                      id="nickInput"
                      type="text"
                      maxLength={8}
                      ref={nickNameInput}
                      onChange={handleNickNameChange}
                      placeholder={preNickName}
                    />
                    <button onClick={checkNickName}>중복확인</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button_controller">
            <div className="update_button">
              <a className="white_button" onClick={handleCancel}>
                취소
              </a>
              <a className="gray_button" onClick={updateUser}>
                확인
              </a>
            </div>
            <a className="white_button end" onClick={handleWd}>
              회원 탈퇴
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
