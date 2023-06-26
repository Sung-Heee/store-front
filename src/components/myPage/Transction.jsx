import React, { useState, useEffect } from 'react';
import { getMain } from '../../apis/mypage';

export default function Transction() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getItemInfo = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const resItem = await getMain(userId);
      const dbresItemInfo = resItem.data;

      const itemsPerPage = 4;
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      let filteredItems = dbresItemInfo;

      if (selectedStatus !== 'all') {
        filteredItems = dbresItemInfo.filter(
          (item) => item.item_status === (selectedStatus === 'selling' ? 0 : 1),
        );
      }

      const itemsToShow = filteredItems.slice(startIndex, endIndex);

      const renderedItems = itemsToShow.map((item) => (
        <tr key={item.itemId}>
          <td>{item.item_title}</td>
          <td>{item.item_content}</td>
          <td>{item.item_price}</td>
          <td>{item.item_status === 0 ? '판매중' : '판매완료'}</td>
        </tr>
      ));

      setItems(renderedItems);
      setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
    } catch (error) {
      console.log(items);
    }
  };

  useEffect(() => {
    getItemInfo();
  }, [currentPage, selectedStatus]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(0);
  };

  const PageNumbers = () => {
    const numbers = [];
    for (let i = 0; i < totalPages; i++) {
      numbers.push(
        <p
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </p>,
      );
    }
    return <div className="page-numbers">{numbers}</div>;
  };

  return (
    <>
      <div className="transaction">
        <div className="content">
          {items.length > 0 ? (
            <table border={0}>
              <thead>
                <tr>
                  <th>상품정보</th>
                  <th>거래일자</th>
                  <th>거래금액</th>
                  <th>
                    <select
                      value={selectedStatus}
                      onChange={handleStatusChange}
                    >
                      <option value="all">상태</option>
                      <option value="selling">판매중</option>
                      <option value="sold">판매완료</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          ) : (
            <p className="msg">거래 내역이 없습니다</p>
          )}
          {items.length > 0 && <PageNumbers />}
        </div>
      </div>
    </>
  );
}

// export default function Transction() {
//   const [items, setItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [selectedStatus, setSelectedStatus] = useState('all');

//   const itemsPerPage = 4;

//   const getItemInfo = async () => {
//     try {
//       const userId = sessionStorage.getItem('userId');
//       const resItem = await getMain(userId);
//       const dbresItemInfo = resItem.data;

//       let filteredItems = dbresItemInfo;
//       if (selectedStatus !== 'all') {
//         filteredItems = dbresItemInfo.filter(
//           (item) => item.item_status === (selectedStatus === 'selling' ? 0 : 1),
//         );
//       }

//       setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));

//       const startIndex = currentPage * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;
//       const itemsToShow = filteredItems.slice(startIndex, endIndex);

//       const renderedItems = itemsToShow.map((item) => (
//         <tr key={item.itemId}>
//           <td>{item.item_title}</td>
//           <td>{item.item_content}</td>
//           <td>{item.item_price}</td>
//           <td>{item.item_status === 0 ? '판매중' : '판매완료'}</td>
//         </tr>
//       ));

//       setItems(renderedItems);
//     } catch (error) {
//       console.log(items);
//     }
//   };

//   useEffect(() => {
//     getItemInfo();
//   }, [currentPage, selectedStatus]);

//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//     setCurrentPage(0);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <div className="transaction">
//         <div className="content">
//           <div className="status-select">
//             <select value={selectedStatus} onChange={handleStatusChange}>
//               <option value="all">상태</option>
//               <option value="selling">판매중</option>
//               <option value="sold">판매완료</option>
//             </select>
//           </div>
//           {items.length > 0 ? (
//             <table border={0}>
//               <thead>
//                 <tr>
//                   <th>상품정보</th>
//                   <th>거래일자</th>
//                   <th>거래금액</th>
//                   <th>상태</th>
//                 </tr>
//               </thead>
//               <tbody>{items}</tbody>
//             </table>
//           ) : (
//             <p className="msg">거래 내역이 없습니다</p>
//           )}
//           {items.length > 0 && (
//             <div className="button">
//               <button
//                 className="btn"
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 0}
//               >
//                 이전
//               </button>
//               <button
//                 className="btn"
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages - 1}
//               >
//                 다음
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
