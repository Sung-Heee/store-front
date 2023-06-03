import React from 'react';

export default function Transction() {
  return (
    <>
      <div className="transaction">
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
    </>
  );
}
