import types from '../types';

function saveListJobs(data) {
  return {
    type: types.SAVE_LIST_JOBS,
    data: data,
  };
}

function saveListFilters(data) {
  return {
    type: types.SAVE_LIST_FILTERS,
    data: data,
  };
}

const recruitment = {
  saveListJobs,
  saveListFilters,
};

export default recruitment;
