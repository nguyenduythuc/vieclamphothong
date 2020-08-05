import types from '../types';

function saveUser(data) {
  return {
    type: types.SAVE_USER,
    data: data,
  };
}

function saveUserType(data) {
  return {
    type: types.SAVE_USER_TYPE,
    data: data,
  };
}

const user = {
  saveUser,
  saveUserType,
};

export default user;
