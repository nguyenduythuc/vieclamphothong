import types from '../types';

const INITIAL_STATE = {
  listJobs: null,
  listFilters: {},
  listStatusApplied: [],
  detailRecruitment: {},
};

export const recruitment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_LIST_JOBS:
      delete action.type;
      return {
        ...state,
        listJobs: action.data,
      };
    case types.SAVE_LIST_FILTERS:
      delete action.type;
      return {
        ...state,
        listFilters: action.data,
      };
    case types.SAVE_LIST_STATUS_APPLIED:
      delete action.type;
      return {
        ...state,
        listStatusApplied: action.data,
      };
    case types.SAVE_DETAIL_RECUITMENT:
      delete action.type;
      return {
        ...state,
        detailRecruitment: action.data,
      };
    default:
      return state;
  }
};
