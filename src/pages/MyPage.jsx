import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../components/myPage/SideBar';
import '../style/myPage.scss';
import { getUser } from '../apis/user';
import Select from 'react-select';
import MainContent from '../components/myPage/MainContent';

export default function MyPage() {
  const [userName, setUserName] = useState();

  const getUserInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resUser = await getUser(userId);
      const dbUserInfo = resUser.data; // 조회된 사용자 정보 반환
      setUserName(dbUserInfo.userInfo.userName);
      console.log(dbUserInfo);
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
              {/*<div className="main_content off">
                <div className="content">
                  <div className="title">최근 거래상품</div>
                  {/* <p className="msg">최근 거래 내역이 없습니다</p> 
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
              </div>*/}
              <MainContent className="off" />
              <div className="transaction off">
                <div className="content">
                  <div className="title">거래 내역 조회</div>
                  <table border={0}>
                    <thead>
                      <th>상품정보</th>
                      <th>거래일자</th>
                      <th>거래금액</th>
                      <th>
                        <select>
                          <option selected>상태</option>
                          <option>판매중</option>
                          <option>판매완료</option>
                        </select>
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>내용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>판매중</td>
                      </tr>
                      <tr>
                        <td>내용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>판매완료</td>
                      </tr>
                      <tr>
                        <td>내용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>판매중</td>
                      </tr>
                      <tr>
                        <td>내용</td>
                        <td>날자</td>
                        <td>금액</td>
                        <td>판매중</td>
                      </tr>
                    </tbody>
                  </table>
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
                        <th>상품정보</th>
                        <th>거래일자</th>
                        <th>거래금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>제목</td>
                        <td>날자</td>
                        <td>금액</td>
                      </tr>
                      <tr>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>제목</td>
                        <td>날자</td>
                        <td>금액</td>
                      </tr>
                      <tr>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>제목</td>
                        <td>날자</td>
                        <td>금액</td>
                      </tr>
                      <tr>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>제목</td>
                        <td>날자</td>
                        <td>금액</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="update ">
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
                            <Select
                              options={genderOptions}
                              placeholder="성별"
                            />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
