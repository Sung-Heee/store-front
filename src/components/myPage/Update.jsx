import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import '../../style/mypage/update.scss';
import { getUser } from '../../apis/user';
import { update } from '../../apis/mypage';
import { useNavigate } from 'react-router-dom';

export default function Update() {
  const genderOptions = [
    { value: '남성', label: '남성' },
    { value: '여성', label: '여성' },
  ];
  const [userID, setUserID] = useState();

  const [newPw, setNewPw] = useState('');
  const [newGender, setNewGender] = useState('');
  const [newName, setNewName] = useState();
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newNickName, setNewNickName] = useState('');

  const pwCheckInput = useRef();

  const navigate = useNavigate();

  const getIdInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resUserId = await getUser(userId);
      const dbUserIdInfo = resUserId.data;
      setUserID(dbUserIdInfo[0].user_email);
      // console.log(dbUserIdInfo[0].user_email);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePwChange = (e) => {
    setNewPw(e.target.value);
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleGenderChange = (e) => {
    setNewGender(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setNewPhoneNumber(e.target.value);
  };
  const handleNickNameChange = (e) => {
    setNewNickName(e.target.value);
  };

  const updateUser = async () => {
    const userId = sessionStorage.getItem('userId');
    try {
      const userInfo = {
        password: newPw,
        gender: newGender,
        name: newName,
        phone: newPhoneNumber,
        nickName: newNickName,
      };
      const resUpdate = await update(userId, userInfo);
      const dbUpdateInfo = resUpdate.data;

      const message = resUpdate.data.message; // 객체에 있는 message
      if (resUpdate.data.status === '200') {
        alert(message + `\n로그인을 진행해주세요.`);
        navigate('/update');
        console.log(dbUpdateInfo);
      } else {
        return alert(message);
      }
    } catch (error) {
      // console.log(userInfo);
      console.error(error);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    getIdInfo();
  }, []);
  return (
    <>
      <div className="update">
        <div className="content">
          <div className="title">
            <p>기본정보</p>
            <p className="please">
              <span className="required">*</span>
              <p>필수입력사항</p>
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
                    value={newPw}
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
                    value={newName}
                    onChange={handleNameChange}
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
                      placeholder="성별"
                      value={newGender}
                      onChange={handleGenderChange}
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
                    value={newPhoneNumber}
                    onChange={handlePhoneNumber}
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
                  <input
                    id="nickInput"
                    type="text"
                    maxLength={8}
                    value={newNickName}
                    onChange={handleNickNameChange}
                  />
                  <button>중복확인</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button_controller">
            <div className="update_button">
              <a className="white_button">취소</a>
              <a className="gray_button" type="submit" onClick={updateUser}>
                확인
              </a>
            </div>
            <a className="white_button end">회원 탈퇴</a>
          </div>
        </div>
      </div>
    </>
  );
}
