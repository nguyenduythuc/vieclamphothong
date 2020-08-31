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

function saveCurrentLocation(data) {
  return {
    type: types.SAVE_CURRENT_LOCATION,
    data: data,
  };
}

const user = {
  saveUser,
  saveUserType,
  saveCurrentLocation,
};

export default user;
