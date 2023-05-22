import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRef } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Hashtag from '../components/Hashtag';
import '../style/sale.scss';
import { useNavigate } from 'react-router-dom';

export default function SalePage() {
  const cateOptions = [
    { value: 'all', label: 'all' },
    { value: 'man', label: 'man' },
    { value: 'woman', label: 'woman' },
  ];

  const itemCateInput = useRef();
  const saleTitleInput = useRef();
  const itemNameInput = useRef();
  const itemPriceInput = useRef();
  const saleTagInput = useRef();
  const editorTextInput = useRef();
  const navigate = useNavigate();

  const saveSale = async (e) => {
    e.preventDefault();

    const data = editorTextInput.current.editor.getData();
    if (
      !saleTitleInput.current.value ||
      !itemNameInput.current.value ||
      !itemPriceInput.current.value ||
      !data ||
      !itemCateInput.current.props.value.value
    )
      return alert('내용을 입력하세요');

    try {
      const resSale = await axios.post('/sale', {
        itemCate: itemCateInput.current.props.value.value,
        saleTitle: saleTitleInput.current.value,
        itemName: itemNameInput.current.value,
        itemPrice: itemPriceInput.current.value,
        saleTag: tagList,
        editorText: data,
      });
      const message = resSale.data.message;
      if (resSale.data.status === '200') {
        alert(message); // 작성완
      } else {
        return alert(message); // 작성실패
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  const cancleSale = async () => {
    if (window.confirm('작성취소')) {
      navigate('/');
    }
  };

  // hashtag
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    setTagList(updatedTagList);
    setTagItem('');
    if (
      (!updatedTagList.includes(tagItem) && updatedTagList.length < 10) ||
      updatedTagList.length === 0
    ) {
      updatedTagList.push(tagItem);
    } else if (updatedTagList.length === 10) {
      alert('10이상 x');
    } else if (updatedTagList.includes(tagItem)) {
      alert('중복 x');
    }
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem,
    );
    setTagList(filteredTagList);
  };

  const handleChange = (event, editor) => {
    const data = editorTextInput.current.editor.getData();
  };

  return (
    <>
      <div className="form_wrapper minMax">
        <div className="cate_input">
          <Select
            className="cate_select_input"
            options={cateOptions}
            ref={itemCateInput}
            defaultValue={cateOptions[0]}
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
              colors: {
                ...theme.colors,
                primary25: '#f4f6ff',
                primary: '#3d435f',
              },
            })}
          />
        </div>
        <input
          className="title_input"
          type="text"
          placeholder="제목"
          ref={saleTitleInput}
        />
        <div className="item">
          <p>상품명 : </p>
          <input className="item_input" type="text" ref={itemNameInput} />
        </div>
        <div className="price">
          <p>가격 : </p>
          <input className="price_input" type="text" ref={itemPriceInput} />
        </div>
        {/* hashtag */}
        <div className="WholeBox">
          <div className="TagBox">
            {tagList.map((tagItem, index) => {
              return (
                <div className="TagItem" key={index}>
                  <span ref={saleTagInput}>{tagItem}</span>
                  <button className="TagBtn" onClick={deleteTagItem}>
                    x
                  </button>
                </div>
              );
            })}
            <input
              className="TagInput"
              type="text"
              placeholder="태그등록"
              tabIndex={2}
              onChange={(e) => setTagItem(e.target.value)}
              value={tagItem}
              onKeyPress={onKeyPress}
            />
          </div>
        </div>

        <CKEditor
          editor={ClassicEditor}
          data=""
          onChange={handleChange}
          ref={editorTextInput}
        />
      </div>
      <div className="salebar">
        <div className="salebar_btn">
          <button className="salepage_cancel" onClick={cancleSale}>
            취소
          </button>
          <button className="salepage_save" type="submit" onClick={saveSale}>
            저장
          </button>
        </div>
      </div>
    </>
  );
}
