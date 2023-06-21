import React, { useState, useEffect } from 'react';
import { getMain } from '../../apis/mypage';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

export default function Transction() {
  const [items, setItems] = useState([]);
  // 현재 페이지 번호를 저장
  const [currentPage, setCurrentPage] = useState(0);
  // 전체 페이지 수를 저장
  const [totalPages, setTotalPages] = useState(0);

  const getItemInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resItem = await getMain(userId);
      const dbresItemInfo = resItem.data;

      // console.log(dbresItemInfo[0].item_status);

      //처음 보여줄 li
      const itemsPerPage = 4;
      // 현재 페이지의 시작 인덱스
      // 시작할 떄 currentPage는 0이여서 0*4 = 0 그래서 0부터 시작
      const startIndex = currentPage * itemsPerPage;
      // 현재 페이지의 끝 인덱스
      const endIndex = startIndex + itemsPerPage;
      // 현재 페이지에 표시할 항목들 0~4까지 slice
      const itemsToShow = dbresItemInfo.slice(startIndex, endIndex);

      const items = itemsToShow.map((item) => (
        <tr key={item.itemId}>
          <td>{item.item_title}</td>
          <td>{item.item_content}</td>
          <td>{item.item_price}</td>
          <td>{item.item_status === 0 ? '판매중' : '판매완료'}</td>
        </tr>
      ));
      setItems(items);
      console.log(items);
      setTotalPages(Math.ceil(dbresItemInfo.length / itemsPerPage));
    } catch (error) {
      // console.error(error);
      console.log(items);
    }
  };
  useEffect(() => {
    getItemInfo();
  }, [currentPage]);

  // 다음 버튼 눌렀을 때 다음 li보여주게(5번째)
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  // 이전 버튼
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      <div className="transaction">
        <div className="content">
          <div className="title">거래 내역 조회</div>
          {items.length > 0 ? (
            <table border={0}>
              <thead>
                <tr>
                  <th>상품정보</th>
                  <th>거래일자</th>
                  <th>거래금액</th>
                  <th>
                    <select>
                      <option defaultValue>상태</option>
                      <option>판매중</option>
                      <option>판매완료</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          ) : (
            <p className="msg">거래 내역이 없습니다</p>
          )}
          {items.length > 0 && (
            <div className="button">
              <GoChevronLeft
                size={50}
                className="btn"
                onClick={handlePreviousPage}
              />
              <GoChevronRight
                size={50}
                className="btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
