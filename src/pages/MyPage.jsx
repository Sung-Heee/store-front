import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../components/myPage/SideBar';
import '../style/myPage.scss';
import axios from 'axios';
import { getUser } from '../apis/user';

export default function MyPage() {
  const [userName, setUserName] = useState();

  const getUserInfo = async () => {
    try {
      const userId = localStorage.getItem('userId');
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
                <li>주문내역</li>
                <strong>
                  <li>0</li>
                </strong>
              </li>
              <li>
                <li>취소</li>
                <strong>
                  <li>0</li>
                </strong>
              </li>
              <li>
                <li>교환</li>
                <strong>
                  <li>0</li>
                </strong>
              </li>
              <li>
                <li>반품</li>
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
                  <a href="#">거래 내역</a>
                </li>
                <li>
                  <a href="#">관심 상품</a>
                </li>
                <li>
                  <a href="#">거래 중</a>
                </li>
                <li>
                  <a href="#">거래 완료</a>
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
              <div className="content">
                <div className="title">최근 거래상품</div>
                {/* <p className="msg">최근 거래 내역이 없습니다</p> */}
                <ul>
                  <li></li>
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
                <div className="title">거래중</div>
                <p className="msg">거래중인 상품이 없습니다</p>
              </div>
              <div className="content">
                <div className="title">거래 완료</div>
                <p className="msg">거래 완료된 상품이 없습니다</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
