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
  const genderOptions = [
    { value: 'all', label: 'all' },
    { value: 'man', label: 'man' },
    { value: 'woman', label: 'woman' },
  ];

  const cateOptions = {
    all: [
      { value: '상의', label: '상의' },
      { value: '하의', label: '하의' },
      { value: '신발', label: '신발' },
      { value: '악세사리', label: '악세사리' },
      { value: '기타', label: '기타' },
    ],
    man: [
      { value: '상의', label: '상의' },
      { value: '하의', label: '하의' },
      { value: '신발', label: '신발' },
      { value: '악세사리', label: '악세사리' },
      { value: '기타', label: '기타' },
    ],
    woman: [
      { value: '상의', label: '상의' },
      { value: '하의', label: '하의' },
      { value: '신발', label: '신발' },
      { value: '악세사리', label: '악세사리' },
      { value: '기타', label: '기타' },
    ],
  };

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCate, setSelectedCate] = useState(null);

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
      !selectedCate
    )
      return alert('내용을 입력하세요');

    const cateObject = {
      gender: selectedGender.value,
      cate: selectedCate.value,
    };
    console.log(cateObject);

    try {
      console.log(data);
      const resSale = await axios.post('/sale', {
        categories: cateObject,
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

  const handleChange = (e) => {
    var data = editorTextInput.current.editor.getData({
      removePlugins: 'Paragraph',
      enterMode: 'br',
      entities: false,
      basicEntities: false,
    });
    // const realData = data.split('p');
    console.log(data);
    // var result = data.substr(4, data.length - 4);
    // console.log(result);
  };

  return (
    <>
      <div className="form_wrapper minMax">
        <div className="gender_cate_input">
          {/* <Select
            className="gender_select_input"
            options={genderOptions}
            ref={genderInput}
            defaultValue={genderOptions[0]}
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
          /> */}
          <Select
            className="gender_select_input"
            options={genderOptions}
            value={selectedGender}
            onChange={setSelectedGender}
            placeholder="Select a gender"
            // ref={genderInput}
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
          {selectedGender && (
            <Select
              className="cate_select_input"
              options={cateOptions[selectedGender.value]}
              value={selectedCate}
              onChange={setSelectedCate}
              placeholder="Select an category"
              // ref={itemCateInput}
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
          )}
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
