import axios from 'axios';

// 처음화면 최근 거래 상품
// export const getMain = async (userId) => {
//   try {
//     const resItem = await axios.get(`/new/${userId}`);
//     return resItem;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getMain = async (userId) => {
  try {
    const resItem = await axios.get('/item', {
      params: {
        userId: userId,
      },
    });
    return resItem;
  } catch (err) {
    console.error(err);
  }
};

// 처음 화면 관심상품
// export const getMainLike = async (userId) => {
//     try {
//       const resItem = await axios.get(`/mainlike/${userId}`);
//       return resItem;
//     } catch (err) {
//       console.error(err);
//     }
//   };

export const getMainLike = async (userId) => {
  try {
    const resItem = await axios.get('/mainlike', {
      params: {
        userId: userId,
      },
    });
    return resItem;
  } catch (err) {
    console.error(err);
  }
};

// 마이페이지 거래내역
// export const getItem = async (userId) => {
//   try {
//     const resItem = await axios.get(`/item/${userId}`);
//     return resItem;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getItem = async (userId) => {
  try {
    const resItem = await axios.get('/itemn', {
      params: {
        userId: userId,
      },
    });
    return resItem;
  } catch (err) {
    console.error(err);
  }
};
// 마이페이지 찜하기
// export const getLike = async (userId) => {
//   try {
//     const resLike = await axios.get(`/like/${userId}`);
//     return resLike;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getLike = async (userId) => {
  try {
    const resLike = await axios.get('/like', {
      params: {
        userId: userId,
      },
    });
    return resLike;
  } catch (err) {
    console.error(err);
  }
};

//회원 정보 수정
export const update = async (userId, userInfo) => {
  try {
    const resUpdate = await axios.post(`/update`, {
      id: userId,
      userInfo: userInfo,
    });
    return resUpdate.data; // 응답의 데이터만 반환
  } catch (error) {
    // console.log(userId);
    // console.log(userInfo);
    // console.log(error);
    throw new Error('업데이트 요청을 처리하는 동안 오류가 발생했습니다.'); // 예외 처리
  }
};

// 회원 탈퇴
export const Withdrawal = async (userId) => {
  try {
    const resUpdate = await axios.post(`/withdrawal`, {
      id: userId,
    });
    return resUpdate.data; // 응답의 데이터만 반환
  } catch (error) {
    throw new Error('업데이트 요청을 처리하는 동안 오류가 발생했습니다.'); // 예외 처리
  }
};

// 프로필 사진
export const Profile = async (userId, formData) => {
  try {
    const resUpdate = await axios.post(`/profile`, {
      id: userId,
      userImg: formData,
    });

    console.log(`성공    ` + userId);
    console.log(`성공    ` + formData);
    return resUpdate.data; // 응답의 데이터만 반환
  } catch (error) {
    console.log(`실패    ` + userId);
    console.log(`실패    ` + formData);
    throw new Error('업데이트 요청을 처리하는 동안 오류가 발생했습니다.'); // 예외 처리
  }
};
