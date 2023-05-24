import React from 'react';
import SideBar from '../components/myPage/SideBar';
import '../style/myPage.scss';
import circle from '../img/circle.png';
import pink from '../img/pink.png';
export default function MyPage() {
  return (
    <>
      {/* <SideBar /> */}
      <div className="mypage_topbox">
        <div className="mypage_topleft">
          <div className="circle_img">
            <img src={circle} alt="circle" />
          </div>
        </div>
        <div className="mypage_topright">
          <div>
            <div>
              <div className="member_name">
                <strong>
                  <span>
                    <span className="m_name">김정혁</span>
                  </span>
                  님
                </strong>
                <span className="group">
                  <img src={pink} alt="pink 로고" />
                </span>
              </div>
            </div>
          </div>
          <div className="mypage_order">
            <ul className="order">
              <li>
                <strong>주문내역</strong>
                <a href="#" className="count">
                  <span className="order_count">0</span>
                </a>
              </li>
              <li>
                <strong>취소/교환/반품</strong>
                <a href="#" className="count">
                  <span className="order_count">0/0/0</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
