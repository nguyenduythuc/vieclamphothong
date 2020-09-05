import types from '../types';

const INITIAL_STATE = {
  location: null,
};

export const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_APP_LOCATION:
      delete action.type;
      return {
        ...state,
        location: action.data,
      };
    default:
      return state;
  }
};
