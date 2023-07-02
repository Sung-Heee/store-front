import React from 'react';
import '../../style/dropdown.scss';
import { Link } from 'react-router-dom';

export default function Dropdown() {
  return (
    <div className="dropdown_container">
      <li>
        <Link to="/user_store">내 상점</Link>
      </li>
      <li>
        <Link to="/sale" className="go_salepage">
          상품등록
        </Link>
      </li>
    </div>
  );
}
