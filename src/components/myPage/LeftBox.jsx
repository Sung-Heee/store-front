import React from 'react';

export default function LeftBox() {
  return (
    <>
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
    </>
  );
}
