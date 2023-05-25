//초기 상태
const initState = {};

//액션 타입 설정
const INIT = 'user/INIT';

//액션 생성 함수
export function init(payload) {
  return {
    type: INIT,
    payload,
  };
}

//리듀서 일해라
export default function user(state = initState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
