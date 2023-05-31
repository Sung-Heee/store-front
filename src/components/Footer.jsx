import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../style/_footer.scss';
import { Link } from 'react-router-dom';

export default function Footer() {
  // const [testing, setTesting] = useState([]);

  // const showName = async () => {
  //   console.log('sd');
  //   try {
  //     const resShowName = await axios.get('/api/test');
  //     console.log(resShowName.data);
  //   } catch (error) {
  //     console.error(error);
  //     console.log('testing 실패');
  //   }
  // };

  // useEffect(() => {
  //   showName();
  // }, []);
  // 이거 지워도돼?

  return (
    <>
      <div className="footer_container">
        <div className="footer_center">
          <div className="left_footer">
            <p>(주) reused</p>
            <p>주식회사 reused(reused Store Co.)</p>
            <p>
              © Copyright.2023 | 김정혁 · 송민영 · 이유림 · 이찬호 · 조성희 ·
              최인영
            </p>
            <p>소재지 : 서울특별시 OO구 OO대로 OO길</p>
          </div>
          <div className="right_footer">
            <p>고객센터 0000-0000</p>
            <p>
              운영시간 평일 9:00 - 18:00 (주말, 공휴일 휴무)
              <br />
              점심시간 평일 12:00 - 13:00
            </p>
            <p>1:1 문의하기는 앱에서만 가능합니다.</p>
            <Link to="/faq" className="faq_move">
              <p>자주묻는질문</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
