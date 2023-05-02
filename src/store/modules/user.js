//초기 상태
const initState = {
  userID: '',
  userPW: '',
  isLogin: false,
  reduxrender: true,
};

//액션 타입 설정
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';
const RENDER = 'user/RENDER';

//액션 생성 함수
export function login(loginInfo) {
  return {
    type: LOGIN,
    payload: loginInfo,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function reduxRender() {
  return {
    type: RENDER,
  };
}

//리듀서 일해라
export default function user(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userID: action.payload.id,
        // userPW: action.payload.password,
        isLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        userID: '',
        userPW: '',
        isLogin: false,
      };
    case RENDER:
      return {
        ...state,
        reduxrender: !state.reduxrender,
      };
    default:
      return state;
  }
}
