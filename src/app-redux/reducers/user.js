import types from '../types';

const INITIAL_STATE = {
  user: null,
  userType: null,
  userLocation: null,
  userProfile: {},
};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_USER:
      delete action.type;
      return {
        ...state,
        user: action.data,
      };
    case types.SAVE_USER_TYPE:
      delete action.type;
      return {
        ...state,
        userType: action.data,
      };
    case types.SAVE_CURRENT_LOCATION:
      delete action.type;
      return {
        ...state,
        userLocation: action.data,
      };
    case types.SAVE_PROFILE:
      delete action.type;
      return {
        ...state,
        userProfile: action.data,
      };
    default:
      return state;
  }
};
