import React from 'react';
import { useEffect } from 'react';

export default function ScrollReset() {
  useEffect(() => {
    const resetScrollPosition = () => {
      window.scrollTo(0, 0);
    };

    // 페이지 컴포넌트가 마운트될 때 스크롤 위치를 초기화
    resetScrollPosition();

    // 컴포넌트가 언마운트될 때 스크롤 위치 초기화 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('beforeunload', resetScrollPosition);
    };
  }, []);

  return null;
}
