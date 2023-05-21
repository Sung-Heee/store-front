import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRef } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Hashtag from '../components/Hashtag';
import '../style/sale.scss';

export default function SalePage() {
  const cateOptions = [
    { value: 'all', label: 'all' },
    { value: 'man', label: 'man' },
    { value: 'woman', label: 'woman' },
  ];

  const itemCateInput = useRef();

  const saleUser = async (e) => {
    try {
      console.log(itemCateInput.current.props.value.value);
      const resSale = await axios.post('/sale', {
        genderCate: itemCateInput.current.props.value.value,
      });
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="form_wrapper minMax">
        <div className="cate_input">
          <Select
            className="cate_select_input"
            options={cateOptions}
            ref={itemCateInput}
            placeholder="category"
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
              colors: {
                ...theme.colors,
                primary25: '#f5f5f5',
                primary: '#3d435f',
              },
            })}
          />
        </div>
        <input className="title_input" type="text" placeholder="제목" />
        <div className="item">
          <p>상품명 : </p>
          <input className="item_input" type="text" />
        </div>
        <div className="price">
          <p>가격 : </p>
          <input className="price_input" type="text" />
        </div>
        <Hashtag />
        <CKEditor
          editor={ClassicEditor}
          data="<p></p>"
          // onReady={(editor) => {
          //   console.log('Editor is ready to use!', editor);
          // }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          // onBlur={(event, editor) => {
          //   console.log('Blur.', editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log('Focus.', editor);
          // }}
        />
      </div>
      <div className="salebar">
        <div className="salebar_btn">
          <button className="salepage_cancel">취소</button>
          <button className="salepage_save" onClick={saleUser}>
            저장
          </button>
        </div>
      </div>
    </>
  );
}
