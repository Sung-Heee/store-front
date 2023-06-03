import React from 'react';
import '../style/bottomBtn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function BottomBtn() {
  const handleScrollBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className="bottom_btn" onClick={handleScrollBottom}>
        <FontAwesomeIcon className="bottom_btn_arrow" icon={faChevronDown} />
      </div>
    </>
  );
}
