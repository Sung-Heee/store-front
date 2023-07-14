import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { getLike } from '../../apis/mypage';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { getMain } from '../../apis/mypage';

export default function Ing() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState(0);

  const getIngInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resIng = await getMain(userId);
      const dbIngInfo = resIng.data;
      console.log(dbIngInfo);

      const filteredItems = dbIngInfo.filter((item) => item.status === 0);
      setTotalItems(filteredItems.length);

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredItems.slice(
        indexOfFirstItem,
        indexOfLastItem,
      );

      const renderedItems = currentItems.map((item) => (
        <tr key={item.itemId}>
          <td>{item.item_title}</td>
          <td>{item.item_name}</td>
          <td>{item.item_price}</td>
          <td>
            <p className="ing_change_btn">완료</p>
          </td>
        </tr>
      ));

      setItems(renderedItems);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getIngInfo();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="userStore_ing">
        <div className="userStore_content">
          <div className="title">
            <p>판매중</p>
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
                disabled={currentPage * itemsPerPage >= totalItems}
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
                <th>제목 </th>
                <th>상품명</th>
                <th>거래금액</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
