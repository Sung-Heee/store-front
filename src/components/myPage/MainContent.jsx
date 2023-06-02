import React from 'react';

export default function MainContent() {
  return (
    <>
      <div className="main_content off">
        <div className="content">
          <div className="title">최근 거래상품</div>
          {/* {/* <p className="msg">최근 거래 내역이 없습니다</p>  */}
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
    </>
  );
}
