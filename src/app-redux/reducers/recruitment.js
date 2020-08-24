import types from '../types';

const INITIAL_STATE = {
  listJobs: null,
};

export const recruitment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_LIST_JOBS:
      delete action.type;
      return {
        ...state,
        listJobs: action.data,
      };
    default:
      return state;
  }
};
