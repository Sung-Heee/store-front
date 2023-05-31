import React from 'react';
import '../style/topBtn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function TopBtn() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className="top_btn" onClick={handleScrollTop}>
        <FontAwesomeIcon className="top_btn_arrow" icon={faChevronUp} />
      </div>
    </>
  );
}
