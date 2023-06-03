import React from 'react';
import Select from 'react-select';

export default function Update() {
  const genderOptions = [
    { value: '남성', label: '남성' },
    { value: '여성', label: '여성' },
  ];
  return (
    <>
      <div className="update off">
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
                <td>아이디</td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    비밀번호
                  </label>
                </th>
                <td>
                  <input
                    name="password"
                    type="password"
                    placeholder="영문/숫자 포함 8자 이상"
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>새 비밀번호 확인
                  </label>
                </th>
                <td>
                  <input name="passwordCheck" type="password" />
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    이름
                  </label>
                </th>
                <td>
                  <input id="nameInput" type="text" />
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    성별
                  </label>
                </th>
                <td>
                  <div className="gender-input">
                    <Select options={genderOptions} placeholder="성별" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    휴대폰
                  </label>
                </th>
                <td>
                  <input id="telInput" type="tel" />
                </td>
              </tr>
              <tr>
                <th>
                  <label>
                    <span className="required">*</span>
                    닉네임
                  </label>
                </th>
                <td>
                  <input id="nickInput" type="text" maxLength={8} />
                  <button>중복확인</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
