import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { getLike } from '../../apis/mypage';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { getMain } from '../../apis/mypage';

export default function End({ totalEndItems }) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const getEndInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resEnd = await getMain(userId);
      const dbEndInfo = resEnd.data;

      const filteredEndItems = dbEndInfo.filter((item) => item.status === 1);

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredEndItems.slice(
        indexOfFirstItem,
        indexOfLastItem,
      );

      const renderedItems = currentItems.map((item) => (
        <tr key={item.itemId}>
          <td>{item.item_title}</td>
          <td>{item.item_date}</td>
          <td>{item.item_price}</td>
        </tr>
      ));

      setItems(renderedItems);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEndInfo();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="userStore_end">
        <div className="userStore_content">
          <div className="title">
            <p>판매완료</p>
            <div className="pagination">
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className="ing_prev_btn"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GoChevronLeft
                    style={{
                      stroke: '#f4f6ff',
                      strokeWidth: '1px',
                    }}
                  />
                </div>
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage * itemsPerPage >= totalEndItems}
                className="ing_next_btn"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GoChevronRight
                    style={{
                      stroke: '#f4f6ff',
                      strokeWidth: '1px',
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
          <table border={0}>
            <thead>
              <tr>
                <th>상품정보</th>
                <th>거래일자</th>
                <th>거래금액</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
