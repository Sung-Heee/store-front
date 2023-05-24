import React, { useState } from 'react';
import '../style/hashtag.scss';

export default function Hashtag() {
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem('');
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem,
    );
    setTagList(filteredTagList);
  };

  return (
    <div className="WholeBox">
      {/* <Title text="Tag" /> */}
      <div className="TagBox">
        {tagList.map((tagItem, index) => {
          return (
            <div className="TagItem" key={index}>
              <span>{tagItem}</span>
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
  );
}
