import axios from 'axios';

// 메인에서 보여주는 모든 상품
export const showItems = async () => {
  try {
    const resItems = await axios.get('/main/showItems');
    return resItems;
  } catch (error) {
    console.error(error);
  }
};

// all_product 페이지에서 보여주는 모든 상품
export const showAllItems = async () => {
  try {
    const resAllItems = await axios.get('/main/all');
    return resAllItems;
  } catch (error) {
    console.error(error);
  }
};

export const saleItems = async (saleItemInfo, formData) => {
  try {
    const itemFormData = new FormData();
    itemFormData.append('saleItemInfo', JSON.stringify(saleItemInfo));

    formData.forEach((value, key) => {
      itemFormData.append(key, value);
    });

    const resSale = await axios.post('/main/sale', itemFormData);
    return resSale;
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = async (itemId) => {
  try {
    const resDeleteItem = await axios.delete(`/main/delete/${itemId}`);
    return resDeleteItem;
  } catch (err) {
    console.error(err);
  }
};
