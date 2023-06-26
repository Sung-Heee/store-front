import axios from 'axios';

export const getUser = async (params) => {
  try {
    const resUser = await axios.get('/user', { params });
    return resUser;
  } catch (err) {
    console.error(err);
  }
};

// export const getUser = async (userId) => {
//   try {
//     const resUser = await axios.get(`/user/${userId}`);
//     return resUser;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const Login = async (account) => {
  try {
    const resLogin = await axios.post('/login', account);
    return resLogin;
  } catch (error) {
    console.error(error);
  }
};

export const Register = async (userInfo) => {
  try {
    const resRegister = await axios.post('/register', userInfo);
    return resRegister;
  } catch (error) {
    console.error(error);
  }
};

export const EmailCheck = async (email) => {
  try {
    const resCheckEmail = await axios.post('/checkEmail', email);
    return resCheckEmail;
  } catch (error) {
    console.error(error);
  }
};

export const NickNameCheck = async (nickName) => {
  try {
    const resCheckNickName = await axios.post('/checkNickName', nickName);
    return resCheckNickName;
  } catch (error) {
    console.error(error);
  }
};
