import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../components/myPage/SideBar';
import '../style/myPage.scss';
import { getUser } from '../apis/user';
import Select from 'react-select';

export default function MyPage() {
  const [userName, setUserName] = useState();

  const getUserInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resUser = await getUser(userId);
      const dbUserInfo = resUser.data; // 조회된 사용자 정보 반환
      setUserName(dbUserInfo.userInfo.userName);
      // console.log(dbUserInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const genderOptions = [
    { value: '남성', label: '남성' },
    { value: '여성', label: '여성' },
  ];
  return (
    <>
      <div className="all_content">
        <div className="top_box">
          <div className="top_left">
            <div className="img_box"></div>
          </div>
          <div className="top_right">
            <div className="member_name">
              <strong>
                <span className="m_name">{userName}</span>님
              </strong>
            </div>
            <ul className="order">
              <li>
                <li>판매 중</li>
                <strong>
                  <li>0</li>
                </strong>
              </li>
              <li>
                <li>판매 완료</li>
                <strong>
                  <li>0</li>
                </strong>
              </li>
              <li>
                <li>관심 상품</li>
                <strong>
                  <li>0</li>
                </strong>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom_box">
          <div className="left_box">
            <div className="left_controller">
              <div className="my_page">
                <span>MY PAGE</span>
              </div>

              <ul className="first_ul">
                <li className="first_li">나의 거래 정보</li>
                <li>
                  <a href="#">거래내역</a>
                </li>
                <li>
                  <a href="#">관심상품</a>
                </li>
              </ul>
              <ul>
                <li className="first_li">회원정보</li>
                <li>
                  <a href="#">회원 정보 수정</a>
                </li>
              </ul>
              <ul>
                <li className="first_li">고객센터</li>
                <li>
                  <a href="#">1:1 문의</a>
                </li>
                <li>
                  <a href="#">공지사항</a>
                </li>
                <li>
                  <a href="#">이용안내</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="right_box">
            <div className="right_controller">
              <div className="main_content off">
                <div className="content">
                  <div className="title">최근 거래상품</div>
                  {/* <p className="msg">최근 거래 내역이 없습니다</p> */}
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div className="content">
                  <div className="title">관심상품</div>
                  <p className="msg">관심상품이 없습니다</p>
                </div>
                <div className="content">
                  <div className="title">판매 중</div>
                  <p className="msg">판매 중인 상품이 없습니다</p>
                </div>
                <div className="content">
                  <div className="title">판매 완료</div>
                  <p className="msg">판매 완료된 상품이 없습니다</p>
                </div>
              </div>
              <div className="transaction">
                <div className="content">
                  <div className="title">거래 내역 조회</div>
                  <table border={0}>
                    <thead>
                      <th colSpan="2">상품정보</th>
                      <th>거래일자</th>
                      <th>거래금액</th>
                      <th>위치</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>img</td>
                        <td>내용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>위치</td>
                      </tr>
                      <tr>
                        <td>img</td>
                        <td>내용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>위치</td>
                      </tr>
                      <tr>
                        <td>img</td>
                        <td>내용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>위치</td>
                      </tr>
                      <tr>
                        <td>img</td>
                        <td>내용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>위치</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="ing">
                <div className="content">
                  <ul className="tab">
                    <li className='sale'>판매중</li>
                    <li className='sale'>판매완료</li>
                  </ul>
                </div>
              </div>
              <div className="like off">
                <div className="content">
                  <div className="title">관심상품</div>
                  <table border={0}>
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox"></input>
                        </th>
                        <th colSpan="2">상품정보</th>
                        <th>거래일자</th>
                        <th>거래금액</th>
                        <th>위치</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>img</td>
                        <td>내용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>위치</td>
                      </tr>
                      <tr>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>img</td>
                        <td>내s용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>위치</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="register off">
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
                      />
                    </div>
                    <div className="password-info">
                      <label>
                        <span className="required">*</span>새 비밀번호 확인
                      </label>
                      <input name="passwordCheck" type="password" />
                    </div>
                    <div className="name-info">
                      <label>
                        <span className="required">*</span>
                        이름
                      </label>
                      <input id="nameInput" type="text" />
                    </div>
                    <div className="gender-info">
                      <label>
                        <span className="required">*</span>
                        성별
                      </label>
                      <div className="gender-input">
                        <Select options={genderOptions} placeholder="성별" />
                      </div>
                    </div>
                    <div className="tel-info">
                      <label>
                        <span className="required">*</span>
                        휴대폰
                      </label>
                      <input id="telInput" type="tel" />
                    </div>

                    <div className="nickName-info">
                      <label>
                        <span className="required">*</span>
                        닉네임
                      </label>
                      <input id="nickInput" type="text" maxLength={8} />
                    </div>
                    <button className="cancel--btn btn">CANCEL</button>
                    <button className="join--btn btn" type="submit">
                      확인
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
