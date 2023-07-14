import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/userStore/statusChangeModal.scss';

export default function StatusChangeModal() {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [userID, setUserID] = useState([]);

  const getIdInfo = async () => {
    try {
      const resUserId = await axios.get('/user/userInfo', {
        params: {
          userId: sessionStorage.getItem('userId'),
        },
      });
      const dbUserIdInfo = resUserId.data;
      setUserID(dbUserIdInfo.map((userInfo) => userInfo.user_email));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIdInfo();
  }, []);

  const handleCheckboxChange = (value) => {
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes((prevCheckboxes) =>
        prevCheckboxes.filter((checkbox) => checkbox !== value),
      );
    } else {
      setSelectedCheckboxes((prevCheckboxes) => [...prevCheckboxes, value]);
    }
  };

  return (
    <>
      <div className="modal_container">
        <div className="chat_id_list">
          <p>구매자 선택</p>
          {Array.isArray(userID) ? (
            userID.map((user, index) => (
              <React.Fragment key={index}>
                <input
                  id={`checkbox_${index}`}
                  type="checkbox"
                  value={user}
                  checked={selectedCheckboxes.includes(user)}
                  onChange={() => handleCheckboxChange(user)}
                />
                <label
                  htmlFor={`checkbox_${index}`}
                  className={
                    selectedCheckboxes.includes(user)
                      ? 'state_checked_checkbox'
                      : ''
                  }
                >
                  {user}
                </label>
              </React.Fragment>
            ))
          ) : (
            <React.Fragment>
              <input
                id="checkbox_0"
                type="checkbox"
                value={userID}
                checked={selectedCheckboxes.includes(userID)}
                onChange={() => handleCheckboxChange(userID)}
              />
              <label
                htmlFor="checkbox_0"
                className={
                  selectedCheckboxes.includes(userID)
                    ? 'state_checked_checkbox'
                    : ''
                }
              >
                {userID}
              </label>
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
}

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// export default function StatusChangeModal() {
//   const [selectedCheckbox, setSelectedCheckbox] = useState('구매자선택');

//   const [userID, setUserID] = useState();

//   const getIdInfo = async () => {
//     try {
//       const resUserId = await axios.get('/user/userInfo', {
//         params: {
//           userId: sessionStorage.getItem('userId'),
//         },
//       });
//       const dbUserIdInfo = resUserId.data;
//       setUserID(dbUserIdInfo[0].user_email);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getIdInfo();
//   }, []);

//   //중복체크 방지
//   const handleCheckboxChange = (value) => {
//     setSelectedCheckbox(value);
//   };

//   return (
//     <>
//       <div className="modal_container">
//         <div className="chat_id_list">
//           <p>구매자 선택</p>
//           <input
//             id="checkbox_used"
//             type="checkbox"
//             value="구매자선택"
//             checked={selectedCheckbox === '구매자선택'}
//             onChange={() => handleCheckboxChange('구매자선택')}
//           />
//           <label
//             htmlFor="checkbox_used"
//             className={
//               selectedCheckbox === '구매자선택' ? 'state_checked_checkbox' : ''
//             }
//           >
//             {userID}
//           </label>
//           <input
//             id="checkbox_used"
//             type="checkbox"
//             value="used"
//             checked={selectedCheckbox === '구매자선택'}
//             onChange={() => handleCheckboxChange('구매자선택')}
//           />
//           <label
//             htmlFor="checkbox_used"
//             className={
//               selectedCheckbox === '구매자선택' ? 'state_checked_checkbox' : ''
//             }
//           >
//             {userID}
//           </label>
//           <input
//             id="checkbox_used"
//             type="checkbox"
//             value="used"
//             checked={selectedCheckbox === '구매자선택'}
//             onChange={() => handleCheckboxChange('구매자선택')}
//           />
//           <label
//             htmlFor="checkbox_used"
//             className={
//               selectedCheckbox === '구매자선택' ? 'state_checked_checkbox' : ''
//             }
//           >
//             {userID}
//           </label>
//           <input
//             id="checkbox_used"
//             type="checkbox"
//             value="used"
//             checked={selectedCheckbox === '구매자선택'}
//             onChange={() => handleCheckboxChange('구매자선택')}
//           />
//           <label
//             htmlFor="checkbox_used"
//             className={
//               selectedCheckbox === '구매자선택' ? 'state_checked_checkbox' : ''
//             }
//           >
//             {userID}
//           </label>
//         </div>
//       </div>
//     </>
//   );
// }
