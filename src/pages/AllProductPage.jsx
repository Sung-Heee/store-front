import React, { useEffect, useState } from 'react';
import '../style/allProduct.scss';
import { showAllItems, showItems } from '../apis/item';
export default function AllProductPage() {
  const [allOpen, setAllOpen] = useState(false);
  const [manOpen, setManOpen] = useState(false);
  const [womanOpen, setWomanOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // 왼쪽 메뉴바
  const clickAll = () => {
    setAllOpen(!allOpen);
  };
  const clickMan = () => {
    setManOpen(!manOpen);
  };
  const clickWoman = () => {
    setWomanOpen(!womanOpen);
  };

  // 메인꺼 백에서 데이터 보내주면 아래꺼 쓰기
  const getItems = async () => {
    try {
      const resItems = await showAllItems();
      const itemsData = resItems.data;
      setItems(itemsData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  // // 백에서 item 데이터 가져오기
  // const getAllItems = async () => {
  //   try {
  //     const resItems = await showAllItems();
  //     const itemsData = resItems.data;
  //     setItems(itemsData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   getAllItems();
  // }, []);

  // 현재 페이지에 해당하는 아이템 반환
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  // 다음 페이지로
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // 이전 페이지로
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // 전체 페이지 수 계산
  // 16개까지 보이게 했으니 전체 나누기 16
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <>
      <div className="product_container">
        <div className="bottom_box">
          <div className="left_box">
            <div className="left_controller">
              <div className="product">
                <span>PRODUCT</span>
              </div>
              <p className="category" onClick={clickAll}>
                ALL
              </p>
              {allOpen && (
                <ul className={`option ${allOpen ? 'show' : 'hide'}`}>
                  <li>
                    <a href="#">상의</a>
                  </li>
                  <li>
                    <a href="#">하의</a>
                  </li>
                  <li>
                    <a href="#">신발</a>
                  </li>
                  <li>
                    <a href="#">악세사리</a>
                  </li>
                  <li>
                    <a href="#">기타</a>
                  </li>
                </ul>
              )}

              <p className="category" onClick={clickMan}>
                MAN
              </p>
              {manOpen && (
                <ul className={`option ${manOpen ? 'show' : 'hide'}`}>
                  <li>
                    <a href="#">상의</a>
                  </li>
                  <li>
                    <a href="#">하의</a>
                  </li>
                  <li>
                    <a href="#">신발</a>
                  </li>
                  <li>
                    <a href="#">악세사리</a>
                  </li>
                  <li>
                    <a href="#">기타</a>
                  </li>
                </ul>
              )}

              <p className="category" onClick={clickWoman}>
                WOMAN
              </p>
              {womanOpen && (
                <ul className={`option ${womanOpen ? 'show' : 'hide'}`}>
                  <li>
                    <a href="#">상의</a>
                  </li>
                  <li>
                    <a href="#">하의</a>
                  </li>
                  <li>
                    <a href="#">신발</a>
                  </li>
                  <li>
                    <a href="#">악세사리</a>
                  </li>
                  <li>
                    <a href="#">기타</a>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="right_box">
            <div className="right_controller">
              <div className="content">
                <div className="product_grid_container">
                  {getCurrentItems().map((item, index) => (
                    <div className="item" key={index}>
                      {item.itemTitle}
                      <br></br>
                      <br></br>
                      상품이미지 뜨게 할 거
                    </div>
                  ))}
                </div>
                <div className="pagination">
                  {currentPage > 1 && (
                    <button className="prevBtn" onClick={previousPage}>
                      이전
                    </button>
                  )}
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`pageNum ${
                        currentPage === index + 1 ? 'select' : ''
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button className="nextBtn" onClick={nextPage}>
                      다음
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
