import React from 'react';

export default function Like() {
  return (
    <>
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
    </>
  );
}
